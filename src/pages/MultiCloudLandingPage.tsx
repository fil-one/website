import { ArrowsOut, ChartLine, Plug, Lock } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// Exit cost scenario: 100 TB moved out.
// AWS S3 us-east-1: 102,400 GB x $0.09 = $9,216.
// GCP Standard: tiered — 10 TB @ $0.12 + 40 TB @ $0.11 + 50 TB @ $0.08 = $9,831.
// Azure Blob Hot: tiered — 10 TB @ $0.087 + 40 TB @ $0.083 + 50 TB @ $0.07 = $7,602.
// Wasabi, Backblaze B2, Fil One: $0.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Design your exit before you need it",
    description: `S3-compatible object storage with $0 egress. No exit penalty. Move in and out with the same S3 tools and no egress bill. Flat ${PRICE_PER_TB_SHORT}.`,
    canonical: "https://www.fil.one/lp/multi-cloud",
  },

  hero: {
    badge: "For infra leads designing for portability",
    titleMaxWidth: 760,
    descriptionMaxWidth: 580,
    title: (
      <>
        Design your exit
        <br />
        <span className="text-brand-500">before you need it.</span>
      </>
    ),
    description: "S3-compatible object storage. Move in and out with the same tools. No egress penalty on the way out.",
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The mechanism",
    heading: "Egress is the lock-in mechanism, not the vendor relationship.",
    sub: "Hyperscaler object storage is cheap to enter and expensive to leave. The exit cost is not in the contract. It is in the egress rate. Portability requires planning it in before the data accumulates.",
    items: [
      {
        label: "The entry cost",
        tone: "warning",
        catch: "Cheap to start. Invisible exit bill.",
        body: "Hyperscaler storage is priced to win the initial migration. The egress charge is the asymmetry. It does not appear until data is large enough that the exit cost becomes a reason to stay.",
      },
      {
        label: "The growth trap",
        tone: "danger",
        catch: "The bigger the dataset, the more it costs to leave.",
        body: "At $0.09/GB egress, moving 100 TB off AWS costs $9,216. Moving 500 TB costs $46,080. The cost of portability scales linearly with the value of the data you have accumulated.",
      },
      {
        label: "The architecture constraint",
        tone: "brand",
        catch: "Portability requires designing for it early.",
        body: "Teams that want multi-cloud flexibility discover it requires storage that does not penalise the decision. By the time the evaluation happens, the exit cost is already large enough to be a negotiating point.",
      },
    ],
  },

  comparison: {
    label: "The exit comparison",
    heading: (
      <>
        100 TB. <span className="text-brand-500">What it costs to leave.</span>
      </>
    ),
    sub: "Same dataset, six providers. Monthly storage and the one-time cost to migrate 100 TB to another provider.",
    subMaxWidth: 620,
    caption: "Monthly storage and one-time cost to exit 100 TB, by provider",
    columns: [
      { key: "storage", header: "100 TB/mo storage" },
      { key: "rate", header: "Egress rate", colorByValue: true },
      { key: "exit", header: "Exit bill (100 TB)", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$2,355", rate: "$0.09/GB", exit: "$9,216" } },
      { provider: "Google Cloud Storage", values: { storage: "$2,048", rate: "up to $0.12/GB", exit: "$9,831" } },
      { provider: "Azure Blob (Hot)", values: { storage: "$1,843", rate: "up to $0.087/GB", exit: "$7,602" } },
      { provider: "Wasabi", values: { storage: "$700", rate: "$0", exit: "$0" } },
      { provider: "Backblaze B2", values: { storage: "$600", rate: "$0", exit: "$0" } },
      { provider: "Fil One", isFilOne: true, values: { storage: "$499", rate: "$0", exit: "$0" } },
    ],
    footnote:
      "Storage at 100 TB using published US rate cards, Q2 2026. AWS exit: 102,400 GB × $0.09 = $9,216. GCP exit: tiered, 10 TB @ $0.12 + 40 TB @ $0.11 + 50 TB @ $0.08 = $9,831. Azure exit: tiered, 10 TB @ $0.087 + 40 TB @ $0.083 + 50 TB @ $0.07 = $7,602. Wasabi, Backblaze B2, Fil One: $0 egress.",
  },

  features: {
    label: "Portable by default",
    heading: (
      <>
        An S3 endpoint that doesn't <span className="text-brand-500">penalise the exit.</span>
      </>
    ),
    sub: "Same tools, same APIs. The architecture that works today works tomorrow. On any cloud that reads S3.",
    items: [
      {
        icon: Plug,
        title: "S3-compatible portability",
        desc: "Any tool that writes S3 (SDKs, rclone, s5cmd, Terraform) works with an endpoint change. Moving in does not require a rewrite. Moving out does not either.",
      },
      {
        icon: ArrowsOut,
        title: "No exit egress",
        desc: "$0 to move 100 TB out. The exit cost that locks teams into a cloud is not a line item here. Portability is default, not a feature you negotiate.",
      },
      {
        icon: ChartLine,
        title: "Flat, predictable cost",
        desc: `One rate at ${PRICE_PER_TB_SHORT} regardless of read volume, request count, or where the data goes. Multi-cloud cost modelling has one fewer variable.`,
      },
      {
        icon: Lock,
        title: "Object Lock for compliance",
        desc: "Configure retention from 1 day to 100 years at the bucket level, for data that must not be altered or deleted early, even mid-migration.",
      },
    ],
  },

  cta: {
    heading: "Portable by default, not by promise.",
    subhead: "Free 30-day trial with 1 TB of storage and 2 TB of egress. Point your S3 tools at the endpoint. The exit is $0 from day one.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const MultiCloudLandingPage = () => <LandingPage config={config} />;

export default MultiCloudLandingPage;
