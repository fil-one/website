export const BASE_URL: string;

export interface RouteMetaEntry {
  title?: string;
  description?: string;
  lang?: string;
  jsonLd?: unknown[];
}

export const ROUTE_META: Record<string, RouteMetaEntry>;
