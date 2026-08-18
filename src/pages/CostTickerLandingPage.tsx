import { ChartLine, ArrowsOut, Plug, ShieldCheck } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// Same 10 TB workload, 10 TB read/month, on each provider's meter.
// AWS: 10,240x$0.023 = $235.52 storage + 10,240x$0.09 = $921.60 egress ~ $1,157.
// Google: 10,240x$0.020 = $204.80 + 10,240x$0.12 = $1,228.80 ~ $1,434.
// Azure (Hot): ~$184 storage + 10,240x$0.087 = $890.88 ~ $1,075.
// Fil One: 10x$4.99 = $49.90, $0 egress.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Watch the meter you're not paying",
    description: `Hyperscalers meter every read, request, and byte out. Fil One is flat ${PRICE_PER_TB_SHORT} with no egress and no per-request fees. See the side-by-side.`,
    canonical: "https://www.fil.one/lp/cost-ticker",
  },

  hero: {
    badge: "For anyone tired of cloud bill surprises",
    titleMaxWidth: 760,
    descriptionMaxWidth: 600,
    title: (
      <>
        Watch the meter
        <br />
        <span className="text-brand-500">you're not paying.</span>
      </>
    ),
    description: `Hyperscalers meter every read, every request, every byte out. Fil One is flat ${PRICE_PER_TB_SHORT} — no egress, no per-request fees. Same workload, side by side.`,
    ctas: [
      { label: "Start for free", href: SIGNUP_URL, variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The invisible meter",
    heading: "The bill is a surprise because the meter runs where you can't see it.",
    sub: "Storage looks cheap on the rate card. The cost shows up later, metered against activity you don't watch in real time — and lands as a number nobody forecast.",
    subMaxWidth: 620,
    items: [
      {
        label: "The egress meter",
        tone: "warning",
        catch: "Every read ticks at $0.09/GB.",
        body: "Reading 10 TB back from AWS in a month adds $922 — nearly 4× the $236 storage charge. The meter runs hardest exactly when your data is most useful.",
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
        body: "Activity-metered billing means the invoice is a report of what already happened. There's no knob to turn in advance — only a number to absorb afterward.",
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
    sub: "The same workload on four providers. Storage barely moves; the egress meter is the whole story — and on Fil One it reads zero.",
    subMaxWidth: 620,
    caption: "Monthly cost for 10 TB stored, 10 TB read, by provider",
    columns: [
      { key: "storage", header: "Storage" },
      { key: "egress", header: "Egress meter", colorByValue: true },
      { key: "total", header: "Total / month", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$236", egress: "$922", total: "$1,157" } },
      { provider: "Google Cloud", values: { storage: "$205", egress: "$1,229", total: "$1,434" } },
      { provider: "Azure Blob (Hot)", values: { storage: "$184", egress: "$891", total: "$1,075" } },
      { provider: "Fil One", isFilOne: true, values: { storage: "$50", egress: "$0", total: "$50" } },
    ],
    footnote:
      "Public US rate cards, Q2 2026. AWS: 10,240 GB × $0.023 = $235.52 storage + 10,240 GB × $0.09 = $921.60 egress. Google: $0.020/GB storage + $0.12/GB egress. Azure Hot: ~$0.018/GB storage + $0.087/GB egress. Fil One: $4.99/TB, $0 egress, no per-request fees.",
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
        desc: "Every byte you read on a hyperscaler ticks the egress meter at $0.09/GB. On Fil One that meter doesn't exist — reads are included.",
      },
      {
        icon: ChartLine,
        title: "No request meter",
        desc: "PUT, GET, LIST, HEAD all run a per-operation counter elsewhere. Here they're free, so a busy month doesn't become an expensive one.",
      },
      {
        icon: Plug,
        title: "S3-compatible",
        desc: "Point your existing tools at the endpoint. The workload doesn't change — only the meter that was quietly running underneath it.",
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
    subhead: "Storage only — no egress meter, no request meter, no tiers. Free 1 TB evaluation: run your real workload and compare the invoice. The egress line will read zero.",
    cta: { label: "Start for free", href: SIGNUP_URL },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const CostTickerLandingPage = () => <LandingPage config={config} />;

export default CostTickerLandingPage;
