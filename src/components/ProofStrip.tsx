import type { ReactNode } from "react";

export interface ProofFigure {
  /** The big figure, e.g. "$0" or "Multi-Gbps". */
  figure: ReactNode;
  /** What the figure is. */
  label: string;
  /** Optional small qualifier under the label, e.g. "Subject to reasonable use." */
  note?: string;
}

interface ProofStripProps {
  items: ProofFigure[];
  className?: string;
}

/**
 * A compact row of two to four figures separated by hairlines: the proof
 * strip under a hero. Wraps to a stack on phones.
 */
const ProofStrip = ({ items, className = "" }: ProofStripProps) => (
  <div
    className={`mx-auto grid w-full max-w-[760px] grid-cols-1 sm:grid-flow-col sm:auto-cols-fr${className ? ` ${className}` : ""}`}
  >
    {items.map(({ figure, label, note }, i) => (
      <div
        key={label}
        className={`flex flex-col items-center gap-1.5 px-6 py-4 text-center sm:py-1 ${
          i > 0 ? "border-t border-black/[0.12] sm:border-l sm:border-t-0" : ""
        }`}
      >
        <span className="font-display text-[32px] font-medium leading-none tracking-[-0.02em] text-zinc-950">{figure}</span>
        <span className="font-sans text-body-sm font-medium text-zinc-600">{label}</span>
        <span className="min-h-[14px] font-sans text-eyebrow text-zinc-500">{note}</span>
      </div>
    ))}
  </div>
);

export default ProofStrip;
