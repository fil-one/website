import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Check } from "@phosphor-icons/react";
import Icon from "@/components/Icon";
import IconTile from "@/components/IconTile";

interface RoleCardProps {
  /** A Phosphor icon component, rendered inside a compact IconTile. */
  icon: PhosphorIcon;
  title: string;
  /** Short middle-dot separated qualifier line under the title. */
  subtitle: string;
  /** One-line "best for" description. */
  description: string;
  /** Check-marked points listed under a hairline divider. */
  bullets: string[];
  /** Extra classes on the card root. */
  className?: string;
}

/**
 * Role / plan card: an icon tile with a title + qualifier subtitle, a short
 * description, then a divider and a list of check-marked points. Distinct from
 * FeatureCard (icon + title + description only) and PricingCard (price + CTA).
 * Fully tokenized — brand/zinc tokens, shared IconTile/Icon, shadow-elevated.
 */
const RoleCard = ({ icon, title, subtitle, description, bullets, className = "" }: RoleCardProps) => (
  <div
    className={`flex flex-col gap-5 rounded-2xl border border-black/[0.07] bg-white p-6 shadow-elevated${
      className ? ` ${className}` : ""
    }`}
  >
    <div className="flex items-start gap-3">
      <IconTile icon={icon} size={15} className="mt-0.5 h-8 w-8 rounded-lg" />
      <div>
        <h3 className="m-0 font-display font-medium text-[15.5px] leading-[1.25] text-zinc-950">{title}</h3>
        <p className="mt-[3px] font-sans text-[11.5px] leading-[1.3] text-zinc-500">{subtitle}</p>
      </div>
    </div>

    <p className="m-0 font-sans text-[13.5px] leading-[1.6] text-zinc-600">{description}</p>

    <div className="h-px bg-black/[0.06]" />

    <ul className="flex flex-col gap-2.5">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2.5">
          <Icon icon={Check} size={13} weight="bold" className="mt-[3px] shrink-0 text-brand-500" />
          <span className="font-sans text-[13px] leading-[1.55] text-zinc-600">{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RoleCard;
