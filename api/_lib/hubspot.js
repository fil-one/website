/**
 * Server-only HubSpot Blog helpers.
 *
 * Shared by the /api/blogs endpoints and the /blog/:slug HTML renderer. Lives
 * under api/_lib/ so Vercel treats it as a library rather than a route.
 *
 * Two rules everything here follows:
 *  1. The private app token never leaves this process.
 *  2. Responses are projected down to the fields the site renders, so HubSpot's
 *     internal/campaign/analytics fields are never forwarded to the browser.
 */

const HUBSPOT_API_BASE = "https://api.hubapi.com/cms/blogs/2026-03/posts";

/** Fil One's HubSpot blog group. Override per portal (e.g. a sandbox) with env. */
const DEFAULT_CONTENT_GROUP_ID = "217378575467";

export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

/** Pages to scan when resolving a slug → post (MAX_LIMIT posts per page). */
const MAX_SLUG_SCAN_PAGES = 10;

/** Fields forwarded to the browser. Anything not listed is dropped. */
const PUBLIC_FIELDS = [
  "id",
  "slug",
  "name",
  "postSummary",
  "metaDescription",
  "authorName",
  "publishDate",
  "createdAt",
  "featuredImage",
  "featuredImageAltText",
];

export function getHubSpotConfig() {
  return {
    accessToken: process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN || "",
    contentGroupId: process.env.HUBSPOT_BLOG_CONTENT_GROUP_ID || DEFAULT_CONTENT_GROUP_ID,
  };
}

/** HubSpot slugs can be nested ("blog/my-post"); the site routes on the last segment. */
export function localSlug(slug = "") {
  const segments = String(slug).split("/").filter(Boolean);
  return segments.at(-1) ?? slug;
}

/** Clamp a caller-supplied limit into [1, MAX_LIMIT]. */
export function clampLimit(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_LIMIT;
  return Math.min(Math.max(Math.trunc(parsed), 1), MAX_LIMIT);
}

/** Strip a HubSpot post down to the public field set. */
export function projectPost(post, { includeBody = false } = {}) {
  const projected = {};
  for (const field of PUBLIC_FIELDS) {
    if (post[field] !== undefined && post[field] !== null) projected[field] = post[field];
  }
  if (includeBody) projected.postBody = post.postBody || "";
  return projected;
}

const isPublished = (post) => post?.state === "PUBLISHED" || post?.currentState === "PUBLISHED";

/** Thrown for any non-2xx HubSpot response so callers can map the status through. */
export class HubSpotError extends Error {
  constructor(status) {
    super(`HubSpot request failed with ${status}`);
    this.status = status;
  }
}

async function hubspotFetch(path, { accessToken, params }) {
  const query = params ? `?${params}` : "";
  const response = await fetch(`${HUBSPOT_API_BASE}${path}${query}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new HubSpotError(response.status);
  return response.json();
}

/**
 * One page of published posts from the configured blog group, newest first.
 * Returns projected summaries (no post body) plus the paging cursor.
 */
export async function fetchPublishedPage({ accessToken, contentGroupId, limit, after }) {
  const params = new URLSearchParams({
    state: "PUBLISHED",
    sort: "-publishDate",
    limit: String(limit),
    contentGroupId,
  });
  if (after) params.set("after", String(after));

  const data = await hubspotFetch("", { accessToken, params });
  const results = (data.results || []).filter(isPublished).map((post) => projectPost(post));
  return { results, total: data.total, paging: data.paging };
}

/** Fetch one published post in the configured group by ID, body included. */
export async function fetchPublishedPostById({ accessToken, contentGroupId, id }) {
  const post = await hubspotFetch(`/${encodeURIComponent(id)}`, { accessToken });
  if (!isPublished(post)) return undefined;
  // Scope to our blog group so /blog/... can't surface another blog's content.
  if (String(post.contentGroupId) !== String(contentGroupId)) return undefined;
  return projectPost(post, { includeBody: true });
}

/**
 * Resolve a local slug to a published post, body included.
 *
 * Pages through the published list (IDs + slugs only) to find the match, then
 * fetches that single post's body — so the whole archive is reachable, not just
 * the first page.
 */
export async function fetchPublishedPostBySlug({ accessToken, contentGroupId, slug }) {
  const target = localSlug(slug);
  let after;

  for (let page = 0; page < MAX_SLUG_SCAN_PAGES; page += 1) {
    const { results, paging } = await fetchPublishedPage({
      accessToken,
      contentGroupId,
      limit: MAX_LIMIT,
      after,
    });

    const match = results.find((post) => localSlug(post.slug) === target);
    if (match) return fetchPublishedPostById({ accessToken, contentGroupId, id: match.id });

    after = paging?.next?.after;
    if (!after) break;
  }

  return undefined;
}
