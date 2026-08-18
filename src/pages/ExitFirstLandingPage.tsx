import { ArrowsOut, Plug, ChartLine, Rocket } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// Exit cost on 100 TB. AWS: 102,400 GB x $0.09 = $9,216.
// GCP tiered (10 TB @ $0.12 + 40 @ $0.11 + 50 @ $0.08) = $9,831.
// Azure tiered = $7,602. Fil One: $0 egress.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Here's how to leave. Read it before you start.",
    description: `S3-compatible storage with $0 egress. The exit is a documented one-line sync command, not a renegotiation. Verify the way out before you commit. ${PRICE_PER_TB_SHORT} flat.`,
    canonical: "https://www.fil.one/lp/exit-first",
  },

  hero: {
    badge: "For anyone who's been burned by lock-in",
    titleMaxWidth: 800,
    descriptionMaxWidth: 600,
    title: (
      <>
        Here's how to leave.
        <br />
        <span className="text-brand-500">Read it before you start.</span>
      </>
    ),
    description: "S3-compatible, $0 egress. The exit is a documented one-line command you can run on day one. You can verify the way out before you ever commit.",
    ctas: [
      { label: "Start for free", href: SIGNUP_URL, variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The lock-in you can't see",
    heading: "Every vendor says \"no lock-in.\" Few will show you the exit.",
    sub: "If you've been burned before, the claim isn't enough. You want to see the way out before you put data in, and with most providers you only discover the real exit cost when you try to leave.",
    subMaxWidth: 620,
    items: [
      {
        label: "Egress is the lock",
        tone: "warning",
        catch: "Leaving 100 TB costs $9,216 on AWS.",
        body: "At $0.09/GB internet egress, the bill to move data out scales with how valuable your dataset has become. The lock isn't in the contract — it's in the exit invoice.",
      },
      {
        label: "Proprietary surface",
        tone: "danger",
        catch: "A non-S3 API means leaving is a rewrite.",
        body: "When the storage API is bespoke, exiting means re-engineering every integration. The switching cost is engineering time, and it grows with every feature you build on top.",
      },
      {
        label: "The untested exit",
        tone: "brand",
        catch: "You learn the cost only when you try to go.",
        body: "Most teams never run the migration until they have to — by then the dataset is large, the egress bill is real, and the \"no lock-in\" promise meets the actual number.",
      },
    ],
  },

  comparison: {
    label: "The exit, in advance",
    heading: (
      <>
        The way out is <span className="text-brand-500">one command and $0.</span>
      </>
    ),
    sub: "Here is the migration off Fil One — before you've put anything in. Same S3 API on both ends, no egress charge to move data out.",
    subMaxWidth: 620,
    caption: "Cost to move 100 TB out, by provider",
    columns: [
      { key: "rate", header: "Egress rate" },
      { key: "exit", header: "Cost to exit 100 TB", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { rate: "$0.09 / GB", exit: "$9,216" } },
      { provider: "Google Cloud", values: { rate: "$0.08–$0.12 / GB", exit: "$9,831" } },
      { provider: "Azure Blob (Hot)", values: { rate: "up to $0.087 / GB", exit: "$7,602" } },
      { provider: "Fil One", isFilOne: true, values: { rate: "$0", exit: "$0" } },
    ],
    footnote:
      "Public US rate cards, Q2 2026. AWS: 102,400 GB × $0.09 = $9,216. GCP tiered (10 TB @ $0.12 + 40 @ $0.11 + 50 @ $0.08) = $9,831. Azure tiered = $7,602. Fil One: $0 egress.",
  },

  features: {
    label: "Why the exit is real",
    heading: (
      <>
        Portable by default, <span className="text-brand-500">provable on day one.</span>
      </>
    ),
    sub: "The migration off Fil One uses the same S3 API and tools you already have, and costs nothing to run.",
    items: [
      {
        icon: Plug,
        title: "Full S3 parity",
        desc: "Standard S3 API. The tools that read and write Fil One are the same ones that read and write everywhere else, so the migrate-off command is one you already know.",
      },
      {
        icon: ArrowsOut,
        title: "$0 egress on exit",
        desc: "Moving your data out costs nothing. The exit is a sync command you can run today, for free — not a contract renegotiation or a budget request.",
      },
      {
        icon: ChartLine,
        title: "Flat, predictable cost",
        desc: `${PRICE_PER_TB_MONTH} while you stay. With no egress and no per-request fees, the bill that would normally make leaving expensive doesn't exist.`,
      },
      {
        icon: Rocket,
        title: "Test the exit before you need it",
        desc: "Run the migrate-off command against a real bucket today, not after you've built years of data on top of it. If it doesn't do what this page says, you'll know in minutes, not in a crisis.",
      },
    ],
  },

  cta: {
    heading: "Know the exit before you commit.",
    headingMaxWidth: 560,
    subhead: `${PRICE_PER_TB_MONTH} — storage only, no egress in or out. Free 1 TB evaluation: put data in, run the migrate-off command, and watch it cost nothing. Then decide.`,
    cta: { label: "Start for free", href: SIGNUP_URL },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const ExitFirstLandingPage = () => <LandingPage config={config} />;

export default ExitFirstLandingPage;
