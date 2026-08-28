import type { ReactNode } from "react";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";

const INTEGRATIONS = [
  "Iconik", "LucidLink", "Veeam", "Rclone", "Restic",
  "MSP360", "Premiere", "DaVinci Resolve", "Hugging Face",
  "PyTorch", "Arq", "Duplicati",
];

interface IntegrationsSectionProps {
  /** white (default) or the standard grey section treatment (zinc-50 + zinc-100 borders) */
  tone?: "white" | "grey";
  /** Section eyebrow; defaults to English. */
  label?: ReactNode;
  /** Section heading; defaults to English. */
  heading?: ReactNode;
  /** Supporting line under the heading; defaults to English. */
  description?: ReactNode;
  /** Docs link label; defaults to English. */
  ctaLabel?: ReactNode;
}

/**
 * Auto-scrolling marquee of S3-speaking tools customers connect. The copy
 * deliberately claims the mechanism (S3 endpoint + access key), not per-tool
 * certification: no versioned compatibility run exists for these yet (FIL-892).
 *
 * Shared by the /lp/price and Barcelona landing pages.
 *
 * Copy is overridable so the Spanish pages can share the section rather than
 * inlining a translated copy of it; the defaults are the English strings.
 */
const IntegrationsSection = ({
  tone = "white",
  label = "Integrations",
  heading = (
    <>
      Works with your <span className="text-brand-500">existing stack</span>
    </>
  ),
  description = "No plugin and no connector to install. These tools already speak the S3 API, so they reach Fil One through a regional endpoint and an access key.",
  ctaLabel = "View documentation →",
}: IntegrationsSectionProps) => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section
      id="integrations"
      className={`px-5 md:px-8 py-24 md:py-32 w-full ${
        tone === "grey" ? "bg-zinc-50 border-y border-zinc-100" : "bg-white"
      }`}
    >
      <div
        ref={ref}
        className={`flex flex-col gap-10 items-center text-center w-full max-w-container mx-auto reveal${inView ? " in-view" : ""}`}
      >
        <div className="flex flex-col gap-3 items-center">
          <SectionLabel>{label}</SectionLabel>
          <SectionHeading>{heading}</SectionHeading>
          <SectionSub maxWidth={440}>{description}</SectionSub>
        </div>

        <div className="marquee-mask w-full overflow-hidden">
          <div className="marquee-track marquee-track-slow flex items-center w-max gap-3">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-3" aria-hidden={copy === 1}>
                {INTEGRATIONS.map((name) => (
                  <div
                    key={name}
                    className="bg-white border border-black/[0.07] rounded-lg px-6 py-3.5 font-sans font-medium text-[16.5px] text-zinc-700 whitespace-nowrap"
                  >
                    {name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <a href="https://docs.fil.one" target="_blank" rel="noopener noreferrer" className="btn-secondary">
          {ctaLabel}
        </a>
      </div>
    </section>
  );
};

export default IntegrationsSection;
