import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import PriceComparisonHero from "@/components/PriceComparisonHero";
import FeaturedInBar from "@/components/FeaturedInBar";
import StatGridSection from "@/components/StatGridSection";
import FeaturesSection from "@/components/FeaturesSection";
import CostCalculatorSection from "@/components/CostCalculatorSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import CtaBanner from "@/components/CtaBanner";
import { COMPETITORS, PRICE_DISPLAY, PRICE_PER_TB_MONTH } from "@/lib/pricing";

const PriceLandingPage = () => {
  useSeo({
    title: "Fil One — $4.99/TB/month. Switch and save.",
    description:
      "Compare flat-rate S3-compatible storage side by side. Fil One is $4.99/TB with $0 egress and no per-request fees. Wasabi is $7.99/TB and Backblaze B2 $6.95/TB.",
    canonical: "https://fil.one/lp/price",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <PriceComparisonHero ctaHref="https://app.fil.one/login?screen_hint=signup" />

        <FeaturedInBar />

        {/* What's included */}
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

        {/* Cost calculator */}
        <CostCalculatorSection competitors={COMPETITORS.filter((c) => c.name !== "AWS S3")} />

        {/* Features */}
        <FeaturesSection />

        {/* Integrations */}
        <IntegrationsSection />

        {/* Closing CTA */}
        <CtaBanner
          heading="The lowest-cost S3 object storage"
          subhead={`${PRICE_DISPLAY}/TB, no egress fees, up and running in minutes.`}
          cta={{ label: "Try 30 days for free", href: "https://app.fil.one/login?screen_hint=signup" }}
          note="No credit card required"
        />
      </main>
      <Footer />
    </div>
  );
};

export default PriceLandingPage;
