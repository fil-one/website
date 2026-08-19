import { ChartLine, ArrowsOut, Plug, Wallet } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// Scale-up comparison. AWS S3 Standard tiered rates: $0.023/GB first 50 TB,
// $0.022 next 450 TB, $0.021 over 500 TB, plus $0.09/GB egress. Egress assumes
// 50% of stored volume read each month — a low estimate for active product workloads.
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
        <span className="text-brand-500">outgrow your revenue.</span>
      </>
    ),
    description: `${PRICE_PER_TB_SHORT} flat. No egress, no per-request fees, no surprise invoice. The line item you can defend in the next runway conversation.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The trap",
    heading: "The cloud bill scales with success.",
    sub: "Hyperscaler pricing was written assuming the buyer is a hyperscaler customer. For a five-person startup, that means a bill that compounds with growth in three directions at once — storage tier, egress, and per-request fees — none of which line up with your revenue curve.",
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
        body: "Product market fit. Usage 100×. The same line items now read $687 a month and climb every Monday morning. The default reaction is to spend an engineering sprint on caching, sampling, and CDNs to bend the curve down.",
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
      { provider: "AWS S3 Standard", values: { t1: "$69", t10: "$687", t50: "$3,428", t100: "$6,753" } },
      { provider: "Fil One", isFilOne: true, values: { t1: "$5", t10: "$50", t50: "$250", t100: "$499" } },
    ],
    footnote:
      "AWS S3 Standard storage tiers and egress rates from public US Q2 2026 rate card. Egress estimated at 50% of stored volume read per month — conservative for an active product. Per-request fees not included.",
  },

  features: {
    label: "Why startups use it",
    heading: (
      <>
        Storage that <span className="text-brand-500">doesn't need a FinOps team.</span>
      </>
    ),
    sub: "One line, one rate. The thing you ship instead of the thing you optimise.",
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
        desc: "Customer downloads, embedded media, dashboard fetches, mobile app pulls — every read is included.",
      },
    ],
  },

  cta: {
    heading: "Pick the line item you don't have to optimise.",
    subhead: "Free 1 TB evaluation. The same SDK calls. A different bill.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const StartupsLandingPage = () => <LandingPage config={config} />;

export default StartupsLandingPage;
