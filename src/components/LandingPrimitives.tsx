import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

export const GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="1"/></svg>'
);

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span
    aria-hidden="true"
    className="font-mono font-medium text-[11.5px] tracking-[0.08em] uppercase text-zinc-500"
  >
    {children}
  </span>
);

export const SectionHeading = ({
  children,
  maxWidth,
}: {
  children: React.ReactNode;
  /** Optional cap on the heading's width (px) to control where it wraps. */
  maxWidth?: number;
}) => (
  <h2
    className="font-display font-medium text-[24px] md:text-[34px] leading-[1.2] tracking-[-0.02em] text-zinc-950 m-0"
    style={maxWidth ? { maxWidth } : undefined}
  >
    {children}
  </h2>
);

export const SectionSub = ({
  children,
  maxWidth = 560,
  size = "text-[15px] md:text-[17px]",
}: {
  children: React.ReactNode;
  maxWidth?: number;
  /** Responsive font-size classes; defaults to the standard sub scale. */
  size?: string;
}) => (
  <p
    className={`font-sans font-normal ${size} leading-[1.65] text-zinc-500 m-0`}
    style={{ maxWidth }}
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
  titleSize = "text-[32px] sm:text-[40px] md:text-[52px]",
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  titleMaxWidth?: number;
  descriptionMaxWidth?: number;
  /** Responsive font-size classes for the h1; defaults to the standard hero scale. */
  titleSize?: string;
  className?: string;
}) => (
  <div className={`flex flex-col items-center gap-4 text-center${className ? ` ${className}` : ""}`}>
    <h1
      className={`m-0 font-display font-medium ${titleSize} leading-[1.1] tracking-[-0.025em] text-zinc-950`}
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
