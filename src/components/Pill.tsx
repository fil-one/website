import type { ReactNode } from "react";

type PillVariant = "soft" | "solid";

interface PillProps {
  children: ReactNode;
  /** soft = tinted brand pill (default); solid = filled brand pill */
  variant?: PillVariant;
  /** pulsing ring animation, for "New"/"Soon" status pills */
  pulse?: boolean;
  className?: string;
}

const VARIANT_CLASSES: Record<PillVariant, string> = {
  soft: "border border-brand/20 bg-brand-50 text-brand-600",
  solid: "bg-brand-500 text-white",
};

/**
 * Small uppercase mono status pill (e.g. "Coming soon", "Soon", "New").
 * Formalises the tinted/filled brand pills previously inlined across the site,
 * using the brand color + font-mono design tokens.
 */
const Pill = ({ children, variant = "soft", pulse = false, className = "" }: PillProps) => (
  <span
    className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-[3px] font-mono text-[11px] font-medium uppercase leading-[1.4] tracking-[0.06em] ${VARIANT_CLASSES[variant]}${pulse ? " badge-pulse" : ""}${className ? ` ${className}` : ""}`}
  >
    {children}
  </span>
);

export default Pill;
