import { Image as ImageIcon } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";
import Icon from "@/components/Icon";

/**
 * Bucket Intelligence's own homepage section — a visual-forward spotlight
 * (heading + description side by side, product screenshot below), separate
 * from Object Storage so a live, shipping product gets its own moment
 * instead of sharing a card grid.
 */
const BucketIntelligenceSection = () => {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.05 });

  return (
    <section className="w-full bg-white">
      <div className="flex flex-col gap-16 px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
        <div
          ref={headingRef}
          className={`flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-16 reveal${headingInView ? " in-view" : ""}`}
        >
          <div className="flex flex-col gap-4 md:max-w-[380px]">
            <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-zinc-500">
              Bucket Intelligence
            </span>
            <h2 className="m-0 font-display text-[32px] md:text-[44px] font-medium leading-[1.1] tracking-[-0.02em] text-zinc-950">
              Query your buckets<br />like a database
            </h2>
          </div>

          <div className="flex flex-col gap-4 md:max-w-[470px] md:pt-2">
            <p className="m-0 font-sans text-[15px] md:text-[16px] leading-[1.6] text-zinc-500">
              Ask questions in plain language and get answers grounded in your own files. Already running for our first customers, with new capabilities shipping every few weeks.
            </p>
            <a
              href="/bucket-intelligence"
              onClick={() => trackCtaClick("Learn more", "/bucket-intelligence", "secondary")}
              className="inline-flex items-center gap-1.5 self-start font-sans text-[14px] font-medium text-zinc-950 no-underline transition-opacity hover:opacity-70"
            >
              Learn more
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Product screenshot(s) — placeholder until real imagery is added */}
        <div
          ref={imageRef}
          className={`reveal${imageInView ? " in-view" : ""}`}
        >
          <div className="flex flex-col items-center justify-center gap-3 w-full aspect-[16/9] rounded-2xl border-2 border-dashed border-black/10 bg-black/[0.02]">
            <Icon icon={ImageIcon} size={28} className="text-zinc-400" />
            <p className="m-0 font-mono text-[12px] uppercase tracking-[0.06em] text-zinc-400">
              Bucket Intelligence screenshot(s) — placeholder
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BucketIntelligenceSection;
