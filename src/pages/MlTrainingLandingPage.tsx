import { Database, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// 10 TB training data, 20 training runs/month reading the full set.
// AWS EFS (gp bursting): $0.30/GB = $307.20/TB -> 10 TB = $3,072/mo, no egress line.
// AWS S3 Standard: $0.023/GB storage ($235.52) + 20 runs x 10,240 GB x $0.09/GB egress
//   = $235.52 + $18,432 = $18,668/mo.
// Fil One: 10 TB x $4.99 = $49.90, egress $0.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Build around the clock",
    description: `S3-compatible training-data storage at ${PRICE_PER_TB_SHORT} flat. No egress on dataset reads. 62× cheaper than AWS EFS. fsspec, PyArrow, and HuggingFace datasets work natively.`,
    canonical: "https://www.fil.one/lp/ml-training",
  },

  hero: {
    badge: "For ML infrastructure leads and training teams",
    titleMaxWidth: 720,
    descriptionMaxWidth: 580,
    title: (
      <>
        Build around
        <br />
        <span className="text-brand-500">the clock.</span>
      </>
    ),
    description: `Training-data storage at ${PRICE_PER_TB_SHORT} flat. No egress on dataset reads. fsspec, PyArrow, and HuggingFace datasets work natively — change the endpoint, keep the code.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The tradeoff",
    heading: "Fast storage or affordable storage. Training teams have been told to pick one.",
    sub: "In-cluster storage (EFS, NFS, proprietary object stores) is fast but expensive. Standard cloud object storage is cheap but charges egress every time a run reads the dataset. Fil One is both flat and S3-compatible.",
    subMaxWidth: 620,
    items: [
      {
        label: "The EFS tax",
        tone: "warning",
        catch: "$307/TB for in-cluster storage.",
        body: "AWS EFS costs $0.30/GB — $307/TB — because it is optimised for latency, not cost. A 10 TB training corpus costs $3,072/month. Teams pay that to avoid the alternative: slow, metered S3.",
      },
      {
        label: "The egress trap",
        tone: "danger",
        catch: "Every training run reads the full dataset.",
        body: "Using standard S3 instead of EFS saves on storage but adds $0.09/GB egress per read. 20 training runs over a 10 TB dataset costs $18,432 in egress alone that month. The compute bill is not the whole story.",
      },
      {
        label: "The iteration limit",
        tone: "brand",
        catch: "Storage cost constrains how often you can train.",
        body: "When each run carries an egress cost, teams gate training iterations. Ablations get skipped. Re-runs get deferred. The research output is shaped by the infrastructure bill.",
      },
    ],
  },

  comparison: {
    label: "The numbers",
    heading: (
      <>
        10 TB training data. <span className="text-brand-500">20 training runs per month.</span>
      </>
    ),
    sub: "Same dataset, three storage options. Monthly cost for storage plus the egress cost of reading the full set 20 times.",
    subMaxWidth: 620,
    caption: "Monthly cost for 10 TB training data + 20 full-dataset reads, by storage option",
    columns: [
      { key: "rate", header: "Rate" },
      { key: "egress", header: "Egress", colorByValue: true },
      { key: "total", header: "Total / mo", total: true },
    ],
    rows: [
      { provider: "AWS EFS (gp)", values: { rate: "$307/TB", egress: "N/A", total: "$3,072" } },
      { provider: "AWS S3 + 20 runs", values: { rate: "$23.55/TB", egress: "$0.09/GB", total: "$18,668" } },
      { provider: "Fil One", isFilOne: true, values: { rate: PRICE_PER_TB_SHORT, egress: "$0", total: "$50" } },
    ],
    footnote:
      "AWS EFS gp bursting us-east-1: $0.30/GB. AWS S3 Standard: $0.023/GB storage + $0.09/GB egress per read. Computed: EFS 10,240 GB × $0.30 = $3,072; S3 storage $235.52 + 20 runs × 10,240 GB × $0.09 = $18,432 egress. Fil One: 10 TB × $4.99 = $49.90, egress $0. Q2 2026 public rate cards.",
  },

  features: {
    label: "Why it works",
    heading: (
      <>
        Training cost that scales with <span className="text-brand-500">dataset size, not run count.</span>
      </>
    ),
    sub: "fsspec, PyArrow, and HuggingFace datasets work natively — change the endpoint, keep the code.",
    items: [
      {
        icon: ChartLine,
        title: "62× cheaper than EFS",
        desc: `AWS EFS costs $0.30/GB ($307/TB). Fil One costs ${PRICE_PER_TB_SHORT}. At 10 TB of training data, that is $3,072/month vs $50 — before a single training run reads a byte.`,
      },
      {
        icon: ArrowsOut,
        title: "No egress on training reads",
        desc: "Each training run reads the full dataset. On AWS S3, 20 runs a month over 10 TB costs $18,432 in egress alone. On Fil One, every read is included in flat storage.",
      },
      {
        icon: Plug,
        title: "fsspec / PyArrow / HuggingFace native",
        desc: "PyTorch DataLoader, JAX, HuggingFace datasets, and PyArrow all support S3-compatible storage via fsspec. Change the endpoint — nothing else changes.",
      },
      {
        icon: Database,
        title: "Flat cost at any run frequency",
        desc: `Run training 5 times or 500 times. The storage bill is the TB you keep times ${PRICE_DISPLAY}. Run frequency is an engineering decision, not a cost one.`,
      },
    ],
  },

  cta: {
    heading: "Run as many times as the model needs.",
    subhead: "Free 30-day trial with 1 TB of storage and 2 TB of egress. Point fsspec or PyArrow at the endpoint and run the training loop — the egress line will not be there.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const MlTrainingLandingPage = () => <LandingPage config={config} />;

export default MlTrainingLandingPage;
