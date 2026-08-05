/**
 * Console URLs that follow the hostname the visitor is actually on.
 *
 * fil.one keeps landing on blocklists and the `.one` TLD itself is flagged, so this
 * site is also served from the unlisted `filone.ai` alias for demos. A hardcoded
 * `https://app.fil.one` CTA would send those visitors straight to the domain the
 * alias exists to avoid, breaking the demo at the first click.
 *
 * Resolved from `window.location` at runtime. Never bake the value in at build time
 * — no env var, no constant folded in by Vite. Every route is pre-rendered by
 * `scripts/prerender.mjs`, which uses `renderToString` under a jsdom whose URL is
 * `http://localhost/`, so the static HTML ships the canonical console URL and the
 * alias URLs only appear once the page renders in the browser.
 *
 * That the rendered DOM ends up correct on the alias is verified, not assumed: a
 * real build served from a `https://filone.ai` origin yields alias console hrefs on
 * every route checked, with none stale. It does depend on the page rendering
 * client-side, so re-run that check if routing or pre-rendering changes — in
 * particular if routes stop being `React.lazy` chunks (see `src/App.tsx`).
 */
const CONSOLE_ORIGIN_BY_SITE_HOST: Record<string, string> = {
  // Must match PROD_CONSOLE_ALIAS_HOSTS / PROD_CONSOLE_HOST in fil-one/fil-one,
  // packages/shared/src/constants.ts. Separate repos, so nothing enforces it.
  "filone.ai": "https://app.filone.ai",
  "www.filone.ai": "https://app.filone.ai",
};

/** Console origin for the canonical site and anything unrecognised. */
const DEFAULT_CONSOLE_ORIGIN = "https://app.fil.one";

/** The console origin matching the current site hostname. */
export function consoleOrigin(): string {
  if (typeof window === "undefined") return DEFAULT_CONSOLE_ORIGIN;
  const host = window.location.hostname.toLowerCase();
  return CONSOLE_ORIGIN_BY_SITE_HOST[host] ?? DEFAULT_CONSOLE_ORIGIN;
}

/** A console URL for `path`, on the origin matching the current site hostname. */
export function consoleUrl(path: string): string {
  return `${consoleOrigin()}${path}`;
}

/** The sign-up entry point. `screen_hint=signup` opens Auth0's sign-up tab. */
export function signupUrl(): string {
  return consoleUrl("/login?screen_hint=signup");
}
