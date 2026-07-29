import {
  Lock,
  ShieldCheck,
  ClockCounterClockwise,
  CurrencyDollar,
  PlugsConnected,
  Globe,
} from "@phosphor-icons/react";
import SolutionPage, { type SolutionPageConfig } from "@/components/SolutionPage";
import { PRICE_PER_TB_MONTH } from "@/lib/pricing";

const config: SolutionPageConfig = {
  seo: {
    title: "Enterprise Backup & Disaster Recovery · Fil One",
    description:
      "Immutable, S3-compatible backup storage with object lock and no egress fees. Ransomware-resilient, WORM-compliant, and built for enterprise recovery.",
    canonical: "https://www.fil.one/solutions/enterprise-backup",
  },
  hero: {
    title: (
      <>
        Immutable backups, <span className="text-brand-500">built for recovery</span>
      </>
    ),
    titleMaxWidth: 560,
    description:
      "Immutable, S3-compatible backup storage with object lock and zero egress fees, so your data is ready when disaster strikes and you need to restore.",
    descriptionMaxWidth: 520,
    ctas: [
      { label: "Start for free", href: "https://app.fil.one/login?screen_hint=signup", variant: "primary", size: "lg", glow: true },
    ],
    tagline: "1 TB free for 30 days · No credit card required",
  },
  proof: [
    "Immutable object lock",
    "Object versioning",
    "WORM compliance",
    "No egress fees",
  ],
  features: {
    label: "Enterprise-grade",
    heading: "Resilience built into the storage layer",
    headingMaxWidth: 420,
    items: [
      {
        icon: Lock,
        title: "Immutable backups",
        body: "Object lock blocks ransomware from deleting backups, even with root keys.",
      },
      {
        icon: ShieldCheck,
        title: "WORM retention modes",
        body: "GOVERNANCE and COMPLIANCE retention lock objects for a fixed period.",
      },
      {
        icon: ClockCounterClockwise,
        title: "Version history",
        body: "Download any prior version of an object. Versioning is set at creation.",
      },
      {
        icon: CurrencyDollar,
        title: "No egress on restores",
        body: "A disaster is bad enough. Fil One never charges egress on restores.",
      },
      {
        icon: PlugsConnected,
        title: "S3-compatible",
        body: "Point any S3 SDK or backup tool at Fil One. No new tooling to learn.",
      },
      {
        icon: Globe,
        title: "US & EU regions",
        body: "Store backups in US or EU regions to meet data residency requirements.",
      },
    ],
    ctas: [
      { label: "Start for free", href: "https://app.fil.one/login?screen_hint=signup", variant: "primary" },
      { label: "Explore documentation", href: "https://docs.fil.one", variant: "secondary" },
    ],
  },
  detail: {
    variant: "cards",
    label: "Scenarios",
    heading: "Every recovery scenario, covered",
    items: [
      {
        title: "Ransomware recovery",
        body: "Immutable object lock means your backups can't be encrypted or deleted by an attacker who gains access to your infrastructure. Restore clean copies with confidence.",
      },
      {
        title: "Database & VM backup",
        body: "Works with Veeam, Commvault, Nakivo, and any backup tool with S3-compatible target support. No agent to install, no proprietary lock-in.",
      },
      {
        title: "Compliance archiving",
        body: "Write-once, read-many (WORM) storage with GOVERNANCE and COMPLIANCE retention modes. Satisfy regulatory retention requirements without expensive tape infrastructure.",
      },
      {
        title: "Disaster recovery",
        body: "With no egress fees, recovery drills and real restores cost nothing extra. Define your RTO and RPO and test your plan on a regular schedule.",
      },
    ],
  },
  faq: [
    "How does Fil One approach security and compliance?",
    "Is Fil One compatible with my existing tools?",
    "How do I migrate from AWS / Azure / Google Cloud?",
    "Is there a free trial?",
    "What kinds of organizations use Fil One?",
  ],
  cta: {
    heading: "Your recovery plan deserves better storage",
    subhead:
      "Talk to our enterprise team about custom retention policies, SLAs, and compliance requirements.",
    note: `S3-compatible · Immutable object lock · ${PRICE_PER_TB_MONTH}`,
    cta: { label: "Talk to sales", href: "/contact-sales" },
  },
};

const EnterpriseBackupSolutionPage = () => <SolutionPage config={config} />;

export default EnterpriseBackupSolutionPage;
