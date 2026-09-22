import { Check, Minus, X } from "@phosphor-icons/react";
import Icon from "@/components/Icon";
import { useInView } from "@/hooks/useInView";
import { signupUrl } from "@/lib/console-url";
import { PRICE_DISPLAY } from "@/lib/pricing";

/**
 * Tone of a comparison cell. Every cell carries its own visible text, so the
 * tone icon is an at-a-glance summary of that vendor's published term:
 *
 *   good  — nothing extra to pay, nothing extra to manage
 *   mixed — allowed, but with a documented limit or an extra decision
 *   cost  — a documented charge or a documented minimum
 *   plain — a bare figure (the price row), no icon
 */
type Tone = "good" | "mixed" | "cost" | "plain";

const toneLabel: Record<Exclude<Tone, "plain">, string> = {
  good: "Advantage",
  mixed: "Caveat",
  cost: "Extra charge",
};

interface Cell {
  tone: Tone;
  text: string;
}

type ProviderKey = "aws" | "backblaze" | "wasabi" | "r2" | "filone";

interface ComparisonRow {
  feature: string;
  /** Renders the values large, for the headline price row. */
  emphasis?: boolean;
  cells: Record<ProviderKey, Cell>;
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
 * 1 TB = 1,000 GB so the four columns are directly comparable.
 */
const comparisonRows: ComparisonRow[] = [
  {
    feature: "Storage, per TB per month",
    emphasis: true,
    cells: {
      aws: { tone: "plain", text: "$23.00" },
      backblaze: { tone: "plain", text: "$6.95" },
      wasabi: { tone: "plain", text: "$7.99" },
      r2: { tone: "plain", text: "$15.00" },
      filone: { tone: "plain", text: PRICE_DISPLAY },
    },
  },
  {
    feature: "Egress",
    cells: {
      aws: { tone: "cost", text: "$0.09/GB above the first 100 GB a month" },
      backblaze: { tone: "mixed", text: "Free up to 3x the data stored, then $0.01/GB" },
      wasabi: { tone: "mixed", text: "Free while monthly egress stays at or below stored volume" },
      r2: { tone: "good", text: "Free" },
      filone: { tone: "good", text: "Free, at any volume" },
    },
  },
  {
    feature: "Request and API charges",
    cells: {
      aws: { tone: "cost", text: "$0.005 per 1,000 writes, $0.0004 per 1,000 reads" },
      backblaze: { tone: "good", text: "None on class A, B and C calls" },
      wasabi: { tone: "good", text: "None" },
      r2: { tone: "cost", text: "$4.50 per million writes, $0.36 per million reads" },
      filone: { tone: "good", text: "None" },
    },
  },
  {
    feature: "Minimum storage duration",
    cells: {
      aws: { tone: "cost", text: "30 to 180 days on the IA and Glacier classes" },
      backblaze: { tone: "good", text: "None" },
      wasabi: { tone: "cost", text: "90 days. Delete sooner and the remaining days are billed" },
      r2: { tone: "mixed", text: "30 days on Infrequent Access" },
      filone: { tone: "good", text: "None" },
    },
  },
  {
    feature: "Storage classes to pick and manage",
    cells: {
      aws: { tone: "mixed", text: "Eight, moved between with lifecycle rules" },
      backblaze: { tone: "good", text: "One" },
      wasabi: { tone: "good", text: "One" },
      r2: { tone: "mixed", text: "Two: Standard and Infrequent Access" },
      filone: { tone: "good", text: "One. No lifecycle rules to write" },
    },
  },
  {
    feature: "Retrieval fees and restore waits",
    cells: {
      aws: { tone: "cost", text: "$0.01 to $0.03/GB on IA and Glacier, plus a restore wait on archive" },
      backblaze: { tone: "good", text: "None" },
      wasabi: { tone: "good", text: "None" },
      r2: { tone: "cost", text: "$0.01/GB on Infrequent Access" },
      filone: { tone: "good", text: "None" },
    },
  },
];

const toneIcon = { good: Check, mixed: Minus, cost: X } as const;

/**
 * The tone glyph. Green reads as "nothing extra here" and is applied on
 * competitor columns too, so the table stays legible as a record of published
 * terms rather than a scorecard. Fil One's own glyph takes the brand blue.
 */
const ToneMark = ({ tone, isFilOne }: { tone: Exclude<Tone, "plain">; isFilOne: boolean }) => (
  <span
    role="img"
    aria-label={toneLabel[tone]}
    className={
      tone === "good"
        ? isFilOne
          ? "text-brand-500"
          : "text-success-600"
        : "text-zinc-500"
    }
  >
    <Icon icon={toneIcon[tone]} size={14} weight="bold" />
  </span>
);

const CellContent = ({
  cell,
  isFilOne,
  emphasis,
}: {
  cell: Cell;
  isFilOne: boolean;
  emphasis?: boolean;
}) => {
  if (emphasis) {
    return (
      <span
        className={`font-display font-medium tracking-[-0.02em] text-[22px] ${
          isFilOne ? "text-brand-500" : "text-zinc-600"
        }`}
      >
        {cell.text}
      </span>
    );
  }
  return (
    <>
      {cell.tone !== "plain" && <ToneMark tone={cell.tone} isFilOne={isFilOne} />}
      <span
        className={`font-sans text-[12px] leading-[1.45] ${
          isFilOne ? "font-medium text-zinc-950" : "text-zinc-600"
        }`}
      >
        {cell.text}
      </span>
    </>
  );
};

const sources: { label: string; href: string }[] = [
  { label: "AWS", href: "https://aws.amazon.com/s3/pricing/" },
  { label: "Backblaze", href: "https://www.backblaze.com/cloud-storage/pricing" },
  { label: "Wasabi", href: "https://wasabi.com/pricing/faq" },
  { label: "Cloudflare", href: "https://developers.cloudflare.com/r2/pricing/" },
];

const Footnote = () => (
  <p className="font-sans text-[12px] leading-[1.6] text-zinc-500 m-0">
    Competitors' published list prices and published policies, checked 21 September 2026. AWS S3
    Standard and request rates for US East (N. Virginia); Backblaze B2, Wasabi pay as you go and
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

  // Shared border styles for FilOne card column
  const filoneCardStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
    backgroundColor: "#FFFFFF",
    borderLeft: "1px solid rgba(0,0,0,0.06)",
    borderRight: "1px solid rgba(0,0,0,0.06)",
    ...extra,
  });

  const rowBorder: React.CSSProperties = { borderTop: "1px solid rgba(0,0,0,0.06)" };
  const gridColumns = "168px repeat(5, 1fr)";

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
        <span
          aria-hidden="true"
          className="font-mono font-medium text-[11.5px] tracking-[0.08em] text-zinc-500 uppercase"
        >
          Comparison
        </span>
        <h2 className="font-display font-medium text-[26px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-zinc-950 m-0">
          Cloud Storage Comparison
        </h2>
        <p className="font-sans text-[15px] leading-[1.6] text-zinc-500 m-0">
          Storage is the only metered line on a Fil One bill. Here is how that sits next to what the
          other S3-compatible providers publish.
        </p>
      </div>

      {/* Table */}
      <div
        ref={tableRef}
        className={`w-full max-w-[960px] reveal${tableInView ? " in-view" : ""}`}
      >
        {/* ── Desktop table (960px+) ── */}
        <div className="hidden min-[960px]:block">
          <div role="table" aria-label="Cloud storage pricing and terms comparison">
            {/* Column headers */}
            <div role="rowgroup">
              <div role="row" className="grid w-full" style={{ gridTemplateColumns: gridColumns }}>
                <div role="columnheader" className="px-3 py-6" aria-label="Term" />
                {providers.map((provider) => {
                  const isFilOne = provider.key === "filone";
                  return (
                    <div
                      key={provider.key}
                      role="columnheader"
                      className={`px-3 py-6 flex items-center justify-center text-center${isFilOne ? " rounded-t-2xl" : ""}`}
                      style={isFilOne ? filoneCardStyle({ borderTop: "1px solid rgba(0,0,0,0.06)" }) : undefined}
                    >
                      <span
                        className={`font-sans text-[13px] text-zinc-950 ${
                          isFilOne ? "font-semibold text-[14px] tracking-[-0.01em]" : "font-medium"
                        }`}
                      >
                        {provider.name}
                      </span>
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
                  className="grid w-full"
                  style={{ gridTemplateColumns: gridColumns }}
                >
                  <div role="rowheader" className="px-3 py-4 flex items-center" style={rowBorder}>
                    <span className="font-sans font-medium text-[13px] leading-[1.35] text-zinc-950">
                      {row.feature}
                    </span>
                  </div>
                  {providers.map((provider) => {
                    const isFilOne = provider.key === "filone";
                    return (
                      <div
                        key={provider.key}
                        role="cell"
                        className="px-3 py-4 flex flex-col gap-1.5 items-center justify-center text-center"
                        style={isFilOne ? filoneCardStyle(rowBorder) : rowBorder}
                      >
                        <CellContent
                          cell={row.cells[provider.key]}
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
            <div className="grid w-full" style={{ gridTemplateColumns: gridColumns }}>
              <div className="px-3 pt-4" />
              <div className="px-3 pt-4" />
              <div className="px-3 pt-4" />
              <div className="px-3 pt-4" />
              <div className="px-3 pt-4" />
              <div
                className="px-3 py-5 rounded-b-2xl"
                style={filoneCardStyle({
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                })}
              >
                <a href={signupUrl()} className="btn-primary w-full">
                  <span className="btn-primary-inner w-full justify-center">Try for free</span>
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
              className="flex flex-col pt-4"
              style={rowBorder}
            >
              <span aria-hidden="true" className="font-sans font-semibold text-[13px] text-zinc-950 mb-2">
                {row.feature}
              </span>
              {mobileProviders.map((provider) => {
                const isFilOne = provider.key === "filone";
                return (
                  <div
                    key={provider.key}
                    role="row"
                    className={`flex items-start gap-3 py-2 px-3 ${
                      isFilOne ? "rounded-xl bg-white border border-zinc-200 mb-1" : ""
                    }`}
                  >
                    <div role="rowheader" className="w-[84px] shrink-0">
                      <span
                        className={`font-sans text-[11.5px] leading-[1.4] ${
                          isFilOne ? "font-semibold text-zinc-950" : "font-medium text-zinc-600"
                        }`}
                      >
                        {provider.shortName}
                      </span>
                    </div>
                    <div role="cell" className="flex items-start gap-2 min-w-0 flex-1">
                      <CellContent
                        cell={row.cells[provider.key]}
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
              <span className="btn-primary-inner justify-center px-8">Try for free</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
