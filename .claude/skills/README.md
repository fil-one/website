# Skills manifest

Five skills for working on the fil.one marketing site, written 2026-07-06 after a full
audit of the codebase, all 155 commits, the build/dev/test pipeline (every documented
command was actually run), and the deploy setup. Optimized for models that need explicit
procedures: exact paths, exact commands, decision points, negative examples, and
verification steps. `CLAUDE.md` at the repo root carries the always-loaded essentials and
points here.

## Portfolio

### add-landing-page — create any new page end to end

- **Covers:** the 4-place registration every new URL needs (page component → `App.tsx` →
  `ROUTE_META` in `scripts/prerender.mjs` → `sitemap.xml`), a complete copy-paste page
  skeleton (`references/page-template.md`), the design system
  (`references/design-system.md`), and build-output verification.
- **Evidence basis:** ~30 of 155 commits are `lp: <name>` page additions — the dominant
  work type. History shows steps 3–4 were repeatedly forgotten and back-filled ("fix: AEO
  P0 — crawlability, canonicals, sitemap", "prerender: sync Barcelona SEO metadata").
  The skeleton was extracted from the newest shipped pages and **validated by pasting it
  into a real page, registering it, and building — it compiles and prerenders correctly**.
- **Limitations:** skeleton covers the standard 6-section conversion page; bespoke pages
  (pricing calculator, waitlist forms) still require reading a comparable existing page.

### seo-metadata — titles, descriptions, canonicals, JSON-LD, sitemap, llms.txt, redirects

- **Covers:** the two-layer metadata pipeline (build-time `ROUTE_META` + client-side
  `useSeo`, which duplicate each other), an edit map of what lives where, JSON-LD schema
  patterns, and greps against `dist/` to prove crawler-visible output.
- **Evidence basis:** dedicated SEO infrastructure (custom prerender script replacing
  react-snap, meta placeholder comments in `index.html`, hand-maintained sitemap, curated
  llms.txt) plus 5+ commits purely about canonicals/sitemap/structured data. Missing
  `ROUTE_META` fails silently — verified: routes without entries ship homepage metadata.
- **Limitations:** per-route OG images are unsupported by the pipeline (documented, not
  solved). Redirects can only be syntax-checked locally, not behavior-tested.

### copy-updates — copy revisions, claims consistency, voice

- **Covers:** where copy lives (hardcoded TSX, no CMS), duplicate locations that must move
  together (useSeo/ROUTE_META/jsonLd/tests/ES variants), a claims registry with sweep
  checklist (`references/brand-claims.md`), and voice rules distilled from the repo's own
  "de-slop" review (`references/voice-rules.md`).
- **Evidence basis:** 8+ commits applying externally approved copy; commit `2a27f72`
  removing AI-writing tropes; `$4.99` appears in 52 files and `11 nines` in 14 (grep-counted),
  so claim changes are cross-cutting sweeps; 3 tests on `main` already fail because a copy
  change outran its test — the exact trap the skill warns about.
- **Limitations:** the registry snapshots claims as of 2026-07-06; a model applying it
  after a rebrand should re-grep rather than trust the counts. Anticipates a future price
  change (sweep procedure) — that event hasn't happened yet.

### localized-pages — city ads pages and language suites (part anticipated)

- **Covers:** the two existing patterns — config-driven `/:lang/:city` ads pages
  (`src/data/adsCities.ts`) and hand-built suites (Barcelona ES) — plus a clearly-marked
  **anticipated** section for adding a whole new language (extending the
  `lang: "en" | "es"` unions), with a validate-assumptions checklist (URL scheme,
  currency, hreflang absence, native copy review).
- **Evidence basis:** the dynamic route + `CityConfig` array is built for extension
  (2 cities today); `PlatformNavbar`/`Footer` already carry EN/ES label sets; the entire
  Barcelona EN/ES suite shipped in the last two weeks of history (PRs #41–42), and city
  campaigns are the newest work in the repo — more cities/languages are the clearest
  trajectory signal.
- **Limitations:** the new-language procedure is inferred, not yet exercised in history —
  hence the mandatory assumptions checklist. No hreflang support exists; the skill says to
  flag that rather than fake it.

### dev-build-deploy — commands, baselines, environment gotchas, forms, analytics

- **Covers:** every command with its verified output; the three classes of PRE-EXISTING
  failures a model must not mistake for its own (3 failing FaqSection tests, 8 lint
  errors, 7 test-file tsc errors); the container-only dev-server IPv6 failure and its
  fix; the fact that prerender failures don't fail the build; deploy model (main =
  production on Vercel); do-not-touch file map; HubSpot Forms API v3 procedure
  (`references/hubspot-forms.md`); Plausible event conventions
  (`references/analytics-tracking.md`).
- **Evidence basis:** all baselines measured by running the commands in this environment
  on a clean checkout; HubSpot shape taken from the shipped waitlist page and the "Fix
  HubSpot form integration" commit; analytics conventions from `analytics.ts` + its tests.
- **Limitations:** baselines (3/8/7 failures) will drift as the repo changes; the skill
  tells the model to re-measure with `git stash` comparison rather than trust the numbers
  forever. HubSpot form submits hit production — the skill mandates a single tagged test
  submission, but there is no sandbox portal.

## Skills deliberately NOT built

- **Pricing-change sweep** — folded into `copy-updates/references/brand-claims.md` rather
  than a standalone skill (same procedure, one trigger).
- **Early-access → GA launch flips** — evidence exists (badge-rename commits) but the
  work is small and covered by the claims registry's badge row.
- **A/B testing / homepage variants** — `VersionB.tsx` hints at variant work, but no
  variant infrastructure exists to document; writing a skill would be speculation.

## Stress-testing performed

Each skill was walked through three tasks (routine / ambiguous / likely-to-go-wrong).
Highlights: the `add-landing-page` template was physically pasted into the repo,
registered per the skill's own steps, type-checked, built, and its prerendered HTML
verified (then removed). The "wrong title on Google", "translate to German", "tests are
failing", and "raise the price" scenarios all resolve to explicit skill sections rather
than judgment calls.
