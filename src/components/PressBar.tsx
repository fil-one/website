const PUBLICATIONS = ["CNBC", "Bloomberg", "Yahoo Finance", "VentureBeat"];

interface PressBarProps {
  /** white (default) or the standard grey section treatment (zinc-50 + zinc-100 borders) */
  tone?: "white" | "grey";
}

/**
 * "Fast Company" callout + infinite-scroll marquee of press logos.
 * Used on the homepage and pricing page — only the background differs.
 */
export const PressBar = ({ tone = "white" }: PressBarProps) => (
  <section
    className={`flex flex-col items-center gap-12 px-5 py-16 md:py-20 w-full ${
      tone === "grey" ? "bg-zinc-50 border-y border-zinc-100" : "bg-white"
    }`}
  >
    <p className="max-w-[620px] text-center font-display text-[24px] font-medium leading-[1.45] tracking-[-0.015em] text-zinc-500">
      Our technology was named one of
      <br />
      <span className="text-brand-500">Fast Company's 11 Next Big Things in AI &amp; Data Innovation</span>
    </p>

    <div className="flex flex-col items-center gap-4 w-full">
      <p className="font-sans text-[12.5px] font-normal text-zinc-500">
        And it has also been featured in
      </p>
      <div className="marquee-mask w-full max-w-2xl overflow-hidden">
        <div className="marquee-track flex items-center w-max">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center gap-8 pr-8" aria-hidden={copy === 1}>
              {PUBLICATIONS.map((pub) => (
                <span key={pub} className="flex items-center gap-8">
                  <span className="font-sans text-[16px] font-medium text-zinc-600">
                    {pub}
                  </span>
                  <span className="text-[20px] text-zinc-300">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PressBar;
