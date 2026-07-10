import { forwardRef, type ReactNode } from "react";

interface SectionHeaderProps {
  /** Small uppercase mono eyebrow above the title (optional). */
  label?: ReactNode;
  /** The section heading (rendered as an <h2>). */
  title: ReactNode;
  /** Optional supporting paragraph below the title. */
  subtitle?: ReactNode;
  /**
   * Extra classes on the container — use for layout the parent owns,
   * e.g. `max-w-[560px]` and the `reveal`/`in-view` scroll animation.
   */
  className?: string;
  id?: string;
}

/**
 * Standard centered section header: mono eyebrow label + display heading + body subtitle.
 * Replaces the hand-rolled label/h2/p block duplicated across homepage and landing sections.
 * Forwards a ref to the container so callers can attach a `useInView` observer for reveal.
 */
const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ label, title, subtitle, className = "", id }, ref) => (
    <div
      ref={ref}
      id={id}
      className={`mx-auto flex flex-col items-center gap-3 text-center${className ? ` ${className}` : ""}`}
    >
      {label && (
        <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-zinc-500">
          {label}
        </span>
      )}
      <h2 className="m-0 font-display text-[26px] font-medium leading-[1.2] tracking-[-0.02em] text-zinc-950 md:text-[32px]">
        {title}
      </h2>
      {subtitle && (
        <p className="m-0 font-sans text-[15px] font-normal leading-[1.6] text-zinc-500 md:text-[16px]">
          {subtitle}
        </p>
      )}
    </div>
  )
);

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
