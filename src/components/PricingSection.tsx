import { Check } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";

const PaygoFeatures = [
  "Pay monthly",
  "No egress fees",
  "No API request fees",
  "Data integrity guarantees",
];

const BusinessFeatures = [
  "Purchase in 1, 3, or 5-year increments",
  "No egress or API request fees",
  "Data integrity guarantees",
  "Capacity assurance and deployment SLAs",
];

const PricingSection = () => {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: cardsRef, inView: cardsInView } = useInView({ threshold: 0.08 });

  return (
    <section
      id="pricing"
      className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#F4F4F5" }}
    >
      {/* Heading */}
      <div ref={headingRef} className={`flex flex-col gap-3 items-center text-center w-full max-w-[560px] reveal${headingInView ? " in-view" : ""}`}>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 11.5,
            letterSpacing: "0.08em",
            color: "#71717A",
            textTransform: "uppercase",
          }}
        >
          Pricing
        </p>
        <h2
          className="text-[26px] md:text-[32px]"
          style={{
            fontFamily: "'Aspekta', sans-serif",
            fontWeight: 500,
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            color: "#09090B",
          }}
        >
          Simple, predictable pricing
        </h2>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="flex flex-col md:flex-row gap-4 items-stretch w-full max-w-[800px] reveal-group">
        {/* Pay-as-you-go */}
        <div
          className={`flex flex-1 flex-col gap-8 items-start p-8 rounded-2xl border reveal${cardsInView ? " in-view" : ""}`}
          style={{
            borderColor: "rgba(0,0,0,0.07)",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex flex-col gap-1 w-full">
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "#09090B",
              }}
            >
              Pay-as-you-go
            </p>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13.5,
                color: "#71717A",
              }}
            >
              For teams getting started
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-end gap-2 flex-wrap">
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 20,
                  lineHeight: "1",
                  color: "#71717A",
                  textDecoration: "line-through",
                }}
              >
                $4.99
              </span>
              <span
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  fontSize: 28,
                  lineHeight: "1",
                  color: "#09090B",
                  letterSpacing: "-0.02em",
                }}
              >
                $0
              </span>
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#71717A",
                  paddingBottom: 4,
                }}
              >
                / TB / month
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13.5,
                lineHeight: "1.55",
                color: "#71717A",
              }}
            >
              Free for the first 30 days. No credit card required.
            </p>
          </div>

          <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

          <div className="flex flex-col gap-3.5 w-full">
            {PaygoFeatures.map((item) => (
              <div key={item} className="flex gap-3 items-center w-full">
                <Check size={15} color="#0090FF" className="shrink-0" />
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "1.4",
                    color: "#52525B",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary mt-auto w-full">
            <span className="btn-primary-inner w-full justify-center">
              Try for free
            </span>
          </a>
        </div>

        {/* Business plan */}
        <div
          className={`flex flex-1 flex-col gap-8 items-start p-8 rounded-2xl border reveal${cardsInView ? " in-view" : ""}`}
          style={{
            borderColor: "rgba(0,0,0,0.07)",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex flex-col gap-1 w-full">
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "#09090B",
              }}
            >
              Business plan
            </p>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13.5,
                color: "#71717A",
              }}
            >
              For enterprises with scale
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <span
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                fontSize: 28,
                lineHeight: "1",
                color: "#09090B",
                letterSpacing: "-0.02em",
              }}
            >
              Custom pricing
            </span>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13.5,
                lineHeight: "1.55",
                color: "#71717A",
              }}
            >
              Ideal for predictable storage needs or compliance-driven requirements.
            </p>
          </div>

          <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

          <div className="flex flex-col gap-3.5 w-full">
            {BusinessFeatures.map((item) => (
              <div key={item} className="flex gap-3 items-center w-full">
                <Check size={15} color="#0090FF" className="shrink-0" />
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "1.4",
                    color: "#52525B",
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          <a href="/contact-sales" className="btn-secondary mt-auto w-full justify-center">
            Contact sales
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
