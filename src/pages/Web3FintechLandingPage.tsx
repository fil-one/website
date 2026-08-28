import { Lock, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · Built on Filecoin · S3-compatible";

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · S3-compatible storage for Web3 fintech",
    description: `S3-compatible object storage built on Filecoin infrastructure. No egress, no lock-in. For exchanges, DeFi protocols, custody providers, and crypto wallets.`,
    canonical: "https://www.fil.one/lp/web3-fintech",
  },

  hero: {
    badge: "For exchanges, DeFi protocols, custody providers, and crypto wallets",
    titleMaxWidth: 820,
    descriptionMaxWidth: 600,
    title: (
      <>
        You're not Web3 if when AWS goes down,
        <br />
        <span className="text-brand-500">your app does too.</span>
      </>
    ),
    description: `S3-compatible object storage built on Filecoin infrastructure — a different provider than the hyperscaler your smart contracts don't depend on. No egress, no lock-in, ${PRICE_PER_TB_SHORT} flat.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The contradiction",
    heading: "Decentralized products built on centralized infrastructure are a liability.",
    sub: "Exchanges, custody providers, and DeFi protocols store user assets, audit logs, and transaction history on AWS S3. When AWS has an incident, so does the protocol. That is not a Web3 architecture.",
    subMaxWidth: 620,
    items: [
      {
        label: "The single-point failure",
        tone: "warning",
        catch: "AWS us-east-1 going down takes your protocol with it.",
        body: "If your exchange order book, custody audit trail, or DeFi state is stored in a single cloud region, you have a single point of failure. Your smart contracts are decentralized. Your data layer is not.",
      },
      {
        label: "The trust mismatch",
        tone: "danger",
        catch: "Your users are trusting a chain. Your data trusts a corporation.",
        body: "Blockchain-native users hold self-custody wallets and verify everything on-chain. Their trust in your protocol assumes the same scrutiny applies to the underlying data store. A proprietary cloud invites the question of whether it does.",
      },
      {
        label: "The audit gap",
        tone: "brand",
        catch: "Regulated crypto needs a documented data location, not just cloud SLAs.",
        body: "Exchanges and custody providers operating under MiCA, BitLicense, or similar frameworks increasingly need to document exactly where data lives and how it can be moved. An AWS SLA alone doesn't give you a specific, named story to point to.",
      },
    ],
  },

  features: {
    label: "Built for Web3 fintech",
    heading: (
      <>
        Infrastructure that <span className="text-brand-500">matches your values.</span>
      </>
    ),
    sub: "S3-compatible, built on Filecoin, and free to leave — infrastructure independence for the data layer, not just the contracts.",
    items: [
      {
        icon: Lock,
        title: "Built on Filecoin infrastructure",
        desc: "S3-compatible object storage built on Filecoin infrastructure — not a repackaged hyperscaler bucket. Your custody, exchange, and indexer data doesn't share a failure domain with your compute.",
      },
      {
        icon: ArrowsOut,
        title: "S3-compatible, zero lock-in",
        desc: "Standard S3 API with $0 exit egress. If you ever need to move data out — to another provider, another region — it costs nothing.",
      },
      {
        icon: Plug,
        title: "S3-compatible · no SDK changes",
        desc: "Your existing boto3, aws-sdk, or S3-compatible tooling connects with an endpoint change. Exchange backends, wallet data pipelines, and DeFi indexers work without modification.",
      },
      {
        icon: ChartLine,
        title: "Flat, predictable cost",
        desc: `${PRICE_PER_TB_SHORT} flat. No egress fees on reads, no per-request charges. High-volume on-chain event indexing and custody audit logs don't generate surprise invoices.`,
      },
    ],
  },

  cta: {
    heading: "Walk the walk.",
    subhead: "Free 30-day trial with 1 TB of storage and 2 TB of egress. Connect your existing S3 client and store data on Filecoin infrastructure in minutes.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const Web3FintechLandingPage = () => <LandingPage config={config} />;

export default Web3FintechLandingPage;
