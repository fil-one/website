export const GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="1"/></svg>'
);

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span
    aria-hidden="true"
    style={{
      fontFamily: "'DM Mono', monospace",
      fontWeight: 500,
      fontSize: 11.5,
      letterSpacing: "0.08em",
      color: "#71717A",
      textTransform: "uppercase" as const,
    }}
  >
    {children}
  </span>
);

export const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="text-[24px] md:text-[34px]"
    style={{
      fontFamily: "'Aspekta', sans-serif",
      fontWeight: 500,
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
      color: "#09090B",
      margin: 0,
    }}
  >
    {children}
  </h2>
);

export const SectionSub = ({ children, maxWidth = 560 }: { children: React.ReactNode; maxWidth?: number }) => (
  <p
    className="text-[15px] md:text-[17px]"
    style={{
      fontFamily: "'Funnel Sans', sans-serif",
      fontWeight: 400,
      lineHeight: "1.65",
      color: "#71717A",
      maxWidth,
      margin: 0,
    }}
  >
    {children}
  </p>
);
