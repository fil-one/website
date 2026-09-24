import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useSeo } from "./useSeo";
import { BASE_URL, ROUTE_META } from "../../scripts/routeMeta.mjs";

type Props = Parameters<typeof useSeo>[0];

const Probe = (props: Props): null => {
  useSeo(props);
  return null;
};

const renderAt = (path: string, props?: Props) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Probe {...props} />
    </MemoryRouter>,
  );

const meta = (selector: string) =>
  document.head.querySelector<HTMLMetaElement>(selector)?.content ?? null;
const canonical = () =>
  document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? null;

beforeEach(() => {
  document.head.innerHTML = "";
  document.title = "";
});

describe("useSeo", () => {
  it("uses ROUTE_META for the current route, the same values the prerender ships", () => {
    renderAt("/pricing");
    expect(document.title).toBe(ROUTE_META["/pricing"].title);
    expect(meta('meta[name="description"]')).toBe(ROUTE_META["/pricing"].description);
    expect(meta('meta[property="og:title"]')).toBe(ROUTE_META["/pricing"].title);
    expect(meta('meta[name="twitter:description"]')).toBe(ROUTE_META["/pricing"].description);
    expect(canonical()).toBe(`${BASE_URL}/pricing`);
    expect(meta('meta[property="og:locale"]')).toBe("en_US");
    expect(meta('meta[name="robots"]')).toBeNull();
  });

  it("ignores page-supplied strings when the route has an entry", () => {
    renderAt("/about", { title: "Stale · Fil One", description: "Stale" });
    expect(document.title).toBe(ROUTE_META["/about"].title);
  });

  it("marks /lp/* pages noindex, follow with a self-referencing canonical", () => {
    renderAt("/lp/egress");
    expect(meta('meta[name="robots"]')).toBe("noindex, follow");
    expect(canonical()).toBe(`${BASE_URL}/lp/egress`);
  });

  it("sets og:locale es_ES on Spanish routes", () => {
    renderAt("/lp/es/barcelona");
    expect(meta('meta[property="og:locale"]')).toBe("es_ES");
  });

  it("falls back to page props on routes without an entry", () => {
    renderAt("/blog/some-post", {
      title: "Some post · Fil One",
      description: "Excerpt",
      canonical: `${BASE_URL}/blog/some-post`,
    });
    expect(document.title).toBe("Some post · Fil One");
    expect(canonical()).toBe(`${BASE_URL}/blog/some-post`);
  });

  it("drops the canonical and adds noindex for the 404 page", () => {
    document.head.innerHTML = `<link rel="canonical" href="${BASE_URL}/" />`;
    renderAt("/does-not-exist", { title: "Page not found · Fil One", noindex: true });
    expect(document.title).toBe("Page not found · Fil One");
    expect(canonical()).toBeNull();
    expect(meta('meta[name="robots"]')).toBe("noindex");
  });
});
