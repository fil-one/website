import { ChartLine, ArrowsOut, Plug, ShieldCheck } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_DISPLAY, PRICE_PER_TB, PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

/** Whole-dollar amount, e.g. "$1,157". */
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

const FIL_10TB = usd(10 * PRICE_PER_TB);

// Same 10 TB workload, 10 TB read/month, on each provider's meter. Rates match COMPETITORS.
// AWS eu-west-1: 10,240x$0.023 = $235.52 storage + 10,240x$0.09 = $921.60 egress ~ $1,157.
// Cloudflare R2: 10x$15 = $150, $0 egress.
// Backblaze B2: 10x$6.95 = $69.50; 10 TB read is inside the free 3x egress allowance.
// Fil One: 10xPRICE_PER_TB, $0 egress.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Watch the meter you're not paying",
    description: `Hyperscalers meter every read, request, and byte out. Fil One is flat ${PRICE_PER_TB_SHORT} with no egress and no per-request fees. See the side-by-side.`,
    canonical: "https://www.fil.one/lp/cost-ticker",
  },

  hero: {
    badge: "No more cloud bill surprises",
    titleMaxWidth: 760,
    descriptionMaxWidth: 600,
    title: (
      <>
        Watch the meter
        <br />
        <span className="text-brand-500">you're not paying</span>
      </>
    ),
    description: `Hyperscalers meter every read, every request, every byte out. Fil One is flat ${PRICE_PER_TB_SHORT}, with no egress and no per-request fees. Same workload, side by side.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to sales", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The invisible meter",
    heading: "The bill is a surprise because the meter runs where you can't see it.",
    sub: "Storage looks cheap on the rate card. The cost shows up later, metered against activity you don't watch in real time, and lands as a number nobody forecast.",
    subMaxWidth: 620,
    items: [
      {
        label: "The egress meter",
        tone: "warning",
        catch: "Every read ticks at $0.09/GB.",
        body: "Reading 10 TB back from AWS in a month adds $922, nearly 4× the $236 storage charge. The meter runs hardest exactly when your data is most useful.",
      },
      {
        label: "The request meter",
        tone: "danger",
        catch: "Every operation is counted.",
        body: "PUT, GET, LIST, and HEAD each carry a per-thousand charge. A busy pipeline or a chatty app spins the counter all month, and the total only appears at the end.",
      },
      {
        label: "The month-end reveal",
        tone: "brand",
        catch: "You learn the cost after you've spent it.",
        body: "Activity-metered billing means the invoice is a report of what already happened. There's no knob to turn in advance, only a number to absorb afterward.",
      },
    ],
  },

  comparison: {
    label: "The meter, side by side",
    heading: (
      <>
        10 TB stored, <span className="text-brand-500">10 TB read in a month.</span>
      </>
    ),
    sub: "The same workload on four providers. On AWS the egress meter is the whole story. On Fil One it reads zero.",
    subMaxWidth: 620,
    caption: "Monthly cost for 10 TB stored, 10 TB read, by provider",
    columns: [
      { key: "storage", header: "Storage" },
      { key: "egress", header: "Egress meter", colorByValue: true },
      { key: "total", header: "Total / month", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$236", egress: "$922", total: "$1,157" } },
      { provider: "Cloudflare R2", values: { storage: "$150", egress: "$0", total: "$150" } },
      { provider: "Backblaze B2", values: { storage: "$70", egress: "$0", total: "$70" } },
      { provider: "Fil One", isFilOne: true, values: { storage: FIL_10TB, egress: "$0", total: FIL_10TB } },
    ],
    footnote:
      `Published list rates, September 2026. AWS S3 eu-west-1: 10,240 GB × $0.023 = $235.52 storage + 10,240 GB × $0.09 = $921.60 egress. Cloudflare R2: $15/TB storage, $0 egress. Backblaze B2: $6.95/TB storage; egress is free up to 3× stored, then $10/TB. AWS and R2 also charge per request, not included. Fil One: ${PRICE_DISPLAY}/TB, $0 egress, no per-request fees.`,
  },

  features: {
    label: "Meters you don't pay",
    heading: (
      <>
        The bill is the rate <span className="text-brand-500">times what you store. No meters.</span>
      </>
    ),
    sub: "Flat storage pricing with nothing metered underneath it.",
    items: [
      {
        icon: ArrowsOut,
        title: "No egress meter",
        desc: "Every byte you read on a hyperscaler ticks the egress meter at $0.09/GB. On Fil One that meter doesn't exist. Reads are included.",
      },
      {
        icon: ChartLine,
        title: "No request meter",
        desc: "PUT, GET, LIST, HEAD all run a per-operation counter elsewhere. Here they're free, so a busy month doesn't become an expensive one.",
      },
      {
        icon: Plug,
        title: "S3-compatible",
        desc: "Point your existing tools at the endpoint. The workload doesn't change, only the meter that was quietly running underneath it.",
      },
      {
        icon: ShieldCheck,
        title: "The invoice you can predict",
        desc: `Stored TB times ${PRICE_DISPLAY}. You know December's bill in January, because nothing in between is metered.`,
      },
    ],
  },

  cta: {
    heading: `Turn off the meter. ${PRICE_PER_TB_MONTH}.`,
    headingMaxWidth: 560,
    subhead: "Storage only, with no egress meter, no request meter, and no tiers. Free 1 TB evaluation: run your real workload and compare the invoice. The egress line will read zero.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to sales", href: SALES_URL },
    note: TAGLINE,
  },
};

const CostTickerLandingPage = () => <LandingPage config={config} />;

export default CostTickerLandingPage;
