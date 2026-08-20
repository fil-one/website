import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import IconTile from "@/components/IconTile";
import Pill from "@/components/Pill";
import TextLink from "@/components/TextLink";

interface FeatureCardProps {
  /** A Phosphor icon component, rendered inside the shared IconTile. */
  icon: PhosphorIcon;
  title: string;
  description: string;
  /** Optional status tag next to the icon, e.g. "Coming soon". */
  badge?: string;
  /** Optional trailing link, e.g. a waitlist signup for a not-yet-live feature. */
  cta?: { label: string; href: string };
  /** Extra classes on the card root (e.g. reveal-animation state). */
  className?: string;
}

/**
 * Icon feature card: a brand-tinted IconTile over a title and short
 * description. Shared by the pricing landing page Features grid and the
 * Enterprise "What's included" grid so the two stay visually identical.
 * The optional badge/cta cover not-yet-live features that need a status tag
 * and a waitlist link (e.g. the agent-knowledge-layer LP).
 */
const FeatureCard = ({ icon, title, description, badge, cta, className = "" }: FeatureCardProps) => (
  <div
    className={`flex flex-col gap-5 p-8 rounded-2xl border border-black/[0.07] bg-white shadow-elevated${
      className ? ` ${className}` : ""
    }`}
  >
    <div className="flex items-center justify-between gap-3">
      <IconTile icon={icon} size={26} className="h-14 w-14" />
      {badge && <Pill tone="neutral" className="whitespace-nowrap">{badge}</Pill>}
    </div>
    <div className="flex flex-1 flex-col gap-2">
      <h3 className="font-sans font-medium text-[18px] leading-[1.3] text-zinc-950 m-0">{title}</h3>
      <p className="font-sans font-normal text-[14px] leading-[1.6] text-zinc-500 m-0">{description}</p>
    </div>
    {cta && (
      <TextLink href={cta.href} tone="brand" arrow className="mt-1 self-start">
        {cta.label}
      </TextLink>
    )}
  </div>
);

export default FeatureCard;
