import { Plug, ArrowsOut, ShieldCheck, Lock, SignOut, Rocket } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import FeatureCard from "@/components/FeatureCard";

const FEATURES = [
  { icon: Plug,        title: "Drop-in S3 compatibility",     desc: "Same API, same SDKs, same tools. Point your existing workflow at our endpoint." },
  { icon: ArrowsOut,   title: "Zero egress fees",             desc: "Every read is free, so your bill stays flat no matter how busy the month." },
  { icon: ShieldCheck, title: "Backed by a published SLA",    desc: "An uptime commitment with service credits, and a public status page at status.fil.one." },
  { icon: Lock,        title: "Object Lock and versioning",   desc: "Governance or Compliance mode, retention from a day to a century, and a full version history." },
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
            <FeatureCard
              key={title}
              icon={icon}
              title={title}
              description={desc}
              className={`reveal${inView ? " in-view" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
