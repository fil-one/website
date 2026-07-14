import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react";

export interface IconProps {
  /** A Phosphor icon component — the project's single icon library. */
  icon: PhosphorIcon;
  size?: number;
  weight?: IconWeight;
  /**
   * Extra classes. Color follows the current text color (currentColor), so
   * set it with a text-* token on a parent, e.g. text-brand-500.
   */
  className?: string;
}

/**
 * Renders an icon from the project's single icon library (Phosphor) with
 * consistent defaults. Routing every icon through this component keeps them
 * all on one library and one set of rendering conventions — swapping the
 * library later is a change in one file.
 */
const Icon = ({ icon: PhosphorIconComponent, size = 18, weight = "regular", className }: IconProps) => (
  <PhosphorIconComponent size={size} weight={weight} className={className} />
);

export default Icon;
