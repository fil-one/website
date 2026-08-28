import { Plug, ArrowsOut, ShieldCheck, Lock, MapPin, Rocket } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import Hero from "@/components/Hero";
import { Button } from "@/components/Button";
import FeaturedInBar from "@/components/FeaturedInBar";
import StatCard from "@/components/StatCard";
import FeatureCard from "@/components/FeatureCard";
import CtaBanner from "@/components/CtaBanner";
import IntegrationsSection from "@/components/IntegrationsSection";
import PriceComparisonTable, {
  type PriceComparisonColumn,
  type PriceComparisonRow,
} from "@/components/PriceComparisonTable";
import { PRICE_PER_TB, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SIGNUP_URL = signupUrl();

/** The modelled workload: 10 TB stored, 10 TB egress, 500K operations a month. */
const WORKLOAD_TB = 10;
const FIL_ONE_TOTAL = `$${(PRICE_PER_TB * WORKLOAD_TB).toFixed(2)}`;

const PRICING_COLUMNS: PriceComparisonColumn[] = [
  { key: "region", header: "Region" },
  { key: "storage", header: "Storage" },
  { key: "egress", header: "Egress", colorByValue: true },
  { key: "api", header: "API / ops", colorByValue: true },
  { key: "total", header: "Total / month", total: true },
];

const PRICING_ROWS: PriceComparisonRow[] = [
  {
    provider: "Fil One",
    isFilOne: true,
    values: { region: "EU-West", storage: FIL_ONE_TOTAL, egress: "$0", api: "$0", total: FIL_ONE_TOTAL },
  },
  {
    provider: "Backblaze B2",
    values: { region: "eu-central-003 Amsterdam", storage: "$69.50", egress: "$0", api: "$0", total: "$69.50" },
  },
  {
    provider: "Wasabi",
    values: { region: "eu-west-2 Paris", storage: "$79.90", egress: "$0", api: "$0", total: "$79.90" },
  },
  {
    provider: "AWS S3 Standard",
    values: { region: "eu-south-2 Madrid", storage: "$230", egress: "$900", api: "$2.50", total: "$1,132.50" },
  },
];

const STATS = [
  { stat: PRICE_PER_TB_SHORT, label: "Flat monthly rate" },
  { stat: "$0", label: "Egress fees" },
  // The 20× is the total bill, which is egress-driven, so it only holds for a
  // read-heavy workload. The note names the one the pricing table models.
  {
    stat: "20×",
    label: "Cheaper than AWS",
    note: `On ${WORKLOAD_TB} TB stored, ${WORKLOAD_TB} TB egress`,
  },
];

const FEATURES = [
  { icon: Plug, title: "Drop-in S3 compatibility", desc: "Same API, same SDKs, same tools. Point your existing workflow at our endpoint." },
  { icon: ArrowsOut, title: "Zero egress fees", desc: "Every read is free, so your bill stays flat no matter how busy the month." },
  { icon: ShieldCheck, title: "Backed by a published SLA", desc: "An uptime commitment with service credits, and a public status page at status.fil.one." },
  { icon: Lock, title: "Object Lock and versioning", desc: "Governance or Compliance mode, retention up to 100 years, and a full version history." },
  { icon: MapPin, title: "Your data never leaves the EU", desc: "Storage stays within European borders, ready for your compliance reviews." },
  { icon: Rocket, title: "Up and running in minutes", desc: "Generate access keys, point your tools at our endpoint, and start uploading." },
];

const BarcelonaLandingPage = () => {
  useSeo({
    title: `Fil One for Barcelona: European Storage, ${PRICE_PER_TB_SHORT}, No Egress Fees`,
    description:
      `S3-compatible object storage for teams in Barcelona. EU data sovereignty, zero egress fees, at ${PRICE_PER_TB_SHORT}. Drop into your existing stack in minutes.`,
    canonical: "https://www.fil.one/lp/barcelona",
  });

  const { ref: posRef, inView: posInView } = useInView({ threshold: 0.05 });
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Hero
          glow
          grid
          titleSize="text-[34px] sm:text-[44px] md:text-[62px]"
          titleMaxWidth={760}
          descriptionMaxWidth={520}
          contentClassName="pb-10 md:pb-14"
          title={
            <>
              European storage.
              <br />
              <span className="text-brand-500">{PRICE_PER_TB_SHORT}, no egress fees.</span>
            </>
          }
          description={
            <>
              S3-compatible object storage that keeps your data in Europe.
              <br />
              Works with your existing tools, no migration needed.
            </>
          }
          ctas={[{ label: "Try 30 days for free", href: SIGNUP_URL, variant: "primary", size: "lg", glow: true }]}
        />

        {/* ── Publications / Social proof ──────────────────────────────────── */}
        <FeaturedInBar />

        {/* ── Positioning ───────────────────────────────────────────────────── */}
        <section id="positioning" className="px-5 md:px-8 py-16 md:py-20 w-full bg-zinc-50">
          <div
            ref={posRef}
            className={`flex flex-col md:flex-row gap-8 md:gap-14 items-stretch md:items-start w-full max-w-container mx-auto reveal${posInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left md:max-w-[320px]">
              <SectionLabel>Why Fil One</SectionLabel>
              <SectionHeading>
                Unbeatably <span className="text-brand-500">low cost</span>
              </SectionHeading>
              <SectionSub maxWidth={320}>
                S3-compatible, EU-sovereign, zero egress. No hidden fees, no pricing surprises.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full flex-1">
              {STATS.map(({ stat, label, note }) => (
                <StatCard key={label} stat={stat} label={label} note={note} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing table ─────────────────────────────────────────────────── */}
        <section id="compare" className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={pricingRef}
            className={`flex flex-col gap-8 w-full max-w-container mx-auto reveal${pricingInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>
                Your monthly bill, <span className="text-brand-500">four ways</span>
              </SectionHeading>
              <SectionSub maxWidth={600}>
                A {WORKLOAD_TB} TB team in Barcelona, delivering {WORKLOAD_TB} TB of egress each month, running 500,000
                object operations.
              </SectionSub>
            </div>

            <PriceComparisonTable
              columns={PRICING_COLUMNS}
              rows={PRICING_ROWS}
              caption={`Monthly cost for a ${WORKLOAD_TB} TB workload in Europe, by provider`}
              centerFootnote
              footnote="Competitor prices are their published EU-region list rates. All prices in USD."
            />

            {/* Mid-page CTA after pricing table */}
            <div className="flex items-center justify-center mt-4">
              <Button variant="primary" href={SIGNUP_URL}>
                Try 30 days for free
              </Button>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section id="features" className="w-full bg-zinc-50">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-4 items-center text-center">
              <SectionLabel>Features</SectionLabel>
              <SectionHeading>
                The <span className="text-brand-500">S3 you expected</span>
              </SectionHeading>
              <SectionSub>Compatible with everything your team already uses.</SectionSub>
            </div>
            <div
              ref={featuresRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group reveal${featuresInView ? " in-view" : ""}`}
            >
              {FEATURES.map(({ icon, title, desc }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={desc}
                  className={`reveal${featuresInView ? " in-view" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Integrations ──────────────────────────────────────────────────── */}
        <IntegrationsSection />

        {/* ── CTA Banner ────────────────────────────────────────────────────── */}
        <CtaBanner
          heading="The cheapest object storage in Europe"
          subhead={`${PRICE_PER_TB_SHORT}, no egress fees, up and running in minutes.`}
          cta={{ label: "Try 30 days for free", href: SIGNUP_URL }}
          note="No credit card required"
        />
      </main>

      <Footer />
    </div>
  );
};

export default BarcelonaLandingPage;
