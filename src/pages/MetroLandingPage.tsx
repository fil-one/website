import { ArrowsOut, ChartLine, Plug, Lightning } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// 10 TB stored, 10 TB read/month — same scenario as the egress page, for comparability.
// AWS S3 Standard us-east-1: 10,240 GB x $0.023 storage + 10,240 GB x $0.09 egress
//   = $235.52 + $921.60 = $1,157.12.
// GCP: $0.020/GB storage + $0.12/GB egress (first 10 TB tier).
// Azure: ~$0.018/GB storage + $0.087/GB egress. Wasabi $6.99/TB. Backblaze B2 $6/TB.
// Fil One: 10 x $4.99 = $49.90, $0 egress.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Hyperscaler speed. Budget-tier bills.",
    description: `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. Always-hot storage with no egress fees — fast reads without the hyperscaler price tag.`,
    canonical: "https://www.fil.one/lp/metro",
  },

  hero: {
    badge: "For SaaS and creative teams who need fast, affordable storage",
    titleMaxWidth: 720,
    descriptionMaxWidth: 580,
    title: (
      <>
        Hyperscaler speed.
        <br />
        <span className="text-brand-500">Budget-tier bills.</span>
      </>
    ),
    description: `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat, always hot with $0 egress fees — fast reads without the hyperscaler price tag.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The assumption",
    heading: "Fast and affordable storage are assumed to be a tradeoff. They aren't.",
    sub: "Hyperscalers price hot, instantly-readable storage at a premium and egress on top of it. The assumption is that avoiding that premium means archive tiers and retrieval delays. It doesn't have to.",
    subMaxWidth: 620,
    items: [
      {
        label: "The hot-tier premium",
        tone: "warning",
        catch: "Instantly-readable storage costs hyperscaler rates.",
        body: "AWS S3 Standard, Google Cloud Storage, and Azure Blob Hot all charge premium rates for storage with no archive delay and no rehydration wait. Teams pay hyperscaler prices just to avoid the archive-tier trade-off.",
      },
      {
        label: "The egress multiplier",
        tone: "danger",
        catch: "Reading your data adds to the bill every time.",
        body: "At $0.09/GB egress, a team reading 10 TB of assets per month pays $921 just to access their own data — on top of $236 in storage. Storing is cheap; reading is where the bill compounds.",
      },
      {
        label: "The cheap-but-slow assumption",
        tone: "brand",
        catch: "Teams assume affordable storage means archive tiers.",
        body: "The reason most teams stay on hyperscaler storage is the fear that cheaper alternatives are cold-tier, slow-to-restore options. Fil One is hot, S3-compatible storage at a flat rate — without the hyperscaler invoice.",
      },
    ],
  },

  comparison: {
    label: "The comparison",
    heading: (
      <>
        10 TB stored. <span className="text-brand-500">10 TB read per month.</span>
      </>
    ),
    sub: "Same workload, six providers. Storage is a small line — egress is the bill on hyperscalers. On Fil One, egress does not exist as a line item.",
    subMaxWidth: 620,
    caption: "Monthly cost for 10 TB stored, 10 TB read, by provider",
    columns: [
      { key: "storage", header: "Storage" },
      { key: "egress", header: "Egress", colorByValue: true },
      { key: "total", header: "Total / month", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$236", egress: "$922", total: "$1,157" } },
      { provider: "Google Cloud", values: { storage: "$205", egress: "$1,228", total: "$1,433" } },
      { provider: "Azure Blob (Hot)", values: { storage: "$184", egress: "$890", total: "$1,074" } },
      { provider: "Wasabi", values: { storage: "$70", egress: "$0", total: "$70" } },
      { provider: "Backblaze B2", values: { storage: "$60", egress: "$0", total: "$60" } },
      { provider: "Fil One", isFilOne: true, values: { storage: "$50", egress: "$0", total: "$50" } },
    ],
    footnote:
      "AWS S3 Standard, Google Cloud Storage, Azure Blob Hot — public US rate cards Q2 2026. AWS: 10,240 GB × $0.023 storage + 10,240 GB × $0.09 egress. GCP: $0.020/GB storage + $0.12/GB egress first 10 TB. Azure: ~$0.018/GB storage + $0.087/GB egress. Wasabi $6.99/TB. Backblaze B2 $6/TB. Fil One $4.99/TB, $0 egress.",
  },

  features: {
    label: "Why it works",
    heading: (
      <>
        Fast access. <span className="text-brand-500">Flat cost.</span>
      </>
    ),
    sub: "Always-hot, S3-compatible storage with no egress. The tradeoff between performance and cost doesn't hold here.",
    subMaxWidth: 560,
    items: [
      {
        icon: Lightning,
        title: "Always hot, never archived",
        desc: "No storage tiers, no rehydration wait, no retrieval fee. Every object is instantly readable, whether it was written a minute ago or a year ago.",
      },
      {
        icon: ArrowsOut,
        title: "No egress fees",
        desc: "$0 to read your own data. The cost of accessing your data is the same as the cost of storing it — nothing extra.",
      },
      {
        icon: Plug,
        title: "S3-compatible",
        desc: "Standard S3 API. The same SDKs, CLIs, and integrations your team already uses connect with an endpoint change. No migration project.",
      },
      {
        icon: ChartLine,
        title: "Flat, predictable cost",
        desc: `${PRICE_PER_TB_SHORT} regardless of how often you read or how fast your data grows. One rate. One line on the invoice.`,
      },
    ],
  },

  cta: {
    heading: "Hyperscaler speed. Budget-tier bills.",
    subhead: "Free 1 TB evaluation. Point your existing S3 tools at the endpoint and run the same workload.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const MetroLandingPage = () => <LandingPage config={config} />;

export default MetroLandingPage;
