import { Plug, ArrowsOut, ShieldCheck, Lock, SignOut, Rocket } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import IconTile from "@/components/IconTile";

const FEATURES = [
  { icon: Plug,        title: "Drop-in S3 compatibility",     desc: "Same API, same SDKs, same tools. Point your existing workflow at our endpoint." },
  { icon: ArrowsOut,   title: "Zero egress fees",             desc: "Every read is free, so your bill stays flat no matter how busy the month." },
  { icon: ShieldCheck, title: "Eleven nines of durability",   desc: "99.999999999% durability, replicated across locations and monitored around the clock." },
  { icon: Lock,        title: "Object Lock and versioning",   desc: "Compliance modes and retention periods keep every object protected." },
  { icon: SignOut,     title: "No lock-in",                   desc: "Leave whenever you want, no exit fees. Export everything with the standard S3 API." },
  { icon: Rocket,      title: "Up and running in minutes",    desc: "Generate access keys, point your tools at our endpoint, and start uploading." },
];

/**
 * Feature grid for the pricing landing page: a centered header over a
 * responsive three-column grid of icon cards. Reassures a price-convinced
 * buyer that Fil One drops into their stack and is reliable at the price.
 */
const FeaturesSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section id="features" className="w-full bg-zinc-50 border-y border-zinc-100">
      <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
        <div className="flex flex-col gap-4 items-center text-center">
          <SectionLabel>Features</SectionLabel>
          <SectionHeading>The <span className="text-brand-500">S3 you expected</span></SectionHeading>
          <SectionSub maxWidth={560}>Compatible with everything your team already uses.</SectionSub>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group reveal${inView ? " in-view" : ""}`}
        >
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className={`flex flex-col gap-5 p-8 rounded-2xl border border-black/[0.07] bg-white shadow-elevated reveal${inView ? " in-view" : ""}`}
            >
              <IconTile icon={icon} size={26} className="h-14 w-14" />
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-medium text-[18px] leading-[1.3] text-zinc-950 m-0">{title}</h3>
                <p className="font-sans font-normal text-[14px] leading-[1.6] text-zinc-500 m-0">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
