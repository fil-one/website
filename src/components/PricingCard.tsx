import type { ReactNode } from "react";
import { Check } from "@phosphor-icons/react";
import Icon from "@/components/Icon";
import { Button } from "@/components/Button";

interface PricingCardProps {
  /** Plan name, e.g. "Pay as you go" (canonical console casing) */
  name: string;
  /** Short supporting line under the name */
  tagline: string;
  /** Headline price — "$4.99" or text like "Custom pricing" */
  price: ReactNode;
  /** Unit shown next to a numeric price, e.g. "/ TB / month" */
  priceSuffix?: string;
  /** Font size for the price; defaults to the large numeric size */
  priceSize?: number;
  /** Small note under the price */
  priceNote?: string;
  features: string[];
  cta: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
    onClick?: () => void;
  };
  /** Brand border + focus-ring shadow to mark the recommended plan */
  highlighted?: boolean;
  /** Extra classes on the card root (e.g. reveal animation) */
  className?: string;
}

/**
 * A pricing-tier card: name, price, feature checklist, and a CTA button.
 * Used on the Pricing page; reusable anywhere the tiers need to appear.
 */
const PricingCard = ({
  name,
  tagline,
  price,
  priceSuffix,
  priceSize = 44,
  priceNote,
  features,
  cta,
  highlighted = false,
  className,
}: PricingCardProps) => (
  <div
    className={`flex flex-1 flex-col gap-7 p-8 rounded-2xl border bg-white ${
      highlighted ? "border-brand-500/25 shadow-elevated-ring" : "border-black/[0.07] shadow-elevated"
    }${className ? ` ${className}` : ""}`}
  >
    <div className="flex flex-col gap-1">
      <p className="font-sans font-semibold text-[18px] text-zinc-950">{name}</p>
      <p className="font-sans text-[13.5px] text-zinc-500">{tagline}</p>
    </div>

    <div className="flex flex-col gap-1">
      <div className="flex items-end gap-1.5">
        <span
          className="font-display font-medium leading-none text-zinc-950 tracking-[-0.025em]"
          style={{ fontSize: priceSize }}
        >
          {price}
        </span>
        {priceSuffix && (
          <span className="font-sans text-[14px] text-zinc-500 pb-1.5">{priceSuffix}</span>
        )}
      </div>
      {priceNote && <p className="font-sans text-[13.5px] text-zinc-500">{priceNote}</p>}
    </div>

    <div className="w-full h-px bg-black/[0.06]" />

    <div className="flex flex-col gap-3">
      {features.map((f) => (
        <div key={f} className="flex gap-3 items-center">
          <Icon icon={Check} size={14} className="text-brand-500 shrink-0" />
          <p className="font-sans text-[14px] text-zinc-600">{f}</p>
        </div>
      ))}
    </div>

    <Button variant={cta.variant} fullWidth href={cta.href} onClick={cta.onClick} className="mt-auto">
      {cta.label}
    </Button>
  </div>
);

export default PricingCard;
