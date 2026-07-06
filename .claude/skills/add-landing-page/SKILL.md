---
name: add-landing-page
description: Create a new page on the fil.one marketing site — a landing page ("add a landing page for X", "new /lp/ page", "lp: genomics-style page for a new audience", "spin up a campaign page"), a product page, a solutions page, or a waitlist page. Covers the full procedure — page component, route registration in App.tsx, prerender metadata, sitemap — plus the design system and verification. Use this whenever a task creates a new URL on fil.one.
---

# Add a page to fil.one

## Context (read once)

This repo is the marketing site for **Fil One** (fil.one): S3-compatible object storage
built on Filecoin, sold at a flat **$4.99/TB/month with no egress fees**. The most common
recurring task in this repo is adding a conversion landing page under `/lp/<slug>` aimed at
one audience (e.g. `/lp/genomics`, `/lp/grant-funded`, `/lp/egress`). ~40 already exist.

The site is a React SPA, but **SEO depends on a build-time prerender step**
(`scripts/prerender.mjs`) that renders every route to static HTML. A new page is NOT done
when it renders in the browser — it is done when all four registration points below are
updated and the build output proves it.

## The four registration points (never skip any)

| # | File | What goes there |
|---|---|---|
| 1 | `src/pages/<PascalName>LandingPage.tsx` | The page component |
| 2 | `src/App.tsx` | Import + `<Route>` element |
| 3 | `scripts/prerender.mjs` | `ROUTE_META` entry (title, description, optional jsonLd) |
| 4 | `public/sitemap.xml` | `<url>` entry |

Repo history shows steps 3 and 4 get forgotten and have to be back-filled later
("fix: AEO P0", "prerender: sync Barcelona SEO metadata" commits). Do not repeat that.

## Procedure

### Step 0 — Decide the page type

- Audience/use-case conversion page (the default; what "landing page" means here) →
  route `/lp/<kebab-slug>`, component `src/pages/<PascalSlug>LandingPage.tsx`.
- Product page (a Fil One product) → route `/<slug>`, like `/storage`.
- Solutions page → route `/solutions/<slug>`, file in `src/pages/solutions/`.
- City/ads or translated page → STOP, use the `localized-pages` skill instead.

If the request is ambiguous, build an `/lp/` page — that matches 40 of the existing pages.

### Step 1 — Write the page component

Copy the complete skeleton from [references/page-template.md](references/page-template.md)
into `src/pages/<Name>LandingPage.tsx` and fill in the copy. The skeleton already follows
every repo convention. Key rules:

- Navbar/footer: `<PlatformNavbar />` at top, `<Footer />` at bottom. Never use
  `Navbar.tsx` or `LandingNavbar.tsx` for a new English page.
- SEO hook: call `useSeo({ title, description, canonical })` at the top of the component.
  `canonical` MUST be `https://fil.one/lp/<slug>` (exact domain, no trailing slash, no
  `www`, never a staging or lovable.dev domain).
- Icons: `@phosphor-icons/react` (e.g. `CurrencyDollar`, `ShieldCheck`, `Database`).
  Do NOT import from `lucide-react` in page files — that library is only for the
  shadcn `src/components/ui/*` primitives.
- Shared primitives: `GRID_SVG`, `SectionLabel`, `SectionHeading`, `SectionSub` from
  `@/components/LandingPrimitives`. Do not re-implement them.
- Animations: hero uses the `hero-fade-1` … `hero-fade-4` CSS classes; scroll sections use
  `useInView` + the `reveal` / `in-view` classes. All defined in `src/index.css` — never
  add new keyframes for these.
- Copy lives in `const` arrays at the top of the file (see skeleton). Do not fetch copy,
  do not add a CMS, do not create JSON files for it.
- CTAs: primary → `https://app.fil.one/login?screen_hint=signup` with classes
  `btn-primary` (+`btn-primary-dark` on dark background); secondary → `/contact-sales`
  with `btn-secondary` (+`btn-secondary-dark` on dark background).
- Design tokens (colors, fonts, spacing) are in
  [references/design-system.md](references/design-system.md) — follow them exactly; do
  not invent new colors.

For what the copy should SAY (hero answers the visitor's problem, pain section, comparison
table, proof, CTA strategy), follow `landing-page-framework.md` at the repo root — it is
the marketing team's approved structure. Pricing/claims numbers you may use are listed in
the skeleton's claims table; never invent new numbers.

### Step 2 — Register the route in `src/App.tsx`

1. Add the import in the `// Landing pages` block:
   `import GenomicsLandingPage from "./pages/GenomicsLandingPage";`
2. Add the route inside `<Routes>`, next to the other `/lp/` routes and ABOVE the line
   `{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}`:
   `<Route path="/lp/<slug>" element={<GenomicsLandingPage />} />`

Never place a route after the `*` catch-all. Never register the same path twice.

### Step 3 — Add the `ROUTE_META` entry in `scripts/prerender.mjs`

Find the `ROUTE_META` object and add an entry with the SAME title and description you
passed to `useSeo` (they must match word for word):

```js
"/lp/<slug>": {
  title: "Fil One — <benefit statement, total ≤ 60 chars>",
  description: "<150–160 chars, includes $4.99/TB and the audience's pain>",
},
```

- Newest pages use the `"Fil One — <benefit>"` title pattern; older ones use
  `"<Descriptive> — Fil One"`. Either is acceptable; stay under ~60 characters.
- If the page has an FAQ section, also add a `jsonLd` array with an `FAQPage` schema —
  copy the shape from the existing `"/lp/agents"` entry, and make the answers match the
  on-page FAQ text exactly.
- A route with NO entry silently prerenders with the homepage's title/description —
  the build will not warn you. This is the most common mistake.

### Step 4 — Add the sitemap entry in `public/sitemap.xml`

Append before `</urlset>`:

```xml
  <url>
    <loc>https://fil.one/lp/<slug></loc>
    <changefreq>weekly</changefreq>
  </url>
```

### Step 5 — Do NOT add navigation links

`/lp/` pages are ad/outbound destinations and are intentionally NOT linked from the navbar
or footer. Only add nav links if the task explicitly asks (that means editing the link
arrays at the top of `src/components/PlatformNavbar.tsx` and `src/components/Footer.tsx` —
both have separate `_EN` and `_ES` arrays; update both).

## Verification (mandatory, in this order)

```sh
# 1. Type-check (build does NOT catch type errors — vite-swc skips them).
npx tsc -p tsconfig.app.json --noEmit
# Baseline: 7 pre-existing errors, all in *.test.* files. Any error in YOUR new file
# or in App.tsx must be fixed.

# 2. Build + prerender.
npm run build 2>&1 | tee /tmp/build.log
grep '✗' /tmp/build.log            # MUST print nothing (a ✗ means your route failed
                                   # to prerender but the build still "succeeded")
grep '✓ /lp/<slug>' /tmp/build.log # MUST print your route

# 3. Confirm the static HTML got YOUR metadata, not the homepage fallback.
grep -o '<title>[^<]*</title>' dist/lp/<slug>/index.html
grep -o 'rel="canonical" href="[^"]*"' dist/lp/<slug>/index.html
# Correct output: your title and https://fil.one/lp/<slug>.
# If you see "Fil One | S3 object storage built for the AI era" you forgot Step 3.

# 4. Look at it in a browser.
npm run dev -- --host 127.0.0.1    # plain `npm run dev` fails in containers (IPv6)
# open http://127.0.0.1:8080/lp/<slug> — check hero, mobile width (~375px), all sections.
```

`npm test` (3 known failures in FaqSection.test.tsx are pre-existing) and `npm run lint`
(17 pre-existing problems) only need attention if YOUR files appear in the output.

## Common mistakes — do not do these

- Forgetting `ROUTE_META` (page silently ships homepage metadata — check Step 3 output).
- Forgetting the sitemap entry.
- `useSeo` canonical that disagrees with the route path or uses another domain.
- Editing anything in `dist/` — it is build output, regenerated every build.
- Editing `index.html`'s `<!--META_TITLE-->`-style comment placeholders — the prerender
  regex depends on them.
- Adding npm dependencies for a landing page — everything needed already exists.
- Editing `package-lock.json` or `bun.lockb` by hand.
- Touching `filone_barcelona_landing.html` (a design mockup, not served) or
  `landing-page-framework.md` (strategy doc) when implementing.
- Copying an existing page wholesale and leaving its `useSeo`/copy in place — every page
  must have unique title, description, canonical.
- Pushing directly to `main` — work on a branch (convention: `lp/<slug>`) and open a PR;
  merging to `main` deploys production on Vercel immediately.
