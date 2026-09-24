import { ArrowsOut, ChartLine, Plug, Lock } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { COMPETITORS, PRICE_PER_TB, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

/** Whole-dollar display for a monthly total, e.g. 599 -> "$599". */
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const byName = (name: string) => COMPETITORS.find((c) => c.name === name)!;
const WASABI = byName("Wasabi");
const B2 = byName("Backblaze B2");
const R2 = byName("Cloudflare R2");

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// Exit cost scenario: 100 TB moved out.
// AWS S3 eu-west-1, tiered egress: 10,240 GB x $0.09 + 40,960 GB x $0.085 + 51,200 GB x $0.07
//   = $921.60 + $3,481.60 + $3,584 = $7,987.20.
//   500 TB: the above bands + 102,400 GB x $0.07 + 358,400 GB x $0.05 = $29,491.20.
// AWS storage 100 TB: 51,200 GB x $0.023 + 51,200 GB x $0.022 = $2,304.
// Wasabi, Cloudflare R2, Fil One: $0 egress. Backblaze B2: egress free up to 3x stored
// (300 TB here), so a 100 TB exit is $0. Storage from COMPETITORS / PRICE_PER_TB.
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
        <span className="text-brand-500">before you need it</span>
      </>
    ),
    description: "S3-compatible object storage. Move in and out with the same tools. No egress penalty on the way out.",
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to sales", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The mechanism",
    heading: "Egress is the lock-in mechanism, not the vendor relationship.",
    sub: "Hyperscaler object storage is cheap to enter and expensive to leave. The exit cost is not in the contract; it is in the egress rate. Portability requires planning it in before the data accumulates.",
    items: [
      {
        label: "The entry cost",
        tone: "warning",
        catch: "Cheap to start. Invisible exit bill.",
        body: "Hyperscaler storage is priced to win the initial migration. The egress charge is the asymmetry: it does not appear until data is large enough that the exit cost becomes a reason to stay.",
      },
      {
        label: "The growth trap",
        tone: "danger",
        catch: "The bigger the dataset, the more it costs to leave.",
        body: "At up to $0.09/GB egress, moving 100 TB off AWS costs $7,987. Moving 500 TB costs $29,491. The cost of portability scales linearly with the value of the data you have accumulated.",
      },
      {
        label: "The architecture constraint",
        tone: "brand",
        catch: "Portability requires designing for it early.",
        body: "Teams that want multi-cloud flexibility discover it requires storage that does not penalize the decision. By the time the evaluation happens, the exit cost is already large enough to be a negotiating point.",
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
    sub: "Same dataset, five providers. Monthly storage and the one-time cost to migrate 100 TB to another provider.",
    subMaxWidth: 620,
    caption: "Monthly storage and one-time cost to exit 100 TB, by provider",
    columns: [
      { key: "storage", header: "100 TB/mo storage" },
      { key: "rate", header: "Egress rate", colorByValue: true },
      { key: "exit", header: "Exit bill (100 TB)", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$2,304", rate: "up to $0.09/GB", exit: "$7,987" } },
      { provider: "Cloudflare R2", values: { storage: usd(100 * R2.storagePricePerTB), rate: "$0", exit: "$0" } },
      { provider: "Wasabi", values: { storage: usd(100 * WASABI.storagePricePerTB), rate: "$0", exit: "$0" } },
      {
        provider: "Backblaze B2",
        values: {
          storage: usd(100 * B2.storagePricePerTB),
          rate: `$0 up to ${B2.freeEgressMultiplier}x stored`,
          exit: "$0",
        },
      },
      { provider: "Fil One", isFilOne: true, values: { storage: usd(100 * PRICE_PER_TB), rate: "$0", exit: "$0" } },
    ],
    footnote:
      `Storage at 100 TB using published rate cards, Q2 2026; AWS S3 Standard eu-west-1 (tiered, $2,304). AWS exit, tiered: 10,240 GB × $0.09 + 40,960 GB × $0.085 + 51,200 GB × $0.07 = $7,987.20. Cloudflare R2, Wasabi, and Fil One: $0 egress. Backblaze B2: egress free up to ${B2.freeEgressMultiplier}x stored per month, then $${B2.egressPricePerTB}/TB, so a 100 TB exit is $0.`,
  },

  features: {
    label: "Portable by default",
    heading: (
      <>
        An S3 endpoint that doesn't <span className="text-brand-500">penalize the exit.</span>
      </>
    ),
    sub: "Same tools, same APIs. The architecture that works today works tomorrow, on any cloud that reads S3.",
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
        desc: `One rate at ${PRICE_PER_TB_SHORT} regardless of read volume, request count, or where the data goes. Multi-cloud cost modeling has one fewer variable.`,
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
    subhead: "Free 1 TB evaluation. Point your S3 tools at the endpoint. The exit is $0 from day one.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to sales", href: SALES_URL },
    note: TAGLINE,
  },
};

const MultiCloudLandingPage = () => <LandingPage config={config} />;

export default MultiCloudLandingPage;
