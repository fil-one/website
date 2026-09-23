import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading } from "@/components/LandingPrimitives";
import { PRICE_PER_TB_MONTH } from "@/lib/pricing";
import mlTrainingArt from "@/assets/illustrations/use-case-ml-training.svg";
import userContentArt from "@/assets/illustrations/use-case-user-content.svg";
import databaseBackupArt from "@/assets/illustrations/use-case-database-backup.svg";
import archiveArt from "@/assets/illustrations/use-case-archive.svg";

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
      "Versioning keeps prior copies, and restores carry no egress fees. Run recovery drills as often as you like.",
  },
  {
    title: "Archive at scale, access without penalty",
    description:
      `Long-term storage without cold-tier restrictions. No minimum duration, no retrieval fees, just flat ${PRICE_PER_TB_MONTH}.`,
  },
];

const [training, ugc, backups, archive] = USE_CASES;

const PANEL_TONES = {
  // Lit from the top edge by the radial glow over a light grey base
  light: "border-black/[0.05] bg-[#F6F6F7] bg-illustration-panel",
  blue: "border-white/[0.16] bg-white/[0.07]",
};

/**
 * Illustration framed in a rounded panel. The art is decorative: the card's
 * heading and copy carry the meaning.
 */
const Illustration = ({
  src,
  tone = "light",
  className = "",
}: {
  src: string;
  tone?: keyof typeof PANEL_TONES;
  className?: string;
}) => (
  // The art is absolutely positioned so it never sizes the panel: the panel's
  // shape comes from its aspect ratio or, when stretched, from its neighbours.
  <div className={`relative overflow-hidden rounded-2xl border ${PANEL_TONES[tone]} ${className}`}>
    <img src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 block h-full w-full select-none" />
  </div>
);

const cardBase =
  "rounded-3xl border border-black/[0.07] bg-white shadow-elevated flex flex-col gap-6 p-6 sm:p-8";

const titleClass = "m-0 text-balance font-sans text-[20px] font-medium leading-[1.3] tracking-[-0.01em]";
const bodyClass = "m-0 font-sans text-[15.5px] font-normal leading-[1.6] text-pretty";

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-group"
        >
          {/* Wide top-left tile: ML training data */}
          <div className={`${cardBase} md:col-span-2 reveal${sectionInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:justify-between">
              <div className="flex max-w-[360px] flex-col gap-2">
                <h3 className={`${titleClass} text-zinc-950`}>{training.title}</h3>
                <p className={`${bodyClass} text-zinc-500`}>{training.description}</p>
              </div>
              {/* Side by side, the panel stretches to the text's height so the text sets the card height; stacked, it keeps its 2:1 shape. From lg up it matches a one-column card's inner width: this card spans two columns plus the 24px gap, so that is 50% of ours minus 44px */}
              <Illustration src={mlTrainingArt} className="aspect-[2/1] w-full sm:aspect-auto sm:max-w-[280px] sm:shrink-0 lg:w-[calc(50%-44px)] lg:max-w-none" />
            </div>
          </div>

          {/* Tall top-right tile: solid brand block */}
          <div
            className={`flex min-h-[220px] flex-col justify-end gap-6 rounded-3xl bg-use-case-card-blue p-6 sm:p-8 md:col-span-2 lg:col-span-1 lg:row-span-2 reveal${sectionInView ? " in-view" : ""}`}
          >
            <Illustration src={userContentArt} tone="blue" className="aspect-[300/310] md:aspect-[3/1] lg:aspect-auto lg:min-h-[160px] lg:flex-1" />
            <div className="flex flex-col gap-2">
              <h3 className={`${titleClass} text-white`}>{ugc.title}</h3>
              {/* Full white, not the spec's 90%: at 90% the top of this line dips under 4.5:1 on the lighter part of the gradient */}
              <p className={`${bodyClass} text-white`}>{ugc.description}</p>
            </div>
          </div>

          {/* Bottom-left: backups */}
          <div className={`${cardBase} reveal${sectionInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-2">
              <h3 className={`${titleClass} text-zinc-950`}>{backups.title}</h3>
              <p className={`${bodyClass} text-zinc-500`}>{backups.description}</p>
            </div>
            <Illustration src={databaseBackupArt} className="aspect-[3/1] w-full grow" />
          </div>

          {/* Bottom-right: archive */}
          <div className={`${cardBase} reveal${sectionInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-2">
              <h3 className={`${titleClass} text-zinc-950`}>{archive.title}</h3>
              <p className={`${bodyClass} text-zinc-500`}>{archive.description}</p>
            </div>
            <Illustration src={archiveArt} className="aspect-[3/1] w-full grow" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default StorageUseCasesSection;
