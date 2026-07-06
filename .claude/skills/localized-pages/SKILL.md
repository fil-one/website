---
name: localized-pages
description: Add or edit localized/geo-targeted pages on fil.one — "add a city page for Lyon/Madrid/Milan", "new ads landing page like Marseille", "translate the Barcelona page", "add a Spanish/French/German version", "new city campaign", "localized landing page suite". Covers the two existing localization patterns (config-driven /:lang/:city ads pages, and hand-built localized suites like Barcelona ES) and how to extend them to new cities and languages.
---

# Localized & city pages on fil.one

The site has TWO deliberately different localization patterns. Picking the wrong one is
the main failure mode — decide first.

## Pattern A — Config-driven city ads page (`/:lang/:city`)

**Exists today:** `/fr/marseille`, `/es/barcelona`. Built for paid-ad traffic: one shared
component (`src/pages/AdsLandingPage.tsx`) renders whatever city config it finds; ALL copy
and data live in `src/data/adsCities.ts` as `CityConfig` objects. Unknown lang/city
combinations render the 404 page.

**Use when:** the ask is "another city page like Marseille/Barcelona" — a lightweight,
latency-and-price focused ads page.

### Procedure

1. Open `src/data/adsCities.ts`. Copy an entire existing `CityConfig` object (the
   `es`/`barcelona` one for Spanish, `fr`/`marseille` for French) and append it to the
   `CITIES` array.
2. Fill every field — the interface at the top of the file documents each one. Fields are
   ALL required: SEO strings, navbar labels, hero copy, comparison-table rows
   (`filonePrice`, competitor prices/locations), `latencyRows` (RTT from nearby cities —
   get real numbers from the task or ask; do not fabricate latency figures), features
   checklist, footer labels.
3. `canonical` must be `https://fil.one/<lang>/<city>` and `lang`/`city` must match the
   URL slugs exactly (lowercase, kebab-case).
4. **No route change needed** — `/:lang/:city` in `src/App.tsx` already matches. Do NOT
   add an explicit route.
5. Register the page for crawlers (the dynamic route does NOT do this automatically):
   - `scripts/prerender.mjs`: add a `ROUTE_META` entry keyed `"/<lang>/<city>"` with the
     same title/description as the config's `seoTitle`/`seoDescription`.
   - `public/sitemap.xml`: add a `<url>` entry.

## Pattern B — Hand-built localized suite (Barcelona-ES style)

**Exists today:** `/lp/barcelona` (EN) + `/lp/es/barcelona` (ES) + `/lp/es/contacto` +
`/lp/es/soporte`. Full-weight landing pages with localized chrome.

**Use when:** the ask is a full campaign page in another language, not a thin ads page.

### Procedure

1. Create the page like any landing page (use the `add-landing-page` skill for the
   skeleton and 4-place registration), but:
   - Main LP pages: `<PlatformNavbar lang="es" />` and `<Footer lang="es" />`.
   - Contact/support sub-pages: `<LandingNavbar lang="es" />` / `<LandingFooter lang="es" />`
     (the lighter chrome used by `ContactSalesBcnES.tsx` / `SupportBcnES.tsx`).
2. Route convention: `/lp/<lang>/<slug>` (e.g. `/lp/es/barcelona`). Spanish slugs for
   Spanish sub-pages (`contacto`, `soporte`).
3. Localized SEO: `useSeo` + `ROUTE_META` in the target language; canonical points at the
   localized URL.
4. Currency: EU-targeted pages price in `€4.99/TB` (existing Barcelona convention);
   US/global pages use `$4.99/TB`.
5. Keep internal links language-consistent: the ES Barcelona page links to `/lp/es/contacto`,
   not `/contact-sales`.

## ⚠️ Adding a NEW LANGUAGE (anticipated work — this does not fully exist yet)

Only `en` and `es` are supported by the shared chrome: `PlatformNavbar` and `Footer` take
`lang?: "en" | "es"` and have `_EN`/`_ES` label arrays. French exists ONLY inside Pattern
A (the ads page carries its own labels in `CityConfig`).

The intended extension pattern, inferred from the code:

1. Extend the union: `lang?: "en" | "es" | "<new>"` in `src/components/PlatformNavbar.tsx`
   and `src/components/Footer.tsx`.
2. Duplicate each `_ES` label array/object as `_<NEW>` with translations, and extend each
   `lang === "es" ? … : …` selection to a lookup that handles the new code.
3. Then build pages per Pattern B.

**Validate these assumptions first (the future work may diverge):**

- [ ] Confirm with the task/user that full chrome localization is wanted — Pattern A
      needs NO navbar changes and may be all the campaign needs.
- [ ] Confirm URL scheme: `/lp/<lang>/<slug>` (Barcelona precedent) vs `/<lang>/<city>`
      (ads precedent) — don't invent a third.
- [ ] Confirm currency and who supplies translated copy (existing ES copy was approved
      externally; machine-translating a whole page unreviewed is NOT the repo's practice —
      draft it, but flag that it needs native review).
- [ ] Check whether hreflang tags have been added since this skill was written
      (`grep -rn hreflang scripts/ index.html src/`). As of writing there are NONE — the
      EN and ES Barcelona pages don't cross-reference. If the task is "do international
      SEO properly", hreflang support must be built in `prerender.mjs` + `index.html`
      placeholders; say so rather than pretending it exists.

## Verification

```sh
npm run build 2>&1 | tee /tmp/build.log
grep '✗' /tmp/build.log                         # nothing
grep '✓ /<lang>/<city-or-slug>' /tmp/build.log  # your route(s)
grep -o '<title>[^<]*</title>' dist/<lang>/<city>/index.html   # localized title
npm run dev -- --host 127.0.0.1
# open http://127.0.0.1:8080/<your-route> — check BOTH the new page and one existing
# localized page (/es/barcelona) still renders, since Pattern A shares one component.
```

## Do not

- Add an explicit `<Route>` for a Pattern-A city (the dynamic route covers it; a
  duplicate explicit route shadows it and confuses the next edit).
- Edit `AdsLandingPage.tsx` layout to satisfy one city's copy length — fix the copy;
  the component is shared by all cities.
- Fabricate latency numbers (`latencyRows`) or datacenter locations — these are checkable
  claims; get them from the task or leave TODO and flag.
- Translate the legal pages (`/terms`, `/privacy`) unless explicitly asked — the ES suite
  deliberately links to English legal pages today.
- Forget that `PlatformNavbar`/`Footer` default to English — a localized page missing
  `lang="es"` ships mixed-language chrome (this is visible in the browser; check it).
