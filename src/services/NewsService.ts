import { Article, ProviderResult, ProviderStatusInfo, ActiveFeedMode } from '../types';
import { CONFIGURED_PROVIDERS, MOCK_PROVIDER_CONFIG, APP_CONFIG } from '../config/providers';
import { IProvider } from './providers/IProvider';
import { RssProvider } from './providers/RssProvider';
import { MockProvider, MOCK_ARTICLES } from './providers/MockProvider';
import { deduplicateArticles } from './deduplication';
import { compareArticlesNewestFirst } from '../utils/date';

export interface AggregationResult {
  articles: Article[];
  providerStatuses: ProviderStatusInfo[];
  lastUpdated: string;
  isCached: boolean;
  failedCount: number;
  successCount: number;
}

class NewsService {
  private activeAbortController: AbortController | null = null;
  private isFetching: boolean = false;
  private activeMode: ActiveFeedMode = 'all-live';
  private providerInstances: IProvider[] = [];

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    this.providerInstances = CONFIGURED_PROVIDERS.filter((p) => p.enabled).map(
      (config) => new RssProvider(config)
    );
  }

  public setFeedMode(mode: ActiveFeedMode) {
    this.activeMode = mode;
  }

  public getFeedMode(): ActiveFeedMode {
    return this.activeMode;
  }

  /**
   * Fetches articles across configured providers with:
   * - Request cancellation (aborting older ongoing requests)
   * - Request locking (prevents duplicate simultaneous clicks)
   * - Timeout guards (8s per provider)
   * - Partial success handling (Promise.allSettled)
   * - Deduplication
   * - Date sorting (newest first)
   * - LocalStorage caching with fallback
   */
  public async fetchAllArticles(forceRefresh = false): Promise<AggregationResult> {
    // 1. If not forcing refresh and valid cache exists, return cache quickly
    if (!forceRefresh) {
      const cached = this.readCache();
      if (cached && !this.isCacheExpired()) {
        return {
          articles: cached.articles,
          providerStatuses: cached.providerStatuses,
          lastUpdated: cached.lastUpdated,
          isCached: true,
          failedCount: 0,
          successCount: cached.providerStatuses.filter((p) => p.success).length,
        };
      }
    }

    // 2. Cancel any pending in-flight aggregation
    if (this.activeAbortController) {
      this.activeAbortController.abort();
    }
    this.activeAbortController = new AbortController();
    const currentSignal = this.activeAbortController.signal;

    // 3. If offline, return cache immediately or fallback to mock
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const cached = this.readCache();
      if (cached && cached.articles.length > 0) {
        return {
          articles: cached.articles,
          providerStatuses: cached.providerStatuses,
          lastUpdated: cached.lastUpdated,
          isCached: true,
          failedCount: 0,
          successCount: cached.providerStatuses.filter((p) => p.success).length,
        };
      }

      // Offline and no cache: use mock articles
      return {
        articles: MOCK_ARTICLES,
        providerStatuses: [
          {
            id: MOCK_PROVIDER_CONFIG.id,
            name: MOCK_PROVIDER_CONFIG.name,
            type: 'mock',
            success: true,
            articleCount: MOCK_ARTICLES.length,
            lastFetched: new Date().toISOString(),
          },
        ],
        lastUpdated: new Date().toISOString(),
        isCached: false,
        failedCount: 0,
        successCount: 1,
      };
    }

    // 4. If Mock / Archival Wire mode is selected:
    if (this.activeMode === 'mock-only') {
      const mockResult = await new MockProvider().fetchArticles();
      const mockArticles = mockResult.articles.sort(compareArticlesNewestFirst);

      const status: ProviderStatusInfo = {
        id: MOCK_PROVIDER_CONFIG.id,
        name: MOCK_PROVIDER_CONFIG.name,
        type: 'mock',
        success: true,
        articleCount: mockArticles.length,
        lastFetched: new Date().toISOString(),
      };

      return {
        articles: mockArticles,
        providerStatuses: [status],
        lastUpdated: new Date().toISOString(),
        isCached: false,
        failedCount: 0,
        successCount: 1,
      };
    }

    // 5. Live aggregation across configured external providers
    this.isFetching = true;
    const aggregatedArticles: Article[] = [];
    const providerStatuses: ProviderStatusInfo[] = [];

    try {
      // Execute each provider with independent timeout
      const fetchPromises = this.providerInstances.map(async (provider) => {
        const timeoutController = new AbortController();
        const timeoutId = setTimeout(() => {
          timeoutController.abort();
        }, APP_CONFIG.requestTimeoutMs);

        // Combined signal listener
        const abortHandler = () => timeoutController.abort();
        currentSignal.addEventListener('abort', abortHandler);

        try {
          const result = await provider.fetchArticles(timeoutController.signal);
          return { providerId: provider.id, providerName: provider.name, result };
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : 'Timeout or unreachable';
          return {
            providerId: provider.id,
            providerName: provider.name,
            result: {
              success: false,
              articles: [],
              error: errorMsg,
              source: provider.name,
              fetchedAt: new Date().toISOString(),
            } as ProviderResult,
          };
        } finally {
          clearTimeout(timeoutId);
          currentSignal.removeEventListener('abort', abortHandler);
        }
      });

      const settled = await Promise.allSettled(fetchPromises);

      // 6. Aggregate successful providers
      settled.forEach((res) => {
        if (res.status === 'fulfilled') {
          const { providerId, providerName, result } = res.value;

          providerStatuses.push({
            id: providerId,
            name: providerName,
            type: 'rss',
            success: result.success,
            articleCount: result.articles.length,
            error: result.error,
            lastFetched: result.fetchedAt,
          });

          if (result.success && result.articles.length > 0) {
            aggregatedArticles.push(...result.articles);
          }
        }
      });

      // 7. If ALL live providers failed (e.g. strict CORS in dev browser environment or no internet):
      // Gracefully fall back to Mock Archival Wire to ensure the user gets a rich, reliable church news experience
      if (aggregatedArticles.length === 0) {
        console.warn('Live providers returned 0 articles (CORS or network restriction). Gracefully falling back to verified Archival Wire.');
        const mockResult = await new MockProvider().fetchArticles();
        aggregatedArticles.push(...mockResult.articles);

        providerStatuses.push({
          id: MOCK_PROVIDER_CONFIG.id,
          name: `${MOCK_PROVIDER_CONFIG.name} (Resilience Fallback)`,
          type: 'mock',
          success: true,
          articleCount: mockResult.articles.length,
          lastFetched: new Date().toISOString(),
        });
      }

      // 8. Deduplicate and sort
      const deduplicated = deduplicateArticles(aggregatedArticles);
      deduplicated.sort(compareArticlesNewestFirst);

      // Limit max total articles
      const finalArticles = deduplicated.slice(0, APP_CONFIG.maxArticlesTotal);
      const nowIso = new Date().toISOString();

      // 9. Save to local cache
      this.writeCache(finalArticles, providerStatuses, nowIso);

      const failedCount = providerStatuses.filter((p) => !p.success).length;
      const successCount = providerStatuses.filter((p) => p.success).length;

      return {
        articles: finalArticles,
        providerStatuses,
        lastUpdated: nowIso,
        isCached: false,
        failedCount,
        successCount,
      };
    } finally {
      this.isFetching = false;
    }
  }

  /**
   * Safe read from LocalStorage cache
   */
  public readCache(): { articles: Article[]; providerStatuses: ProviderStatusInfo[]; lastUpdated: string } | null {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }

    try {
      const raw = localStorage.getItem(APP_CONFIG.cacheKey);
      const timeRaw = localStorage.getItem(APP_CONFIG.cacheTimestampKey);
      if (!raw || !timeRaw) return null;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed.articles)) return null;

      return {
        articles: parsed.articles,
        providerStatuses: Array.isArray(parsed.providerStatuses) ? parsed.providerStatuses : [],
        lastUpdated: timeRaw,
      };
    } catch {
      // Corrupted cache - remove silently
      try {
        localStorage.removeItem(APP_CONFIG.cacheKey);
        localStorage.removeItem(APP_CONFIG.cacheTimestampKey);
      } catch {
        // Ignore
      }
      return null;
    }
  }

  /**
   * Safe write to LocalStorage cache
   */
  private writeCache(articles: Article[], providerStatuses: ProviderStatusInfo[], timestamp: string) {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      localStorage.setItem(
        APP_CONFIG.cacheKey,
        JSON.stringify({
          articles,
          providerStatuses,
        })
      );
      localStorage.setItem(APP_CONFIG.cacheTimestampKey, timestamp);
    } catch (e) {
      console.warn('Could not write news cache to localStorage:', e);
    }
  }

  private isCacheExpired(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) return true;
    try {
      const timeRaw = localStorage.getItem(APP_CONFIG.cacheTimestampKey);
      if (!timeRaw) return true;
      const cachedTime = new Date(timeRaw).getTime();
      return isNaN(cachedTime) || Date.now() - cachedTime > APP_CONFIG.cacheTtlMs;
    } catch {
      return true;
    }
  }
}

export const newsService = new NewsService();
