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
