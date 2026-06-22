import imgDashboard from "../assets/dashboard-preview.png";
import { Play } from "@phosphor-icons/react";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";

const PlatformHeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden pt-[94px]">
      <div className="relative flex flex-col items-center pt-20 md:pt-[120px] pb-0 px-5 md:px-8 max-w-[1120px] mx-auto w-full">
        <div className="flex flex-col items-center gap-6 w-full hero-fade-1">

          {/* Platform badge */}
          <div
            className="flex items-center gap-2.5"
            style={{
              backgroundColor: "#EFF8FF",
              border: "1px solid rgba(0,144,255,0.2)",
              borderRadius: 9999,
              padding: "5px 14px 5px 6px",
            }}
          >
            <span
              className="badge-pulse"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                backgroundColor: "#0090FF",
                borderRadius: 9999,
                padding: "3px 8px",
                lineHeight: 1.4,
              }}
            >
              Coming soon
            </span>
            <span
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 13.5,
                lineHeight: 1,
                color: "#0070CC",
                whiteSpace: "nowrap",
              }}
            >
              Bucket Intelligence &amp; AI Agent Toolkit
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[32px] sm:text-[40px] md:text-[52px]"
            style={{
              fontFamily: "'Aspekta', sans-serif",
              fontWeight: 500,
              lineHeight: "1.12",
              letterSpacing: "-0.02em",
              color: "#09090B",
              textAlign: "center",
              maxWidth: 520,
              margin: 0,
            }}
          >
            S3 object storage built for the AI era
          </h1>

          {/* Subheadline */}
          <p
            className="text-[15px] md:text-[16.5px]"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              lineHeight: "1.65",
              color: "#71717A",
              textAlign: "center",
              maxWidth: 600,
              margin: 0,
            }}
          >
            Your data, your keys, your control.<br />For when every byte matters.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-10 hero-fade-2">
          <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary" onClick={() => trackCtaClick("Start for free", "https://app.fil.one/login?screen_hint=signup", "primary")}>
            <span className="btn-primary-inner">Start for free</span>
          </a>
          <a href="https://docs.fil.one" target="_blank" rel="noopener noreferrer" className="btn-secondary" onClick={() => { trackCtaClick("Explore docs", "https://docs.fil.one", "secondary"); trackDocsClick("https://docs.fil.one"); }}>
            Explore docs
          </a>
        </div>

        {/* Tagline */}
        <p
          className="mt-4 hero-fade-3"
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            lineHeight: "1.5",
            color: "#71717A",
            textAlign: "center",
          }}
        >
          1TB free for 30 days · No credit card required · No egress fees
        </p>
      </div>

      {/* Dashboard preview */}
      <div className="relative px-5 sm:px-10 md:px-16 lg:px-[120px] pb-0 pt-12 md:pt-16 max-w-[1120px] mx-auto w-full hero-fade-4">
        <div
          className="relative w-full rounded-t-[12px] md:rounded-t-[16px] overflow-hidden"
          style={{
            background: "linear-gradient(#fff, #fff) padding-box, linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.10) 80%, rgba(0,0,0,0) 100%) border-box",
            border: "1px solid transparent",
            borderBottom: "none",
            boxShadow: "0 -4px 40px rgba(0,0,0,0.06)",
            clipPath: "inset(-40px -40px 0 -40px)",
          }}
        >
          <img
            src={imgDashboard}
            alt="Fil One platform — object storage, RAG pipeline, and AI agent toolkit"
            className="w-full h-auto block"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 40%, #FFFFFF 75%)",
            }}
          />
        </div>
        <div
          className="absolute bottom-0 pointer-events-none"
          style={{
            top: "55%",
            left: "-80px",
            right: "-80px",
            background: "linear-gradient(to bottom, transparent, #FFFFFF 65%)",
          }}
        />
      </div>

      {/* Press highlight + featured in */}
      <div className="flex flex-col items-center gap-12 px-5 pt-16 md:pt-20 pb-2">
        {/* Fast Company callout */}
        <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 24, color: "#71717A", letterSpacing: "-0.015em", textAlign: "center", lineHeight: 1.45, maxWidth: 620 }}>
          Our technology was named one of<br />
          <span style={{ color: "#0090FF" }}>Fast Company's 11 Next Big Things in AI &amp; Data Innovation</span>
        </p>

        {/* Featured in bar */}
        <div className="flex flex-col items-center gap-4 w-full">
          <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, color: "rgb(113, 113, 122)" }}>
            And it has also been featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {["CNBC", "Bloomberg", "Yahoo Finance", "VentureBeat"].map((pub, i, arr) => (
              <span key={pub} className="flex items-center gap-6">
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 16, color: "rgb(82, 82, 91)", textAlign: "center", lineHeight: 1.5 }}>{pub}</span>
                {i < arr.length - 1 && <span style={{ color: "#D4D4D8", fontSize: 20 }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformHeroSection;
