/**
 * Vite SSR prerender script.
 *
 * Replaces react-snap for production prerendering.  Unlike react-snap it uses
 * React's own renderToString instead of Puppeteer, so it works on Vercel (no
 * Chrome system libraries required).
 *
 * Steps:
 *  1. Initialise a jsdom DOM environment (so third-party UI libs that call
 *     browser APIs at import time don't throw when the SSR bundle loads).
 *  2. Build src/entry-server.tsx as an SSR bundle (Vite --ssr).
 *  3. For each route, call render(url) and inject the resulting HTML into the
 *     client-built dist/index.html template.
 *  4. Write each result to dist/<route>/index.html.
 *  5. Clean up the temporary SSR bundle.
 */

import { JSDOM } from "jsdom";
import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "fs";
import { resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";

// ── DOM environment ──────────────────────────────────────────────────────────
// Must happen before any dynamic import of the SSR bundle, because third-party
// packages (e.g. sonner) call document.createTextNode / similar at module
// initialisation time.
const jsdom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>", {
  url: "http://localhost/",
});
const { window } = jsdom;

// Hoist every property that components might look up on globalThis
const COPY_KEYS = [
  "document",
  "navigator",
  "location",
  "history",
  "HTMLElement",
  "Element",
  "Node",
  "Text",
  "Comment",
  "DocumentFragment",
  "Event",
  "CustomEvent",
  "MouseEvent",
  "KeyboardEvent",
  "InputEvent",
  "FocusEvent",
  "PointerEvent",
  "TouchEvent",
  "MutationObserver",
  "CSSStyleDeclaration",
  "getComputedStyle",
  "screen",
  "innerWidth",
  "innerHeight",
  "devicePixelRatio",
];

for (const key of COPY_KEYS) {
  if (key in window && !(key in globalThis)) {
    try {
      // Some properties are non-configurable on the window object
      globalThis[key] = window[key];
    } catch {
      // ignore
    }
  }
}

// window itself (components that check `typeof window !== 'undefined'`)
globalThis.window = window;

// Items jsdom doesn't provide
globalThis.requestAnimationFrame = (fn) => setTimeout(fn, 0);
globalThis.cancelAnimationFrame = clearTimeout;
globalThis.matchMedia ??= () => ({
  matches: false,
  media: "",
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.IntersectionObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
// ────────────────────────────────────────────────────────────────────────────

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");

const BASE_URL = "https://fil.one";

/**
 * Per-route metadata injected at prerender time so every page has a unique
 * title, description, and self-referential canonical tag visible to AI crawlers
 * (which do not execute JavaScript).
 *
 * Routes without an entry fall back to the homepage defaults baked into
 * index.html — add an entry here whenever a new route is added to App.tsx.
 */
const ROUTE_META = {
  "/": {
    title: "Fil One | S3 object storage built for the AI era",
    description:
      "S3-compatible object storage on Filecoin. $4.99/TB/month, no egress fees, 11 nines durability, and verifiable CID integrity proofs.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Fil One",
        url: "https://fil.one",
        logo: "https://fil.one/fil-one-logo.svg",
        description:
          "S3-compatible object storage built on Filecoin. Enterprise-grade durability, no egress fees, and verifiable data integrity.",
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Fil One Object Storage",
        description:
          "S3-compatible object storage on Filecoin with no egress fees and verifiable data integrity via CID proofs.",
        brand: { "@type": "Brand", name: "Fil One" },
        offers: {
          "@type": "Offer",
          price: "4.99",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "4.99",
            priceCurrency: "USD",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: "1",
              unitText: "TB/month",
            },
          },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does Fil One charge egress fees?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Fil One charges $0 for egress and $0 for API requests. You only pay $4.99/TB/month for storage.",
            },
          },
          {
            "@type": "Question",
            name: "Is Fil One S3-compatible?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Fil One is fully S3-compatible — any tool that works with AWS S3 (boto3, the AWS CLI, S3-compatible SDKs) works with Fil One without code changes.",
            },
          },
          {
            "@type": "Question",
            name: "How does Fil One verify data integrity?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Every object stored on Fil One receives a CID (Content Identifier). Cryptographic integrity proofs run approximately every 24 hours, giving you verifiable proof that your data is intact and stored correctly on the Filecoin network.",
            },
          },
          {
            "@type": "Question",
            name: "What durability does Fil One offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Fil One provides 11 nines (99.999999999%) of durability through Filecoin's distributed storage network.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use Fil One for AI workloads like RAG and agent memory?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Fil One is designed for AI workloads including RAG corpora, agent memory, model artifacts, and datasets. It exposes an S3-compatible API and an llms.txt endpoint for direct LLM ingestion.",
            },
          },
        ],
      },
    ],
  },
  "/lp/agents": {
    title: "Fil One for AI Agents — S3 Storage for RAG, Agent Memory & Datasets",
    description:
      "Give your AI agents durable, verifiable storage. S3-compatible, $4.99/TB, no egress fees, CID integrity proofs every ~24h. Drop-in replacement for AWS S3.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why is Fil One good for AI agents?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AI agents read and write storage in tight loops — fetching context, writing results, reading back artifacts. On AWS S3, each read triggers an egress charge and each operation a request fee, so agent loops compound costs fast. Fil One charges a flat $4.99/TB/month with $0 egress and $0 per request, so agents can run thousands of iterations without the bill growing.",
            },
          },
          {
            "@type": "Question",
            name: "Can I store persistent agent memory on Fil One?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Agents can store session state, conversation history, tool outputs, and checkpoints as S3 objects and read them back at zero marginal cost. The flat pricing means keeping all agent history is cheaper than selectively pruning it on a per-request storage provider.",
            },
          },
          {
            "@type": "Question",
            name: "Does Fil One work with existing agent frameworks?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Any framework that supports an S3-compatible backend works with Fil One — including LangChain, LlamaIndex, and custom agents using boto3 or the AWS SDK. Change the endpoint URL; everything else stays the same.",
            },
          },
          {
            "@type": "Question",
            name: "How much does it cost to run an AI agent that makes 500,000 S3 requests per month?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "On AWS S3, 100 GB storage + 500K PUT/GET requests + 100 GB egress costs roughly $14/month. On Fil One, the same workload costs $0.50 — just 100 GB of storage at $4.99/TB, with requests and egress included at no charge.",
            },
          },
        ],
      },
    ],
  },
  "/lp/egress": {
    title: "Zero Egress Fee Object Storage — Fil One vs AWS S3, Backblaze, Wasabi",
    description:
      "Stop paying egress fees. Fil One charges $0 for data transfer out — save thousands vs AWS S3 ($90+/TB) and Wasabi ($0.007/GB) with no API fees either.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does Fil One really charge $0 for egress?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Fil One charges $0 per GB for data transfer out, $0 for API requests, and a flat $4.99/TB/month for storage. There are no bandwidth tiers, no free-tier egress allowances that expire, and no per-request fees.",
            },
          },
          {
            "@type": "Question",
            name: "How much can I save switching from AWS S3 to Fil One?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A team with 10 TB stored and 10 TB of reads per month pays roughly $1,151/month on AWS S3 (storage + egress + requests). The same workload on Fil One costs $50/month — a saving of over $1,100/month, or $13,200/year.",
            },
          },
          {
            "@type": "Question",
            name: "How does Fil One compare to Cloudflare R2 for egress fees?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both Fil One and Cloudflare R2 charge $0 for egress. Fil One's storage rate is $4.99/TB/month versus R2's $15/TB/month — making Fil One roughly 3× cheaper on storage while matching R2 on egress.",
            },
          },
          {
            "@type": "Question",
            name: "Why do hyperscalers charge so much for egress?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hyperscaler pricing was designed to monetise data retrieval — once your data is in, leaving (or reading it frequently) is expensive. Egress fees on AWS average $0.09/GB, meaning 10 TB read once costs $921 in transfer alone. Fil One is built on Filecoin's decentralised network with a different cost structure, allowing $0 egress at a flat storage rate.",
            },
          },
        ],
      },
    ],
  },
  "/lp/rag-storage": {
    title: "Object Storage for RAG Pipelines — Fil One",
    description:
      "Store and retrieve RAG corpora, embeddings, and vector indexes at $4.99/TB. S3-compatible, no egress fees, verifiable integrity — built for LLM pipelines.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does it cost to store a RAG corpus on Fil One?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Just storage: your corpus size in TB × $4.99/month. A 1 TB corpus costs $4.99/month. There are no egress fees on document retrievals and no per-request charges, so retrieval-heavy workloads cost the same as idle ones.",
            },
          },
          {
            "@type": "Question",
            name: "How much can I save vs. AWS S3 for a RAG pipeline?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A 1 TB corpus read 5× per month costs $484/month on AWS S3 ($23.55 storage + $460 egress). On Fil One the same workload costs $4.99/month — a 97% reduction — because retrieval reads are included at no charge.",
            },
          },
          {
            "@type": "Question",
            name: "Is Fil One compatible with LangChain and LlamaIndex for RAG?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Any framework with an S3-compatible document loader works with Fil One, including LangChain and LlamaIndex. Point the S3 loader at your Fil One endpoint; no other changes are needed.",
            },
          },
          {
            "@type": "Question",
            name: "Does storing more documents increase my per-query cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Fil One's flat $4.99/TB/month rate means a larger corpus costs more in storage but adds nothing to retrieval cost. You can store your full document set without rationing based on retrieval economics.",
            },
          },
        ],
      },
    ],
  },
  "/lp/ml-checkpoints": {
    title: "ML Checkpoint Storage — Save Model Weights Cheaply | Fil One",
    description:
      "Store ML checkpoints and model artifacts at $4.99/TB with no egress fees. S3-compatible, durable, and verifiable — ideal for training runs on any cloud.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does it cost to store ML checkpoints on Fil One?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Flat $4.99/TB/month with no egress fees. 10 TB of checkpoints costs $49.90/month; 100 TB costs $499/month. Evaluation runs that load checkpoints are included — reads cost nothing extra.",
            },
          },
          {
            "@type": "Question",
            name: "Do I pay every time I load a checkpoint for evaluation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Fil One charges $0 for egress and $0 per request. You can load any checkpoint as many times as needed — running 50 evaluation passes on the same artifact costs the same as running it once.",
            },
          },
          {
            "@type": "Question",
            name: "How does Fil One compare to AWS S3 for ML checkpoint storage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A team with 10 TB of checkpoints loading 5 TB for evals each month pays roughly $680/month on AWS S3 ($230 storage + $450 egress). On Fil One the same workload costs $49.90/month — the egress line disappears entirely.",
            },
          },
          {
            "@type": "Question",
            name: "Does Fil One work with PyTorch and HuggingFace checkpointing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. PyTorch Lightning, HuggingFace Hub, and any tool that supports S3 checkpointing work with Fil One. Change the endpoint URL in your existing code; the rest of your workflow is unchanged.",
            },
          },
        ],
      },
    ],
  },
  "/lp/startups": {
    title: "Object Storage for Startups — $4.99/TB, No Egress | Fil One",
    description:
      "Predictable, affordable cloud storage for startups. $4.99/TB, zero egress fees, S3-compatible. No surprise bills — just storage that scales with you.",
  },
  "/lp/backup-dr": {
    title: "Backup & Disaster Recovery Storage — Fil One",
    description:
      "Durable, verifiable backup storage at $4.99/TB. 11 nines durability, CID integrity proofs, zero egress for restores. S3-compatible drop-in for DR workflows.",
  },
  "/lp/log-retention": {
    title: "Cheap Log Retention Storage — $4.99/TB | Fil One",
    description:
      "Store logs long-term at $4.99/TB with no egress fees. S3-compatible, verifiable, and far cheaper than CloudWatch or Datadog for long-term retention.",
  },
  "/lp/web-scraping": {
    title: "Storage for Web Scraping & Data Collection — Fil One",
    description:
      "Store scraped datasets, crawl archives, and raw HTML at $4.99/TB. No egress fees when feeding data into pipelines. S3-compatible and verifiable.",
  },
  "/lp/multi-cloud": {
    title: "Multi-Cloud Object Storage — S3-Compatible | Fil One",
    description:
      "Add a cost-effective, verifiable storage tier to your multi-cloud stack. $4.99/TB, no egress, S3-compatible — works alongside AWS, GCP, and Azure.",
  },
  "/lp/data-sovereignty": {
    title: "Data Sovereignty Storage — Verifiable, Decentralized | Fil One",
    description:
      "Own your data with cryptographic proof. Fil One's Filecoin-backed storage gives you verifiable custody, no vendor lock-in, and S3-compatible access at $4.99/TB.",
  },
  "/lp/migrate-from-s3": {
    title: "Migrate from AWS S3 to Fil One — Drop-In S3 Replacement",
    description:
      "Switch from AWS S3 to Fil One in minutes. Fully S3-compatible API, $4.99/TB vs AWS $23+/TB, and $0 egress vs AWS $90+/TB. No code changes required.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Do I need to rewrite my code to migrate from AWS S3 to Fil One?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Fil One is a drop-in S3 replacement. The only change is the endpoint URL — your existing boto3, AWS SDK v3, or other S3 client code continues to work without modification. All standard S3 operations are supported: PutObject, GetObject, ListObjectsV2, multipart upload, presigned URLs, and more.",
            },
          },
          {
            "@type": "Question",
            name: "How much cheaper is Fil One than AWS S3?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A workload with 10 TB stored and 10 TB read per month costs roughly $1,158/month on AWS S3 (storage + egress + request fees). The same workload on Fil One costs $50/month — about 96% less — because Fil One charges a flat $4.99/TB/month with $0 egress and $0 per request.",
            },
          },
          {
            "@type": "Question",
            name: "How do I actually move my data from S3 to Fil One?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use the same tools you already have: boto3's copy_object, the AWS CLI with --endpoint-url, or rclone. Point the source at your S3 bucket and the destination at your Fil One bucket. There are no proprietary migration tools to learn.",
            },
          },
          {
            "@type": "Question",
            name: "Is there any egress cost when reading data back from Fil One after migrating?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Fil One charges $0 for egress on all reads, indefinitely. Unlike AWS S3's $0.09/GB transfer-out fee, there is no per-GB charge for downloading or reading your data once it is stored on Fil One.",
            },
          },
        ],
      },
    ],
  },
  "/lp/compliance": {
    title: "Compliant Object Storage with Verifiable Integrity — Fil One",
    description:
      "Meet compliance requirements with cryptographically verifiable storage. CID proofs every ~24h, 11 nines durability, S3-compatible at $4.99/TB.",
  },
  "/lp/archival": {
    title: "Archival Object Storage — Cheap, Durable & Verifiable | Fil One",
    description:
      "Archive cold data at $4.99/TB with 11 nines durability and verifiable CID proofs. No egress fees when you need to restore. S3-compatible.",
  },
  "/lp/versioning": {
    title: "Object Storage with Versioning — Fil One",
    description:
      "S3-compatible versioning on Filecoin. Keep every version of every object at $4.99/TB with no egress fees and cryptographic integrity guarantees.",
  },
  "/lp/regional-cloud": {
    title: "Regional Cloud Storage Alternative — Fil One",
    description:
      "A globally distributed, cost-effective alternative to regional cloud storage. $4.99/TB, no egress, S3-compatible, and verifiably durable.",
  },
  "/lp/media": {
    title: "Media & Asset Storage — S3-Compatible, No Egress | Fil One",
    description:
      "Store and serve media assets, video, and images at $4.99/TB with zero egress fees. S3-compatible, high-durability storage for media workflows.",
  },
  "/lp/gaming": {
    title: "Game Asset & Save-Data Storage — Fil One",
    description:
      "Durable, verifiable storage for game assets, saves, and telemetry at $4.99/TB. Zero egress fees and S3-compatible — built for game backends.",
  },
  "/lp/genomics": {
    title: "Genomics & Life Sciences Data Storage — Fil One",
    description:
      "Store genomics datasets, sequencing data, and research archives at $4.99/TB with 11 nines durability, verifiable CID proofs, and zero egress fees.",
  },
  "/lp/web3-fintech": {
    title: "Web3 & Fintech Data Storage — Verifiable, S3-Compatible | Fil One",
    description:
      "Verifiable, decentralized storage for Web3 and fintech workloads. Cryptographic CID proofs, $4.99/TB, no egress — built on Filecoin.",
  },
  "/lp/web3-pivot": {
    title: "Decentralized Storage for Web3 Projects — Fil One",
    description:
      "Transition to decentralized storage without rebuilding your stack. Fil One is S3-compatible, Filecoin-backed, and $4.99/TB with no egress fees.",
  },
  "/lp/web3-native": {
    title: "Native Web3 Object Storage — Filecoin-Backed | Fil One",
    description:
      "Purpose-built for Web3-native apps. S3-compatible, CID-addressed, cryptographically verifiable storage on Filecoin at $4.99/TB.",
  },
  "/lp/barcelona": {
    title: "Fil One at MWC Barcelona — S3 Object Storage on Filecoin",
    description:
      "Meet Fil One at MWC Barcelona. Discover how decentralized, verifiable S3-compatible storage cuts costs and eliminates egress fees for enterprise teams.",
  },
  "/lp/es/barcelona": {
    title: "Fil One en MWC Barcelona — Almacenamiento S3 en Filecoin",
    description:
      "Conozca Fil One en MWC Barcelona. Almacenamiento S3 compatible, descentralizado y verificable en Filecoin. Desde $4.99/TB, sin tarifas de egress.",
  },
  "/contact-sales": {
    title: "Contact Sales — Fil One",
    description:
      "Talk to the Fil One team about enterprise storage, pricing, and migration from AWS S3. We'll help you cut storage costs without changing your stack.",
  },
  "/support": {
    title: "Support — Fil One",
    description: "Get help with Fil One object storage. Contact our support team for technical questions, account issues, and migration assistance.",
  },
  "/terms": {
    title: "Terms of Use — Fil One",
    description: "Read the Fil One Terms of Use governing access to and use of the Fil One S3-compatible object storage service.",
  },
  "/privacy": {
    title: "Privacy Policy — Fil One",
    description: "Read the Fil One Privacy Policy to understand how we collect, use, and protect your data.",
  },
  "/aup": {
    title: "Acceptable Use Policy — Fil One",
    description: "Read the Fil One Acceptable Use Policy for permitted and prohibited uses of our S3-compatible object storage service.",
  },
  "/sla": {
    title: "Service Level Agreement — Fil One",
    description: "Read the Fil One Object Storage Service Level Agreement: uptime commitment, service credit tiers, and how to request credits.",
  },
  "/lp/es/contacto": {
    title: "Contacto — Fil One Barcelona",
    description: "Póngase en contacto con el equipo de Fil One en MWC Barcelona. Hablemos de precios, migración y planes empresariales.",
  },
  "/lp/es/soporte": {
    title: "Soporte — Fil One Barcelona",
    description: "Soporte técnico para el almacenamiento objeto de Fil One. Contáctenos para ayuda con configuración, migración y cuentas.",
  },
  "/fr/marseille": {
    title: "Stockage S3 rapide près de Marseille — Fil One",
    description:
      "Datacenter dans le Sud de la France. Stockage objet S3 à 5 ms de Marseille, moins cher que Scaleway, Backblaze et Wasabi. Essayez 30 jours gratuitement.",
  },
  "/es/barcelona": {
    title: "Almacenamiento S3 rápido cerca de Barcelona — Fil One",
    description:
      "Centro de datos en el sur de Francia. Almacenamiento objeto S3 a 6 ms de Barcelona, más barato que Scaleway, Backblaze y Wasabi. Prueba 30 días gratis.",
  },

  // ── Newest /lp pages ──────────────────────────────────────────────────────
  "/lp/cost-ticker": {
    title: "Fil One — Watch the meter you're not paying",
    description:
      "Hyperscalers meter every read, request, and byte out. Fil One is flat $4.99/TB with no egress and no per-request fees. See the side-by-side.",
  },
  "/lp/exit-first": {
    title: "Fil One — Here's how to leave. Read it before you start.",
    description:
      "S3-compatible storage with $0 egress. The exit is a documented one-line sync command, not a renegotiation. Verify the way out before you commit. $4.99/TB flat.",
  },
  "/lp/agent-loops": {
    title: "Fil One — Let agents run. Not your bill.",
    description:
      "S3-compatible storage at $4.99/TB flat. No per-PUT fees, no per-GET fees, no egress. Agent loops run at full speed without a per-call counter.",
  },
  "/lp/agent-readable": {
    title: "Fil One — Priced so plainly your agent can read it",
    description:
      "Flat $4.99/TB pricing published in machine-readable llms.txt, with full S3 parity. No gated quotes — an AI coding agent can evaluate Fil One in one pass.",
  },
  "/lp/grant-funded": {
    title: "Fil One — Storage that outlives the grant cycle",
    description:
      "Flat $4.99/TB research data storage with no exit fees and integrity verification every ~24 hours. Predictable for multi-year grants, S3-compatible.",
  },
  "/lp/collections-access": {
    title: "Fil One — Open the collection. Skip the egress bill.",
    description:
      "Serve digital collections and IIIF imagery with $0 egress. Flat $4.99/TB storage, S3-compatible for IIIF image servers, 11 nines durability.",
  },
  "/lp/digital-preservation": {
    title: "Fil One — Preservation you can verify, not just trust",
    description:
      "Flat $4.99/TB digital preservation storage with integrity verification every ~24 hours. No retrieval fees, no egress. 11 nines durability, S3-compatible.",
  },
  "/lp/affordable": {
    title: "Fil One — Make storage your lowest line item",
    description:
      "S3-compatible object storage at $4.99/TB flat. No egress fees, no per-request charges, no confusing billing. One number. Start in minutes.",
  },
  "/lp/go-global": {
    title: "Fil One — Go global. Skip the multi-year build.",
    description:
      "Embed S3-compatible object storage into your product. Global network, SLA-backed, $4.99/TB flat. No capex, no infrastructure build — contact for enterprise and embedding terms.",
  },
  "/lp/metro": {
    title: "Fil One — Hyperscaler speed. Budget-tier bills.",
    description:
      "S3-compatible object storage at $4.99/TB flat. A global network of storage providers — fast reads without the hyperscaler price tag. No egress fees.",
  },
  "/lp/data-control": {
    title: "Fil One — Your data, under your control",
    description:
      "S3-compatible storage with EU region endpoint, recurring integrity verification, $0 exit egress, and no vendor lock-in. Flat $4.99/TB.",
  },
  "/lp/ml-training": {
    title: "Fil One — Build around the clock",
    description:
      "S3-compatible training-data storage at $4.99/TB flat. No egress on dataset reads. 62× cheaper than AWS EFS. fsspec, PyArrow, and HuggingFace datasets work natively.",
  },
  "/lp/agent-knowledge-layer": {
    title: "Fil One — Turn Object Storage Into an Agent Knowledge Layer",
    description:
      "S3 object storage with a built-in RAG pipeline. No stitching required, no per-query fees. Agent memory, RAG corpus, and retrieval on one platform.",
  },

  // ── Product / solutions / marketing pages ─────────────────────────────────
  "/storage": {
    title: "Object Storage — Fil One",
    description:
      "S3-compatible object storage built for the AI era. Verifiable data integrity, no egress fees, $4.99/TB/month. The foundation every Fil One account starts with.",
  },
  "/bucket-intelligence": {
    title: "RAG Pipeline — Fil One",
    description:
      "Turn any Fil One bucket into a queryable knowledge base. Auto-index files, semantic search, bring your own LLM keys. +$15/TB/month add-on.",
  },
  "/ai-agent-toolkit": {
    title: "AI Agent Toolkit — Fil One",
    description:
      "Plug Fil One into Claude, Cursor, Zapier, and 10+ more integrations via MCP and OAuth. Free with your storage plan.",
  },
  "/pricing": {
    title: "Pricing — Fil One",
    description:
      "Simple, predictable pricing for Object Storage, RAG Pipeline, and AI Agent Toolkit. Start free, scale as you grow.",
  },
  "/enterprise": {
    title: "Enterprise — Fil One",
    description:
      "Fil One for enterprise: verifiable data integrity, S3-compatible, no egress fees, SLA-backed. Custom pricing for teams that need storage at scale.",
  },
  "/partners": {
    title: "Partners — Fil One",
    description:
      "Channel, Technology, and MSP partner programs for Fil One. Resell, integrate, or bundle verifiable cloud storage with your business.",
  },
  "/partners/apply": {
    title: "Partner Application — Fil One",
    description:
      "Apply to the Fil One partner program. Resell, integrate, or bundle verifiable S3-compatible cloud storage with your business.",
  },
  "/solutions/ai-training": {
    title: "AI Training & Inference Storage — Fil One",
    description:
      "S3-compatible object storage built for AI workloads. Store training datasets, model weights, and checkpoints with verifiable integrity and no egress fees.",
  },
  "/solutions/web3-dapps": {
    title: "Web3 & dApp Storage — Fil One",
    description:
      "Verifiable, decentralized object storage for NFTs, dApps, and on-chain assets. S3-compatible, no egress fees, cryptographic proof on every object.",
  },
  "/solutions/media-archive": {
    title: "Media & Archive Storage — Fil One",
    description:
      "Low-cost, high-durability object storage for video, audio, and long-term archives. No egress fees, no retrieval penalties. $4.99/TB/month.",
  },
  "/solutions/enterprise-backup": {
    title: "Enterprise Backup & Disaster Recovery — Fil One",
    description:
      "Immutable, geo-distributed backup storage with no egress fees. Ransomware resilience, cryptographic integrity, and compliance-ready for enterprise teams.",
  },
  "/waitlist/bucket-intelligence": {
    title: "Join the Bucket Intelligence Waitlist — Fil One",
    description:
      "Get early access to Fil One RAG Pipeline — turn any bucket into a queryable knowledge base with semantic search and your own LLM keys.",
  },
  "/waitlist/ai-agent-toolkit": {
    title: "Join the AI Agent Toolkit Waitlist — Fil One",
    description:
      "Get early access to the Fil One AI Agent Toolkit — connect storage to Claude, Cursor, and your agent stack via MCP and OAuth.",
  },
};

/** All routes to prerender. */
const ROUTES = Object.keys(ROUTE_META);

const SSR_OUT_DIR = resolve(rootDir, "dist-ssr");

async function prerender() {
  // ── 1. Build the SSR bundle ──────────────────────────────────────────────
  console.log("Building SSR bundle…");

  await build({
    root: rootDir,
    configFile: resolve(rootDir, "vite.config.ts"),
    mode: "production",
    build: {
      ssr: "src/entry-server.tsx",
      outDir: "dist-ssr",
      emptyOutDir: true,
      rollupOptions: {
        output: { format: "es" },
      },
    },
    logLevel: "warn",
  });

  // ── 2. Import the SSR entry ──────────────────────────────────────────────
  const ssrEntry = pathToFileURL(resolve(SSR_OUT_DIR, "entry-server.js")).href;
  const { render } = await import(ssrEntry);

  // ── 3. Read client HTML template ─────────────────────────────────────────
  const templatePath = resolve(rootDir, "dist/index.html");
  if (!existsSync(templatePath)) {
    throw new Error(
      "dist/index.html not found — run `vite build` before the prerender script."
    );
  }
  const template = readFileSync(templatePath, "utf-8");

  // ── 4. Render each route ─────────────────────────────────────────────────
  console.log("Prerendering routes…");

  for (const route of ROUTES) {
    try {
      const appHtml = render(route);
      const meta = ROUTE_META[route] ?? {};
      const canonical = `${BASE_URL}${route === "/" ? "/" : route}`;

      // Inject per-page title, description, and canonical into the template.
      // The placeholders (<!--META_*--> … <!--/META_*-->) wrap the defaults in
      // index.html so in-browser SPA loads still get sensible fallback values.
      let html = template
        .replace(
          /<!--META_TITLE-->.*?<!--\/META_TITLE-->/gs,
          meta.title ?? "Fil One | S3 object storage built for the AI era"
        )
        .replace(
          /<!--META_DESCRIPTION-->.*?<!--\/META_DESCRIPTION-->/gs,
          meta.description ??
            "S3-compatible object storage built on Filecoin. Enterprise-grade durability, no egress fees, and verifiable data integrity."
        )
        .replace(/<!--META_CANONICAL-->.*?<!--\/META_CANONICAL-->/gs, canonical)
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // Inject JSON-LD structured data when defined for this route.
      const schemas = meta.jsonLd ?? [];
      const jsonLdTags = schemas
        .map(
          (schema) =>
            `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
        )
        .join("\n    ");
      html = html.replace("<!--META_JSON_LD-->", jsonLdTags);

      // "/" → dist/index.html, "/lp/agents" → dist/lp/agents/index.html
      const segments = route.split("/").filter(Boolean);
      const outDir =
        segments.length === 0
          ? resolve(rootDir, "dist")
          : resolve(rootDir, "dist", ...segments);

      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }

      writeFileSync(resolve(outDir, "index.html"), html);
      console.log(`  ✓ ${route}`);
    } catch (err) {
      // A failed route falls back to the SPA shell — not ideal but not fatal.
      console.warn(`  ✗ ${route} (skipped — ${err.message})`);
    }
  }

  // ── 5. Clean up SSR bundle ───────────────────────────────────────────────
  rmSync(SSR_OUT_DIR, { recursive: true, force: true });

  console.log("Prerendering complete.");
}

prerender().catch((err) => {
  console.error("Prerendering failed:", err);
  process.exit(1);
});
