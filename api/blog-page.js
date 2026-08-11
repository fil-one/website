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
 * Write one tag into the shell's <head>, inserting it if the shell doesn't have
 * it yet.
 *
 * Tags are matched by regex rather than by comment placeholders: a placeholder
 * inside <title> renders as literal text (the same reason scripts/prerender.mjs
 * matches tags directly), and adding markers for the rest would mean keeping
 * index.html in sync with two independent injectors. Patterns match the whole
 * tag via [^>]*, so extra or reordered attributes still match.
 *
 * A miss used to leave the homepage's meta in place, which is exactly the silent
 * failure that matters here — an article unfurling as the landing page. Now the
 * tag is inserted before </head> and the miss is logged.
 */
function writeTag(html, pattern, tag, label) {
  if (pattern.test(html)) return html.replace(pattern, tag);

  console.warn(`blog-page: shell has no ${label}; inserting it`);
  if (html.includes("</head>")) return html.replace("</head>", `  ${tag}\n  </head>`);

  console.error(`blog-page: shell has no </head> either; ${label} not set`);
  return html;
}

function injectMeta(shell, { title, description, canonical, image, jsonLd, type = "website" }) {
  const safeTitle = escapeAttribute(title);
  const safeDescription = escapeAttribute(description);
  const safeCanonical = escapeAttribute(canonical);
  const safeImage = escapeAttribute(image);

  const tags = [
    [/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`, "<title>"],
    [
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${safeDescription}" />`,
      "meta description",
    ],
    [/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${safeCanonical}" />`, "canonical link"],
    [/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${safeTitle}" />`, "og:title"],
    [
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${safeDescription}" />`,
      "og:description",
    ],
    [/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`, "og:type"],
    [/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${safeCanonical}" />`, "og:url"],
    [/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${safeImage}" />`, "og:image"],
    [/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${safeTitle}" />`, "twitter:title"],
    [
      /<meta name="twitter:description"[^>]*>/,
      `<meta name="twitter:description" content="${safeDescription}" />`,
      "twitter:description",
    ],
    [/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${safeImage}" />`, "twitter:image"],
  ];

  let html = shell;
  for (const [pattern, tag, label] of tags) {
    html = writeTag(html, pattern, tag, label);
  }

  if (jsonLd) {
    // Post titles reach this from HubSpot, so escape every "<" as \u003c (valid
    // inside a JSON string). That covers "</script" and the "<!--" sequence that
    // flips the HTML parser into script-data-escaped state.
    const serialised = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
    const script = `<script type="application/ld+json">${serialised}</script>`;
    html = html.includes("<!--META_JSON_LD-->")
      ? html.replace("<!--META_JSON_LD-->", script)
      : writeTag(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, script, "JSON-LD");
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
    truncate(stripHtml(post.metaDescription || post.postSummary || "")) ||
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
