import { MapPin, Key, Certificate, ShieldCheck, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import Icon from "@/components/Icon";
import SpaceCard from "@/components/SpaceCard";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";

interface Reason {
  icon: PhosphorIcon;
  title: string;
  description: string;
  link?: { label: string; href: string };
}

const REASONS: Reason[] = [
  {
    icon: MapPin,
    title: "Close to your compute",
    description: "Zones run in the EU and US today. New zones go where your GPUs already run.",
    link: { label: "Need a zone somewhere new? Tell us where →", href: "#teams" },
  },
  {
    icon: Key,
    title: "Access you control",
    description: "Give people, pipelines and AI agents keys scoped to one bucket, with role-based access and bucket policies.",
  },
  {
    icon: Certificate,
    title: "Certified data centers",
    description: "Facilities certified to ISO 27001 and SOC 2, with reports on request.",
  },
  {
    icon: ShieldCheck,
    title: "Proof, not promises",
    description: "Verify your data with cryptographic proof, without downloading.",
  },
];

/** Why Fil One: the homepage's one dark card, four reasons on the space-horizon surface. */
const WhySection = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });
  return (
    <div className="w-full px-5 md:px-8 pt-16 md:pt-20">
      <div ref={ref} className={`mx-auto w-full max-w-container reveal${inView ? " in-view" : ""}`}>
        <SpaceCard id="why">
          <div className="flex flex-col gap-12 md:gap-14">
            <div className="flex max-w-[760px] flex-col gap-4">
              <SectionLabel tone="dark">Why Fil One</SectionLabel>
              <SectionHeading tone="dark" size="text-h2 md:text-h1">
                Sovereign by design.
                <br />
                <span className="text-brand-400">Optimized for AI.</span>
              </SectionHeading>
              <SectionSub tone="dark">
                Your data stays in your jurisdiction and under your control, next to the compute that uses it.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {REASONS.map(({ icon, title, description, link }) => (
                <div
                  key={title}
                  className="flex flex-col gap-5 rounded-2xl border border-white/[0.14] bg-white/[0.05] p-7 md:p-8"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-500/[0.16] text-white shadow-[inset_0_0_0_1px_rgba(56,166,255,0.35)]">
                    <Icon icon={icon} size={26} weight="regular" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <h3 className="m-0 font-sans text-[18px] font-medium leading-[1.3] text-white">{title}</h3>
                    <p className="m-0 font-sans text-[14px] leading-[1.6] text-white/60">{description}</p>
                  </div>
                  {link && (
                    <a
                      href={link.href}
                      className="font-sans text-[14px] font-medium text-white underline decoration-white/50 underline-offset-[3px] transition-colors hover:decoration-white"
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SpaceCard>
      </div>
    </div>
  );
};

export default WhySection;
