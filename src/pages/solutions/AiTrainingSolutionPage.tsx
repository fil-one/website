import {
  Database,
  Lightning,
  ShieldCheck,
  CurrencyDollar,
  ArrowsClockwise,
  Code,
} from "@phosphor-icons/react";
import SolutionPage, { type SolutionPageConfig } from "@/components/SolutionPage";

const config: SolutionPageConfig = {
  seo: {
    title: "AI Training & Inference Storage · Fil One",
    description:
      "S3-compatible object storage built for AI workloads. Store training datasets, model weights, and checkpoints with verifiable integrity and no egress fees.",
    canonical: "https://www.fil.one/solutions/ai-training",
  },
  hero: {
    badge: "AI Training & Inference",
    title: "Storage that keeps your GPUs fed",
    titleMaxWidth: 520,
    description:
      "Store training datasets, model weights, and checkpoints with verifiable integrity. Move data freely with zero egress fees.",
    descriptionMaxWidth: 480,
    ctas: [
      {
        label: "Start for free",
        href: "https://app.fil.one/login?screen_hint=signup",
        variant: "primary",
        size: "lg",
        glow: true,
      },
    ],
    tagline: "1 TB free for 30 days · No credit card required · No egress fees",
  },
  proof: [
    "S3-compatible drop-in replacement",
    "$4.99 / TB / month",
    "Cryptographic data integrity",
    "Multi-region redundancy",
  ],
  features: {
    label: "Built for AI teams",
    heading: "Everything your training pipeline needs",
    headingMaxWidth: 620,
    items: [
      {
        icon: Database,
        title: "Petabyte-scale dataset storage",
        body: "Store training corpora and raw crawl data with no practical size limits.",
      },
      {
        icon: Lightning,
        title: "High-throughput reads",
        body: "Sustained multi-Gbps reads so your GPU cluster never waits for the next batch.",
      },
      {
        icon: ShieldCheck,
        title: "Verifiable data integrity",
        body: "Every object is cryptographically sealed, so you can prove your data was never altered.",
      },
      {
        icon: CurrencyDollar,
        title: "No egress fees, ever",
        body: "Move or replicate data across regions and providers with zero egress charges.",
      },
      {
        icon: ArrowsClockwise,
        title: "S3-compatible, drop-in",
        body: "Works with PyTorch, HuggingFace, Ray Data, and any S3-compatible SDK.",
      },
      {
        icon: Code,
        title: "Checkpoint versioning",
        body: "Tag checkpoints, roll back to any training step, and share via presigned URLs.",
      },
    ],
  },
  detail: {
    variant: "steps",
    label: "Get started in minutes",
    heading: "Four steps to zero egress bills",
    items: [
      {
        number: "01",
        title: "Create a bucket",
        body: "Provision a bucket in seconds from the dashboard. Pick your preferred region.",
      },
      {
        number: "02",
        title: "Swap your endpoint",
        body: "Replace your existing S3 endpoint URL with Fil One's. No SDK changes, no re-architecture.",
      },
      {
        number: "03",
        title: "Upload your data",
        body: "Use rclone, the AWS CLI, or any S3 library to migrate datasets and checkpoints.",
      },
      {
        number: "04",
        title: "Train with confidence",
        body: "Your data is verifiably intact, your reads are fast, and your egress bill is zero.",
      },
    ],
  },
  faq: [
    "Is Fil One hot, warm, or cold storage? Is it like Glacier?",
    "How does data integrity verification work with Fil One?",
    "Is Fil One compatible with my existing tools?",
    "How do I migrate from AWS / Azure / Google Cloud?",
    "How does Fil One approach security and compliance?",
  ],
  cta: {
    heading: "Stop paying egress fees on every training run",
    subhead: "Start with 1 TB free. No credit card, no egress fees, no surprises.",
    note: "S3-compatible · Verifiable integrity · $4.99/TB/month after trial",
    cta: { label: "Start for free", href: "https://app.fil.one/login?screen_hint=signup" },
  },
};

const AiTrainingSolutionPage = () => <SolutionPage config={config} />;

export default AiTrainingSolutionPage;
