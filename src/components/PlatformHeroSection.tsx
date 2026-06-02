import imgDashboard from "../assets/dashboard-preview.png";
import { ArrowRight, Play } from "@phosphor-icons/react";

const PlatformHeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden pt-[58px]">
      <div className="relative flex flex-col items-center pt-20 md:pt-[120px] pb-0 px-5 md:px-8 max-w-[1120px] mx-auto w-full">
        <div className="flex flex-col items-center gap-6 w-full hero-fade-1">

          {/* Platform badge */}
          <div
            className="flex items-center gap-2.5"
            style={{
              backgroundColor: "#EFF8FF",
              border: "1px solid rgba(0,144,255,0.2)",
              borderRadius: 9999,
              padding: "5px 6px 5px 6px",
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
              New
            </span>
            <a
              href="/waitlist"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
              style={{ textDecoration: "none" }}
            >
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
                RAG Pipeline &amp; AI Agent Toolkit — join the waitlist
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,112,204,0.12)",
                  flexShrink: 0,
                  marginRight: 2,
                }}
              >
                <ArrowRight size={11} weight="bold" color="#0070CC" />
              </span>
            </a>
          </div>

          {/* Headline */}
          <h1
            className="text-[28px] sm:text-[34px] md:text-[44px]"
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
            Store your data. Query it. Connect it to AI.
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
              maxWidth: 460,
              margin: 0,
            }}
          >
            Verifiable S3 storage at the core. Add queryable knowledge bases and AI agent integrations on top.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-10 hero-fade-2">
          <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
            <span className="btn-primary-inner">Start for free</span>
          </a>
          <a href="https://docs.fil.one" target="_blank" rel="noopener noreferrer" className="btn-secondary">
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
          }}
        >
          <img
            src={imgDashboard}
            alt="Fil One platform — object storage, RAG pipeline, and AI agent toolkit"
            className="w-full h-auto block"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Play size={22} weight="fill" color="#09090B" style={{ marginLeft: 3 }} />
            </div>
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 60%, #FFFFFF 100%)",
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
    </section>
  );
};

export default PlatformHeroSection;
