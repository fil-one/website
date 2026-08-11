import { BASE_URL } from "../scripts/routeMeta.mjs";
import { fetchPublishedPostBySlug, getHubSpotConfig, localSlug } from "./_lib/hubspot.js";

/**
 * Serves /blog/:slug (via the vercel.json rewrite) with real per-article SEO and
 * Open Graph tags injected at request time.
 *
 * Article slugs can't be enumerated at build time — posts are published from
 * HubSpot without a deploy — so the prerender script skips them. Without this
 * function every article would ship the SPA shell's homepage meta, and crawlers
 * and link unfurlers (Slack, LinkedIn, X) would never see the article title.
 *
 * The page body still renders client-side; only <head> is templated here.
 */

const FALLBACK_OG_IMAGE = `${BASE_URL}/og-image.png`;
const DESCRIPTION_MAX = 200;

const escapeAttribute = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const stripHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (value, maxLength = DESCRIPTION_MAX) =>
  value.length <= maxLength
    ? value
    : `${value.slice(0, maxLength).replace(/\s+\S*$/, "").trim()}…`;

/** Fetch the built SPA shell from this same deployment. */
async function fetchShell(request) {
  const host = request.headers["x-forwarded-host"] || request.headers.host;
  const protocol = request.headers["x-forwarded-proto"] || "https";
  const shell = await fetch(`${protocol}://${host}/index.html`);
  if (!shell.ok) throw new Error(`Shell fetch returned ${shell.status}`);
  return shell.text();
}

/**
 * Apply one replacement, reporting when the pattern didn't match.
 *
 * The shell's <head> is matched by regex (the same approach as
 * scripts/prerender.mjs — HTML comment placeholders can't be used inside <title>
 * or attribute values, where they'd render as literal text). A silent miss would
 * ship an article with the homepage's meta, so misses are logged loudly.
 */
function replaceOrWarn(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    console.error(`blog-page: shell is missing ${label} — article meta not injected`);
    return html;
  }
  return html.replace(pattern, replacement);
}

function injectMeta(shell, { title, description, canonical, image, jsonLd, type = "website" }) {
  const safeTitle = escapeAttribute(title);
  const safeDescription = escapeAttribute(description);
  const safeCanonical = escapeAttribute(canonical);
  const safeImage = escapeAttribute(image);

  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`, "<title>"],
    [
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${safeDescription}"`,
      "meta description",
    ],
    [
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${safeCanonical}"`,
      "canonical link",
    ],
    [/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${safeTitle}"`, "og:title"],
    [
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${safeDescription}"`,
      "og:description",
    ],
    [/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${type}"`, "og:type"],
    [/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${safeCanonical}"`, "og:url"],
    [/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${safeImage}"`, "og:image"],
    [/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${safeTitle}"`, "twitter:title"],
    [
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${safeDescription}"`,
      "twitter:description",
    ],
    [/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${safeImage}"`, "twitter:image"],
  ];

  let html = shell;
  for (const [pattern, replacement, label] of replacements) {
    html = replaceOrWarn(html, pattern, replacement, label);
  }

  if (jsonLd) {
    // Post titles reach this from HubSpot, so escape every "<" as \u003c (valid
    // inside a JSON string). That covers "</script" and the "<!--" sequence that
    // flips the HTML parser into script-data-escaped state.
    const serialised = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
    html = html.replace(
      "<!--META_JSON_LD-->",
      `<script type="application/ld+json">${serialised}</script>`
    );
  }

  return html;
}

export default async function handler(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    return response.status(405).send("Method not allowed");
  }

  const rawSlug = Array.isArray(request.query.slug) ? request.query.slug[0] : request.query.slug;
  const slug = localSlug(rawSlug || "");

  let shell;
  try {
    shell = await fetchShell(request);
  } catch {
    return response.status(502).send("Unable to render this page right now.");
  }

  const { accessToken, contentGroupId } = getHubSpotConfig();
  const canonical = `${BASE_URL}/blog/${slug}`;

  let post;
  if (accessToken && slug) {
    try {
      post = await fetchPublishedPostBySlug({ accessToken, contentGroupId, slug });
    } catch {
      // Fall through to the generic blog meta — the client still renders the page.
      post = undefined;
    }
  }

  response.setHeader("Content-Type", "text/html; charset=utf-8");

  if (!post) {
    // Unknown or unresolvable slug: serve the shell with generic blog meta and
    // let the client render its 404 state. No indexable article claim is made.
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Robots-Tag", "noindex");
    return response.status(404).send(
      injectMeta(shell, {
        title: "Blog · Fil One",
        description:
          "Ideas and practical guidance on object storage, AI infrastructure, and the cost of moving data at scale.",
        canonical: `${BASE_URL}/blog`,
        image: FALLBACK_OG_IMAGE,
      })
    );
  }

  const description =
    truncate(stripHtml(post.postSummary || post.metaDescription || "")) ||
    "Ideas and practical guidance on object storage, AI infrastructure, and the cost of moving data at scale.";
  const publishedAt = post.publishDate || post.createdAt;

  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=300, stale-while-revalidate=3600");
  return response.status(200).send(
    injectMeta(shell, {
      title: `${post.name} · Fil One`,
      description,
      canonical,
      type: "article",
      image: post.featuredImage || FALLBACK_OG_IMAGE,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.name,
        description,
        url: canonical,
        mainEntityOfPage: canonical,
        ...(post.featuredImage ? { image: post.featuredImage } : {}),
        ...(publishedAt ? { datePublished: publishedAt } : {}),
        author: { "@type": "Organization", name: post.authorName || "Fil One" },
        publisher: {
          "@type": "Organization",
          name: "Fil One",
          logo: { "@type": "ImageObject", url: `${BASE_URL}/fil-one-logo.svg` },
        },
      },
    })
  );
}
