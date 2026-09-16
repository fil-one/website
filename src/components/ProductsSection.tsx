import { ShieldCheck, PlugsConnected, ArrowsLeftRight, MapPin } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";
import Icon from "@/components/Icon";
import { Button } from "@/components/Button";
import TextLink from "@/components/TextLink";
import { PRICE_DISPLAY } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const STORAGE_FEATURES = [
  {
    icon: ShieldCheck,
    title: "11 nines durability",
    description: "Built for 11 nines of durability, so your data stays safe by design.",
  },
  {
    icon: PlugsConnected,
    title: "S3-compatible",
    description: "Drop-in compatible with every S3 SDK and workflow. No code changes needed.",
  },
  {
    icon: ArrowsLeftRight,
    title: "No egress fees",
    description: "No egress fees, no API request charges. Read your own data back for free.",
  },
  {
    icon: MapPin,
    title: "Choose your region",
    description: "Choose your bucket's region and know exactly where your data lives.",
  },
];

const ProductsSection = () => {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: cardsRef, inView: cardsInView } = useInView({ threshold: 0.1 });

  return (
    <section id="products" className="w-full bg-zinc-50 border-y border-zinc-100">
      <div className="flex flex-col gap-12 items-start px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">

        {/* Heading */}
        <div
          ref={headingRef}
          className={`flex flex-col gap-3 items-start text-left max-w-[680px] reveal${headingInView ? " in-view" : ""}`}
        >
          <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-zinc-500">
            Object Storage
          </span>
          <h2 className="m-0 font-display text-[32px] md:text-[44px] font-medium leading-[1.1] tracking-[-0.02em] text-zinc-950">
            Storage without surprises
          </h2>
          <p className="m-0 max-w-[460px] text-balance font-sans text-[15px] md:text-[16px] font-normal leading-[1.6] text-zinc-500">
            S3-compatible object storage with flat, predictable pricing and nothing extra to configure before you start.
          </p>
        </div>

        {/* Feature cards */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full reveal-group`}
        >
          {STORAGE_FEATURES.map(({ icon, title, description }) => (
            <div
              key={title}
              className={`flex flex-col gap-4 p-7 rounded-2xl border border-black/[0.07] bg-white shadow-elevated-sm reveal${cardsInView ? " in-view" : ""}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                <Icon icon={icon} size={18} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="m-0 font-display text-[17px] font-medium leading-[1.3] tracking-[-0.01em] text-zinc-950">
                  {title}
                </h3>
                <p className="m-0 font-sans text-[14px] font-normal leading-[1.6] text-zinc-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing + CTA row */}
        <div className="flex items-center justify-between gap-4 flex-wrap w-full pt-2">
          <div>
            <p className="m-0 font-display text-[20px] font-medium leading-none tracking-[-0.02em] text-zinc-950">
              {PRICE_DISPLAY}
              <span className="font-sans text-[14px] font-normal tracking-normal text-zinc-500">
                {" "}/ TB / month
              </span>
            </p>
            <p className="mt-1 m-0 font-sans text-[12.5px] font-normal text-zinc-500">
              30-day free trial · no credit card
            </p>
          </div>
          <div className="flex items-center gap-4">
            <TextLink href="/storage">Learn more</TextLink>
            <Button variant="primary" href={signupUrl()} onClick={() => trackCtaClick("Start free trial", signupUrl(), "primary")}>
              Start free trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
