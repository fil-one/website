import { ShieldCheck, ArrowsOut, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Your data, under your control",
    description: `S3-compatible storage with an EU region endpoint, $0 exit egress, and no vendor lock-in. Flat ${PRICE_PER_TB_SHORT}.`,
    canonical: "https://www.fil.one/lp/data-control",
  },

  hero: {
    badge: "For EU teams with data residency and control requirements",
    titleMaxWidth: 760,
    descriptionMaxWidth: 580,
    title: (
      <>
        Your data,
        <br />
        <span className="text-brand-500">under your control.</span>
      </>
    ),
    description: "S3-compatible storage with an EU region endpoint and $0 exit egress. Control means your data stays in the region you chose, and leaving doesn't cost you anything.",
    ctas: [
      { label: "Start for free", href: SIGNUP_URL, variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The control gap",
    heading: "Hyperscalers offer regions. They don't offer an easy way out.",
    sub: "Selecting an EU region on AWS or Google Cloud controls where data is written by default. It gives you a contractual assurance, but leaving on your own terms still comes with a metered exit bill.",
    subMaxWidth: 620,
    items: [
      {
        label: "The region illusion",
        tone: "warning",
        catch: "A region setting is not the whole story.",
        body: "Cloud providers replicate, migrate, and process data across infrastructure according to their own operational needs. An EU region bucket stays in EU storage — but the operational boundary is defined by the vendor, not you.",
      },
      {
        label: "The exit penalty",
        tone: "danger",
        catch: "Portability costs money on metered storage.",
        body: "Moving data out of a hyperscaler costs $0.09/GB. At any meaningful scale, that exit bill is the mechanism that makes 'control' feel theoretical. Real control requires the ability to leave without a financial penalty.",
      },
      {
        label: "The audit assumption",
        tone: "brand",
        catch: "Compliance asks where data lives, not just where you say it does.",
        body: "Audit and regulatory frameworks increasingly ask for a specific, documented region and a workable exit path — not a vendor SLA promise. An EU endpoint with $0 exit egress gives you both to point to.",
      },
    ],
  },

  features: {
    label: "Capabilities",
    heading: (
      <>
        Control that is <span className="text-brand-500">structural, not contractual.</span>
      </>
    ),
    sub: "An EU endpoint, a free exit, and standard S3 tooling — the concrete pieces that make control real.",
    columns: 3,
    items: [
      {
        icon: ShieldCheck,
        title: "Encryption at rest and in transit",
        desc: "TLS protects data moving to and from the endpoint, and objects are encrypted at rest by the storage gateway — always on, no configuration required.",
      },
      {
        icon: ArrowsOut,
        title: "No exit egress",
        desc: "$0 to move data out. Portability is not penalised. You can leave without an exit bill — which means staying is a choice, not a lock-in.",
      },
      {
        icon: Plug,
        title: "S3-compatible tooling",
        desc: "Standard S3 API — your existing SDKs, CLIs, and audit tooling work without custom adapters. Control does not require a new stack.",
      },
    ],
  },

  cta: {
    heading: "Your data. Your region. No exit bill.",
    subhead: "Free 1 TB on the EU endpoint. Point your existing S3 tools and confirm your data stays in eu-west-1.",
    cta: { label: "Start for free", href: SIGNUP_URL },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const DataControlLandingPage = () => <LandingPage config={config} />;

export default DataControlLandingPage;
