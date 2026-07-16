import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";

const INTEGRATIONS = [
  "Iconik", "LucidLink", "Veeam", "Rclone", "Restic",
  "MSP360", "Premiere", "DaVinci Resolve", "Hugging Face",
  "PyTorch", "Arq", "Duplicati",
];

/**
 * Auto-scrolling marquee of supported integrations — S3-compatibility
 * reassurance shared by the /lp/price and Barcelona landing pages.
 */
const IntegrationsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section id="integrations" className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
      <div
        ref={ref}
        className={`flex flex-col gap-10 items-center text-center w-full max-w-container mx-auto reveal${inView ? " in-view" : ""}`}
      >
        <div className="flex flex-col gap-3 items-center">
          <SectionLabel>Integrations</SectionLabel>
          <SectionHeading>Works with your <span className="text-brand-500">existing stack</span></SectionHeading>
          <SectionSub maxWidth={440}>S3 API compatible. If it talks to AWS, it talks to us.</SectionSub>
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
          View documentation →
        </a>
      </div>
    </section>
  );
};

export default IntegrationsSection;
