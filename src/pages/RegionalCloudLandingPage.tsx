import { ArrowsOut, ChartLine, Plug, ShieldCheck } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "Partner and enterprise terms available · Contact-led";

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Offer production-grade storage without building it",
    description: "S3-compatible object storage infrastructure you can embed in your regional cloud offering. SLA-backed, partner-ready. Contact for commercial terms.",
    canonical: "https://www.fil.one/lp/regional-cloud",
  },

  hero: {
    badge: "For teams building regional or sovereign cloud offerings",
    titleMaxWidth: 800,
    descriptionMaxWidth: 580,
    title: (
      <>
        Offer production-grade storage
        <br />
        <span className="text-brand-500">without building it.</span>
      </>
    ),
    description: "S3-compatible object storage infrastructure you can embed in your cloud product. SLA-backed, partner-ready, flat pricing.",
    ctas: [
      { label: "Talk to our team", href: SALES_URL, variant: "primary" },
      { label: "Evaluate the API", href: signupUrl(), variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "Build vs buy",
    heading: "Storage infrastructure is a capex commitment, not a feature.",
    sub: "Building durable, S3-compatible object storage from scratch requires hardware capex, operational headcount, and years of iteration. Partners who embed Fil One skip that — and launch with a production-grade storage layer on day one.",
    items: [
      {
        label: "The build cost",
        tone: "warning",
        catch: "Storage infrastructure takes years to mature.",
        body: "Durability, consistency, and S3 compatibility at scale are unsolved by a small engineering team quickly. A regional cloud that builds storage internally competes with its own roadmap.",
      },
      {
        label: "The capex commitment",
        tone: "danger",
        catch: "Hardware cycles do not match customer growth.",
        body: "On-premise storage scales in discrete increments. Over-provisioning is expensive. Under-provisioning means customer SLA failures. Embedding a pay-per-use layer removes the hardware commitment.",
      },
      {
        label: "The integration tax",
        tone: "brand",
        catch: "Customers want S3. Not a proprietary API.",
        body: "A storage product that requires its own SDK loses customers to hyperscalers immediately. S3 compatibility means every existing tool, SDK, and workflow that customers already run will work on day one.",
      },
    ],
  },

  features: {
    label: "Partner capabilities",
    heading: (
      <>
        What your cloud <span className="text-brand-500">runs on.</span>
      </>
    ),
    sub: "SLA-backed capacity, full S3 compatibility, and flat pricing — the storage layer your customers see is standard S3, no custom integration required.",
    items: [
      {
        icon: Plug,
        title: "S3-compatible API",
        desc: "Your customers use standard S3 tooling — the same SDKs, CLIs, and integrations they already run. No custom adapters.",
      },
      {
        icon: ShieldCheck,
        title: "SLA-backed infrastructure",
        desc: "Deployment SLAs for capacity assurance, available on 1, 3, and 5-year terms via the Business plan.",
      },
      {
        icon: ArrowsOut,
        title: "No egress penalty",
        desc: "Your customers move data in and out without egress fees. The cost model does not penalise usage — predictable for them and for you.",
      },
      {
        icon: ChartLine,
        title: "Flat, predictable pricing",
        desc: `${PRICE_PER_TB_MONTH}, no egress, no per-request fees. Simple cost modelling for your own pricing layer.`,
      },
    ],
  },

  cta: {
    heading: "Your cloud. Our storage layer underneath.",
    subhead: "Talk to the Fil One partnerships team about embedding the storage layer in your cloud product. Enterprise and multi-year terms available.",
    cta: { label: "Talk to our team", href: SALES_URL },
    secondaryCta: { label: "Evaluate the API", href: signupUrl() },
    note: "Partner and enterprise terms available · sales@fil.one",
  },
};

const RegionalCloudLandingPage = () => <LandingPage config={config} />;

export default RegionalCloudLandingPage;
