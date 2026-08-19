import { ArrowsOut, CurrencyDollar, Plug, Lock } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// Access comparison scenario: 10 TB stored, 5 TB/month delivered (IIIF tiles, downloads).
// AWS S3 Standard: storage 10,240 GB x $0.023/GB ~= $236/mo. Egress: 5,120 GB x $0.09/GB
//   ~= $461/mo. All-in ~= $697/mo.
// Wasabi: $6.99/TB = $70/mo, egress free within fair-use policy.
// Fil One: $4.99/TB = $50/mo, no egress fees, ever.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Open the collection. Close the tab.",
    description: `Serve digital collections and IIIF imagery with $0 egress. Flat ${PRICE_PER_TB_SHORT} storage, S3-compatible for IIIF image servers.`,
    canonical: "https://www.fil.one/lp/collections-access",
  },

  hero: {
    badge: "For digital collections & IIIF publishing",
    titleMaxWidth: 820,
    descriptionMaxWidth: 580,
    title: (
      <>
        Open the collection.
        <br />
        <span className="text-brand-500">Close the tab.</span>
      </>
    ),
    description: `Flat ${PRICE_PER_TB_SHORT}. Serve IIIF imagery and downloads at $0 egress, no matter how many people open it.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The access penalty",
    heading: "You digitized it to be seen. Then access became the expensive part.",
    sub: "On metered storage, every view of a high-resolution image is an egress charge. The more your collection is used, the more it costs — so open access starts to feel like a budget liability.",
    items: [
      {
        label: "Popularity is a penalty",
        tone: "warning",
        catch: "Every view adds to your invoice.",
        body: "IIIF deep-zoom delivers 50–200 tiles per image. A single popular exhibition or a class assignment can move terabytes in a month. On per-GB egress, the most-loved part of the collection generates the biggest invoice.",
      },
      {
        label: "The unpredictable invoice",
        tone: "danger",
        catch: "You cannot budget a number you cannot predict.",
        body: "Egress depends on traffic you do not control — a viral object, a linked syllabus, a scraper. A storage line that should be flat becomes a variable you reconcile every month and cannot forecast for the year.",
      },
      {
        label: "Access controls as cost control",
        tone: "brand",
        catch: "Rationing access to manage a bill.",
        body: "Teams throttle resolution, gate downloads, or cache aggressively — not to support preservation, but to keep egress down. The mission is open access; the pricing model quietly works against it.",
      },
    ],
  },

  comparison: {
    label: "The comparison",
    heading: (
      <>
        10 TB stored. <span className="text-brand-500">5 TB delivered a month.</span>
      </>
    ),
    sub: "Same collection, same monthly IIIF and download traffic, three providers. Storage, the egress charged to serve it, and the all-in monthly cost.",
    subMaxWidth: 640,
    caption: "Monthly cost for 10 TB stored, 5 TB delivered, by provider",
    columns: [
      { key: "storage", header: "Storage 10 TB/mo" },
      { key: "egress", header: "Egress 5 TB/mo", colorByValue: true },
      { key: "allIn", header: "All-in / mo", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$236", egress: "$461", allIn: "$697" } },
      { provider: "Wasabi", values: { storage: "$70", egress: "$0", allIn: "$70" } },
      { provider: "Fil One", isFilOne: true, values: { storage: "$50", egress: "$0", allIn: "$50" } },
    ],
    footnote:
      "Scenario: 10 TB stored with 5 TB/month delivered to viewers (IIIF tiles, derivatives, downloads). AWS S3 Standard: ≈$236/mo storage ($0.023/GB) + 5 TB egress (5,120 GB × $0.09/GB) ≈ $461/mo ≈ $697/mo all-in. Wasabi: $6.99/TB = $70/mo, egress-free within fair-use limits; traffic-heavy collections may incur charges. Fil One: $4.99/TB = $50/mo, $0 egress. AWS and Wasabi rates from public US price cards, Q2 2026; figures indicative and rounded.",
  },

  features: {
    label: "Access without the meter",
    heading: <><span className="text-brand-500">Open access far and wide.</span> The bill does not move.</>,
    sub: "$0 egress, IIIF compatibility, and immutable masters — access without a per-view tax.",
    items: [
      {
        icon: ArrowsOut,
        title: "$0 egress, always",
        desc: "Every IIIF tile request, every full-resolution download, every researcher who opens the collection reads at zero egress cost. Access volume never changes the bill.",
      },
      {
        icon: CurrencyDollar,
        title: `Flat ${PRICE_PER_TB_SHORT}`,
        desc: `One rate for storage, nothing for delivery. The bill is your stored TBs times ${PRICE_DISPLAY} — predictable enough to put in a budget line that holds for years.`,
      },
      {
        icon: Plug,
        title: "IIIF server compatible",
        desc: "Serve directly from the standard S3 API that IIIF image servers like Cantaloupe and IIPImage already read. Point the tile source at Fil One — no re-architecture.",
      },
      {
        icon: Lock,
        title: "Object Lock for preservation",
        desc: "Configure retention from 1 day to 100 years at the bucket level, so master files behind every derivative and tile can't be altered or deleted early.",
      },
    ],
  },

  cta: {
    heading: "Open access, flat bill.",
    subhead: "Start for free with 1 TB. Point your IIIF server at Fil One and serve the collection — at zero egress cost.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const CollectionsAccessLandingPage = () => <LandingPage config={config} />;

export default CollectionsAccessLandingPage;
