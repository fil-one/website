import type { ReactNode } from "react";

type BadgeVariant = "soft" | "solid";

interface BadgeProps {
  children: ReactNode;
  /** soft = tinted brand pill (default); solid = filled brand pill */
  variant?: BadgeVariant;
  /** pulsing ring animation, for announcement "New"/"Soon" badges */
  pulse?: boolean;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  soft: "border border-brand/20 bg-brand-50 text-brand-600",
  solid: "bg-brand-500 text-white",
};

/**
 * Small uppercase mono status pill (e.g. "Coming soon", "Soon", "New").
 * Formalises the tinted/filled brand pills previously inlined across the site,
 * using the brand color + font-mono design tokens.
 */
const Badge = ({ children, variant = "soft", pulse = false, className = "" }: BadgeProps) => (
  <span
    className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-[3px] font-mono text-[11px] font-medium uppercase leading-[1.4] tracking-[0.06em] ${VARIANT_CLASSES[variant]}${pulse ? " badge-pulse" : ""}${className ? ` ${className}` : ""}`}
  >
    {children}
  </span>
);

export default Badge;
