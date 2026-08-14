import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import IconTile from "@/components/IconTile";

interface MetricCardProps {
  icon: PhosphorIcon;
  /** Mono uppercase caption naming the metric. */
  label: string;
  /** The figure or state, set in the display face. */
  value: string;
  /** Qualifier under the value. */
  note: string;
  className?: string;
}

/**
 * Left-aligned metric card: brand icon tile, mono caption, display-face value,
 * then a qualifying note. Used where a figure needs its own caption and
 * caveat rather than the centred hero treatment of {@link StatCard}.
 */
const MetricCard = ({ icon, label, value, note, className = "" }: MetricCardProps) => (
  <div
    className={`rounded-2xl border border-black/[0.07] bg-white p-6 shadow-elevated-sm${
      className ? ` ${className}` : ""
    }`}
  >
    <IconTile icon={icon} className="mb-4" />
    <p className="m-0 font-mono font-medium text-[11px] uppercase tracking-[0.08em] text-zinc-500">{label}</p>
    <p className="mt-1 mb-1.5 break-words font-display font-medium text-[20px] tracking-[-0.02em] text-zinc-950">
      {value}
    </p>
    <p className="m-0 font-sans text-[13.5px] leading-[1.55] text-zinc-500">{note}</p>
  </div>
);

export default MetricCard;
