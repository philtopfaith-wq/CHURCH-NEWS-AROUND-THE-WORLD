import { ProviderConfig } from '../types';

export const APP_CONFIG = {
  appName: 'Ecclesia News',
  tagline: 'Global Church & Faith Chronicle',
  edition: 'Ecumenical & International Edition',
  cacheKey: 'ecclesia_news_articles_cache_v2',
  cacheTimestampKey: 'ecclesia_news_cache_time_v2',
  cacheTtlMs: 15 * 60 * 1000, // 15 minutes
  requestTimeoutMs: 8000,      // 8s per provider
  maxArticlesTotal: 120,
};

export const CONFIGURED_PROVIDERS: ProviderConfig[] = [
  {
    id: 'rns',
    name: 'Religion News Service',
    type: 'rss',
    feedUrl: 'https://religionnews.com/feed/',
    websiteUrl: 'https://religionnews.com',
    description: 'Independent, non-profit source of global religion, spirituality, and ethics reporting.',
    enabled: true,
    defaultCategory: 'Christian News',
  },
  {
    id: 'cna',
    name: 'Catholic News Agency',
    type: 'rss',
    feedUrl: 'https://www.catholicnewsagency.com/rss/news.xml',
    websiteUrl: 'https://www.catholicnewsagency.com',
    description: 'Reliable, comprehensive Catholic and global church news service.',
    enabled: true,
    defaultCategory: 'Church News',
  },
  {
    id: 'baptist-press',
    name: 'Baptist Press',
    type: 'rss',
    feedUrl: 'https://www.baptistpress.com/feed/',
    websiteUrl: 'https://www.baptistpress.com',
    description: 'Official news service of the Southern Baptist Convention and evangelical updates.',
    enabled: true,
    defaultCategory: 'Missions',
  },
  {
    id: 'vatican-news',
    name: 'Vatican News',
    type: 'rss',
    feedUrl: 'https://www.vaticannews.va/en.rss.xml',
    websiteUrl: 'https://www.vaticannews.va/en.html',
    description: 'Information system of the Holy See covering worldwide pastoral and apostolic events.',
    enabled: true,
    defaultCategory: 'World Church',
  },
  {
    id: 'christianity-today',
    name: 'Christianity Today',
    type: 'rss',
    feedUrl: 'https://www.christianitytoday.com/feed/',
    websiteUrl: 'https://www.christianitytoday.com',
    description: 'Thoughtful evangelical journalism covering theology, culture, and ministry leadership.',
    enabled: true,
    defaultCategory: 'Faith & Culture',
  },
  {
    id: 'church-times',
    name: 'Church Times Archive & Media',
    type: 'rss',
    feedUrl: 'https://www.churchofengland.org/rss.xml',
    websiteUrl: 'https://www.churchofengland.org',
    description: 'Anglican communion, parish revitalization, cathedral events, and pastoral initiatives.',
    enabled: true,
    defaultCategory: 'Local Church',
  }
];

export const MOCK_PROVIDER_CONFIG: ProviderConfig = {
  id: 'mock-archival',
  name: 'Ecclesia Demonstration & Archival Wire',
  type: 'mock',
  websiteUrl: 'https://ecclesianews.internal',
  description: 'Verified editorial archive providing resilient church coverage across all twelve liturgical and ministry departments.',
  enabled: true,
  defaultCategory: 'Church News',
};
