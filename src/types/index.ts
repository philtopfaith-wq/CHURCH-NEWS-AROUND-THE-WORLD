export interface Article {
  id: string;
  title: string;
  summary: string;
  contentHtml?: string;
  imageUrl?: string;
  sourceName: string;
  sourceUrl: string;
  articleUrl: string;
  category: string;
  publishedAt?: string; // ISO 8601 string
  fetchedAt: string;    // ISO 8601 string
  author?: string;
  tags: string[];
  readTimeMinutes?: number;
  isMock?: boolean;
  isFeatured?: boolean;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface ProviderResult {
  success: boolean;
  articles: Article[];
  error?: string;
  source: string;
  fetchedAt: string;
  statusCode?: number;
}

export interface ProviderConfig {
  id: string;
  name: string;
  type: 'rss' | 'json' | 'mock';
  feedUrl?: string;
  websiteUrl: string;
  description: string;
  enabled: boolean;
  defaultCategory?: string;
}

export type SortOrder = 'newest' | 'oldest' | 'title';

export interface NewsFilterState {
  category: string; // 'all' or category slug
  source: string;   // 'all' or source name
  searchQuery: string;
  sortBy: SortOrder;
}

export type ActiveFeedMode = 'all-live' | 'mock-only';

export interface ProviderStatusInfo {
  id: string;
  name: string;
  type: 'rss' | 'json' | 'mock';
  success: boolean;
  articleCount: number;
  error?: string;
  lastFetched?: string;
}
