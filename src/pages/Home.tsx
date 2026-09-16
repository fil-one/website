import { useEffect } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Hero from "@/components/Hero";
import Pill from "@/components/Pill";
import Icon from "@/components/Icon";
import { trackCtaClick } from "@/lib/analytics";
import DashboardPreview from "@/components/DashboardPreview";
import { PressBar } from "@/components/PressBar";
import HeroGridDots from "@/components/HeroGridDots";
import ProductsSection from "@/components/ProductsSection";
import BucketIntelligenceSection from "@/components/BucketIntelligenceSection";
import DeveloperSection from "@/components/DeveloperSection";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { Button } from "@/components/Button";
import { useSeo } from "@/hooks/useSeo";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { signupUrl } from "@/lib/console-url";

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
      "Store, search, and connect your data to AI. Object Storage, RAG Pipeline, and AI Agent Toolkit — on one verifiable, vendor-independent platform.",
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
            badge={
              <a
                href="/bucket-intelligence"
                onClick={() => trackCtaClick("Bucket Intelligence badge", "/bucket-intelligence", "secondary")}
                className="inline-flex max-w-[calc(100vw-40px)] items-center gap-2.5 rounded-full border border-brand/20 bg-brand-50 py-[5px] pl-[6px] pr-[6px] no-underline transition-colors hover:bg-brand-100 sm:max-w-none"
              >
                <Pill variant="solid" pulse className="shrink-0">New</Pill>
                <span className="text-balance font-sans text-[13.5px] font-medium leading-[1.3] text-brand-600">
                  Bucket Intelligence is now live for early users
                </span>
                <span className="flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <Icon icon={ArrowRight} size={11} weight="bold" />
                </span>
              </a>
            }
            titleSize="text-[34px] sm:text-[44px] md:text-[62px]"
            titleLeading="1.02"
            title={<>Keep your data <br className="sm:hidden" />where you need it</>}
            description={<>Choose where your data lives, pay one flat rate per TB, and access it<br />with no egress fees. All with your existing S3 tools.</>}
            titleMaxWidth={480}
            descriptionMaxWidth={620}
            contentClassName="pb-2 md:pb-4"
            ctas={[
              {
                label: "Start for free",
                href: signupUrl(),
                variant: "primary",
                size: "lg",
                glow: true,
                onClick: () => trackCtaClick("Start for free", signupUrl(), "primary"),
              },
            ]}
            tagline="1TB free for 30 days · No credit card required"
          />
          <DashboardPreview />
          <div className="pb-10 md:pb-16">
            <PressBar />
          </div>
          {/* Products section replaces the features section — this is the platform's core nav anchor */}
          <div ref={heroEndRef}>
            <ProductsSection />
          </div>
        </div>

        <BucketIntelligenceSection />

        {/* Light-touch partner door — one message, no mechanics. The full
            pitch belongs on a dedicated partner page, not the homepage. */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-dark-section">
          <div className="flex flex-col gap-6 items-center text-center w-full max-w-container mx-auto">
            <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-white/50">
              Partners
            </span>
            <h2 className="m-0 font-display text-[26px] md:text-[34px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
              Running a GPU cloud?
            </h2>
            <p className="m-0 max-w-[480px] font-sans text-[15px] md:text-[17px] leading-[1.65] text-white/60">
              Add a storage line to your invoice, with no hardware to buy and no team to hire. We install and run it inside your data center, cross-connected to your GPU nodes.
            </p>
            <Button
              variant="primary"
              tone="dark"
              size="lg"
              href="/partners"
              onClick={() => trackCtaClick("See our partner program", "/partners", "secondary")}
            >
              See our partner program
            </Button>
          </div>
        </section>

        <DeveloperSection />
        <FaqSection />
        <CtaBanner
          heading="One network. One record. One less thing to worry about."
          subhead="Try Fil One for 30 days, with 1 TB of storage, 2TB of egress and no credit card required."
          cta={{
            label: "Start for free",
            href: signupUrl(),
            onClick: () => trackCtaClick("Start for free", signupUrl(), "primary"),
          }}
          note={
            <span className="inline-flex flex-wrap items-center justify-center gap-2">
              Running a GPU cloud?
              <a
                href="/partners"
                onClick={() => trackCtaClick("See our partner program", "/partners", "secondary")}
                className="inline-flex items-center gap-1 font-sans text-[13px] font-medium text-white underline underline-offset-2 transition-opacity hover:opacity-70"
              >
                See our partner program
                <Icon icon={ArrowRight} size={12} weight="bold" />
              </a>
            </span>
          }
          headingMaxWidth={460}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
