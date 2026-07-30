import type { ReactNode } from "react";

interface StatCardProps {
  /** Large highlighted figure, e.g. "$0" or "20×" */
  stat: ReactNode;
  /** Supporting label under the figure */
  label: string;
  /**
   * Optional qualifier under the label, for figures that only hold under
   * stated assumptions (e.g. the workload a cost multiple was measured on).
   */
  note?: ReactNode;
  /** Extra classes on the card root */
  className?: string;
}

/**
 * A centered stat card: one large brand-colored figure over a label, with an
 * optional smaller qualifying note. Used in the Pricing "No hidden fees" grid.
 */
const StatCard = ({ stat, label, note, className }: StatCardProps) => (
  <div
    className={`flex flex-col items-center justify-center gap-1 px-6 py-9 rounded-2xl text-center bg-white border border-black/[0.07] shadow-elevated-sm${
      className ? ` ${className}` : ""
    }`}
  >
    <p className="m-0 font-display font-medium text-[36px] text-brand-500 tracking-[-0.02em]">{stat}</p>
    <p className="m-0 font-sans font-semibold text-[16px] text-zinc-950">{label}</p>
    {note && <p className="m-0 mt-1 font-sans text-[12.5px] leading-[1.45] text-zinc-500">{note}</p>}
  </div>
);

export default StatCard;
