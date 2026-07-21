import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  /** Full canonical URL e.g. https://www.fil.one/ */
  canonical: string;
  ogImage?: string;
}

/**
 * Sets document <title>, meta description, canonical link, and all Open Graph /
 * Twitter card meta tags for the current route. Works client-side only (SPA)
 * but pairs with react-snap pre-rendering so crawlers see static HTML.
 */
export function useSeo({ title, description, canonical, ogImage }: SeoProps) {
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
    setLink("canonical", canonical);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    if (ogImage) setMeta("property", "og:image", ogImage);

    // Twitter Card
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (ogImage) setMeta("name", "twitter:image", ogImage);
  }, [title, description, canonical, ogImage]);
}
