export interface MetricBarRow {
  /** Provider or option name. */
  name: string;
  /** Formatted value, e.g. "$0" or "Per-object". */
  val: string;
  /** Marks the winning row: brand-coloured bar and bolder value. */
  win?: boolean;
}

export interface MetricBarGroup {
  /** Mono uppercase caption naming what is being measured. */
  label: string;
  rows: MetricBarRow[];
}

interface MetricBarsProps {
  groups: MetricBarGroup[];
}

/** Digits only, so "$1,234" and "12 h" both reduce to a comparable number. */
const barValue = (value: string) => parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

/**
 * Horizontal bar comparison inside a card: one captioned group per metric, one
 * bar per option, scaled to the largest value in that group. When every value
 * in a group is zero or non-numeric (e.g. "Both", "Per-object") the bars all
 * render full width, so the row reads as a plain labelled list.
 *
 * The bars are decorative — the name and the value are both real text, so the
 * comparison is fully available without them.
 */
const MetricBars = ({ groups }: MetricBarsProps) => (
  <>
    {groups.map((group, gi) => {
      const values = group.rows.map((row) => barValue(row.val));
      const max = Math.max(...values);
      return (
        <div key={group.label} className="mb-5">
          {gi > 0 && <div aria-hidden="true" className="h-px bg-black/[0.06] mb-5" />}
          <p className="m-0 mb-3 font-mono font-medium text-[10px] uppercase tracking-[0.09em] text-zinc-500">
            {group.label}
          </p>
          {group.rows.map((row, ri) => (
            <div key={row.name} className="flex items-center gap-3 mb-2">
              <span
                className={`w-[110px] shrink-0 font-sans text-[13.5px] text-zinc-950 ${
                  row.win ? "font-semibold" : "font-normal"
                }`}
              >
                {row.name}
              </span>
              <div aria-hidden="true" className="flex-1 h-2.5 rounded-full bg-black/[0.06]">
                <div
                  className={`h-full rounded-full ${row.win ? "bg-brand-500" : "bg-zinc-300"}`}
                  style={{ width: `${max === 0 ? 100 : Math.max(3, (values[ri] / max) * 100)}%` }}
                />
              </div>
              <span
                className={`w-[84px] shrink-0 text-right font-sans text-[14px] ${
                  row.win ? "font-bold text-brand-600" : "font-normal text-zinc-950"
                }`}
              >
                {row.val}
              </span>
            </div>
          ))}
        </div>
      );
    })}
  </>
);

export default MetricBars;
