import { ShieldCheck, Plug, Database, ArrowsLeftRight, TrendUp, Sliders } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";

const USE_CASES = [
  {
    icon: ShieldCheck,
    title: "Immutable by design",
    description:
      "Apply Object Lock and retention controls to make data impossible to delete, overwrite, or tamper with — not by ransomware, not by accident, not by anyone.",
  },
  {
    icon: Plug,
    title: "Compatibility with everything you already use",
    description:
      "Switching storage? Keep the rest of your stack intact. S3 API compatibility with Fil One means your existing tools, SDKs, and workflows easily connect.",
  },
  {
    icon: Database,
    title: "11 nines by design",
    description:
      "Distributed, redundant storage designed to deliver 11 nines of durability, backed by 24/7, audit-ready visibility into storage integrity.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Portability from day one",
    description:
      "S3 migration-friendly and multi-cloud by design. Ensuring your data is safely stored across an independent network of providers.",
  },
  {
    icon: TrendUp,
    title: "Scale without surprises",
    description:
      "$4.99/TB/month, no egress fees, no API request charges. Consistent performance to keep your data fast and reliable as it grows.",
  },
  {
    icon: Sliders,
    title: "Your data, under your control",
    description:
      "Decide where your data lives and how it’s managed, without being locked in to a single provider. Meet residency requirements. Adapt as needs change.",
  },
];

const UseCasesSection = ({ heading = "Enterprise storage made simple" }: { heading?: string }) => {
  const { ref: cardsRef, inView: cardsInView } = useInView({ threshold: 0.06 });

  return (
    <section
      id="features"
      className="w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
      {/* Heading block */}
      <div className="flex flex-col gap-3 items-center text-center max-w-[560px]">
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 11.5,
            letterSpacing: "0.08em",
            color: "#52525B",
            textTransform: "uppercase",
          }}
        >
          Features
        </span>
        <h2
          style={{
            fontFamily: "'Aspekta', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(24px, 4vw, 32px)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "#09090B",
            margin: 0,
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.6,
            color: "#52525B",
          }}
        >
          S3-compatible storage that's easy to set up and easier to scale — built for reliability, portability, and verifiable data integrity, without the egress bill.
        </p>
      </div>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group"
      >
        {USE_CASES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className={`flex flex-col gap-5 p-8 rounded-2xl border reveal${cardsInView ? " in-view" : ""}`}
            style={{
              borderColor: "rgba(0,0,0,0.07)",
              backgroundColor: "#FFFFFF",
              boxShadow:
                "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
              style={{ backgroundColor: "#EFF8FF" }}
            >
              <Icon size={18} color="#0090FF" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: "1.3",
                  color: "#09090B",
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "1.6",
                  color: "#71717A",
                }}
              >
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
