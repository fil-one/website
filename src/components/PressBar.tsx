const PUBLICATIONS = ["CNBC", "Bloomberg", "Yahoo Finance", "VentureBeat"];

interface PressBarProps {
  backgroundColor?: string;
}

/**
 * "Fast Company" callout + infinite-scroll marquee of press logos.
 * Used on the homepage and pricing page — only the background differs.
 */
export const PressBar = ({ backgroundColor = "#FFFFFF" }: PressBarProps) => (
  <section className="flex flex-col items-center gap-12 px-5 py-16 md:py-20 w-full" style={{ backgroundColor }}>
    <p
      style={{
        fontFamily: "'Aspekta', sans-serif",
        fontWeight: 500,
        fontSize: 24,
        color: "#71717A",
        letterSpacing: "-0.015em",
        textAlign: "center",
        lineHeight: 1.45,
        maxWidth: 620,
      }}
    >
      Our technology was named one of
      <br />
      <span style={{ color: "#0090FF" }}>Fast Company's 11 Next Big Things in AI &amp; Data Innovation</span>
    </p>

    <div className="flex flex-col items-center gap-4 w-full">
      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, color: "rgb(113,113,122)" }}>
        And it has also been featured in
      </p>
      <div className="marquee-mask w-full max-w-2xl overflow-hidden">
        <div className="marquee-track flex items-center w-max">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center gap-8 pr-8" aria-hidden={copy === 1}>
              {PUBLICATIONS.map((pub) => (
                <span key={pub} className="flex items-center gap-8">
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 16, color: "rgb(82,82,91)" }}>
                    {pub}
                  </span>
                  <span style={{ color: "#D4D4D8", fontSize: 20 }}>·</span>
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
