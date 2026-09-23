import { useEffect } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import { Button } from "@/components/Button";
import { HeroHeading } from "@/components/LandingPrimitives";
import { trackCtaClick } from "@/lib/analytics";
import DashboardPreview from "@/components/DashboardPreview";
import { PressBar } from "@/components/PressBar";
import StatGridSection from "@/components/StatGridSection";
import UseCasesSection from "@/components/UseCasesSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import StorageUseCasesSection from "@/components/StorageUseCasesSection";
import ComparisonSection from "@/components/ComparisonSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import PartnersSection from "@/components/PartnersSection";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { PRICE_DISPLAY, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SIGNUP_URL = signupUrl();

const STATS = [
  { stat: PRICE_DISPLAY, label: "Per TB / month" },
  { stat: "$0", label: "Egress fees" },
  { stat: "11 nines", label: "Durability" },
];

const Home = () => {
  const { heroEndRef } = useScrollTracking();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
  }, []);

  useSeo();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">
        <div className="relative isolate bg-white">
          {/* Brand-blue hero card: a prototype of Cloudflare's full-bleed hero
              treatment in Fil One's own brand blue instead of a white/grid hero. */}
          <section className="relative w-full pt-[67px] md:pt-[75px] px-2 md:px-4 max-w-none mx-auto">
            <div
              className="relative isolate flex flex-col items-center overflow-hidden rounded-[28px] bg-hero-card-brand px-5 pb-36 pt-36 md:rounded-[32px] md:px-8 md:pb-52 md:pt-52"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 opacity-[0.15] [mask-image:radial-gradient(ellipse_80%_75%_at_50%_50%,black_40%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_80%_75%_at_50%_50%,black_40%,transparent_100%)]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#fff" stroke-width="1"/></svg>')}")`,
                  backgroundSize: "48px 48px",
                  backgroundPosition: "center top",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 pointer-events-none bg-hero-card-glow"
              />

              <div className="flex flex-col items-center gap-6 w-full hero-fade-1">
                <HeroHeading
                  tone="brand"
                  title={<>Sovereign storage<br />for the AI era</>}
                  description={<>Choose where your data lives, pay one flat rate per TB, and access it<br />with no egress fees. All with your existing S3 tools.</>}
                  titleMaxWidth={520}
                  descriptionMaxWidth={620}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 hero-fade-2">
                <Button
                  variant="primary"
                  size="lg"
                  href={SIGNUP_URL}
                  onClick={() => trackCtaClick("Start for free", SIGNUP_URL, "primary")}
                >
                  Start for free
                </Button>
              </div>

              <p className="mt-4 hero-fade-3 text-center font-sans text-[13px] font-normal leading-[1.5] text-white">
                1&nbsp;TB free for 30 days · No credit card required
              </p>
            </div>
          </section>
          <div className="mt-10 md:mt-16">
            <PressBar />
          </div>
          <div className="mt-6 md:mt-10">
            <DashboardPreview />
          </div>
        </div>

        {/* Stats */}
        <div ref={heroEndRef}>
          <StatGridSection
            label="By the numbers"
            heading="No surprises"
            description={`Flat ${PRICE_PER_TB_MONTH} for storage, with no egress fees and no API charges.`}
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

        {/* Enterprise — the "and if you need more than self-serve" step after pricing */}
        <EnterpriseSection />

        {/* Partners — the other non-self-serve audience, straight after enterprise */}
        <PartnersSection />

        {/* FAQ — objection handling, right before the CTA */}
        <FaqSection />

        <CtaBanner
          heading="S3 object storage built for the AI era"
          subhead="Try Fil One for 30 days with 1 TB included and no credit card required. Or talk to our team about enterprise pricing or migrating your existing storage."
          cta={{
            label: "Start for free",
            href: signupUrl(),
            onClick: () => trackCtaClick("Start for free", signupUrl(), "primary"),
          }}
          secondaryCta={{
            label: "Talk to sales",
            href: "/contact-sales",
            onClick: () => trackCtaClick("Talk to sales", "/contact-sales", "secondary"),
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
