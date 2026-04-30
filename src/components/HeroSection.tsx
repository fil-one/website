import { useRef } from "react";
import imgDashboard from "../assets/dashboard-preview.png";
import { ArrowRight } from "@phosphor-icons/react";
import HeroLens from "./HeroLens";

const HeroSection = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  return (
    <section
      className="relative w-full overflow-hidden pt-[58px]"
    >
      {/* Hero content */}
      <div className="relative flex flex-col items-center pt-20 md:pt-[120px] pb-0 px-5 md:px-8 max-w-[1120px] mx-auto w-full">

        <div className="flex flex-col items-center gap-6 w-full hero-fade-1">

          {/* Announcement badge */}
          <a
            href="https://docs.fil.one"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "#EFF8FF",
              border: "1px solid rgba(0,144,255,0.2)",
              borderRadius: 9999,
              padding: "4px 4px 4px 10px",
              textDecoration: "none",
            }}
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
              Explore documentation
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 21,
                height: 21,
                borderRadius: "50%",
                backgroundColor: "rgba(0,112,204,0.12)",
                flexShrink: 0,
              }}
            >
              <ArrowRight size={11} weight="bold" color="#0070CC" />
            </span>
          </a>

          {/* Headline */}
          <h1
            ref={h1Ref}
            className="text-[28px] sm:text-[34px] md:text-[44px]"
            style={{
              fontFamily: "'Aspekta', sans-serif",
              fontWeight: 500,
              lineHeight: "1.12",
              letterSpacing: "-0.02em",
              color: "#09090B",
              textAlign: "center",
              maxWidth: 460,
              margin: 0,
              position: "relative",
            }}
          >
            S3 object storage built for the AI era
            <HeroLens h1Ref={h1Ref} />
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
              maxWidth: 420,
              margin: 0,
            }}
          >
            Your data, your keys, your control — for when every byte matters.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-10 hero-fade-2">
          <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
            <span className="btn-primary-inner">Try 30 days for free</span>
          </a>
          <a href="/contact-sales" className="btn-secondary">
            Talk to an expert
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
          No credit card required · No egress fees · Connects in minutes
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
            alt="Fil One dashboard — bucket management, storage metrics, API keys, and usage trends"
            className="w-full h-auto block"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 60%, #FFFFFF 100%)",
            }}
          />
        </div>
        {/* Overlay to fade shadow into background — extends beyond container to cover side glow */}
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

export default HeroSection;
