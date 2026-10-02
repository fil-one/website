export const BASE_URL: string;

export function isNoindexRoute(path: string): boolean;

export const NOINDEX_ROBOTS: string;

export function sitemapPaths(routes: string[]): string[];

export interface RouteMetaEntry {
  title?: string;
  description?: string;
  lang?: string;
  jsonLd?: unknown[];
}

export const ROUTE_META: Record<string, RouteMetaEntry>;
