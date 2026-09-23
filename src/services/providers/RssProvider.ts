import { IProvider } from './IProvider';
import { Article, ProviderConfig, ProviderResult } from '../../types';
import { sanitizeText, sanitizeUrl, calculateReadTime } from '../sanitizer';
import { parseToIsoDate } from '../../utils/date';
import { generateArticleId } from '../deduplication';
import { matchCategoryFromText } from '../../config/categories';

export class RssProvider implements IProvider {
  public id: string;
  public name: string;
  private feedUrl: string;
  private websiteUrl: string;
  private defaultCategory: string;

  constructor(config: ProviderConfig) {
    this.id = config.id;
    this.name = config.name;
    this.feedUrl = config.feedUrl || '';
    this.websiteUrl = config.websiteUrl;
    this.defaultCategory = config.defaultCategory || 'Church News';
  }

  public async fetchArticles(signal?: AbortSignal): Promise<ProviderResult> {
    const fetchedAt = new Date().toISOString();

    if (!this.feedUrl) {
      return {
        success: false,
        articles: [],
        error: 'Missing feed URL configuration',
        source: this.name,
        fetchedAt,
      };
    }

    // Try fetching with multiple strategies:
    // Strategy 1: Direct fetch (works if provider has CORS enabled)
    // Strategy 2: RSS2JSON gateway (standard public conversion)
    // Strategy 3: AllOrigins raw CORS gateway with browser XML parsing

    try {
      const directResult = await this.tryDirectFetch(signal);
      if (directResult && directResult.length > 0) {
        return {
          success: true,
          articles: directResult,
          source: this.name,
          fetchedAt,
          statusCode: 200,
        };
      }
    } catch {
      // Direct CORS restricted, try gateway
    }

    try {
      const rss2jsonResult = await this.tryRss2Json(signal);
      if (rss2jsonResult && rss2jsonResult.length > 0) {
        return {
          success: true,
          articles: rss2jsonResult,
          source: this.name,
          fetchedAt,
          statusCode: 200,
        };
      }
    } catch {
      // Gateway 1 failed, try gateway 2
    }

    try {
      const proxyXmlResult = await this.tryAllOriginsXml(signal);
      if (proxyXmlResult && proxyXmlResult.length > 0) {
        return {
          success: true,
          articles: proxyXmlResult,
          source: this.name,
          fetchedAt,
          statusCode: 200,
        };
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown network error';
      return {
        success: false,
        articles: [],
        error: `Provider unreachable (${errorMsg})`,
        source: this.name,
        fetchedAt,
      };
    }

    return {
      success: false,
      articles: [],
      error: 'Feed parsed with 0 valid items',
      source: this.name,
      fetchedAt,
    };
  }

  /**
   * Strategy 1: Attempt direct fetch with browser fetch
   */
  private async tryDirectFetch(signal?: AbortSignal): Promise<Article[] | null> {
    const response = await fetch(this.feedUrl, {
      signal,
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml, application/atom+xml',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const xmlText = await response.text();
    return this.parseXmlFeed(xmlText);
  }

  /**
   * Strategy 2: Attempt public rss2json converter
   */
  private async tryRss2Json(signal?: AbortSignal): Promise<Article[] | null> {
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(this.feedUrl)}`;
    const response = await fetch(proxyUrl, { signal });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== 'ok' || !Array.isArray(data.items)) {
      return null;
    }

    const articles: Article[] = [];
    const now = new Date().toISOString();

    for (const item of data.items) {
      const title = sanitizeText(item.title);
      if (!title) continue;

      const rawUrl = item.link || item.guid || this.websiteUrl;
      const articleUrl = sanitizeUrl(rawUrl) || this.websiteUrl;
      const rawSummary = item.description || item.content || '';
      const summary = sanitizeText(rawSummary);
      const publishedAt = parseToIsoDate(item.pubDate);
      const author = sanitizeText(item.author) || undefined;
      const imageUrl = sanitizeUrl(item.thumbnail || item.enclosure?.link);

      const category = item.categories && item.categories.length > 0
        ? sanitizeText(item.categories[0])
        : matchCategoryFromText(title + ' ' + summary);

      const id = generateArticleId(this.name, title, articleUrl);
      const readTimeMinutes = calculateReadTime(summary);

      articles.push({
        id,
        title,
        summary: summary || title,
        imageUrl,
        sourceName: this.name,
        sourceUrl: this.websiteUrl,
        articleUrl,
        category: category || this.defaultCategory,
        publishedAt,
        fetchedAt: now,
        author,
        tags: Array.isArray(item.categories) ? item.categories.map((c: unknown) => sanitizeText(String(c))).filter(Boolean) : [category],
        readTimeMinutes,
        isMock: false,
      });
    }

    return articles;
  }

  /**
   * Strategy 3: Attempt AllOrigins CORS proxy with DOMParser XML parsing
   */
  private async tryAllOriginsXml(signal?: AbortSignal): Promise<Article[] | null> {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(this.feedUrl)}`;
    const response = await fetch(proxyUrl, { signal });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const xmlText = await response.text();
    return this.parseXmlFeed(xmlText);
  }

  /**
   * Universal XML Parser for RSS 2.0 & Atom 1.0 feeds
   */
  private parseXmlFeed(xmlString: string): Article[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'application/xml');

    // Check for parse error
    const parseError = doc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Malformed XML document');
    }

    const articles: Article[] = [];
    const now = new Date().toISOString();

    // Check for RSS items (<item>)
    let items = Array.from(doc.querySelectorAll('item'));

    // Check for Atom entries (<entry>)
    const isAtom = items.length === 0;
    if (isAtom) {
      items = Array.from(doc.querySelectorAll('entry'));
    }

    for (const item of items) {
      // Title
      const rawTitle = item.querySelector('title')?.textContent || '';
      const title = sanitizeText(rawTitle);
      if (!title) continue;

      // Link
      let rawLink = '';
      if (isAtom) {
        const linkElem = item.querySelector('link[rel="alternate"]') || item.querySelector('link');
        rawLink = linkElem?.getAttribute('href') || linkElem?.textContent || '';
      } else {
        rawLink = item.querySelector('link')?.textContent || item.querySelector('guid')?.textContent || '';
      }
      const articleUrl = sanitizeUrl(rawLink) || this.websiteUrl;

      // Description / Summary
      const rawDesc =
        item.querySelector('description')?.textContent ||
        item.querySelector('content')?.textContent ||
        item.querySelector('summary')?.textContent ||
        '';
      const summary = sanitizeText(rawDesc);

      // Published Date
      const rawDate =
        item.querySelector('pubDate')?.textContent ||
        item.querySelector('published')?.textContent ||
        item.querySelector('updated')?.textContent ||
        item.getElementsByTagName('dc:date')[0]?.textContent;
      const publishedAt = parseToIsoDate(rawDate);

      // Author
      const rawAuthor =
        item.querySelector('author > name')?.textContent ||
        item.querySelector('author')?.textContent ||
        item.getElementsByTagName('dc:creator')[0]?.textContent;
      const author = sanitizeText(rawAuthor) || undefined;

      // Image Extraction
      let imageUrl: string | undefined;
      const enclosure = item.querySelector('enclosure');
      if (enclosure && enclosure.getAttribute('type')?.startsWith('image')) {
        imageUrl = sanitizeUrl(enclosure.getAttribute('url'));
      }
      if (!imageUrl) {
        const mediaContent = item.getElementsByTagName('media:content')[0] || item.getElementsByTagName('media:thumbnail')[0];
        if (mediaContent) {
          imageUrl = sanitizeUrl(mediaContent.getAttribute('url'));
        }
      }
      if (!imageUrl && rawDesc) {
        // Safe regex extract image src from HTML
        const match = rawDesc.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
        if (match && match[1]) {
          imageUrl = sanitizeUrl(match[1]);
        }
      }

      // Category
      const rawCat = item.querySelector('category')?.textContent;
      const category = rawCat ? sanitizeText(rawCat) : matchCategoryFromText(title + ' ' + summary);

      const id = generateArticleId(this.name, title, articleUrl);
      const readTimeMinutes = calculateReadTime(summary);

      articles.push({
        id,
        title,
        summary: summary || title,
        imageUrl,
        sourceName: this.name,
        sourceUrl: this.websiteUrl,
        articleUrl,
        category: category || this.defaultCategory,
        publishedAt,
        fetchedAt: now,
        author,
        tags: [category || this.defaultCategory],
        readTimeMinutes,
        isMock: false,
      });
    }

    return articles;
  }
}
