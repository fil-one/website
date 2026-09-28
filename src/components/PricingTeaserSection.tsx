import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/Button";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";
import { COMPETITORS, PRICE_PER_TB, PRICE_PER_TB_MONTH } from "@/lib/pricing";

const PRICING_HREF = "/pricing";

/**
 * Headline savings vs AWS S3 on the whole bill, for a workload that reads as
 * much as it stores each month (AWS storage + egress per TB against Fil One's
 * flat rate). Derived from the shared competitor table so the teaser never
 * drifts from the /pricing page it links to. Reading more only widens the gap,
 * hence "up to".
 */
const aws = COMPETITORS.find((c) => c.name === "AWS S3");
const AWS_SAVINGS_PCT = aws
  ? Math.round((1 - PRICE_PER_TB / (aws.storagePricePerTB + aws.egressPricePerTB)) * 100)
  : 0;

/**
 * Compact pricing-teaser band that replaces the inline calculator on the
 * storage page: keeps the savings hook and routes pricing-intent visitors to
 * the full calculator on /pricing.
 */
const PricingTeaserSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
      <div
        ref={ref}
        className={`flex flex-col gap-6 items-center text-center w-full max-w-container mx-auto reveal${inView ? " in-view" : ""}`}
      >
        <SectionLabel>Pricing</SectionLabel>
        <SectionHeading>
          Up to <span className="text-brand-500">{AWS_SAVINGS_PCT}% cheaper</span> than AWS S3
        </SectionHeading>
        <SectionSub maxWidth={520}>
          Flat {PRICE_PER_TB_MONTH}, no egress fees. Compared with AWS S3 storage and egress for a
          workload that reads as much as it stores each month.
        </SectionSub>
        <Button
          variant="primary"
          size="lg"
          href={PRICING_HREF}
          onClick={() => trackCtaClick("See full pricing", PRICING_HREF, "primary")}
        >
          See full pricing
          <ArrowRight size={16} weight="bold" />
        </Button>
      </div>
    </section>
  );
};

export default PricingTeaserSection;
