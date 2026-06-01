/**
 * Pricing / comparison table used on landing pages.
 *
 * Supports arbitrary columns and rows, with the Fil One row highlighted.
 * Egress/API cells are colour-coded: $0 → green, high fees → red.
 */

import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading, SectionSub } from "./Typography";

export interface ComparisonColumn {
  key: string;
  header: string;
}

export interface ComparisonRow {
  /** Values keyed by column key */
  [key: string]: string | boolean | undefined;
  /** If true, this row is highlighted as Fil One */
  isFilOne?: boolean;
}

interface ComparisonTableProps {
  label: string;
  heading: React.ReactNode;
  sub?: React.ReactNode;
  subMaxWidth?: number;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  footnote?: string;
}

/** Colours egress/API cells: $0 → green, large fees → red */
const valueColor = (val: string) => {
  const n = parseFloat(val.replace(/[$€,]/g, ""));
  if (n === 0) return "#16a34a";
  if (n > 50) return "#dc2626";
  return "#52525B";
};

const MONEY_COLS = new Set(["egress", "api", "total"]);

const ComparisonTable = ({
  label,
  heading,
  sub,
  subMaxWidth = 600,
  columns,
  rows,
  footnote,
}: ComparisonTableProps) => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-8 w-full reveal${inView ? " in-view" : ""}`}
    >
      <div className="flex flex-col gap-3">
        <SectionLabel>{label}</SectionLabel>
        <SectionHeading>{heading}</SectionHeading>
        {sub && <SectionSub maxWidth={subMaxWidth}>{sub}</SectionSub>}
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
              {columns.map((col) => (
                <th
                  key={col.key}
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
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const isFilOne = row.isFilOne === true;
              return (
                <tr
                  key={ri}
                  style={{
                    backgroundColor: isFilOne ? "#EFF8FF" : "transparent",
                  }}
                >
                  {columns.map((col, ci) => {
                    const val = String(row[col.key] ?? "");
                    const isProvider = ci === 0;
                    const isTotal = col.key === "total";
                    const isMoney = MONEY_COLS.has(col.key);

                    return (
                      <td
                        key={col.key}
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: isFilOne && isTotal ? 17 : isProvider ? 14 : 13.5,
                          fontWeight: isFilOne
                            ? isProvider
                              ? 700
                              : 600
                            : isProvider
                            ? 500
                            : isMoney
                            ? 500
                            : 400,
                          color: isFilOne
                            ? isProvider || isTotal
                              ? "#0070CC"
                              : "#09090B"
                            : isProvider
                            ? "#09090B"
                            : isMoney
                            ? valueColor(val)
                            : "#52525B",
                        }}
                      >
                        {val}
                        {isFilOne && isProvider && (
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
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {footnote && (
        <p className="text-xs text-slate-500 mt-4">{footnote}</p>
      )}
    </div>
  );
};

export default ComparisonTable;
