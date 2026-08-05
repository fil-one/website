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
import { COMPETITORS, PRICE_DISPLAY, PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import filOneLogo from "@/assets/fil-one-logo.svg";
import wasabiLogo from "@/assets/wasabi.svg";
import backblazeLogo from "@/assets/backblaze.svg";
import { signupUrl } from "@/lib/console-url";

const fmt = (n: number) => `$${n.toFixed(2)}`;
const rate = (name: string) => fmt(COMPETITORS.find((c) => c.name === name)!.storagePricePerTB);

/** Provider price cards: competitors flanking the highlighted Fil One rate. */
const CARDS = [
  { logo: wasabiLogo,    alt: "Wasabi",    price: rate("Wasabi"),       highlighted: false },
  { logo: filOneLogo,    alt: "Fil One",   price: PRICE_DISPLAY,        highlighted: true  },
  { logo: backblazeLogo, alt: "Backblaze", price: rate("Backblaze B2"), highlighted: false },
];

const PriceLandingPage = () => {
  useSeo({
    title: `Fil One · ${PRICE_PER_TB_MONTH}. Switch and save.`,
    description:
      `Compare flat-rate S3-compatible storage side by side. Fil One is ${PRICE_PER_TB_SHORT} with $0 egress and no per-request fees. Wasabi is $7.99/TB and Backblaze B2 $6.95/TB.`,
    canonical: "https://www.fil.one/lp/price",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero — price comparison in the shared Hero's children slot */}
        <Hero
          glow
          grid
          contentClassName="pb-10 md:pb-14"
          title={<>The <span className="text-brand-500">lowest-cost</span><br />S3 object storage</>}
          titleMaxWidth={720}
          ctas={[
            {
              label: "Try 30 days for free",
              href: signupUrl(),
              variant: "primary",
              size: "lg",
              glow: true,
            },
          ]}
          tagline="No credit card required"
        >
          <div className="mt-16 w-full max-w-[820px] grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
            {CARDS.map(({ logo, alt, price, highlighted }) => (
              <div
                key={alt}
                className={
                  "relative flex flex-col items-center justify-center gap-3.5 rounded-2xl px-6 text-center " +
                  (highlighted
                    ? "z-10 bg-brand-50 py-9 ring-1 ring-inset ring-brand-500/40 shadow-brand-glow sm:scale-[1.06]"
                    : "border border-black/[0.06] bg-white py-7 shadow-elevated")
                }
              >
                {/* Logo row — fixed height so all three logos share a baseline.
                    Competitor marks keep brand colour but are dimmed so Fil One
                    stays the visual focus. */}
                <div className="flex h-6 items-center justify-center">
                  <img
                    src={logo}
                    alt={alt}
                    className={highlighted ? "max-h-6 w-auto" : "max-h-6 w-auto opacity-70"}
                  />
                </div>

                {/* Price row — number + suffix share a baseline */}
                <div className="flex items-end justify-center gap-1.5">
                  <span
                    className={
                      highlighted
                        ? "font-display font-medium text-[40px] leading-none tracking-[-0.03em] text-zinc-950 tabular-nums"
                        : "font-display text-[26px] leading-none tracking-[-0.02em] text-zinc-500 line-through decoration-2 decoration-zinc-400 tabular-nums"
                    }
                  >
                    {price}
                  </span>
                  <span className="font-sans text-[13px] leading-none pb-1 text-zinc-500">
                    /TB/month
                  </span>
                  <span className="sr-only">
                    {highlighted ? "(our price)" : "(competitor price, shown for comparison)"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Hero>

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
          cta={{ label: "Try 30 days for free", href: signupUrl() }}
          note="No credit card required"
        />
      </main>
      <Footer />
    </div>
  );
};

export default PriceLandingPage;
