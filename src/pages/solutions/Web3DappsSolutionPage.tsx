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
      "Verifiable, decentralized object storage for NFTs, dApps, and on-chain assets. S3-compatible, no egress fees, cryptographic proof on every object.",
    canonical: "https://www.fil.one/solutions/web3-dapps",
  },
  hero: {
    title: (
      <>
        Verifiable object storage for{" "}
        <span className="text-brand-500">NFTs and dApps</span>
      </>
    ),
    titleMaxWidth: 620,
    description:
      "Serve NFT metadata, media, and dApp data from S3-compatible buckets. Every object carries a cryptographic proof, with no IPFS pinning and zero egress fees.",
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
    tagline: "1 TB free for 30 days · No credit card required",
  },
  proof: [
    "On-chain verifiable proofs",
    "Immutable object lock",
    "S3-compatible API",
    "Filecoin-backed durability",
  ],
  features: {
    label: "Built for Web3",
    heading: "Off-chain storage with on-chain integrity",
    headingMaxWidth: 620,
    items: [
      {
        icon: LinkSimple,
        title: "On-chain verifiable storage",
        body: "Every object gets a cryptographic proof anchored to Filecoin that contracts can verify.",
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
        body: "Lock NFT assets and metadata so they can never be altered or deleted.",
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
        body: "Host artwork, metadata JSON, and provenance records. Objects are content-addressed and immutable.",
      },
      {
        title: "dApp backends",
        body: "Back your dApp with verifiable, decentralized storage. One endpoint change, zero re-architecture.",
      },
      {
        title: "Token-gated content",
        body: "Store gated media behind presigned URLs, unlocked only for wallets holding the token.",
      },
      {
        title: "On-chain game assets",
        body: "Store items, skins, and save states with verifiable provenance players can check for themselves.",
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
    subhead: "1 TB free for 30 days. No credit card and no egress fees.",
    cta: { label: "Start for free", href: signupUrl() },
  },
};

const Web3DappsSolutionPage = () => <SolutionPage config={config} />;

export default Web3DappsSolutionPage;
