---
name: dev-build-deploy
description: Run, build, test, lint, preview, or deploy the fil.one website — "run the dev server", "the dev server won't start", "build the site", "tests are failing", "fix lint", "check my change locally", "why is CI red", "deploy this". Also covers HubSpot form work ("fix the contact form", "add a form field", "waitlist form") and analytics ("add a Plausible event", "track this CTA") via reference files. Read this FIRST for any task in this repo — it lists the pre-existing failures you must not mistake for your own.
---

# Working in this repo: commands, baselines, gotchas

## Commands (all verified by actually running them)

| Task | Command | Expected result |
|---|---|---|
| Install | `npm install` | ~455 packages. **Use npm.** `bun.lockb` exists but is stale; `package-lock.json` is authoritative (README says npm) |
| Dev server | `npm run dev` | Vite on **port 8080**. In containers/CI this FAILS: `Error: listen EAFNOSUPPORT ... :::8080` because `vite.config.ts` binds IPv6 `::`. Fix: `npm run dev -- --host 127.0.0.1`. Do NOT edit vite.config.ts for this |
| Build | `npm run build` | `vite build` then `postbuild` runs `node scripts/prerender.mjs`, printing `✓ <route>` per route (~60) and "Prerendering complete." |
| Preview built site | `npm run preview` (add `-- --host 127.0.0.1` in containers) | Serves `dist/` |
| Tests | `npm test` | Vitest, jsdom. **Baseline: 18 tests, 3 FAIL** (see below) |
| Lint | `npm run lint` | **Baseline: 17 problems (8 errors, 9 warnings) on main** |
| Type-check | `npx tsc -p tsconfig.app.json --noEmit` | Not in the build (vite-swc strips types without checking). **Baseline: 7 errors, all in `*.test.*` files** |

## Pre-existing failures — NOT caused by your change

Memorize these before debugging anything:

1. **3 failing tests** in `src/components/FaqSection.test.tsx` ("Unable to find an element
   with the text: Is Fil One hot, warm, or cold storage?…"). FAQ copy changed; the test
   didn't. Don't revert copy to fix them; updating the test strings is the correct fix if
   asked.
2. **8 lint errors / 9 warnings** across `src/components/ui/*`, `AgentsLandingPage.tsx`,
   `tailwind.config.ts`, `useInView.ts`. Fix only what your diff introduces (compare:
   `git stash && npm run lint; git stash pop`).
3. **7 tsc errors**, all "Unused '@ts-expect-error' directive" in test files. App source
   compiles clean — a new error in a non-test file is yours.

## The build lies about prerender failures

`scripts/prerender.mjs` catches per-route errors and prints `✗ <route> (skipped — msg)`
**without failing the build**. A "successful" build can silently ship a route as an empty
SPA shell with homepage metadata. After every build:

```sh
npm run build 2>&1 | grep '✗'   # MUST print nothing
```

Typical cause of a ✗: browser-only API called at module top level (outside `useEffect`)
in a page component — the prerender runs in jsdom. Guard with `typeof window !== "undefined"`
or move into `useEffect`.

## Deploy model

- Vercel. **Merging/pushing to `main` = immediate production deploy to fil.one.** There
  is no staging environment anymore (an old `staging` branch was merged and retired).
- Work on feature branches (history convention: `lp/<slug>`, `fix/<thing>`,
  `chore/<thing>`), open a PR to `main`.
- PRs get Vercel preview deployments — mention in the PR what to check on the preview.
- SPA fallback for client routes is `vercel.json` `rewrites` (and `public/_redirects` for
  non-Vercel hosts). Don't remove either.

## Repo map — what NOT to touch

| Path | What it is |
|---|---|
| `dist/`, `dist-ssr/` | Build output — never edit, never commit |
| `filone_barcelona_landing.html` (root) | Static design mockup, not served — never edit |
| `landing-page-framework.md` (root) | Marketing strategy doc — read, don't edit |
| `package.json` `reactSnap` key + `react-snap` devDep | Vestigial (replaced by `scripts/prerender.mjs`) — leave alone |
| `src/components/ui/*` | shadcn/ui primitives — don't hand-edit, don't "fix" their lint |
| `index.html` third-party scripts (GTM `GTM-PK26TC8W`, Plausible, Unify, HubSpot loader) | Marketing-owned tags — never remove or reorder |
| `index.html` `<!--META_*-->` comments | Prerender anchors — never delete |
| `bun.lockb`, `package-lock.json` | Regenerate via npm only, never hand-edit |

## Sub-guides

- HubSpot forms (contact, waitlists, partner, support):
  [references/hubspot-forms.md](references/hubspot-forms.md)
- Plausible events, scroll tracking, GTM/Unify:
  [references/analytics-tracking.md](references/analytics-tracking.md)

## Verifying any change end-to-end

```sh
npx tsc -p tsconfig.app.json --noEmit        # only baseline test-file errors allowed
npm test                                     # only the 3 known FaqSection failures allowed
npm run build 2>&1 | grep '✗'                # nothing
npm run dev -- --host 127.0.0.1              # eyeball the affected page(s) at :8080,
                                             # including ~375px mobile width
```
