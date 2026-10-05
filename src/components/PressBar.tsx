import PressMarquee from "@/components/PressMarquee";

const PUBLICATIONS = ["CNBC", "Bloomberg", "Yahoo Finance", "VentureBeat"];

interface PressBarProps {
  /** white (default), the standard grey section treatment, or the pale-blue tint band */
  tone?: "white" | "grey" | "tint";
}

/**
 * "Fast Company" award callout + infinite-scroll marquee of press logos.
 * Used on the homepage and pricing page — only the background differs.
 * The logo strip on its own (no callout) is FeaturedInBar.
 */
export const PressBar = ({ tone = "white" }: PressBarProps) => (
  <section
    className={`flex flex-col items-center gap-12 px-5 py-16 md:py-20 w-full ${
      tone === "grey" ? "bg-zinc-50 border-y border-zinc-100" : tone === "tint" ? "bg-brand-50 border-y border-brand-500/[0.12]" : "bg-white"
    }`}
  >
    <p className="max-w-[620px] text-center font-display text-[24px] font-medium leading-[1.45] tracking-[-0.015em] text-zinc-500">
      Our technology was named one of
      <br />
      <span className="text-brand-500">Fast Company's 11 Next Big Things in AI &amp; Data Innovation</span>
    </p>

    <div className="flex flex-col items-center gap-4 w-full">
      <p className="font-sans text-[12.5px] font-normal text-zinc-500">
        Also featured in
      </p>
      <PressMarquee items={PUBLICATIONS} />
    </div>
  </section>
);

export default PressBar;
