import { ArrowsOut, ChartLine, CurrencyDollar, Lock } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// 1 PB stored, 200 TB re-analysed per month. AWS S3 Standard us-east-1 Q2 2026:
// tiered storage (first 50 TB $0.023/GB, next 450 TB $0.022/GB, over 500 TB
// $0.021/GB) = $22,067.20 for 1,024,000 GB. Egress: 204,800 GB x $0.09 = $18,432.
// Fil One: 1,000 TB x $4.99 = $4,990, egress $0.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Petabyte retention without the petabyte bill",
    description: `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat for genomics and research data. Zero egress fees on re-analysis, flat pricing at any scale. Keep the whole dataset for years.`,
    canonical: "https://www.fil.one/lp/genomics",
  },

  hero: {
    badge: "For genomics and research teams with long-retention datasets",
    titleMaxWidth: 800,
    descriptionMaxWidth: 580,
    title: (
      <>
        Petabyte retention
        <br />
        <span className="text-brand-500">without the petabyte bill.</span>
      </>
    ),
    description: `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat, with zero egress fees so re-analysis doesn't cost extra. Keep the whole dataset, for years.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The problem",
    heading: "Petabyte datasets cost petabytes to keep and petabytes to re-analyse.",
    sub: "Genomics data is produced once but analysed repeatedly, often years later as pipelines improve. Standard storage pricing charges again on every analysis.",
    items: [
      {
        label: "The storage bill",
        tone: "warning",
        catch: "1 PB on AWS costs $22,067/month.",
        body: "AWS S3 Standard at tiered rates ($0.023/GB for the first 50 TB, $0.022 for the next 450 TB, $0.021 after) add up to $22,067/month for a single petabyte, before a single analysis read.",
      },
      {
        label: "The re-analysis cost",
        tone: "danger",
        catch: "Running a new pipeline means paying egress again.",
        body: "Re-analysing 200 TB of sequencing data with a new variant-calling pipeline incurs 204,800 GB × $0.09 = $18,432 in egress on AWS. Teams plan re-analysis cycles around the egress cost, not the science.",
      },
      {
        label: "The access delay",
        tone: "brand",
        catch: "Cold storage means waiting to analyse.",
        body: "Archive tiers save on storage but add retrieval delays and fees before a dataset is usable again. A five-year-old dataset should be as fast to query as one uploaded yesterday.",
      },
    ],
  },

  comparison: {
    label: "The numbers",
    heading: (
      <>
        1 PB stored. <span className="text-brand-500">200 TB re-analysed per month.</span>
      </>
    ),
    sub: "Monthly storage for 1 PB plus egress for 200 TB of analysis reads. Computed from public US rate cards, Q2 2026.",
    subMaxWidth: 620,
    caption: "Monthly cost for 1 PB stored, 200 TB re-analysed, by provider",
    columns: [
      { key: "storage1pb", header: "1 PB storage/mo" },
      { key: "egress200tb", header: "200 TB egress/mo", colorByValue: true },
      { key: "total", header: "Total / month", total: true },
    ],
    rows: [
      {
        provider: "AWS S3 Standard",
        values: { storage1pb: "$22,067", egress200tb: "$18,432", total: "$40,499" },
      },
      {
        provider: "Fil One",
        isFilOne: true,
        values: { storage1pb: "$4,990", egress200tb: "$0", total: "$4,990" },
      },
    ],
    footnote:
      "AWS S3 Standard us-east-1 Q2 2026 storage: tiered rates. First 50 TB $0.023/GB ($1,177.60), next 450 TB $0.022/GB ($10,137.60), over 500 TB $0.021/GB ($10,752.00) = $22,067.20 for 1,024,000 GB. AWS egress: 204,800 GB × $0.09 = $18,432. Fil One: 1,000 TB × $4.99 = $4,990, egress $0.",
  },

  features: {
    label: "Research storage",
    heading: (
      <>
        Keep the whole dataset. <span className="text-brand-500">For years.</span>
      </>
    ),
    sub: "S3-compatible storage built for data that's written once and read for years.",
    items: [
      {
        icon: Lock,
        title: "Object Lock retention",
        desc: "Configure retention from 1 day to 100 years at the bucket level, so a long-retention dataset can't be deleted or altered early.",
      },
      {
        icon: ArrowsOut,
        title: "No egress on analysis",
        desc: "Re-analysing the dataset from a new pipeline, re-running variant calling, or sharing data with collaborators costs $0 in egress. The cost is the bytes you keep.",
      },
      {
        icon: ChartLine,
        title: "Consistent at any scale",
        desc: "The same S3 API whether you store 1 TB or 1 PB. No storage tiers, no rehydration delay before a dataset is usable.",
      },
      {
        icon: CurrencyDollar,
        title: "Flat petabyte pricing",
        desc: `${PRICE_PER_TB_SHORT} regardless of scale. 1 TB and 1 PB pay the same rate per TB. Retention decisions are not driven by storage-tier economics.`,
      },
    ],
  },

  cta: {
    heading: "Keep the whole dataset. For years.",
    subhead: "Free 30-day trial with 1 TB of storage and 2 TB of egress. Upload a dataset slice and confirm your existing analysis tooling connects without modification.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const GenomicsLandingPage = () => <LandingPage config={config} />;

export default GenomicsLandingPage;
