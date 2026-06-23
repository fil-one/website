import { useEffect } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import PlatformHeroSection from "@/components/PlatformHeroSection";
import HeroGridDots from "@/components/HeroGridDots";
import ProductsSection from "@/components/ProductsSection";
import DeveloperSection from "@/components/DeveloperSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useScrollTracking } from "@/hooks/useScrollTracking";

const VersionB = () => {
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
    canonical: "https://fil.one/",
    ogImage: "https://fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">
        <div className="relative isolate" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.09" stroke-width="1"/></svg>')}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />
          <HeroGridDots />
          <PlatformHeroSection />
          {/* Products section replaces the features section — this is the platform's core nav anchor */}
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

export default VersionB;
