/**
 * Vite SSR prerender script.
 *
 * Replaces react-snap for production prerendering.  Unlike react-snap it uses
 * React's own renderToString instead of Puppeteer, so it works on Vercel (no
 * Chrome system libraries required).
 *
 * Steps:
 *  1. Initialise a jsdom DOM environment (so third-party UI libs that call
 *     browser APIs at import time don't throw when the SSR bundle loads).
 *  2. Build src/entry-server.tsx as an SSR bundle (Vite --ssr).
 *  3. For each route, call render(url) and inject the resulting HTML into the
 *     client-built dist/index.html template.
 *  4. Write each result to dist/<route>/index.html.
 *  5. Clean up the temporary SSR bundle.
 */

import { JSDOM } from "jsdom";
import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "fs";
import { resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { BASE_URL, ROUTE_META } from "./routeMeta.mjs";

/**
 * Inline `font-family` declarations in the site chrome (`<nav>`, `<footer>`),
 * which render on every page. Asserted at build time by step 4 below.
 *
 * Scoped to the chrome deliberately: page bodies still carry their own inline
 * fonts until each page is migrated (FIL-689/FIL-690), so a whole-document
 * assertion would sit red for reasons unrelated to the chrome and block every
 * build until that work finishes. Tighten the scope as pages land.
 */
const chromeInlineFontCount = (html) => {
  const segments = [/<nav\b[\s\S]*?<\/nav>/, /<footer\b[\s\S]*?<\/footer>/];
  return segments.reduce((total, pattern) => {
    const match = html.match(pattern);
    if (!match) return total;
    return total + (match[0].match(/style="[^"]*font-family/g) ?? []).length;
  }, 0);
};

// ── DOM environment ──────────────────────────────────────────────────────────
// Must happen before any dynamic import of the SSR bundle, because third-party
// packages (e.g. sonner) call document.createTextNode / similar at module
// initialisation time.
const jsdom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>", {
  url: "http://localhost/",
});
const { window } = jsdom;

// Hoist every property that components might look up on globalThis
const COPY_KEYS = [
  "document",
  "navigator",
  "location",
  "history",
  "HTMLElement",
  "Element",
  "Node",
  "Text",
  "Comment",
  "DocumentFragment",
  "Event",
  "CustomEvent",
  "MouseEvent",
  "KeyboardEvent",
  "InputEvent",
  "FocusEvent",
  "PointerEvent",
  "TouchEvent",
  "MutationObserver",
  "CSSStyleDeclaration",
  "getComputedStyle",
  "screen",
  "innerWidth",
  "innerHeight",
  "devicePixelRatio",
];

for (const key of COPY_KEYS) {
  if (key in window && !(key in globalThis)) {
    try {
      // Some properties are non-configurable on the window object
      globalThis[key] = window[key];
    } catch {
      // ignore
    }
  }
}

// window itself (components that check `typeof window !== 'undefined'`)
globalThis.window = window;

// Items jsdom doesn't provide
globalThis.requestAnimationFrame = (fn) => setTimeout(fn, 0);
globalThis.cancelAnimationFrame = clearTimeout;
globalThis.matchMedia ??= () => ({
  matches: false,
  media: "",
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.IntersectionObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
// ────────────────────────────────────────────────────────────────────────────

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");


/**
 * hreflang clusters — each entry lists the reciprocal translations of one page.
 * Every URL in a cluster gets a <link rel="alternate" hreflang="xx"> for all
 * members (including itself), plus an x-default pointing at the English version,
 * so search engines serve the right language variant. Pages not listed here
 * have no translation and get no alternates (which is valid).
 */
const HREFLANG_GROUPS = [
  { en: "/lp/barcelona", es: "/lp/es/barcelona" },
  { en: "/contact-sales", es: "/lp/es/contacto" },
  { en: "/support", es: "/lp/es/soporte" },
];

/** route path → array of { hreflang, href }, built once from HREFLANG_GROUPS. */
const HREFLANG_BY_ROUTE = {};
for (const group of HREFLANG_GROUPS) {
  const members = Object.entries(group); // [["en", "/…"], ["es", "/…"]]
  const alternates = members.map(([lang, path]) => ({
    hreflang: lang,
    href: `${BASE_URL}${path}`,
  }));
  // x-default → the English variant when present, else the first member.
  alternates.push({ hreflang: "x-default", href: `${BASE_URL}${group.en ?? members[0][1]}` });
  for (const [, path] of members) {
    HREFLANG_BY_ROUTE[path] = alternates;
  }
}

const SSR_OUT_DIR = resolve(rootDir, "dist-ssr");

async function prerender() {
  // ── 1. Build the SSR bundle ──────────────────────────────────────────────
  console.log("Building SSR bundle…");

  await build({
    root: rootDir,
    configFile: resolve(rootDir, "vite.config.ts"),
    mode: "production",
    build: {
      ssr: "src/entry-server.tsx",
      outDir: "dist-ssr",
      emptyOutDir: true,
      rollupOptions: {
        output: { format: "es" },
      },
    },
    logLevel: "warn",
  });

  // ── 2. Import the SSR entry ──────────────────────────────────────────────
  const ssrEntry = pathToFileURL(resolve(SSR_OUT_DIR, "entry-server.js")).href;
  const { render, routePaths } = await import(ssrEntry);

  // Routes to prerender come straight from routes.tsx (routeDefs, re-exported
  // by entry-server as routePaths) — the single source of truth — so the
  // prerendered set can never drift from the app's route table. Every route
  // must have SEO metadata; warn loudly if one doesn't (the route-parity test
  // fails CI on the same condition).
  const ROUTES = routePaths;
  const missingMeta = ROUTES.filter((r) => !(r in ROUTE_META));
  if (missingMeta.length) {
    console.warn(
      `  ⚠ ${missingMeta.length} route(s) missing ROUTE_META (falling back to homepage defaults): ${missingMeta.join(", ")}`
    );
  }

  // ── 3. Read client HTML template ─────────────────────────────────────────
  const templatePath = resolve(rootDir, "dist/index.html");
  if (!existsSync(templatePath)) {
    throw new Error(
      "dist/index.html not found — run `vite build` before the prerender script."
    );
  }
  const template = readFileSync(templatePath, "utf-8");

  // ── 4. Render each route ─────────────────────────────────────────────────
  console.log("Prerendering routes…");

  const failures = [];
  for (const route of ROUTES) {
    try {
      const appHtml = await render(route);
      const meta = ROUTE_META[route] ?? {};
      const canonical = `${BASE_URL}${route === "/" ? "/" : route}`;

      // Inject per-page title, description, and canonical into the template.
      // index.html ships with sensible defaults so non-prerendered loads (dev
      // server, or dynamic routes like /:lang/:city that can't be enumerated
      // here) still get real text — these regexes target the actual tags
      // directly rather than comment markers, which HTML doesn't hide inside
      // <title> or attribute values (they'd render as literal text).
      const title = meta.title ?? "Fil One | S3 object storage built for the AI era";
      const description =
        meta.description ??
        "S3-compatible object storage built on Filecoin. No egress fees, no API request charges, and immutable Object Lock retention.";
      const lang = meta.lang ?? "en";

      // Reciprocal hreflang alternates for translated page clusters (no-op for
      // pages without a translation).
      const hreflangTags = (HREFLANG_BY_ROUTE[route] ?? [])
        .map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
        .join("\n    ");

      let html = template
        .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
        .replace("<!--META_HREFLANG-->", hreflangTags)
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
        .replace(
          /<meta name="description" content="[^"]*"/,
          `<meta name="description" content="${description}"`
        )
        .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`)
        .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
        .replace(
          /<meta property="og:description" content="[^"]*"/,
          `<meta property="og:description" content="${description}"`
        )
        .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`)
        .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
        .replace(
          /<meta name="twitter:description" content="[^"]*"/,
          `<meta name="twitter:description" content="${description}"`
        )
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // Inject JSON-LD structured data when defined for this route.
      const schemas = meta.jsonLd ?? [];
      const jsonLdTags = schemas
        .map(
          (schema) =>
            `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
        )
        .join("\n    ");
      html = html.replace("<!--META_JSON_LD-->", jsonLdTags);

      // "/" → dist/index.html, "/lp/agents" → dist/lp/agents/index.html
      const segments = route.split("/").filter(Boolean);
      const outDir =
        segments.length === 0
          ? resolve(rootDir, "dist")
          : resolve(rootDir, "dist", ...segments);

      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }

      // The chrome must ship zero inline fonts. It appears on every page, so a
      // regression here silently undoes the token migration everywhere at once.
      const inlineFonts = chromeInlineFontCount(html);
      if (inlineFonts > 0) {
        failures.push({
          route,
          error: `${inlineFonts} inline font-family declaration(s) in <nav>/<footer> — use font-sans / font-mono instead`,
        });
      }

      writeFileSync(resolve(outDir, "index.html"), html);
      console.log(`  ✓ ${route}`);
    } catch (err) {
      // Record the failure and fail the build below. A skipped route silently
      // falls back to the SPA shell (no prerendered HTML → generic title +
      // homepage canonical), which is exactly how the original broken-LP
      // incident shipped. Better to break the build than deploy a broken page.
      console.error(`  ✗ ${route} — ${err.message}`);
      failures.push({ route, error: err.message });
    }
  }

  // ── 5. Generate sitemap.xml from the same route list ─────────────────────
  // Generated (not hand-maintained) so it can never drift from routes.tsx.
  writeFileSync(resolve(rootDir, "dist", "sitemap.xml"), buildSitemap(ROUTES));
  console.log(`  ✓ sitemap.xml (${ROUTES.length} urls)`);

  // ── 6. Clean up SSR bundle ───────────────────────────────────────────────
  rmSync(SSR_OUT_DIR, { recursive: true, force: true });

  // ── 7. Fail the build if any route was skipped ───────────────────────────
  if (failures.length) {
    throw new Error(
      `Prerendering failed for ${failures.length} route(s):\n` +
        failures.map((f) => `  - ${f.route}: ${f.error}`).join("\n")
    );
  }

  console.log("Prerendering complete.");
}

/** Build a sitemap.xml string from the route list (single source: routes.tsx). */
function buildSitemap(routes) {
  const urls = routes
    .map((r) => {
      const loc = `${BASE_URL}${r === "/" ? "/" : r}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

prerender().catch((err) => {
  console.error("Prerendering failed:", err);
  process.exit(1);
});
