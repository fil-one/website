import { Database, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// 10 TB checkpoints stored, 5 TB eval reads/month.
// AWS S3 Standard us-east-1 Q2 2026: storage 10,240 GB x $0.023 = $235.52,
// egress 5,120 GB x $0.09 = $460.80. Total $680/mo (rounded).
// Fil One: 10 TB x $4.99 = $49.90, egress $0.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Stop deleting checkpoints you'll want back",
    description: `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat. Keep every checkpoint, eval set, and training artifact without per-GB guilt. No egress fees on eval runs.`,
    canonical: "https://www.fil.one/lp/ml-checkpoints",
  },

  hero: {
    badge: "For ML engineers and research teams",
    titleMaxWidth: 760,
    descriptionMaxWidth: 580,
    title: (
      <>
        Stop deleting checkpoints
        <br />
        <span className="text-brand-500">you'll want back.</span>
      </>
    ),
    description: `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat. Keep every checkpoint, eval set, and training artifact without rationing by cost.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The trap",
    heading: "The bill decides which runs survive.",
    sub: "A checkpoint is 2–10 GB. A training run has dozens of them. At hyperscaler pricing, keeping the full history of an experiment — plus reading it back for evaluation — costs more than the training compute.",
    items: [
      {
        label: "The deletion decision",
        tone: "warning",
        catch: "Storage pressure picks which runs survive.",
        body: "A checkpoint file runs 2–10 GB. Keep 100 runs with 10 checkpoints each and you are holding 2–10 TB. On AWS S3 that is $46–$230/month in storage alone — before a single eval read.",
      },
      {
        label: "The eval bill",
        tone: "danger",
        catch: "Every eval run is an egress event.",
        body: "Loading checkpoints to run a benchmark reads them from storage back to compute. At $0.09/GB egress, reading 5 TB of checkpoints for a single eval pass costs $450. Teams learn to run fewer evals.",
      },
      {
        label: "The lost run",
        tone: "brand",
        catch: "The one you deleted was the one you needed.",
        body: "Six weeks later an ablation shows that the deleted run outperformed the saved checkpoint on the metric you did not track. The run is gone. The experiment restarts from zero.",
      },
    ],
  },

  comparison: {
    label: "The connection",
    heading: (
      <>
        Same boto3. Checkpoints that cost <span className="text-brand-500">what they weigh.</span>
      </>
    ),
    sub: "Point your existing checkpointing code at the Fil One endpoint. Eval reads are included in flat storage — no egress line.",
    subMaxWidth: 620,
    caption: "Monthly cost for 10 TB stored, 5 TB eval reads, AWS S3 Standard vs Fil One",
    columns: [
      { key: "breakdown", header: "Breakdown", note: true },
      { key: "total", header: "Total / month", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { breakdown: "$230 storage + $450 egress", total: "$680/mo" } },
      { provider: "Fil One", isFilOne: true, values: { breakdown: "10 TB × $4.99 — egress $0", total: "$49.90/mo" } },
    ],
    footnote:
      "AWS S3 Standard us-east-1 Q2 2026: $0.023/GB storage, $0.09/GB egress. Computed from stated inputs — 10,240 GB × $0.023 = $235.52 storage; 5,120 GB × $0.09 = $460.80 egress. Fil One: 10 TB × $4.99 = $49.90, egress $0.",
  },

  features: {
    label: "Why it works",
    heading: (
      <>
        Storage that scales with <span className="text-brand-500">experiment count, not bill.</span>
      </>
    ),
    sub: "The only change is the endpoint. The decision of which checkpoints to keep stops being a cost decision.",
    subMaxWidth: 560,
    items: [
      {
        icon: ArrowsOut,
        title: "No egress on eval runs",
        desc: "Load any checkpoint, any number of times. Evaluation loops do not add to the bill. Run as many evals as your team needs.",
      },
      {
        icon: Database,
        title: "Keep every run",
        desc: "10 TB of checkpoints costs $49.90/month. 100 TB costs $499. The rate stays flat. Deleting early runs to save money stops being a decision.",
      },
      {
        icon: ChartLine,
        title: "Predictable cost",
        desc: `One flat rate per TB. No request fees, no retrieval tiers. The storage line is storage volume times ${PRICE_DISPLAY}.`,
      },
      {
        icon: Plug,
        title: "S3-compatible",
        desc: "boto3, HuggingFace Hub, PyTorch Lightning checkpointing — any S3-compatible tool connects with an endpoint swap and no SDK changes.",
      },
    ],
  },

  cta: {
    heading: "Keep every checkpoint.",
    subhead: "Free 30-day trial with 1 TB of storage and 2 TB of egress. Point your existing checkpoint code at the endpoint and stop rationing runs.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const CheckpointsLandingPage = () => <LandingPage config={config} />;

export default CheckpointsLandingPage;
