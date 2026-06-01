/**
 * Workload comparison cards — 2-column grid with progress-bar comparisons.
 *
 * Each card shows a workload type (e.g. Creative & media, AI & ML) with
 * quantified stat rows comparing Fil One vs a competitor, plus a bottom
 * summary strip with a speed badge and savings multiplier.
 */

import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading, SectionSub } from "./Typography";

export interface StatRow {
  name: string;
  val: string;
  win: boolean;
}

export interface WorkloadStat {
  label: string;
  rows: StatRow[];
}

export interface WorkloadCard {
  tag: string;
  title: string;
  desc: string;
  stats: WorkloadStat[];
  speedBadge: string;
  savingsBadge: string;
}

interface WorkloadCardsProps {
  label: string;
  heading: React.ReactNode;
  sub?: React.ReactNode;
  subMaxWidth?: number;
  cards: WorkloadCard[];
}

const barVal = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;

const WorkloadCards = ({
  label,
  heading,
  sub,
  subMaxWidth = 460,
  cards,
}: WorkloadCardsProps) => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-10 w-full reveal${inView ? " in-view" : ""}`}
    >
      <div className="flex flex-col gap-3">
        <SectionLabel>{label}</SectionLabel>
        <SectionHeading>{heading}</SectionHeading>
        {sub && <SectionSub maxWidth={subMaxWidth}>{sub}</SectionSub>}
      </div>

      <div className="reveal-group grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((w, wi) => {
          return (
            <div
              key={w.tag}
              className={`reveal${inView ? " in-view" : ""}`}
              style={{
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 20,
                backgroundColor: "#FFFFFF",
                boxShadow:
                  "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                overflow: "hidden",
                transitionDelay: inView ? `${wi * 70}ms` : "0ms",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
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

              {/* Stats */}
              <div
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  padding: "20px 28px 0",
                }}
              >
                {w.stats.map((stat, si) => {
                  const vals = stat.rows.map((r) => barVal(r.val));
                  const maxVal = Math.max(...vals);
                  return (
                    <div key={stat.label} style={{ marginBottom: 20 }}>
                      {si > 0 && (
                        <div
                          style={{
                            height: 1,
                            backgroundColor: "rgba(0,0,0,0.06)",
                            margin: "0 0 20px",
                          }}
                        />
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
                        const pct =
                          maxVal === 0
                            ? 100
                            : Math.max(3, (vals[ri] / maxVal) * 100);
                        return (
                          <div
                            key={r.name}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              marginBottom: 8,
                            }}
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
                                  backgroundColor: r.win
                                    ? "#0090FF"
                                    : "#CBD5E1",
                                }}
                              />
                            </div>
                            <span
                              style={{
                                fontFamily: "'Funnel Sans', sans-serif",
                                fontWeight: r.win ? 700 : 400,
                                fontSize: 14,
                                color: r.win ? "#0070CC" : "#09090B",
                                width: 68,
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

              {/* Bottom summary strip */}
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
                    fontSize: 18,
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
  );
};

export default WorkloadCards;
