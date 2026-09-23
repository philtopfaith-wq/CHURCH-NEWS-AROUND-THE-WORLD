/**
 * Safe Date Parsing & Formatting Utility
 * Handles ISO 8601, RFC 2822, UTC, locale formatting, and fallback logic.
 */

export function parseToIsoDate(dateString?: string | null): string | undefined {
  if (!dateString) return undefined;

  try {
    const parsed = new Date(dateString);
    const timestamp = parsed.getTime();

    // Check for Invalid Date
    if (isNaN(timestamp)) {
      return undefined;
    }

    // Future-date protection: articles dated more than 24 hours into the future are suspect
    const now = Date.now();
    const twentyFourHoursAhead = now + 24 * 60 * 60 * 1000;
    if (timestamp > twentyFourHoursAhead) {
      return new Date(now).toISOString();
    }

    return parsed.toISOString();
  } catch {
    return undefined;
  }
}

export function formatArticleDate(isoString?: string | null): string {
  if (!isoString) return 'Date unknown';

  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Date unknown';

    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return 'Date unknown';
  }
}

export function formatFullDateTime(isoString?: string | null): string {
  if (!isoString) return 'Date unknown';

  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Date unknown';

    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  } catch {
    return 'Date unknown';
  }
}

export function formatRelativeTime(isoString?: string | null): string {
  if (!isoString) return 'Undated';

  try {
    const date = new Date(isoString);
    const timestamp = date.getTime();
    if (isNaN(timestamp)) return 'Undated';

    const now = Date.now();
    const diffMs = now - timestamp;

    if (diffMs < 0) {
      return 'Just now';
    }

    const diffMinutes = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return formatArticleDate(isoString);
  } catch {
    return 'Undated';
  }
}

/**
 * Comparator to sort articles newest-first.
 * Articles with valid publishedAt appear first, sorted descending.
 * Articles without publication date are placed at the end, sorted by fetchedAt.
 */
export function compareArticlesNewestFirst(a: { publishedAt?: string; fetchedAt: string }, b: { publishedAt?: string; fetchedAt: string }): number {
  const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : -1;
  const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : -1;

  if (timeA > 0 && timeB > 0) {
    return timeB - timeA;
  }
  if (timeA > 0 && timeB <= 0) {
    return -1; // a has date, b doesn't
  }
  if (timeA <= 0 && timeB > 0) {
    return 1;  // b has date, a doesn't
  }

  // Fallback to fetch time
  const fetchA = new Date(a.fetchedAt).getTime() || 0;
  const fetchB = new Date(b.fetchedAt).getTime() || 0;
  return fetchB - fetchA;
}

export function compareArticlesOldestFirst(a: { publishedAt?: string; fetchedAt: string }, b: { publishedAt?: string; fetchedAt: string }): number {
  return -compareArticlesNewestFirst(a, b);
}
