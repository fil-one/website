import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  BASE_URL,
  ROUTE_META,
  isNoindexRoute,
  NOINDEX_ROBOTS,
} from "../../scripts/routeMeta.mjs";

interface SeoProps {
  /**
   * Fallbacks for routes with no ROUTE_META entry (dynamic routes like
   * /blog/:slug, and the 404 page). Ignored when the route has an entry.
   */
  title?: string;
  description?: string;
  /** Full canonical URL e.g. https://www.fil.one/. Derived from the route when omitted. */
  canonical?: string;
  ogImage?: string;
  /** Adds <meta name="robots" content="noindex"> and drops the canonical link. */
  noindex?: boolean;
}

const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

/** og:locale per <html lang>; anything unlisted falls back to en_US. */
const OG_LOCALE: Record<string, string> = { en: "en_US", es: "es_ES" };

/** "/pricing/" → "/pricing", so trailing-slash URLs still find their entry. */
const normalizePath = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

/**
 * Resolves the SEO values for a route. scripts/routeMeta.mjs is the single
 * source: the prerender bakes the same values into each page's static HTML, so
 * crawlers, link unfurls, and the live tab title always agree. Page-supplied
 * title/description only apply to routes without an entry.
 */
export function resolveSeo(pathname: string, props: SeoProps = {}) {
  const path = normalizePath(pathname);
  const meta = ROUTE_META[path];
  return {
    title: meta?.title ?? props.title ?? ROUTE_META["/"].title!,
    description: meta?.description ?? props.description ?? ROUTE_META["/"].description!,
    canonical: props.noindex
      ? null
      : props.canonical ?? `${BASE_URL}${path}`,
    ogImage: props.ogImage ?? DEFAULT_OG_IMAGE,
    ogLocale: OG_LOCALE[meta?.lang ?? "en"] ?? OG_LOCALE.en,
    // 404s opt out entirely; /lp/* campaign pages stay crawlable but unindexed
    // (same rule the prerender applies).
    robots: props.noindex ? "noindex" : isNoindexRoute(path) ? NOINDEX_ROBOTS : null,
  };
}

/**
 * Sets document <title>, meta description, canonical link, robots, and all
 * Open Graph / Twitter card meta tags for the current route. Runs client-side
 * only (SPA navigation); scripts/prerender.mjs writes the same values into the
 * static HTML from ROUTE_META.
 */
export function useSeo(props: SeoProps = {}) {
  const { pathname } = useLocation();
  const { title, description, canonical, ogImage, ogLocale, robots } = resolveSeo(
    pathname,
    props,
  );

  useEffect(() => {
    // Title
    document.title = title;

    // Meta helpers
    const setMeta = (attr: "name" | "property", value: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${value}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // Core
    setMeta("name", "description", description);
    if (canonical) {
      setLink("canonical", canonical);
    } else {
      document.querySelector('link[rel="canonical"]')?.remove();
    }
    // Indexable routes carry no robots tag, so remove any left by the last route.
    if (robots) {
      setMeta("name", "robots", robots);
    } else {
      document.querySelector('meta[name="robots"]')?.remove();
    }

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical ?? `${BASE_URL}${normalizePath(pathname)}`);
    setMeta("property", "og:locale", ogLocale);
    setMeta("property", "og:image", ogImage);

    // Twitter Card
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
  }, [title, description, canonical, ogImage, ogLocale, robots, pathname]);
}
