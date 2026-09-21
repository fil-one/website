import { Button } from "@/components/Button";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";

const PARTNERS_HREF = "/partners";

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
        <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-white/50">
          Partners
        </span>
        <h2 className="m-0 font-display text-[26px] md:text-[34px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
          Running a GPU cloud?
        </h2>
        <p className="m-0 max-w-[480px] font-sans text-[15px] md:text-[17px] leading-[1.65] text-white/60">
          Add a storage line to your invoice, with no hardware to buy and no team to hire. We
          install and run it inside your data center, cross-connected to your GPU nodes.
        </p>
        <Button
          variant="primary"
          tone="dark"
          size="lg"
          href={PARTNERS_HREF}
          onClick={() => trackCtaClick("See our partner program", PARTNERS_HREF, "secondary")}
        >
          See our partner program
        </Button>
      </div>
    </section>
  );
};

export default PartnersSection;
