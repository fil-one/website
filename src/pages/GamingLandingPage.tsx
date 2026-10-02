import { ArrowsOut, ChartLine, Plug, Database } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

/** Whole-dollar display for a monthly total, e.g. 2995 -> "$2,995". */
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// Cost-at-scale, 50% egress ratio (reads = 50% of stored volume per month).
// AWS S3 Standard eu-west-1 Q2 2026 (storage tiered $0.023/GB first 50 TB,
// $0.022/GB next 450 TB; egress tiered $0.09/GB first 10 TB, $0.085 next 40 TB,
// $0.07 next 100 TB, $0.05 beyond):
//   1 TB:   storage 1,024x$0.023=$23.55, egress 512x$0.09=$46.08. Total $70.
//   10 TB:  storage 10,240x$0.023=$235.52, egress 5,120x$0.09=$460.80. Total $696.
//   100 TB: storage (51,200x$0.023)+(51,200x$0.022)=$2,304,
//           egress (10,240x$0.09)+(40,960x$0.085)=$4,403.20. Total $6,707.
//   500 TB: storage (51,200x$0.023)+(460,800x$0.022)=$11,315.20,
//           egress (10,240x$0.09)+(40,960x$0.085)+(102,400x$0.07)+(102,400x$0.05)=$16,691.20. Total $28,006.
// Fil One: 1/10/100/500 TB x PRICE_PER_TB (computed below).
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Player data that scales without bill shock",
    description: `${PRICE_PER_TB_SHORT} flat storage for game studios. Store player data, UGC, and game assets without egress fees or per-request billing. No bill shock on growth.`,
    canonical: "https://www.fil.one/lp/gaming",
  },

  hero: {
    badge: "For game studios",
    titleMaxWidth: 760,
    descriptionMaxWidth: 580,
    title: (
      <>
        Player data that scales
        <br />
        <span className="text-brand-500">without bill shock</span>
      </>
    ),
    description: `${PRICE_PER_TB_SHORT} flat. No egress, no per-request fees, S3-compatible. Storage cost grows linearly with your player base, not ahead of it.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to sales", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The trap",
    heading: "Spiky growth makes hyperscaler storage bills unpredictable.",
    sub: "Player data, UGC, replays, and game assets grow with the game. On AWS, storage cost scales with volume but egress scales with activity, and player activity is exactly what you're trying to drive.",
    items: [
      {
        label: "Launch day",
        tone: "warning",
        catch: "Traffic spikes become egress bills.",
        body: "A successful launch or live event brings player spikes. On AWS, every asset served (game files, player avatars, replays) adds to the egress counter. The best day for the game is the most expensive day for the storage bill.",
      },
      {
        label: "UGC growth",
        tone: "danger",
        catch: "More uploads means more reads means more cost.",
        body: "User-generated content that gets shared, downloaded, and viewed is high-read storage. On per-egress pricing, popular UGC costs more to serve than unpopular UGC. The platform success penalizes the infrastructure bill.",
      },
      {
        label: "The surprise invoice",
        tone: "brand",
        catch: "Storage forecasts omit egress.",
        body: "Infra cost planning for a game typically models storage volume. Egress is an activity multiplier that is hard to forecast without production data. The invoice after a good month regularly surprises.",
      },
    ],
  },

  comparison: {
    label: "Flat vs tiered",
    heading: (
      <>
        What storage costs <span className="text-brand-500">as the game grows.</span>
      </>
    ),
    sub: "AWS S3 Standard vs Fil One at 50% egress ratio (reads = half of stored volume per month), at increasing scale.",
    subMaxWidth: 620,
    caption: "Monthly cost at increasing scale, 50% egress ratio, AWS S3 Standard vs Fil One",
    columns: [
      { key: "t1", header: "1 TB" },
      { key: "t10", header: "10 TB" },
      { key: "t100", header: "100 TB" },
      { key: "t500", header: "500 TB", total: true },
    ],
    rows: [
      {
        provider: "AWS S3 Standard",
        values: { t1: "$70", t10: "$696", t100: "$6,707", t500: "$28,006" },
      },
      {
        provider: "Fil One",
        isFilOne: true,
        values: {
          t1: usd(PRICE_PER_TB),
          t10: usd(10 * PRICE_PER_TB),
          t100: usd(100 * PRICE_PER_TB),
          t500: usd(500 * PRICE_PER_TB),
        },
      },
    ],
    footnote:
      `AWS S3 Standard eu-west-1 Q2 2026: storage tiered $0.023/GB (first 50 TB), $0.022/GB (next 450 TB); egress tiered $0.09/GB (first 10 TB), $0.085 (next 40 TB), $0.07 (next 100 TB), $0.05 beyond. Fil One ${PRICE_PER_TB_SHORT} flat, egress $0. Computed from stated inputs. 1 TB: 1,024 GB × $0.023 = $23.55 storage + 512 GB × $0.09 = $46.08 egress; 500 TB: (51,200 × $0.023) + (460,800 × $0.022) = $11,315.20 storage + 256,000 GB tiered egress = $16,691.20.`,
  },

  features: {
    label: "Built for games",
    heading: (
      <>
        Storage that grows with <span className="text-brand-500">player count, not bill.</span>
      </>
    ),
    sub: "Flat, S3-compatible storage for player data, UGC, and game assets.",
    items: [
      {
        icon: ChartLine,
        title: "Flat, predictable cost",
        desc: "One rate per TB. Player growth, UGC spikes, and live-event surges don't change the rate. Cost planning for storage is one multiplication.",
      },
      {
        icon: ArrowsOut,
        title: "No egress fees",
        desc: "Serving game assets, player replays, or UGC to clients costs $0 in egress. Multiplayer downloads are not a billing event.",
      },
      {
        icon: Database,
        title: "S3-compatible",
        desc: "Standard S3 SDKs for asset pipelines, save-game syncs, and replay storage. Drop in as a replacement without changing the existing upload code.",
      },
      {
        icon: Plug,
        title: "No per-request fees",
        desc: "High-frequency asset reads during matchmaking, lobby loading, and live sessions don't accrue per-GET charges. Request rate is not a cost input.",
      },
    ],
  },

  cta: {
    heading: "Flat storage for unpredictable growth.",
    subhead: "Free 1 TB evaluation. Connect your existing S3 asset pipeline and see a storage bill that doesn't react to player activity.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to sales", href: SALES_URL },
    note: TAGLINE,
  },
};

const GamingLandingPage = () => <LandingPage config={config} />;

export default GamingLandingPage;
