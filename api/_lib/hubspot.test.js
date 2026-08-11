import { describe, it, expect, vi, afterEach } from "vitest";
import {
  clampLimit,
  fetchPublishedPage,
  fetchPublishedPostById,
  fetchPublishedPostBySlug,
  localSlug,
  projectPost,
} from "./hubspot.js";

const CONFIG = { accessToken: "token", contentGroupId: "42" };

const hubspotPost = (overrides = {}) => ({
  id: "1",
  slug: "my-post",
  name: "My post",
  state: "PUBLISHED",
  contentGroupId: "42",
  postBody: "<p>Body</p>",
  // Fields HubSpot returns that must never reach the browser:
  password: "secret",
  campaign: "internal-campaign",
  widgetContainers: {},
  ...overrides,
});

const jsonResponse = (body, status = 200) => ({ ok: status < 400, status, json: async () => body });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("clampLimit", () => {
  it("clamps into [1, 100] and defaults on garbage", () => {
    expect(clampLimit("50")).toBe(50);
    expect(clampLimit("500")).toBe(100);
    expect(clampLimit("-5")).toBe(1);
    expect(clampLimit("abc")).toBe(20);
  });
});

describe("localSlug", () => {
  it("takes the last path segment", () => {
    expect(localSlug("blog/my-post")).toBe("my-post");
    expect(localSlug("")).toBe("");
  });
});

describe("projectPost", () => {
  it("forwards only public fields", () => {
    const projected = projectPost(hubspotPost());
    expect(Object.keys(projected).sort()).toEqual(["id", "name", "slug"]);
    expect(projected.password).toBeUndefined();
  });

  it("includes the body only when asked", () => {
    expect(projectPost(hubspotPost(), { includeBody: true }).postBody).toBe("<p>Body</p>");
  });
});

describe("fetchPublishedPage", () => {
  it("filters by state and content group, and projects the results", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ results: [hubspotPost()], total: 1 }));
    vi.stubGlobal("fetch", fetchMock);

    const page = await fetchPublishedPage({ ...CONFIG, limit: 100 });

    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain("state=PUBLISHED");
    expect(url).toContain("contentGroupId=42");
    expect(url).toContain("limit=100");
    expect(page.results[0].postBody).toBeUndefined();
  });

  it("maps a HubSpot error status through", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({}, 429)));
    await expect(fetchPublishedPage({ ...CONFIG, limit: 20 })).rejects.toMatchObject({ status: 429 });
  });
});

describe("fetchPublishedPostById", () => {
  it("returns the post with its body", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(hubspotPost())));
    await expect(fetchPublishedPostById({ ...CONFIG, id: "1" })).resolves.toMatchObject({
      id: "1",
      postBody: "<p>Body</p>",
    });
  });

  it("hides drafts", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(hubspotPost({ state: "DRAFT" }))));
    await expect(fetchPublishedPostById({ ...CONFIG, id: "1" })).resolves.toBeUndefined();
  });

  it("hides posts from another blog group", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(hubspotPost({ contentGroupId: "999" }))));
    await expect(fetchPublishedPostById({ ...CONFIG, id: "1" })).resolves.toBeUndefined();
  });
});

describe("fetchPublishedPostBySlug", () => {
  it("pages past the first result set to find the post", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          results: [hubspotPost({ id: "1", slug: "other" })],
          paging: { next: { after: "cursor-2" } },
        })
      )
      .mockResolvedValueOnce(jsonResponse({ results: [hubspotPost({ id: "2", slug: "blog/wanted" })] }))
      .mockResolvedValueOnce(jsonResponse(hubspotPost({ id: "2", slug: "blog/wanted" })));
    vi.stubGlobal("fetch", fetchMock);

    const found = await fetchPublishedPostBySlug({ ...CONFIG, slug: "wanted" });

    expect(found).toMatchObject({ id: "2", postBody: "<p>Body</p>" });
    expect(String(fetchMock.mock.calls[1][0])).toContain("after=cursor-2");
  });

  it("returns undefined when the archive is exhausted", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ results: [] })));
    await expect(fetchPublishedPostBySlug({ ...CONFIG, slug: "missing" })).resolves.toBeUndefined();
  });
});

describe("tag resolution", () => {
  /**
   * Tags are cached at module scope, so each case needs a fresh module. Mocks are
   * keyed by URL rather than call order — fetchPublishedPage fires the posts and
   * tags requests together via Promise.all.
   */
  const withFreshModule = async (routes) => {
    vi.resetModules();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url) => {
        for (const [match, response] of routes) {
          if (String(url).includes(match)) return response;
        }
        throw new Error(`unexpected fetch: ${url}`);
      })
    );
    return import("./hubspot.js");
  };

  const postsWith = (overrides) =>
    jsonResponse({ results: [hubspotPost(overrides)] });

  it("resolves categories from the dated tags path", async () => {
    const { fetchPublishedPage } = await withFreshModule([
      ["2026-03/tags", jsonResponse({ results: [{ id: 7, name: "Product launches" }] })],
      ["2026-03/posts", postsWith({ tagIds: [7] })],
    ]);

    const page = await fetchPublishedPage({ ...CONFIG, limit: 20 });

    // v3 tag objects carry no slug, so it is derived from the name.
    expect(page.results[0].tags).toEqual([
      { id: "7", name: "Product launches", slug: "product-launches" },
    ]);
  });

  it("falls back to the documented v3 tags path when the dated one 404s", async () => {
    const { fetchPublishedPage } = await withFreshModule([
      ["2026-03/tags", jsonResponse({}, 404)],
      ["cms/v3/blogs/tags", jsonResponse({ results: [{ id: 7, name: "Changelog" }] })],
      ["2026-03/posts", postsWith({ tagIds: [7] })],
    ]);

    const page = await fetchPublishedPage({ ...CONFIG, limit: 20 });

    expect(page.results[0].tags).toEqual([{ id: "7", name: "Changelog", slug: "changelog" }]);
  });

  it("reads the pre-v3 topicIds field too", async () => {
    const { fetchPublishedPage } = await withFreshModule([
      ["2026-03/tags", jsonResponse({ results: [{ id: 9, name: "Press" }] })],
      ["2026-03/posts", postsWith({ tagIds: undefined, topicIds: [9] })],
    ]);

    const page = await fetchPublishedPage({ ...CONFIG, limit: 20 });

    expect(page.results[0].tags).toEqual([{ id: "9", name: "Press", slug: "press" }]);
    expect(page.results[0].topicIds).toBeUndefined();
  });

  it("renders posts without categories when tag lookup fails entirely", async () => {
    const { fetchPublishedPage } = await withFreshModule([
      ["tags", jsonResponse({}, 500)],
      ["2026-03/posts", postsWith({ tagIds: [7] })],
    ]);

    const page = await fetchPublishedPage({ ...CONFIG, limit: 20 });

    expect(page.results).toHaveLength(1);
    expect(page.results[0].tags).toBeUndefined();
    expect(page.results[0].tagIds).toBeUndefined();
  });

  it("drops tag ids it cannot name", async () => {
    const { fetchPublishedPage } = await withFreshModule([
      ["2026-03/tags", jsonResponse({ results: [{ id: 1, name: "Changelog" }] })],
      ["2026-03/posts", postsWith({ tagIds: [1, 404] })],
    ]);

    const page = await fetchPublishedPage({ ...CONFIG, limit: 20 });

    expect(page.results[0].tags).toHaveLength(1);
  });
});
