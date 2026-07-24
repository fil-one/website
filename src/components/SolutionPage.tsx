import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import Hero, { type HeroCta } from "@/components/Hero";
import ProofBar from "@/components/ProofBar";
import FeatureCard from "@/components/FeatureCard";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Pill from "@/components/Pill";
import { SectionLabel, SectionHeading } from "@/components/LandingPrimitives";

export interface SolutionFeature {
  icon: PhosphorIcon;
  title: string;
  body: string;
}

export interface SolutionStep {
  number: string;
  title: string;
  body: string;
}

export interface SolutionCard {
  title: string;
  body: string;
}

interface SolutionDetailBase {
  label: string;
  heading: string;
}

/**
 * The second content section varies by page: an "how it works" numbered
 * sequence (`steps`) or a grid of titled use-case/scenario cards (`cards`).
 */
export type SolutionDetail =
  | (SolutionDetailBase & { variant: "steps"; items: SolutionStep[] })
  | (SolutionDetailBase & { variant: "cards"; items: SolutionCard[] });

export interface SolutionPageConfig {
  seo: { title: string; description: string; canonical: string; ogImage?: string };
  hero: {
    badge: string;
    title: string;
    titleMaxWidth?: number;
    /** Responsive font-size classes for the h1; defaults to the solutions scale. */
    titleSize?: string;
    description: string;
    descriptionMaxWidth?: number;
    ctas: HeroCta[];
    tagline: string;
  };
  proof: string[];
  features: {
    label: string;
    heading: string;
    headingMaxWidth?: number;
    items: SolutionFeature[];
  };
  detail: SolutionDetail;
  faq: string[];
  cta: {
    heading: string;
    subhead: string;
    note?: string;
    cta: { label: string; href: string };
  };
}

const SectionHead = ({
  label,
  heading,
  maxWidth,
}: {
  label: string;
  heading: string;
  maxWidth?: number;
}) => (
  <div
    className="flex flex-col gap-3 items-center text-center"
    style={maxWidth ? { maxWidth } : undefined}
  >
    <SectionLabel>{label}</SectionLabel>
    <SectionHeading>{heading}</SectionHeading>
  </div>
);

/**
 * Shared scaffold for the /solutions/* pages, which all share the same shape:
 * hero → proof bar → features grid → a detail section (steps or use-case
 * cards) → FAQ → closing CTA. Each page supplies only its copy via a
 * SolutionPageConfig; all chrome is composed from the shared design-token
 * components (Hero, ProofBar, FeatureCard, FaqSection, CtaBanner, Pill).
 */
const SolutionPage = ({ config }: { config: SolutionPageConfig }) => {
  const { seo, hero, proof, features, detail, faq, cta } = config;
  const { ref: featRef, inView: featInView } = useInView({ threshold: 0.05 });
  const { ref: detailRef, inView: detailInView } = useInView({ threshold: 0.05 });

  useSeo({ ogImage: "https://www.fil.one/og-image.png", ...seo });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">
        {/* Hero */}
        <Hero
          glow
          grid
          badge={<Pill>{hero.badge}</Pill>}
          titleSize={hero.titleSize ?? "text-[34px] sm:text-[44px] md:text-[56px]"}
          title={hero.title}
          titleMaxWidth={hero.titleMaxWidth}
          description={hero.description}
          descriptionMaxWidth={hero.descriptionMaxWidth}
          contentClassName="pb-24 md:pb-32"
          ctas={hero.ctas}
          tagline={hero.tagline}
        />

        {/* Proof bar */}
        <ProofBar items={proof} />

        {/* Features */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-14 md:gap-16 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <SectionHead
              label={features.label}
              heading={features.heading}
              maxWidth={features.headingMaxWidth}
            />
            <div
              ref={featRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group"
            >
              {features.items.map(({ icon, title, body }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={body}
                  className={`reveal${featInView ? " in-view" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Detail — steps or use-case cards */}
        <section className="w-full bg-zinc-100 border-y border-zinc-200">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <SectionHead label={detail.label} heading={detail.heading} />
            {detail.variant === "steps" ? (
              <div
                ref={detailRef}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full reveal${detailInView ? " in-view" : ""}`}
              >
                {detail.items.map(({ number, title, body }) => (
                  <div key={number} className="flex flex-col gap-3">
                    <span className="font-mono font-medium text-[28px] leading-none text-brand-500">
                      {number}
                    </span>
                    <h3 className="font-display font-medium text-[15px] text-zinc-950 m-0">{title}</h3>
                    <p className="font-sans text-[14px] leading-[1.6] text-zinc-500 m-0">{body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={detailRef}
                className={`grid grid-cols-1 sm:grid-cols-2 gap-6 w-full reveal${detailInView ? " in-view" : ""}`}
              >
                {detail.items.map(({ title, body }) => (
                  <div key={title} className="rounded-2xl border border-black/[0.07] bg-white p-7">
                    <h3 className="font-display font-medium text-[16px] text-zinc-950 m-0 mb-2">{title}</h3>
                    <p className="font-sans text-[14px] leading-[1.6] text-zinc-500 m-0">{body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <FaqSection include={faq} />

        {/* Closing CTA */}
        <CtaBanner heading={cta.heading} subhead={cta.subhead} note={cta.note} cta={cta.cta} />
      </main>
      <Footer />
    </div>
  );
};

export default SolutionPage;
