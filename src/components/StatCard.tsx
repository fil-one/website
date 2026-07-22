import type { ReactNode } from "react";

interface StatCardProps {
  /** Large highlighted figure, e.g. "$0" or "20×" */
  stat: ReactNode;
  /** Supporting label under the figure */
  label: string;
  /** Extra classes on the card root */
  className?: string;
}

/**
 * A centered stat card: one large brand-colored figure over a label.
 * Used in the Pricing "No hidden fees" grid.
 */
const StatCard = ({ stat, label, className }: StatCardProps) => (
  <div
    className={`flex flex-col items-center gap-1 px-6 py-9 rounded-2xl text-center bg-white border border-black/[0.07] shadow-elevated-sm${
      className ? ` ${className}` : ""
    }`}
  >
    <p className="m-0 font-display font-medium text-[36px] text-brand-500 tracking-[-0.02em]">{stat}</p>
    <p className="m-0 font-sans font-semibold text-[16px] text-zinc-950">{label}</p>
  </div>
);

export default StatCard;
