import { useInView } from "@/hooks/useInView";
import { signupUrl } from "@/lib/console-url";
import { COMPETITORS, PRICE_DISPLAY, type Competitor } from "@/lib/pricing";
import filOneLogo from "@/assets/fil-one-logo.svg";
import { SectionLabel, SectionHeading } from "@/components/LandingPrimitives";

type ProviderKey = "aws" | "backblaze" | "wasabi" | "r2" | "filone";

interface ComparisonRow {
  feature: string;
  /** Renders the values large, for the headline price row. */
  emphasis?: boolean;
  cells: Record<ProviderKey, string>;
}

/** Desktop column order: competitors left to right, Fil One in the card at the right. */
const providers: { key: ProviderKey; name: string; shortName: string }[] = [
  { key: "aws", name: "AWS S3", shortName: "AWS S3" },
  { key: "backblaze", name: "Backblaze B2", shortName: "Backblaze B2" },
  { key: "wasabi", name: "Wasabi", shortName: "Wasabi" },
  { key: "r2", name: "Cloudflare R2", shortName: "Cloudflare R2" },
  { key: "filone", name: "Fil One", shortName: "Fil One" },
];

/** Mobile stacks one line per provider, led by Fil One as the subject of the comparison. */
const mobileProviders = [
  ...providers.filter((provider) => provider.key === "filone"),
  ...providers.filter((provider) => provider.key !== "filone"),
];

/**
 * Every competitor figure below is that vendor's own published list price or
 * published policy, checked on the date in the footnote. Per-TB figures use
 * 1 TB = 1,000 GB so the four columns are directly comparable. Storage and
 * egress rates are read from COMPETITORS so they always match the calculator.
 */
const rate = (name: string): Competitor => COMPETITORS.find((c) => c.name === name)!;
const AWS = rate("AWS S3");
const B2 = rate("Backblaze B2");
const perTB = (c: Competitor) => `$${c.storagePricePerTB.toFixed(2)}`;
const perGB = (usdPerTB: number) => `$${(usdPerTB / 1000).toFixed(2)}/GB`;

const comparisonRows: ComparisonRow[] = [
  {
    feature: "Storage, per TB per month",
    emphasis: true,
    cells: {
      aws: perTB(AWS),
      backblaze: perTB(B2),
      wasabi: perTB(rate("Wasabi")),
      r2: perTB(rate("Cloudflare R2")),
      filone: PRICE_DISPLAY,
    },
  },
  {
    feature: "Egress",
    cells: {
      aws: `${perGB(AWS.egressPricePerTB)} above the first ${(AWS.freeEgressTB ?? 0) * 1000} GB a month`,
      backblaze: `Free up to ${B2.freeEgressMultiplier}× the data stored, then ${perGB(B2.egressPricePerTB)}`,
      wasabi: "Free while monthly egress stays at or below stored volume",
      r2: "Free",
      filone: "Free, at any volume",
    },
  },
  {
    feature: "Request and API charges",
    cells: {
      aws: "$0.005 per 1,000 writes, $0.0004 per 1,000 reads",
      backblaze: "None on class A, B and C calls",
      wasabi: "None",
      r2: "$4.50 per million writes, $0.36 per million reads",
      filone: "None",
    },
  },
  {
    feature: "Minimum storage duration",
    cells: {
      aws: "30 to 180 days on the IA and Glacier classes",
      backblaze: "None",
      wasabi: "90 days. Delete sooner and the remaining days are billed",
      r2: "30 days on Infrequent Access",
      filone: "None",
    },
  },
  {
    feature: "Storage classes to pick and manage",
    cells: {
      aws: "Eight, moved between with lifecycle rules",
      backblaze: "One",
      wasabi: "One",
      r2: "Two: Standard and Infrequent Access",
      filone: "One. No lifecycle rules to write",
    },
  },
  {
    feature: "Retrieval fees and restore waits",
    cells: {
      aws: "$0.01 to $0.03/GB on IA and Glacier, plus a restore wait on archive",
      backblaze: "None",
      wasabi: "None",
      r2: "$0.01/GB on Infrequent Access",
      filone: "None",
    },
  },
];

/**
 * A cell is its own evidence: the vendor's published figure or policy, in
 * words. Fil One's column is set in near-black on its white card, the
 * competitors in grey, so the eye lands on our terms without a glyph
 * grading anyone.
 */
const CellContent = ({
  text,
  isFilOne,
  emphasis,
}: {
  text: string;
  isFilOne: boolean;
  emphasis?: boolean;
}) =>
  emphasis ? (
    <span
      className={`font-display tracking-[-0.02em] ${
        isFilOne ? "text-body-lg font-semibold text-brand-600" : "text-small font-medium text-zinc-600"
      }`}
    >
      {text}
    </span>
  ) : (
    <span
      className={`font-sans leading-[1.45] ${
        isFilOne ? "text-small font-medium text-zinc-950" : "text-small text-zinc-600"
      }`}
    >
      {text}
    </span>
  );

const sources: { label: string; href: string }[] = [
  { label: "AWS", href: "https://aws.amazon.com/s3/pricing/" },
  { label: "Backblaze", href: "https://www.backblaze.com/cloud-storage/pricing" },
  { label: "Wasabi", href: "https://wasabi.com/pricing/faq" },
  { label: "Cloudflare", href: "https://developers.cloudflare.com/r2/pricing/" },
];

const Footnote = () => (
  <p className="font-sans text-small leading-[1.6] text-zinc-500 m-0">
    Competitors' published list prices and published policies, checked 23 September 2026. AWS S3
    Standard and request rates for Europe (Ireland, eu-west-1); Backblaze B2, Wasabi pay as you go and
    Cloudflare R2 Standard at list. Per-TB figures use 1 TB = 1,000 GB. Vendors change their terms,
    so check before you commit:{" "}
    {sources.map((source, i) => (
      <span key={source.href}>
        <a
          href={source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 underline underline-offset-2 hover:text-brand-600"
        >
          {source.label}
        </a>
        {i < sources.length - 1 ? ", " : "."}
      </span>
    ))}
  </p>
);

const ComparisonSection = ({ bordered = false }: { bordered?: boolean }) => {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: tableRef, inView: tableInView } = useInView({ threshold: 0.04 });

  // Shared border classes: the Fil One column is a white card with side rules;
  // every body row has a hairline top rule.
  const FILONE_CARD = "bg-white border-x border-black/[0.06]";
  const ROW_BORDER = "border-t border-black/[0.06]";
  const GRID_COLUMNS = "grid-cols-[200px_repeat(5,minmax(0,1fr))]";

  return (
    <section
      id="compare"
      className={`flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50${bordered ? " border-y border-zinc-100" : ""}`}
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className={`flex flex-col gap-3 items-center text-center w-full max-w-[600px] reveal${headingInView ? " in-view" : ""}`}
      >
        <SectionLabel>Comparison</SectionLabel>
        <SectionHeading>Cloud storage comparison</SectionHeading>
      </div>

      {/* Table */}
      <div
        ref={tableRef}
        className={`w-full max-w-container reveal${tableInView ? " in-view" : ""}`}
      >
        {/* ── Desktop table (960px+) ── */}
        <div className="hidden min-[960px]:block">
          <div role="table" aria-label="Cloud storage pricing and terms comparison">
            {/* Column headers */}
            <div role="rowgroup">
              <div role="row" className={`grid w-full ${GRID_COLUMNS}`}>
                <div role="columnheader" className="px-4 py-7" aria-label="Term" />
                {providers.map((provider) => {
                  const isFilOne = provider.key === "filone";
                  const isDivided = !isFilOne;
                  return (
                    <div
                      key={provider.key}
                      role="columnheader"
                      className={`px-6 py-7 flex items-center${
                        isFilOne ? ` justify-center text-center rounded-t-2xl ${FILONE_CARD} ${ROW_BORDER}` : ` justify-start text-left${isDivided ? " border-l border-black/[0.05]" : ""}`
                      }`}
                    >
                      {isFilOne ? (
                        <img src={filOneLogo} alt="Fil One" className="h-4 w-auto" />
                      ) : (
                        <span className="font-sans text-small font-medium text-zinc-950">
                          {provider.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div role="rowgroup">
              {comparisonRows.map((row) => (
                <div
                  key={row.feature}
                  role="row"
                  className={`grid w-full ${GRID_COLUMNS}`}
                >
                  <div role="rowheader" className={`px-4 py-5 flex items-center ${ROW_BORDER}`}>
                    <span className="font-sans font-medium text-small leading-[1.35] text-zinc-950">
                      {row.feature}
                    </span>
                  </div>
                  {providers.map((provider) => {
                    const isFilOne = provider.key === "filone";
                    const isDivided = !isFilOne;
                    return (
                      <div
                        key={provider.key}
                        role="cell"
                        className={`px-6 py-5 flex flex-col gap-1.5 justify-center ${ROW_BORDER}${
                          isFilOne ? ` items-center text-center ${FILONE_CARD}` : ` items-start text-left${isDivided ? " border-l border-black/[0.05]" : ""}`
                        }`}
                      >
                        <CellContent
                          text={row.cells[provider.key]}
                          isFilOne={isFilOne}
                          emphasis={row.emphasis}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className={`grid w-full ${GRID_COLUMNS}`}>
              <div className="px-3 pt-4" />
              <div className="px-3 pt-4" />
              <div className="px-3 pt-4" />
              <div className="px-3 pt-4" />
              <div className="px-3 pt-4" />
              <div
                className={`px-3 py-5 rounded-b-2xl border-b ${FILONE_CARD} ${ROW_BORDER}`}
              >
                <a href={signupUrl()} className="btn-primary w-full">
                  <span className="btn-primary-inner w-full justify-center">Start for free</span>
                </a>
              </div>
            </div>

            {/* Footnote */}
            <div className="mt-6 px-3">
              <Footnote />
            </div>
          </div>
        </div>

        {/* ── Mobile layout (< 960px) ── */}
        {/* Values are sentences, not glyphs, so each term stacks into its own
            block with one line per provider instead of a five-column grid. */}
        <div
          role="table"
          aria-label="Cloud storage pricing and terms comparison"
          className="min-[960px]:hidden flex flex-col gap-5"
        >
          {comparisonRows.map((row) => (
            <div
              key={row.feature}
              role="rowgroup"
              aria-label={row.feature}
              className={`flex flex-col pt-4 ${ROW_BORDER}`}
            >
              <span aria-hidden="true" className="font-sans font-semibold text-small text-zinc-950 mb-2">
                {row.feature}
              </span>
              {mobileProviders.map((provider) => {
                const isFilOne = provider.key === "filone";
                return (
                  <div
                    key={provider.key}
                    role="row"
                    className={`flex items-center gap-3 py-2 px-3 ${
                      isFilOne ? "rounded-xl bg-white border border-zinc-200 mb-1" : ""
                    }`}
                  >
                    <div role="rowheader" className="w-[84px] shrink-0">
                      <span
                        className={`font-sans text-eyebrow leading-[1.4] ${
                          isFilOne ? "font-semibold text-zinc-950" : "font-medium text-zinc-600"
                        }`}
                      >
                        {provider.shortName}
                      </span>
                    </div>
                    <div role="cell" className="flex items-start gap-2 min-w-0 flex-1">
                      <CellContent
                        text={row.cells[provider.key]}
                        isFilOne={isFilOne}
                        emphasis={row.emphasis}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footnote + CTA (mobile) */}
        <div className="min-[960px]:hidden mt-6 flex flex-col gap-5">
          <Footnote />
          <div className="flex justify-center">
            <a href={signupUrl()} className="btn-primary">
              <span className="btn-primary-inner justify-center px-8">Start for free</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
