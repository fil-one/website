import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UseCasesSection from "@/components/UseCasesSection";
import PricingSection from "@/components/PricingSection";
import ComparisonSection from "@/components/ComparisonSection";
import StorageCalculatorSection from "@/components/StorageCalculatorSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fil One",
  url: "https://filone.io",
  logo: "https://filone.io/favicon.png",
  sameAs: ["https://twitter.com/FilOneStorage"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://filone.io/contact-sales",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Fil One",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "S3-compatible object storage built for AI agents and data-intensive workloads. Store RAG corpora, agent memory, model artifacts, and training datasets with verifiable data integrity backed by Filecoin. No egress fees, no per-request charges.",
  keywords: [
    "AI agent storage",
    "S3-compatible storage",
    "RAG storage",
    "vector store backing",
    "agent memory",
    "model artifact storage",
    "Filecoin storage",
    "object storage",
    "no egress fees",
    "verifiable data integrity",
  ],
  url: "https://filone.io",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "30-day free trial, 1 TB included, no credit card required.",
  },
};

const Index = () => {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
  }, []);

  useSeo({
    title: "Fil One — S3-Compatible Object Storage Built for the AI Era",
    description:
      "The storage layer for AI agents. S3-compatible object storage built on Filecoin — store RAG corpora, agent memory, model artifacts, and datasets. No egress fees, verifiable data integrity, $4.99/TB/month.",
    canonical: "https://filone.io/",
    ogImage: "https://filone.io/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareSchema} />
      <Navbar />
      <main id="main-content">
        {/* Grid background wrapper — spans hero → intro → features */}
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

export default Index;
