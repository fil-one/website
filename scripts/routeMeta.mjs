/**
 * Per-route SEO metadata + canonical base URL.
 *
 * Pure data with NO side effects, so it can be imported by both
 * scripts/prerender.mjs (build) and the route-parity test (CI) without
 * pulling in the prerender script's JSDOM/global setup.
 *
 * This is the single source for every route's title and description: the
 * prerender bakes them into static HTML and src/hooks/useSeo.ts reads the same
 * entry at runtime, so pages don't repeat these strings.
 *
 * Every route in src/routes.tsx (routeDefs) MUST have an entry here. The
 * route-parity test (src/test/route-seo-parity.test.ts) asserts this.
 *
 * Conventions: sentence case, "Page · Fil One" (home leads with the brand),
 * titles <= 60 chars, descriptions <= 160 chars, no em dashes. Any figure
 * derived from Fil One's price is computed from pricing.constants.mjs.
 */
import {
  PRICE_PER_TB,
  PRICE_PER_TB_SHORT,
  PRICE_PER_TB_MONTH,
  PRICE_AMOUNT,
} from "../src/lib/pricing.constants.mjs";

export const BASE_URL = "https://www.fil.one";

/**
 * /lp/* campaign pages are reachable but kept out of search: they ship
 * <meta name="robots" content="noindex, follow"> (prerender and runtime) and
 * are left out of the sitemap. Their canonicals still point at themselves, and
 * robots.txt must not block them or crawlers never see the noindex.
 */
export const isNoindexRoute = (path) => path === "/lp" || path.startsWith("/lp/");

export const NOINDEX_ROBOTS = "noindex, follow";

/** The routes the generated sitemap lists: every route except noindex ones. */
export const sitemapPaths = (routes) => routes.filter((r) => !isNoindexRoute(r));

// AWS EFS general purpose: $0.30/GB × 1,024 GB = $307.20/TB-month, matching
// the /lp/ml-training comparison table.
const EFS_PER_TB = 307.2;
const EFS_MULTIPLE = Math.floor(EFS_PER_TB / PRICE_PER_TB);

export const ROUTE_META = {
  "/blog": {
    title: "Blog · Fil One",
    description:
      "Ideas and practical guidance on object storage, AI infrastructure, and the cost of moving data at scale.",
  },
  "/": {
    title: "Fil One · S3 object storage built for the AI era",
    description:
      `S3-compatible object storage on Filecoin. ${PRICE_PER_TB_MONTH}, no egress fees, designed for 11 nines of durability.`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Fil One",
        url: "https://www.fil.one",
        logo: "https://www.fil.one/fil-one-logo.svg",
        description:
          "S3-compatible object storage built on Filecoin. Designed for 11 nines of durability, with no egress fees and no per-request charges.",
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Fil One Object Storage",
        description:
          "S3-compatible object storage on Filecoin with no egress fees, no per-request charges, and object lock with versioning.",
        brand: { "@type": "Brand", name: "Fil One" },
        offers: {
          "@type": "Offer",
          price: PRICE_AMOUNT,
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: PRICE_AMOUNT,
            priceCurrency: "USD",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: "1",
              unitText: "TB/month",
            },
          },
        },
      },
    ],
  },
  "/lp/agents": {
    title: "Storage for AI agents · Fil One",
    description:
      `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. No egress fees, no per-request charges. Built for agent workloads that read and write constantly.`,
  },
  "/lp/egress": {
    title: "Zero egress object storage · Fil One",
    description:
      `Fil One charges $0 for data transfer out and no API fees. Store data at ${PRICE_PER_TB_SHORT} flat instead of paying AWS S3 $90/TB to read it back.`,
  },
  "/lp/rag-storage": {
    title: "Object storage for RAG pipelines · Fil One",
    description:
      `Store RAG corpora, embeddings, and vector indexes at ${PRICE_PER_TB_SHORT}. S3-compatible, with no egress fees on retrieval. Built for LLM pipelines.`,
  },
  "/lp/ml-checkpoints": {
    title: "ML checkpoint storage · Fil One",
    description:
      `Store ML checkpoints and model artifacts at ${PRICE_PER_TB_SHORT} with no egress fees. S3-compatible, for training runs on any cloud.`,
  },
  "/lp/startups": {
    title: "Object storage for startups · Fil One",
    description:
      `Predictable cloud storage for startups. ${PRICE_PER_TB_SHORT}, zero egress fees, S3-compatible. No surprise bills, just storage that scales with you.`,
  },
  "/lp/backup-dr": {
    title: "Backup and disaster recovery storage · Fil One",
    description:
      `Backup storage at ${PRICE_PER_TB_SHORT}, designed for 11 nines of durability, with zero egress for restores. S3-compatible for DR workflows.`,
  },
  "/lp/log-retention": {
    title: "Log retention storage · Fil One",
    description:
      `Store logs long-term at ${PRICE_PER_TB_SHORT} with no egress fees. S3-compatible, and far cheaper than CloudWatch or Datadog for long-term retention.`,
  },
  "/lp/web-scraping": {
    title: "Storage for web scraping and data collection · Fil One",
    description:
      `Store scraped datasets, crawl archives, and raw HTML at ${PRICE_PER_TB_SHORT}. No egress fees when feeding data into pipelines. S3-compatible.`,
  },
  "/lp/multi-cloud": {
    title: "Multi-cloud object storage · Fil One",
    description:
      `Add a cost-effective storage tier to your multi-cloud stack. ${PRICE_PER_TB_SHORT}, no egress, S3-compatible, and works alongside your existing clouds.`,
  },
  "/lp/data-sovereignty": {
    title: "EU data residency storage · Fil One",
    description:
      `S3-compatible object storage with an EU region endpoint. No egress fees, no vendor lock-in, at ${PRICE_PER_TB_SHORT} flat.`,
  },
  "/lp/migrate-from-s3": {
    title: "Migrate from AWS S3 · Fil One",
    description:
      `Leave AWS S3 by changing one endpoint. Same S3 API, ${PRICE_PER_TB_SHORT} flat vs AWS $23/TB, and $0 egress vs AWS $90/TB. No code rewrites.`,
  },
  "/lp/compliance": {
    title: "Compliance-ready object storage · Fil One",
    description:
      `S3-compatible storage with Object Lock retention, full version history, and encryption at rest and in transit, at ${PRICE_PER_TB_SHORT} flat.`,
  },
  "/lp/archival": {
    title: "Archival object storage · Fil One",
    description:
      `Archive cold data at ${PRICE_PER_TB_SHORT} flat. No egress fees or retrieval delay when you need to restore. S3-compatible.`,
  },
  "/lp/versioning": {
    title: "Object storage with versioning · Fil One",
    description:
      `S3-compatible versioning on Filecoin infrastructure. Keep every version of every object and download any of them at ${PRICE_PER_TB_SHORT} with no egress fees.`,
  },
  "/lp/regional-cloud": {
    title: "Regional cloud storage alternative · Fil One",
    description:
      `A cost-effective alternative to building your own regional cloud storage. ${PRICE_PER_TB_SHORT}, no egress, S3-compatible.`,
  },
  "/lp/media": {
    title: "Media and asset storage · Fil One",
    description:
      `Store and serve media assets, video, and images at ${PRICE_PER_TB_SHORT} with zero egress fees. S3-compatible, high-durability storage for media workflows.`,
  },
  "/lp/gaming": {
    title: "Game asset and save-data storage · Fil One",
    description:
      `S3-compatible storage for game assets, saves, and telemetry at ${PRICE_PER_TB_SHORT}. Zero egress fees, built for game backends.`,
  },
  "/lp/genomics": {
    title: "Genomics and life sciences data storage · Fil One",
    description:
      `Store genomics datasets, sequencing data, and research archives at ${PRICE_PER_TB_SHORT} with zero egress fees on re-analysis, at any scale.`,
  },
  "/lp/web3-fintech": {
    title: "Web3 and fintech data storage · Fil One",
    description:
      `S3-compatible storage for Web3 and fintech workloads, built on Filecoin infrastructure. ${PRICE_PER_TB_SHORT} flat, no egress, no lock-in.`,
  },
  "/lp/web3-pivot": {
    title: "S3-compatible storage for Web3 projects · Fil One",
    description:
      `Point your Web3 product's storage at Filecoin infrastructure without rebuilding your stack. S3-compatible, no egress fees, no lock-in, ${PRICE_PER_TB_SHORT} flat.`,
  },
  "/lp/web3-native": {
    title: "Native Web3 object storage · Fil One",
    description:
      `Purpose-built for Web3-native apps. S3-compatible object storage built on Filecoin infrastructure at ${PRICE_PER_TB_SHORT}, no egress, no lock-in.`,
  },
  "/lp/barcelona": {
    title: "European object storage for Barcelona · Fil One",
    description:
      `S3-compatible object storage for teams in Barcelona. EU data sovereignty, zero egress fees, at ${PRICE_PER_TB_SHORT}. Drop into your existing stack in minutes.`,
  },
  "/lp/es/barcelona": {
    lang: "es",
    title: "Almacenamiento europeo para Barcelona · Fil One",
    description:
      `Almacenamiento de objetos compatible con S3 para equipos en Barcelona. Datos en la UE, sin comisiones de egress, a ${PRICE_PER_TB_SHORT}. Listo en minutos.`,
  },
  "/contact-sales": {
    title: "Talk to sales · Fil One",
    description:
      "Talk to the Fil One team about enterprise storage, pricing, and migration from AWS S3. We'll help you cut storage costs without changing your stack.",
  },
  "/support": {
    title: "Support · Fil One",
    description: "Get help with Fil One object storage. Contact our support team for technical questions, account issues, and migration assistance.",
  },
  "/terms": {
    title: "Terms of Use · Fil One",
    description: "Read the Fil One Terms of Use governing access to and use of the Fil One S3-compatible object storage service.",
  },
  "/privacy": {
    title: "Privacy Policy · Fil One",
    description: "Read the Fil One Privacy Policy to understand how we collect, use, and protect your data.",
  },
  "/aup": {
    title: "Acceptable Use Policy · Fil One",
    description: "Read the Fil One Acceptable Use Policy for permitted and prohibited uses of our S3-compatible object storage service.",
  },
  "/sla": {
    title: "Service Level Agreement · Fil One",
    description: "Read the Fil One Object Storage Service Level Agreement: uptime commitment, service credit tiers, and how to request credits.",
  },
  "/lp/es/contacto": {
    lang: "es",
    title: "Contactar con ventas · Fil One",
    description: "Ponte en contacto con el equipo de Fil One para hablar de precios, migración y planes empresariales.",
  },
  "/lp/es/soporte": {
    lang: "es",
    title: "Soporte · Fil One",
    description: "Soporte técnico para el almacenamiento de objetos de Fil One. Contáctanos para ayuda con configuración, migración y cuentas.",
  },
  // ── Newest /lp pages ──────────────────────────────────────────────────────
  "/lp/cost-ticker": {
    title: "Watch the meter you're not paying · Fil One",
    description:
      `Hyperscalers meter every read, request, and byte out. Fil One is flat ${PRICE_PER_TB_SHORT} with no egress and no per-request fees. See the side-by-side.`,
  },
  "/lp/exit-first": {
    title: "Read the exit plan before you start · Fil One",
    description:
      `S3-compatible storage with $0 egress, ${PRICE_PER_TB_SHORT} flat. The exit is a documented one-line sync command, not a renegotiation. Verify it before you commit.`,
  },
  "/lp/agent-loops": {
    title: "Let agents run, not your bill · Fil One",
    description:
      `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat. No per-PUT fees, no per-GET fees, no egress. Agent loops run at full speed without a per-call counter.`,
  },
  "/lp/agent-readable": {
    title: "Priced so plainly your agent can read it · Fil One",
    description:
      `Flat ${PRICE_PER_TB_SHORT} pricing in machine-readable llms.txt, with full S3 parity. No gated quotes: an AI coding agent can evaluate Fil One in one pass.`,
  },
  "/lp/grant-funded": {
    title: "Storage that outlives the grant cycle · Fil One",
    description:
      `Flat ${PRICE_PER_TB_SHORT} research data storage with no exit fees. Predictable for multi-year grants, S3-compatible.`,
  },
  "/lp/collections-access": {
    title: "Open the collection, skip the egress bill · Fil One",
    description:
      `Serve digital collections and IIIF imagery with $0 egress. Flat ${PRICE_PER_TB_SHORT} storage, S3-compatible for IIIF image servers.`,
  },
  "/lp/digital-preservation": {
    title: "Preservation you can afford to check · Fil One",
    description:
      `Flat ${PRICE_PER_TB_SHORT} digital preservation storage. No retrieval fees and no egress, so run fixity checks as often as your program requires. S3-compatible.`,
  },
  "/lp/affordable": {
    title: "Make storage your lowest line item · Fil One",
    description:
      `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. No egress fees, no per-request charges, no confusing billing. One number. Start in minutes.`,
  },
  "/lp/go-global": {
    title: "Go global without the multi-year build · Fil One",
    description:
      `Embed S3-compatible object storage in your product. US and EU regions, SLA-backed, ${PRICE_PER_TB_SHORT} flat, no capex. Talk to sales about embedding terms.`,
  },
  "/lp/metro": {
    title: "Hyperscaler speed, budget-tier bills · Fil One",
    description:
      `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. Always-hot storage with no egress fees: fast reads without the hyperscaler price tag.`,
  },
  "/lp/data-control": {
    title: "Your data, under your control · Fil One",
    description:
      `S3-compatible storage with an EU region endpoint, $0 exit egress, and no vendor lock-in. Flat ${PRICE_PER_TB_SHORT}.`,
  },
  "/lp/ml-training": {
    title: "Build around the clock · Fil One",
    description:
      `Training-data storage at ${PRICE_PER_TB_SHORT} flat, ${EFS_MULTIPLE}x cheaper than AWS EFS. No egress on dataset reads. fsspec, PyArrow, and HuggingFace datasets work natively.`,
  },
  "/lp/agent-knowledge-layer": {
    title: "Object storage as an agent knowledge layer · Fil One",
    description:
      `S3-compatible storage for AI agents: agent memory, RAG corpora, model artifacts, and inference I/O. ${PRICE_PER_TB_SHORT} flat, no per-request fees.`,
  },
  "/lp/price": {
    title: `${PRICE_PER_TB_MONTH}, switch and save · Fil One`,
    description:
      `Compare flat-rate S3-compatible storage side by side. Fil One is ${PRICE_PER_TB_SHORT} with $0 egress and no per-request fees. Wasabi is $7.99/TB and Backblaze B2 $6.95/TB.`,
  },

  // ── Product / solutions / marketing pages ─────────────────────────────────
  "/pricing": {
    title: "Pricing · Fil One",
    description:
      `S3-compatible object storage at ${PRICE_PER_TB_MONTH} with no egress or per-request fees. Compare costs with AWS S3, Wasabi, Backblaze B2, and Cloudflare R2.`,
  },
  "/partners": {
    title: "Partners · Fil One",
    description:
      "Channel, technology, and MSP partner programs for Fil One. Resell, integrate, or bundle S3-compatible cloud storage with your business.",
  },
  "/neocloud": {
    title: "Storage for GPU clouds · Fil One",
    description:
      "Add object storage to your GPU cloud. Fil One installs and runs S3-compatible storage in your data center, and you sell it under your own brand.",
  },
  "/neocloud/apply": {
    title: "Talk to our neocloud team · Fil One",
    description:
      "Tell us about your GPU cloud and talk to our team about adding Fil One object storage in your own data center.",
  },
  "/partners/apply": {
    title: "Partner application · Fil One",
    description:
      "Apply to the Fil One partner program. Resell, integrate, or bundle S3-compatible cloud storage with your business.",
  },
  "/solutions": {
    title: "Solutions · Fil One",
    description:
      `Backups, AI training data, media archives, research data, and logs on one S3-compatible platform. ${PRICE_PER_TB_MONTH}, no egress fees.`,
  },
  "/about": {
    title: "About · Fil One",
    description:
      "Fil One exists to put you back in control of your data. Learn who we are, why we built S3-compatible storage on Filecoin, and the principles behind it.",
  },
};
