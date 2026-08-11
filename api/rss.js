import { BASE_URL } from "../scripts/routeMeta.mjs";
import { MAX_LIMIT, fetchPublishedPage, getHubSpotConfig, localSlug } from "./_lib/hubspot.js";

/**
 * Serves /blog/rss.xml (via the vercel.json rewrite).
 *
 * Built at request time from the same published-post feed the site reads, so a
 * post published in HubSpot appears without a deploy.
 */

const FEED_TITLE = "Fil One Blog";
const FEED_DESCRIPTION =
  "Ideas and practical guidance on object storage, AI infrastructure, and the cost of moving data at scale.";
const ITEM_LIMIT = 50;

const escapeXml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const stripHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const rfc822 = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toUTCString();
};

const item = (post) => {
  const url = `${BASE_URL}/blog/${localSlug(post.slug)}`;
  const published = rfc822(post.publishDate || post.createdAt);
  const description = stripHtml(post.postSummary || post.metaDescription || "");

  return [
    "    <item>",
    `      <title>${escapeXml(post.name)}</title>`,
    `      <link>${escapeXml(url)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
    description ? `      <description>${escapeXml(description)}</description>` : "",
    published ? `      <pubDate>${published}</pubDate>` : "",
    ...(post.tags || []).map((tag) => `      <category>${escapeXml(tag.name)}</category>`),
    "    </item>",
  ]
    .filter(Boolean)
    .join("\n");
};

export default async function handler(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    return response.status(405).send("Method not allowed");
  }

  const { accessToken, contentGroupId } = getHubSpotConfig();
  if (!accessToken) {
    return response.status(503).send("HubSpot access token is not configured");
  }

  let posts = [];
  try {
    const page = await fetchPublishedPage({
      accessToken,
      contentGroupId,
      limit: Math.min(ITEM_LIMIT, MAX_LIMIT),
    });
    posts = page.results;
  } catch {
    return response.status(502).send("Unable to reach HubSpot");
  }

  const feedUrl = `${BASE_URL}/blog/rss.xml`;
  const lastBuild = rfc822(posts[0]?.publishDate || posts[0]?.createdAt) || new Date().toUTCString();

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${BASE_URL}/blog</link>`,
    `    <description>${escapeXml(FEED_DESCRIPTION)}</description>`,
    "    <language>en</language>",
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    ...posts.map(item),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  response.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=300, stale-while-revalidate=3600");
  return response.status(200).send(xml);
}
