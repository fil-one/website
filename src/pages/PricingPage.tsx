import { useState } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading, SectionSub, HeroHeading } from "@/components/LandingPrimitives";
import FaqSection from "@/components/FaqSection";
import { PressBar } from "@/components/PressBar";
import PricingCard from "@/components/PricingCard";
import StatGridSection from "@/components/StatGridSection";
import PricingComparison, { type Competitor } from "@/components/PricingComparison";
import CtaBanner from "@/components/CtaBanner";
import { PRICE_PER_TB, PRICE_DISPLAY, PRICE_PER_TB_MONTH } from "@/lib/pricing";

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

// ─── Calculator competitors ────────────────────────────────────────────────────
const COMPETITORS: Competitor[] = [
  {
    name: "Fil One",
    region: null,
    storagePricePerTB: PRICE_PER_TB,
    egressPricePerTB: 0,
    apiPer1M: 0,
    isFilOne: true,
  },
  {
    name: "Wasabi",
    region: null,
    storagePricePerTB: 7.99,
    egressPricePerTB: 0,
    apiPer1M: 0,
    isFilOne: false,
  },
  {
    name: "Backblaze B2",
    region: null,
    storagePricePerTB: 6.95,
    egressPricePerTB: 10.0,
    apiPer1M: 0,
    isFilOne: false,
  },
  {
    name: "AWS S3",
    region: "eu-west-1",
    storagePricePerTB: 23.0,
    egressPricePerTB: 90.0,
    apiPer1M: 5.0,
    isFilOne: false,
  },
];


// ─── Page ──────────────────────────────────────────────────────────────────────
const PricingPage = () => {
  useSeo({
    title: "Pricing — Fil One",
    description:
      `S3-compatible object storage at ${PRICE_DISPLAY}/TB with no egress fees. See how much you could save compared to AWS, Google Cloud, and Azure.`,
    canonical: "https://fil.one/pricing",
  });

  const [storedTB, setStoredTB] = useState(10);
  const [egressTB, setEgressTB] = useState(10);

  const { ref: calcRef, inView: calcInView } = useInView({ threshold: 0.05 });

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
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={calcRef}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${calcInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Cost calculator</SectionLabel>
              <SectionHeading>See your <span className="text-brand-500">actual savings</span></SectionHeading>
              <SectionSub maxWidth={520}>
                Enter your storage and egress volumes to compare your monthly bill across providers.
              </SectionSub>
            </div>

            {/* Inputs */}
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-[640px] mx-auto">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-center">
                  <label className="font-sans font-medium text-[16px] text-zinc-950">
                    Storage
                  </label>
                  <span className="font-sans font-semibold text-[16px] text-brand-600">
                    {storedTB} TB
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={storedTB}
                  onChange={(e) => setStoredTB(Number(e.target.value))}
                  className="w-full calc-slider"
                />
                <div className="flex justify-between">
                  <span className="font-sans text-[12px] text-zinc-500">1 TB</span>
                  <span className="font-sans text-[12px] text-zinc-500">500 TB</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-center">
                  <label className="font-sans font-medium text-[16px] text-zinc-950">
                    Monthly egress
                  </label>
                  <span className="font-sans font-semibold text-[16px] text-brand-600">
                    {egressTB} TB
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500}
                  value={egressTB}
                  onChange={(e) => setEgressTB(Number(e.target.value))}
                  className="w-full calc-slider"
                />
                <div className="flex justify-between">
                  <span className="font-sans text-[12px] text-zinc-500">0 TB</span>
                  <span className="font-sans text-[12px] text-zinc-500">500 TB</span>
                </div>
              </div>
            </div>

            {/* Results: stacked cards on mobile, table on tablet / desktop */}
            <PricingComparison competitors={COMPETITORS} storedTB={storedTB} egressTB={egressTB} />

            <p className="text-xs text-center text-zinc-500">
              Prices are published list rates in USD as of July 2026. Backblaze B2 includes free egress up to 3× your monthly stored amount; the $10/TB rate applies beyond that threshold. Regional pricing may vary.
            </p>
          </div>
        </section>

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
