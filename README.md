# Fil One — Landing Page

Marketing landing page for [Fil One](https://fil.one), S3-compatible object storage built on Filecoin.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** (build & dev server)
- **Tailwind CSS**
- **shadcn/ui** (Radix primitives)
- **React Router** (client-side routing)
- **Framer Motion** (animations)
- **Vitest** (unit tests)

## Project structure

```
src/
├── assets/                # Images & SVGs (feature cards, logo, dashboard preview, CTA bg)
├── components/
│   ├── Navbar.tsx
│   ├── NavLink.tsx
│   ├── HeroSection.tsx         # Hero with walkthrough video player
│   ├── HeroLens.tsx            # WebGL interactive lens effect on logo
│   ├── IntroSection.tsx
│   ├── FeaturesSection.tsx     # Horizontal scrolling feature carousel
│   ├── ComparisonSection.tsx   # Competitor comparison table (responsive)
│   ├── PricingSection.tsx
│   ├── SavingsSection.tsx
│   ├── FaqSection.tsx
│   ├── CtaSection.tsx
│   ├── Footer.tsx
│   ├── JsonLd.tsx              # Structured data for SEO
│   ├── WaitlistInput.tsx       # HubSpot waitlist form
│   └── ui/                     # shadcn/ui primitives
├── pages/
│   ├── Index.tsx
│   ├── ContactSales.tsx        # HubSpot-connected contact form
│   ├── PrivacyPolicy.tsx
│   ├── TermsOfUse.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── useInView.ts            # Scroll-reveal intersection observer
│   ├── useSeo.ts               # Per-page meta tags & Open Graph
│   ├── use-mobile.tsx          # Mobile breakpoint detection
│   └── use-toast.ts            # Toast notifications
└── lib/
    ├── hubspot.ts              # HubSpot portal config & form helpers
    └── utils.ts                # Shared utilities (cn, etc.)
```

## Getting started

```sh
git clone https://github.com/FilecoinFoundationWeb/fil-one.git
cd fil-one

npm install
npm run dev
```

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests with Vitest |

## HubSpot integration

Two forms submit to HubSpot via the [Forms API v3](https://developers.hubspot.com/docs/api/marketing/forms):

- **Waitlist** — hero section
- **Contact Sales** — `/contact-sales`

Portal ID and form GUIDs are centralised in `src/lib/hubspot.ts`.

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

## Pages & routes

| Route | Description |
|---|---|
| `/` | Main landing page |
| `/contact-sales` | Contact sales form |
| `/blog` | HubSpot-powered blog index |
| `/blog/:slug` | Blog article (request-time meta) |
| `/blog/rss.xml` | RSS feed |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |

## Deployment

Deployed on **Vercel**. Pushing to `main` triggers a production deployment automatically. SPA routing is handled via `vercel.json`.

### Demo-alias domain

`fil.one` keeps landing on blocklists, and the `.one` TLD itself is flagged, which breaks live demos. The same deployment is therefore also served from **`filone.ai`** — an alias whose only value is an unflagged reputation. `fil.one` remains the canonical, public, indexed domain.

`filone.ai` and `www.filone.ai` are attached to this Vercel project alongside the `fil.one` hostnames. The console is served on `app.filone.ai` from the same CloudFront distribution — see `PROD_CONSOLE_ALIAS_HOSTS` in `fil-one/fil-one`, `packages/shared/src/constants.ts`. DNS for the whole zone lives in `environments/prod/filone-ai.tf` in `fil-one/infrastructure`.

**The alias must stay out of search results.** `vercel.json` sends `X-Robots-Tag: noindex, nofollow` for `(www.)?filone.ai` via a host-conditional `has` rule, placed first so it applies regardless of whether Vercel evaluates `headers` cumulatively or first-match. Canonicals need no special handling: `index.html` and `useSeo` already emit absolute `https://www.fil.one/…` URLs on every host, so the alias points search engines at the canonical domain by itself. **Do not** add a `Disallow` for the alias in `robots.txt` — that would stop crawlers fetching the page at all, so they would never see the `noindex` header, and the two mechanisms would cancel out. The `has.value` pattern is unanchored, so it also matches a host merely containing the alias; that only ever over-applies `noindex`, which is the safe direction.

Keep the alias unadvertised: no public links, no marketing references, and do not add it to Search Console.

Two things about `filone.ai` worth knowing before you change anything here:

- It is also the domain every production Auth0 email is sent from, and a HubSpot campaign sender. Reputation damage earned by pages served here lands on the domain that delivers password resets, so treat a phishing report against the alias as a mail-deliverability incident too.
- **`docs.fil.one` and `status.fil.one` links still leave the alias.** There is nothing to point them at — those subdomains do not exist on `filone.ai` — so on a network that blocks the `.one` TLD, clicking "docs" from an alias page fails. Known and accepted; fixing it means provisioning the subdomains on the docs Vercel project and Instatus.
