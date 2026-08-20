import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

/**
 * Handler-level tests for the blog endpoints: status codes, headers and the
 * shape of what reaches the browser. The helper internals are covered in
 * _lib/hubspot.test.js.
 *
 * Each case imports the handlers fresh so the tag/slug caches don't leak.
 */

const TOKEN = "fixture-token";

const hubspotPost = (overrides = {}) => ({
  id: "1001",
  slug: "blog/my-post",
  name: "My post",
  state: "PUBLISHED",
  contentGroupId: "42",
  postSummary: "<p>A summary.</p>",
  postBody: "<p>Body</p>",
  publishDate: "2026-07-01T09:00:00Z",
  password: "secret",
  ...overrides,
});

const jsonResponse = (body, status = 200) => ({ ok: status < 400, status, json: async () => body });
const textResponse = (body, status = 200) => ({ ok: status < 400, status, text: async () => body });

/** Minimal Vercel-style response recorder. */
const makeResponse = () => ({
  statusCode: undefined,
  headers: {},
  body: undefined,
  setHeader(key, value) {
    this.headers[key.toLowerCase()] = value;
  },
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.body = payload;
    return this;
  },
  send(payload) {
    this.body = payload;
    return this;
  },
});

const request = (overrides = {}) => ({
  method: "GET",
  url: "/api/test",
  headers: { host: "www.fil.one", "x-forwarded-proto": "https" },
  query: {},
  ...overrides,
});

/** Route fetch by URL fragment so Promise.all ordering can't break a test. */
const stubFetch = (routes) =>
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url) => {
      for (const [match, response] of routes) {
        if (String(url).includes(match)) return response;
      }
      throw new Error(`unexpected fetch: ${url}`);
    })
  );

const load = async (file) => {
  vi.resetModules();
  return (await import(file)).default;
};

beforeEach(() => {
  process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN = TOKEN;
  process.env.HUBSPOT_BLOG_CONTENT_GROUP_ID = "42";
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  delete process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN;
  delete process.env.HUBSPOT_BLOG_CONTENT_GROUP_ID;
});

describe("GET /api/blogs", () => {
  it("rejects non-GET with an Allow header", async () => {
    const handler = await load("./blogs/index.js");
    const response = makeResponse();
    await handler(request({ method: "POST" }), response);

    expect(response.statusCode).toBe(405);
    expect(response.headers.allow).toBe("GET");
  });

  it("503s when the token is missing, without calling HubSpot", async () => {
    delete process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const handler = await load("./blogs/index.js");
    const response = makeResponse();
    await handler(request(), response);

    expect(response.statusCode).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns projected summaries with CDN caching and browser revalidation", async () => {
    stubFetch([
      ["tags", jsonResponse({ results: [{ id: 5, name: "Changelog" }] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts", jsonResponse({ results: [hubspotPost()], total: 1 })],
    ]);

    const handler = await load("./blogs/index.js");
    const response = makeResponse();
    await handler(request(), response);

    expect(response.statusCode).toBe(200);
    expect(response.headers["cache-control"]).toContain("s-maxage=300");
    expect(response.headers["cache-control"]).toContain("max-age=0");
    // No body on the list, and no HubSpot internals.
    expect(response.body.results[0].postBody).toBeUndefined();
    expect(response.body.results[0].password).toBeUndefined();
  });

  it("maps a HubSpot error status through", async () => {
    stubFetch([
      ["tags", jsonResponse({ results: [] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts", jsonResponse({}, 429)],
    ]);

    const handler = await load("./blogs/index.js");
    const response = makeResponse();
    await handler(request(), response);

    expect(response.statusCode).toBe(429);
    expect(response.body).toEqual({ error: "HubSpot request failed" });
  });

  it("?slug= returns one post with its body", async () => {
    stubFetch([
      ["tags", jsonResponse({ results: [] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts/1001", jsonResponse(hubspotPost())],
      ["posts", jsonResponse({ results: [hubspotPost()] })],
    ]);

    const handler = await load("./blogs/index.js");
    const response = makeResponse();
    await handler(request({ query: { slug: "my-post" } }), response);

    expect(response.statusCode).toBe(200);
    expect(response.body.results[0].postBody).toBe("<p>Body</p>");
  });

  it("?slug= 404s for an unknown slug", async () => {
    stubFetch([
      ["tags", jsonResponse({ results: [] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts", jsonResponse({ results: [] })],
    ]);

    const handler = await load("./blogs/index.js");
    const response = makeResponse();
    await handler(request({ query: { slug: "nope" } }), response);

    expect(response.statusCode).toBe(404);
  });
});

describe("GET /api/blogs/:id", () => {
  it("400s on a non-numeric id", async () => {
    const handler = await load("./blogs/[id].js");
    const response = makeResponse();
    await handler(request({ query: { id: "../etc" } }), response);

    expect(response.statusCode).toBe(400);
  });

  it("404s for a post in another blog group", async () => {
    stubFetch([
      ["tags", jsonResponse({ results: [] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts/1001", jsonResponse(hubspotPost({ contentGroupId: "999" }))],
    ]);

    const handler = await load("./blogs/[id].js");
    const response = makeResponse();
    await handler(request({ query: { id: "1001" } }), response);

    expect(response.statusCode).toBe(404);
  });
});

describe("GET /blog/rss.xml", () => {
  it("emits a valid feed with per-post categories", async () => {
    stubFetch([
      ["tags", jsonResponse({ results: [{ id: 5, name: "Product launches" }] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts", jsonResponse({ results: [hubspotPost({ tagIds: [5] })] })],
    ]);

    const handler = await load("./rss.js");
    const response = makeResponse();
    await handler(request(), response);

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("application/rss+xml");
    expect(response.body).toContain("<title>My post</title>");
    expect(response.body).toContain("<link>https://www.fil.one/blog/my-post</link>");
    expect(response.body).toContain("<category>Product launches</category>");
    expect(response.body).toContain("<pubDate>Wed, 01 Jul 2026 09:00:00 GMT</pubDate>");
    // Nothing unescaped and no draft/internal fields leaked.
    expect(response.body).not.toContain("secret");
  });

  it("503s as plain text when unconfigured", async () => {
    delete process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN;
    const handler = await load("./rss.js");
    const response = makeResponse();
    await handler(request(), response);

    expect(response.statusCode).toBe(503);
    expect(response.headers["content-type"]).toContain("text/plain");
  });
});

describe("GET /blog/:slug (request-time meta)", () => {
  const SHELL = `<!doctype html><html lang="en"><head>
    <title>Fil One | S3 object storage built for the AI era</title>
    <meta name="description" content="default" />
    <link rel="canonical" href="https://www.fil.one/" />
    <meta property="og:title" content="default" />
    <meta property="og:description" content="default" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.fil.one/" />
    <meta property="og:image" content="https://www.fil.one/og-image.png" />
    <meta name="twitter:title" content="default" />
    <meta name="twitter:description" content="default" />
    <meta name="twitter:image" content="https://www.fil.one/og-image.png" />
    <!--META_JSON_LD--></head><body><div id="root"></div></body></html>`;

  it("injects the article's title, canonical, og:type and JSON-LD", async () => {
    stubFetch([
      ["/index.html", textResponse(SHELL)],
      ["tags", jsonResponse({ results: [] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts/1001", jsonResponse(hubspotPost())],
      ["posts", jsonResponse({ results: [hubspotPost()] })],
    ]);

    const handler = await load("./blog-page.js");
    const response = makeResponse();
    await handler(request({ query: { slug: "my-post" } }), response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain("<title>My post · Fil One</title>");
    expect(response.body).toContain('href="https://www.fil.one/blog/my-post"');
    expect(response.body).toContain('content="article"');
    expect(response.body).toContain('"@type":"BlogPosting"');
    expect(response.body).toContain('<div id="root"></div>');
  });

  it("404s an unknown slug as noindex, with generic blog meta", async () => {
    stubFetch([
      ["/index.html", textResponse(SHELL)],
      ["tags", jsonResponse({ results: [] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts", jsonResponse({ results: [] })],
    ]);

    const handler = await load("./blog-page.js");
    const response = makeResponse();
    await handler(request({ query: { slug: "nope" } }), response);

    expect(response.statusCode).toBe(404);
    expect(response.headers["x-robots-tag"]).toBe("noindex");
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.body).toContain("<title>Blog · Fil One</title>");
    // A 404 must not claim to be an article.
    expect(response.body).toContain('property="og:type" content="website"');
  });

  it("escapes HTML in post titles", async () => {
    stubFetch([
      ["/index.html", textResponse(SHELL)],
      ["tags", jsonResponse({ results: [] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts/1001", jsonResponse(hubspotPost({ name: 'Quotes "and" <tags>' }))],
      ["posts", jsonResponse({ results: [hubspotPost({ name: 'Quotes "and" <tags>' })] })],
    ]);

    const handler = await load("./blog-page.js");
    const response = makeResponse();
    await handler(request({ query: { slug: "my-post" } }), response);

    expect(response.body).toContain("&quot;and&quot;");
    expect(response.body).not.toContain("<tags>");
  });

  it("inserts meta the shell is missing instead of leaving the default", async () => {
    // A shell stripped of og:image and JSON-LD, as if index.html were edited.
    const bare = `<!doctype html><html><head><title>Fil One</title></head><body><div id="root"></div></body></html>`;
    stubFetch([
      ["/index.html", textResponse(bare)],
      ["tags", jsonResponse({ results: [] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts/1001", jsonResponse(hubspotPost())],
      ["posts", jsonResponse({ results: [hubspotPost()] })],
    ]);

    const handler = await load("./blog-page.js");
    const response = makeResponse();
    await handler(request({ query: { slug: "my-post" } }), response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain("<title>My post · Fil One</title>");
    expect(response.body).toContain('property="og:image"');
    expect(response.body).toContain('property="og:url" content="https://www.fil.one/blog/my-post"');
    expect(response.body).toContain('"@type":"BlogPosting"');
    // An insertion is a warning, not an error — it self-heals.
    expect(console.warn).toHaveBeenCalled();
  });

  it("still renders when the shell has no </head>", async () => {
    stubFetch([
      ["/index.html", textResponse("<div id=\"root\"></div>")],
      ["tags", jsonResponse({ results: [] })],
      ["authors", jsonResponse({ results: [] })],
      ["posts/1001", jsonResponse(hubspotPost())],
      ["posts", jsonResponse({ results: [hubspotPost()] })],
    ]);

    const handler = await load("./blog-page.js");
    const response = makeResponse();
    await handler(request({ query: { slug: "my-post" } }), response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('<div id="root"></div>');
  });

  it("502s when the shell can't be fetched", async () => {
    stubFetch([["/index.html", textResponse("nope", 500)]]);

    const handler = await load("./blog-page.js");
    const response = makeResponse();
    await handler(request({ query: { slug: "my-post" } }), response);

    expect(response.statusCode).toBe(502);
  });
});
