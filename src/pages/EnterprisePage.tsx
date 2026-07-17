import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import {
  Buildings,
  Headset,
  CurrencyDollar,
  ArrowsLeftRight,
  LockKey,
  Certificate,
  Check,
} from "@phosphor-icons/react";
import { trackCtaClick } from "@/lib/analytics";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import Hero from "@/components/Hero";
import FeaturedInBar from "@/components/FeaturedInBar";
import { Button } from "@/components/Button";
import CtaBanner from "@/components/CtaBanner";
import StatCard from "@/components/StatCard";
import TextLink from "@/components/TextLink";
import FeatureCard from "@/components/FeatureCard";
import FaqAccordion from "@/components/FaqAccordion";
import { PRICE_PER_TB_MONTH } from "@/lib/pricing";

const FEATURES = [
  {
    icon: Buildings,
    title: "Capacity assurance & SLAs",
    description: "Guaranteed capacity and contractual SLAs for uptime, performance, and support.",
  },
  {
    icon: Headset,
    title: "Dedicated onboarding",
    description: "A dedicated engineer helps you migrate, configure, and go live from day one.",
  },
  {
    icon: CurrencyDollar,
    title: "Custom pricing & invoicing",
    description: "Volume discounts, committed-use terms, and consolidated invoicing.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Guided migration",
    description: "A migration plan and engineering support get most teams live in days.",
  },
  {
    icon: LockKey,
    title: "Access controls",
    description: "Per-bucket API key scoping and fine-grained access policies.",
  },
  {
    icon: Certificate,
    title: "Compliance roadmap",
    description: "SOC 2 Type II and ISO 27001 in progress. Ask us for current documentation.",
  },
];

const STATS = [
  { value: "~79%", label: "Less than AWS S3" },
  { value: "$0", label: "Egress fees" },
  { value: "11 9s", label: "Durability" },
];

const PRICING_TAGS = [
  "No egress fees",
  "No API request charges",
  "Committed-use discounts",
  "Consolidated invoicing",
  "Capacity assurance",
  "Contractual SLAs",
];

const FAQS = [
  {
    q: "What SLAs do you offer?",
    a: "Our business plan includes capacity assurance and deployment SLAs. Contact sales for specific uptime and performance commitments tailored to your workload.",
  },
  {
    q: "How does migration work?",
    a: "We provide a dedicated migration plan and engineering support. Most teams migrate using our S3-compatible API and standard tooling in days. We handle the plan, so you just point your config at our endpoint.",
  },
  {
    q: "Where is my data stored?",
    a: "We currently offer two regions: EU (France) and US (Detroit). More regions are on the way.",
  },
  {
    q: "What compliance certifications do you have?",
    a: "SOC 2 Type II and ISO 27001 are actively in progress. Contact us for a current controls overview and compliance documentation for your procurement team.",
  },
  {
    q: "How does enterprise pricing work?",
    a: "Enterprise pricing is custom, based on volume and commitment term (1, 3, or 5-year increments). Contact sales and we'll prepare a quote within one business day.",
  },
  {
    q: "Can we use Fil One alongside AWS or Azure?",
    a: "Yes. S3 compatibility means Fil One integrates cleanly into multi-cloud architectures. Many enterprises use Fil One for cost-sensitive or compliance-sensitive workloads alongside their existing cloud provider.",
  },
];

const EnterprisePage = () => {
  const { heroEndRef } = useScrollTracking();
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.05 });
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.05 });

  useSeo({
    title: "Enterprise — Fil One",
    description:
      "Fil One for enterprise: verifiable data integrity, S3-compatible, no egress fees, SLA-backed. Custom pricing for teams that need storage at scale.",
    canonical: "https://fil.one/enterprise",
    ogImage: "https://fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <Hero
          glow
          grid
          titleSize="text-[34px] sm:text-[44px] md:text-[62px]"
          title={<>Storage infrastructure<br /><span className="text-brand-500">your team can rely on</span></>}
          description="Verifiable data integrity, predictable costs, and S3-compatible from day one. Built for teams that need control at scale."
          titleMaxWidth={760}
          descriptionMaxWidth={520}
          contentClassName="pb-10 md:pb-14"
          ctas={[
            {
              label: "Get a demo",
              href: "/contact-sales",
              variant: "primary",
              size: "lg",
              glow: true,
              onClick: () => trackCtaClick("Get a demo", "/contact-sales", "primary"),
            },
          ]}
        />

        {/* Publications / social proof */}
        <FeaturedInBar />

        {/* Cost stats */}
        <div ref={heroEndRef}>
        <section className="w-full bg-white">
          <div className="flex flex-col gap-8 px-5 md:px-8 pb-16 md:pb-24 w-full max-w-container mx-auto">
            <div
              ref={statsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full reveal-group"
            >
              {STATS.map(({ value, label }) => (
                <StatCard
                  key={label}
                  stat={value}
                  label={label}
                  className={`reveal${statsInView ? " in-view" : ""}`}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="font-sans font-normal text-[14px] text-zinc-500">
                See how much your team could save
              </p>
              <TextLink href="/pricing#calculator" tone="brand" arrow>
                Open cost calculator
              </TextLink>
            </div>
          </div>
        </section>
        </div>

        {/* Enterprise features */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <SectionLabel>What's included</SectionLabel>
              <SectionHeading>Everything your team needs to move fast</SectionHeading>
              <SectionSub maxWidth={480}>
                From dedicated migration support to contractual SLAs, built around how enterprise teams actually operate.
              </SectionSub>
            </div>

            <div
              ref={featuresRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group"
            >
              {FEATURES.map(({ icon, title, description }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={description}
                  className={`reveal${featuresInView ? " in-view" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="w-full px-5 md:px-8 py-16 md:py-24 bg-white">
          <div
            ref={pricingRef}
            className={`w-full max-w-[800px] mx-auto rounded-3xl border border-brand/20 bg-brand-50 shadow-brand-ambient reveal${pricingInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-10 items-center text-center px-8 md:px-16 py-16 md:py-20 w-full">
              <div className="flex flex-col gap-4">
                <SectionLabel>Pricing</SectionLabel>
                <SectionHeading>Custom pricing for every scale.</SectionHeading>
                <p className="font-sans font-normal text-[16px] leading-[1.65] text-zinc-600 mx-auto max-w-[400px]">
                  Starts at <span className="text-zinc-950 font-medium">{PRICE_PER_TB_MONTH}</span> with no egress fees or API charges. Volume discounts and committed-use agreements available.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {PRICING_TAGS.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand/5 border border-brand/20"
                  >
                    <Check size={12} weight="bold" className="text-aqua-400 shrink-0" />
                    <span className="font-sans font-normal text-[13.5px] text-brand-700 whitespace-nowrap">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>

              <Button variant="primary" size="lg" glow href="/contact-sales" onClick={() => trackCtaClick("Talk to sales", "/contact-sales", "primary")}>
                Talk to sales
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-10 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[720px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading>Common questions</SectionHeading>
            </div>
            <FaqAccordion items={FAQS} idPrefix="enterprise-faq" />
          </div>
        </section>

        {/* CTA Banner */}
        <CtaBanner
          heading="Ready to see what Fil One can do for your team?"
          subhead="We'll prepare a custom quote and migration plan within one business day."
          cta={{
            label: "Get a demo",
            href: "/contact-sales",
            onClick: () => trackCtaClick("Get a demo", "/contact-sales", "primary"),
          }}
        />

      </main>
      <Footer />
    </div>
  );
};

export default EnterprisePage;
