import Pill from "@/components/Pill";

export interface ProblemCard {
  /** Pill label naming the thing that fails, e.g. "Archive tiers". */
  label: string;
  /**
   * @deprecated Ignored. Every problem card uses the same neutral tag so the
   * row reads as one set rather than an amber/red/blue alternation.
   */
  tone?: "brand" | "warning" | "danger";
  /** The one-line consequence, set larger than the body. */
  catch: string;
  /** The paragraph explaining how the trap works. */
  body: string;
}

interface ProblemCardsProps {
  items: ProblemCard[];
  /** Reveal class applied to each card by the calling section. */
  cardClassName?: string;
}

/**
 * The "here is the trap" card row: a neutral pill naming the approach, the
 * consequence in one line, then the explanation. Sits under a centred section
 * heading on the pages that open by disqualifying the alternatives.
 *
 * Distinct from {@link FeatureCard} (icon + title + description, describing
 * something we do) — these describe something that goes wrong elsewhere.
 */
const ProblemCards = ({ items, cardClassName = "" }: ProblemCardsProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
    {items.map(({ label, catch: catchLine, body }) => (
      <div
        key={label}
        className={`flex flex-col rounded-2xl overflow-hidden border border-black/[0.07] bg-white shadow-elevated${
          cardClassName ? ` ${cardClassName}` : ""
        }`}
      >
        <div className="flex flex-1 flex-col gap-2.5 p-7">
          <Pill tone="neutral" className="self-start mb-0.5">
            {label}
          </Pill>
          <p className="m-0 font-sans font-semibold text-h4 leading-[1.3] tracking-[-0.01em] text-zinc-950 text-balance">
            {catchLine}
          </p>
          <p className="m-0 mt-1 font-sans text-body-sm leading-[1.65] text-zinc-500">{body}</p>
        </div>
      </div>
    ))}
  </div>
);

export default ProblemCards;
