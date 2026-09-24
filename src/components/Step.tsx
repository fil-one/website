import type { ReactNode } from "react";

interface StepProps {
  /** Ordinal label, e.g. "01". */
  number: string;
  title: string;
  description: ReactNode;
  /**
   * Draw the step's own divider: a top rule when stacked, a left rule in a
   * lg row, with identical padding on every step. Put divided steps in a
   * `grid-cols-* gap-8 lg:gap-0` grid so every column is the same width and
   * every column (including the first) gets the same rule.
   */
  divided?: boolean;
  className?: string;
}

const DIVIDED_CLASS = "border-t border-zinc-200 pt-6 lg:border-l lg:border-t-0 lg:px-6 lg:pt-0 xl:px-8";

/**
 * A numbered "how it works" step: a monospace brand index over a title and a
 * short description. Shared so the 01/02/03 step lists across product and
 * landing pages stay visually identical. Tokenized (brand/zinc + mono/display).
 */
const Step = ({ number, title, description, divided = false, className = "" }: StepProps) => (
  <div className={`flex flex-col gap-3${divided ? ` ${DIVIDED_CLASS}` : ""}${className ? ` ${className}` : ""}`}>
    <span className="font-mono font-medium text-h3 leading-none text-brand-600">{number}</span>
    <h3 className="m-0 font-display font-medium text-body-lg leading-[1.3] text-zinc-950 text-balance">{title}</h3>
    <p className="m-0 font-sans text-body-sm leading-[1.6] text-zinc-500">{description}</p>
  </div>
);

export default Step;
