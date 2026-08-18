import type { ReactNode } from "react";

type PillVariant = "soft" | "solid";
type PillTone = "brand" | "success" | "warning" | "danger";

interface PillProps {
  children: ReactNode;
  /** soft = tinted pill (default); solid = filled pill */
  variant?: PillVariant;
  /** color family — brand blue (default) or success green */
  tone?: PillTone;
  /** pulsing ring animation, for "New"/"Soon" status pills */
  pulse?: boolean;
  /**
   * Let the label wrap instead of staying on one line. Needed for the longer
   * sentence-length hero badges, which overflow a narrow phone on one line.
   */
  wrap?: boolean;
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
  // warning-700 / danger-700 on their own 50 tints; the 600 steps land under
  // AA at this size, and the pill text is 11px.
  warning: {
    soft: "border border-warning-600/20 bg-warning-50 text-warning-700",
    solid: "bg-warning-600 text-white",
  },
  danger: {
    soft: "border border-danger-600/20 bg-danger-50 text-danger-700",
    solid: "bg-danger-600 text-white",
  },
};

/**
 * Small uppercase mono status pill (e.g. "Coming soon", "Soon", "New", "You").
 * Formalises the tinted/filled pills previously inlined across the site,
 * using the brand/success color + font-mono design tokens.
 */
const Pill = ({
  children,
  variant = "soft",
  tone = "brand",
  pulse = false,
  wrap = false,
  className = "",
}: PillProps) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-[3px] font-mono text-[11px] font-medium uppercase leading-[1.4] tracking-[0.06em] ${
      wrap ? "max-w-full text-center text-balance" : "whitespace-nowrap"
    } ${TONE_CLASSES[tone][variant]}${pulse ? " badge-pulse" : ""}${className ? ` ${className}` : ""}`}
  >
    {children}
  </span>
);

export default Pill;
