import { ArrowsOut, ChartLine, Plug, Database } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { COMPETITORS, PRICE_DISPLAY, PRICE_PER_TB, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

/** Whole-dollar display for a monthly total, e.g. 269.5 -> "$270". */
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const byName = (name: string) => COMPETITORS.find((c) => c.name === name)!;

// Scenario inputs (TB): library stored, delivered to viewers per month.
const STORED_TB = 10;
const DELIVERED_TB = 50;

const WASABI = byName("Wasabi");
const B2 = byName("Backblaze B2");
const R2 = byName("Cloudflare R2");
// B2 bills egress only beyond its free allowance (a multiple of stored TB).
const b2Storage = STORED_TB * B2.storagePricePerTB;
const b2Egress =
  Math.max(0, DELIVERED_TB - (B2.freeEgressMultiplier ?? 0) * STORED_TB) * B2.egressPricePerTB;
const wasabiStorage = STORED_TB * WASABI.storagePricePerTB;
const r2Storage = STORED_TB * R2.storagePricePerTB;
const filOneStorage = STORED_TB * PRICE_PER_TB;

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// Media delivery scenario: 10 TB library stored, 50 TB delivered to viewers/month.
// AWS S3 Standard eu-west-1 Q2 2026: storage 10,240 GB x $0.023 = $235.52.
//   Egress 50 TB: 10,240 GB x $0.09 + 40,960 GB x $0.085 = $921.60 + $3,481.60 = $4,403.20.
// Wasabi, Backblaze B2, Cloudflare R2, and Fil One are computed from COMPETITORS /
// PRICE_PER_TB above. B2's first 3x stored (30 TB) of egress is free; the other 20 TB is billed.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Your media library shouldn't bleed money on delivery",
    description: `S3-compatible object storage, ${PRICE_PER_TB_SHORT} flat, $0 egress. Store media libraries and deliver at scale without egress fees eating your margin.`,
    canonical: "https://www.fil.one/lp/media",
  },

  hero: {
    badge: "For media, CTV, and OTT teams",
    titleMaxWidth: 800,
    descriptionMaxWidth: 580,
    title: (
      <>
        Your media library shouldn't
        <br />
        <span className="text-brand-500">bleed money on delivery</span>
      </>
    ),
    description: `S3-compatible object storage, ${PRICE_PER_TB_SHORT} flat, $0 egress. Store the library and deliver at scale without egress fees eating margin.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to sales", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The trap",
    heading: "Storage is cheap. Delivery is the bill.",
    sub: "Media storage pricing looks manageable until someone streams it. The egress line grows proportionally to usage, exactly the direction the business wants to go.",
    items: [
      {
        label: "The storage illusion",
        tone: "warning",
        catch: "Storage looks cheap. Delivery does not.",
        body: "A 10 TB media library on AWS S3 costs $236/month in storage. Delivering that same 10 TB to viewers once costs $921 in egress. Deliver it five times and the egress bill is $4,403. The library is not the cost.",
      },
      {
        label: "The usage trap",
        tone: "danger",
        catch: "More viewers means a higher storage bill.",
        body: "Egress fees scale with audience. A viral clip, a successful release, a live event: the moments that make media valuable are the moments the storage bill peaks. The business model works against itself.",
      },
      {
        label: "The margin problem",
        tone: "brand",
        catch: "Egress eats the delivery margin.",
        body: "For streaming platforms, CDN delivery costs are already a significant operating cost. Adding $0.09/GB in origin egress on top of CDN fees makes the storage-to-delivery economics difficult to model profitably.",
      },
    ],
  },

  comparison: {
    label: "The delivery comparison",
    heading: (
      <>
        10 TB library. <span className="text-brand-500">50 TB delivered per month.</span>
      </>
    ),
    sub: "Same workload, five providers. Monthly storage for the library plus egress for 50 TB of viewer delivery.",
    subMaxWidth: 620,
    caption: "Monthly cost for a 10 TB library and 50 TB of viewer delivery, by provider",
    columns: [
      { key: "storage", header: "10 TB storage" },
      { key: "egress", header: "50 TB egress", colorByValue: true },
      { key: "total", header: "Total / month", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$236", egress: "$4,403", total: "$4,639" } },
      {
        provider: "Cloudflare R2",
        values: { storage: usd(r2Storage), egress: "$0", total: usd(r2Storage) },
      },
      {
        provider: "Backblaze B2",
        values: { storage: usd(b2Storage), egress: usd(b2Egress), total: usd(b2Storage + b2Egress) },
      },
      {
        provider: "Wasabi",
        values: { storage: usd(wasabiStorage), egress: "$0", total: usd(wasabiStorage) },
      },
      {
        provider: "Fil One",
        isFilOne: true,
        values: { storage: usd(filOneStorage), egress: "$0", total: usd(filOneStorage) },
      },
    ],
    footnote:
      `AWS S3 Standard eu-west-1, public rate card Q2 2026. AWS storage: 10,240 GB × $0.023 = $235.52. AWS egress 50 TB: 10,240 GB × $0.09 + 40,960 GB × $0.085 = $4,403.20. Cloudflare R2 $${R2.storagePricePerTB}/TB, $0 egress. Backblaze B2 $${B2.storagePricePerTB}/TB; egress free up to ${B2.freeEgressMultiplier}x stored, then $${B2.egressPricePerTB}/TB (20 TB billed). Wasabi $${WASABI.storagePricePerTB}/TB, $0 egress. Fil One ${PRICE_PER_TB_SHORT}, $0 egress.`,
  },

  features: {
    label: "Built for delivery",
    heading: (
      <>
        A media origin that <span className="text-brand-500">doesn't bill per view.</span>
      </>
    ),
    sub: "S3-compatible origin storage with zero egress fees, at any library size.",
    items: [
      {
        icon: ArrowsOut,
        title: "Zero egress fees",
        desc: "Every viewer fetch is a read from origin storage. On Fil One those reads cost nothing. The delivery margin is not eaten by the storage provider.",
      },
      {
        icon: Database,
        title: "Store the full library",
        desc: `At ${PRICE_PER_TB_SHORT} flat, a 10 TB media library costs ${usd(10 * PRICE_PER_TB)}/month. A 100 TB library costs ${usd(100 * PRICE_PER_TB)}. The rate per TB does not increase with library size.`,
      },
      {
        icon: Plug,
        title: "S3-compatible origin",
        desc: "Media players, CDNs, and delivery pipelines that read from S3 origins connect without modification. Swap the endpoint; the delivery stack does not change.",
      },
      {
        icon: ChartLine,
        title: "Predictable delivery cost",
        desc: `Storage × ${PRICE_DISPLAY}. The number of views, downloads, or streams in a month does not change the storage bill. Viral moments are not billing events.`,
      },
    ],
  },

  cta: {
    heading: "Store the library. Skip the egress.",
    subhead: "Free 1 TB evaluation. Upload a few assets, stream them, and watch the egress line stay at zero.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to sales", href: SALES_URL },
    note: TAGLINE,
  },
};

const MediaLandingPage = () => <LandingPage config={config} />;

export default MediaLandingPage;
