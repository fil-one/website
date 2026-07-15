import type { ReactNode } from "react";

type PillVariant = "soft" | "solid";
type PillTone = "brand" | "success";

interface PillProps {
  children: ReactNode;
  /** soft = tinted pill (default); solid = filled pill */
  variant?: PillVariant;
  /** color family — brand blue (default) or success green */
  tone?: PillTone;
  /** pulsing ring animation, for "New"/"Soon" status pills */
  pulse?: boolean;
  className?: string;
}

const TONE_CLASSES: Record<PillTone, Record<PillVariant, string>> = {
  brand: {
    soft: "border border-brand/20 bg-brand-50 text-brand-600",
    solid: "bg-brand-500 text-white",
  },
  success: {
    soft: "border border-success-600/20 bg-success-50 text-success-700",
    solid: "bg-success-600 text-white",
  },
};

/**
 * Small uppercase mono status pill (e.g. "Coming soon", "Soon", "New", "You").
 * Formalises the tinted/filled pills previously inlined across the site,
 * using the brand/success color + font-mono design tokens.
 */
const Pill = ({ children, variant = "soft", tone = "brand", pulse = false, className = "" }: PillProps) => (
  <span
    className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-[3px] font-mono text-[11px] font-medium uppercase leading-[1.4] tracking-[0.06em] ${TONE_CLASSES[tone][variant]}${pulse ? " badge-pulse" : ""}${className ? ` ${className}` : ""}`}
  >
    {children}
  </span>
);

export default Pill;
