import { Database, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No per-PUT fees · Connects in minutes";

// Per-PUT comparison: 1 billion PUTs/month.
// AWS S3: $0.005/1K = $5,000. Google Cloud: $0.05/10K = $5,000. Azure: $0.055/10K = $5,500.
// Wasabi, Backblaze B2, Fil One: $0 per request.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Scrape at scale without the per-PUT bill",
    description: `${PRICE_PER_TB_SHORT} flat storage. No per-PUT charges, no egress fees. Run large-scale web scraping and data collection pipelines without per-write billing.`,
    canonical: "https://www.fil.one/lp/web-scraping",
  },

  hero: {
    badge: "For teams running large-scale scraping pipelines",
    titleMaxWidth: 760,
    descriptionMaxWidth: 580,
    title: (
      <>
        Scrape at scale.
        <br />
        <span className="text-brand-500">Keep all of it.</span>
      </>
    ),
    description: `${PRICE_PER_TB_SHORT} flat. No per-PUT charges, no egress, S3-compatible. Collection pipelines that bill per write shrink the dataset the budget allows.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The trap",
    heading: "High-write pipelines pay per write.",
    sub: "A scraping pipeline writes constantly by design. At per-PUT pricing, the collection operation itself, not the dataset it produces, becomes the largest line item.",
    items: [
      {
        label: "The PUT bill",
        tone: "warning",
        catch: "1 billion writes. $5,000 in fees.",
        body: "AWS S3 charges $0.005 per 1,000 PUTs. A pipeline writing 1 billion objects per month incurs $5,000 in PUT fees alone, before a byte of storage is billed. The collection operation is its own cost centre.",
      },
      {
        label: "The coverage decision",
        tone: "danger",
        catch: "The budget decides what gets collected.",
        body: "Teams start pruning scope not because the data has no value, but because the write cost does not discriminate. Lower-priority domains get dropped. Crawl frequency gets reduced. The dataset reflects budget constraints, not coverage goals.",
      },
      {
        label: "The egress hit",
        tone: "brand",
        catch: "Processing your own collection costs extra.",
        body: "Deduplicating, enriching, and classifying the scraped corpus reads it back from storage. On AWS, $0.09/GB egress means reading 10 TB of collected content costs $900. Collection pipelines pay twice.",
      },
    ],
  },

  comparison: {
    label: "The proof",
    heading: (
      <>
        Same S3 upload call. <span className="text-brand-500">Zero per-PUT counter.</span>
      </>
    ),
    sub: "Any scraping framework that writes to S3 works without modification. Swap the endpoint; remove the per-write ceiling.",
    subMaxWidth: 620,
    caption: "Request fees only, at 1 billion PUTs/month, by provider",
    columns: [
      { key: "rate", header: "Rate" },
      { key: "total", header: "Monthly (1B PUTs)", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { rate: "$0.005 / 1K PUT", total: "$5,000" } },
      { provider: "Google Cloud", values: { rate: "$0.05 / 10K ops", total: "$5,000" } },
      { provider: "Azure Blob", values: { rate: "$0.055 / 10K writes", total: "$5,500" } },
      { provider: "Wasabi", values: { rate: "$0 per request", total: "$0" } },
      { provider: "Backblaze B2", values: { rate: "$0 per request", total: "$0" } },
      { provider: "Fil One", isFilOne: true, values: { rate: "$0 per request", total: "$0" } },
    ],
    footnote:
      "Public US rate cards, Q2 2026. Storage and egress not included. Request fees only. AWS: 1,000,000,000 / 1,000 × $0.005 = $5,000. Google: 1,000,000,000 / 10,000 × $0.05 = $5,000. Azure: 1,000,000,000 / 10,000 × $0.055 = $5,500.",
  },

  features: {
    label: "Why it works",
    heading: (
      <>
        Collection cost that scales with <span className="text-brand-500">dataset size, not write rate.</span>
      </>
    ),
    sub: "The only change is the endpoint. Write volume stops being a billing event.",
    subMaxWidth: 560,
    items: [
      {
        icon: Database,
        title: "No per-PUT fees",
        desc: "1 billion PUTs per month on Fil One costs $0 in request charges. The only cost is the storage that results from collection.",
      },
      {
        icon: ArrowsOut,
        title: "No egress on processing",
        desc: "Read the scraped corpus back for enrichment, deduplication, or classification without a $0.09/GB charge on every pass.",
      },
      {
        icon: ChartLine,
        title: "Predictable collection cost",
        desc: `Storage at ${PRICE_PER_TB_SHORT}. The write rate determines the dataset size; the dataset size determines the cost. No request-rate multiplier.`,
      },
      {
        icon: Plug,
        title: "S3-compatible, drop-in",
        desc: "Any framework that writes files (Scrapy, Crawlee, Playwright pipelines) works with standard S3 upload APIs. Swap the endpoint.",
      },
    ],
  },

  cta: {
    heading: "Collect without the PUT counter.",
    subhead: "Free 30-day trial with 1 TB of storage and 2 TB of egress. Swap the endpoint in your existing scraping framework and watch the request line zero out.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const WebScrapingLandingPage = () => <LandingPage config={config} />;

export default WebScrapingLandingPage;
