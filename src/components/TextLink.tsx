import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import Icon from "@/components/Icon";

type TextLinkTone = "muted" | "brand";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  /** muted = secondary grey link (default); brand = accented blue link */
  tone?: TextLinkTone;
  /** show a trailing arrow (rendered via the shared Icon); external links get ↗ */
  arrow?: boolean;
  onClick?: () => void;
  external?: boolean;
  className?: string;
}

const TONE_CLASSES: Record<TextLinkTone, string> = {
  muted: "text-[13.5px] font-normal text-zinc-500",
  // brand-600 (not 500) so blue-on-white meets AA; matches the site's other blue links.
  brand: "text-[14px] font-medium text-brand-600",
};

/**
 * Tertiary text link (not a button). Uses font/zinc/brand tokens. Optionally
 * shows a trailing arrow rendered through the shared <Icon>, nudged on hover.
 */
const TextLink = ({ href, children, tone = "muted", arrow = false, onClick, external = false, className = "" }: TextLinkProps) => (
  <a
    href={href}
    onClick={onClick}
    className={`group inline-flex items-center gap-1.5 whitespace-nowrap font-sans no-underline transition-opacity hover:opacity-70 ${TONE_CLASSES[tone]}${className ? ` ${className}` : ""}`}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {children}
    {arrow && (
      <Icon
        icon={external ? ArrowUpRight : ArrowRight}
        size={14}
        className={`transition-transform ${external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-0.5"}`}
      />
    )}
  </a>
);

export default TextLink;
