import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small neutral monospace chip for terse labels (e.g. supported file types).
 * Distinct from {@link Pill} (the uppercase brand/success status badge): this
 * is a quiet zinc tag. Tokenized — no hardcoded colors.
 */
const Tag = ({ children, className = "" }: TagProps) => (
  <span
    className={`inline-flex items-center rounded-lg border border-black/[0.07] bg-zinc-100 px-3 py-[5px] font-mono text-[12px] font-medium text-zinc-600${
      className ? ` ${className}` : ""
    }`}
  >
    {children}
  </span>
);

export default Tag;
