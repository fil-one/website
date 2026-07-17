import { ShieldCheck, Plug, Database, ArrowsLeftRight, TrendUp, Sliders } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import IconTile from "@/components/IconTile";
import { PRICE_PER_TB_MONTH } from "@/lib/pricing";

const USE_CASES = [
  {
    icon: ShieldCheck,
    title: "Immutable by design",
    description:
      "Object Lock and retention make data impossible to delete or tamper with.",
  },
  {
    icon: Plug,
    title: "S3-compatible from day one",
    description:
      "Full S3 API compatibility, so your existing tools, SDKs, and workflows just connect.",
  },
  {
    icon: Database,
    title: "Eleven nines of durability",
    description:
      "Distributed, redundant storage with 11 nines of durability and audit-ready integrity.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Portability from day one",
    description:
      "Multi-cloud by design, with data spread across an independent provider network.",
  },
  {
    icon: TrendUp,
    title: "Scale without surprises",
    description:
      `${PRICE_PER_TB_MONTH}, no egress or API charges, and consistent performance as you grow.`,
  },
  {
    icon: Sliders,
    title: "Your data, under your control",
    description:
      "Decide where your data lives and how it’s managed, with no single-provider lock-in.",
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
          S3-compatible storage that's easy to set up and easier to scale, built for reliability, portability, and verifiable data integrity, without the egress bill.
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
            className={`flex flex-col gap-5 p-8 rounded-2xl border border-black/[0.07] bg-white shadow-elevated reveal${cardsInView ? " in-view" : ""}`}
          >
            <IconTile icon={Icon} size={26} className="h-14 w-14" />

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-medium text-[18px] leading-[1.3] text-zinc-950 m-0">{title}</h3>
              <p className="font-sans font-normal text-[14px] leading-[1.6] text-zinc-500 m-0">{description}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
