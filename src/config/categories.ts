import { NewsCategory } from '../types';

export const NEWS_CATEGORIES: NewsCategory[] = [
  {
    id: 'church-news',
    name: 'Church News',
    slug: 'church-news',
    description: 'General reporting and major developments across denominations and global bodies.',
  },
  {
    id: 'christian-news',
    name: 'Christian News',
    slug: 'christian-news',
    description: 'Current affairs, religious freedom reports, and stories impacting Christian life.',
  },
  {
    id: 'world-church',
    name: 'World Church',
    slug: 'world-church',
    description: 'International reports, ecumenical dialogues, and faith communities across continents.',
  },
  {
    id: 'local-church',
    name: 'Local Church',
    slug: 'local-church',
    description: 'Parish life, congregational initiatives, neighborhood outreach, and revitalization.',
  },
  {
    id: 'ministries',
    name: 'Ministries',
    slug: 'ministries',
    description: 'Youth, collegiate, family, prison, chaplaincy, and specialized ministry updates.',
  },
  {
    id: 'missions',
    name: 'Missions',
    slug: 'missions',
    description: 'Cross-cultural mission work, humanitarian disaster relief, and global outreach.',
  },
  {
    id: 'worship',
    name: 'Worship',
    slug: 'worship',
    description: 'Liturgical arts, sacred music, theological reflection on liturgy, and devotion.',
  },
  {
    id: 'conferences',
    name: 'Conferences',
    slug: 'conferences',
    description: 'Theological colloquia, denominational assemblies, and pastoral gatherings.',
  },
  {
    id: 'events',
    name: 'Events',
    slug: 'events',
    description: 'Major festivals, historical anniversaries, synods, and special commemorative services.',
  },
  {
    id: 'leadership',
    name: 'Leadership',
    slug: 'leadership',
    description: 'Pastoral formation, clergy development, governance, and organizational ethics.',
  },
  {
    id: 'community',
    name: 'Community',
    slug: 'community',
    description: 'Food pantries, affordable housing coalitions, reconciliation efforts, and civic charity.',
  },
  {
    id: 'faith-culture',
    name: 'Faith & Culture',
    slug: 'faith-culture',
    description: 'Intersections of Christian thought with literature, visual arts, science, and ethics.',
  },
];

export const DEFAULT_CATEGORY_SLUG = 'all';

export function getCategoryBySlug(slug: string): NewsCategory | undefined {
  return NEWS_CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export function matchCategoryFromText(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('mission') || lower.includes('humanitarian') || lower.includes('relief')) {
    return 'Missions';
  }
  if (lower.includes('worship') || lower.includes('liturg') || lower.includes('hymn') || lower.includes('music')) {
    return 'Worship';
  }
  if (lower.includes('conference') || lower.includes('assembly') || lower.includes('gathering')) {
    return 'Conferences';
  }
  if (lower.includes('synod') || lower.includes('vatican') || lower.includes('rome') || lower.includes('global') || lower.includes('international') || lower.includes('ukraine') || lower.includes('africa') || lower.includes('asia')) {
    return 'World Church';
  }
  if (lower.includes('leader') || lower.includes('pastor') || lower.includes('bishop') || lower.includes('clergy')) {
    return 'Leadership';
  }
  if (lower.includes('ministry') || lower.includes('youth') || lower.includes('campus') || lower.includes('chaplain')) {
    return 'Ministries';
  }
  if (lower.includes('community') || lower.includes('shelter') || lower.includes('food') || lower.includes('aid')) {
    return 'Community';
  }
  if (lower.includes('culture') || lower.includes('book') || lower.includes('art') || lower.includes('film') || lower.includes('society')) {
    return 'Faith & Culture';
  }
  if (lower.includes('parish') || lower.includes('congregation') || lower.includes('pastoral') || lower.includes('local')) {
    return 'Local Church';
  }
  return 'Church News';
}
