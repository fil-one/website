import type { ReactNode } from "react";
import { Check } from "@phosphor-icons/react";
import Icon from "@/components/Icon";

interface CheckChipProps {
  children: ReactNode;
  className?: string;
}

/**
 * Brand-tinted pill chip with a leading check, for short "included" / feature
 * points (e.g. the pricing teaser rows). Fully tokenized: brand fill, border,
 * and text. Distinct from Pill (uppercase status badge) and Tag (neutral mono
 * chip) — this is the affirmative check-marked feature chip.
 */
const CheckChip = ({ children, className = "" }: CheckChipProps) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3.5 py-2 font-sans text-[13.5px] font-normal text-brand-700${
      className ? ` ${className}` : ""
    }`}
  >
    <Icon icon={Check} size={12} weight="bold" className="shrink-0 text-aqua-400" />
    <span className="whitespace-nowrap">{children}</span>
  </span>
);

export default CheckChip;
