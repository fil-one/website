# fil.one — Re-Audit (2026-07-17)

Follow-up to the 2026-07-07 audit, covering the 73 commits since (token cleanup, pricing centralization, shared Hero, code splitting, forms a11y pass, new `/lp/price` LP). Same method: repo verification of every prior finding + review of new code + live checks.

---

## Fixed since last audit — nice work

- **Forms accessibility (was Critical C2)** — all `display:none` inputs are now `peer sr-only` with `peer-focus-visible` rings (ContactSales, ContactSalesBcnES, PartnerApplyPage, Support ×2); AgentToolkitWaitlistPage uses real checkboxes; controls are wrapped in `<label>` (implicit association). Keyboard/screen-reader users can complete every form.
- **Code splitting (was H1)** — `src/routes.tsx` manifest + `React.lazy` per route with a single Suspense wrapper; SSR builds eager routes from the same defs. Clean implementation.
- **i18n (was H2)** — prerender now rewrites `<html lang>` per route; reciprocal `hreflang` + `x-default` via `HREFLANG_GROUPS`; `useLang()` hook on all three ES pages. Correct implementation (reciprocal + self-referencing).
- **CI health (was M1)** — `tsc --noEmit`: 0 errors. `eslint`: 0 errors, 8 benign warnings.
- **Pricing centralized (was part of H3)** — `src/lib/pricing.ts` is well-designed (derived display values, documented `freeEgressMultiplier`) and genuinely consumed by 7 components.
- **Tokenization (was L1)** — tokens are real, not decorative: inline hex/`style` blocks removed from CtaSection/DeveloperSection etc.; also fixed a genuine font bug (config declared Inter/Space Grotesk instead of the actual Funnel Sans/Aspekta).
- **Contrast, partially (was H4)** — DeveloperSection cleaned; the `#71717A`-on-`#F4F4F5` pairings are gone.
- Old `Navbar.tsx` deleted; `FeaturesSection` is now used (by the price LP); stale `/fr/marseille`//`es/barcelona` meta removed; "CID" jargon replaced in meta descriptions; `/lp/price` is live and fully prerendered with unique title/description/canonical (verified).

---

## New findings

### N1 (High) — Host mismatch: site redirects to `www.`, all metadata says apex
Live: `https://fil.one/* → 301 → https://www.fil.one/*` (verified via fetch), but every canonical, OG URL, sitemap `<loc>`, and hreflang uses `https://fil.one/...`. Every canonical on the site now points at a redirecting URL, and the sitemap lists 58 URLs that all redirect. Pick one host (likely apex, matching the metadata) and fix the domain-level redirect direction in Vercel — or update all metadata to www.

### N2 (High) — Retired city LPs now serve the homepage to crawlers and a 404 to users
`/fr/marseille` and `/es/barcelona` were removed from `routes.tsx`, but the URLs still resolve: the SPA fallback serves the **prerendered homepage HTML** (homepage title, canonical `https://fil.one/`) and the client router then shows NotFound. Verified live on `/fr/marseille`. If any ad campaign, backlink, or old sitemap copy still points there, that's a dead conversion path wearing the homepage's SEO clothes. Add 301s in `vercel.json` (e.g., → `/lp/price` or the ES barcelona LP) and confirm ad destinations were updated.

### N3 (Medium-High) — Route manifest drift (the M3 prediction came true)
The three hand-synced sources have already diverged: `routes.tsx` = 60 paths, `ROUTE_META` = 59, `sitemap.xml` = 58. Concretely: **`/about` is not prerendered and not in the sitemap** (crawlers get homepage HTML + homepage canonical at `/about`), and **`/lp/price` is missing from the sitemap**. Short-term: add both entries. Real fix: generate ROUTE_META + sitemap from `routes.tsx` and assert parity in CI — this class of bug will keep recurring.

### N4 (Medium) — New-code accessibility
- `PriceComparisonHero.tsx:76` — the price comparison is visual-only: competitor prices are `line-through` in divs; a screen reader hears "Wasabi $7.99/TB/month" with no indication it's the rejected price. Add sr-only text ("Wasabi's price" / "Fil One — our price") or make it a small table with a caption.
- `CostCalculatorSection.tsx:35-50` — both range sliders have unassociated `<label>`s and no `aria-label`/`aria-valuetext`. Ironic given the forms-a11y commit in the same range; the older `StorageCalculatorSection` does this correctly.
- `CodeBlock.tsx:109` — line numbers not `aria-hidden`: screen readers announce every number interleaved with code. One attribute fixes noise + the contrast question.
- `CodeBlock.tsx:81-90` — language tabs still color-only, no `aria-pressed`/tablist (carried over from DeveloperSection).
- `Table.tsx` — `HeadCell` missing `scope="col"`.

### N5 (Medium) — Structured data bugs
- `FaqSection.tsx:122` `buildFaqSchema`: for ReactNode answers it emits **the question as its own answer** — ~7 FAQPage entries have garbage `acceptedAnswer` text.
- The head-injected homepage FAQ JSON-LD (`prerender.mjs:161`) still has the old billing wording while the visible copy changed — structured data diverges from rendered content.
- Duplicate FAQPage on the homepage (5-Q head + 15-Q body) — still present, unchanged from last audit.

### N6 (Medium) — The Hero extraction didn't achieve reuse
`Hero.tsx` is clean (good props API, aria-hidden backdrops, reduced-motion respected) but its only consumer is Home. The price LP forked the entire scaffolding into `PriceComparisonHero` (same `pt-[58px] md:pt-[94px]`, halo, grid, container) because Hero lacks a children slot between heading and CTAs. Add the slot, fold the fork back in. The grid mask now exists in 3 slightly-different copies (Hero `GRID_MASK`, `hero-grid-mask` token, inline in Home.tsx:47).

### N7 (Low) — Small new-code items
- `PriceComparisonHero.tsx:9` — module-scope non-null assertion on `rate("Wasabi")`: renaming a competitor in `pricing.ts` white-screens the route at import time.
- `PriceComparisonHero.tsx:90` — hero CTA missing `trackCtaClick` (every other page CTA has it).
- `/lp/price` meta description hardcodes all three prices in two places (`PriceLandingPage.tsx:15-17` + `prerender.mjs:618`) — will drift when `pricing.ts` changes.
- `StorageCalculatorSection.tsx:11` still carries its own competitor price table parallel to `COMPETITORS` — now a *silent drift* risk that didn't exist before centralization.
- `/TB/month` suffix in `text-zinc-500` on the `bg-brand-50` highlighted card ≈ 4.4:1 — marginal AA fail at 13px.
- Speculative unused tokens (`max-w-container-wide`, `py-section`, `warning` scale); `bg-dark-section` hardcodes navy hexes instead of referencing the `navy` tokens above it.
- Prerendered `/lp/price` HTML contains the calculator results twice (desktop table + mobile cards both in DOM) — harmless but bloats the static HTML.

---

## Still open from 2026-07-07

| Sev | Finding | Status |
|-----|---------|--------|
| High | Prerender silently skips failed routes (`prerender.mjs:828-831` warns and continues) — root cause of the original broken-LP incident | Not fixed |
| High | `#A1A1AA` low-contrast text: 30 occurrences / 13 files remain (PlatformNavbar ×5, SavingsSection ×3, AgentsLandingPage ×5, product pages…) | Partially fixed |
| High | LP copy-paste: "4.99" still literal in 50 src files + ~40 in prerender meta; legacy LPs untouched by the token/constants work | Partially fixed |
| Med | Skip link broken on ~10 pages — `ContactSales.tsx:147`, `Support.tsx:166`, `TermsOfUse.tsx:40` (+ legal/waitlist/ES pages) have `<main>` without `id="main-content"`; 49 other pages were fixed | Partially fixed |
| Med | `HeroGridDots.tsx:128` rAF loop still ignores `prefers-reduced-motion` | Not fixed |
| Med | Collapsed FAQ answers keep links tabbable (`FaqSection.tsx:199-207`) | Not fixed |
| Med | No `headers` in `vercel.json` (immutable assets / HTML revalidation) | Not fixed |
| Med | Fonts still 4× TTF, no woff2, no preload; Google Fonts render-blocking | Not fixed |
| Med | Dead code: HeroSection, HeroLens, AiCapabilitiesSection, IntroSection, SavingsSection, NavLink still unimported; QueryClientProvider still mounted with zero queries | Mostly not fixed |
| Low | `package.json` name `vite_react_shadcn_ts`; react-snap config + devDep; two lockfiles; `public/_redirects`; no sitemap `lastmod` | Not fixed |
| Med | Form errors/success still not announced (`role="alert"`/`aria-live` absent) | Not fixed (unverified this pass — was not in the forms commit) |

---

## Suggested order of attack

1. **N1** — resolve the apex/www split (domain settings + one grep). Everything SEO hangs on this.
2. **N2** — 301s for the retired `/fr/marseille` + `/es/barcelona`; confirm ad destinations.
3. **N3** — add `/about` + `/lp/price` to the missing manifests today; then generate ROUTE_META + sitemap from `routes.tsx` with a CI parity check, and make prerender fail on skipped routes (kills two recurring bug classes at once).
4. **N4/N5** — a half-day a11y + structured-data sweep on the new components.
5. Finish the `#A1A1AA` sweep (30 occurrences, mechanical).
6. Fold `PriceComparisonHero` into `Hero` via a children slot before the next LP forks it again.
