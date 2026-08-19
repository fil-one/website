import { Lock, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · Built on Filecoin · S3-compatible";

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · You didn't build in Web3 to end up fully dependent on Amazon",
    description: `S3-compatible object storage built on Filecoin infrastructure. No egress, no lock-in, ${PRICE_PER_TB_SHORT} flat. For Web3-native analytics, research, and dev infra teams.`,
    canonical: "https://www.fil.one/lp/web3-native",
  },

  hero: {
    badge: "For Web3-native analytics, research, and dev infrastructure teams",
    titleMaxWidth: 820,
    descriptionMaxWidth: 600,
    title: (
      <>
        You didn't build in Web3
        <br />
        <span className="text-brand-500">to end up fully dependent on Amazon.</span>
      </>
    ),
    description: `S3-compatible object storage built on Filecoin infrastructure. No egress, no lock-in — your existing tools connect today. ${PRICE_PER_TB_SHORT} flat.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The problem",
    heading: "The decentralized storage alternatives either don't scale or don't integrate.",
    sub: "IPFS is great for content addressing. Arweave is useful for permanent storage. Neither gives you an S3-compatible API, predictable performance, or a bill you can plan around. So Web3 teams end up back on AWS.",
    subMaxWidth: 620,
    items: [
      {
        label: "The integration tax",
        tone: "warning",
        catch: "Non-S3 storage breaks the data stack.",
        body: "Your analytics pipeline uses PyArrow, DuckDB, and Spark — all of which read S3. The moment decentralized storage requires a different API, you're rewriting tooling instead of building product. Teams choose AWS S3 to avoid the rewrite.",
      },
      {
        label: "The S3 dependency",
        tone: "danger",
        catch: "Web3 data on a Web2 storage layer.",
        body: "On-chain analytics, chain snapshots, indexer outputs, and research datasets all live on AWS S3 because the alternatives don't integrate cleanly. The infrastructure the Web3 ecosystem runs on is, in practice, centralized.",
      },
      {
        label: "The cost at scale",
        tone: "brand",
        catch: "Blockchain data is large and read frequently.",
        body: "Chain snapshots are hundreds of GB. Analytics queries read the same datasets repeatedly. At $0.09/GB egress on AWS, a moderately active analytics workload generates egress bills that constrain how often teams re-query their own data.",
      },
    ],
  },

  features: {
    label: "For Web3-native teams",
    heading: (
      <>
        Storage built on Filecoin that <span className="text-brand-500">actually integrates.</span>
      </>
    ),
    sub: "Same S3 API your data stack already speaks, running on Filecoin infrastructure instead of a hyperscaler.",
    items: [
      {
        icon: Plug,
        title: "S3-compatible · existing tools work",
        desc: "boto3, aws-sdk, rclone, DuckDB, PyArrow fsspec — any tool that reads or writes S3 connects with an endpoint change. No new SDK, no wrapper library.",
      },
      {
        icon: Lock,
        title: "Built on Filecoin infrastructure",
        desc: "S3-compatible object storage built on Filecoin infrastructure — not a repackaged hyperscaler bucket. Your data lives on the same network your product is built around.",
      },
      {
        icon: ArrowsOut,
        title: "No egress on data reads",
        desc: "On-chain analytics pipelines, indexers, and research workflows that read data repeatedly pay $0 in egress. Data-intensive Web3 work costs what it stores.",
      },
      {
        icon: ChartLine,
        title: "Flat cost at any scale",
        desc: `${PRICE_PER_TB_SHORT} regardless of volume. Petabyte-scale research datasets, blockchain analytics archives, and developer infra pay the same rate per TB.`,
      },
    ],
  },

  cta: {
    heading: "Storage built on Filecoin that works.",
    subhead: "Free 1 TB evaluation. Connect your existing S3 tools and store data on Filecoin infrastructure in minutes.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const Web3NativeLandingPage = () => <LandingPage config={config} />;

export default Web3NativeLandingPage;
