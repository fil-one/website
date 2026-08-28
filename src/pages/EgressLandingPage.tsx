import { ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Read your own data without the bill",
    description: `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. No egress fees. No per-request charges. Built for analytics, ML, and feature-store teams whose bill is driven by reading.`,
    canonical: "https://www.fil.one/lp/egress",
  },

  hero: {
    badge: "For teams whose bill is driven by reading, not storing",
    titleMaxWidth: 720,
    descriptionMaxWidth: 560,
    title: (
      <>
        Your storage is cheap.
        <br />
        <span className="text-brand-500">Using it isn't.</span>
      </>
    ),
    description: `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. No egress. No per-request fees. Read your warehouse, eval set, or media library as often as your team needs to.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The trap",
    heading: "The bill grows with how often you read, not how much you keep.",
    sub: "Object storage pricing was written for a world where data sat still. Then teams started reading it. Now the storage line item is a rounding error and the egress line item is the bill.",
    items: [
      {
        label: "What you signed up for",
        tone: "brand",
        catch: "Storage is the line you priced.",
        body: "$0.023 per GB-month for storage. A 10 TB dataset is $236 a month. Reasonable. Manageable. Sized for the budget conversation.",
      },
      {
        label: "What you actually pay",
        tone: "warning",
        catch: "Egress is the line that grew.",
        body: "$0.09 per GB out to the internet. The same 10 TB read once a month is another $913. Read it on every dashboard refresh, every eval run, every customer fetch, and the bill compounds the way nobody priced for.",
      },
      {
        label: "What that costs you",
        tone: "danger",
        catch: "You start rationing your own data.",
        body: "Teams start sampling, caching, gating who can re-run a notebook. The dataset becomes harder to use the more useful it gets. Reads turn into a budget conversation instead of an engineering one.",
      },
    ],
  },

  // Scenario: 10 TB stored + 10 TB read per month + 500K object operations.
  // USD, computed from published rate cards (US, Q2 2026) — see the footnote.
  comparison: {
    label: "The comparison",
    heading: (
      <>
        Read 10 TB a month. <span className="text-brand-500">See where it lands.</span>
      </>
    ),
    sub: "A 10 TB dataset, read in full each month, with 500,000 object operations. Same workload, six providers. Storage is a small slice; egress is the bill.",
    subMaxWidth: 620,
    caption: "Monthly cost for a 10 TB dataset read in full each month, by provider",
    columns: [
      { key: "region", header: "Region" },
      { key: "storage", header: "Storage" },
      { key: "egress", header: "Egress", colorByValue: true },
      { key: "api", header: "API / ops", colorByValue: true },
      { key: "total", header: "Total / month", total: true },
    ],
    rows: [
      {
        provider: "AWS S3 Standard",
        values: { region: "us-east-1", storage: "$236", egress: "$913", api: "$2.50", total: "$1,151" },
      },
      {
        provider: "Google Cloud Storage",
        values: { region: "us multi-region", storage: "$205", egress: "$1,228", api: "$2.50", total: "$1,436" },
      },
      {
        provider: "Azure Blob (Hot)",
        values: { region: "East US", storage: "$184", egress: "$882", api: "$2.70", total: "$1,069" },
      },
      {
        provider: "Wasabi",
        values: { region: "us-east-1", storage: "$70", egress: "$0", api: "$0", total: "$70" },
      },
      {
        provider: "Backblaze B2",
        values: { region: "us-west-002", storage: "$60", egress: "$0", api: "$0", total: "$60" },
      },
      {
        provider: "Fil One",
        isFilOne: true,
        values: { region: "global", storage: "$50", egress: "$0", api: "$0", total: "$50" },
      },
    ],
    footnote:
      "AWS S3 Standard, Google Cloud Storage Standard, and Azure Blob Hot egress and request fees taken from public US rate cards (Q2 2026). Storage shown at first-50 TB tier; egress at first-10 TB tier; ops at 500K mixed PUT/GET. Wasabi flat $6.99/TB; Backblaze B2 $6/TB with first 3× stored-volume egress included.",
  },

  workloads: {
    label: "Read-heavy workloads",
    heading: "Built for the way data actually gets used.",
    sub: "Egress goes from the biggest line item to no line item at all.",
    subMaxWidth: 500,
    items: [
      {
        tag: "Analytics",
        title: "Read your warehouse layer over and over",
        desc: "BI dashboards, ad-hoc SQL, scheduled exports. Each fresh query pulls a slice of the Parquet layer back out. On AWS, every pull is a line item.",
        stats: [
          {
            label: "Egress on 10 TB monthly reads",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "AWS S3", val: "$913" },
            ],
          },
          {
            label: "Annualised egress alone",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "AWS S3", val: "$10,956" },
            ],
          },
        ],
        speedBadge: "Same S3 SDK your warehouse already uses.",
        savingsBadge: "$11k/yr saved",
      },
      {
        tag: "Feature stores",
        title: "Serve features to every training job and online lookup",
        desc: "Training loops read the same feature set across hundreds of runs. Online inference re-reads the latest snapshot at request time. Reads dominate the bill.",
        stats: [
          {
            label: "Egress on 25 TB monthly reads",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "AWS S3", val: "$2,253" },
            ],
          },
          {
            label: "Per-GB egress rate",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "AWS S3", val: "$0.09" },
            ],
          },
        ],
        speedBadge: "Read budget stops capping experiment count.",
        savingsBadge: "$27k/yr saved",
      },
      {
        tag: "ML evals",
        title: "Re-run evals on the full set, every release",
        desc: "Eval pipelines pull the entire benchmark corpus each time you ship a model. On hyperscaler storage, you pay the same retrieval bill on every run.",
        stats: [
          {
            label: "Per-run egress (5 TB corpus)",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "AWS S3", val: "$451" },
            ],
          },
          {
            label: "12 runs per month",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "AWS S3", val: "$5,408" },
            ],
          },
        ],
        speedBadge: "Run evals as often as your team needs.",
        savingsBadge: "$65k/yr saved",
      },
      {
        tag: "Customer-facing reads",
        title: "Serve files to every paying user",
        desc: "Document vaults, media libraries, dataset distribution. Every paying customer pulling a file is a charge on AWS. On Fil One, it is free.",
        stats: [
          {
            label: "Egress on 1M user fetches (avg 5 MB)",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "AWS S3", val: "$439" },
            ],
          },
          {
            label: "Cost per fetch",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "AWS S3", val: "$0.00044" },
            ],
          },
        ],
        speedBadge: "Stop instrumenting reads to defend the bill.",
        savingsBadge: "Margin restored",
      },
    ],
  },

  metrics: {
    label: "Pricing",
    heading: (
      <>
        One rate. <span className="text-brand-500">{PRICE_PER_TB_MONTH}.</span>
      </>
    ),
    sub: "Storage. That is the whole bill. No egress fees. No per-request charges. No retrieval tier. The number on the invoice is the rate times the TB you keep.",
    subMaxWidth: 520,
    valueSize: "lg",
    items: [
      { icon: ArrowsOut, label: "Egress", value: "$0", note: "Read as often as you want." },
      { icon: ChartLine, label: "Per-request fees", value: "$0", note: "PUT, GET, LIST — all included." },
      { icon: Plug, label: "S3 compatibility", value: "Drop-in", note: "Point your SDK at the endpoint." },
    ],
  },

  cta: {
    heading: "Stop paying to read your own data.",
    subhead: "Free 30-day trial with 1 TB of storage and 2 TB of egress. Drop your existing S3 endpoint in and run the same queries.",
    headingMaxWidth: 560,
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const EgressLandingPage = () => <LandingPage config={config} />;

export default EgressLandingPage;
