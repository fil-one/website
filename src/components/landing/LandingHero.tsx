/**
 * Landing page hero section.
 *
 * Shared hero layout used across all /lp/* pages:
 * - Grid texture + blue glow background
 * - Optional announcement badge
 * - Headline (supports JSX for blue spans, line breaks, etc.)
 * - Subheadline
 * - Optional price callout (e.g. Agents page)
 * - CTA buttons
 * - Trust line
 *
 * Each prop is optional where sensible so pages can mix and match.
 */

import LandingGrid from "./LandingGrid";

export interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  /** Content to render inside the button after the label (e.g. an icon) */
  suffix?: React.ReactNode;
  /** Open in new tab */
  external?: boolean;
}

interface LandingHeroProps {
  /** Small blue badge above the headline */
  badge?: string;
  /** Main headline — pass JSX for blue accents, line breaks */
  headline: React.ReactNode;
  /** Subheadline text or JSX */
  sub: React.ReactNode;
  /** CTA buttons rendered in order */
  ctas: HeroCta[];
  /** Trust line below CTAs (e.g. "No credit card required · No egress fees") */
  trustLine?: string;
  /** Optional price callout rendered between sub and CTAs */
  priceCallout?: React.ReactNode;
  /** Override glow intensity */
  glow?: string;
  /** Override grid mask */
  gridMask?: string;
  /** Max-width for the headline. Default 660 */
  headlineMaxWidth?: number;
  /** Max-width for the sub. Default 520 */
  subMaxWidth?: number;
  /** Responsive headline size classes. Default "text-[30px] sm:text-[38px] md:text-[54px]" */
  headlineSize?: string;
}

const LandingHero = ({
  badge,
  headline,
  sub,
  ctas,
  trustLine,
  priceCallout,
  glow,
  gridMask,
  headlineMaxWidth = 660,
  subMaxWidth = 520,
  headlineSize = "text-[30px] sm:text-[38px] md:text-[54px]",
}: LandingHeroProps) => (
  <section
    className="relative isolate pt-[58px]"
    style={{ backgroundColor: "#FFFFFF" }}
  >
    <LandingGrid glow={glow} gridMask={gridMask} />

    <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
      {/* Badge */}
      {badge && (
        <div
          className="hero-fade-1 flex items-center gap-1.5 text-center"
          style={{
            backgroundColor: "#EFF8FF",
            border: "1px solid rgba(0,144,255,0.2)",
            borderRadius: 14,
            padding: "10px 14px",
            maxWidth: "90vw",
          }}
        >
          <span
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 13.5,
              lineHeight: 1,
              color: "#0070CC",
            }}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Headline */}
      <h1
        className={`${headlineSize} hero-fade-2`}
        style={{
          fontFamily: "'Aspekta', sans-serif",
          fontWeight: 500,
          lineHeight: "1.08",
          letterSpacing: "-0.025em",
          color: "#09090B",
          textAlign: "center",
          maxWidth: headlineMaxWidth,
          margin: 0,
        }}
      >
        {headline}
      </h1>

      {/* Subheadline */}
      <p
        className="text-[15px] md:text-[17px] hero-fade-2"
        style={{
          fontFamily: "'Funnel Sans', sans-serif",
          fontWeight: 400,
          lineHeight: "1.65",
          color: "#71717A",
          textAlign: "center",
          maxWidth: subMaxWidth,
          margin: 0,
        }}
      >
        {sub}
      </p>

      {/* Optional price callout */}
      {priceCallout}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
        {ctas.map((cta) => {
          const external = cta.external
            ? { target: "_blank" as const, rel: "noopener noreferrer" }
            : {};
          if (cta.variant === "primary") {
            return (
              <a key={cta.label} href={cta.href} className="btn-primary" {...external}>
                <span className="btn-primary-inner">
                  {cta.label}
                  {cta.suffix}
                </span>
              </a>
            );
          }
          return (
            <a
              key={cta.label}
              href={cta.href}
              className="btn-secondary flex items-center gap-1"
              {...external}
            >
              {cta.label}
              {cta.suffix}
            </a>
          );
        })}
      </div>

      {/* Trust line */}
      {trustLine && (
        <p
          className="hero-fade-4"
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: "#71717A",
            textAlign: "center",
          }}
        >
          {trustLine}
        </p>
      )}
    </div>
  </section>
);

export default LandingHero;
