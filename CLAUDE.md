# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for **Fil One** (https://fil.one) — S3-compatible object storage built on Filecoin. It is a Vite + React 18 + TypeScript SPA with **build-time prerendering** for SEO, deployed on Vercel. Most of the ~60 routes are standalone marketing/landing pages that share a common component and design-token vocabulary.

## Commands

```sh
npm install
npm run dev          # Vite dev server on :8080 (PORT env overrides)
npm run build        # Production build → runs `postbuild` (prerender) automatically
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit over app + node tsconfigs
npm test             # Vitest (single run)
npm run test:watch   # Vitest watch mode
npm run preview      # Serve the built dist/ locally
```

Run a single test file / test:

```sh
npx vitest run src/lib/analytics.test.ts
npx vitest run -t "name of the test"
```

Use **npm** — CI (`.github/workflows/ci.yml`) runs `npm ci` then lint, typecheck, and test on every push/PR. A `bun.lockb` also exists but npm is canonical; keep `package-lock.json` in sync. Note ESLint has `@typescript-eslint/no-unused-vars` turned **off**, so `npm run typecheck` is the real guard against dead/broken references.

## Architecture

### Routing is table-driven from one source
`src/routes.tsx` (`routeDefs`) is the **single source of truth** mapping path → page module. It is consumed two ways:
- **Client** (`src/App.tsx`): each `load` is wrapped in `React.lazy()` so a visitor only downloads the chunk for their route. `App.tsx` exports `AppShell` (providers only: React Query, Tooltip, Toasters) and `AppContent` (the lazy `<Routes>` inside one `<Suspense>`).
- **SSR/prerender** (`src/entry-server.tsx`): every module is awaited up front (`warmUp`) and rendered eagerly, because `renderToString` is synchronous and cannot wait on a `lazy()` import promise — a lazy route would otherwise render its Suspense fallback into the static HTML. This is why the SSR tree is built separately from `AppContent` but reuses the same `AppShell` and the same `routeDefs`.

`src/main.tsx` calls `hydrateRoot` when prerendered DOM is present, else `createRoot` — do not change this to unconditional `createRoot` or hydration breaks.

### Prerendering (this replaces react-snap)
`npm run build` runs `vite build` then `postbuild` → `scripts/prerender.mjs`. Despite the `reactSnap` block in `package.json` and the `react-snap` devDependency, **react-snap is not used** — the custom script is. It:
1. Spins up a jsdom global environment (so libs like `sonner` that touch `document` at import time don't throw during SSR).
2. Builds `src/entry-server.tsx` as an SSR bundle, calls `render(url)` per route, and injects the HTML into `dist/index.html`, writing `dist/<route>/index.html`.
3. Injects per-route `<title>`, description, canonical, OG/Twitter tags, `<html lang>`, hreflang alternates, and JSON-LD.

### SEO lives in TWO places — keep them in sync
- **Build time**: `ROUTE_META` in `scripts/prerender.mjs` (title / description / optional `lang` / optional `jsonLd`) is what crawlers see in static HTML. `HREFLANG_GROUPS` in the same file defines reciprocal `hreflang` clusters for translated pages.
- **Runtime**: `useSeo()`, `useLang()` (`src/hooks/`) and `<JsonLd>` (`src/components/`) set the same tags during client-side SPA navigation, where `index.html`'s defaults would otherwise persist.

**When adding a page you touch three things:** add the route to `routeDefs` in `src/routes.tsx`, add its `ROUTE_META` entry in `scripts/prerender.mjs` (or it prerenders with the generic default title/description), and have the page call `useSeo` (+ `useLang` for non-English) so SPA navigation matches the prerendered HTML. For a translated page, also add an `HREFLANG_GROUPS` entry. Spanish (`/lp/es/*`) pages are the existing i18n pattern — English is the default `lang` and `useLang` resets to `"en"` on unmount.

### Forms → HubSpot
Contact/waitlist/support/partner forms submit to the HubSpot Forms API v3. **All portal IDs and form GUIDs are centralised in `src/lib/hubspot.ts`** — never hardcode them in pages. `getHubSpotContext()` attaches the `hubspotutk` tracking cookie so submissions link to HubSpot email workflows.

### Analytics
`src/lib/analytics.ts` wraps Plausible (`window.plausible`) with typed helpers (`trackCtaClick`, `trackDocsClick`, etc.); every call guards on the script being loaded. Google Tag Manager, Plausible, HubSpot, and Unify scripts are injected directly in `index.html`.

### Styling & components
- Tailwind with **CSS-variable design tokens** (`hsl(var(--…))`) defined in `src/index.css`; extend via `tailwind.config.ts`, not inline hex.
- Fonts: `font-sans` = Funnel Sans (body), `font-display` = Aspekta (headings), `font-mono` = DM Mono.
- `src/components/ui/` is **shadcn/ui** (Radix) primitives — generally treat as generated/vendored. App-specific building blocks (`LandingPrimitives.tsx`, `SectionHeader.tsx`, `Button.tsx`, `IconTile.tsx`, etc.) live directly in `src/components/`.
- Import alias `@` → `./src` (configured in `vite.config.ts`, `vitest.config.ts`, and tsconfigs).

## Deployment
Vercel; pushes to `main` auto-deploy. `vercel.json` holds legacy-URL `redirects` and the SPA `rewrites` fallback — add redirects there when retiring a URL.

## Testing
Vitest + Testing Library in jsdom; setup in `src/test/setup.ts`, globals enabled. Tests are colocated (`*.test.ts[x]` next to source).
