---
name: copy-updates
description: Edit marketing copy on fil.one — "apply the approved copy revisions", "update the hero headline", "change the FAQ answers", "copyedit from the reviewed doc", "de-slop the AI-sounding prose", "update the pricing to X", "change 'Coming soon' to 'Early access'", or any wording/claims change on landing pages, product pages, or the homepage. Covers where copy lives, which duplicate locations must change together, brand voice rules, and the stale-test trap.
---

# Copy changes on fil.one

## Where copy lives

There is **no CMS and no i18n string files**. All copy is hardcoded in TSX:

- Page-specific copy: `const` arrays and JSX literals inside `src/pages/*.tsx`.
- Homepage sections & shared blocks: `src/components/*.tsx` (`FaqSection.tsx`,
  `UseCasesSection.tsx`, `ComparisonSection.tsx`, `PricingSection.tsx`, etc.).
- Navbar/footer labels: arrays at the top of `src/components/PlatformNavbar.tsx` and
  `src/components/Footer.tsx` — each has separate `_EN` and `_ES` variants; **change both
  languages or note why you didn't**.
- City ads pages (`/fr/marseille`, `/es/barcelona`): all copy is data in
  `src/data/adsCities.ts`.
- SEO titles/descriptions: duplicated between each page's `useSeo()` call and
  `ROUTE_META` in `scripts/prerender.mjs` (see the `seo-metadata` skill).
- AI-crawler content: `public/llms.txt` and `public/llms-full.txt`.

To find every occurrence of a phrase: `grep -rn "<phrase>" src scripts public --include='*.tsx' --include='*.ts' --include='*.mjs' --include='*.txt'`

## Procedure for a copy pass

1. Locate the strings with grep (above). Copy that "matches" may exist in several files —
   list all hits before editing.
2. Make the edits in the page/component files.
3. **Sync the duplicates.** If you changed:
   - a hero headline / page positioning → update `useSeo` title/description in the same
     file AND the route's `ROUTE_META` entry in `scripts/prerender.mjs`;
   - an FAQ question or answer → update the matching `jsonLd` FAQPage entry in
     `scripts/prerender.mjs` (if the route has one) AND the test file (see trap below);
   - a claim/number → follow [references/brand-claims.md](references/brand-claims.md) and
     sweep every listed location, including Spanish/French variants and llms.txt;
   - navbar/footer text → both `_EN` and `_ES` arrays.
4. Verify (bottom of this file).

## The stale-test trap (this has already bitten the repo)

`src/components/FaqSection.test.tsx` asserts **exact FAQ question strings**. A past copy
change edited `FaqSection.tsx` without the test, so **3 tests fail on `main` right now**
(they look for "Is Fil One hot, warm, or cold storage? Is it like Glacier?", which no
longer exists).

- If you change copy in a component that has a `.test.tsx` neighbor
  (`FaqSection`, `CtaSection`), update the test's expected strings to your new copy.
- NEVER "fix" a failing copy test by reverting the approved copy — the copy is the source
  of truth, the test follows it.
- The 3 pre-existing failures are not yours; fixing them is welcome but optional. Every
  other test (15) passes on main and must stay passing.

## Voice rules (condensed; full guide in [references/voice-rules.md](references/voice-rules.md))

The repo had a dedicated "de-slop" pass removing AI-writing tells (commit `2a27f72`).
When writing or editing copy:

- Max ONE "isn't X — it's Y" negation-reframe per page. Prefer stating the positive.
- Don't chain em-dash pivots ("— and that's the point", "— by design"). Plain periods.
- Ban the tic "by design" (it was specifically removed).
- Concrete numbers over adjectives: "verified every ~24 hours" not "continuously
  verified"; "$4.99/TB" not "affordable".
- Short declarative sentences. Headlines may end with a period ("Storage that outlives
  the grant cycle.").
- Don't over-correct into flat prose — single strong constructions are fine; repetition
  is the problem.
- Copy approval flow: substantive copy usually arrives from a reviewed Google Doc /
  approved source. Apply it faithfully — do not "improve" approved copy beyond mechanical
  fixes; flag anything that contradicts the claims registry instead of silently changing it.

## Verification

```sh
npx tsc -p tsconfig.app.json --noEmit   # baseline: 7 errors, all in *.test.* files
npm test                                # baseline: 3 known failures in FaqSection.test.tsx;
                                        # your changed components' tests must pass
npm run build 2>&1 | grep '✗'           # must print nothing
# If you touched useSeo/ROUTE_META, confirm the built HTML:
grep -o '<title>[^<]*</title>' dist/<route>/index.html
# Visual check:
npm run dev -- --host 127.0.0.1         # then open http://127.0.0.1:8080/<route>
```

## Do not

- Change any number/claim without checking [references/brand-claims.md](references/brand-claims.md)
  and sweeping ALL its locations — a price visible in two different values on two pages is
  worse than the old price everywhere.
- Edit copy in `dist/` (build output) or in `filone_barcelona_landing.html` (unused mockup).
- Translate ES/FR copy by dead reckoning if the change is substantive — apply the English
  change, then mirror it in `BarcelonaLandingPageES.tsx` / `adsCities.ts` keeping the
  existing register (formal "tú"-avoiding Spanish, marketing French); if unsure, leave the
  localized page and flag it in the PR description.
- Reformat or restructure JSX while editing copy — keep diffs copy-only so reviewers can
  read them.
