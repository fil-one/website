import { Database, ArrowsOut, ChartLine, Lock } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Keep every version. Download any of them",
    description: `S3-compatible storage with built-in version history. Download any prior version by ID. ${PRICE_PER_TB_SHORT} flat. No egress on version reads.`,
    canonical: "https://www.fil.one/lp/versioning",
  },

  hero: {
    badge: "For teams needing a full object version history",
    titleMaxWidth: 760,
    descriptionMaxWidth: 580,
    title: (
      <>
        Keep every version.
        <br />
        <span className="text-brand-500">Download any of them.</span>
      </>
    ),
    description: `S3-compatible storage with built-in version history. Download any prior version by ID. ${PRICE_PER_TB_SHORT} flat, no egress on reads.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The gap",
    heading: "A backup is not the exact prior state.",
    sub: "Scheduled backups capture moments in time, not the continuous history. Debugging a data-quality regression, reconstructing a prior model training state, or answering an audit request often requires a specific state between backups.",
    items: [
      {
        label: "The backup gap",
        tone: "warning",
        catch: "Backups are periodic. Bugs are not.",
        body: "A nightly backup captures yesterday. If a data-quality issue was introduced at 2pm and discovered at 11pm, the prior-clean state is between two backup windows — and unavailable.",
      },
      {
        label: "The debug state",
        tone: "danger",
        catch: "Reproducing the exact input requires the exact prior version.",
        body: "A model trained on a dataset that was later modified cannot be reproduced without the exact version of the training data that was used. Version history makes that a one-line query.",
      },
      {
        label: "The audit requirement",
        tone: "brand",
        catch: "Auditors ask for the specific record, not a backup.",
        body: "Evidence requests for specific records at specific points in time require version history. A backup restore retrieves the whole snapshot — version download returns the specific object at the specific time.",
      },
    ],
  },

  features: {
    label: "Why it works",
    heading: (
      <>
        Version history that <span className="text-brand-500">costs what it stores.</span>
      </>
    ),
    sub: `Standard S3 versioning API. Versions billed at ${PRICE_PER_TB_SHORT} like any stored object — no retrieval fee on any read.`,
    items: [
      {
        icon: Database,
        title: "S3 version history",
        desc: "Every PUT creates a new version. Prior versions are retained and downloadable by version ID using standard S3 GET. Configured when the bucket is created.",
      },
      {
        icon: ArrowsOut,
        title: "No egress on version reads",
        desc: "Downloading any prior version — for debugging, audit, or reconstruction — is included in flat storage. No egress charge per read.",
      },
      {
        icon: Lock,
        title: "Pairs with Object Lock",
        desc: "Combine versioning with Object Lock retention so versions can't be deleted or overwritten early, even by an admin key.",
      },
      {
        icon: ChartLine,
        title: "Flat cost across versions",
        desc: `Versions cost ${PRICE_PER_TB_SHORT} like any stored object. The version history grows with the data; the rate per TB does not change.`,
      },
    ],
  },

  cta: {
    heading: "Not a backup. The exact state.",
    subhead: "Free 1 TB evaluation. Create a versioned bucket, write a few objects, and download a specific prior version in one call.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const VersioningLandingPage = () => <LandingPage config={config} />;

export default VersioningLandingPage;
