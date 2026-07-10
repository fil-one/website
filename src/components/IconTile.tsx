import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import Icon from "@/components/Icon";

interface IconTileProps {
  /** A Phosphor icon component, rendered through the shared <Icon>. */
  icon: PhosphorIcon;
  size?: number;
  className?: string;
}

/**
 * Small rounded, brand-tinted tile with a centered icon. The icon renders
 * through the shared <Icon> component so every tile pulls from the same icon
 * library. Colors use brand tokens; the icon inherits the tile's text color.
 */
const IconTile = ({ icon, size = 18, className = "" }: IconTileProps) => (
  <div
    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500${className ? ` ${className}` : ""}`}
  >
    <Icon icon={icon} size={size} />
  </div>
);

export default IconTile;
