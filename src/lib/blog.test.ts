import { describe, it, expect, vi, afterEach } from "vitest";
import {
  ALL_CATEGORY,
  buildCategories,
  coverStyleFor,
  filterPosts,
  fetchBlogPostBySlug,
  fetchBlogPosts,
  localSlug,
  mapHubSpotPost,
  stripLeadingHeadings,
  stripHtml,
  truncateExcerpt,
} from "./blog";
import type { HubSpotBlogPost } from "@/types/blog";

const post = (overrides: Partial<HubSpotBlogPost> = {}): HubSpotBlogPost => ({
  id: "1",
  slug: "my-post",
  name: "My post",
  ...overrides,
});

const jsonResponse = (body: unknown, status = 200) =>
  ({ ok: status < 400, status, json: async () => body }) as Response;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("blog helpers", () => {
  it("strips markup and collapses whitespace", () => {
    expect(stripHtml("<p>Hello   <strong>there</strong></p>")).toBe("Hello there");
  });

  it("truncates on a word boundary with an ellipsis", () => {
    expect(truncateExcerpt("one two three", 7)).toBe("one…");
    expect(truncateExcerpt("short", 20)).toBe("short");
  });

  it("routes on the last slug segment", () => {
    expect(localSlug("blog/nested/my-post")).toBe("my-post");
    expect(localSlug("my-post")).toBe("my-post");
  });

  it("assigns a stable cover style per post id", () => {
    expect(coverStyleFor("12345")).toBe(coverStyleFor("12345"));
    expect(["cyan", "violet", "lime"]).toContain(coverStyleFor("98765"));
  });
});

describe("excerpt source", () => {
  it("drops a leading heading so it doesn't open the excerpt", () => {
    const mapped = mapHubSpotPost(
      post({ postSummary: "<h2>Introduction</h2><p>The actual first sentence.</p>" })
    );
    expect(mapped.excerpt).toBe("The actual first sentence.");
  });

  it("prefers metaDescription over postSummary", () => {
    // HubSpot's importer can dump a whole article into postSummary.
    const mapped = mapHubSpotPost(
      post({ postSummary: "<p>" + "body ".repeat(2000) + "</p>", metaDescription: "A real description." })
    );
    expect(mapped.excerpt).toBe("A real description.");
  });

  it("leaves headings mid-content alone", () => {
    expect(stripLeadingHeadings("<p>Lead</p><h2>Section</h2>")).toBe("<p>Lead</p><h2>Section</h2>");
  });
});

describe("mapHubSpotPost", () => {
  it("falls back through summary, meta description and author", () => {
    const mapped = mapHubSpotPost(post({ metaDescription: "<em>Meta</em>" }));
    expect(mapped.excerpt).toBe("Meta");
    expect(mapped.author).toBe("Fil One Team");
    expect(mapped.featuredImage).toBeUndefined();
  });

  it("leaves publishedAt undefined when HubSpot has no dates", () => {
    expect(mapHubSpotPost(post()).publishedAt).toBeUndefined();
  });

  it("prefers publishDate over createdAt", () => {
    const mapped = mapHubSpotPost(post({ publishDate: "2026-01-02", createdAt: "2025-01-01" }));
    expect(mapped.publishedAt).toBe("2026-01-02");
  });
});

describe("fetchBlogPosts", () => {
  it("follows the paging cursor and sorts newest first", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          results: [post({ id: "1", slug: "older", publishDate: "2026-01-01" })],
          paging: { next: { after: "cursor-2" } },
        })
      )
      .mockResolvedValueOnce(
        jsonResponse({ results: [post({ id: "2", slug: "newer", publishDate: "2026-02-01" })] })
      );
    vi.stubGlobal("fetch", fetchMock);

    const posts = await fetchBlogPosts();

    expect(posts.map((p) => p.slug)).toEqual(["newer", "older"]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[1][0])).toContain("after=cursor-2");
  });

  it("throws when the API errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({}, 500)));
    await expect(fetchBlogPosts()).rejects.toThrow("500");
  });
});

describe("fetchBlogPostBySlug", () => {
  it("resolves the slug server-side in a single request", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse({ results: [post({ postBody: "<p>Body</p>" })] }));
    vi.stubGlobal("fetch", fetchMock);

    const found = await fetchBlogPostBySlug("my-post");

    expect(found?.content).toBe("<p>Body</p>");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toBe("/api/blogs?slug=my-post");
  });

  it("returns undefined for an unknown slug", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ error: "nope" }, 404)));
    await expect(fetchBlogPostBySlug("missing")).resolves.toBeUndefined();
  });

  it("throws on a server error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({}, 502)));
    await expect(fetchBlogPostBySlug("my-post")).rejects.toThrow("502");
  });
});

const CHANGELOG = { id: "1", name: "Changelog", slug: "changelog" };
const TEAM = { id: "2", name: "From the team", slug: "from-the-team" };

const mapped = (overrides: Partial<HubSpotBlogPost> = {}) => mapHubSpotPost(post(overrides));

describe("buildCategories", () => {
  it("lists tags present on posts, most-used first", () => {
    const posts = [
      mapped({ id: "1", tags: [CHANGELOG] }),
      mapped({ id: "2", tags: [TEAM, CHANGELOG] }),
      mapped({ id: "3", tags: [CHANGELOG] }),
    ];
    expect(buildCategories(posts).map((c) => [c.slug, c.count])).toEqual([
      ["changelog", 3],
      ["from-the-team", 1],
    ]);
  });

  it("is empty when no post carries a tag", () => {
    expect(buildCategories([mapped()])).toEqual([]);
  });
});

describe("filterPosts", () => {
  const posts = [
    mapped({ id: "1", name: "Egress fees explained", tags: [CHANGELOG] }),
    mapped({ id: "2", name: "Hiring an SRE", postSummary: "Team update", tags: [TEAM] }),
  ];

  it("returns everything for the All category and an empty query", () => {
    expect(filterPosts(posts, { category: ALL_CATEGORY, query: "" })).toHaveLength(2);
    expect(filterPosts(posts)).toHaveLength(2);
  });

  it("filters by category slug", () => {
    expect(filterPosts(posts, { category: "from-the-team" }).map((p) => p.id)).toEqual(["2"]);
  });

  it("searches title, excerpt and category name, case-insensitively", () => {
    expect(filterPosts(posts, { query: "EGRESS" }).map((p) => p.id)).toEqual(["1"]);
    expect(filterPosts(posts, { query: "team update" }).map((p) => p.id)).toEqual(["2"]);
    expect(filterPosts(posts, { query: "changelog" }).map((p) => p.id)).toEqual(["1"]);
    expect(filterPosts(posts, { query: "   " })).toHaveLength(2);
  });

  it("combines category and query", () => {
    expect(filterPosts(posts, { category: "changelog", query: "hiring" })).toEqual([]);
  });
});
