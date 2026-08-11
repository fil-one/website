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
const HUBSPOT_TAGS_URL = "https://api.hubapi.com/cms/blogs/2026-03/tags";

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
  "tagIds",
];

/** Resolved blog tags, cached per warm function instance. */
const TAG_CACHE_TTL_MS = 5 * 60 * 1000;
let tagCache = { expiresAt: 0, tags: null };

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

/** "Product launches" → "product-launches", for the ?category= query param. */
export function slugifyTag(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * id → { id, name, slug } for every blog tag in the portal.
 *
 * Tags are the categories the blog filters on. Resolved separately because posts
 * carry only `tagIds`. Failures degrade to an empty map (posts render without
 * categories) rather than taking the whole blog down.
 */
export async function fetchTagMap({ accessToken }) {
  if (tagCache.tags && tagCache.expiresAt > Date.now()) return tagCache.tags;

  const tags = new Map();
  try {
    const response = await fetch(`${HUBSPOT_TAGS_URL}?limit=300`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.ok) {
      const data = await response.json();
      for (const tag of data.results || []) {
        if (!tag?.id || !tag?.name) continue;
        tags.set(String(tag.id), {
          id: String(tag.id),
          name: tag.name,
          slug: tag.slug || slugifyTag(tag.name),
        });
      }
    }
  } catch {
    // Leave the map empty — see above.
  }

  tagCache = { tags, expiresAt: Date.now() + TAG_CACHE_TTL_MS };
  return tags;
}

/** Swap a post's `tagIds` for resolved `tags`, dropping ids we can't name. */
function withTags(post, tagMap) {
  const { tagIds, ...rest } = post;
  const tags = (tagIds || []).map((id) => tagMap.get(String(id))).filter(Boolean);
  return tags.length ? { ...rest, tags } : rest;
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

  const [data, tagMap] = await Promise.all([
    hubspotFetch("", { accessToken, params }),
    fetchTagMap({ accessToken }),
  ]);
  const results = (data.results || [])
    .filter(isPublished)
    .map((post) => withTags(projectPost(post), tagMap));
  return { results, total: data.total, paging: data.paging };
}

/** Fetch one published post in the configured group by ID, body included. */
export async function fetchPublishedPostById({ accessToken, contentGroupId, id }) {
  const post = await hubspotFetch(`/${encodeURIComponent(id)}`, { accessToken });
  if (!isPublished(post)) return undefined;
  // Scope to our blog group so /blog/... can't surface another blog's content.
  if (String(post.contentGroupId) !== String(contentGroupId)) return undefined;

  const tagMap = await fetchTagMap({ accessToken });
  return withTags(projectPost(post, { includeBody: true }), tagMap);
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
