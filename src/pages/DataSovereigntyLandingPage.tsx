import { ArrowsOut, Plug, ShieldCheck } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · EU data residency with S3-compatible tools",
    description: `S3-compatible object storage with EU region endpoint. Store data in EU infrastructure at ${PRICE_PER_TB_SHORT} flat. No egress fees.`,
    canonical: "https://www.fil.one/lp/data-sovereignty",
  },

  hero: {
    badge: "For EU teams with data residency requirements",
    titleMaxWidth: 800,
    descriptionMaxWidth: 580,
    title: (
      <>
        Decide where your data lives.
        <br />
        <span className="text-brand-500">Keep your S3 tools.</span>
      </>
    ),
    description: `S3-compatible storage with EU region endpoint. Flat ${PRICE_PER_TB_SHORT}. No egress, no re-architecture.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The constraint",
    heading: "Residency and convenience have been a tradeoff. They do not have to be.",
    sub: "Regulated EU teams often face a choice between hyperscaler convenience (with opaque data placement) and purpose-built EU storage that requires different tooling. S3 compatibility removes the tooling part of that tradeoff.",
    items: [
      {
        label: "The placement question",
        tone: "warning",
        catch: "EU-hosted is not the same as EU-only.",
        body: "Hyperscalers offer EU regions, but data movement between regions for replication, processing, and backup is governed by their internal architecture, not by the customer's configuration. Audit trails for residency require documentation the platform does not make simple.",
      },
      {
        label: "The tooling cost",
        tone: "danger",
        catch: "Sovereign-only products break the existing stack.",
        body: "Purpose-built EU storage often requires SDKs, APIs, and operational tooling that do not match what teams already run. The migration becomes a re-architecture. S3-compatible storage eliminates this. The tooling does not change.",
      },
      {
        label: "The egress penalty",
        tone: "brand",
        catch: "Moving EU data across borders costs extra.",
        body: "Even when data starts in the EU, cross-region egress to process or distribute it adds cost. Teams that need to work with EU data from multiple locations pay again for the portability of their own dataset.",
      },
    ],
  },

  features: {
    label: "Capabilities",
    heading: (
      <>
        EU storage that works with <span className="text-brand-500">existing tools.</span>
      </>
    ),
    sub: "An EU endpoint, standard S3 tooling, and a free exit. The concrete pieces of data residency.",
    columns: 3,
    items: [
      {
        icon: ShieldCheck,
        title: "EU-hosted endpoint",
        desc: "Data written to the eu-west-1 endpoint stays in EU infrastructure. S3-compatible. No changes to your existing tools.",
      },
      {
        icon: Plug,
        title: "S3-compatible tools",
        desc: "Your existing SDKs, Terraform, rclone, or any S3-compatible toolchain points at the EU endpoint. No re-architecture required.",
      },
      {
        icon: ArrowsOut,
        title: "No egress on portability",
        desc: "Move data in and out of the EU endpoint without egress fees. Portability is not penalised. The exit cost is $0.",
      },
    ],
  },

  cta: {
    heading: "EU storage. S3 tools. No egress.",
    subhead: "Free 30-day trial on the EU endpoint, with 1 TB of storage and 2 TB of egress. Point your existing S3 tools and run the same workload in EU infrastructure.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const DataSovereigntyLandingPage = () => <LandingPage config={config} />;

export default DataSovereigntyLandingPage;
