import {
  LinkSimple,
  ShieldCheck,
  Globe,
  CurrencyDollar,
  Code,
  Lock,
} from "@phosphor-icons/react";
import SolutionPage, { type SolutionPageConfig } from "@/components/SolutionPage";
import { signupUrl } from "@/lib/console-url";

const config: SolutionPageConfig = {
  seo: {
    title: "Web3 & dApp Storage · Fil One",
    description:
      "Decentralized object storage for NFTs, dApps, and on-chain assets. S3-compatible, no egress fees, and Object Lock so metadata cannot change after mint.",
    canonical: "https://www.fil.one/solutions/web3-dapps",
  },
  hero: {
    title: (
      <>
        Storage your dApp can serve{" "}
        <span className="text-brand-500">a million times for free</span>
      </>
    ),
    titleMaxWidth: 620,
    description:
      "Serve NFT metadata, media, and dApp data from S3-compatible buckets on Filecoin infrastructure. No pinning service, no gateway to babysit, and no egress charge however hard it gets read.",
    descriptionMaxWidth: 540,
    ctas: [
      {
        label: "Start for free",
        href: signupUrl(),
        variant: "primary",
        size: "lg",
        glow: true,
      },
    ],
    tagline: "1 TB storage + 2 TB egress free for 30 days · No credit card",
  },
  proof: [
    "Zero egress fees",
    "Immutable Object Lock",
    "S3-compatible API",
    "Built on Filecoin",
  ],
  features: {
    label: "Built for Web3",
    heading: "Off-chain storage without the off-chain bill",
    headingMaxWidth: 620,
    items: [
      {
        icon: LinkSimple,
        title: "No pinning, no gateway",
        body: "A normal HTTPS endpoint and presigned URLs, so metadata and media resolve the way any web client expects. Nothing to pin and no gateway queue to wait behind.",
      },
      {
        icon: ShieldCheck,
        title: "NFT metadata & asset hosting",
        body: "Serve NFT metadata, images, and media at scale from a reliable S3-compatible endpoint.",
      },
      {
        icon: Globe,
        title: "Decentralized by default",
        body: "Data is distributed across independent Filecoin providers, with no single point of failure.",
      },
      {
        icon: CurrencyDollar,
        title: "Predictable, low-cost pricing",
        body: "Flat $4.99/TB/month with no per-request fees and no egress charges as your dApp scales.",
      },
      {
        icon: Code,
        title: "S3-compatible API",
        body: "Use any S3-compatible SDK, including ethers.js flows that write metadata after mint.",
      },
      {
        icon: Lock,
        title: "Immutable object locking",
        body: "Create the bucket with Object Lock in Compliance mode and set a retention period up to 100 years. Locked metadata cannot be overwritten or deleted for that whole term, by you or by us."
      },
    ],
  },
  detail: {
    variant: "cards",
    label: "Use cases",
    heading: "What teams are building",
    items: [
      {
        title: "NFT collections",
        body: "Host artwork, metadata JSON, and provenance records, locked under retention so post-mint metadata cannot be swapped out."
      },
      {
        title: "dApp backends",
        body: "Back your dApp with decentralized storage on an S3 endpoint. One config change, zero re-architecture."
      },
      {
        title: "Token-gated content",
        body: "Store gated media behind presigned URLs, unlocked only for wallets holding the token.",
      },
      {
        title: "On-chain game assets",
        body: "Store items, skins, and save states, and serve them to every player without a per-request or per-GB charge."
      },
    ],
  },
  faq: [
    "What is Filecoin?",
    "Is Fil One compatible with my existing tools?",
    "How does Fil One approach security and compliance?",
  ],
  cta: {
    heading: "Decentralized storage, centralized simplicity",
    subhead: "1 TB of storage and 2 TB of egress, free for 30 days. No credit card.",
    cta: { label: "Start for free", href: signupUrl() },
  },
};

const Web3DappsSolutionPage = () => <SolutionPage config={config} />;

export default Web3DappsSolutionPage;
