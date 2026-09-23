import { Button } from "@/components/Button";
import { SectionHeading, SectionLabel, SectionSub } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";

const PARTNERS_HREF = "/neocloud";

/**
 * Light-touch partner door — one message, no mechanics. The full pitch
 * belongs on the dedicated partner page, not the homepage. Dark band, so it
 * separates the buyer-facing sections above it from the FAQ below.
 */
const PartnersSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-dark-section">
      <div
        ref={ref}
        className={`flex flex-col gap-6 items-center text-center w-full max-w-container mx-auto reveal${inView ? " in-view" : ""}`}
      >
        <SectionLabel tone="dark">Neoclouds</SectionLabel>
        <SectionHeading tone="dark">Running a GPU cloud?</SectionHeading>
        <SectionSub tone="dark" maxWidth={480}>
          Add a storage line to your invoice, with no hardware to buy and no team to hire. We
          install and run it inside your data center, cross-connected to your GPU nodes.
        </SectionSub>
        <Button
          variant="primary"
          tone="dark"
          size="lg"
          href={PARTNERS_HREF}
          onClick={() => trackCtaClick("Explore Neoclouds", PARTNERS_HREF, "secondary")}
        >
          Explore Neoclouds
        </Button>
      </div>
    </section>
  );
};

export default PartnersSection;
