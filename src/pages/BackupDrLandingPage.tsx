import { ArrowsOut, Clock, ShieldCheck } from "@phosphor-icons/react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";

const GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="1"/></svg>'
);

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

const SectionSub = ({ children, maxWidth = 560 }: { children: React.ReactNode; maxWidth?: number }) => (
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

// Scenario: 50 TB retained for DR, plus one full restore of a 5 TB workload to
// recover from a failed primary. Restore line collapses storage + retrieval +
// egress for that one event.
const COMPARISON_ROWS = [
  {
    provider: "AWS S3 Standard",
    tier: "Hot",
    storage: "$1,178",
    restore5tb: "$461",
    retrievalNote: "Egress on every restore",
    isFilOne: false,
  },
  {
    provider: "AWS Glacier Instant",
    tier: "Cold (instant)",
    storage: "$205",
    restore5tb: "$512",
    retrievalNote: "Retrieval + egress fees",
    isFilOne: false,
  },
  {
    provider: "AWS Glacier Deep Archive",
    tier: "Archive",
    storage: "$51",
    restore5tb: "$563",
    retrievalNote: "+12 h restore wait",
    isFilOne: false,
  },
  {
    provider: "Wasabi",
    tier: "Hot",
    storage: "$350",
    restore5tb: "$0",
    retrievalNote: "90-day minimum retention",
    isFilOne: false,
  },
  {
    provider: "Fil One",
    tier: "Hot",
    storage: "$250",
    restore5tb: "$0",
    retrievalNote: "No retrieval. No egress.",
    isFilOne: true,
  },
];

const valueColor = (val: string) => {
  const n = parseFloat(val.replace(/[$,]/g, ""));
  if (n === 0) return "#16a34a";
  if (n > 300) return "#dc2626";
  return "#52525B";
};

const WORKLOADS = [
  {
    tag: "Full-region restore",
    title: "Recover a workload when the primary is gone",
    desc: "Pull every byte back. Standard S3 GET. No retrieval line item, no egress charge — the bill for the worst day is the same as the bill for any other day.",
    stats: [
      {
        label: "5 TB full restore",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "S3 Glacier", val: "$512", win: false },
        ],
      },
    ],
    speedBadge: "Restore is a GET, not a procurement event.",
    savingsBadge: "$0 per restore",
  },
  {
    tag: "Quarterly DR drills",
    title: "Test the restore plan as often as it should be tested",
    desc: "Most DR plans go untested because each drill costs real money. Free retrieval means quarterly — or monthly — drills cost what they should: nothing.",
    stats: [
      {
        label: "Cost per drill (1 TB pull)",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "S3 Glacier", val: "$102", win: false },
        ],
      },
      {
        label: "Annualised (4 drills)",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "S3 Glacier", val: "$410", win: false },
        ],
      },
    ],
    speedBadge: "Run drills until the runbook is right.",
    savingsBadge: "Test it for free",
  },
  {
    tag: "Granular file-level recovery",
    title: "Pull back a single file without a retrieval ticket",
    desc: "Tape and archive tiers tax small restores the same as full ones. Hot, S3-compatible storage means a single file recovery is a single GET — for $0.",
    stats: [
      {
        label: "1 GB single-file restore",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "S3 Glacier Deep", val: "$0.11", win: false },
        ],
      },
    ],
    speedBadge: "Recovery without a retrieval workflow.",
    savingsBadge: "Hot tier pricing",
  },
  {
    tag: "Object Lock & retention",
    title: "Compliance and ransomware protections, built in",
    desc: "Object Lock in Compliance or Governance mode. Per-object retention periods. Versioning. Ransomware can't overwrite or delete what is locked.",
    stats: [
      {
        label: "Lock modes",
        rows: [
          { name: "Fil One", val: "Both", win: true },
          { name: "S3 Standard", val: "Both", win: false },
        ],
      },
      {
        label: "Retention granularity",
        rows: [
          { name: "Fil One", val: "Per-object", win: true },
          { name: "S3 Standard", val: "Per-object", win: false },
        ],
      },
    ],
    speedBadge: "Same lock primitives as S3.",
    savingsBadge: "Audit-ready",
  },
];

const BackupDrLandingPage = () => {
  useSeo({
    title: "Fil One — Restore without the retrieval bill",
    description:
      "S3-compatible backup target at $4.99/TB flat. No retrieval fees. No egress. Object Lock and versioning included. Restore with the S3 tools your backup software already uses.",
    canonical: "https://fil.one/lp/backup-dr",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.05 });
  const { ref: workloadsRef, inView: workloadsInView } = useInView({ threshold: 0.05 });
  const { ref: restoreRef, inView: restoreInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <LandingNavbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative isolate pt-[58px]" style={{ backgroundColor: "#FFFFFF" }}>
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
                For backup & DR owners tired of retrieval invoices
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
                maxWidth: 760,
                margin: 0,
              }}
            >
              Restore without the<br />
              <span style={{ color: "#0090FF" }}>retrieval bill.</span>
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
              Flat $4.99/TB. No retrieval fees, no egress, no archive-tier wait. A hot, S3-compatible backup target you can actually afford to restore from.
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
              No credit card required · No retrieval fees · S3-compatible
            </p>
          </div>
        </section>

        {/* Problem — the restore tax */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={problemRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>The trap</SectionLabel>
              <SectionHeading>A backup you can't afford to restore isn't a backup.</SectionHeading>
              <SectionSub>
                Archive tiers win the storage-cost slide and lose the restore-cost conversation. By the time you need them, the bill is a new procurement event, the wait is measured in hours, and the DR drill nobody ran last quarter is now today's incident.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "Archive tiers",
                  pillBg: "#FFFBEB",
                  pillBorder: "rgba(180,83,9,0.2)",
                  pillColor: "#B45309",
                  body: "S3 Glacier Deep Archive holds bytes at under $1 per TB-month. Beautiful invoice. Then the actual restore is $20 per TB retrieved, plus $90 per TB egress, plus a 12-hour wait. You priced the storage and bought the worst day of your year.",
                  catch: "The bill arrives when you need the data.",
                },
                {
                  label: "Hot tiers",
                  pillBg: "#EFF8FF",
                  pillBorder: "rgba(0,144,255,0.2)",
                  pillColor: "#0070CC",
                  body: "S3 Standard restores instantly — and bills $90 per TB on the way out. A full-region restore on a 50 TB workload is several thousand dollars in egress alone, on top of the monthly storage line that was already the largest in your S3 invoice.",
                  catch: "Restore costs the same as everyday reads.",
                },
                {
                  label: "Untested DR plans",
                  pillBg: "#FEF2F2",
                  pillBorder: "rgba(220,38,38,0.2)",
                  pillColor: "#B91C1C",
                  body: "Each drill is a charge. So drills slip. The runbook ages. The exact path that runs at 3am is the one path nobody has run, on the cloud, with the current bucket layout, since the last reorg. The DR plan exists only on paper.",
                  catch: "Drills get skipped because they cost.",
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

        {/* Comparison table — restore is the column that matters */}
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
                Hold 50 TB. <span style={{ color: "#0090FF" }}>Restore 5 TB.</span>
              </SectionHeading>
              <SectionSub maxWidth={640}>
                Standard DR scenario. The cheap-to-store columns get expensive the day you actually need the data.
              </SectionSub>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 640,
                  borderCollapse: "collapse",
                  fontFamily: "'Funnel Sans', sans-serif",
                }}
              >
                <thead>
                  <tr>
                    {["Provider", "Tier", "Storage / mo", "5 TB restore", "Catch"].map((h) => (
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
                  {COMPARISON_ROWS.map((row) => (
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
                          color: row.isFilOne ? "#09090B" : "#52525B",
                        }}
                      >
                        {row.tier}
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
                          fontSize: row.isFilOne ? 16 : 13.5,
                          fontWeight: row.isFilOne ? 700 : 500,
                          color: row.isFilOne ? "#0070CC" : valueColor(row.restore5tb),
                        }}
                      >
                        {row.restore5tb}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13,
                          color: row.isFilOne ? "#09090B" : "#71717A",
                          fontStyle: row.isFilOne ? "normal" : "italic",
                        }}
                      >
                        {row.retrievalNote}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              AWS S3 Standard, Glacier Instant Retrieval, and Deep Archive rates from public US Q2 2026 rate cards. Restore line combines retrieval + egress for one 5 TB pull. Wasabi pricing assumes 90-day minimum retention met. Fil One is a flat-rate hot tier — no separate restore line.
            </p>
          </div>
        </section>

        {/* Workloads */}
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
              <SectionLabel>What you can actually do</SectionLabel>
              <SectionHeading>Backups you'll test. Restores you'll trust.</SectionHeading>
              <SectionSub maxWidth={500}>
                A backup target priced like cold storage and behaving like hot storage.
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
                                      width: 110,
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
                          fontSize: 15,
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

        {/* Restore performance — placeholder per brief */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={restoreRef}
            className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${restoreInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Restore performance</SectionLabel>
              <SectionHeading>Hot tier, not archive.</SectionHeading>
              <SectionSub maxWidth={600}>
                A backup target you can restore from at production read speed, using the same S3 SDK your backup software already speaks.
              </SectionSub>
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
              style={{ maxWidth: 960, margin: "0 auto" }}
            >
              {[
                {
                  icon: Clock,
                  label: "Restore latency",
                  value: "{{NEEDS PROOF: measured restore latency to first byte}}",
                  note: "Standard S3 GET — no thaw, no retrieval queue.",
                },
                {
                  icon: ArrowsOut,
                  label: "Restore throughput",
                  value: "{{NEEDS PROOF: measured restore throughput per client}}",
                  note: "Parallel-read friendly. Saturates a tuned S3 client.",
                },
                {
                  icon: ShieldCheck,
                  label: "Object Lock & versioning",
                  value: "Available",
                  note: "Compliance and Governance modes. Per-object retention.",
                },
              ].map(({ icon: Icon, label, value, note }) => (
                <div
                  key={label}
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: 16,
                    backgroundColor: "#FFFFFF",
                    padding: "24px 24px",
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
                      fontSize: 20,
                      letterSpacing: "-0.02em",
                      color: "#09090B",
                      margin: "4px 0 6px",
                      wordBreak: "break-word",
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
          </div>
        </section>

        {/* Pricing callout */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div className="flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>
                One rate. <span style={{ color: "#0090FF" }}>$4.99/TB/month.</span>
              </SectionHeading>
              <SectionSub maxWidth={520}>
                That is the whole bill. No retrieval. No egress. No archive-tier sleight of hand. The number on the invoice is the rate times the TB you keep.
              </SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#71717A",
              }}
            >
              No credit card required · No retrieval fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#F9FAFB" }}>
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
                  A backup target you'll actually test.
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
                  Free 1 TB evaluation. Point Veeam, Restic, MSP360, or any S3 client at the endpoint.
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
                  No credit card required · No retrieval fees · S3-compatible
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default BackupDrLandingPage;
