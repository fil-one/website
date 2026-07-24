import {
  Database,
  Lightning,
  Lock,
  CurrencyDollar,
  ArrowsClockwise,
  LinkSimple,
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
    title: (
      <>
        Object storage built for{" "}
        <span className="text-brand-500">AI training and inference</span>
      </>
    ),
    titleMaxWidth: 620,
    description:
      "Keep training datasets, model weights, and checkpoints on S3-compatible storage. High-throughput reads keep your GPUs busy, with verifiable integrity and zero egress fees.",
    descriptionMaxWidth: 540,
    ctas: [
      {
        label: "Start for free",
        href: "https://app.fil.one/login?screen_hint=signup",
        variant: "primary",
        size: "lg",
        glow: true,
      },
    ],
    tagline: "1 TB free for 30 days · No credit card required",
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
        icon: Lock,
        title: "Immutable object lock",
        body: "Lock objects so your training data can't be altered or deleted, even with your keys.",
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
        icon: LinkSimple,
        title: "Presigned URL sharing",
        body: "Share checkpoints with time-limited presigned URLs, no credentials to hand out.",
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
        body: "Pick a region and create a bucket in seconds from the dashboard.",
      },
      {
        number: "02",
        title: "Swap your endpoint",
        body: "Point your S3 endpoint at Fil One. No SDK changes needed.",
      },
      {
        number: "03",
        title: "Upload your data",
        body: "Migrate data with rclone, the AWS CLI, or any S3 library.",
      },
      {
        number: "04",
        title: "Train with confidence",
        body: "Your data stays intact, GPUs stay busy, and egress bill is zero.",
      },
    ],
  },
  faq: [
    "Is Fil One hot, warm, or cold storage? Is it like Glacier?",
    "Is Fil One compatible with my existing tools?",
    "How do I migrate from AWS / Azure / Google Cloud?",
    "How does Fil One approach security and compliance?",
  ],
  cta: {
    heading: (
      <>
        Stop paying egress fees<br />on every training run
      </>
    ),
    subhead: "1 TB free for 30 days. No credit card and no egress fees.",
    cta: { label: "Start for free", href: "https://app.fil.one/login?screen_hint=signup" },
  },
};

const AiTrainingSolutionPage = () => <SolutionPage config={config} />;

export default AiTrainingSolutionPage;
