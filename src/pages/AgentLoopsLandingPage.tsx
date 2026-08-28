import { Database, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No per-request fees · Connects in minutes";

// Request-fee-only comparison at 1 billion ops/month.
// AWS S3: 1,000,000,000 / 1,000 x $0.005 = $5,000. Google: $0.05/10K x 1B = $5,000.
// Azure: $0.055/10K x 1B = $5,500. Wasabi, Backblaze B2, Fil One: $0 per request.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Let agents run. Not your bill.",
    description: `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat. No per-PUT fees, no per-GET fees, no egress. Agent loops run at full speed without a per-call counter.`,
    canonical: "https://www.fil.one/lp/agent-loops",
  },

  hero: {
    badge: "For developers building AI agents and autonomous pipelines",
    titleMaxWidth: 720,
    descriptionMaxWidth: 580,
    title: (
      <>
        Let agents run.
        <br />
        <span className="text-brand-500">Not your bill.</span>
      </>
    ),
    description: `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat. No per-PUT fees, no per-GET fees, no egress. Agent loops run at full speed without a per-call counter.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The billing problem",
    heading: "Agents are high-frequency workloads. Per-call pricing taxes that frequency.",
    sub: "Every agent step writes state. Every context-aware turn reads memory. Every tool call produces output. Storage that charges per operation makes agents expensive to run, and the cost scales with capability, not with data volume.",
    subMaxWidth: 620,
    items: [
      {
        label: "The write counter",
        tone: "warning",
        catch: "Every state write is a metered event on S3.",
        body: "AWS S3 charges $0.005 per 1,000 PUTs. An agent writing state on every step, across hundreds of concurrent runs, generates millions of PUTs per day. At scale, the request bill exceeds the storage bill.",
      },
      {
        label: "The retrieval tax",
        tone: "danger",
        catch: "Reading context and memory charges egress.",
        body: "Agents that retrieve context, load memory, or read prior outputs pay $0.09/GB in egress on every read from AWS. The more context-aware the agent, the more it reads, and the more the bill grows.",
      },
      {
        label: "The framework lock",
        tone: "brand",
        catch: "Purpose-built AI storage charges per query.",
        body: "Managed vector databases and agent memory platforms charge per API call. Teams building high-frequency agents find that per-query pricing makes the storage layer the dominant cost, not the LLM.",
      },
    ],
  },

  comparison: {
    label: "The proof",
    heading: (
      <>
        Same boto3. <span className="text-brand-500">Zero per-call counter.</span>
      </>
    ),
    sub: "Any S3-compatible tool your agent already uses connects with an endpoint change. Writes, reads, and lists are all included in flat storage.",
    subMaxWidth: 620,
    caption: "Request fees only, at 1 billion operations/month, by provider",
    columns: [
      { key: "rate", header: "Rate" },
      { key: "monthly", header: "Monthly (1B ops)", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { rate: "$0.005 / 1K PUTs", monthly: "$5,000" } },
      { provider: "Google Cloud Storage", values: { rate: "$0.05 / 10K ops", monthly: "$5,000" } },
      { provider: "Azure Blob Storage", values: { rate: "$0.055 / 10K writes", monthly: "$5,500" } },
      { provider: "Wasabi", values: { rate: "$0 per request", monthly: "$0" } },
      { provider: "Backblaze B2", values: { rate: "$0 per request", monthly: "$0" } },
      { provider: "Fil One", isFilOne: true, values: { rate: "$0 per request", monthly: "$0" } },
    ],
    footnote:
      "Public US rate cards, Q2 2026. Request fees only — storage and egress are separate on metered tiers and zero on Fil One. AWS: 1,000,000,000 / 1,000 × $0.005 = $5,000. Google: $0.05/10K × 1B = $5,000. Azure: $0.055/10K × 1B = $5,500.",
  },

  features: {
    label: "Built for high-frequency workloads",
    heading: (
      <>
        Storage cost that scales with <span className="text-brand-500">data, not with calls.</span>
      </>
    ),
    sub: "The only change is the endpoint. Call frequency stops being a billing variable.",
    subMaxWidth: 560,
    items: [
      {
        icon: Database,
        title: "No per-request fees",
        desc: "PUT, GET, LIST, HEAD — all included in flat storage. Agents that write state every turn and read context on every call pay $0 in request fees.",
      },
      {
        icon: ArrowsOut,
        title: "No egress on context reads",
        desc: "Retrieving memory, loading corpus chunks, and reading prior outputs cost $0 in egress. Agent loops that read frequently pay for storage, not for reads.",
      },
      {
        icon: Plug,
        title: "S3-compatible · existing tools work",
        desc: "boto3, @aws-sdk/client-s3, LangChain S3 loaders, LlamaIndex — any tool that reads or writes S3 connects with an endpoint change. No new SDK.",
      },
      {
        icon: ChartLine,
        title: "Cost that scales with data, not calls",
        desc: `${PRICE_PER_TB_SHORT} flat. An agent that makes 10 million calls a day but stores 1 TB pays ${PRICE_DISPLAY}/month. Call frequency is not a billing input.`,
      },
    ],
  },

  cta: {
    heading: "Let agents run. Not your bill.",
    subhead: "Free 30-day trial with 1 TB of storage and 2 TB of egress. Connect your existing agent storage code and watch the request counter disappear.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const AgentLoopsLandingPage = () => <LandingPage config={config} />;

export default AgentLoopsLandingPage;
