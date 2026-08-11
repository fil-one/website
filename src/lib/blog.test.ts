import { describe, it, expect, vi, afterEach } from "vitest";
import {
  coverStyleFor,
  fetchBlogPostBySlug,
  fetchBlogPosts,
  localSlug,
  mapHubSpotPost,
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
