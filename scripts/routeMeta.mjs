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

export const ROUTE_META = {
  "/blog": {
    title: "Blog · Fil One",
    description:
      "Ideas and practical guidance on object storage, AI infrastructure, and the cost of moving data at scale.",
  },
  "/": {
    title: "Fil One · S3 object storage built for the AI era",
    description:
      `S3-compatible object storage that lives where your data works. ${PRICE_PER_TB_MONTH}, no egress penalties, sovereign by design.`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Fil One",
        url: "https://www.fil.one",
        logo: "https://www.fil.one/fil-one-logo.svg",
        description:
          "S3-compatible object storage built on Filecoin. Sovereign by design, with no egress penalties and no per-request charges.",
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Fil One Object Storage",
        description:
          "S3-compatible object storage on Filecoin with no egress penalties, no per-request charges, and object lock with versioning.",
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
  "/lp/migrate-from-s3": {
    title: "Migrate from AWS S3 · Fil One",
    description:
      `Leave AWS S3 by changing one endpoint. Same S3 API, ${PRICE_PER_TB_SHORT} flat vs AWS $23/TB, and $0 egress vs AWS $90/TB. No code rewrites.`,
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
  "/lp/price": {
    title: `${PRICE_PER_TB_MONTH}, switch and save · Fil One`,
    description:
      `Compare flat-rate S3-compatible storage side by side. Fil One is ${PRICE_PER_TB_SHORT} with $0 egress and no per-request fees. Wasabi is $7.99/TB and Backblaze B2 $6.95/TB.`,
  },
  "/lp/madrid": {
    title: "Tapas evening in Madrid, 12 November · Fil One",
    description:
      "Join the Fil One and Bonum teams for tapas and drinks at Restaurante Bancal, Madrid, on 12 November from 17:30. Free to attend, limited capacity.",
  },
  "/lp/es/madrid": {
    lang: "es",
    title: "Tarde de tapas en Madrid, 12 de noviembre · Fil One",
    description:
      "Tapas y copas con los equipos de Fil One y Bonum en el Restaurante Bancal (Madrid), el 12 de noviembre, desde las 17:30. Evento gratuito, aforo limitado.",
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
      "Sell, build on or run Fil One storage. One partner program with four roles: channel, technology, managed service and data center.",
  },
  "/host": {
    title: "Host a zone · Fil One",
    description:
      "Extend your cloud and sell the storage. Fil One installs and runs S3 object storage in your data center, and you resell it under your own brand.",
  },
  "/host/apply": {
    title: "Talk to an engineer · Fil One",
    description:
      "Tell us about your GPU cloud and talk to our team about adding Fil One object storage in your own data center.",
  },
  "/partners/apply": {
    title: "Partner application · Fil One",
    description:
      "Apply to the Fil One partner program. Resell, integrate, or bundle S3-compatible cloud storage with your business.",
  },
  "/workloads": {
    title: "Bring a workload · Fil One",
    description:
      `Move finished checkpoints, data lakes, backups, footage and logs to Fil One at ${PRICE_PER_TB_MONTH}, and pull them back at multi-Gbps with no egress penalties.`,
  },
  "/about": {
    title: "About · Fil One",
    description:
      "Fil One exists to put you back in control of your data. Learn who we are, why we built S3-compatible storage on Filecoin, and the principles behind it.",
  },
};
