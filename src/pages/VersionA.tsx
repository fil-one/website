import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UseCasesSection from "@/components/UseCasesSection";
import AiCapabilitiesSection from "@/components/AiCapabilitiesSection";
import ComparisonSection from "@/components/ComparisonSection";
import StorageCalculatorSection from "@/components/StorageCalculatorSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";

const VersionA = () => {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
  }, []);

  useSeo({
    title: "Fil One — S3 Storage with AI Capabilities (Version A)",
    description:
      "S3-compatible object storage built for the AI era. Add RAG Pipeline and AI Agent Toolkit as capabilities on top of your storage.",
    canonical: "https://fil.one/v1",
    ogImage: "https://fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
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
          <HeroSection />
          <UseCasesSection />
        </div>
        {/* AI capabilities add-on section — positioned right after core storage features */}
        <AiCapabilitiesSection />
        <ComparisonSection />
        <StorageCalculatorSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default VersionA;
