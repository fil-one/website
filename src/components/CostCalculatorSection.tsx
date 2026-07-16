import { useState } from "react";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import PricingComparison from "@/components/PricingComparison";
import { useInView } from "@/hooks/useInView";
import type { Competitor } from "@/lib/pricing";

interface CostCalculatorSectionProps {
  /** Providers to compare; each page decides which competitors to include. */
  competitors: Competitor[];
}

/**
 * Interactive cost calculator: storage + egress sliders driving a live
 * provider comparison. Shared by the pricing page and the /lp/price landing
 * page, which differ only in which competitors they pass in.
 */
const CostCalculatorSection = ({ competitors }: CostCalculatorSectionProps) => {
  const [storedTB, setStoredTB] = useState(10);
  const [egressTB, setEgressTB] = useState(10);
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
      <div ref={ref} className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${inView ? " in-view" : ""}`}>
        <div className="flex flex-col gap-3 items-center text-center">
          <SectionLabel>Cost calculator</SectionLabel>
          <SectionHeading>See your <span className="text-brand-500">actual savings</span></SectionHeading>
          <SectionSub maxWidth={520}>Enter your storage and egress volumes to compare your monthly bill across providers.</SectionSub>
        </div>

        {/* Inputs */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-container-narrow mx-auto">
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex justify-between items-center">
              <label className="font-sans font-medium text-base text-zinc-950">Storage</label>
              <span className="font-sans font-semibold text-base text-brand-600">{storedTB} TB</span>
            </div>
            <input type="range" min={1} max={500} value={storedTB} onChange={(e) => setStoredTB(Number(e.target.value))} className="w-full calc-slider" />
            <div className="flex justify-between">
              <span className="font-sans text-xs text-zinc-500">1 TB</span>
              <span className="font-sans text-xs text-zinc-500">500 TB</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="flex justify-between items-center">
              <label className="font-sans font-medium text-base text-zinc-950">Monthly egress</label>
              <span className="font-sans font-semibold text-base text-brand-600">{egressTB} TB</span>
            </div>
            <input type="range" min={0} max={500} value={egressTB} onChange={(e) => setEgressTB(Number(e.target.value))} className="w-full calc-slider" />
            <div className="flex justify-between">
              <span className="font-sans text-xs text-zinc-500">0 TB</span>
              <span className="font-sans text-xs text-zinc-500">500 TB</span>
            </div>
          </div>
        </div>

        {/* Results: stacked cards on mobile, table on tablet / desktop */}
        <PricingComparison competitors={competitors} storedTB={storedTB} egressTB={egressTB} />

        <p className="text-xs text-center text-zinc-500">
          Prices are published list rates in USD as of July 2026. Backblaze B2 includes free egress up to 3× your monthly stored amount; the $10/TB rate applies beyond that threshold. Regional pricing may vary.
        </p>
      </div>
    </section>
  );
};

export default CostCalculatorSection;
