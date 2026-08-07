const HUBSPOT_API_BASE = "https://api.hubapi.com/cms/blogs/2026-03/posts";
const HUBSPOT_BLOG_CONTENT_GROUP_ID = "217378575467";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const accessToken = process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN || "";
  if (!accessToken) {
    return response.status(503).json({ error: "HubSpot access token is not configured" });
  }

  const params = new URLSearchParams({
    state: "PUBLISHED",
    sort: "-createdAt",
    limit: String(Math.min(Number(request.query.limit) || 20, 100)),
    contentGroupId: HUBSPOT_BLOG_CONTENT_GROUP_ID,
  });
  if (request.query.after) params.set("after", String(request.query.after));

  try {
    const hubspotResponse = await fetch(`${HUBSPOT_API_BASE}?${params}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await hubspotResponse.json();
    if (!hubspotResponse.ok) return response.status(hubspotResponse.status).json({ error: "HubSpot request failed" });

    response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
    return response.status(200).json(data);
  } catch {
    return response.status(502).json({ error: "Unable to reach HubSpot" });
  }
}
