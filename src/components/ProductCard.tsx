import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import IconTile from "@/components/IconTile";
import Pill from "@/components/Pill";
import FeatureList from "@/components/FeatureList";
import TextLink from "@/components/TextLink";

interface ProductCardProps {
  icon: PhosphorIcon;
  title: string;
  /** Optional status pill, e.g. "Coming soon". */
  badge?: string;
  subtitle: string;
  description: string;
  features: string[];
  learnMoreHref: string;
  /** Footer heading, e.g. "Free for early testers". */
  footerTitle: string;
  /** Optional footer sub-note. */
  footerNote?: string;
  waitlistHref: string;
  waitlistLabel?: string;
  onWaitlistClick?: () => void;
  className?: string;
}

/**
 * Add-on product card: icon + title (+ optional badge), subtitle, description,
 * feature list, a "Learn more" link, and a footer with a waitlist link.
 * Composed from the shared primitives and built on the design tokens.
 */
const ProductCard = ({
  icon,
  title,
  badge,
  subtitle,
  description,
  features,
  learnMoreHref,
  footerTitle,
  footerNote,
  waitlistHref,
  waitlistLabel = "Join waitlist",
  onWaitlistClick,
  className = "",
}: ProductCardProps) => (
  <div className={`flex flex-col gap-5 rounded-2xl border border-black/[0.07] bg-white p-7 shadow-elevated${className ? ` ${className}` : ""}`}>
    {/* Header: icon + title + badge */}
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <IconTile icon={icon} />
        <h3 className="m-0 font-display text-[19px] font-medium leading-[1.2] tracking-[-0.015em] text-zinc-950">
          {title}
        </h3>
      </div>
      {badge && <Pill className="shrink-0">{badge}</Pill>}
    </div>

    {/* Subtitle + description */}
    <div className="flex flex-col gap-1">
      <p className="font-sans text-[13.5px] font-medium leading-[1.4] text-zinc-600">{subtitle}</p>
      <p className="font-sans text-[13.5px] font-normal leading-[1.6] text-zinc-500">{description}</p>
    </div>

    <FeatureList items={features} />

    <TextLink href={learnMoreHref} className="self-start">Learn more</TextLink>

    <div className="flex-1" />
    <div className="h-px w-full bg-black/[0.06]" />

    {/* Footer */}
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="font-display text-[15px] font-medium leading-none tracking-[-0.015em] text-zinc-950">{footerTitle}</p>
        {footerNote && <p className="mt-[3px] font-sans text-[12px] font-normal text-zinc-500">{footerNote}</p>}
      </div>
      <TextLink href={waitlistHref} tone="brand" arrow className="shrink-0" onClick={onWaitlistClick}>
        {waitlistLabel}
      </TextLink>
    </div>
  </div>
);

export default ProductCard;
