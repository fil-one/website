import { HubSpotError, fetchPublishedPostById, getHubSpotConfig } from "../_lib/hubspot.js";

/**
 * GET /api/blogs/:id → single published post from the configured blog group.
 *
 * Drafts and posts belonging to other blog groups return 404.
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

  const id = Array.isArray(request.query.id) ? request.query.id[0] : request.query.id;
  if (!id || !/^\d+$/.test(id)) return response.status(400).json({ error: "Invalid blog post ID" });

  try {
    const post = await fetchPublishedPostById({ accessToken, contentGroupId, id });
    if (!post) return response.status(404).json({ error: "Blog post not found" });

    response.setHeader("Cache-Control", "public, max-age=0, s-maxage=300, stale-while-revalidate=3600");
    return response.status(200).json(post);
  } catch (error) {
    if (error instanceof HubSpotError) {
      return response.status(error.status).json({ error: "HubSpot request failed" });
    }
    return response.status(502).json({ error: "Unable to reach HubSpot" });
  }
}
