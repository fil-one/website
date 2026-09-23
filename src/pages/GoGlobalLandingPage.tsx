import { ArrowsOut, ChartLine, Plug, ShieldCheck } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

/** Whole-dollar display for a monthly total, e.g. 5990 -> "$5,990". */
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

const TAGLINE = "Enterprise and embedding terms available · Contact-led";

// Scale cost comparison. AWS S3 Standard eu-west-1 Q2 2026: tiered storage
// $0.023/GB first 50 TB, $0.022/GB next 450 TB, $0.021/GB over 500 TB.
// Fil One PRICE_PER_TB flat. Storage only; egress additional on AWS, $0 on Fil One.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Go global. Skip the multi-year build.",
    description: `Embed S3-compatible object storage into your product. US and EU regions, SLA-backed, ${PRICE_PER_TB_SHORT} flat. No capex, no infrastructure build — contact for enterprise and embedding terms.`,
    canonical: "https://www.fil.one/lp/go-global",
  },

  hero: {
    badge: "For data-heavy scale-ups",
    titleMaxWidth: 760,
    descriptionMaxWidth: 600,
    title: (
      <>
        Go global.
        <br />
        <span className="text-brand-500">Skip the multi-year build</span>
      </>
    ),
    description: `Embed S3-compatible object storage into your product. US and EU regions, SLA-backed, ${PRICE_PER_TB_SHORT} flat. Your customers get reliable storage, and you skip the infrastructure capex.`,
    ctas: [
      { label: "Talk to sales", href: SALES_URL, variant: "primary" },
      { label: "Start for free", href: signupUrl(), variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The build vs buy decision",
    heading: "Building globally competitive storage infrastructure takes years and serious capex.",
    sub: "Data-heavy scale-ups that want to offer storage as a first-class product feature face a choice: build the infrastructure themselves (3–5 years, significant capex) or stay regional. Embedding Fil One removes the infrastructure build from the roadmap.",
    subMaxWidth: 620,
    items: [
      {
        label: "The build cost",
        tone: "warning",
        catch: "Durable S3-compatible storage at scale takes years.",
        body: "Durability, S3 API parity, multi-region replication, and operational tooling at petabyte scale is a multi-year engineering program. A product team that builds this is not building the product.",
      },
      {
        label: "The capex ceiling",
        tone: "danger",
        catch: "Hardware cycles don't match customer growth.",
        body: "On-premise or co-lo storage infrastructure scales in discrete hardware increments. Teams overbuild capacity and carry unused cost, or underbuild and miss customer demand. A pay-per-use layer removes the commitment.",
      },
      {
        label: "The regional trap",
        tone: "brand",
        catch: "Staying single-region limits the addressable market.",
        body: "A product that only serves one region competes against hyperscalers that serve many. Embedding a multi-region storage layer lets the product serve customers across the US and EU without the multi-year infrastructure investment.",
      },
    ],
  },

  comparison: {
    label: "The cost model",
    heading: (
      <>
        Storage that <span className="text-brand-500">scales linearly with your product.</span>
      </>
    ),
    sub: "Monthly storage cost at different scales. AWS S3 Standard (tiered) vs Fil One flat rate. The gap widens as the product grows.",
    subMaxWidth: 620,
    caption: "Monthly storage cost at increasing scale, AWS S3 Standard vs Fil One",
    columns: [
      { key: "t10", header: "10 TB" },
      { key: "t100", header: "100 TB" },
      { key: "t500", header: "500 TB" },
      { key: "t1000", header: "1 PB", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { t10: "$236", t100: "$2,304", t500: "$11,315", t1000: "$22,067" } },
      {
        provider: "Fil One",
        isFilOne: true,
        values: {
          t10: usd(10 * PRICE_PER_TB),
          t100: usd(100 * PRICE_PER_TB),
          t500: usd(500 * PRICE_PER_TB),
          t1000: usd(1000 * PRICE_PER_TB),
        },
      },
    ],
    footnote:
      `AWS S3 Standard eu-west-1 Q2 2026: tiered storage $0.023/GB first 50 TB, $0.022/GB next 450 TB, $0.021/GB over 500 TB. Fil One ${PRICE_PER_TB_SHORT} flat. Storage only; egress additional on AWS, $0 on Fil One.`,
  },

  features: {
    label: "For product teams",
    heading: (
      <>
        Storage that your <span className="text-brand-500">customers already know how to use.</span>
      </>
    ),
    sub: "S3-compatible, no egress, and enterprise terms, built to embed.",
    items: [
      {
        icon: Plug,
        title: "S3-compatible from day one",
        desc: "Your customers use the same SDKs, CLIs, and integrations they already run. No custom adapter, no lock-in to a proprietary API surface.",
      },
      {
        icon: ArrowsOut,
        title: "No egress for your customers",
        desc: "Customers who read their own data at scale pay $0 in egress. A storage product that doesn't penalize usage is easier to sell.",
      },
      {
        icon: ShieldCheck,
        title: "SLA-backed, enterprise terms",
        desc: "Capacity assurance and deployment SLAs available on 1, 3, and 5-year terms via the Business plan. Predictable infrastructure for a predictable product.",
      },
      {
        icon: ChartLine,
        title: "Flat pricing that scales linearly",
        desc: `${PRICE_PER_TB_SHORT} regardless of volume. At 1 PB, that is ${usd(1000 * PRICE_PER_TB)}/month, a number you can build a product margin on. No tier waterfall to model.`,
      },
    ],
  },

  cta: {
    heading: "Global reach in your product. None of the capex.",
    subhead: "Talk to the Fil One team about embedding the storage layer in your product. Enterprise and multi-year terms available.",
    cta: { label: "Talk to sales", href: SALES_URL },
    secondaryCta: { label: "Start for free", href: signupUrl() },
    note: "Enterprise and embedding terms available · sales@fil.one",
  },
};

const GoGlobalLandingPage = () => <LandingPage config={config} />;

export default GoGlobalLandingPage;
