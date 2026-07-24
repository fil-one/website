import type { ReactNode } from "react";

interface StepProps {
  /** Ordinal label, e.g. "01". */
  number: string;
  title: string;
  description: ReactNode;
  className?: string;
}

/**
 * A numbered "how it works" step: a monospace brand index over a title and a
 * short description. Shared so the 01/02/03 step lists across product and
 * landing pages stay visually identical. Tokenized (brand/zinc + mono/display).
 */
const Step = ({ number, title, description, className = "" }: StepProps) => (
  <div className={`flex flex-col gap-3${className ? ` ${className}` : ""}`}>
    <span className="font-mono font-medium text-[28px] leading-none text-brand-500">{number}</span>
    <h3 className="m-0 font-display font-medium text-[18px] leading-[1.3] text-zinc-950">{title}</h3>
    <p className="m-0 font-sans text-[14px] leading-[1.6] text-zinc-500">{description}</p>
  </div>
);

export default Step;
