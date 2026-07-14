import type { ReactNode } from "react";
import Pill from "@/components/Pill";

interface AnnouncementBadgeProps {
  /** Text in the leading solid pill, e.g. "Soon" or "New". */
  pill: ReactNode;
  /** The announcement label shown beside the pill. */
  children: ReactNode;
  className?: string;
}

/**
 * Announcement badge: a soft brand pill wrapping a solid status Pill + a label.
 * Used for the hero "Soon · <feature>" callout. Built on the Pill primitive
 * and the brand color / font tokens.
 */
const AnnouncementBadge = ({ pill, children, className = "" }: AnnouncementBadgeProps) => (
  <div
    className={`inline-flex items-center gap-2.5 rounded-full border border-brand/20 bg-brand-50 py-[5px] pl-[6px] pr-[14px]${className ? ` ${className}` : ""}`}
  >
    <Pill variant="solid" pulse>
      {pill}
    </Pill>
    <span className="whitespace-nowrap font-sans text-[13.5px] font-medium leading-none text-brand-600">
      {children}
    </span>
  </div>
);

export default AnnouncementBadge;
