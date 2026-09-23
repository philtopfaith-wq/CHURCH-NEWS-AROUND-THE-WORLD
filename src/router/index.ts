import { useState, useEffect } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
  search: string;
}

export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { path: '/', params: {}, search: '' };
  }

  const pathname = window.location.pathname || '/';
  const search = window.location.search || '';

  // Match /category/:slug
  const categoryMatch = pathname.match(/^\/category\/([a-zA-Z0-9_-]+)/);
  if (categoryMatch) {
    return {
      path: '/category',
      params: { slug: categoryMatch[1] },
      search,
    };
  }

  // Match /article/:id
  const articleMatch = pathname.match(/^\/article\/([a-zA-Z0-9_-]+)/);
  if (articleMatch) {
    return {
      path: '/article',
      params: { id: articleMatch[1] },
      search,
    };
  }

  if (pathname.startsWith('/latest')) {
    return { path: '/latest', params: {}, search };
  }

  if (pathname.startsWith('/search')) {
    return { path: '/search', params: {}, search };
  }

  if (pathname.startsWith('/about')) {
    return { path: '/about', params: {}, search };
  }

  return { path: '/', params: {}, search };
}

export function navigateTo(path: string) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

export function useAppRouter() {
  const [route, setRoute] = useState<RouteState>(() => parseCurrentRoute());

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseCurrentRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    route,
    navigate: navigateTo,
  };
}
