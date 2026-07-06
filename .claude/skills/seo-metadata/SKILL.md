---
name: seo-metadata
description: Change anything SEO/AEO-related on fil.one — page title, meta description, canonical URL, Open Graph tags, JSON-LD structured data / FAQ schema, sitemap.xml, robots.txt, llms.txt, redirects, "fix crawlability", "the wrong title shows on Google", "update the SEO metadata for page X", "add FAQ schema". Explains the two-layer metadata pipeline (build-time prerender + client-side hook) and which files must change together.
---

# SEO / AEO metadata on fil.one

## How metadata works here (read before editing anything)

This site serves TWO kinds of visitors, through two separate code paths that must be kept
in sync **manually**:

1. **Crawlers (Google, and AI crawlers like GPTBot/ClaudeBot — the business explicitly
   targets AI answer engines, "AEO")** get static HTML written at build time by
   `scripts/prerender.mjs`. It renders every route with React `renderToString`, then
   stamps title/description/canonical/JSON-LD from its `ROUTE_META` object into
   `dist/<route>/index.html`. Crawlers never run the React app.
2. **Browsers** load the SPA; on navigation, each page's `useSeo({title, description,
   canonical})` call (from `src/hooks/useSeo.ts`) rewrites the DOM meta tags.

**The same title/description therefore lives in two places: the page component's
`useSeo` call AND the matching `ROUTE_META` entry in `scripts/prerender.mjs`. Every
metadata edit must change both, with identical strings.**

## Where each thing lives — edit map

| To change… | Edit | Also edit |
|---|---|---|
| A page's title or meta description | `ROUTE_META["<route>"]` in `scripts/prerender.mjs` | The `useSeo` call in that page's `src/pages/*.tsx` (identical strings) |
| Canonical URL | Same two places (`useSeo` `canonical`, prerender derives it from the route key) | — |
| Site-wide fallback title/description | `index.html` (the text between `<!--META_TITLE-->…<!--/META_TITLE-->` etc.) | The fallback strings in `scripts/prerender.mjs` (`meta.title ?? "…"`) |
| JSON-LD / FAQ schema for crawlers | `jsonLd: [...]` array in the route's `ROUTE_META` entry | Keep answers word-identical to on-page copy |
| Organization/Product/FAQ schema on homepage | `ROUTE_META["/"]` in `scripts/prerender.mjs` | Runtime duplicate in `src/components/FaqSection.tsx` via `JsonLd` component |
| Sitemap | `public/sitemap.xml` (hand-maintained; every indexable route needs a `<url>` entry) | — |
| robots.txt | `public/robots.txt` (currently allows everything incl. 11 named AI crawlers) | — |
| llms.txt (AI-agent-readable site summary) | `public/llms.txt` and `public/llms-full.txt` (hand-curated marketing content, NOT auto-generated) | — |
| Redirects (dead URLs → live pages) | `vercel.json` `redirects` array: `{ "source": "/old", "destination": "/new", "permanent": true }` | — |
| OG image | Global only: `public/og-image.png`, referenced in `index.html` | Per-page OG images are client-side only (`useSeo` `ogImage` param) — **crawlers will NOT see them**; say so if asked |

## Rules

- Canonicals are always `https://fil.one<route>` — never `www.`, never a trailing slash
  (except the homepage `https://fil.one/`), never a staging/lovable/vercel domain.
  (Commit "Normalize in-source canonicals/ogImage to fil.one" cleaned this up once;
  don't regress it.)
- Titles ≤ ~60 chars and include "Fil One". Descriptions 150–160 chars.
- **Never delete or reformat the `<!--META_TITLE-->`, `<!--META_DESCRIPTION-->`,
  `<!--META_CANONICAL-->`, `<!--META_JSON_LD-->` comment placeholders in `index.html`** —
  `prerender.mjs` replaces them by regex; removing one silently breaks per-route metadata
  for all 60 routes.
- Never edit files in `dist/` — build output.
- `ROUTE_META` keys must exactly match a `path` in `src/App.tsx` (a mismatched key
  prerenders a 404 page at that URL; a missing key means the route ships homepage
  metadata). The `/fr/marseille` and `/es/barcelona` keys are the two prerendered
  instances of the dynamic `/:lang/:city` route — that is intentional.
- Do not touch the third-party scripts in `index.html` (GTM, Plausible, Unify, HubSpot)
  during SEO work.
- JSON-LD FAQ answers must restate real, approved claims ($4.99/TB/month, $0 egress,
  11 nines, ~24h integrity proofs, 30-day/1TB trial). Never invent numbers or features.

## Adding FAQ (or other) structured data to a route

In `scripts/prerender.mjs`, extend the route's entry:

```js
"/lp/<slug>": {
  title: "…",
  description: "…",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "<exact question as it appears on the page>",
          acceptedAnswer: { "@type": "Answer", text: "<exact on-page answer>" },
        },
        // … one block per Q&A
      ],
    },
  ],
},
```

Copy a full working example from the existing `"/lp/agents"` entry. Other schema types in
use: `Organization`, `Product` with `Offer`/`UnitPriceSpecification` (see `ROUTE_META["/"]`).

## Verification (mandatory)

```sh
npm run build 2>&1 | tee /tmp/build.log
grep '✗' /tmp/build.log           # must print nothing — prerender failures do NOT fail the build

# Check the exact route you touched:
grep -o '<title>[^<]*</title>' dist/<route>/index.html
grep -o 'rel="canonical" href="[^"]*"' dist/<route>/index.html
grep -c 'application/ld+json' dist/<route>/index.html   # ≥1 if you added jsonLd

# Sweep: no route should have silently fallen back to homepage metadata
# (routes other than / and legal pages should not carry the homepage title):
grep -rl '<title>Fil One | S3 object storage built for the AI era</title>' dist --include=index.html

# JSON-LD must be valid JSON — if the build printed your route with ✓ and the grep above
# finds the script tag, it serialized fine (it's JSON.stringify'd from a JS object).
```

For redirects (`vercel.json`) there is no local test — verify JSON syntax
(`node -e "JSON.parse(require('fs').readFileSync('vercel.json'))"`) and state in your PR
that the redirect needs checking on the Vercel preview deployment.

## Known limitations to relay when relevant

- Per-route OG images are not supported at the crawler level (single global
  `og-image.png`). Supporting them would require extending `prerender.mjs` and its
  `index.html` placeholders.
- `sitemap.xml` has no `lastmod` values and is fully manual; there is no generator script.
- `llms.txt`'s "Pages" section lists only 3 of ~60 routes — it is curated, not exhaustive.
  If asked to "sync llms.txt", add only high-value pages, keeping its existing tone.
