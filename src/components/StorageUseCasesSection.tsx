import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading } from "@/components/LandingPrimitives";
import { PRICE_PER_TB_MONTH } from "@/lib/pricing";

const USE_CASES = [
  {
    title: "Host your ML training data",
    description:
      "Upload datasets once. Run training jobs from anywhere. No egress fees every time your compute cluster reads a batch.",
  },
  {
    title: "Store and serve user-generated content",
    description:
      "Images, videos, and documents stored in an S3-compatible bucket. Your presigned URLs work without changes.",
  },
  {
    title: "Back up databases without a restore bill",
    description:
      "Ship snapshots to Fil One. Versioning keeps prior copies, and a restore never carries an egress charge, so testing the plan costs nothing.",
  },
  {
    title: "Archive at scale, access without penalty",
    description:
      `Long-term storage without cold-tier restrictions. No minimum duration, no retrieval fees, just flat ${PRICE_PER_TB_MONTH}.`,
  },
];

const [training, ugc, backups, archive] = USE_CASES;

/** Placeholder block reserving space for a future illustration. */
const IllustrationPlaceholder = ({ className = "", dark = false }: { className?: string; dark?: boolean }) => (
  <div
    className={`flex items-center justify-center rounded-xl border border-dashed ${
      dark ? "border-white/25" : "border-black/15"
    } ${className}`}
    style={{ backgroundColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.02)" }}
  >
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.08em] ${dark ? "text-white/50" : "text-zinc-400"}`}
    >
      Illustration
    </span>
  </div>
);

const cardBase =
  "rounded-2xl border border-black/[0.07] bg-white shadow-elevated flex flex-col gap-5 p-7";

const StorageUseCasesSection = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.05 });

  return (
    <section className="w-full px-5 md:px-8 py-24 md:py-32 bg-white">
      <div className="flex flex-col gap-12 w-full max-w-container mx-auto">

        <div className="flex flex-col gap-3 items-center text-center">
          <SectionLabel>Use cases</SectionLabel>
          <SectionHeading>Built for any workload</SectionHeading>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-group"
        >
          {/* Wide top-left tile: ML training data, with an illustration placeholder */}
          <div className={`${cardBase} md:col-span-2 reveal${sectionInView ? " in-view" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2 max-w-[360px]">
                <h3 className="font-sans font-medium text-[16px] leading-[1.3] text-zinc-950 m-0">
                  {training.title}
                </h3>
                <p className="font-sans font-normal text-[14px] leading-[1.6] text-zinc-500 m-0 text-pretty">
                  {training.description}
                </p>
              </div>
              <IllustrationPlaceholder className="hidden sm:flex h-28 w-full max-w-[220px] shrink-0" />
            </div>
            <IllustrationPlaceholder className="flex h-28 w-full sm:hidden" />
          </div>

          {/* Tall top-right tile: solid brand block, with an illustration placeholder */}
          <div
            className={`rounded-2xl p-7 flex flex-col justify-end gap-4 md:row-span-2 min-h-[220px] reveal${sectionInView ? " in-view" : ""}`}
            style={{
              background:
                "radial-gradient(120% 140% at 25% -10%, #1E8AE0 0%, #0070CC 55%, #0055CC 100%)",
            }}
          >
            <IllustrationPlaceholder dark className="flex-1 min-h-[100px]" />
            <h3 className="font-sans font-medium text-[16px] leading-[1.3] text-white m-0">
              {ugc.title}
            </h3>
            <p className="font-sans font-normal text-[14px] leading-[1.6] m-0 text-pretty" style={{ color: "rgba(255,255,255,0.82)" }}>
              {ugc.description}
            </p>
          </div>

          {/* Bottom-left: backups, with an illustration placeholder */}
          <div className={`${cardBase} reveal${sectionInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-medium text-[16px] leading-[1.3] text-zinc-950 m-0">
                {backups.title}
              </h3>
              <p className="font-sans font-normal text-[14px] leading-[1.6] text-zinc-500 m-0 text-pretty">
                {backups.description}
              </p>
            </div>
            <IllustrationPlaceholder className="h-24 w-full" />
          </div>

          {/* Bottom-right: archive, with an illustration placeholder */}
          <div className={`${cardBase} reveal${sectionInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-medium text-[16px] leading-[1.3] text-zinc-950 m-0">
                {archive.title}
              </h3>
              <p className="font-sans font-normal text-[14px] leading-[1.6] text-zinc-500 m-0 text-pretty">
                {archive.description}
              </p>
            </div>
            <IllustrationPlaceholder className="h-24 w-full mt-auto" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default StorageUseCasesSection;
