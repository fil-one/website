import type { ReactNode } from "react";

export interface PriceComparisonColumn {
  /** Key into each row's `values` map. */
  key: string;
  /** Column header text. */
  header: string;
  /**
   * Colour the cell by magnitude — zero reads as success, a large charge as
   * danger, anything else stays neutral. Used for the egress and API columns,
   * where the point of the table is that one provider charges nothing.
   */
  colorByValue?: boolean;
  /** The bill total: rendered larger and bolder on the highlighted row. */
  total?: boolean;
}

export interface PriceComparisonRow {
  provider: string;
  /** Highlights the row (tinted background, brand text, "You" pill). */
  isFilOne?: boolean;
  /** Cell values keyed by column key. */
  values: Record<string, string>;
}

interface PriceComparisonTableProps {
  /** The value columns, left to right. The provider column is implicit. */
  columns: PriceComparisonColumn[];
  rows: PriceComparisonRow[];
  /** Accessible name for the table, e.g. "Monthly cost by provider". */
  caption: string;
  /** Header above the implicit provider column. */
  providerHeader?: string;
  /** Sourcing / methodology note rendered under the table. */
  footnote?: ReactNode;
  /** Pill text on the highlighted row. */
  highlightLabel?: string;
  /** Centres the footnote (to match a centred section heading). */
  centerFootnote?: boolean;
}

/**
 * Parse a formatted currency string to a number, tolerating both the English
 * ("$1,234.56") and Spanish ("1.234,56 $") conventions. Whichever of "." or ","
 * comes last is the decimal separator when 1 to 2 digits follow it; otherwise
 * every separator is thousands grouping. Returns NaN for non-numeric values,
 * which falls through to the neutral tone.
 */
const parseAmount = (value: string) => {
  const digits = value.replace(/[^0-9.,-]/g, "");
  const lastSep = Math.max(digits.lastIndexOf("."), digits.lastIndexOf(","));
  if (lastSep === -1) return parseFloat(digits);
  const trailing = digits.length - lastSep - 1;
  if (trailing < 1 || trailing > 2) return parseFloat(digits.replace(/[.,]/g, ""));
  return parseFloat(`${digits.slice(0, lastSep).replace(/[.,]/g, "")}.${digits.slice(lastSep + 1)}`);
};

/** Zero reads as success, a large charge as danger, anything else neutral. */
const valueTone = (value: string) => {
  const n = parseAmount(value);
  if (n === 0) return "text-success-700";
  if (n > 50) return "text-danger-600";
  return "text-zinc-600";
};

const HighlightPill = ({ label }: { label: string }) => (
  <span className="inline-flex items-center align-middle whitespace-nowrap rounded-full bg-brand-50 border border-brand/20 px-2 py-0.5 font-sans text-[11px] font-medium text-brand-600">
    {label}
  </span>
);

/**
 * Side-by-side monthly-cost table used across the `/lp/*` landing pages: one
 * row per provider with the Fil One row highlighted, plus a sourcing footnote.
 *
 * Below `md` it renders as stacked cards rather than a horizontally scrolling
 * table, so the numbers stay readable on a phone. Only one of the two layouts
 * is in the accessibility tree at a time (the other is `display: none`).
 *
 * Distinct from `ComparisonSection`, which is the check/cross feature matrix.
 */
const PriceComparisonTable = ({
  columns,
  rows,
  caption,
  providerHeader = "Provider",
  footnote,
  highlightLabel = "You",
  centerFootnote = false,
}: PriceComparisonTableProps) => {
  /** Text colour for a value cell, given the row and column it sits in. */
  const cellTone = (row: PriceComparisonRow, col: PriceComparisonColumn) => {
    if (row.isFilOne) return col.total ? "text-brand-600" : "text-zinc-950";
    if (col.colorByValue) return valueTone(row.values[col.key]);
    return "text-zinc-600";
  };

  return (
    <>
      {/* Mobile: stacked cards (the table below is md+ only) */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.provider}
            className={`rounded-2xl p-4 font-sans ${
              row.isFilOne ? "bg-brand-50 border border-brand/25" : "bg-white border border-black/[0.07]"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[16px] font-bold ${row.isFilOne ? "text-brand-600" : "text-zinc-950"}`}>
                {row.provider}
              </span>
              {row.isFilOne && <HighlightPill label={highlightLabel} />}
            </div>
            <dl className="grid grid-cols-2 gap-y-2 text-[14px]">
              {columns.map((col) => {
                const edge = col.total ? " pt-2 mt-1 border-t border-black/[0.06]" : "";
                return (
                  <div key={col.key} className="contents">
                    {/* zinc-600, not zinc-500: the labels sit on the tinted
                        brand-50 card too, where zinc-500 lands just under AA. */}
                    <dt className={`text-zinc-600${col.total ? ` font-semibold${edge}` : ""}`}>{col.header}</dt>
                    <dd className={`m-0 text-right ${cellTone(row, col)}${col.total ? ` font-bold${edge}` : ""}`}>
                      {row.values[col.key]}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop / tablet: full table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse font-sans">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              {[{ key: "__provider", header: providerHeader }, ...columns].map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="text-left whitespace-nowrap px-4 py-3.5 text-[11px] font-medium uppercase tracking-[0.06em] text-zinc-500 border-b border-black/[0.07]"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.provider} className={row.isFilOne ? "bg-brand-50" : ""}>
                <th
                  scope="row"
                  className={`text-left px-4 py-5 border-b border-black/[0.06] text-[16px] ${
                    row.isFilOne ? "font-bold text-brand-600" : "font-medium text-zinc-950"
                  }`}
                >
                  {row.provider}
                  {row.isFilOne && (
                    <>
                      {" "}
                      <HighlightPill label={highlightLabel} />
                    </>
                  )}
                </th>
                {columns.map((col) => {
                  const weight = row.isFilOne
                    ? col.total
                      ? "font-bold"
                      : "font-semibold"
                    : col.colorByValue
                      ? "font-medium"
                      : "font-normal";
                  const size = col.total && row.isFilOne ? "text-[19.5px]" : "text-[15.5px]";
                  return (
                    <td
                      key={col.key}
                      className={`px-4 py-5 border-b border-black/[0.06] ${size} ${weight} ${cellTone(row, col)}`}
                    >
                      {row.values[col.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footnote && (
        <p className={`font-sans text-xs text-zinc-500 mt-4${centerFootnote ? " text-center" : ""}`}>{footnote}</p>
      )}
    </>
  );
};

export default PriceComparisonTable;
