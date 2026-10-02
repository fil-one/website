import { describe, it, expect } from "vitest";
import { routePaths } from "@/routes";
// Pure data module shared with scripts/prerender.mjs (no side effects on import).
import { ROUTE_META, isNoindexRoute, sitemapPaths } from "../../scripts/routeMeta.mjs";

/**
 * Guards against the recurring "route manifest drift" bug (audit N3): routes.tsx,
 * the prerender ROUTE_META, and the sitemap used to be hand-synced and diverged.
 *
 * The sitemap and the prerendered set are now both generated from routePaths, so
 * they can't drift. The only thing still authored by hand is ROUTE_META, so we
 * assert it stays in exact parity with the route table.
 */
describe("route ↔ SEO metadata parity", () => {
  it("every route in routes.tsx has a ROUTE_META entry", () => {
    const missing = routePaths.filter((p) => !(p in ROUTE_META));
    expect(missing).toEqual([]);
  });

  it("every ROUTE_META entry maps to a real route", () => {
    const paths = new Set(routePaths);
    const extra = Object.keys(ROUTE_META).filter((k) => !paths.has(k));
    expect(extra).toEqual([]);
  });

  it("has no duplicate route paths", () => {
    expect(new Set(routePaths).size).toBe(routePaths.length);
  });
});

describe("ROUTE_META copy conventions", () => {
  const entries = Object.entries(ROUTE_META);

  it("titles fit in search results (<= 60 chars) and use one format", () => {
    const bad = entries
      .filter(([path, m]) => {
        if (m.title.length > 60) return true;
        return path === "/" ? !m.title.startsWith("Fil One · ") : !m.title.endsWith(" · Fil One");
      })
      .map(([path, m]) => `${path}: ${m.title}`);
    expect(bad).toEqual([]);
  });

  it("descriptions are 160 chars or fewer", () => {
    const bad = entries.filter(([, m]) => m.description.length > 160).map(([p]) => p);
    expect(bad).toEqual([]);
  });

  it("has no em dashes, stale prices, or out-of-set competitors", () => {
    const bad = entries
      .filter(([, m]) => /—|\$4\.99|Google Cloud|\bGCP\b|Azure/.test(JSON.stringify(m)))
      .map(([p]) => p);
    expect(bad).toEqual([]);
  });
});

describe("/lp/* campaign pages stay out of search", () => {
  const lpRoutes = routePaths.filter((p) => p.startsWith("/lp/"));

  it("marks every /lp/* route noindex and nothing else", () => {
    expect(lpRoutes.length).toBeGreaterThan(0);
    expect(lpRoutes.filter((p) => !isNoindexRoute(p))).toEqual([]);
    expect(routePaths.filter((p) => !p.startsWith("/lp/") && isNoindexRoute(p))).toEqual([]);
  });

  it("leaves /lp/* routes out of the sitemap but keeps every other route", () => {
    const sitemap = sitemapPaths(routePaths);
    expect(sitemap.filter((p) => p.startsWith("/lp"))).toEqual([]);
    expect(sitemap).toEqual(routePaths.filter((p) => !p.startsWith("/lp/")));
  });
});
