import { Database, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import AnnouncementBadge from "@/components/AnnouncementBadge";
import { PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No per-request fees · Connects in minutes";

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Turn Object Storage Into an Agent Knowledge Layer",
    description: `S3-compatible storage purpose-built for AI agents: agent memory, RAG corpus, model artifacts, and inference I/O. ${PRICE_PER_TB_SHORT} flat, no per-request fees.`,
    canonical: "https://www.fil.one/lp/agent-knowledge-layer",
  },

  hero: {
    badge: <AnnouncementBadge pill="Coming soon">RAG Pipeline &amp; Agent Toolkit</AnnouncementBadge>,
    titleMaxWidth: 820,
    descriptionMaxWidth: 480,
    title: (
      <>
        Turn object storage into
        <br />
        <span className="text-brand-500">an agent knowledge layer.</span>
      </>
    ),
    description: "S3 object storage with a built-in RAG pipeline. No stitching required, no per-query fees.",
    ctas: [
      { label: "Start storing for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The cost structure problem",
    heading: (
      <>
        You don't just pay to store your data.
        <br />
        You pay for every step that makes it usable.
      </>
    ),
    sub: "Building a knowledge base on standard object storage providers means stitching together multiple services, each billed separately. Then your agents start running, and every query, memory read, and retrieval call adds to the tab. The stack is expensive to build and even more expensive to run.",
    subMaxWidth: 620,
    items: [
      {
        label: "The architecture cost",
        tone: "warning",
        catch: "Multiple services, each separately billed.",
        body: "A typical RAG-enabled agent requires several services duct-taped together. A vector database, a retrieval layer, a compute service, and an object store, each with its own integration, its own failure point, and its own bill. You're paying for complexity before your agents run a single query.",
      },
      {
        label: "The usage cost",
        tone: "danger",
        catch: "Every action your agents take is a billable event.",
        body: "A single agent task triggers dozens of retrieval calls: context lookups, memory reads, state writes. Multiply that across thousands of tasks per hour and the meter runs constantly.",
      },
      {
        label: "A different model",
        tone: "brand",
        catch: "Fil One collapses the stack and the bill.",
        body: "One platform for agent memory, RAG corpus, and retrieval. No glue code required. You pay for storage, not for what your agents do with it.",
      },
    ],
  },

  features: {
    label: "What's live and what's coming",
    heading: (
      <>
        Storage that works <span className="text-brand-500">the way agents do.</span>
      </>
    ),
    sub: "S3-compatible storage built for agents is live today. Be the first to try native RAG pipeline and AI agents integrations.",
    subMaxWidth: 560,
    items: [
      {
        icon: Database,
        title: "Agent memory & state",
        desc: "Persist conversation history, task queues, episodic memory, and checkpoint files across agent restarts. Standard PutObject/GetObject — the agent writes, the agent reads.",
      },
      {
        icon: ChartLine,
        title: "Flat cost for loop traffic",
        desc: `Agents write frequently and read back their own outputs. Per-request billing makes loops expensive. ${PRICE_PER_TB_SHORT} flat — no PUT fees, no GET fees, no egress.`,
      },
      {
        icon: ArrowsOut,
        title: "RAG corpus storage",
        desc: "Store raw documents, chunked text, and embeddings backing a retrieval pipeline. Reads are included in flat storage — no per-retrieval egress counter.",
        badge: "Coming soon",
        cta: { label: "Join the waitlist", href: "/waitlist/bucket-intelligence" },
      },
      {
        icon: Plug,
        title: "AI toolkit integrations",
        desc: "LangChain, LlamaIndex, and Haystack connectors for direct corpus management, plus agent memory integrations.",
        badge: "Coming soon",
        cta: { label: "Join the waitlist", href: "/waitlist/ai-agent-toolkit" },
      },
    ],
  },

  cta: {
    heading: `One rate. ${PRICE_PER_TB_MONTH}.`,
    headingMaxWidth: 560,
    subhead: "Storage only — no PUT fees, no GET fees, no egress. Try it free with 1 TB: one place to store your data, retrieve it, and put it to work.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const AgentKnowledgeLandingPage = () => <LandingPage config={config} />;

export default AgentKnowledgeLandingPage;
