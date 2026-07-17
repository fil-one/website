import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import IconTile from "@/components/IconTile";

interface FeatureCardProps {
  /** A Phosphor icon component, rendered inside the shared IconTile. */
  icon: PhosphorIcon;
  title: string;
  description: string;
  /** Extra classes on the card root (e.g. reveal-animation state). */
  className?: string;
}

/**
 * Icon feature card: a brand-tinted IconTile over a title and short
 * description. Shared by the pricing landing page Features grid and the
 * Enterprise "What's included" grid so the two stay visually identical.
 */
const FeatureCard = ({ icon, title, description, className = "" }: FeatureCardProps) => (
  <div
    className={`flex flex-col gap-5 p-8 rounded-2xl border border-black/[0.07] bg-white shadow-elevated${
      className ? ` ${className}` : ""
    }`}
  >
    <IconTile icon={icon} size={26} className="h-14 w-14" />
    <div className="flex flex-col gap-2">
      <h3 className="font-sans font-medium text-[18px] leading-[1.3] text-zinc-950 m-0">{title}</h3>
      <p className="font-sans font-normal text-[14px] leading-[1.6] text-zinc-500 m-0">{description}</p>
    </div>
  </div>
);

export default FeatureCard;
