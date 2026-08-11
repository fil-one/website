import {
  DEFAULT_LIMIT,
  HubSpotError,
  clampLimit,
  fetchPublishedPage,
  fetchPublishedPostBySlug,
  getHubSpotConfig,
} from "../_lib/hubspot.js";

/**
 * GET /api/blogs                  → page of published post summaries (no body)
 * GET /api/blogs?slug=my-post     → single published post, body included
 *
 * Server-side so the HubSpot private app token never reaches the browser.
 */
export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { accessToken, contentGroupId } = getHubSpotConfig();
  if (!accessToken) {
    return response.status(503).json({ error: "HubSpot access token is not configured" });
  }

  const slug = Array.isArray(request.query.slug) ? request.query.slug[0] : request.query.slug;

  try {
    if (slug) {
      const post = await fetchPublishedPostBySlug({ accessToken, contentGroupId, slug });
      if (!post) return response.status(404).json({ error: "Blog post not found" });

      response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
      return response.status(200).json({ results: [post], total: 1 });
    }

    const page = await fetchPublishedPage({
      accessToken,
      contentGroupId,
      limit: request.query.limit === undefined ? DEFAULT_LIMIT : clampLimit(request.query.limit),
      after: request.query.after,
    });

    response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
    return response.status(200).json(page);
  } catch (error) {
    if (error instanceof HubSpotError) {
      return response.status(error.status).json({ error: "HubSpot request failed" });
    }
    return response.status(502).json({ error: "Unable to reach HubSpot" });
  }
}
