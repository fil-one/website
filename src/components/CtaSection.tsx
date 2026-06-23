import ctaBg from "../assets/enter-hyperspace-cta-background.png";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";

const CtaSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section
      className="flex flex-col items-center px-5 md:px-8 py-16 md:py-20 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Dark card */}
      <div
        ref={ref}
        className={`flex flex-col gap-8 items-center justify-center text-center w-full max-w-[1120px] px-8 py-20 md:py-32 reveal${inView ? " in-view" : ""}`}
        style={{
          backgroundImage: `url(${ctaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 28,
          minHeight: 320,
        }}
      >
        <div className="flex flex-col gap-4 items-center max-w-[260px] md:max-w-[420px]">
          <h2
            className="text-[26px] md:text-[32px]"
            style={{
              fontFamily: "'Aspekta', sans-serif",
              fontWeight: 500,
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            One network. One record. One less thing to worry about.
          </h2>
          <p
            className="text-[14.5px]"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              lineHeight: "1.6",
              color: "rgba(255,255,255,0.60)",
              maxWidth: 380,
            }}
          >
            Try Fil One for 30 days. 1 TB included, no credit card required. Or talk to our team about enterprise pricing or migrating your existing storage today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center">
          <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark" onClick={() => trackCtaClick("Start at no cost to you", "https://app.fil.one/login?screen_hint=signup", "primary")}>
            <span className="btn-primary-inner">Start at no cost to you</span>
          </a>
          <a href="/contact-sales" className="btn-secondary btn-secondary-dark w-full sm:w-auto justify-center" onClick={() => trackCtaClick("Talk to our team", "/contact-sales", "secondary")}>
            Talk to our team
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
