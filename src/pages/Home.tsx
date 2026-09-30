import { useEffect } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Hero from "@/components/Hero";
import DashboardPreview from "@/components/DashboardPreview";
import ProofStrip from "@/components/ProofStrip";
import WhySection from "@/components/WhySection";
import WorkloadsGrid from "@/components/WorkloadsGrid";
import TeamsSection from "@/components/TeamsSection";
import DevelopersSection from "@/components/DevelopersSection";
import { PressBar } from "@/components/PressBar";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";
import { PRICE_DISPLAY } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const DOCS_URL = "https://docs.fil.one";

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
        <div className="relative isolate overflow-hidden bg-white">
          <Hero
            grid
            glow
            title={<>S3 object storage that lives where your data works.</>}
            description="Fast reads, predictable pricing and the freedom to move your data without lock-in or egress penalties."
            titleMaxWidth={820}
            descriptionMaxWidth={620}
            ctas={[
              {
                label: "Start for free",
                href: signupUrl(),
                variant: "primary",
                size: "lg",
                glow: true,
                onClick: () => trackCtaClick("Start for free", signupUrl(), "primary"),
              },
              {
                label: "Explore the docs",
                href: DOCS_URL,
                variant: "secondary",
                target: "_blank",
                rel: "noopener noreferrer",
                onClick: () => trackDocsClick(DOCS_URL),
              },
            ]}
            tagline={<>1&nbsp;TB free for 30 days · No credit card required</>}
          />
          <DashboardPreview />
        </div>

        {/* Proof strip: the three numbers, on the hairline under the console */}
        <div ref={heroEndRef} className="w-full px-5 md:px-8">
          <div className="mx-auto w-full max-w-container border-t border-black/[0.08] pt-8">
            <ProofStrip
              items={[
                { figure: "Multi-Gbps", label: "Sustained reads" },
                { figure: "$0", label: "Egress and API requests", note: "Subject to fair use." },
                { figure: PRICE_DISPLAY, label: "Per TB per month" },
              ]}
            />
          </div>
        </div>

        {/* Why Fil One — the page's one dark card */}
        <WhySection />

        {/* Workloads — five doors into the workloads page */}
        <WorkloadsGrid />

        {/* Teams — Enterprise and Neoclouds, side by side */}
        <TeamsSection />

        {/* Developers — change the endpoint, keep your code */}
        <DevelopersSection />

        {/* Press — Fast Company and "Also featured in", on the tint band */}
        <PressBar tone="tint" />

        {/* FAQ — objection handling, right before the CTA */}
        <FaqSection />

        <CtaBanner
          image="window"
          heading="Bring a workload."
          headingMaxWidth={560}
          subheadMaxWidth={440}
          subhead="1 TB free for 30 days, no credit card. Prefer to talk first? sales@fil.one"
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
