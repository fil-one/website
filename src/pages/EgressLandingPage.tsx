import { ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';
import { PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";


// Comparison row data. USD-denominated. Scenario: 10 TB stored + 10 TB read per
// month + 500K object operations. Numbers are computed from published rate cards
// (US, Q2 2026) — see source comments below the table.
const PRICING_ROWS = [
  {
    provider: "AWS S3 Standard",
    region: "us-east-1",
    storage: "$236",
    egress: "$913",
    api: "$2.50",
    total: "$1,151",
    isFilOne: false,
  },
  {
    provider: "Google Cloud Storage",
    region: "us multi-region",
    storage: "$205",
    egress: "$1,228",
    api: "$2.50",
    total: "$1,436",
    isFilOne: false,
  },
  {
    provider: "Azure Blob (Hot)",
    region: "East US",
    storage: "$184",
    egress: "$882",
    api: "$2.70",
    total: "$1,069",
    isFilOne: false,
  },
  {
    provider: "Wasabi",
    region: "us-east-1",
    storage: "$70",
    egress: "$0",
    api: "$0",
    total: "$70",
    isFilOne: false,
  },
  {
    provider: "Backblaze B2",
    region: "us-west-002",
    storage: "$60",
    egress: "$0",
    api: "$0",
    total: "$60",
    isFilOne: false,
  },
  {
    provider: "Fil One",
    region: "global",
    storage: "$50",
    egress: "$0",
    api: "$0",
    total: "$50",
    isFilOne: true,
  },
];

const valueColor = (val: string) => {
  const n = parseFloat(val.replace(/[$,]/g, ""));
  if (n === 0) return "#16a34a";
  if (n > 50) return "#dc2626";
  return "#52525B";
};

// Read-heavy workload cards. Bars scale to per-card max for visual clarity.
const WORKLOADS = [
  {
    tag: "Analytics",
    title: "Read your warehouse layer over and over",
    desc: "BI dashboards, ad-hoc SQL, scheduled exports. Each fresh query pulls a slice of the Parquet layer back out. On AWS, every pull is a line item.",
    stats: [
      {
        label: "Egress on 10 TB monthly reads",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "AWS S3", val: "$913", win: false },
        ],
      },
      {
        label: "Annualised egress alone",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "AWS S3", val: "$10,956", win: false },
        ],
      },
    ],
    speedBadge: "Same S3 SDK your warehouse already uses.",
    savingsBadge: "$11k/yr saved",
  },
  {
    tag: "Feature stores",
    title: "Serve features to every training job and online lookup",
    desc: "Training loops read the same feature set across hundreds of runs. Online inference re-reads the latest snapshot at request time. Reads dominate the bill.",
    stats: [
      {
        label: "Egress on 25 TB monthly reads",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "AWS S3", val: "$2,253", win: false },
        ],
      },
      {
        label: "Per-GB egress rate",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "AWS S3", val: "$0.09", win: false },
        ],
      },
    ],
    speedBadge: "Read budget stops capping experiment count.",
    savingsBadge: "$27k/yr saved",
  },
  {
    tag: "ML evals",
    title: "Re-run evals on the full set, every release",
    desc: "Eval pipelines pull the entire benchmark corpus each time you ship a model. On hyperscaler storage, you pay the same retrieval bill on every run.",
    stats: [
      {
        label: "Per-run egress (5 TB corpus)",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "AWS S3", val: "$451", win: false },
        ],
      },
      {
        label: "12 runs per month",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "AWS S3", val: "$5,408", win: false },
        ],
      },
    ],
    speedBadge: "Run evals as often as your team needs.",
    savingsBadge: "$65k/yr saved",
  },
  {
    tag: "Customer-facing reads",
    title: "Serve files to every paying user",
    desc: "Document vaults, media libraries, dataset distribution. Every paying customer pulling a file is a charge on AWS. On Fil One, it is free.",
    stats: [
      {
        label: "Egress on 1M user fetches (avg 5 MB)",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "AWS S3", val: "$439", win: false },
        ],
      },
      {
        label: "Cost per fetch",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "AWS S3", val: "$0.00044", win: false },
        ],
      },
    ],
    speedBadge: "Stop instrumenting reads to defend the bill.",
    savingsBadge: "Margin restored",
  },
];

const EgressLandingPage = () => {
  useSeo({
    title: "Fil One · Read your own data without the bill",
    description:
      `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. No egress fees. No per-request charges. Built for analytics, ML, and feature-store teams whose bill is driven by reading.`,
    canonical: "https://www.fil.one/lp/egress",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.05 });
  const { ref: workloadsRef, inView: workloadsInView } = useInView({ threshold: 0.05 });
  const { ref: flatRef, inView: flatInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative isolate pt-[58px] md:pt-[94px]" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />

          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
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
                For teams whose bill is driven by reading, not storing
              </span>
            </div>

            <h1
              className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
                color: "#09090B",
                textAlign: "center",
                maxWidth: 720,
                margin: 0,
              }}
            >
              Your storage is cheap.<br />
              <span style={{ color: "#0090FF" }}>Using it isn't.</span>
            </h1>

            <p
              className="text-[15px] md:text-[17px] hero-fade-2"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 560,
                margin: 0,
              }}
            >
              S3-compatible object storage at {PRICE_PER_TB_SHORT} flat. No egress. No per-request fees. Read your warehouse, eval set, or media library as often as your team needs to.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>

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

        {/* Problem — the egress trap */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={problemRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>The trap</SectionLabel>
              <SectionHeading>The bill grows with how often you read, not how much you keep.</SectionHeading>
              <SectionSub>
                Object storage pricing was written for a world where data sat still. Then teams started reading it. Now the storage line item is a rounding error and the egress line item is the bill.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "What you signed up for",
                  pillBg: "#EFF8FF",
                  pillBorder: "rgba(0,144,255,0.2)",
                  pillColor: "#0070CC",
                  body: "$0.023 per GB-month for storage. A 10 TB dataset is $236 a month. Reasonable. Manageable. Sized for the budget conversation.",
                  catch: "Storage is the line you priced.",
                },
                {
                  label: "What you actually pay",
                  pillBg: "#FFFBEB",
                  pillBorder: "rgba(180,83,9,0.2)",
                  pillColor: "#B45309",
                  body: "$0.09 per GB out to the internet. The same 10 TB read once a month is another $913. Read it on every dashboard refresh, every eval run, every customer fetch, and the bill compounds the way nobody priced for.",
                  catch: "Egress is the line that grew.",
                },
                {
                  label: "What that costs you",
                  pillBg: "#FEF2F2",
                  pillBorder: "rgba(220,38,38,0.2)",
                  pillColor: "#B91C1C",
                  body: "Teams start sampling, caching, gating who can re-run a notebook. The dataset becomes harder to use the more useful it gets. Reads turn into a budget conversation instead of an engineering one.",
                  catch: "You start rationing your own data.",
                },
              ].map(({ label, pillBg, pillBorder, pillColor, body, catch: catchLine }) => (
                <div
                  key={label}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: pillColor,
                        backgroundColor: pillBg,
                        border: `1px solid ${pillBorder}`,
                        borderRadius: 9999,
                        padding: "3px 10px",
                        marginBottom: 2,
                        alignSelf: "flex-start",
                      }}
                    >
                      {label}
                    </span>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table — egress is the star */}
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
              <SectionLabel>The comparison</SectionLabel>
              <SectionHeading>
                Read 10 TB a month. <span style={{ color: "#0090FF" }}>See where it lands.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                A 10 TB dataset, read in full each month, with 500,000 object operations. Same workload, six providers. Storage is a small slice; egress is the bill.
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
                    {["Provider", "Region", "Storage", "Egress", "API / ops", "Total / month"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "11px 16px",
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "#71717A",
                          borderBottom: "1px solid rgba(0,0,0,0.07)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRICING_ROWS.map((row) => (
                    <tr key={row.provider} style={{ backgroundColor: row.isFilOne ? "#EFF8FF" : "transparent" }}>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 14,
                          fontWeight: row.isFilOne ? 700 : 500,
                          color: row.isFilOne ? "#0070CC" : "#09090B",
                        }}
                      >
                        {row.provider}
                        {row.isFilOne && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              marginLeft: 8,
                              backgroundColor: "#EFF8FF",
                              border: "1px solid rgba(0,144,255,0.2)",
                              color: "#0070CC",
                              fontFamily: "'Funnel Sans', sans-serif",
                              fontSize: 11,
                              fontWeight: 500,
                              padding: "2px 8px",
                              borderRadius: 9999,
                              verticalAlign: "middle",
                              whiteSpace: "nowrap",
                            }}
                          >
                            You
                          </span>
                        )}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13.5,
                          fontWeight: row.isFilOne ? 500 : 400,
                          color: row.isFilOne ? "#09090B" : "#52525B",
                        }}
                      >
                        {row.region}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13.5,
                          fontWeight: row.isFilOne ? 600 : 400,
                          color: row.isFilOne ? "#09090B" : "#52525B",
                        }}
                      >
                        {row.storage}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13.5,
                          fontWeight: row.isFilOne ? 600 : 500,
                          color: row.isFilOne ? "#09090B" : valueColor(row.egress),
                        }}
                      >
                        {row.egress}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13.5,
                          fontWeight: row.isFilOne ? 600 : 500,
                          color: row.isFilOne ? "#09090B" : valueColor(row.api),
                        }}
                      >
                        {row.api}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: row.isFilOne ? 17 : 13.5,
                          fontWeight: row.isFilOne ? 700 : 400,
                          color: row.isFilOne ? "#0070CC" : "#52525B",
                        }}
                      >
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              AWS S3 Standard, Google Cloud Storage Standard, and Azure Blob Hot egress and request fees taken from public US rate cards (Q2 2026). Storage shown at first-50 TB tier; egress at first-10 TB tier; ops at 500K mixed PUT/GET. Wasabi flat $6.99/TB; Backblaze B2 $6/TB with first 3× stored-volume egress included.
            </p>
          </div>
        </section>

        {/* Workloads — read-heavy patterns */}
        <section
          id="workloads"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            ref={workloadsRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${workloadsInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Read-heavy workloads</SectionLabel>
              <SectionHeading>Built for the way data actually gets used.</SectionHeading>
              <SectionSub maxWidth={500}>
                Egress goes from the biggest line item to no line item at all.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WORKLOADS.map((w, wi) => {
                const barVal = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
                return (
                  <div
                    key={w.tag}
                    className={`reveal${workloadsInView ? " in-view" : ""}`}
                    style={{
                      border: "1px solid rgba(0,0,0,0.07)",
                      borderRadius: 20,
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                      overflow: "hidden",
                      transitionDelay: workloadsInView ? `${wi * 70}ms` : "0ms",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ padding: "28px 28px 24px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: "#EFF8FF",
                          border: "1px solid rgba(0,144,255,0.2)",
                          borderRadius: 9999,
                          padding: "4px 12px",
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 500,
                          fontSize: 10.5,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#0070CC",
                          marginBottom: 16,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {w.tag}
                      </span>
                      <h3
                        style={{
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: 20,
                          color: "#09090B",
                          marginBottom: 10,
                          lineHeight: "1.3",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {w.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: 14,
                          color: "#71717A",
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {w.desc}
                      </p>
                    </div>

                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "20px 28px 0" }}>
                      {w.stats.map((stat, si) => {
                        const vals = stat.rows.map((r) => barVal(r.val));
                        const maxVal = Math.max(...vals);
                        return (
                          <div key={stat.label} style={{ marginBottom: 20 }}>
                            {si > 0 && (
                              <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.06)", margin: "0 0 20px" }} />
                            )}
                            <p
                              style={{
                                fontFamily: "'DM Mono', monospace",
                                fontWeight: 500,
                                fontSize: 10,
                                letterSpacing: "0.09em",
                                textTransform: "uppercase",
                                color: "#94a3b8",
                                marginBottom: 12,
                              }}
                            >
                              {stat.label}
                            </p>
                            {stat.rows.map((r, ri) => {
                              const pct = maxVal === 0 ? 100 : Math.max(3, (vals[ri] / maxVal) * 100);
                              return (
                                <div
                                  key={r.name}
                                  style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}
                                >
                                  <span
                                    style={{
                                      fontFamily: "'Funnel Sans', sans-serif",
                                      fontWeight: r.win ? 600 : 400,
                                      fontSize: 13.5,
                                      color: "#09090B",
                                      width: 100,
                                      flexShrink: 0,
                                    }}
                                  >
                                    {r.name}
                                  </span>
                                  <div
                                    style={{
                                      flex: 1,
                                      height: 10,
                                      backgroundColor: "rgba(0,0,0,0.06)",
                                      borderRadius: 99,
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: `${pct}%`,
                                        height: "100%",
                                        borderRadius: 99,
                                        backgroundColor: r.win ? "#0090FF" : "#CBD5E1",
                                      }}
                                    />
                                  </div>
                                  <span
                                    style={{
                                      fontFamily: "'Funnel Sans', sans-serif",
                                      fontWeight: r.win ? 700 : 400,
                                      fontSize: 14,
                                      color: r.win ? "#0070CC" : "#09090B",
                                      width: 84,
                                      textAlign: "right",
                                      flexShrink: 0,
                                    }}
                                  >
                                    {r.val}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>

                    <div
                      style={{
                        margin: "4px 16px 16px",
                        borderRadius: 12,
                        backgroundColor: "#EFF8FF",
                        padding: "14px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        marginTop: "auto",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: 13.5,
                          color: "#52525B",
                        }}
                      >
                        {w.speedBadge}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: 16,
                          color: "#0070CC",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {w.savingsBadge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing — the flat-rate callout */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={flatRef}
            className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${flatInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>
                One rate. <span style={{ color: "#0090FF" }}>{PRICE_PER_TB_MONTH}.</span>
              </SectionHeading>
              <SectionSub maxWidth={520}>
                Storage. That is the whole bill. No egress fees. No per-request charges. No retrieval tier. The number on the invoice is the rate times the TB you keep.
              </SectionSub>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
              style={{ maxWidth: 960 }}
            >
              {[
                { icon: ArrowsOut, label: "Egress", value: "$0", note: "Read as often as you want." },
                { icon: ChartLine, label: "Per-request fees", value: "$0", note: "PUT, GET, LIST — all included." },
                { icon: Plug, label: "S3 compatibility", value: "Drop-in", note: "Point your SDK at the endpoint." },
              ].map(({ icon: Icon, label, value, note }) => (
                <div
                  key={label}
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: 16,
                    backgroundColor: "#FFFFFF",
                    padding: "24px 24px",
                    textAlign: "left",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{ backgroundColor: "#EFF8FF", marginBottom: 16 }}
                  >
                    <Icon size={18} color="#0090FF" />
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#71717A",
                      margin: 0,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Aspekta', sans-serif",
                      fontWeight: 500,
                      fontSize: 28,
                      letterSpacing: "-0.02em",
                      color: "#09090B",
                      margin: "4px 0 6px",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: "#71717A",
                      margin: 0,
                    }}
                  >
                    {note}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>
          </div>
        </section>

        {/* Dark CTA banner */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={ctaRef}
            className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)",
                borderRadius: 20,
                textAlign: "center",
              }}
              className="px-6 md:px-12 py-16 md:py-[104px]"
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                    '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>'
                  )}")`,
                  backgroundSize: "60px 60px",
                  maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <h2
                  className="text-[26px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: "1.12",
                    color: "#FFFFFF",
                    marginBottom: 12,
                  }}
                >
                  Stop paying to read your own data.
                </h2>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 17,
                    color: "rgba(255,255,255,0.60)",
                    marginBottom: 32,
                  }}
                >
                  Free 1 TB evaluation bucket. Drop your existing S3 endpoint in and run the same queries.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Start for free</span>
                  </a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">
                    Talk to an expert
                  </a>
                </div>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.60)",
                    marginTop: 16,
                  }}
                >
                  No credit card required · No egress fees · Connects in minutes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EgressLandingPage;
