import { useState } from "react";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import PricingComparison from "@/components/PricingComparison";
import SpaceCard from "@/components/SpaceCard";
import { useInView } from "@/hooks/useInView";
import { RATES_CHECKED_ON, timesCheaperThanAws, type Competitor } from "@/lib/pricing";

interface CostCalculatorSectionProps {
  /** Providers to compare; each page decides which competitors to include. */
  competitors: Competitor[];
  /** Optional anchor id so pages can deep-link/scroll to the calculator. */
  id?: string;
  /**
   * "light" (default): centred heading on a white section. "dark": the
   * pricing page's SpaceCard, with the live "N× less than AWS S3" figure
   * beside the heading. The dark tone needs AWS S3 in `competitors`.
   */
  tone?: "light" | "dark";
}

const FINE_PRINT = `Published list rates in USD, checked ${RATES_CHECKED_ON}. Storage and egress only: AWS S3 and Cloudflare R2 also charge per request, which is not included. AWS S3 uses its tiered eu-west-1 rates after 100 GB of free egress a month. Backblaze B2 egress is free up to 3× your average stored amount, then $10/TB. Wasabi egress is free under its reasonable-use policy, which expects monthly egress to stay below your stored amount, and Wasabi bills a 1 TB monthly minimum with a 90-day minimum storage duration. Regional pricing may vary.`;

interface SliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  dark: boolean;
}

const Slider = ({ id, label, value, min, max, onChange, dark }: SliderProps) => (
  <div className="flex flex-1 flex-col gap-3">
    <div className="flex items-center justify-between">
      <label htmlFor={id} className={`font-sans text-body font-medium ${dark ? "text-white" : "text-zinc-950"}`}>
        {label}
      </label>
      <span className={`font-sans text-body font-semibold ${dark ? "text-brand-300" : "text-brand-600"}`}>{value} TB</span>
    </div>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      value={value}
      aria-valuetext={`${value} TB`}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`calc-slider w-full${dark ? " calc-slider-dark" : ""}`}
    />
    <div className={`flex justify-between font-sans text-small ${dark ? "text-white/50" : "text-zinc-500"}`}>
      <span>{min} TB</span>
      <span>{max} TB</span>
    </div>
  </div>
);

/**
 * Interactive cost calculator: storage + egress sliders driving a live
 * provider comparison. Shared by the pricing page and the /lp/price landing
 * page, which differ in which competitors they pass in and in tone.
 */
const CostCalculatorSection = ({ competitors, id, tone = "light" }: CostCalculatorSectionProps) => {
  const [storedTB, setStoredTB] = useState(10);
  const [egressTB, setEgressTB] = useState(10);
  const { ref, inView } = useInView({ threshold: 0.05 });
  const dark = tone === "dark";

  const sliders = (
    <div className={`mx-auto flex w-full flex-col gap-6 sm:flex-row${dark ? " max-w-[720px] sm:mx-0" : " max-w-container-narrow"}`}>
      <Slider id="calc-storage" label="Storage" value={storedTB} min={1} max={500} onChange={setStoredTB} dark={dark} />
      <Slider id="calc-egress" label="Monthly egress" value={egressTB} min={0} max={500} onChange={setEgressTB} dark={dark} />
    </div>
  );

  if (dark) {
    const multiple = timesCheaperThanAws(storedTB, egressTB);
    return (
      <section id={id} className="w-full scroll-mt-header px-5 md:px-8">
        <div ref={ref} className={`mx-auto w-full max-w-container reveal${inView ? " in-view" : ""}`}>
          <SpaceCard>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
                <div className="flex max-w-[560px] flex-col gap-3.5">
                  <SectionLabel tone="dark">Calculator</SectionLabel>
                  <SectionHeading tone="dark" size="text-h2 md:text-h1">
                    See what you'd pay.
                  </SectionHeading>
                  <SectionSub tone="dark" maxWidth={520}>
                    Published list prices for the same storage and egress each month. Move the sliders to match your workload.
                  </SectionSub>
                </div>
                <div className="flex flex-col gap-1.5 md:items-end md:text-right" aria-live="polite">
                  <span className="font-display text-[48px] font-medium leading-none tracking-[-0.025em] text-brand-300 md:text-[64px]">
                    {multiple}× less
                  </span>
                  <span className="font-sans text-[14px] text-white/65">
                    than AWS S3 at {storedTB} TB stored and {egressTB} TB served
                  </span>
                </div>
              </div>

              {sliders}

              <PricingComparison competitors={competitors} storedTB={storedTB} egressTB={egressTB} tone="dark" />

              <p className="m-0 max-w-[880px] font-sans text-[12.5px] leading-[1.6] text-white/50">
                {FINE_PRINT} Fil One egress is subject to reasonable use.
              </p>
            </div>
          </SpaceCard>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-24 px-5 md:px-8 py-24 md:py-32 w-full bg-white">
      <div ref={ref} className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${inView ? " in-view" : ""}`}>
        <div className="flex flex-col gap-3 items-center text-center">
          <SectionLabel>Cost calculator</SectionLabel>
          <SectionHeading>See your <span className="text-brand-500">actual savings</span></SectionHeading>
          <SectionSub maxWidth={520}>Enter your storage and egress volumes to compare your monthly bill across providers.</SectionSub>
        </div>

        {sliders}

        {/* Results: stacked cards on mobile, table on tablet / desktop */}
        <PricingComparison competitors={competitors} storedTB={storedTB} egressTB={egressTB} />

        <p className="text-small leading-[1.6] text-center text-zinc-500">{FINE_PRINT}</p>
      </div>
    </section>
  );
};

export default CostCalculatorSection;
