# fil.one — Site & Repo Audit (2026-07-07)

Scope: code quality, accessibility (WCAG 2.1 AA), SEO/metadata, performance, and a live review of fil.one (desktop). Findings are prioritized; every item includes file references. Key claims were independently verified (grep/tsc/lint/live fetches).

---

## Critical

### C1. `/fr/marseille` and `/es/barcelona` serve empty pages to crawlers
Both routes are in `ROUTE_META` and the sitemap, yet the live server returns an **empty SPA shell with a stale title** ("Fil One — S3 Object Storage Built for the AI Era" — copy that only exists in old `.claude/worktrees` files). No body content, no meta description. The page hydrates fine for users, but crawlers and ad-quality scoring see a blank page — and these are paid-ads landing pages.

Root cause: `scripts/prerender.mjs` **catches per-route errors and silently skips** the route, shipping the shell.

**Fix:** check Vercel build logs for `✗ /fr/marseille (skipped — …)`; make any skipped route fail the build (`process.exit(1)`); redeploy and purge cache.

### C2. Forms are unusable by keyboard and screen-reader users
- Custom radios/checkboxes hide the native input with `display:none` — removed from tab order and the accessibility tree. The painted `<span>` has no role/state. The radio group is `required`, so **the form cannot be completed at all** without a mouse. `src/pages/ContactSales.tsx:291,336`, `ContactSalesBcnES.tsx:283,325`, `PartnerApplyPage.tsx:408`. Fix: visually-hidden-but-focusable input (sr-only pattern), style from `:checked`/`:focus-visible`.
- Waitlist tool checkboxes are `<div onClick>` with **no input element at all**: `AgentToolkitWaitlistPage.tsx:286-301`.
- **No label–input association anywhere** in custom forms — the shared `Field` component renders `<label>` and input as siblings with no `htmlFor`/`id` (zero `htmlFor` hits outside `src/components/ui/`). Screen readers announce fields by placeholder only. Fix: `useId()` in `Field`, wire `htmlFor` + `id`.

WCAG 2.1.1, 4.1.2, 1.3.1, 3.3.2.

---

## High

### H1. No code splitting — every visitor downloads all 57 pages
`src/App.tsx:7-67` statically imports every page; zero `React.lazy`/dynamic imports in the repo (verified). A visitor to one `/lp/*` ad page downloads JS for ~24k lines of page code. Since prerendered HTML already covers first paint, per-route `lazy()` + `Suspense` is low-risk and would cut first-load JS by an estimated 80–90% on LP routes. Directly affects LCP/conversion on paid traffic.

### H2. i18n SEO: wrong `lang`, no `hreflang`
- `index.html` hardcodes `<html lang="en">`; `prerender.mjs` never rewrites it (verified: no lang handling), so all Spanish/French prerendered pages declare English. Only `AdsLandingPage.tsx:88` fixes it client-side; `BarcelonaLandingPageES.tsx`, `ContactSalesBcnES.tsx`, `SupportBcnES.tsx` never do. WCAG 3.1.1 + SEO.
- Zero `hreflang` anywhere (verified) for the EN/ES/FR page pairs.

**Fix:** add `lang` to `ROUTE_META`, rewrite `<html lang>` at prerender, emit reciprocal `hreflang` links; add a `useLang()` hook for SPA navigation.

### H3. Massive copy-paste duplication across landing pages
`src/pages/` = 57 files / 23,815 lines; shared `LandingPrimitives.tsx` is only 51 lines. Measured similarity: `ContactSales` vs `ContactSalesBcnES` 0.90; unrelated verticals (Gaming/Media/Genomics) ~0.70. 214 long lines repeated in ≥5 pages (3,112 occurrences); 158 inline `fontFamily: 'Aspekta'` objects. `AgentsLandingPage.tsx:9-30` even redefines the primitives locally. Localization is done by cloning entire pages.

**The concrete cost:** the `$4.99` price is hardcoded in **49 files** (verified). A price change is a 49-file sweep.

**Fix:** an LP kit (`LpHero`, `LpFaq`, `LpCta`, `LpComparisonTable`), a `pricing.ts` constants module, a strings/i18n layer. ~40–60% of page code is reducible. Worst files: `AgentsLandingPage.tsx` (1,151 lines), `EgressLandingPage.tsx` (931), `BackupDrLandingPage.tsx` (924).

### H4. Text contrast failures
- `#A1A1AA` on white ≈ **2.6:1** (needs 4.5:1) at small sizes: `PlatformNavbar.tsx:444,488` (mobile menu labels), `DeveloperSection.tsx:235,257`, `SavingsSection.tsx:89,177`, `AgentToolkitProductPage.tsx:311`, `RagPipelineProductPage.tsx:266`, `AgentsLandingPage.tsx:507`. The codebase already fixed this pair once — see the comment at `AdsLandingPage.tsx:73`. Swap to `#71717A` (white bg) or `#52525B`.
- `#71717A` on `#F4F4F5` gray sections ≈ 4.4:1 (marginal fail): `PricingSection.tsx:84,110,122,183,209`, `DeveloperSection.tsx:151,177`. Use `#52525B` there.

---

## Medium

### M1. CI health: lint and typecheck both red
- `npx tsc --noEmit`: **7 errors** (all unused `@ts-expect-error` in test files).
- `npm run lint`: **23 errors, 33 warnings** (incl. a real `react-hooks/exhaustive-deps` miss in `src/hooks/useInView.ts:23`).
- `tsconfig`: `strict: false`, `strictNullChecks: false`. Fix the 7 errors, then enable strictness incrementally; gate CI on `tsc` + `eslint`.

### M2. Dead code and unused dependencies
- Unreferenced components (0 imports): `Navbar.tsx` (260 lines), `HeroSection.tsx`, `HeroLens.tsx`, `AiCapabilitiesSection.tsx`, `FeaturesSection.tsx`, `IntroSection.tsx`, `SavingsSection.tsx`, `NavLink.tsx`. Delete them (note: `FeaturesSection` hijacks global arrow keys — don't revive as-is).
- 45 of 49 `src/components/ui/` files unused (only toaster/sonner/tooltip/toast used).
- ~30 unused deps: `framer-motion`, `zod`, `recharts`, `react-hook-form`, `date-fns`, `embla-carousel-react`, ~24 of 27 `@radix-ui/*`, etc. `@tanstack/react-query` is mounted in `App.tsx:69` with **zero queries** — dead weight in the bundle. Run depcheck; drop the QueryClientProvider.
- Three navbars + two footers; fold `LandingNavbar`/`LandingFooter` into the Platform variants behind a prop.

### M3. Route/SEO metadata triple-maintained by hand
Routes and meta live in `App.tsx`, `prerender.mjs` `ROUTE_META` (60 entries), and `sitemap.xml`, synced manually (a recent commit fixed leaked `<!--META_*-->` markers — evidence of fragility). Generate all three from a single route manifest and assert parity in CI. This also fixes C1's silent-skip class of bugs.

### M4. Duplicate `FAQPage` JSON-LD on the homepage
Prerender injects a 5-question FAQPage into `<head>` while `FaqSection` renders a 16-question one in-body. Google expects one per page; duplicates risk losing the rich result. Keep one (the fuller in-body one).

### M5. Performance details
- Fonts: Aspekta shipped as **4× TTF (~226 KB)** — convert to woff2 (~half); no `<link rel="preload">` for the primary font; DM Mono + Funnel Sans load via render-blocking Google Fonts CSS. Three families is a lot; self-host and preload.
- No `headers` in `vercel.json`: hashed `/assets/*` should be `Cache-Control: immutable`; prerendered HTML `max-age=0, must-revalidate` (possibly related to C1's stale shell).
- CTA background PNG loads late — observed live as a **full-width blank white block above the footer** for several seconds. Compress/convert to WebP/AVIF and add `loading="lazy"` + a dark `background-color` fallback (white text sits on it meanwhile — also a contrast risk, `CtaSection.tsx:18-24`).
- Four tracking scripts (GTM, Plausible, Unify, HubSpot) compete with hydration on ad LPs; consolidate/delay. Confirm the Unify publishable key embedded in HTML is the intended public, non-privileged key.

### M6. Remaining accessibility (beyond C2/H4)
- Form errors/success not announced: no `role="alert"`/`aria-live`/`aria-describedby` — `ContactSales.tsx:271-275,380-384` and siblings. WCAG 4.1.3.
- Collapsed FAQ answers keep links tabbable (`FaqSection.tsx:223-246`) — add `inert` or `visibility:hidden` when closed.
- Hidden scrolled-away utility bar stays tabbable (`PlatformNavbar.tsx:208-259`) — add `visibility:hidden`/`inert`.
- Skip links point to `#main-content` that doesn't exist on 11 pages (ContactSales, Support, legal pages, waitlist pages…); `AdsLandingPage`/`NotFound` lack a `<main>` landmark entirely.
- `HeroGridDots.tsx:128-134` runs an infinite rAF loop with no `prefers-reduced-motion` check (CSS animations elsewhere are correctly gated).
- `DeveloperSection.tsx:227-246` language tabs: selection conveyed by color only, no `aria-selected`/`aria-pressed`.

### M7. Live UX: scroll-reveal animations hide content
Observed repeatedly on desktop: sections stay at low opacity well after scrolling to them (pricing page's "See your actual savings" was still ghosted ~2s after scroll stopped; homepage sections appeared blank mid-scroll). Fast scrollers see half-empty pages. Reduce reveal delay/duration, trigger earlier (larger `rootMargin` in `useInView`), and never animate from `opacity: 0` on content that's already in the viewport at load.

### M8. Tests near zero
5 test files (one is `expect(true).toBe(true)` — delete). Untested: all 57 pages, routing, `useSeo`, `StorageCalculatorSection` pricing math, prerender script. Minimum: a smoke test rendering every route + unit tests for calculator math and `useSeo`.

---

## Low

- `package.json`: name still `vite_react_shadcn_ts@0.0.0`; obsolete `reactSnap` config block + `react-snap` devDep (prerender.mjs replaced it); stale doc comment in `useSeo.ts`.
- Two lockfiles committed (`bun.lockb` + `package-lock.json`) — pick one.
- Root strays: `filone_barcelona_landing.html` (31 KB, tracked), `barcelona-preview.html`, `landing-page-framework.md` tracked despite being in `.gitignore`.
- `public/_redirects` is a Netlify convention — Vercel ignores it; delete.
- `sitemap.xml`: no `lastmod` (the one field Google uses); generate at build time.
- Single generic 429 KB `og-image.png` for all 60 pages; `useSeo` supports per-page `ogImage` but nothing uses it. Consider `noindex` on `/waitlist/*`.
- Semantic lists: pricing feature lists and footer columns are div soups (`PricingSection.tsx:132-149`, `Footer.tsx:104-137`).
- GTM `noscript` iframe missing `title` (`index.html:48-49`); `LandingNavbar` skip-link/aria-labels untranslated on ES pages.
- Homepage press-bar section has a very large empty vertical gap below it (observed live) — tighten spacing.
- `robots.txt` explicitly allows `Bytespider` (aggressive scraper) — confirm intentional.

---

## What's already good

Prerender pipeline is thoughtful and well documented; per-page titles/descriptions/canonicals are unique across all 60 routes (verified live); sitemap matches routes 60/60; `llms.txt`/`llms-full.txt` are high quality with placeholder credentials (correct practice); skip link + global `:focus-visible` styles; `prefers-reduced-motion` covers CSS animations; FAQ accordion ARIA is correct; all `<img>` have alt text; icon buttons have `aria-label`s; ComparisonSection has full ARIA table grammar; `dist/` not committed; no secrets in git; `vercel.json` SPA setup is correct; overall visual design is clean and consistent.

## Suggested order of attack

1. **C1** (broken ads LPs — check build logs, fail on skip, redeploy) — hours.
2. **C2 + H4** (form accessibility + color token swap) — a day.
3. **H2** (lang/hreflang in prerender) — hours.
4. **H1** (route-level `lazy()`) — a day.
5. **M1** (green tsc/lint, wire CI) — hours, prevents regressions.
6. **H3 + M3** (LP kit + single route manifest) — the big refactor; do incrementally, new LPs first.
