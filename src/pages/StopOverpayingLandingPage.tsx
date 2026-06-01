import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import {
  CurrencyDollar,
  LockKey,
  Receipt,
  Check,
  Plug,
  ShieldCheck,
  Globe,
  ArrowRight,
} from "@phosphor-icons/react";

// ─── Grid texture ──────────────────────────────────────────────────────────────
const GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="1"/></svg>'
);

// ─── Typography helpers ────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span
    aria-hidden="true"
    style={{
      fontFamily: "'DM Mono', monospace",
      fontWeight: 500,
      fontSize: 11.5,
      letterSpacing: "0.08em",
      color: "#71717A",
      textTransform: "uppercase" as const,
    }}
  >
    {children}
  </span>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="text-[24px] md:text-[34px]"
    style={{
      fontFamily: "'Aspekta', sans-serif",
      fontWeight: 500,
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
      color: "#09090B",
      margin: 0,
    }}
  >
    {children}
  </h2>
);

const SectionSub = ({
  children,
  maxWidth = 560,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) => (
  <p
    className="text-[15px] md:text-[17px]"
    style={{
      fontFamily: "'Funnel Sans', sans-serif",
      fontWeight: 400,
      lineHeight: "1.65",
      color: "#71717A",
      maxWidth,
      margin: 0,
    }}
  >
    {children}
  </p>
);

// ─── Problem cards data ────────────────────────────────────────────────────────
const PROBLEM_CARDS = [
  {
    label: "Egress fees",
    icon: CurrencyDollar,
    catchLine: "You're getting charged every time you touch your own data.",
    body: "AWS, Google Cloud, and Azure bill you for egress — every download, every read, every customer request. A startup with 10 TB of data and active users can easily rack up $900/month in egress alone, on top of storage. Most teams don't notice until the bill hits and it's already too late.",
    footer: "The meter never stops.",
  },
  {
    label: "Vendor lock-in",
    icon: LockKey,
    catchLine: "The bigger you get, the harder it is to leave.",
    body: "Cloud providers design their pricing to make migration expensive. Moving 50 TB off AWS means paying egress on every byte you pull out — often $0.09/GB, or $4,500 just to get your own data back. Data gravity isn't a coincidence. It's the business model. By the time switching feels urgent, it already costs more than staying.",
    footer: "Lock-in is a feature, not a bug, for hyperscalers.",
  },
  {
    label: "Hidden complexity",
    icon: Receipt,
    catchLine: "Your storage bill has 11 line items. None of them make sense.",
    body: "Request fees, retrieval tiers, lifecycle transitions, data transfer within regions — cloud storage pricing was built to obscure the true cost until after you're already committed. Finance teams can't forecast it. Engineering teams don't have time to audit it. The result: you're paying 10× what storage actually costs.",
    footer: "Complexity is how they hide the markup.",
  },
];

// ─── Comparison table data ─────────────────────────────────────────────────────
// Scenario: 10 TB stored, 10 TB egress/month, 500K API ops
const PRICING_ROWS = [
  {
    provider: "AWS S3 Standard",
    region: "us-east-1",
    storage: "$235",
    egress: "$921",
    api: "$1.35",
    total: "$1,157",
    isFilOne: false,
  },
  {
    provider: "Google Cloud Storage",
    region: "us-central1",
    storage: "$205",
    egress: "$1,137",
    api: "$1.35",
    total: "$1,343",
    isFilOne: false,
  },
  {
    provider: "Azure Blob Storage",
    region: "East US",
    storage: "$184",
    egress: "$891",
    api: "$1.76",
    total: "$1,077",
    isFilOne: false,
  },
  {
    provider: "Wasabi",
    region: "us-east-1",
    storage: "$69.90",
    egress: "$0",
    api: "$0",
    total: "$69.90",
    isFilOne: false,
  },
  {
    provider: "Backblaze B2 ¹",
    region: "US West",
    storage: "$61",
    egress: "$0",
    api: "$0",
    total: "$61",
    isFilOne: false,
  },
  {
    provider: "Cloudflare R2",
    region: "Global",
    storage: "$154",
    egress: "$0",
    api: "$1.22",
    total: "$155",
    isFilOne: false,
  },
  {
    provider: "Fil One",
    region: "Global",
    storage: "$49.90",
    egress: "$0",
    api: "$0",
    total: "$49.90",
    isFilOne: true,
  },
];

const cellColor = (val: string, isEgress: boolean) => {
  if (!isEgress) return "#09090B";
  const n = parseFloat(val.replace(/[$,]/g, ""));
  if (n === 0) return "#15803D";
  if (n > 200) return "#dc2626";
  return "#52525B";
};

// ─── Pricing tiers data ────────────────────────────────────────────────────────
const PRICING_TIERS = [
  { label: "Starter", storage: "1 TB", price: "$4.99", note: "Free for 30 days" },
  { label: "Growing", storage: "10 TB", price: "$49.90", note: "Save ~$1,082/mo vs AWS" },
  { label: "Scale", storage: "50 TB", price: "$249.50", note: "Save ~$5,410/mo vs AWS" },
  { label: "Enterprise", storage: "Custom", price: "Custom", note: "Volume discounts + SLA" },
];

// ─── Feature cards data ────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: CurrencyDollar,
    title: "Zero egress fees",
    desc: "Every read, every download, every customer request — included. Your bill is exactly what you stored times $4.99. Nothing else.",
  },
  {
    icon: Plug,
    title: "Drop-in S3 compatibility",
    desc: "Change one endpoint URL. Your existing SDKs, tools, and scripts work unchanged. No migration project, no re-architecture.",
  },
  {
    icon: LockKey,
    title: "No vendor lock-in",
    desc: "S3-compatible means you can leave at any time with standard tooling. We don't charge egress to leave either. Your data is yours.",
  },
  {
    icon: ShieldCheck,
    title: "Verifiable durability",
    desc: "Every object gets a cryptographic fingerprint verified daily via Filecoin Proof of Spacetime. 11 nines durability with an audit trail.",
  },
  {
    icon: Receipt,
    title: "Predictable billing",
    desc: "One line item. Storage × rate. No egress tiers, no request fees, no per-operation charges. Finance can finally forecast storage costs.",
  },
  {
    icon: Globe,
    title: "Object Lock and versioning",
    desc: "Compliance and governance retention modes. Tamper-evident logs. Versioned history. Built for teams that can't afford to lose data.",
  },
];

// ─── Why it matters data ──────────────────────────────────────────────────────
const WHY_CARDS = [
  {
    number: "01",
    title: "Decrease costs",
    body: "Most teams cut their storage bill by 10–23× on day one. No egress fees means active workloads — serving customers, running ML pipelines, backing up data — don't compound the cost every month. $4.99/TB is the number. That's it.",
    stat: "Up to 23× cheaper than AWS for active workloads",
  },
  {
    number: "02",
    title: "Reduce risk",
    body: "Vendor lock-in is a business risk. Data gravity means that once you're deep enough with a hyperscaler, leaving costs more than staying — even when staying is costing too much. Staying S3-compatible and egress-free keeps your options open. You're never trapped.",
    stat: "$0 egress cost to leave if you ever want to",
  },
  {
    number: "03",
    title: "Increase revenue",
    body: "Storage that used to cost $8,000/month at AWS costs $400 here. That's $7,600/month that can go into product, sales, or margin. For a startup or SMB, storage savings aren't line-item optimization — they're runway.",
    stat: "$91K+ in annual savings for a 10 TB active workload vs AWS",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
const StopOverpayingLandingPage = () => {
  useSeo({
    title: "Stop Overpaying for Cloud Storage — Fil One at $4.99/TB",
    description:
      "Egress fees, hidden charges, and vendor lock-in are optional. Fil One is S3-compatible object storage at $4.99/TB flat — no egress fees, no per-request charges, no billing surprises. Free 30-day trial.",
    canonical: "https://fil.one/lp/stop-overpaying",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.05 });
  const { ref: tiersRef, inView: tiersInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: whyRef, inView: whyInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <LandingNavbar />

      <main className="flex-1 flex flex-col items-center">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative isolate pt-[58px]"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          {/* Blue radial glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
            }}
          />
          {/* Grid texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />

          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            {/* Announcement badge */}
            <div
              className="hero-fade-1 flex items-center gap-1.5 text-center"
              style={{
                backgroundColor: "#EFF8FF",
                border: "1px solid rgba(0,144,255,0.2)",
                borderRadius: 14,
                padding: "10px 14px",
                maxWidth: "90vw",
              }}
            >
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 13.5,
                  lineHeight: 1,
                  color: "#0070CC",
                }}
              >
                For startups and SMBs tired of cloud storage bills that don't make sense
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
                color: "#09090B",
                textAlign: "center",
                maxWidth: 660,
                margin: 0,
              }}
            >
              Stop overpaying.<br /><span style={{ color: "#0090FF" }}>Switch to $4.99/TB.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-[15px] md:text-[17px] hero-fade-2"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 520,
                margin: 0,
              }}
            >
              Fil One is S3-compatible object storage at $4.99/TB/month — flat. No egress fees, no per-request charges, no billing surprises. Drop it into your existing stack in minutes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Try 30 days for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>

            {/* Trust line */}
            <p
              className="hero-fade-4"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#71717A",
                textAlign: "center",
              }}
            >
              No credit card required · No egress fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* ── Problem cards ─────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 py-16 md:py-24 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            ref={problemRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[560px] mx-auto">
              <SectionLabel>The problem</SectionLabel>
              <SectionHeading>
                Cloud providers built their pricing to confuse you.
              </SectionHeading>
              <SectionSub>
                Egress fees, request charges, retrieval tiers — every line item is designed to make the real cost invisible until it's already on your card.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {PROBLEM_CARDS.map(({ label, icon: Icon, catchLine, body, footer }) => (
                <div
                  key={label}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow:
                      "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 2,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          backgroundColor: "#EFF8FF",
                          border: "1px solid rgba(0,144,255,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} color="#0090FF" />
                      </div>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 500,
                          fontSize: 10,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase" as const,
                          color: "#52525B",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: 18,
                        lineHeight: "1.3",
                        letterSpacing: "-0.01em",
                        color: "#09090B",
                      }}
                    >
                      {catchLine}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "#71717A",
                        marginTop: 4,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 px-7 py-4"
                    style={{
                      backgroundColor: "#F4F4F5",
                      borderTop: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <span style={{ color: "#71717A", fontSize: 11, flexShrink: 0 }}>
                      ✕
                    </span>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 13,
                        color: "#52525B",
                        lineHeight: 1.3,
                      }}
                    >
                      {footer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison table ──────────────────────────────────────────────── */}
        <section
          id="compare"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={pricingRef}
            className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${pricingInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Pricing comparison</SectionLabel>
              <SectionHeading>
                Your bill, <span style={{ color: "#0090FF" }}>side by side.</span>
              </SectionHeading>
              <SectionSub maxWidth={600}>
                10 TB stored, 10 TB egress per month, 500K object operations. This is what you're actually paying.
              </SectionSub>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 600,
                  borderCollapse: "collapse",
                  fontFamily: "'Funnel Sans', sans-serif",
                }}
              >
                <thead>
                  <tr>
                    {["Provider", "Region", "Storage", "Egress", "API / ops", "Total / month"].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "11px 16px",
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase" as const,
                            color: "#71717A",
                            borderBottom: "1px solid rgba(0,0,0,0.07)",
                            whiteSpace: "nowrap" as const,
                          }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {PRICING_ROWS.map((row, i) => (
                    <tr
                      key={row.provider}
                      style={{
                        backgroundColor: row.isFilOne
                          ? "#EFF8FF"
                          : i % 2 === 0
                          ? "#FFFFFF"
                          : "#FAFAFA",
                        outline: row.isFilOne
                          ? "2px solid rgba(0,144,255,0.25)"
                          : "none",
                        outlineOffset: row.isFilOne ? -1 : 0,
                      }}
                    >
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: 14,
                          fontWeight: row.isFilOne ? 700 : 500,
                          color: row.isFilOne ? "#0070CC" : "#09090B",
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                          whiteSpace: "nowrap" as const,
                        }}
                      >
                        {row.provider}
                        {row.isFilOne && (
                          <span
                            style={{
                              marginLeft: 8,
                              fontSize: 10,
                              fontWeight: 600,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase" as const,
                              backgroundColor: "#EFF8FF",
                              color: "#0060BB",
                              border: "1px solid rgba(0,96,187,0.25)",
                              borderRadius: 4,
                              padding: "2px 6px",
                            }}
                          >
                            Best value
                          </span>
                        )}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: 13,
                          color: "#71717A",
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                          whiteSpace: "nowrap" as const,
                        }}
                      >
                        {row.region}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#09090B",
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        {row.storage}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: 14,
                          fontWeight: 600,
                          color: cellColor(row.egress, true),
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        {row.egress}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: 14,
                          fontWeight: 500,
                          color: cellColor(row.api, false),
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        {row.api}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontSize: 15,
                          fontWeight: row.isFilOne ? 700 : 600,
                          color: row.isFilOne ? "#0070CC" : "#09090B",
                          borderBottom: "1px solid rgba(0,0,0,0.05)",
                          whiteSpace: "nowrap" as const,
                        }}
                      >
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 12,
                color: "#52525B",
                lineHeight: 1.6,
                maxWidth: 700,
              }}
            >
              Competitor prices from published rate cards, May 2026. AWS/GCP/Azure egress at standard internet transfer rates. GCS egress tiered: $0.12/GB first TB, $0.11/GB thereafter. ¹ Backblaze B2 includes 3× free egress (30 TB free at 10 TB stored); paid egress would be $0.01/GB. Fil One billed at $4.99/TB — no egress, no API fees.
            </p>
          </div>
        </section>

        {/* ── Pricing ladder ────────────────────────────────────────────────── */}
        <section
          id="pricing"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            ref={tiersRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${tiersInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[560px] mx-auto">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>
                One number. <span style={{ color: "#0090FF" }}>No asterisks.</span>
              </SectionHeading>
              <SectionSub>
                $4.99 per TB per month. Egress included. API calls included. No minimum storage. No minimum duration. Cancel any time.
              </SectionSub>
            </div>

            {/* Big price display */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-end gap-2">
                <span
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(64px, 12vw, 96px)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "#09090B",
                  }}
                >
                  $4.99
                </span>
                <span
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 20,
                    color: "#71717A",
                    paddingBottom: 10,
                  }}
                >
                  / TB / month
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {["No egress fees", "No per-request charges", "No minimum commitment"].map(
                  (item) => (
                    <span
                      key={item}
                      className="flex items-center gap-1.5"
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 14,
                        color: "#15803D",
                      }}
                    >
                      <Check size={14} color="#15803D" weight="bold" />
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Tiers grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.label}
                  className="flex flex-col rounded-2xl p-6"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.07)",
                    boxShadow:
                      "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      color: "#71717A",
                    }}
                  >
                    {tier.label}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Aspekta', sans-serif",
                        fontWeight: 500,
                        fontSize: 28,
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        color: "#09090B",
                        margin: 0,
                      }}
                    >
                      {tier.price}
                      {tier.price !== "Custom" && (
                        <span
                          style={{
                            fontFamily: "'Funnel Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: 14,
                            color: "#71717A",
                          }}
                        >
                          {" "}
                          /mo
                        </span>
                      )}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#71717A",
                        marginTop: 4,
                      }}
                    >
                      {tier.storage}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 12.5,
                      color: tier.label === "Starter" ? "#0060BB" : "#15803D",
                      lineHeight: 1.4,
                    }}
                  >
                    {tier.note}
                  </p>
                  <a
                    href={
                      tier.label === "Enterprise"
                        ? "/contact-sales"
                        : "https://app.fil.one/login?screen_hint=signup"
                    }
                    className="flex items-center gap-1.5 mt-auto"
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 13.5,
                      color: "#0060BB",
                      textDecoration: "none",
                    }}
                  >
                    {tier.label === "Enterprise" ? "Talk to us" : "Start free"}
                    <ArrowRight size={13} color="#0060BB" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={featuresRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[560px] mx-auto">
              <SectionLabel>Features</SectionLabel>
              <SectionHeading>
                Better product. <span style={{ color: "#0090FF" }}>Less money.</span>
              </SectionHeading>
              <SectionSub>
                Everything enterprise object storage should have been — without the enterprise pricing or the lock-in.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col rounded-2xl p-7"
                  style={{
                    backgroundColor: "#F9FAFB",
                    border: "1px solid rgba(0,0,0,0.06)",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: "#EFF8FF",
                      border: "1px solid rgba(0,144,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color="#0090FF" />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: 16,
                        lineHeight: "1.3",
                        color: "#09090B",
                        margin: 0,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "#71717A",
                        margin: 0,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why it matters ────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            ref={whyRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${whyInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[560px] mx-auto">
              <SectionLabel>Why it matters</SectionLabel>
              <SectionHeading>
                Companies buy for <span style={{ color: "#0090FF" }}>three reasons.</span> We check all three.
              </SectionHeading>
              <SectionSub>
                Every budget conversation comes down to cost, risk, and revenue. Fil One improves all three from day one.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {WHY_CARDS.map(({ number, title, body, stat }) => (
                <div
                  key={number}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex flex-col p-7" style={{ gap: 12, flex: 1 }}>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 500,
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        color: "#0090FF",
                      }}
                    >
                      {number}
                    </span>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: 18,
                        lineHeight: "1.3",
                        letterSpacing: "-0.01em",
                        color: "#09090B",
                        margin: 0,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "#71717A",
                        margin: 0,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                  <div
                    className="px-7 py-4"
                    style={{ backgroundColor: "#EFF8FF", borderTop: "1px solid rgba(0,144,255,0.12)" }}
                  >
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 13,
                        color: "#0070CC",
                        lineHeight: 1.4,
                        fontStyle: "italic",
                        margin: 0,
                      }}
                    >
                      {stat}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full">
          <div
            ref={ctaRef}
            className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(160deg, #07111F 0%, #0A1E35 50%, #060F1C 100%)",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 0 0 1px rgba(0,144,255,0.06), 0 32px 80px rgba(0,0,0,0.4)",
              }}
              className="px-8 md:px-16 py-14 md:py-20"
            >
              {/* Subtle blue glow top-left */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -120,
                  left: -80,
                  width: 480,
                  height: 480,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0,144,255,0.10) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              {/* Grid texture */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                    '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.04" stroke-width="1"/></svg>'
                  )}")`,
                  backgroundSize: "60px 60px",
                  pointerEvents: "none",
                }}
              />

              <div className="relative flex flex-col md:flex-row md:items-stretch" style={{ gap: 0 }}>

                {/* ── Left: main CTA ── */}
                <div className="flex flex-col justify-between gap-10 flex-1 pr-0 md:pr-14 py-2">
                  <div className="flex flex-col gap-5">
                    <h2
                      className="text-[28px] md:text-[38px]"
                      style={{
                        fontFamily: "'Aspekta', sans-serif",
                        fontWeight: 500,
                        letterSpacing: "-0.03em",
                        lineHeight: "1.08",
                        color: "#FFFFFF",
                        margin: 0,
                      }}
                    >
                      Your storage bill<br />should be boring.
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.50)",
                        margin: 0,
                        maxWidth: 380,
                      }}
                    >
                      $4.99/TB. No egress fees. Thirty days free to start.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-start gap-2.5">
                      <a
                        href="https://app.fil.one/login?screen_hint=signup"
                        className="btn-primary btn-primary-dark"
                      >
                        <span className="btn-primary-inner">Start free — no credit card</span>
                      </a>
                      <a href="/contact-sales" className="btn-secondary btn-secondary-dark">
                        Talk to an expert
                      </a>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontSize: 12,
                        letterSpacing: "0.01em",
                        color: "rgba(255,255,255,0.28)",
                      }}
                    >
                      No credit card required · No egress fees · Cancel anytime
                    </p>
                  </div>
                </div>

                {/* ── Vertical divider — gradient fade ── */}
                <div
                  className="hidden md:block flex-shrink-0"
                  style={{
                    width: 1,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.10) 20%, rgba(255,255,255,0.10) 80%, transparent 100%)",
                    margin: "0 56px",
                  }}
                />
                <div
                  className="block md:hidden"
                  style={{
                    height: 1,
                    background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.10) 20%, rgba(255,255,255,0.10) 80%, transparent 100%)",
                    margin: "36px 0",
                  }}
                />

                {/* ── Right: early adopter card ── */}
                <div
                  className="flex flex-col justify-between gap-8 py-2"
                  style={{ width: "100%", maxWidth: 340 }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#0090FF", flexShrink: 0 }} />
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 500,
                          fontSize: 10,
                          letterSpacing: "0.10em",
                          textTransform: "uppercase" as const,
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        Early adopter pricing
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Aspekta', sans-serif",
                        fontWeight: 500,
                        fontSize: 22,
                        letterSpacing: "-0.02em",
                        lineHeight: "1.18",
                        color: "#FFFFFF",
                        margin: 0,
                      }}
                    >
                      Moving serious data?<br />Let's talk.
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5">
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.45)",
                        margin: 0,
                      }}
                    >
                      We're offering special early adopter pricing for teams migrating large datasets — think 100 TB, 500 TB, petabyte-scale. Data gravity is real: we know moving is hard. We'll make the economics work so it's worth it.
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="/contact-sales"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: 14,
                          color: "#FFFFFF",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 10,
                          padding: "10px 18px",
                          textDecoration: "none",
                          backdropFilter: "blur(4px)",
                          transition: "background 0.15s",
                          alignSelf: "flex-start",
                        }}
                      >
                        Get early adopter pricing
                        <ArrowRight size={14} color="rgba(255,255,255,0.6)" />
                      </a>
                      <p
                        style={{
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontSize: 11.5,
                          color: "rgba(255,255,255,0.25)",
                          margin: 0,
                          letterSpacing: "0.01em",
                        }}
                      >
                        No commitment required to talk
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter tagline="S3-compatible object storage. Better product, less money." />
    </div>
  );
};

export default StopOverpayingLandingPage;
