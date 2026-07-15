import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import Hero from "@/components/Hero";
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
      "Compare flat-rate S3-compatible storage side by side. Fil One: $4.99/TB, $0 egress, no per-request fees — versus Wasabi $7.99/TB and Backblaze B2 $6.95/TB.",
    canonical: "https://fil.one/lp/price",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <Hero
          glow
          grid
          contentClassName="pb-10 md:pb-14"
          title={<>$4.99/TB/month.<br /><span className="text-brand-500">Switch and save.</span></>}
          titleSize="text-[34px] sm:text-[44px] md:text-[62px]"
          description="Move from Wasabi or Backblaze and start paying less today, with the same S3-compatible workflow."
          titleMaxWidth={760}
          descriptionMaxWidth={520}
          ctas={[
            { label: "Try 30 days for free", href: "https://app.fil.one/login?screen_hint=signup", variant: "primary", size: "lg", glow: true },
          ]}
        />

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
          heading="The cheapest S3 object storage"
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
