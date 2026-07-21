import { describe, it, expect } from "vitest";
import { routePaths } from "@/routes";
// Pure data module shared with scripts/prerender.mjs (no side effects on import).
import { ROUTE_META } from "../../scripts/routeMeta.mjs";

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
