import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/Button";
import { GRID_SVG_WHITE, SECTION_H2_SIZE } from "@/components/LandingPrimitives";

interface CtaBannerProps {
  heading: ReactNode;
  subhead: ReactNode;
  cta: { label: string; href: string; onClick?: () => void };
  /**
   * Optional second button. When present, both CTAs render at default size and
   * the primary drops its glow (balanced two-button treatment); with only the
   * primary CTA it stays the large glowing single button.
   */
  secondaryCta?: { label: string; href: string; onClick?: () => void };
  note?: ReactNode;
  /** Cap on the heading width (px). Longer translations need more room. */
  headingMaxWidth?: number;
  /** Cap on the subhead width (px). Widen for longer subheads so they wrap to two lines, not three. */
  subheadMaxWidth?: number;
  /**
   * Background behind the dark card, so the banner sits flush on pages whose
   * preceding section is grey rather than white.
   */
  surface?: "white" | "grey";
}

/**
 * Dark closing CTA banner: a navy gradient card with a static grid texture
 * and a soft glow, a headline, and a primary button. The one closing CTA
 * pattern site-wide (sits on white, above the footer).
 */
const CtaBanner = ({
  heading,
  subhead,
  cta,
  secondaryCta,
  note,
  headingMaxWidth = 480,
  subheadMaxWidth = 460,
  surface = "white",
}: CtaBannerProps) => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section
      className={`px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full ${surface === "grey" ? "bg-zinc-50" : "bg-white"}`}
    >
      <div ref={ref} className={`w-full max-w-container mx-auto reveal${inView ? " in-view" : ""}`}>
        <div className="relative overflow-hidden rounded-3xl text-center bg-dark-section px-6 md:px-12 py-16 md:py-section">
          {/* White grid texture (static) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[length:60px_60px] [mask-image:theme(backgroundImage.section-mask)] [-webkit-mask-image:theme(backgroundImage.section-mask)]"
            style={{ backgroundImage: `url("data:image/svg+xml,${GRID_SVG_WHITE}")` }}
          />

          {/* Soft static glow behind the copy */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-cta-glow"
          />

          <div className="relative">
            <h2
              className={`${SECTION_H2_SIZE} font-display font-medium leading-[1.2] tracking-[-0.02em] text-white mx-auto mb-3 text-balance`}
              style={{ maxWidth: headingMaxWidth }}
            >
              {heading}
            </h2>
            <p className="font-sans text-body md:text-body-lg leading-[1.65] text-white/70 mb-8 mx-auto text-balance" style={{ maxWidth: subheadMaxWidth }}>{subhead}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="primary"
                tone="dark"
                size={secondaryCta ? undefined : "lg"}
                glow={!secondaryCta}
                href={cta.href}
                onClick={cta.onClick}
              >
                {cta.label}
              </Button>
              {secondaryCta && (
                <Button variant="secondary" tone="dark" href={secondaryCta.href} onClick={secondaryCta.onClick}>
                  {secondaryCta.label}
                </Button>
              )}
            </div>
            {note && <p className="font-sans text-small text-white/70 mt-4">{note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
