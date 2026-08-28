/**
 * Per-route SEO metadata + canonical base URL.
 *
 * Pure data with NO side effects, so it can be imported by both
 * scripts/prerender.mjs (build) and the route-parity test (CI) without
 * pulling in the prerender script's JSDOM/global setup.
 *
 * Every route in src/routes.tsx (routeDefs) MUST have an entry here — the
 * route-parity test (src/test/route-seo-parity.test.ts) asserts this.
 */
import {
  PRICE_PER_TB_SHORT,
  PRICE_PER_TB_MONTH,
  PRICE_AMOUNT,
} from "../src/lib/pricing.constants.mjs";

export const BASE_URL = "https://www.fil.one";

export const ROUTE_META = {
  "/blog": {
    title: "Blog · Fil One",
    description:
      "Ideas and practical guidance on object storage, AI infrastructure, and the cost of moving data at scale.",
  },
  "/": {
    title: "Fil One | S3 object storage built for the AI era",
    description:
      `S3-compatible object storage on Filecoin. ${PRICE_PER_TB_MONTH}, no egress fees, no API request charges, immutable Object Lock retention.`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Fil One",
        url: "https://www.fil.one",
        logo: "https://www.fil.one/fil-one-logo.svg",
        description:
          "S3-compatible object storage built on Filecoin. No egress fees, no API request charges, and immutable Object Lock retention.",
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Fil One Object Storage",
        description:
          "S3-compatible object storage on Filecoin with no egress fees, no API request charges, and Object Lock retention in Governance or Compliance mode.",
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
    title: "Fil One for AI Agents · S3 Storage for RAG, Agent Memory & Datasets",
    description:
      `Give your AI agents S3-compatible storage at ${PRICE_PER_TB_SHORT}, no egress fees. Drop-in replacement for AWS S3.`,
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
              text: `AI agents read and write storage in tight loops. Fetching context, writing results, reading back artifacts. On AWS S3, each read triggers an egress charge and each operation a request fee, so agent loops compound costs fast. Fil One charges a flat ${PRICE_PER_TB_MONTH} with $0 egress and $0 per request, so agents can run thousands of iterations without the bill growing.`,
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
              text: "Yes. Any framework that supports an S3-compatible backend works with Fil One, including LangChain, LlamaIndex, and custom agents using boto3 or the AWS SDK. Change the endpoint URL; everything else stays the same.",
            },
          },
          {
            "@type": "Question",
            name: "How much does it cost to run an AI agent that makes 500,000 S3 requests per month?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `On AWS S3, 100 GB storage + 500K PUT/GET requests + 100 GB egress costs roughly $14/month. On Fil One, the same workload costs $0.50, just 100 GB of storage at ${PRICE_PER_TB_SHORT}, with requests and egress included at no charge.`,
            },
          },
        ],
      },
    ],
  },
  "/lp/egress": {
    title: "Zero Egress Fee Object Storage · Fil One vs AWS S3, Backblaze, Wasabi",
    description:
      "Stop paying egress fees. Fil One charges $0 for data transfer out. Save thousands vs AWS S3 ($90+/TB) and Wasabi ($0.007/GB) with no API fees either.",
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
              text: `Yes. Fil One charges $0 per GB for data transfer out, $0 for API requests, and a flat ${PRICE_PER_TB_MONTH} for storage. There are no bandwidth tiers, no free-tier egress allowances that expire, and no per-request fees.`,
            },
          },
          {
            "@type": "Question",
            name: "How much can I save switching from AWS S3 to Fil One?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A team with 10 TB stored and 10 TB of reads per month pays roughly $1,151/month on AWS S3 (storage + egress + requests). The same workload on Fil One costs $50/month. A saving of over $1,100/month, or $13,200/year.",
            },
          },
          {
            "@type": "Question",
            name: "How does Fil One compare to Cloudflare R2 for egress fees?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `Both Fil One and Cloudflare R2 charge $0 for egress. Fil One's storage rate is ${PRICE_PER_TB_MONTH} versus R2's $15/TB/month. Making Fil One roughly 3× cheaper on storage while matching R2 on egress.`,
            },
          },
          {
            "@type": "Question",
            name: "Why do hyperscalers charge so much for egress?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hyperscaler pricing was designed to monetise data retrieval. Once your data is in, leaving (or reading it frequently) is expensive. Egress fees on AWS average $0.09/GB, meaning 10 TB read once costs $921 in transfer alone. Fil One is built on Filecoin's decentralised network with a different cost structure, allowing $0 egress at a flat storage rate.",
            },
          },
        ],
      },
    ],
  },
  "/lp/rag-storage": {
    title: "Object Storage for RAG Pipelines · Fil One",
    description:
      `Store and retrieve RAG corpora, embeddings, and vector indexes at ${PRICE_PER_TB_SHORT}. S3-compatible, no egress fees. Built for LLM pipelines.`,
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
              text: "A 1 TB corpus read 5× per month costs $484/month on AWS S3 ($23.55 storage + $460 egress). On Fil One the same workload costs $4.99/month, a 97% reduction, because retrieval reads are included at no charge.",
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
              text: `No. Fil One's flat ${PRICE_PER_TB_MONTH} rate means a larger corpus costs more in storage but adds nothing to retrieval cost. You can store your full document set without rationing based on retrieval economics.`,
            },
          },
        ],
      },
    ],
  },
  "/lp/ml-checkpoints": {
    title: "ML Checkpoint Storage · Save Model Weights Cheaply | Fil One",
    description:
      `Store ML checkpoints and model artifacts at ${PRICE_PER_TB_SHORT} with no egress fees. S3-compatible. Ideal for training runs on any cloud.`,
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
              text: `Flat ${PRICE_PER_TB_MONTH} with no egress fees. 10 TB of checkpoints costs $49.90/month; 100 TB costs $499/month. Evaluation runs that load checkpoints are included. Reads cost nothing extra.`,
            },
          },
          {
            "@type": "Question",
            name: "Do I pay every time I load a checkpoint for evaluation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Fil One charges $0 for egress and $0 per request. You can load any checkpoint as many times as needed. Running 50 evaluation passes on the same artifact costs the same as running it once.",
            },
          },
          {
            "@type": "Question",
            name: "How does Fil One compare to AWS S3 for ML checkpoint storage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A team with 10 TB of checkpoints loading 5 TB for evals each month pays roughly $680/month on AWS S3 ($230 storage + $450 egress). On Fil One the same workload costs $49.90/month. The egress line disappears entirely.",
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
    title: `Object Storage for Startups · ${PRICE_PER_TB_SHORT}, No Egress | Fil One`,
    description:
      `Predictable, affordable cloud storage for startups. ${PRICE_PER_TB_SHORT}, zero egress fees, S3-compatible. No surprise bills, just storage that scales with you.`,
  },
  "/lp/backup-dr": {
    title: "Backup & Disaster Recovery Storage · Fil One",
    description:
      `Backup storage at ${PRICE_PER_TB_SHORT} with zero egress on restores, so testing a restore costs nothing. Object Lock retention against ransomware. S3-compatible drop-in for DR workflows.`,
  },
  "/lp/log-retention": {
    title: `Cheap Log Retention Storage · ${PRICE_PER_TB_SHORT} | Fil One`,
    description:
      `Store logs long-term at ${PRICE_PER_TB_SHORT} with no egress fees. S3-compatible, and far cheaper than CloudWatch or Datadog for long-term retention.`,
  },
  "/lp/web-scraping": {
    title: "Storage for Web Scraping & Data Collection · Fil One",
    description:
      `Store scraped datasets, crawl archives, and raw HTML at ${PRICE_PER_TB_SHORT}. No egress fees when feeding data into pipelines. S3-compatible.`,
  },
  "/lp/multi-cloud": {
    title: "Multi-Cloud Object Storage · S3-Compatible | Fil One",
    description:
      `Add a cost-effective storage tier to your multi-cloud stack. ${PRICE_PER_TB_SHORT}, no egress, S3-compatible. Works alongside AWS, GCP, and Azure.`,
  },
  "/lp/data-sovereignty": {
    title: "EU Data Residency Storage · S3-Compatible | Fil One",
    description:
      `S3-compatible object storage with an EU region endpoint. No egress fees, no vendor lock-in, at ${PRICE_PER_TB_SHORT} flat.`,
  },
  "/lp/migrate-from-s3": {
    title: "Migrate from AWS S3 to Fil One · Drop-In S3 Replacement",
    description:
      `Switch from AWS S3 to Fil One in minutes. S3-compatible API, ${PRICE_PER_TB_SHORT} vs AWS $23+/TB, and $0 egress vs AWS $90+/TB. Change the endpoint, not the code.`,
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
              text: "Two settings, not a rewrite. Point your existing boto3, AWS SDK v3, or other S3 client at the Fil One endpoint and enable path-style addressing. The object operations your code relies on behave as they do on AWS: PutObject, GetObject, HeadObject, DeleteObject, ListObjectsV2, ListObjectVersions, multipart upload, and presigned URLs. The docs publish a per-operation compatibility matrix, including the bucket-configuration calls that differ by region.",
            },
          },
          {
            "@type": "Question",
            name: "How much cheaper is Fil One than AWS S3?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `A workload with 10 TB stored and 10 TB read per month costs roughly $1,158/month on AWS S3 (storage + egress + request fees). The same workload on Fil One costs $50/month, about 96% less, because Fil One charges a flat ${PRICE_PER_TB_MONTH} with $0 egress and $0 per request.`,
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
    title: "Compliance-Ready Object Storage · Fil One",
    description:
      `S3-compatible storage with Object Lock retention, full version history, and encryption at rest and in transit, at ${PRICE_PER_TB_SHORT} flat.`,
  },
  "/lp/archival": {
    title: "Archival Object Storage · Flat-Rate, No Retrieval Fees | Fil One",
    description:
      `Archive cold data at ${PRICE_PER_TB_SHORT} flat. No egress fees or retrieval delay when you need to restore. S3-compatible.`,
  },
  "/lp/versioning": {
    title: "Object Storage with Versioning · Fil One",
    description:
      `S3-compatible versioning, built on Filecoin infrastructure. Keep every version of every object and download any of them at ${PRICE_PER_TB_SHORT} with no egress fees.`,
  },
  "/lp/regional-cloud": {
    title: "Regional Cloud Storage Alternative · Fil One",
    description:
      `A cost-effective alternative to building your own regional cloud storage. ${PRICE_PER_TB_SHORT}, no egress, S3-compatible.`,
  },
  "/lp/media": {
    title: "Media & Asset Storage · S3-Compatible, No Egress | Fil One",
    description:
      `Store and serve media assets, video, and images at ${PRICE_PER_TB_SHORT} with zero egress fees. S3-compatible, high-durability storage for media workflows.`,
  },
  "/lp/gaming": {
    title: "Game Asset & Save-Data Storage · Fil One",
    description:
      `S3-compatible storage for game assets, saves, and telemetry at ${PRICE_PER_TB_SHORT}. Zero egress fees. Built for game backends.`,
  },
  "/lp/genomics": {
    title: "Genomics & Life Sciences Data Storage · Fil One",
    description:
      `Store genomics datasets, sequencing data, and research archives at ${PRICE_PER_TB_SHORT} with zero egress fees on re-analysis, at any scale.`,
  },
  "/lp/web3-fintech": {
    title: "Web3 & Fintech Data Storage · S3-Compatible | Fil One",
    description:
      `S3-compatible storage for Web3 and fintech workloads, built on Filecoin infrastructure. ${PRICE_PER_TB_SHORT} flat, no egress, no lock-in.`,
  },
  "/lp/web3-pivot": {
    title: "S3-Compatible Storage for Web3 Projects · Fil One",
    description:
      `Point your Web3 product's storage at Filecoin infrastructure without rebuilding your stack. S3-compatible, no egress fees, no lock-in, at ${PRICE_PER_TB_SHORT} flat.`,
  },
  "/lp/web3-native": {
    title: "Native Web3 Object Storage · Built on Filecoin | Fil One",
    description:
      `Purpose-built for Web3-native apps. S3-compatible object storage built on Filecoin infrastructure at ${PRICE_PER_TB_SHORT}, no egress, no lock-in.`,
  },
  "/lp/barcelona": {
    title: `Fil One for Barcelona: European Storage, ${PRICE_PER_TB_SHORT}, No Egress Fees`,
    description:
      `S3-compatible object storage for teams in Barcelona. EU data sovereignty, zero egress fees, at ${PRICE_PER_TB_SHORT}. Drop into your existing stack in minutes.`,
  },
  "/lp/es/barcelona": {
    lang: "es",
    title: `Fil One para Barcelona: Almacenamiento Europeo, ${PRICE_PER_TB_SHORT}, Sin Egress`,
    description:
      `Almacenamiento de objetos compatible con S3 para equipos en Barcelona. Soberanía de datos en la UE, cero comisiones de egress, a ${PRICE_PER_TB_SHORT}. Intégralo en tu stack actual en minutos.`,
  },
  "/contact-sales": {
    title: "Contact Sales · Fil One",
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
    title: "Fil One para Barcelona: Contacto",
    description: "Ponte en contacto con el equipo de Fil One para hablar de precios, migración y planes empresariales.",
  },
  "/lp/es/soporte": {
    lang: "es",
    title: "Fil One para Barcelona: Soporte",
    description: "Soporte técnico para el almacenamiento de objetos de Fil One. Contáctanos para ayuda con configuración, migración y cuentas.",
  },
  // ── Newest /lp pages ──────────────────────────────────────────────────────
  "/lp/cost-ticker": {
    title: "Fil One · Watch the meter you're not paying",
    description:
      `Hyperscalers meter every read, request, and byte out. Fil One is flat ${PRICE_PER_TB_SHORT} with no egress and no per-request fees. See the side-by-side.`,
  },
  "/lp/exit-first": {
    title: "Fil One · Here's how to leave. Read it before you start.",
    description:
      `S3-compatible storage with $0 egress. The exit is a documented one-line sync command, not a renegotiation. Verify the way out before you commit. ${PRICE_PER_TB_SHORT} flat.`,
  },
  "/lp/agent-loops": {
    title: "Fil One · Let agents run. Not your bill.",
    description:
      `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat. No per-PUT fees, no per-GET fees, no egress. Agent loops run at full speed without a per-call counter.`,
  },
  "/lp/agent-readable": {
    title: "Fil One · Priced so plainly your agent can read it",
    description:
      `Flat ${PRICE_PER_TB_SHORT} pricing published in machine-readable llms.txt, with full S3 parity. No gated quotes. An AI coding agent can evaluate Fil One in one pass.`,
  },
  "/lp/grant-funded": {
    title: "Fil One · Storage that outlives the grant cycle",
    description:
      `Flat ${PRICE_PER_TB_SHORT} research data storage with no exit fees. Predictable for multi-year grants, S3-compatible.`,
  },
  "/lp/collections-access": {
    title: "Fil One · Open the collection. Skip the egress bill.",
    description:
      `Serve digital collections and IIIF imagery with $0 egress. Flat ${PRICE_PER_TB_SHORT} storage, S3-compatible for IIIF image servers.`,
  },
  "/lp/digital-preservation": {
    title: "Fil One · Preservation you can afford to check",
    description:
      `Flat ${PRICE_PER_TB_SHORT} digital preservation storage. No retrieval fees, no egress. Run fixity checks as often as your program requires. S3-compatible.`,
  },
  "/lp/affordable": {
    title: "Fil One · Make storage your lowest line item",
    description:
      `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. No egress fees, no per-request charges, no confusing billing. One number. Start in minutes.`,
  },
  "/lp/go-global": {
    title: "Fil One · Go global. Skip the multi-year build.",
    description:
      `Embed S3-compatible object storage into your product. US and EU regions, SLA-backed, ${PRICE_PER_TB_SHORT} flat. No capex, no infrastructure build. Contact for enterprise and embedding terms.`,
  },
  "/lp/metro": {
    title: "Fil One · Hyperscaler speed. Budget-tier bills.",
    description:
      `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. Always-hot storage with no egress fees. Fast reads without the hyperscaler price tag.`,
  },
  "/lp/data-control": {
    title: "Fil One · Your data, under your control",
    description:
      `S3-compatible storage with an EU region endpoint, $0 exit egress, and no vendor lock-in. Flat ${PRICE_PER_TB_SHORT}.`,
  },
  "/lp/ml-training": {
    title: "Fil One · Build around the clock",
    description:
      `S3-compatible training-data storage at ${PRICE_PER_TB_SHORT} flat. No egress on dataset reads. 62× cheaper than AWS EFS. fsspec, PyArrow, and HuggingFace datasets work natively.`,
  },
  "/lp/agent-knowledge-layer": {
    title: "Fil One · Turn Object Storage Into an Agent Knowledge Layer",
    description:
      "S3 object storage with a built-in RAG pipeline. No stitching required, no per-query fees. Agent memory, RAG corpus, and retrieval on one platform.",
  },
  "/lp/price": {
    title: `Fil One · ${PRICE_PER_TB_MONTH}. Switch and save.`,
    description:
      `Compare flat-rate S3-compatible storage side by side. Fil One is ${PRICE_PER_TB_SHORT} with $0 egress and no per-request fees. Wasabi is $7.99/TB and Backblaze B2 $6.95/TB.`,
  },

  // ── Product / solutions / marketing pages ─────────────────────────────────
  "/storage": {
    title: "Object Storage · Fil One",
    description:
      `S3-compatible object storage at ${PRICE_PER_TB_MONTH} with no egress fees and no API request charges. Object Lock retention and full version history included. The foundation every Fil One account starts with.`,
  },
  "/bucket-intelligence": {
    title: "Bucket Intelligence · Fil One",
    description:
      "Turn any Fil One bucket into a queryable knowledge base. Auto-index files, semantic search, and a managed model. Free during early access.",
  },
  "/ai-agent-toolkit": {
    title: "AI Agent Toolkit · Fil One",
    description:
      "Plug Fil One into Claude, Cursor, Zapier, and 10+ more integrations via MCP and OAuth. Free with your storage plan.",
  },
  "/pricing": {
    title: "Pricing · Fil One",
    description:
      "Simple, predictable pricing for Object Storage, RAG Pipeline, and AI Agent Toolkit. Start free, scale as you grow.",
  },
  "/enterprise": {
    title: "Enterprise · Fil One",
    description:
      "Fil One for enterprise: S3-compatible object storage with no egress fees, immutable Object Lock retention, and an SLA-backed uptime commitment. Custom pricing at scale.",
  },
  "/partners": {
    title: "Partners · Fil One",
    description:
      "Channel, Technology, and MSP partner programs for Fil One. Resell, integrate, or bundle S3-compatible cloud storage with no egress fees.",
  },
  "/partners/apply": {
    title: "Partner Application · Fil One",
    description:
      "Apply to the Fil One partner program. Resell, integrate, or bundle S3-compatible cloud storage with no egress fees.",
  },
  "/solutions/ai-training": {
    title: "AI Training & Inference Storage · Fil One",
    description:
      "S3-compatible object storage built for AI workloads. Store training datasets, model weights, and checkpoints, and read them back as often as you like at no charge.",
  },
  "/solutions/web3-dapps": {
    title: "Web3 & dApp Storage · Fil One",
    description:
      "Decentralized object storage for NFTs, dApps, and on-chain assets. S3-compatible, no egress fees, and Object Lock so metadata cannot change after mint.",
  },
  "/solutions/media-archive": {
    title: "Media & Archive Storage · Fil One",
    description:
      `Low-cost, high-durability object storage for video, audio, and long-term archives. No egress fees, no retrieval penalties. ${PRICE_PER_TB_MONTH}.`,
  },
  "/solutions/enterprise-backup": {
    title: "Enterprise Backup & Disaster Recovery · Fil One",
    description:
      "Immutable, S3-compatible backup storage with object lock and no egress fees. Ransomware-resilient, WORM-compliant, and built for enterprise recovery.",
  },
  "/waitlist/bucket-intelligence": {
    title: "Join the Bucket Intelligence Waitlist · Fil One",
    description:
      "Get early access to Fil One RAG Pipeline. Turn any bucket into a queryable knowledge base with semantic search and your own LLM keys.",
  },
  "/waitlist/ai-agent-toolkit": {
    title: "Join the AI Agent Toolkit Waitlist · Fil One",
    description:
      "Get early access to the Fil One AI Agent Toolkit. Connect storage to Claude, Cursor, and your agent stack via MCP and OAuth.",
  },
  "/about": {
    title: "About · Fil One",
    description:
      "Fil One exists to put you back in control of your data. Learn who we are, why we built S3-compatible storage with no egress fees, and the principles behind it.",
  },
};
