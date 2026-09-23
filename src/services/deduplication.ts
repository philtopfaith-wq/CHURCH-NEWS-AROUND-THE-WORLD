import { Article } from '../types';

/**
 * Normalizes title string for duplicate detection:
 * Lowercases, strips punctuation, and standardizes spacing.
 */
export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Deterministically generates an article ID from URL and title.
 * Using a simple safe hash string for URL safety.
 */
export function generateArticleId(sourceName: string, title: string, articleUrl: string): string {
  const seed = `${sourceName.toLowerCase()}|${articleUrl.toLowerCase()}|${title.toLowerCase().trim()}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const cleanSource = sourceName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 15);
  const positiveHash = Math.abs(hash).toString(36);
  return `${cleanSource}-${positiveHash}`;
}

/**
 * Calculates Jaccard similarity between two token sets
 */
function titleSimilarity(titleA: string, titleB: string): number {
  const normA = normalizeTitle(titleA);
  const normB = normalizeTitle(titleB);
  if (normA === normB) return 1.0;

  const wordsA = new Set(normA.split(' ').filter((w) => w.length > 3));
  const wordsB = new Set(normB.split(' ').filter((w) => w.length > 3));

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersectionCount = 0;
  wordsA.forEach((w) => {
    if (wordsB.has(w)) intersectionCount++;
  });

  const unionCount = wordsA.size + wordsB.size - intersectionCount;
  return unionCount === 0 ? 0 : intersectionCount / unionCount;
}

/**
 * Deduplicates articles across providers.
 * Merges duplicate entries by retaining the more complete article
 * (longer summary, valid image, earlier/exact publish date).
 */
export function deduplicateArticles(articles: Article[]): Article[] {
  const uniqueArticles: Article[] = [];

  for (const candidate of articles) {
    let duplicateIndex = -1;

    for (let i = 0; i < uniqueArticles.length; i++) {
      const existing = uniqueArticles[i];

      // Exact article URL match
      if (candidate.articleUrl && existing.articleUrl && candidate.articleUrl === existing.articleUrl) {
        duplicateIndex = i;
        break;
      }

      // Exact normalized title match
      if (normalizeTitle(candidate.title) === normalizeTitle(existing.title)) {
        duplicateIndex = i;
        break;
      }

      // High semantic title similarity (> 82%) plus same publication date or source
      const similarity = titleSimilarity(candidate.title, existing.title);
      if (similarity > 0.82) {
        if (candidate.publishedAt && existing.publishedAt) {
          const dayA = candidate.publishedAt.slice(0, 10);
          const dayB = existing.publishedAt.slice(0, 10);
          if (dayA === dayB) {
            duplicateIndex = i;
            break;
          }
        }
      }
    }

    if (duplicateIndex === -1) {
      uniqueArticles.push(candidate);
    } else {
      // Merge: Keep whichever is richer
      const existing = uniqueArticles[duplicateIndex];
      const chooseCandidate =
        (!existing.imageUrl && !!candidate.imageUrl) ||
        (candidate.summary.length > existing.summary.length + 50) ||
        (!existing.author && !!candidate.author);

      if (chooseCandidate) {
        uniqueArticles[duplicateIndex] = {
          ...candidate,
          // Preserve tags and metadata from both
          tags: Array.from(new Set([...existing.tags, ...candidate.tags])),
        };
      }
    }
  }

  return uniqueArticles;
}
