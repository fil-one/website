import { useEffect } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Hero from "@/components/Hero";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";
import DashboardPreview from "@/components/DashboardPreview";
import { PressBar } from "@/components/PressBar";
import HeroGridDots from "@/components/HeroGridDots";
import StatGridSection from "@/components/StatGridSection";
import UseCasesSection from "@/components/UseCasesSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import StorageUseCasesSection from "@/components/StorageUseCasesSection";
import ComparisonSection from "@/components/ComparisonSection";
import PricingTeaserSection from "@/components/PricingTeaserSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import PartnersSection from "@/components/PartnersSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { PRICE_DISPLAY, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SIGNUP_URL = signupUrl();

const STATS = [
  { stat: PRICE_DISPLAY, label: "Per TB / month" },
  { stat: "$0", label: "Egress fees" },
  { stat: "11 9s", label: "Durability" },
];

const Home = () => {
  const { heroEndRef } = useScrollTracking();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
  }, []);

  useSeo({
    title: "Fil One | S3 object storage built for the AI era",
    description:
      `S3-compatible object storage on Filecoin. ${PRICE_PER_TB_MONTH}, no egress fees, 11 nines durability, proven daily.`,
    canonical: "https://www.fil.one/",
    ogImage: "https://www.fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">
        <div className="relative isolate" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10 [mask-image:theme(backgroundImage.hero-grid-mask)] [-webkit-mask-image:theme(backgroundImage.hero-grid-mask)]"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.09" stroke-width="1"/></svg>')}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
            }}
          />
          <HeroGridDots />
          <Hero
            title={<>Sovereign storage<br />for the AI age</>}
            description={<>Choose where your data lives, pay one flat rate per TB, and access it<br />with no egress fees. All with your existing S3 tools.</>}
            titleMaxWidth={520}
            descriptionMaxWidth={620}
            ctas={[
              {
                label: "Start for free",
                href: SIGNUP_URL,
                variant: "primary",
                onClick: () => trackCtaClick("Start for free", SIGNUP_URL, "primary"),
              },
              {
                label: "Explore docs",
                href: "https://docs.fil.one",
                variant: "secondary",
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: () => {
                  trackCtaClick("Explore docs", "https://docs.fil.one", "secondary");
                  trackDocsClick("https://docs.fil.one");
                },
              },
            ]}
            tagline="1TB free for 30 days · No credit card required · No egress fees"
          />
          <DashboardPreview />
          <PressBar />
        </div>

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

        {/* Enterprise — the "and if you need more than self-serve" step after pricing */}
        <EnterpriseSection />

        {/* Partners — the other non-self-serve audience, straight after enterprise */}
        <PartnersSection />

        {/* FAQ — objection handling, right before the CTA */}
        <FaqSection />

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
