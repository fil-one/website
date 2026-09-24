# Fil One website

Marketing site for [Fil One](https://www.fil.one), S3-compatible object storage built on Filecoin.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** (build and dev server), with a custom SSR prerender step (`scripts/prerender.mjs`)
- **Tailwind CSS** with the site's design tokens in `tailwind.config.ts`
- **React Router** (client-side routing, lazy-loaded per route)
- **Phosphor Icons** and **Radix Tabs**
- **Vercel** functions in `api/` for the HubSpot blog
- **Vitest** + Testing Library (unit and component tests)

## Project structure

```
api/                    # Vercel functions: blog JSON, blog page meta, RSS
scripts/
├── prerender.mjs       # Renders every route to static HTML after `vite build`
└── routeMeta.mjs       # Title + description for every route (single source for SEO)
public/
├── llms.txt            # Summary for AI agents, maintained by hand
└── llms-full.txt       # Full agent/developer reference, maintained by hand
src/
├── routes.tsx          # Route manifest: drives the router, prerender, and sitemap
├── entry-server.tsx    # SSR entry used by the prerender
├── components/         # Shared sections and primitives (Hero, CtaBanner, FaqSection,
│                       #   ComparisonSection, LandingPage shell, FormControls, ...)
├── pages/              # One file per route, including /lp/* campaign pages
├── hooks/              # useSeo, useLang, useInView, useScrollTracking
├── lib/
│   ├── pricing.ts      # Prices and competitor rates (pricing.constants.mjs holds the raw numbers)
│   ├── hubspot.ts      # Portal ID, form GUIDs, Forms API submit helper
│   ├── console-url.ts  # Host-aware console links (see "Demo-alias domain")
│   ├── s3-endpoint.ts  # S3 endpoint quoted in code samples
│   ├── i18n.ts         # English/Spanish copy for the shared navbar and footer
│   └── analytics.ts    # Event, CTA, and docs-click tracking
└── test/               # Test setup and the route/SEO parity test
```

## Getting started

```sh
git clone https://github.com/fil-one/website.git
cd website

npm install
npm run dev
```

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build, then prerender every route (`postbuild`) |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check app and Node configs |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |

## Routes and SEO

Every route is declared once in `src/routes.tsx`. The router, the prerender list, and `sitemap.xml` all derive from it. Each route's title and description live in `scripts/routeMeta.mjs`, which the prerender bakes into static HTML and `useSeo` reads at runtime. `src/test/route-seo-parity.test.ts` fails CI if a route has no metadata.

Main pages: `/`, `/pricing`, `/solutions`, `/neocloud`, `/partners`, `/about`, `/blog`, `/support`, `/contact-sales`, plus the legal pages. `/lp/*` pages are campaign landing pages: they're `noindex`, left out of the sitemap, and never linked from the main site. Retired URLs are 301'd in `vercel.json`.

When copy changes a claim, also update `public/llms.txt` and `public/llms-full.txt`. They're maintained by hand.

## HubSpot integration

Marketing forms submit to HubSpot via the [Forms API v3](https://developers.hubspot.com/docs/api/marketing/forms):

- **Contact Sales**: `/contact-sales` and `/lp/es/contacto`
- **Support**: `/support` and `/lp/es/soporte`
- **Partner Apply**: `/partners/apply`
- **Neocloud Apply**: `/neocloud/apply`. Its GPU and timeline fields are custom properties; the internal names and objects are listed at the top of `NeocloudApplyPage.tsx`.

Portal ID and form GUIDs are centralised in `src/lib/hubspot.ts`. Every Forms-API `<form>` needs `data-hs-do-not-collect`, or HubSpot also logs a duplicate "non-HubSpot form" submission.

Blog content is read through server-side Vercel functions so the private app token is never exposed to the browser. Responses are projected down to the fields the site renders, so HubSpot's internal fields never reach the client:

- `GET /api/blogs` — page of published post summaries (`?limit=`, `?after=` cursor)
- `GET /api/blogs?slug=…` — one published post, body included
- `GET /api/blogs/:id` — one published post by ID
- `/blog/:slug` → `api/blog-page.js` — serves the SPA shell with the article's title, description, OG tags and `BlogPosting` JSON-LD injected at request time (rewrite in `vercel.json`)
- `/blog/rss.xml` → `api/rss.js` — RSS 2.0 feed built at request time from the same published feed

Categories are HubSpot blog **tags**: posts carry `tagIds`, which the server resolves to names (cached 5 minutes per instance). The tab bar is built from tags present on published posts, so retagging in HubSpot changes it without a deploy.

The SPA catch-all rewrite excludes `/api/` — Vercel resolves dynamic function routes (`api/blogs/[id].js`) *after* rewrites, so a bare `/(.*)` catch-all silently shadows them and returns `index.html` instead.

Only posts that are `PUBLISHED` **and** in the configured blog group are served; drafts and other blogs' posts return 404.

Article slugs can't be prerendered (posts are published from HubSpot without a deploy), which is why `/blog/:slug` is marked `prerender: false` in `src/routes.tsx` and gets its meta from the request-time function instead.

Copy `.env.example` to `.env` and set `HUBSPOT_PRIVATE_APP_ACCESS_TOKEN` to a HubSpot service key or private app token with the `content` scope. `HUBSPOT_BLOG_CONTENT_GROUP_ID` is optional — it defaults to Fil One's production blog group and only needs setting to point a preview deployment at a different portal.

## Deployment

Deployed on **Vercel**. Pushing to `main` triggers a production deployment automatically. SPA routing is handled via `vercel.json`.

### Demo-alias domain

`fil.one` keeps landing on blocklists, and the `.one` TLD itself is flagged, which breaks live demos. The same deployment is therefore also served from **`filone.ai`** — an alias whose only value is an unflagged reputation. `fil.one` remains the canonical, public, indexed domain.

`filone.ai` and `www.filone.ai` are attached to this Vercel project alongside the `fil.one` hostnames. The console is served on `app.filone.ai` from the same CloudFront distribution — see `PROD_CONSOLE_ALIAS_HOSTS` in `fil-one/fil-one`, `packages/shared/src/constants.ts`. DNS for the whole zone lives in `environments/prod/filone-ai.tf` in `fil-one/infrastructure`.

**The alias must stay out of search results.** `vercel.json` sends `X-Robots-Tag: noindex, nofollow` for `(www.)?filone.ai` via a host-conditional `has` rule, placed first so it applies regardless of whether Vercel evaluates `headers` cumulatively or first-match. Canonicals need no special handling: `index.html` and `useSeo` already emit absolute `https://www.fil.one/…` URLs on every host, so the alias points search engines at the canonical domain by itself. **Do not** add a `Disallow` for the alias in `robots.txt` — that would stop crawlers fetching the page at all, so they would never see the `noindex` header, and the two mechanisms would cancel out. The `has.value` pattern is unanchored, so it also matches a host merely containing the alias; that only ever over-applies `noindex`, which is the safe direction.

**Console links must follow the host.** Use `signupUrl()` for sign-up CTAs, or `consoleUrl(path)` / `consoleOrigin()` for any other console destination, all from `src/lib/console-url.ts`. Never hardcode `https://app.fil.one`, or a visitor on the alias is sent to the domain the alias exists to avoid.

Keep the alias unadvertised: no public links, no marketing references, and do not add it to Search Console.

Two things about `filone.ai` worth knowing before you change anything here:

- It is also the domain every production Auth0 email is sent from, and a HubSpot campaign sender. Reputation damage earned by pages served here lands on the domain that delivers password resets, so treat a phishing report against the alias as a mail-deliverability incident too.
- **`docs.fil.one` and `status.fil.one` links still leave the alias.** There is nothing to point them at — those subdomains do not exist on `filone.ai` — so on a network that blocks the `.one` TLD, clicking "docs" from an alias page fails. Known and accepted; fixing it means provisioning the subdomains on the docs Vercel project and Instatus.
