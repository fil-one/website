import type { ReactNode } from "react";
import { GRID_SVG_WHITE } from "@/components/LandingPrimitives";

interface SpaceCardProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * The site's darkest surface: a rounded space-black card with a blue horizon
 * rising from the bottom edge, a faint white grid and a soft glow. One per
 * page at most (Why Fil One on the homepage; the problem card on Host a zone),
 * so the page has a single dark peak before the closing banner.
 */
const SpaceCard = ({ children, id, className = "" }: SpaceCardProps) => (
  <section
    id={id}
    className={`relative w-full overflow-hidden rounded-3xl bg-space-horizon px-6 py-16 md:px-12 md:py-24${className ? ` ${className}` : ""}`}
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[length:60px_60px] opacity-60 [mask-image:theme(backgroundImage.section-mask)] [-webkit-mask-image:theme(backgroundImage.section-mask)]"
      style={{ backgroundImage: `url("data:image/svg+xml,${GRID_SVG_WHITE}")` }}
    />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-horizon-glow" />
    <div className="relative">{children}</div>
  </section>
);

export default SpaceCard;
