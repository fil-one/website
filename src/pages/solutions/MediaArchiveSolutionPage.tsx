import {
  FilmSlate,
  CloudArrowDown,
  Archive,
  CurrencyDollar,
  ArrowsClockwise,
  ShieldCheck,
} from "@phosphor-icons/react";
import SolutionPage, { type SolutionPageConfig } from "@/components/SolutionPage";
import { signupUrl } from "@/lib/console-url";

const config: SolutionPageConfig = {
  seo: {
    title: "Media & Archive Storage · Fil One",
    description:
      "Low-cost, high-durability object storage for video, audio, and long-term archives. No egress fees, no retrieval penalties. $4.99/TB/month.",
    canonical: "https://www.fil.one/solutions/media-archive",
  },
  hero: {
    title: (
      <>
        Archive petabytes.{" "}
        <span className="text-brand-500">Pay nothing to get them back.</span>
      </>
    ),
    titleMaxWidth: 620,
    description:
      "Durable, low-cost storage for video masters, raw footage, and long-term archives. No egress fees and no retrieval penalties.",
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
    "$4.99 / TB / month",
    "No retrieval penalties",
    "S3-compatible",
    "Immutable Object Lock",
  ],
  features: {
    label: "Built for media teams",
    heading: "Archive without the cloud storage tax",
    headingMaxWidth: 620,
    items: [
      {
        icon: FilmSlate,
        title: "Raw footage & finished masters",
        body: "Store camera originals, proxies, and finished files alongside each other. Reference from your NLE via S3 mount or direct API.",
      },
      {
        icon: CloudArrowDown,
        title: "No egress fees on downloads",
        body: "Pull a 4K master to a new edit suite, share a rough cut with a client, or restore from archive. No egress fees.",
      },
      {
        icon: Archive,
        title: "Long-term archive at low cost",
        body: "$4.99/TB/month, no retrieval fees, no minimum storage duration. Cheaper than cold tiers that penalize you for accessing your own data.",
      },
      {
        icon: CurrencyDollar,
        title: "Predictable billing",
        body: "Flat per-TB rate. No per-operation fees, no tiered retrieval charges, no surprise bills after a busy delivery month.",
      },
      {
        icon: ArrowsClockwise,
        title: "S3-compatible · works with your tools",
        body: "Integrates with DaVinci Resolve, Final Cut Pro via S3 plugins, LucidLink, Iconik, and any media asset management system with S3 support.",
      },
      {
        icon: ShieldCheck,
        title: "Masters that cannot be overwritten",
        body: "Lock a delivered master under Object Lock retention and nothing can overwrite or delete it for the term you set. Versioning keeps every earlier cut alongside it, with the full history of the key."
      },
    ],
  },
  detail: {
    variant: "cards",
    label: "Use cases",
    heading: "What teams are archiving",
    items: [
      {
        title: "Broadcast & streaming archives",
        body: "Store finished episodes, raw camera rolls, and ingest files in one place. Access any asset instantly without retrieval delays or fees.",
      },
      {
        title: "Post-production studios",
        body: "Keep proxies, color-graded masters, and project files alongside each other. Share deliverables with clients via presigned URLs, no FTP, no courier.",
      },
      {
        title: "News & documentary teams",
        body: "Archive years of footage under locked retention, with every prior version kept and listed. Reading any of it back costs nothing, so a licensing check is never a budget decision."
      },
      {
        title: "Sports rights & licensing",
        body: "Store highlight reels, raw match footage, and licensed clips at scale. Pull content for re-licensing or distribution with zero egress cost.",
      },
    ],
  },
  faq: [
    "Is Fil One hot, warm, or cold storage? Is it like Glacier?",
    "How do I migrate from AWS / Azure / Google Cloud?",
    "Is Fil One compatible with my existing tools?",
    "How do I stop data from being altered or deleted?",
  ],
  cta: {
    heading: "Cut your archive bill by up to 80%",
    subhead: "Start with 1 TB of storage and 2 TB of egress free. No credit card, and no charge to read it back out.",
    note: "S3-compatible · Object Lock retention · $4.99/TB/month after trial",
    cta: { label: "Start for free", href: signupUrl() },
  },
};

const MediaArchiveSolutionPage = () => <SolutionPage config={config} />;

export default MediaArchiveSolutionPage;
