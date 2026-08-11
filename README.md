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

Only posts that are `PUBLISHED` **and** in the configured blog group are served; drafts and other blogs' posts return 404.

Article slugs can't be prerendered (posts are published from HubSpot without a deploy), which is why `/blog/:slug` is marked `prerender: false` in `src/routes.tsx` and gets its meta from the request-time function instead.

Copy `.env.example` to `.env` and set `HUBSPOT_PRIVATE_APP_ACCESS_TOKEN` to a HubSpot service key or private app token with the `content` scope. `HUBSPOT_BLOG_CONTENT_GROUP_ID` is optional — it defaults to Fil One's production blog group and only needs setting to point a preview deployment at a different portal.

## Pages & routes

| Route | Description |
|---|---|
| `/` | Main landing page |
| `/contact-sales` | Contact sales form |
| `/blog` | HubSpot-powered blog index |
| `/blog/:slug` | Blog article |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |

## Deployment

Deployed on **Vercel**. Pushing to `main` triggers a production deployment automatically. SPA routing is handled via `vercel.json`.
