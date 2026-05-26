import { useState } from "react";
import { Brain, ShieldCheck, ArrowsLeftRight } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";

const USE_CASES = [
  {
    icon: Brain,
    title: "Host your ML training data",
    description:
      "Upload datasets once. Run training jobs from anywhere without waiting on retrieval or paying egress every time your compute cluster reads a batch.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Store and serve user-generated content",
    description:
      "Images, videos, documents your users upload — stored in an S3-compatible bucket. Your presigned URLs, upload handlers, and CDN configs work without changes.",
  },
  {
    icon: ShieldCheck,
    title: "Back up databases with proof of integrity",
    description:
      "Ship your database snapshots to Fil One. Every backup is fingerprinted and verified daily — so you know it's intact before you ever need to restore it.",
  },
];

const StorageUseCasesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: cardsRef, inView: cardsInView } = useInView({ threshold: 0.05 });

  return (
    <section className="w-full px-5 md:px-8 pt-6 md:pt-8 pb-16 md:pb-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="flex flex-col gap-4 w-full max-w-[1120px] mx-auto">

        {/* Clickable cards */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-3 reveal${cardsInView ? " in-view" : ""}`}
        >
          {USE_CASES.map(({ title, description }, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={title}
                onClick={() => setActiveIndex(i)}
                className="text-left w-full flex flex-col justify-start"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  backgroundColor: isActive ? "#EFF8FF" : "#FAFAFA",
                  border: isActive ? "1px solid rgba(0,144,255,0.28)" : "1px solid rgba(0,0,0,0.07)",
                  boxShadow: isActive
                    ? "0 0 0 1px rgba(0,144,255,0.1), 0 2px 16px rgba(0,144,255,0.08)"
                    : "0 1px 3px rgba(0,0,0,0.04)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                    style={{
                      backgroundColor: isActive ? "rgba(0,144,255,0.12)" : "rgba(0,0,0,0.05)",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    {(() => { const Icon = USE_CASES[i].icon; return <Icon size={16} color={isActive ? "#0090FF" : "#A1A1AA"} style={{ transition: "color 0.2s ease" }} />; })()}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 14.5,
                        color: "#09090B",
                        margin: 0,
                        lineHeight: "1.3",
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 13.5,
                        color: "#71717A",
                        margin: 0,
                        lineHeight: "1.55",
                      }}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Preview panel */}
        <div className="w-full">
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
              overflow: "hidden",
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-4"
              style={{
                height: 40,
                backgroundColor: "#F7F7F8",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.14)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.09)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.06)" }} />
              <div
                className="flex items-center"
                style={{
                  marginLeft: 10,
                  backgroundColor: "rgba(0,0,0,0.06)",
                  borderRadius: 5,
                  padding: "3px 10px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: "#A1A1AA",
                  letterSpacing: "0.01em",
                }}
              >
                app.fil.one/storage
              </div>
            </div>

            {/* Crossfading preview content */}
            <div className="relative" style={{ aspectRatio: "16/7", backgroundColor: "#F9FAFB" }}>
              {USE_CASES.map(({ icon: Icon, title }, i) => (
                <div
                  key={title}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  style={{
                    opacity: activeIndex === i ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: activeIndex === i ? "auto" : "none",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-2xl"
                    style={{ width: 56, height: 56, backgroundColor: "#EFF8FF" }}
                  >
                    <Icon size={26} color="#0090FF" />
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-center px-8">
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B", margin: 0 }}>
                      {title}
                    </p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 400, fontSize: 11, color: "#A1A1AA", letterSpacing: "0.04em" }}>
                      Screenshot coming soon
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StorageUseCasesSection;
