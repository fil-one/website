import { useEffect } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { HeroHeading } from "@/components/LandingPrimitives";
import FaqSection from "@/components/FaqSection";
import { PressBar } from "@/components/PressBar";
import PricingCard from "@/components/PricingCard";
import StatGridSection from "@/components/StatGridSection";
import CostCalculatorSection from "@/components/CostCalculatorSection";
import CtaBanner from "@/components/CtaBanner";
import { COMPETITORS, PRICE_DISPLAY, PRICE_PER_TB_MONTH } from "@/lib/pricing";

// ─── Pricing tiers ─────────────────────────────────────────────────────────────
const PAYGO_FEATURES = [
  "1 TB free for 30 days",
  "Pay monthly",
  "No egress or API request fees",
  "Data integrity guarantees",
];

const BUSINESS_FEATURES = [
  "Purchase in 1, 3, or 5-year increments",
  "No egress or API request fees",
  "Data integrity guarantees",
  "Capacity assurance and deployment SLAs",
];


// ─── Page ──────────────────────────────────────────────────────────────────────
const PricingPage = () => {
  useSeo({
    title: "Pricing · Fil One",
    description:
      `S3-compatible object storage at ${PRICE_DISPLAY}/TB with no egress fees. See how much you could save compared to AWS, Google Cloud, and Azure.`,
    canonical: "https://fil.one/pricing",
  });

  // Deep links like /pricing#calculator arrive as a full page load; the target
  // section only exists after render, so scroll to it once on mount.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Defer a frame so the section is in the DOM before we scroll.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 pt-[58px] md:pt-[94px] pb-16 md:pb-24 w-full bg-white">
          <div className="flex flex-col items-center gap-10 w-full max-w-container mx-auto pt-16 md:pt-24">
            <HeroHeading
              title={<>The <span className="text-gradient-flow">cheapest S3-compatible</span> storage solution.</>}
              description="One flat rate per TB. No egress fees and no API charges."
              titleMaxWidth={800}
              descriptionMaxWidth={520}
            />

            {/* Pricing cards */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-[800px]">
              <PricingCard
                name="Pay-as-you-go"
                tagline="For teams getting started"
                price={PRICE_DISPLAY}
                priceSuffix="/ TB / month"
                priceNote="Free for the first 30 days."
                features={PAYGO_FEATURES}
                cta={{ label: "Start for free", href: "https://app.fil.one/login?screen_hint=signup", variant: "primary" }}
                highlighted
              />
              <PricingCard
                name="Business"
                tagline="For enterprises with scale"
                price="Custom pricing"
                priceSize={32}
                priceNote="Ideal for predictable storage needs or compliance-driven requirements."
                features={BUSINESS_FEATURES}
                cta={{ label: "Contact sales", href: "/contact-sales", variant: "secondary" }}
              />
            </div>
          </div>
        </section>

        {/* ── No hidden fees ───────────────────────────────────────────────── */}
        <StatGridSection
          label="What's included"
          heading="No hidden fees"
          description={`${PRICE_PER_TB_MONTH} for storage capacity. Everything else is included.`}
          stats={[
            { stat: "$0", label: "Egress fees" },
            { stat: "$0", label: "API request fees" },
            { stat: "$0", label: "Exit fees" },
          ]}
        />

        {/* ── Cost calculator ───────────────────────────────────────────────── */}
        <CostCalculatorSection id="calculator" competitors={COMPETITORS} />

        {/* ── Publications ─────────────────────────────────────────────────── */}
        <PressBar tone="grey" />

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <FaqSection include={[
          "What counts as egress?",
          "How is my bill calculated?",
          "Do you offer annual or reserved capacity plans?",
          "Where is my data stored?",
        ]} />

        {/* ── CTA banner ───────────────────────────────────────────────────── */}
        <CtaBanner
          heading="Up to 22× cheaper than AWS"
          subhead={`${PRICE_DISPLAY}/TB, no egress fees, up and running in minutes.`}
          cta={{ label: "Start for free", href: "https://app.fil.one/login?screen_hint=signup" }}
          note="No credit card required"
        />

      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
