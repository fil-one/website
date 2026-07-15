import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { GRID_SVG, HeroHeading } from "@/components/LandingPrimitives";

export interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  /** Primary only — maps to .btn-primary-lg / .btn-primary-sm. */
  size?: "sm" | "lg";
  /** Primary only — animated gradient border for prominent hero CTAs. */
  glow?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

interface HeroProps {
  /** Self-contained badge node above the heading (e.g. AnnouncementBadge or a soft pill). */
  badge?: ReactNode;
  /** Display heading; accepts highlighted spans and <br/>. */
  title: ReactNode;
  /** Supporting paragraph under the heading. */
  description?: ReactNode;
  /** Call-to-action buttons, rendered left-to-right. */
  ctas?: HeroCta[];
  /** Trust line under the CTAs (middle-dot separated). */
  tagline?: ReactNode;
  titleMaxWidth?: number;
  descriptionMaxWidth?: number;
  /** Responsive font-size classes for the heading; defaults to the standard hero scale. */
  titleSize?: string;
  /** Blue radial halo background layer. */
  glow?: boolean;
  /** Grid texture background layer. */
  grid?: boolean;
  /** Extra classes for the inner content container (e.g. bottom padding). */
  contentClassName?: string;
}

const GRID_MASK =
  "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)";

/**
 * Page hero: badge + display heading + optional description, CTAs, and trust
 * line, in the shared `hero-fade` entrance sequence. Background layers (glow /
 * grid) are opt-in so pages that supply their own backdrop (e.g. the homepage)
 * render the hero transparent. Content is composed from the HeroHeading and
 * Button primitives so every page's hero stays consistent.
 */
const Hero = ({
  badge,
  title,
  description,
  ctas,
  tagline,
  titleMaxWidth,
  descriptionMaxWidth,
  titleSize,
  glow = false,
  grid = false,
  contentClassName = "",
}: HeroProps) => (
  <section className={`relative w-full pt-[58px] md:pt-[94px]${glow || grid ? " isolate" : ""}`}>
    {glow && <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10 bg-blue-halo" />}
    {grid && (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
          backgroundSize: "60px 60px",
          backgroundPosition: "center top",
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />
    )}
    <div className={`relative flex flex-col items-center pt-20 md:pt-[120px] px-5 md:px-8 max-w-container mx-auto w-full${contentClassName ? ` ${contentClassName}` : ""}`}>
      <div className="flex flex-col items-center gap-6 w-full hero-fade-1">
        {badge}
        <HeroHeading
          title={title}
          description={description}
          titleMaxWidth={titleMaxWidth}
          descriptionMaxWidth={descriptionMaxWidth}
          titleSize={titleSize}
        />
      </div>

      {ctas && ctas.length > 0 && (
        <div className="flex flex-row items-center justify-center gap-3 mt-10 hero-fade-2">
          {ctas.map((cta) => (
            <Button
              key={cta.label}
              variant={cta.variant}
              size={cta.size}
              glow={cta.glow}
              href={cta.href}
              target={cta.target}
              rel={cta.rel}
              onClick={cta.onClick}
            >
              {cta.label}
            </Button>
          ))}
        </div>
      )}

      {tagline && (
        <p className="mt-4 hero-fade-3 text-center font-sans text-[13px] font-normal leading-[1.5] text-zinc-500">
          {tagline}
        </p>
      )}
    </div>
  </section>
);

export default Hero;
