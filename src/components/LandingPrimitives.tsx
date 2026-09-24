import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

export const GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="1"/></svg>'
);

/** White variant of the grid texture, for dark (navy) sections and cards. */
export const GRID_SVG_WHITE = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>'
);

/**
 * Section header system: SectionLabel (mono eyebrow) + SectionHeading (h2) +
 * SectionSub (supporting paragraph). One H2 scale site-wide:
 * `text-h3 md:text-h2` (26px / 34px). SectionHeader composes all three.
 */
export const SECTION_H2_SIZE = "text-h3 md:text-h2";

export const SectionLabel = ({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  /** "light" (zinc on white/grey) or "dark" (white on navy/brand sections). */
  tone?: "light" | "dark";
}) => (
  <span
    className={`font-mono font-medium text-eyebrow tracking-[0.08em] uppercase ${
      tone === "dark" ? "text-white/60" : "text-zinc-500"
    }`}
  >
    {children}
  </span>
);

export const SectionHeading = ({
  children,
  maxWidth,
  size = SECTION_H2_SIZE,
  tone = "light",
  id,
}: {
  children: React.ReactNode;
  /** Optional cap on the heading's width (px) to control where it wraps. */
  maxWidth?: number;
  /** Responsive font-size classes; defaults to the standard H2 scale. */
  size?: string;
  /** "light" (zinc-950) or "dark" (white, for navy/brand sections). */
  tone?: "light" | "dark";
  id?: string;
}) => (
  <h2
    id={id}
    className={`font-display font-medium ${size} leading-[1.2] tracking-[-0.02em] ${
      tone === "dark" ? "text-white" : "text-zinc-950"
    } m-0 text-balance`}
    style={maxWidth ? { maxWidth } : undefined}
  >
    {children}
  </h2>
);

export const SectionSub = ({
  children,
  maxWidth = 560,
  size = "text-body md:text-body-lg",
  tone = "light",
}: {
  children: React.ReactNode;
  maxWidth?: number;
  /** Responsive font-size classes; defaults to the standard sub scale. */
  size?: string;
  /** "light" (zinc-500) or "dark" (white/70, for navy/brand sections). */
  tone?: "light" | "dark";
}) => (
  <p
    className={`font-sans font-normal ${size} leading-[1.65] ${
      tone === "dark" ? "text-white/70" : "text-zinc-500"
    } m-0 text-pretty`}
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
  titleSize = "text-h2 sm:text-h1 md:text-display",
  className,
  tone = "light",
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  titleMaxWidth?: number;
  descriptionMaxWidth?: number;
  /** Responsive font-size classes for the h1; defaults to the standard hero scale. */
  titleSize?: string;
  className?: string;
  /** "light" (default, dark text for a white/grey hero) or "brand" (white text for a dark/brand-color hero). */
  tone?: "light" | "brand";
}) => (
  <div className={`flex flex-col items-center gap-4 text-center${className ? ` ${className}` : ""}`}>
    <h1
      className={`m-0 font-display font-medium ${titleSize} leading-[1.1] tracking-[-0.025em] ${tone === "brand" ? "text-white" : "text-zinc-950"}`}
      style={titleMaxWidth ? { maxWidth: titleMaxWidth } : undefined}
    >
      {title}
    </h1>
    {description && (
      <p
        className={`m-0 text-pretty font-sans text-body md:text-body-lg leading-[1.65] ${tone === "brand" ? "text-white/90" : "text-zinc-500"}`}
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
      className="flex w-fit cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-sans text-body-sm font-normal text-zinc-500 transition-colors duration-150 ease-smooth hover:text-zinc-950"
    >
      <ArrowLeft size={14} />
      Back
    </button>
  );
};
