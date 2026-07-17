import { Check, Minus, X } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";

type CellValue = "check" | "x" | "warn";

const comparisonRows: {
  feature: string;
  filone: CellValue;
  aws: CellValue;
  backblaze: CellValue;
  wasabi: CellValue;
}[] = [
  { feature: "S3-compatible API",               filone: "check", aws: "check", backblaze: "check", wasabi: "check" },
  { feature: "Works with existing SDKs & tools", filone: "check", aws: "check", backblaze: "check", wasabi: "check" },
  { feature: "Standard buckets & object storage", filone: "check", aws: "check", backblaze: "check", wasabi: "check" },
  { feature: "Drop-in for existing S3 workflows", filone: "check", aws: "check", backblaze: "check", wasabi: "check" },
  { feature: "API key authentication",            filone: "check", aws: "check", backblaze: "check", wasabi: "check" },
  { feature: "Data integrity verification",       filone: "check", aws: "check",  backblaze: "warn",  wasabi: "warn"  },
  { feature: "No single-provider dependency",     filone: "check", aws: "x",     backblaze: "check",     wasabi: "check"     },
  { feature: "Optimized for large datasets",      filone: "check", aws: "check",  backblaze: "check",  wasabi: "warn"  },
  { feature: "Cost-efficient long-term storage",  filone: "check", aws: "x",  backblaze: "check", wasabi: "check" },
];


const renderCell = (value: CellValue, isFilOne = false) => {
  if (value === "check") {
    return <span role="img" aria-label="Yes"><Check size={16} weight="bold" color={isFilOne ? "#0090FF" : "#A1A1AA"} aria-hidden="true" /></span>;
  }
  if (value === "x") {
    return <span role="img" aria-label="No"><X size={15} weight="bold" color="#A1A1AA" aria-hidden="true" /></span>;
  }
  // warn
  return <span role="img" aria-label="Partial"><Minus size={15} weight="bold" color="#A1A1AA" aria-hidden="true" /></span>;
};

const colHeader = (label: string) => (
  <span
    style={{
      fontFamily: "'Funnel Sans', sans-serif",
      fontWeight: 500,
      fontSize: 13,
      color: "#09090B",
    }}
  >
    {label}
  </span>
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
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 11.5,
            letterSpacing: "0.08em",
            color: "#71717A",
            textTransform: "uppercase",
          }}
        >
          Comparison
        </span>
        <h2
          className="text-[26px] md:text-[32px]"
          style={{
            fontFamily: "'Aspekta', sans-serif",
            fontWeight: 500,
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            color: "#09090B",
          }}
        >
          Cloud Storage Comparison
        </h2>
      </div>

      {/* Table */}
      <div
        ref={tableRef}
        className={`w-full max-w-[960px] reveal${tableInView ? " in-view" : ""}`}
      >
        {/* ── Desktop table (960px+) ── */}
        <div className="hidden min-[960px]:block overflow-x-auto">
          <div style={{ minWidth: 620 }} role="table" aria-label="Cloud storage feature comparison">
            {/* Column headers */}
            <div role="rowgroup">
              <div role="row" className="grid w-full" style={{ gridTemplateColumns: "200px 1fr 1fr 1fr 1fr" }}>
                <div role="columnheader" className="px-4 py-6" aria-label="Feature" />
                <div role="columnheader" className="px-5 py-6 flex items-center justify-center">{colHeader("AWS (S3)")}</div>
                <div role="columnheader" className="px-5 py-6 flex items-center justify-center">{colHeader("Backblaze B2")}</div>
                <div role="columnheader" className="px-5 py-6 flex items-center justify-center">{colHeader("Wasabi")}</div>
                <div
                  role="columnheader"
                  className="px-5 py-6 rounded-t-2xl flex items-center justify-center"
                  style={filoneCardStyle({ borderTop: "1px solid rgba(0,0,0,0.06)" })}
                >
                  <span
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#09090B",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Fil One
                  </span>
                </div>
              </div>
            </div>

            <div role="rowgroup">
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                role="row"
                className="grid w-full"
                style={{ gridTemplateColumns: "200px 1fr 1fr 1fr 1fr" }}
              >
                <div
                  role="rowheader"
                  className="px-4 py-4 flex items-center"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <span
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                      color: "#09090B",
                    }}
                  >
                    {row.feature}
                  </span>
                </div>
                <div
                  role="cell"
                  className="px-5 py-4 flex items-center justify-center"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                >
                  {renderCell(row.aws)}
                </div>
                <div
                  role="cell"
                  className="px-5 py-4 flex items-center justify-center"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                >
                  {renderCell(row.backblaze)}
                </div>
                <div
                  role="cell"
                  className="px-5 py-4 flex items-center justify-center"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                >
                  {renderCell(row.wasabi)}
                </div>
                <div
                  role="cell"
                  className="px-5 py-4 flex items-center justify-center"
                  style={filoneCardStyle({ borderTop: "1px solid rgba(0,0,0,0.06)" })}
                >
                  {renderCell(row.filone, true)}
                </div>
              </div>
            ))}
            </div>

            {/* CTA row */}
            <div className="grid w-full" style={{ gridTemplateColumns: "200px 1fr 1fr 1fr 1fr" }}>
              <div className="px-4 pt-4" />
              <div className="px-5 pt-4" />
              <div className="px-5 pt-4" />
              <div className="px-5 pt-4" />
              <div
                className="px-5 py-5 rounded-b-2xl"
                style={filoneCardStyle({
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                })}
              >
                <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary w-full">
                  <span className="btn-primary-inner w-full justify-center">Try for free</span>
                </a>
              </div>
            </div>

            {/* Footnote */}
            <p className="mt-4 px-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#71717A" }}>
              — Possible, but significantly more expensive at scale.
            </p>
          </div>
        </div>

        {/* ── Mobile layout (< 960px) ── */}
        {/* Single grid so all rows share identical column tracks */}
        <div
          role="table"
          aria-label="Cloud storage feature comparison"
          className="min-[960px]:hidden grid"
          style={{ gridTemplateColumns: "minmax(100px, 2fr) 1fr 1fr 1fr 1fr" }}
        >
          {/* Column headers — display:contents row so grid layout is preserved */}
          <div role="row" style={{ display: "contents" }}>
            <div role="columnheader" className="pr-2 py-4" aria-label="Feature" />
            <div role="columnheader" className="px-2 py-4 flex items-center justify-center">
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 11.5, color: "#3F3F46" }}>AWS</span>
            </div>
            <div role="columnheader" className="px-2 py-4 flex items-center justify-center">
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 11.5, color: "#3F3F46" }}>Backblaze</span>
            </div>
            <div role="columnheader" className="px-2 py-4 flex items-center justify-center">
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 11.5, color: "#3F3F46" }}>Wasabi</span>
            </div>
            <div
              role="columnheader"
              className="px-2 py-4 rounded-t-xl flex items-center justify-center"
              style={filoneCardStyle({ borderTop: "1px solid rgba(0,0,0,0.06)" })}
            >
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 11.5, color: "#09090B" }}>Fil One</span>
            </div>
          </div>

          {/* Data rows — display:contents makes wrappers invisible to the grid */}
          {comparisonRows.map((row, i) => {
            const isLast = i === comparisonRows.length - 1;
            return (
              <div key={row.feature} role="row" style={{ display: "contents" }}>
                <div role="rowheader" className="pr-2 py-3 flex items-center min-w-0" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 11.5, color: "#09090B" }}>
                    {row.feature}
                  </span>
                </div>
                <div role="cell" className="px-3 py-3 flex items-center justify-center" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  {renderCell(row.aws)}
                </div>
                <div role="cell" className="px-3 py-3 flex items-center justify-center" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  {renderCell(row.backblaze)}
                </div>
                <div role="cell" className="px-3 py-3 flex items-center justify-center" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  {renderCell(row.wasabi)}
                </div>
                <div
                  role="cell"
                  className={`px-3 py-3 flex items-center justify-center${isLast ? " rounded-b-xl" : ""}`}
                  style={filoneCardStyle({
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                    ...(isLast ? { borderBottom: "1px solid rgba(0,0,0,0.06)" } : {}),
                  })}
                >
                  {renderCell(row.filone, true)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote + CTA (mobile) */}
        <div className="min-[960px]:hidden mt-4 flex flex-col gap-4">
          <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#71717A" }}>
            — Possible, but significantly more expensive at scale.
          </p>
          <div className="flex justify-center">
            <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
              <span className="btn-primary-inner justify-center px-8">Try for free</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ComparisonSection;
