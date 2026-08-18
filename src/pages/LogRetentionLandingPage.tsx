import { Database, ChartLine, Plug, ShieldCheck } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No per-request fees · Connects in minutes";

// Per-request math, 100M PUT/month.
// AWS S3: $0.005/1K = $500. Google Cloud: $0.05/10K Class A = $500. Azure: $0.055/10K = $550.
// Wasabi, Backblaze B2, Fil One: $0 per request.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Stop sampling your logs to save money",
    description: `S3-compatible log storage at ${PRICE_PER_TB_SHORT} flat. No per-request fees. Drop in as a Vector, Fluent Bit, or OTel sink and keep every event.`,
    canonical: "https://www.fil.one/lp/log-retention",
  },

  hero: {
    badge: "For platform & observability teams",
    titleMaxWidth: 760,
    descriptionMaxWidth: 580,
    title: (
      <>
        Stop sampling your logs
        <br />
        <span className="text-brand-500">to save money.</span>
      </>
    ),
    description: `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat. No per-request fees, no egress. Keep every event, every span, every audit trail — without watching the PUT counter.`,
    ctas: [
      { label: "Start for free", href: SIGNUP_URL, variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The trap",
    heading: "Logs are billed per write. Logs are written constantly.",
    sub: "Hyperscaler object storage charges per PUT. A logging pipeline writes by definition. The cheapest way to make the bill smaller is to keep fewer logs — and the price paid for that decision is paid later, in the incident postmortem you cannot reconstruct.",
    items: [
      {
        label: "What you write",
        tone: "warning",
        catch: "Each write is a metered event.",
        body: "100 million PUTs per month is a modest production logging workload. On AWS S3 that is $500 in request charges alone, before a single byte of storage is billed.",
      },
      {
        label: "What you store",
        tone: "danger",
        catch: "Storage is the smaller line.",
        body: "10 TB of compressed log data per month is normal for a mid-size platform. Add storage at $0.023/GB and egress for any query that reads back — the bill closes in on $750 a month before you draw a single dashboard.",
      },
      {
        label: "What you give up",
        tone: "brand",
        catch: "The bill picks which events to keep.",
        body: "Engineering reacts by sampling. Trace volume gets capped. Debug logs get truncated. The dashboard you finally build only has the events that survived the budget meeting.",
      },
    ],
  },

  comparison: {
    label: "How it lands",
    heading: (
      <>
        A logging sink that <span className="text-brand-500">doesn't bill per event.</span>
      </>
    ),
    sub: "Vector, Fluent Bit, Logstash, OpenTelemetry — anything that already writes S3 — gets a new endpoint. The PUT counter stops mattering.",
    subMaxWidth: 620,
    caption: "Per-request cost at 100M PUTs/month, by provider",
    columns: [
      { key: "rate", header: "Rate" },
      { key: "total", header: "Monthly (100M PUTs)", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { rate: "$0.005 / 1K PUT", total: "$500.00" } },
      { provider: "Google Cloud", values: { rate: "$0.05 / 10K Class A", total: "$500.00" } },
      { provider: "Azure Blob", values: { rate: "$0.055 / 10K writes", total: "$550.00" } },
      { provider: "Wasabi", values: { rate: "$0 per request", total: "$0" } },
      { provider: "Backblaze B2", values: { rate: "$0 per request", total: "$0" } },
      { provider: "Fil One", isFilOne: true, values: { rate: "$0 per request", total: "$0" } },
    ],
    footnote:
      "Public US rate cards, Q2 2026. Storage and egress not included in this line — they are extra on the metered tiers, and zero on Fil One.",
  },

  features: {
    label: "Why it works",
    heading: (
      <>
        A sink that <span className="text-brand-500">scales with retention, not write rate.</span>
      </>
    ),
    sub: "Same S3 API, same SDKs. The only thing that changes is the line item that used to dominate the bill.",
    subMaxWidth: 560,
    items: [
      {
        icon: Database,
        title: "No per-request fees",
        desc: "PUT, GET, LIST, HEAD — all included. The line item that dominates a logging workload on AWS does not exist here.",
      },
      {
        icon: Plug,
        title: "S3-compatible logging",
        desc: "Vector, Fluent Bit, Logstash, OpenTelemetry collectors, Loki — all of them write S3. Point them at the Fil One endpoint and ship.",
      },
      {
        icon: ChartLine,
        title: "Predictable bill",
        desc: "Storage charges grow with what you keep, not with how loudly your services log. A noisy deploy stops being a billing event.",
      },
      {
        icon: ShieldCheck,
        title: "Versioning and Object Lock",
        desc: "Immutable audit logs by default. Compliance-mode retention for SOC 2, ISO 27001, and HIPAA evidence retention periods.",
      },
    ],
  },

  cta: {
    heading: "Keep every log.",
    subhead: "Free 1 TB evaluation. Point your existing collector at the endpoint and watch the request line zero out.",
    cta: { label: "Start for free", href: SIGNUP_URL },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const LogRetentionLandingPage = () => <LandingPage config={config} />;

export default LogRetentionLandingPage;
