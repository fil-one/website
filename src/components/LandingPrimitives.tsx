import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

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

/**
 * Page-level hero heading: the large display h1 plus an optional supporting
 * paragraph, centered. Shared by the homepage Hero and standalone page heroes
 * (e.g. Pricing). Type scale is fixed for consistency; max-widths vary by
 * content so they're props. `title`/`description` accept ReactNode so callers
 * can embed highlighted spans or line breaks.
 */
export const HeroHeading = ({
  title,
  description,
  titleMaxWidth,
  descriptionMaxWidth,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  titleMaxWidth?: number;
  descriptionMaxWidth?: number;
  className?: string;
}) => (
  <div className={`flex flex-col items-center gap-4 text-center${className ? ` ${className}` : ""}`}>
    <h1
      className="m-0 font-display font-medium text-[32px] sm:text-[40px] md:text-[52px] leading-[1.1] tracking-[-0.025em] text-zinc-950"
      style={titleMaxWidth ? { maxWidth: titleMaxWidth } : undefined}
    >
      {title}
    </h1>
    {description && (
      <p
        className="m-0 font-sans text-[15px] md:text-[17px] leading-[1.65] text-zinc-500"
        style={descriptionMaxWidth ? { maxWidth: descriptionMaxWidth } : undefined}
      >
        {description}
      </p>
    )}
  </div>
);

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-1.5"
      style={{
        fontFamily: "'Funnel Sans', sans-serif",
        fontWeight: 400,
        fontSize: 14,
        color: "#71717A",
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        width: "fit-content",
        transition: "color 150ms ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = "#09090B")}
      onMouseLeave={e => (e.currentTarget.style.color = "#71717A")}
    >
      <ArrowLeft size={14} />
      Back
    </button>
  );
};
