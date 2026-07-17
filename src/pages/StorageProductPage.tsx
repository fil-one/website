import { useEffect } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";
import Hero from "@/components/Hero";
import Pill from "@/components/Pill";
import StatGridSection from "@/components/StatGridSection";
import CtaBanner from "@/components/CtaBanner";
import StorageUseCasesSection from "@/components/StorageUseCasesSection";
import UseCasesSection from "@/components/UseCasesSection";
import ComparisonSection from "@/components/ComparisonSection";
import PricingTeaserSection from "@/components/PricingTeaserSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import FaqSection from "@/components/FaqSection";
import { PRICE_DISPLAY, PRICE_PER_TB_MONTH } from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const DOCS_URL = "https://docs.fil.one";

const STATS = [
  { stat: PRICE_DISPLAY, label: "Per TB / month" },
  { stat: "$0", label: "Egress fees" },
  { stat: "11 9s", label: "Durability" },
];

const StorageProductPage = () => {
  const { heroEndRef } = useScrollTracking();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
  }, []);

  useSeo({
    title: "Object Storage · Fil One",
    description:
      `S3-compatible object storage built for the AI era. Verifiable data integrity, no egress fees, ${PRICE_PER_TB_MONTH}. The foundation every Fil One account starts with.`,
    canonical: "https://fil.one/storage",
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
          badge={<Pill>Object Storage · S3-compatible</Pill>}
          titleSize="text-[28px] sm:text-[34px] md:text-[44px]"
          title={<>Store more. Pay less.<br />Own it completely.</>}
          description={"Fully S3-compatible object storage with no egress fees, no API request charges, and verifiable data integrity on every byte."}
          titleMaxWidth={560}
          descriptionMaxWidth={500}
          contentClassName="pb-24 md:pb-32"
          tagline="1 TB free for 30 days · No credit card required · No egress fees"
          ctas={[
            {
              label: "Start for free",
              href: SIGNUP_URL,
              variant: "primary",
              onClick: () => trackCtaClick("Start for free", SIGNUP_URL, "primary"),
            },
            {
              label: "Explore docs",
              href: DOCS_URL,
              variant: "secondary",
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: () => {
                trackCtaClick("Explore docs", DOCS_URL, "secondary");
                trackDocsClick(DOCS_URL);
              },
            },
          ]}
        />

        {/* Stats */}
        <div ref={heroEndRef}>
          <StatGridSection
            label="By the numbers"
            heading="No surprises"
            description={`Flat ${PRICE_PER_TB_MONTH} for storage. No egress fees, no API charges, and verifiable durability on every byte.`}
            stats={STATS}
          />
        </div>

        {/* Features — what it does */}
        <UseCasesSection heading="S3 storage made simple" />

        {/* Integrations — works with your existing stack */}
        <IntegrationsSection tone="grey" />

        {/* Use cases — what you build with it */}
        <StorageUseCasesSection />

        {/* Comparison — how it stacks up */}
        <ComparisonSection bordered />

        {/* Pricing teaser — the savings payoff */}
        <PricingTeaserSection />

        {/* FAQ — objection handling, right before the CTA */}
        <FaqSection include={[
          "Is Fil One hot, warm, or cold storage? Is it like Glacier?",
          "How does data integrity verification work with Fil One?",
          "Is Fil One compatible with my existing tools?",
          "What kinds of organizations use Fil One?",
          "How does Fil One approach security and compliance?",
          "How do I migrate from AWS / Azure / Google Cloud?",
          "What is Filecoin?",
        ]} />

        {/* CTA Banner */}
        <CtaBanner
          heading="Your data, your keys, your control"
          subhead="Start with 1 TB free. No credit card, no egress fees, no surprises."
          cta={{
            label: "Start for free",
            href: SIGNUP_URL,
            onClick: () => trackCtaClick("Start for free", SIGNUP_URL, "primary"),
          }}
          note={`S3-compatible · Verifiable integrity · ${PRICE_PER_TB_MONTH} after trial`}
        />

      </main>
      <Footer />
    </div>
  );
};

export default StorageProductPage;
