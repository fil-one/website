# Fil One marketing site — fil.one

Marketing website for Fil One: S3-compatible object storage on Filecoin ($4.99/TB/month,
no egress fees). React 18 + TypeScript + Vite + Tailwind + shadcn/Radix SPA, with a custom
build-time prerender step (`scripts/prerender.mjs`) that writes static HTML per route for
SEO and AI crawlers. Deployed on Vercel; **pushing to `main` deploys production**.

## Commands (verified)

| Command | Notes |
|---|---|
| `npm install` | Use npm, not bun (`bun.lockb` is stale; `package-lock.json` is authoritative) |
| `npm run dev` | Port 8080. **In containers/CI it fails with `EAFNOSUPPORT` (binds IPv6 `::`) — use `npm run dev -- --host 127.0.0.1`** |
| `npm run build` | vite build + prerender of ~60 routes. Ends with "Prerendering complete." Prerender failures print `✗ route` but do NOT fail the build — check with `npm run build 2>&1 \| grep '✗'` (should print nothing) |
| `npm test` | Vitest. **3 tests in `src/components/FaqSection.test.tsx` fail on main** (stale copy assertions) — pre-existing, not caused by your change |
| `npm run lint` | **17 pre-existing problems (8 errors) on main** — only fix what your change introduced |
| `npx tsc -p tsconfig.app.json --noEmit` | Not part of the build (vite-swc skips type-checking). **7 pre-existing errors, all in `*.test.*` files** — app source is clean; new errors in non-test files are yours |

## Critical invariant

Every routed page is registered in **four places** that are kept in sync **by hand**:

1. `src/pages/<Name>.tsx` — the page component
2. `src/App.tsx` — import + `<Route>` (above the `*` catch-all)
3. `scripts/prerender.mjs` — `ROUTE_META` entry (title/description/canonical; missing entry silently falls back to homepage metadata)
4. `public/sitemap.xml` — `<url>` entry

Page `useSeo()` values and the `ROUTE_META` entry duplicate each other and must match.

## Skills

Detailed procedures live in `.claude/skills/` — read the matching skill BEFORE starting:

- `add-landing-page` — create any new page (/lp/*, product, solutions) end to end
- `seo-metadata` — titles, descriptions, canonicals, JSON-LD, sitemap, llms.txt, redirects
- `copy-updates` — copy revisions, brand claims/pricing consistency, voice rules
- `localized-pages` — city ads pages (`/:lang/:city`), Spanish/French suites
- `dev-build-deploy` — build/test/lint gotchas, HubSpot forms, analytics events

`landing-page-framework.md` (repo root) is the marketing team's strategy doc for what a
landing page must contain. `filone_barcelona_landing.html` (repo root) is a static design
mockup — it is not served and should not be edited.
