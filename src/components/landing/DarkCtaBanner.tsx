/**
 * Dark navy gradient CTA banner — used at the bottom of landing pages.
 *
 * White grid texture overlay, headline, sub, and CTA buttons on
 * a dark gradient background.
 */

import { useInView } from "@/hooks/useInView";
import type { HeroCta } from "./LandingHero";

const DARK_GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>'
);

interface DarkCtaBannerProps {
  heading: string;
  sub: string;
  ctas: HeroCta[];
  trustLine?: string;
}

const DarkCtaBanner = ({
  heading,
  sub,
  ctas,
  trustLine,
}: DarkCtaBannerProps) => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section
      className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div
        ref={ref}
        className={`w-full max-w-[1120px] mx-auto reveal${inView ? " in-view" : ""}`}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)",
            borderRadius: 20,
            textAlign: "center",
          }}
          className="px-6 md:px-12 py-16 md:py-[104px]"
        >
          {/* White grid texture */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,${DARK_GRID_SVG}")`,
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <h2
              className="text-[26px] md:text-[32px]"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: "1.12",
                color: "#FFFFFF",
                marginBottom: 12,
              }}
            >
              {heading}
            </h2>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 17,
                color: "rgba(255,255,255,0.60)",
                marginBottom: 32,
              }}
            >
              {sub}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {ctas.map((cta) => {
                if (cta.variant === "primary") {
                  return (
                    <a
                      key={cta.label}
                      href={cta.href}
                      className="btn-primary btn-primary-dark"
                    >
                      <span className="btn-primary-inner">{cta.label}</span>
                    </a>
                  );
                }
                return (
                  <a
                    key={cta.label}
                    href={cta.href}
                    className="btn-secondary btn-secondary-dark"
                  >
                    {cta.label}
                  </a>
                );
              })}
            </div>

            {trustLine && (
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.60)",
                  marginTop: 16,
                }}
              >
                {trustLine}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DarkCtaBanner;
