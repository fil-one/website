import { Lock, Database, ShieldCheck, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Storage controls you can actually point to",
    description: `S3-compatible storage with Object Lock retention, full version history, and encryption at rest and in transit. ${PRICE_PER_TB_SHORT} flat. No egress fees.`,
    canonical: "https://www.fil.one/lp/compliance",
  },

  hero: {
    badge: "For fintech, health, and regulated teams",
    titleMaxWidth: 800,
    descriptionMaxWidth: 580,
    title: (
      <>
        Storage controls you can
        <br />
        <span className="text-brand-500">actually point to.</span>
      </>
    ),
    description: `S3-compatible storage with Object Lock retention, full version history, and encryption at rest and in transit. ${PRICE_PER_TB_SHORT} flat.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The audit gap",
    heading: "Standard object storage asks you to trust that data hasn't been overwritten.",
    sub: "Most object storage lets any write silently replace the previous object, with nothing kept and nothing locked. Regulated teams need controls they can show an auditor — not an assumption.",
    items: [
      {
        label: "Untracked changes",
        tone: "warning",
        catch: "Overwrites erase the evidence.",
        body: "Standard S3-compatible storage lets any write silently replace the previous object. Without version history or Object Lock, there's no record of what a file looked like before the last write — and nothing stopping it from being overwritten again.",
      },
      {
        label: "Version accountability",
        tone: "danger",
        catch: "Who changed what, and when, is not always clear.",
        body: "Evidence retention for SOC 2, ISO 27001, or HIPAA requires being able to retrieve a specific prior state of a record. Without version history, that state is gone once overwritten.",
      },
      {
        label: "The paper-trail gap",
        tone: "brand",
        catch: "An SLA is not an audit trail.",
        body: "Telling an auditor the vendor guarantees durability is not the same as showing version history and locked retention on the record in question. Procurement and audit teams increasingly want to see the controls, not just read about them.",
      },
    ],
  },

  features: {
    label: "Compliance features",
    heading: (
      <>
        Controls, <span className="text-brand-500">not just claims.</span>
      </>
    ),
    sub: "Object Lock, version history, and encryption — the concrete pieces an audit actually asks for.",
    items: [
      {
        icon: Lock,
        title: "Object Lock (WORM) retention",
        desc: "Configure retention from 1 day to 100 years in Governance or Compliance mode. Once locked, an object can't be deleted or overwritten before its retention period ends — not even by an admin key.",
      },
      {
        icon: Database,
        title: "Version history",
        desc: "Object versioning stores every prior state. Prior versions are downloadable for audit, reconstruction, or evidence retention.",
      },
      {
        icon: Plug,
        title: "Encryption at rest and in transit",
        desc: "TLS protects data moving to and from the endpoint, and objects are encrypted at rest by the storage gateway — always on, no configuration required.",
      },
      {
        icon: ShieldCheck,
        title: "Certified infrastructure",
        desc: "Our services are delivered through top-tier data centers that are certified to ISO 27001, SOC 2, and PCI DSS standards.",
      },
    ],
  },

  cta: {
    heading: "Compliance controls, not just claims.",
    subhead: "Free 1 TB evaluation. Bring your existing S3 audit tooling and configure Object Lock and versioning on a real bucket.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const ComplianceLandingPage = () => <LandingPage config={config} />;

export default ComplianceLandingPage;
