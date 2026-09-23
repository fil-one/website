import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import Icon from "@/components/Icon";

interface IconTileProps {
  /** A Phosphor icon component, rendered through the shared <Icon>. */
  icon: PhosphorIcon;
  /**
   * "sm" (default): 40px tile, 20px icon, for lists and compact cards
   * (Enterprise, RoleCard, "Built for reselling"). "lg": 56px tile, 28px
   * icon, for FeatureCard. Both use the same regular stroke weight.
   */
  size?: "sm" | "lg";
  className?: string;
}

const SIZES = {
  sm: { tile: "h-10 w-10 rounded-xl", icon: 20 },
  lg: { tile: "h-14 w-14 rounded-2xl", icon: 28 },
} as const;

/**
 * Rounded, brand-tinted tile with a centered icon, in two standard sizes. The
 * icon renders through the shared <Icon> component so every tile pulls from
 * the same icon library. brand-600 on brand-50 keeps the glyph above 3:1.
 */
const IconTile = ({ icon, size = "sm", className = "" }: IconTileProps) => (
  <div
    className={`flex shrink-0 items-center justify-center bg-brand-50 text-brand-600 ${SIZES[size].tile}${className ? ` ${className}` : ""}`}
  >
    <Icon icon={icon} size={SIZES[size].icon} weight="regular" />
  </div>
);

export default IconTile;
