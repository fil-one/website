import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";

/**
 * Shared shell + prose primitives for the legal/policy pages (Terms, Privacy,
 * AUP, SLA). These pages are almost entirely prose and previously duplicated
 * the same page scaffold and inline `pStyle`/`liStyle`/`h2Style` objects
 * four times over. The primitives fold that into design-token utilities:
 * body copy is zinc-600, headings zinc-950, meta zinc-500 — mirroring the
 * neutral scale documented in tailwind.config.
 */

export const LegalPage = ({
  title,
  meta,
  children,
}: {
  title: React.ReactNode;
  /** Effective / last-updated line under the title. */
  meta: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="min-h-screen overflow-x-hidden bg-white">
    <PlatformNavbar />

    <main id="main-content" className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
      <div className="flex flex-col gap-10 w-full max-w-[720px]">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="m-0 font-display font-medium text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] text-zinc-950">
            {title}
          </h1>
          <p className="m-0 font-sans text-[13.5px] text-zinc-500">{meta}</p>
        </div>

        <div className="w-full h-px bg-black/[0.07]" />

        {children}
      </div>
    </main>

    <Footer />
  </div>
);

/** An h2 section: heading plus its prose, in the standard vertical rhythm. */
export const LegalSection = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-3">
    <h2 className="m-0 font-sans font-semibold text-[15px] tracking-[-0.01em] text-zinc-950">{title}</h2>
    {children}
  </section>
);

/**
 * Body paragraph. Inline `<strong>` renders zinc-950/semibold and `<a>`
 * renders underlined zinc-950, matching the legal pages' emphasis + link
 * treatment without per-element styling.
 */
export const LegalP = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p
    className={`m-0 font-sans text-[14.5px] leading-[1.7] text-zinc-600 [&_strong]:font-semibold [&_strong]:text-zinc-950 [&_a]:text-zinc-950 [&_a]:underline${className ? ` ${className}` : ""}`}
  >
    {children}
  </p>
);

/**
 * Bulleted or numbered list. Items are plain `<li>` children — item styling
 * (size, color, and inline strong/link emphasis) is applied from the list via
 * descendant selectors so callers don't repeat a style object per row.
 */
export const LegalList = ({
  ordered = false,
  children,
  className = "",
}: {
  ordered?: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`flex flex-col gap-2 pl-5 ${ordered ? "list-decimal" : "list-disc"} font-sans text-[14.5px] leading-[1.7] text-zinc-600 [&_strong]:font-semibold [&_strong]:text-zinc-950 [&_a]:text-zinc-950 [&_a]:underline${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
};

/**
 * A plain prose table: bordered, zinc-100 header, zebra body rows. Cells accept
 * ReactNode so callers can drop in emphasis or badges. This is intentionally
 * lighter than the site's data-grid `Table` component — it matches the reading
 * rhythm of the surrounding legal copy rather than a dashboard.
 */
export const LegalTable = ({
  headers,
  rows,
}: {
  headers: React.ReactNode[];
  /** Row keys keep React happy without relying on cell content. */
  rows: { key: string; cells: React.ReactNode[] }[];
}) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full border-collapse border border-black/[0.07] rounded-lg overflow-hidden">
      <thead>
        <tr>
          {headers.map(header => (
            <th
              key={typeof header === "string" ? header : undefined}
              className="text-left px-4 py-3 border-b border-black/[0.07] bg-zinc-100 font-sans font-semibold text-[13.5px] text-zinc-950"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.key} className={i % 2 === 1 ? "bg-zinc-50" : undefined}>
            {row.cells.map((cell, c) => (
              <td
                key={`${row.key}-${c}`}
                className="align-top px-4 py-3 border-b border-black/[0.07] font-sans text-[14px] text-zinc-600"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
