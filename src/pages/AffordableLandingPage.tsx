import { ArrowsOut, ChartLine, Plug, Database } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// What you actually pay on each provider for a simple 10 TB workload, light reads.
// 10 TB stored, 2 TB read/month, 100K GET operations.
// AWS: 10,240x$0.023=$235.52 storage + 2,048x$0.09=$184.32 egress + 100Kx$0.0004/1K=$0.04 api ~ $420.
// Google: 10,240x$0.020=$204.80 storage + 2,048x$0.12=$245.76 egress ~ $451.
// Wasabi: 10TBx$6.99=$69.90 (90-day min billing), $0 egress. Backblaze B2: 10TBx$6=$60, $0 egress.
// Fil One: 10TBx$4.99=$49.90, $0 egress, $0 api.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Make storage your lowest line item",
    description: `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. No egress fees, no per-request charges, no confusing billing. One number. Start in minutes.`,
    canonical: "https://www.fil.one/lp/affordable",
  },

  hero: {
    badge: "Simple, affordable S3-compatible storage",
    titleMaxWidth: 800,
    descriptionMaxWidth: 580,
    title: (
      <>
        Make storage your lowest line item
        <br />
        <span className="text-brand-500">and the last thing you worry about.</span>
      </>
    ),
    description: `${PRICE_PER_TB_SHORT} flat. No egress fees, no per-request charges, no confusing billing tiers. Buckets and retrieval work exactly as you expect.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The billing problem",
    heading: "Object storage should be simple to price. It rarely is.",
    sub: "Hyperscaler storage bills have a storage line, an egress line, a request line, and a retrieval tier line. Predicting next month's invoice requires a spreadsheet, not a multiplication.",
    items: [
      {
        label: "Four line items",
        tone: "warning",
        catch: "Storage is just one of the charges.",
        body: "AWS S3 Standard charges for storage, egress out to the internet, PUT operations, GET operations, and retrieval (if using Glacier tiers). Each line item has its own rate card. The total requires a calculator, not a guess.",
      },
      {
        label: "Egress surprise",
        tone: "danger",
        catch: "The biggest line comes from reading your data.",
        body: "At $0.09/GB, downloading 2 TB from AWS costs $184 — 78% of the $236 storage charge for that 10 TB dataset. The bill for 'storing' data is smaller than the bill for using it.",
      },
      {
        label: "The switch friction",
        tone: "brand",
        catch: "Migration looks hard. It isn't.",
        body: "Teams stay on expensive storage because switching seems like a project. Fil One implements the same S3 API — any tool that writes S3 today connects with a one-line config change.",
      },
    ],
  },

  comparison: {
    label: "Side by side",
    heading: (
      <>
        10 TB stored, <span className="text-brand-500">2 TB read per month.</span>
      </>
    ),
    sub: "A modest workload, five providers. The egress column is where hyperscaler bills diverge from the others.",
    subMaxWidth: 620,
    caption: "Monthly cost for 10 TB stored, 2 TB read, by provider",
    columns: [
      { key: "storage", header: "Storage" },
      { key: "egress", header: "Egress", colorByValue: true },
      { key: "api", header: "API / ops", colorByValue: true },
      { key: "total", header: "Total / month", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$236", egress: "$184", api: "$0.04", total: "$420" } },
      { provider: "Google Cloud", values: { storage: "$205", egress: "$246", api: "$0.05", total: "$451" } },
      { provider: "Wasabi", values: { storage: "$70", egress: "$0", api: "$0", total: "$70" } },
      { provider: "Backblaze B2", values: { storage: "$60", egress: "$0", api: "$0", total: "$60" } },
      { provider: "Fil One", isFilOne: true, values: { storage: "$50", egress: "$0", api: "$0", total: "$50" } },
    ],
    footnote:
      "Public US rate cards Q2 2026. AWS: 10,240 GB × $0.023 = $235.52 storage + 2,048 GB × $0.09 = $184.32 egress. Google: 10,240 × $0.020 = $204.80 + 2,048 × $0.12 = $245.76. Wasabi $6.99/TB, no egress. Backblaze B2 $6/TB, no egress. Fil One $4.99/TB, no egress, no per-request fees.",
  },

  features: {
    label: "Why it's simple",
    heading: (
      <>
        Storage that works like <span className="text-brand-500">it says on the tin.</span>
      </>
    ),
    sub: "One rate, no metered lines underneath it.",
    items: [
      {
        icon: ChartLine,
        title: "One number on the invoice",
        desc: `Storage volume times ${PRICE_DISPLAY}. No egress column, no request column, no retrieval tier. The invoice has one line.`,
      },
      {
        icon: ArrowsOut,
        title: "No egress fees",
        desc: "Reads are included in flat storage. Download your own data as many times as you need — $0 in egress.",
      },
      {
        icon: Plug,
        title: "S3-compatible, zero migration cost",
        desc: "Existing SDKs, tools, and scripts connect with an endpoint change. No rewrite, no new library, no operational overhead.",
      },
      {
        icon: Database,
        title: "Flat at any scale",
        desc: `${PRICE_PER_TB_SHORT} whether you store 1 TB or 100 TB. The rate per TB does not change as you grow.`,
      },
    ],
  },

  cta: {
    heading: "One number. No surprises.",
    subhead: "Free 30-day trial with 1 TB of storage and 2 TB of egress. Swap the endpoint in your S3 config and check the invoice at the end of the trial.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const AffordableLandingPage = () => <LandingPage config={config} />;

export default AffordableLandingPage;
