import { ChartLine, ArrowsOut, Plug, Wallet } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_DISPLAY, PRICE_PER_TB, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

/** Whole-dollar display for a monthly total, e.g. 599 -> "$599". */
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// Scale-up comparison. AWS S3 Standard eu-west-1 tiered rates: $0.023/GB first 50 TB,
// $0.022 next 450 TB, $0.021 over 500 TB; egress $0.09/GB first 10 TB, $0.085 next 40 TB.
// Egress assumes 50% of stored volume read each month, a low estimate for active products.
//   1 TB:   1,024 x $0.023 = $23.55 + 512 x $0.09 = $46.08. Total $70.
//   10 TB:  10,240 x $0.023 = $235.52 + 5,120 x $0.09 = $460.80. Total $696.
//   50 TB:  51,200 x $0.023 = $1,177.60 + (10,240 x $0.09 + 15,360 x $0.085 = $2,227.20). Total $3,405.
//   100 TB: (51,200 x $0.023 + 51,200 x $0.022 = $2,304) + (10,240 x $0.09 + 40,960 x $0.085 = $4,403.20). Total $6,707.
// Fil One: TB x PRICE_PER_TB (computed below).
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Storage that doesn't outgrow your revenue",
    description: `Flat ${PRICE_PER_TB_SHORT} object storage for early-stage startups. No egress, no per-request fees, no surprise invoice. S3-compatible from day one.`,
    canonical: "https://www.fil.one/lp/startups",
  },

  hero: {
    badge: "For founders and first infra hires",
    titleMaxWidth: 780,
    descriptionMaxWidth: 560,
    title: (
      <>
        Your storage bill shouldn't
        <br />
        <span className="text-brand-500">outgrow your revenue</span>
      </>
    ),
    description: `${PRICE_PER_TB_SHORT} flat. No egress, no per-request fees, no surprise invoice. The line item you can defend in the next runway conversation.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to sales", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The trap",
    heading: "The cloud bill scales with success.",
    sub: "Hyperscaler pricing was written assuming the buyer is a hyperscaler customer. For a five-person startup, that means a bill that compounds with growth in three directions at once (storage tier, egress, and per-request fees), none of which line up with your revenue curve.",
    items: [
      {
        label: "Month 1",
        tone: "brand",
        catch: "The pricing looked reasonable.",
        body: "10 GB of user uploads, a few hundred reads a day. AWS sends a $2 bill. Nothing to worry about. The terms-of-service paragraph nobody read says egress is $0.09 per GB and PUTs are $5 per million.",
      },
      {
        label: "Month 12",
        tone: "brand",
        catch: "The bill grew faster than ARR.",
        body: "Product market fit. Usage 100×. The same line items now read $696 a month and climb every Monday morning. The default reaction is to spend an engineering sprint on caching, sampling, and CDNs to bend the curve down.",
      },
      {
        label: "Month 24",
        tone: "brand",
        catch: "You started running the bill, not building.",
        body: "A real Series A. Storage is now a board-level conversation. The CFO wants a forecast. The forecast has too many AWS knobs in it. Switching costs were quoted as an engineering quarter, so the line keeps growing.",
      },
    ],
  },

  comparison: {
    label: "Cost at scale",
    heading: (
      <>
        Same workload. <span className="text-brand-500">Different curves.</span>
      </>
    ),
    sub: "AWS S3 Standard at advertised rates, with 50% of stored data read each month. Fil One flat-rate against the same scenarios.",
    subMaxWidth: 620,
    caption: "Monthly cost at increasing scale, AWS S3 Standard vs Fil One",
    columns: [
      { key: "t1", header: "1 TB" },
      { key: "t10", header: "10 TB" },
      { key: "t50", header: "50 TB" },
      { key: "t100", header: "100 TB", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { t1: "$70", t10: "$696", t50: "$3,405", t100: "$6,707" } },
      {
        provider: "Fil One",
        isFilOne: true,
        values: {
          t1: usd(PRICE_PER_TB),
          t10: usd(10 * PRICE_PER_TB),
          t50: usd(50 * PRICE_PER_TB),
          t100: usd(100 * PRICE_PER_TB),
        },
      },
    ],
    footnote:
      "AWS S3 Standard storage tiers and egress rates from the public eu-west-1 Q2 2026 rate card. Egress estimated at 50% of stored volume read per month, conservative for an active product. Per-request fees not included.",
  },

  features: {
    label: "Why startups use it",
    heading: (
      <>
        Storage that <span className="text-brand-500">doesn't need a FinOps team.</span>
      </>
    ),
    sub: "One line, one rate. The thing you ship instead of the thing you optimize.",
    subMaxWidth: 560,
    items: [
      {
        icon: Wallet,
        title: "Predictable invoice",
        desc: `Multiply ${PRICE_DISPLAY} by the TB you keep. That number is the bill. Show it to the board without a caveat slide.`,
      },
      {
        icon: ChartLine,
        title: "Scales linearly, not exponentially",
        desc: "When usage doubles, the bill doubles. No tier transitions, no egress cliffs, no surprise PUT charges from a viral launch day.",
      },
      {
        icon: Plug,
        title: "S3-compatible from day one",
        desc: "boto3, AWS CLI, every SDK. You write the same code you would have on AWS. If you outgrow us, you can leave the same way.",
      },
      {
        icon: ArrowsOut,
        title: "No egress on customer reads",
        desc: "Customer downloads, embedded media, dashboard fetches, mobile app pulls: every read is included.",
      },
    ],
  },

  cta: {
    heading: "Pick the line item you don't have to optimize.",
    subhead: "Free 1 TB evaluation. The same SDK calls. A different bill.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to sales", href: SALES_URL },
    note: TAGLINE,
  },
};

const StartupsLandingPage = () => <LandingPage config={config} />;

export default StartupsLandingPage;
