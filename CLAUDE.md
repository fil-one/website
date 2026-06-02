# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for [Fil One](https://fil.one) — S3-compatible object storage on Filecoin. Vite + React 18 + TypeScript + Tailwind + shadcn/ui (Radix), React Router, Framer Motion. Deployed on Vercel from `main` (SPA rewrites in `vercel.json`).

## Commands

| Task | Command |
|---|---|
| Dev server (port 8080, override with `PORT`) | `npm run dev` |
| Production build | `npm run build` |
| Preview prod build | `npm run preview` |
| Lint | `npm run lint` |
| Run all tests | `npm test` |
| Watch tests | `npm run test:watch` |
| Run single test | `npx vitest run src/path/to/file.test.ts` |

Tests use Vitest + jsdom + Testing Library. Setup in `src/test/setup.ts`; test files matched by `src/**/*.{test,spec}.{ts,tsx}`.

The `@/` import alias maps to `src/` (set in both `vite.config.ts` and `vitest.config.ts`).

## Architecture

### Routing & page variants

`src/App.tsx` is the single routing source of truth. Notable conventions:

- `/` renders `VersionB` (the current homepage); the older homepage is parked at `/legacy` as `Index`, and `/v1` renders `VersionA`. When changing "the homepage," edit `VersionB.tsx` — not `Index.tsx`.
- `/:lang/:city` is a dynamic landing-page route powered by `src/data/adsCities.ts` (`CityConfig` + `LatencyRow`). Add a new geo-targeted LP by appending an entry there; **also add the path to `reactSnap.routes` in `package.json`** so it gets prerendered.
- `/lp/barcelona` is a separate hand-built LP (`BarcelonaLandingPage.tsx`) — distinct from the data-driven `/es/barcelona` ads LP. Don't conflate them.
- Catch-all `*` → `NotFound` must stay last.

There are parallel navbar/footer sets: `Navbar`/`Footer` for the main site, `LandingNavbar`/`LandingFooter` for ad LPs, `PlatformNavbar` for product pages. Pick the matching pair when building a new page.

### HubSpot forms

All lead capture goes through HubSpot Forms API v3. Portal ID and form GUIDs live in [src/lib/hubspot.ts](src/lib/hubspot.ts) — three forms: waitlist, contact sales, support. `getHubSpotContext(pageName)` builds the submission context and includes the `hubspotutk` tracking cookie when present (required for HubSpot email workflows to fire). Always use the helper rather than constructing context inline.

### SEO / prerendering

- Per-page meta + Open Graph handled by the `useSeo` hook; structured data via `<JsonLd>`.
- `react-snap` prerenders the routes listed under `reactSnap` in `package.json` after build. New SEO-relevant routes must be added there or they won't be prerendered.

### Styling

Tailwind with shadcn/ui primitives in `src/components/ui/`. `components.json` is the shadcn config. Use `cn()` from `src/lib/utils.ts` to merge class names. Animations via Framer Motion; scroll-reveal via the `useInView` hook.

### Hash-link scroll

Direct loads with a `#section` hash scroll to that section on mount — preserve this behavior when refactoring routing or page mount logic (see recent commit `1ced27f`).

## Working branch

Default working branch is `staging`; PRs target `main`. Pushing to `main` deploys to production via Vercel.
