import { Plug, ArrowsOut, ChartLine, Lock } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · Built on Filecoin · One endpoint change";

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Don't be a Web2 company just playing with crypto",
    description: `Point your Web3 product's storage at Filecoin infrastructure without rebuilding your stack. S3-compatible, no egress fees, no lock-in, at ${PRICE_PER_TB_SHORT} flat.`,
    canonical: "https://www.fil.one/lp/web3-pivot",
  },

  hero: {
    badge: "For Web2 companies adding crypto payments or Web3 features",
    titleMaxWidth: 780,
    descriptionMaxWidth: 600,
    title: (
      <>
        Don't be a Web2 company
        <br />
        <span className="text-brand-500">just playing with crypto.</span>
      </>
    ),
    description: `S3-compatible object storage built on Filecoin infrastructure — not a relabeled hyperscaler bucket. No egress, no lock-in, one endpoint change. ${PRICE_PER_TB_SHORT} flat.`,
    ctas: [
      { label: "Start for free", href: SIGNUP_URL, variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The gap",
    heading: "A Web3 product on a Web2 storage layer sends a mixed message.",
    sub: "Adding crypto payments or on-chain features while keeping all your data on AWS is the infrastructure equivalent of a public blockchain with a centralized admin key.",
    subMaxWidth: 620,
    items: [
      {
        label: "The credibility gap",
        tone: "warning",
        catch: "Crypto-native users notice the architecture.",
        body: "The technical audience you're targeting holds self-custody wallets, reads smart contract code, and checks where their data actually lives. Storing everything on AWS S3 while calling the product Web3 is a contradiction they will find.",
      },
      {
        label: "The architecture mismatch",
        tone: "danger",
        catch: "On-chain contracts, off-chain data on a single cloud.",
        body: "Your token logic and payment rails run on decentralized infrastructure. Your transaction history, user data, and product state sit on a single proprietary cloud. The two halves of the stack don't share the same failure modes.",
      },
      {
        label: "The migration assumption",
        tone: "brand",
        catch: "Teams assume switching storage means rebuilding.",
        body: "The reason most crypto products stay on AWS is the assumption that switching storage requires a new SDK, a new workflow, and weeks of engineering. It requires changing one line in a config file.",
      },
    ],
  },

  features: {
    label: "The infrastructure shift",
    heading: (
      <>
        Storage built on Filecoin that <span className="text-brand-500">works like S3.</span>
      </>
    ),
    sub: "Same API, same tools, infrastructure that matches the rest of your stack.",
    items: [
      {
        icon: Plug,
        title: "Endpoint swap · nothing else changes",
        desc: "Fil One implements the S3 API. Swap the endpoint in your config. Your existing upload code, SDKs, and tooling connect immediately — no migration project, no new library.",
      },
      {
        icon: Lock,
        title: "Built on Filecoin infrastructure",
        desc: "S3-compatible object storage running on Filecoin infrastructure, not a relabeled hyperscaler bucket. Your storage layer runs on the same network your product is built around.",
      },
      {
        icon: ArrowsOut,
        title: "No egress on reads",
        desc: "Reading back transaction history, user data, or audit logs costs $0 in egress. Crypto products that read frequently — wallets, explorers, dashboards — pay for storage, not for reads.",
      },
      {
        icon: ChartLine,
        title: "Flat, predictable cost",
        desc: `${PRICE_PER_TB_SHORT} flat. No surprise invoices when your crypto product hits viral growth. Storage cost is proportional to what you keep, not what your users do.`,
      },
    ],
  },

  cta: {
    heading: "Make the storage layer match the product.",
    subhead: "Free 1 TB evaluation. Change the endpoint in your config and store data on Filecoin infrastructure today.",
    cta: { label: "Start for free", href: SIGNUP_URL },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const Web3PivotLandingPage = () => <LandingPage config={config} />;

export default Web3PivotLandingPage;
