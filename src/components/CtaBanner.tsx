import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/Button";

interface CtaBannerProps {
  heading: ReactNode;
  subhead: ReactNode;
  cta: { label: string; href: string; onClick?: () => void };
  note?: ReactNode;
}

/**
 * Dark closing CTA banner: a navy gradient card with a drifting grid texture
 * and a breathing glow, a headline, and a glowing primary button. Tuned for
 * the closing section of a page (sits on white, above the footer).
 */
const CtaBanner = ({ heading, subhead, cta, note }: CtaBannerProps) => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full bg-white">
      <div ref={ref} className={`w-full max-w-container mx-auto reveal${inView ? " in-view" : ""}`}>
        <div className="relative overflow-hidden rounded-[20px] text-center bg-dark-section px-6 md:px-12 py-16 md:py-[104px]">
          {/* White grid texture, drifting slowly */}
          <div
            aria-hidden="true"
            className="cta-grid-drift absolute inset-0 pointer-events-none [mask-image:theme(backgroundImage.section-mask)] [-webkit-mask-image:theme(backgroundImage.section-mask)]"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Soft breathing glow behind the copy */}
          <div
            aria-hidden="true"
            className="cta-glow-pulse absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              width: 480,
              height: 480,
              marginLeft: -240,
              marginTop: -240,
              background: "radial-gradient(circle, rgba(30,191,255,0.20) 0%, transparent 70%)",
            }}
          />

          <div className="relative">
            <h2
              className="text-[26px] md:text-[32px] font-display font-medium text-white mx-auto mb-3"
              style={{ letterSpacing: "-0.025em", lineHeight: "1.12", maxWidth: 480 }}
            >
              {heading}
            </h2>
            <p className="font-sans text-[17px] text-white/60 mb-8">{subhead}</p>
            <div className="flex items-center justify-center">
              <Button variant="primary" tone="dark" size="lg" glow href={cta.href} onClick={cta.onClick}>
                {cta.label}
              </Button>
            </div>
            {note && <p className="font-sans text-[13px] text-white/60 mt-4">{note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
