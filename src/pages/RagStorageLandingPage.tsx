import { Database, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT } from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No per-request fees · Connects in minutes";

// 1 TB corpus, 5 TB of retrieval reads/month.
// AWS S3 Standard us-east-1 Q2 2026: storage 1,024 GB x $0.023 = $23.55,
// egress 5,120 GB x $0.09 = $460.80. Total $484.35.
// Fil One: 1 TB x $4.99 = $4.99, egress $0.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · RAG corpus storage at flat cost",
    description: `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. Store retrieval-augmented generation document corpora without per-query or per-read charges.`,
    canonical: "https://www.fil.one/lp/rag-storage",
  },

  hero: {
    badge: "For developers building retrieval-augmented apps",
    titleMaxWidth: 800,
    descriptionMaxWidth: 580,
    title: (
      <>
        Your corpus is a storage cost,
        <br />
        <span className="text-brand-500">not a per-query tax.</span>
      </>
    ),
    description: `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat. Store the whole document corpus without per-read or per-request fees eating into retrieval margin.`,
    ctas: [
      { label: "Start for free", href: SIGNUP_URL, variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The trap",
    heading: "Retrieval economics tax the corpus, not just the query.",
    sub: "The storage layer for a retrieval-augmented pipeline looks cheap on the surface. Then the egress and per-request lines compound with query volume and the corpus size becomes something to prune.",
    items: [
      {
        label: "The corpus cap",
        tone: "warning",
        catch: "The budget decides how broad the corpus is.",
        body: "Every document stored has a per-GB cost. Every retrieval read has an egress cost. Teams start pruning the corpus — not because the documents have no value, but because the storage economics do not reward coverage.",
      },
      {
        label: "The retrieval bill",
        tone: "danger",
        catch: "Every retrieval hits the egress line.",
        body: "A 1 TB corpus read 5 times a month for batch retrieval incurs $450 in egress on AWS at $0.09/GB — on top of $23.55 in storage. The storage is the smaller charge. The reads are the bill.",
      },
      {
        label: "The scale wall",
        tone: "brand",
        catch: "More documents means higher cost per query.",
        body: "Add more documents, pay more per retrieval pass, pay more per API call. The corpus that would answer more questions costs more to maintain. Teams cap it at a size they can afford, not a size that is useful.",
      },
    ],
  },

  comparison: {
    label: "The connection",
    heading: (
      <>
        Same S3 API. A corpus bill <span className="text-brand-500">determined by storage, not reads.</span>
      </>
    ),
    sub: "Any S3-compatible client reads and writes the document store. Retrieval reads are included in flat storage — no egress counter.",
    subMaxWidth: 620,
    caption: "Monthly cost for a 1 TB corpus with 5 TB of retrieval reads, by provider",
    columns: [
      { key: "breakdown", header: "Breakdown", note: true },
      { key: "total", header: "Total / month", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { breakdown: "$23.55 storage + $460.80 egress", total: "$484/mo" } },
      { provider: "Fil One", isFilOne: true, values: { breakdown: "1 TB × $4.99 — egress $0", total: "$4.99/mo" } },
    ],
    footnote:
      "AWS S3 Standard us-east-1 Q2 2026: $0.023/GB storage, $0.09/GB egress. Computed from stated inputs — 1,024 GB × $0.023 = $23.55 storage; 5,120 GB × $0.09 = $460.80 egress. Fil One: 1 TB × $4.99 = $4.99, egress $0.",
  },

  features: {
    label: "What's live and what's coming",
    heading: (
      <>
        Storage that scales with <span className="text-brand-500">corpus size, not query rate.</span>
      </>
    ),
    sub: "The storage layer is live today. Native RAG tooling integrations are in development.",
    subMaxWidth: 560,
    items: [
      {
        icon: Database,
        title: "Store the whole corpus",
        desc: `At ${PRICE_PER_TB_SHORT} flat, a 1 TB document store is ${PRICE_DISPLAY}/month. A 10 TB corpus is $49.90. The storage price does not penalise breadth.`,
      },
      {
        icon: ArrowsOut,
        title: "No egress on retrieval reads",
        desc: "Retrieval pipelines read raw documents on every query. Those reads are included in flat storage — there is no $0.09/GB egress line on retrieval.",
      },
      {
        icon: ChartLine,
        title: "Predictable corpus cost",
        desc: `Storage volume times ${PRICE_DISPLAY}. No per-request fees on reads or writes. The corpus bill grows with what you keep, not how often you query it.`,
      },
      {
        icon: Plug,
        title: "Native RAG integrations",
        desc: "LangChain, LlamaIndex, and Haystack connectors for direct corpus management are in development — join the waitlist at /waitlist/bucket-intelligence for early access.",
      },
    ],
  },

  cta: {
    heading: "Store the whole corpus.",
    subhead: "Free 1 TB evaluation. Point your existing S3 client at the endpoint and stop rationing coverage.",
    cta: { label: "Start for free", href: SIGNUP_URL },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const RagStorageLandingPage = () => <LandingPage config={config} />;

export default RagStorageLandingPage;
