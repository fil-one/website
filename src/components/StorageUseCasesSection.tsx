import { useInView } from "@/hooks/useInView";

const USE_CASES = [
  {
    title: "Host your ML training data",
    description:
      "Upload datasets once. Run training jobs from anywhere — no egress fees every time your compute cluster reads a batch.",
  },
  {
    title: "Store and serve user-generated content",
    description:
      "Images, videos, and documents stored in an S3-compatible bucket. Your presigned URLs and CDN configs work without changes.",
  },
  {
    title: "Back up databases with proof of integrity",
    description:
      "Ship snapshots to Fil One. Every backup is verified daily — so you know it's intact before you ever need to restore.",
  },
  {
    title: "Archive at scale, access without penalty",
    description:
      "Long-term storage without cold-tier restrictions. No minimum duration, no retrieval fees — just flat $4.99/TB/month.",
  },
];

const StorageUseCasesSection = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.05 });

  return (
    <section className="w-full px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#F4F4F5" }}>
      <div className="flex flex-col gap-12 w-full max-w-[1120px] mx-auto">

        <div className="flex flex-col gap-3 items-center text-center">
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
            Use cases
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
            Built for any workload
          </h2>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {USE_CASES.map(({ title, description }) => (
            <div
              key={title}
              className={`rounded-2xl p-7 border reveal${sectionInView ? " in-view" : ""}`}
              style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF" }}
            >
              <h3 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 16, color: "#09090B", margin: "0 0 8px" }}>
                {title}
              </h3>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 14, lineHeight: "1.6", color: "#71717A", margin: 0 }}>
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StorageUseCasesSection;
