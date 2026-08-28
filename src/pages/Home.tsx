import { useEffect } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Hero from "@/components/Hero";
import AnnouncementBadge from "@/components/AnnouncementBadge";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";
import DashboardPreview from "@/components/DashboardPreview";
import { PressBar } from "@/components/PressBar";
import HeroGridDots from "@/components/HeroGridDots";
import ProductsSection from "@/components/ProductsSection";
import DeveloperSection from "@/components/DeveloperSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
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
      "S3-compatible object storage at $4.99/TB/month with no egress fees and no API request charges. Immutable Object Lock retention, full version history, US and EU regions.",
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
            badge={<AnnouncementBadge pill="Soon">Bucket Intelligence &amp; AI Agent Toolkit</AnnouncementBadge>}
            title={<>S3 object storage built <br className="sm:hidden" />for the AI era</>}
            description={<>One flat rate per TB, and reading your own data back costs nothing.<br />Your existing S3 tools connect as they are.</>}
            titleMaxWidth={520}
            descriptionMaxWidth={600}
            ctas={[
              {
                label: "Start for free",
                href: signupUrl(),
                variant: "primary",
                onClick: () => trackCtaClick("Start for free", signupUrl(), "primary"),
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
            tagline="1 TB storage and 2 TB egress free for 30 days · No credit card required"
          />
          <DashboardPreview />
          <PressBar />
          {/* Products section replaces the features section. This is the platform's core nav anchor */}
          <div ref={heroEndRef}>
            <ProductsSection />
          </div>
        </div>
        <DeveloperSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
