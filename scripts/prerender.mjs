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

/** Routes to prerender — keep in sync with reactSnap.routes in package.json */
const ROUTES = [
  "/",
  "/terms",
  "/privacy",
  "/contact-sales",
  "/fr/marseille",
  "/es/barcelona",
  "/lp/agents",
  "/waitlist",
  "/lp/data-sovereignty",
  "/lp/pricing",
  "/lp/comics",
];

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
  const { render } = await import(ssrEntry);

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

  for (const route of ROUTES) {
    try {
      const appHtml = render(route);

      const html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // "/" → dist/index.html, "/lp/agents" → dist/lp/agents/index.html
      const segments = route.split("/").filter(Boolean);
      const outDir =
        segments.length === 0
          ? resolve(rootDir, "dist")
          : resolve(rootDir, "dist", ...segments);

      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }

      writeFileSync(resolve(outDir, "index.html"), html);
      console.log(`  ✓ ${route}`);
    } catch (err) {
      // A failed route falls back to the SPA shell — not ideal but not fatal.
      console.warn(`  ✗ ${route} (skipped — ${err.message})`);
    }
  }

  // ── 5. Clean up SSR bundle ───────────────────────────────────────────────
  rmSync(SSR_OUT_DIR, { recursive: true, force: true });

  console.log("Prerendering complete.");
}

prerender().catch((err) => {
  console.error("Prerendering failed:", err);
  process.exit(1);
});
