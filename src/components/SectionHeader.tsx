import { forwardRef, type ReactNode } from "react";
import { SectionHeading, SectionLabel, SectionSub } from "@/components/LandingPrimitives";

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
 * A thin composition of the LandingPrimitives SectionLabel / SectionHeading /
 * SectionSub, so every section header shares one type scale.
 * Forwards a ref to the container so callers can attach a `useInView` observer for reveal.
 */
const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ label, title, subtitle, className = "", id }, ref) => (
    <div
      ref={ref}
      id={id}
      className={`mx-auto flex flex-col items-center gap-3 text-center${className ? ` ${className}` : ""}`}
    >
      {label && <SectionLabel>{label}</SectionLabel>}
      <SectionHeading>{title}</SectionHeading>
      {subtitle && <SectionSub maxWidth={560}>{subtitle}</SectionSub>}
    </div>
  )
);

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
