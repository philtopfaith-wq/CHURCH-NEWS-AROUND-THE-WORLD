import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Article, NewsFilterState, ProviderStatusInfo, ActiveFeedMode } from './types';
import { newsService } from './services/NewsService';
import { useAppRouter, navigateTo } from './router';
import { NEWS_CATEGORIES, getCategoryBySlug } from './config/categories';
import { Header } from './components/Header';
import { OperationalRibbon } from './components/OperationalRibbon';
import { HeroFeatured } from './components/HeroFeatured';
import { SecondaryFeatures } from './components/SecondaryFeatures';
import { ArticleCard } from './components/ArticleCard';
import { FilterBar } from './components/FilterBar';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { ProviderStatusModal } from './components/ProviderStatusModal';
import { SkeletonFeed } from './components/SkeletonCard';
import { EmptyState } from './components/EmptyState';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { ChurchCrossIcon, CathedralIcon, OpenScriptureIcon, BellTowerIcon, GlobeFaithIcon } from './components/EditorialIcon';
import { normalizeTitle } from './services/deduplication';

export default function App() {
  const { route } = useAppRouter();

  // News Aggregation State
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);
  const [failedCount, setFailedCount] = useState<number>(0);
  const [successCount, setSuccessCount] = useState<number>(0);
  const [providerStatuses, setProviderStatuses] = useState<ProviderStatusInfo[]>([]);
  const [activeFeedMode, setActiveFeedMode] = useState<ActiveFeedMode>('all-live');
  const [isOffline, setIsOffline] = useState<boolean>(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  // Reader Modal State
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);

  // Filter & Search State
  const [filters, setFilters] = useState<NewsFilterState>({
    category: 'all',
    source: 'all',
    searchQuery: '',
    sortBy: 'newest',
  });

  // Monitor network connectivity
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      handleLoadArticles(false);
    };
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Primary Data Fetching
  const handleLoadArticles = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const result = await newsService.fetchAllArticles(forceRefresh);
      setArticles(result.articles);
      setProviderStatuses(result.providerStatuses);
      setLastUpdated(result.lastUpdated);
      setIsCached(result.isCached);
      setFailedCount(result.failedCount);
      setSuccessCount(result.successCount);
    } catch (err) {
      console.error('Aggregator execution encountered an error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    handleLoadArticles(false);
  }, [handleLoadArticles]);

  // Route Synchronization
  useEffect(() => {
    if (route.path === '/category' && route.params.slug) {
      setFilters((prev) => ({
        ...prev,
        category: route.params.slug,
      }));
    } else if (route.path === '/latest') {
      setFilters((prev) => ({
        ...prev,
        category: 'all',
        sortBy: 'newest',
      }));
    } else if (route.path === '/search') {
      // Focus on search mode
    }

    // Direct article route /article/:id
    if (route.path === '/article' && route.params.id && articles.length > 0) {
      const found = articles.find((a) => a.id === route.params.id);
      if (found) {
        setSelectedArticle(found);
      }
    }
  }, [route, articles]);

  // Feed Mode Toggle (Live vs Archival Mock)
  const handleFeedModeChange = (mode: ActiveFeedMode) => {
    setActiveFeedMode(mode);
    newsService.setFeedMode(mode);
    handleLoadArticles(true);
  };

  // Cache Clear
  const handleClearCache = () => {
    try {
      localStorage.clear();
      setIsCached(false);
      handleLoadArticles(true);
    } catch {
      // Ignore
    }
  };

  // Filter Updates
  const handleFilterChange = (updates: Partial<NewsFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      source: 'all',
      searchQuery: '',
      sortBy: 'newest',
    });
    if (route.path === '/category') {
      navigateTo('/');
    }
  };

  // Article Selection Handler
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.history.pushState({}, '', `/article/${article.id}`);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    if (window.location.pathname.startsWith('/article/')) {
      window.history.back();
    }
  };

  // Compute available wire sources from loaded articles
  const availableSources = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => set.add(a.sourceName));
    return Array.from(set).sort();
  }, [articles]);

  // Filtered and Sorted Articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category Filter
      if (filters.category !== 'all') {
        const catConfig = getCategoryBySlug(filters.category);
        const targetName = catConfig ? catConfig.name.toLowerCase() : filters.category.toLowerCase();
        const articleCat = article.category.toLowerCase();
        if (articleCat !== targetName && !article.tags.some((t) => t.toLowerCase() === targetName)) {
          return false;
        }
      }

      // Source Filter
      if (filters.source !== 'all' && article.sourceName !== filters.source) {
        return false;
      }

      // Search Query Filter
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const inTitle = article.title.toLowerCase().includes(q);
        const inSummary = article.summary.toLowerCase().includes(q);
        const inSource = article.sourceName.toLowerCase().includes(q);
        const inCategory = article.category.toLowerCase().includes(q);
        const inTags = article.tags.some((t) => t.toLowerCase().includes(q));

        if (!inTitle && !inSummary && !inSource && !inCategory && !inTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (filters.sortBy === 'oldest') {
        const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return timeA - timeB;
      }
      // 'newest' default
      const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : -1;
      const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : -1;
      if (timeA > 0 && timeB > 0) return timeB - timeA;
      if (timeA > 0) return -1;
      if (timeB > 0) return 1;
      return new Date(b.fetchedAt).getTime() - new Date(a.fetchedAt).getTime();
    });
  }, [articles, filters]);

  // Salience Tiers for Home view
  const leadStory = useMemo(() => {
    return articles.find((a) => a.isFeatured) || articles[0] || null;
  }, [articles]);

  const secondaryStories = useMemo(() => {
    if (!leadStory) return [];
    return articles.filter((a) => a.id !== leadStory.id).slice(0, 3);
  }, [articles, leadStory]);

  const departmentPicks = useMemo(() => {
    const seen = new Set<string>();
    const picks: Article[] = [];
    for (const art of articles) {
      if (!seen.has(art.category) && art.id !== leadStory?.id) {
        seen.add(art.category);
        picks.push(art);
      }
      if (picks.length >= 6) break;
    }
    return picks;
  }, [articles, leadStory]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 font-sans">
      
      {/* Top Bar (Contract: 3 Zones) */}
      <Header
        currentPath={route.path}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenSearch={() => {
          navigateTo('/search');
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }}
        activeFeedMode={activeFeedMode}
        isOffline={isOffline}
      />

      {/* Operational Utility Ribbon */}
      <OperationalRibbon
        lastUpdated={lastUpdated}
        articleCount={articles.length}
        isRefreshing={refreshing}
        onRefresh={() => handleLoadArticles(true)}
        isOffline={isOffline}
        isCached={isCached}
        failedCount={failedCount}
        successCount={successCount}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW: About & Ethics Page */}
        {route.path === '/about' ? (
          <AboutView />
        ) : loading && articles.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-2 mb-8">
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Aggregating Global Church Wire...
              </h2>
              <p className="text-xs text-stone-500 font-serif italic">
                Querying configured providers, verifying CORS endpoints, and normalizing dispatches.
              </p>
            </div>
            <SkeletonFeed count={6} />
          </div>
        ) : (
          <>
            {/* FRONT PAGE ONLY: Salience Tier 1 (Lead Story) & Tier 2 (Curated Dispatches) */}
            {route.path === '/' && filters.category === 'all' && !filters.searchQuery && leadStory && (
              <>
                <HeroFeatured
                  article={leadStory}
                  onSelectArticle={handleSelectArticle}
                />
                <SecondaryFeatures
                  articles={secondaryStories}
                  onSelectArticle={handleSelectArticle}
                />

                {/* Departmental Broadsheet Showcase */}
                <section className="py-10 bg-white border-b border-red-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between border-b border-red-200 pb-3 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-sm bg-red-100 text-red-600">
                          <CathedralIcon className="w-5 h-5 text-red-600" />
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                          Church Departments &amp; Ministries
                        </h2>
                      </div>
                      <span className="text-xs font-serif uppercase tracking-widest text-red-600 font-bold">
                        Cross-Field Journalism
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {departmentPicks.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          onSelectArticle={handleSelectArticle}
                          layout="horizontal"
                        />
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* CATEGORY BROAD SHEET HEADER */}
            {route.path === '/category' && route.params.slug && (
              <div className="bg-gradient-to-b from-red-50/70 to-[#FAF8F5] border-b border-red-200 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl space-y-2">
                    <span className="text-xs font-serif uppercase tracking-widest text-red-600 font-bold bg-white px-2.5 py-0.5 rounded border border-red-200 inline-block shadow-2xs">
                      Departmental Archive
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                      {getCategoryBySlug(route.params.slug)?.name || route.params.slug}
                    </h1>
                    <p className="text-sm text-stone-600 leading-relaxed font-serif">
                      {getCategoryBySlug(route.params.slug)?.description ||
                        'Verified reporting, theological dialogue, and community updates.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SEARCH BANNER */}
            {route.path === '/search' && (
              <div className="bg-gradient-to-b from-red-50/70 to-[#FAF8F5] border-b border-red-200 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl space-y-2">
                    <span className="text-xs font-serif uppercase tracking-widest text-red-600 font-bold bg-white px-2.5 py-0.5 rounded border border-red-200 inline-block shadow-2xs">
                      Search Index
                    </span>
                    <h1 className="font-serif text-3xl font-bold text-stone-900">
                      Search Church Dispatches
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-600">
                      Instant client-side multi-field query across headlines, summaries, sources, categories, and tags.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LATEST STREAM BANNER */}
            {route.path === '/latest' && (
              <div className="bg-gradient-to-b from-red-50/70 to-[#FAF8F5] border-b border-red-200 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl space-y-2">
                    <span className="text-xs font-serif uppercase tracking-widest text-red-600 font-bold bg-white px-2.5 py-0.5 rounded border border-red-200 inline-block shadow-2xs">
                      Chronological Wire
                    </span>
                    <h1 className="font-serif text-3xl font-bold text-stone-900">
                      Latest Dispatches
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-600">
                      All aggregated reporting ordered strictly newest-first by confirmed publication date.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Filter Bar */}
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              availableSources={availableSources}
              totalResults={filteredArticles.length}
            />

            {/* Feed Section: Salience Tier 3 (Chronological Grid) */}
            <section className="py-8 sm:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Section Title when on Home page */}
                {route.path === '/' && (
                  <div className="flex items-center justify-between border-b border-red-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                        All Aggregated Dispatches
                      </h2>
                    </div>
                    <span className="text-xs font-serif uppercase tracking-widest text-red-600 font-bold">
                      Chronological Stream
                    </span>
                  </div>
                )}

                {/* Empty states or Article Grid */}
                {filteredArticles.length === 0 ? (
                  filters.searchQuery ? (
                    <EmptyState
                      type="search"
                      searchQuery={filters.searchQuery}
                      onReset={handleResetFilters}
                    />
                  ) : filters.category !== 'all' ? (
                    <EmptyState
                      type="category"
                      categoryName={getCategoryBySlug(filters.category)?.name}
                      onReset={handleResetFilters}
                      onRefresh={() => handleLoadArticles(true)}
                    />
                  ) : isOffline && articles.length === 0 ? (
                    <EmptyState
                      type="offline-empty"
                      onSwitchToMock={() => handleFeedModeChange('mock-only')}
                    />
                  ) : (
                    <EmptyState
                      type="general"
                      onRefresh={() => handleLoadArticles(true)}
                    />
                  )
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onSelectArticle={handleSelectArticle}
                        layout="standard"
                      />
                    ))}
                  </div>
                )}

              </div>
            </section>
          </>
        )}

      </main>

      {/* Reader Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={handleCloseArticle}
        allArticles={articles}
        onSelectArticle={handleSelectArticle}
      />

      {/* Wire & Provider Health Modal */}
      <ProviderStatusModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        providerStatuses={providerStatuses}
        activeFeedMode={activeFeedMode}
        onChangeMode={handleFeedModeChange}
        onForceRefresh={() => handleLoadArticles(true)}
        onClearCache={handleClearCache}
        isRefreshing={refreshing}
      />

      {/* Footnote Editorial Footer */}
      <Footer onOpenProviderModal={() => setIsProviderModalOpen(true)} />

    </div>
  );
}
