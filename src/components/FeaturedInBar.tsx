import PressMarquee from "@/components/PressMarquee";

const FEATURED_IN = ["Fast Company", "CNBC", "Bloomberg", "Yahoo Finance", "VentureBeat"];

interface FeaturedInBarProps {
  /** Publication labels; defaults to the standard press set (incl. Fast Company). */
  items?: string[];
  /** Lead-in line above the logos. */
  intro?: string;
  /** white (default) or the standard grey section treatment (zinc-50 + zinc-100 borders) */
  tone?: "white" | "grey";
}

/**
 * Lightweight "featured in" social-proof strip: a lead-in line + a marquee of
 * press logos, without PressBar's Fast Company award callout. For landing
 * pages that want the logo strip on its own beneath the hero.
 */
export const FeaturedInBar = ({
  items = FEATURED_IN,
  intro = "Our technology has been featured in",
  tone = "white",
}: FeaturedInBarProps) => (
  <section
    className={`flex flex-col items-center gap-4 px-5 pt-8 md:pt-10 pb-16 md:pb-20 w-full ${
      tone === "grey" ? "bg-zinc-50 border-y border-zinc-100" : "bg-white"
    }`}
  >
    <p className="font-sans text-[12.5px] font-normal text-zinc-500">{intro}</p>
    <PressMarquee items={items} size="lg" />
  </section>
);

export default FeaturedInBar;
