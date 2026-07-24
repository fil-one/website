import { Check } from "@phosphor-icons/react";
import Icon from "@/components/Icon";

interface ProofBarProps {
  /** Short, parallel proof points, each shown inline with a brand check. */
  items: string[];
  className?: string;
}

/**
 * Full-bleed proof bar: a hairline-bordered, faintly tinted band of short
 * check-marked proof points, centered and wrapping. The compact, scannable
 * counterpart to a card grid — used to reassure right under a hero. All chrome
 * uses design tokens (brand/zinc) and routes its check through the shared Icon.
 */
const ProofBar = ({ items, className = "" }: ProofBarProps) => (
  <div
    className={`w-full border-y border-zinc-100 bg-zinc-50 px-5 py-4 md:px-8 md:py-5${className ? ` ${className}` : ""}`}
  >
    <ul className="mx-auto flex max-w-container flex-wrap items-center justify-center gap-x-8 gap-y-2.5 md:gap-x-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-1.5">
          <Icon icon={Check} size={13} weight="bold" className="shrink-0 text-brand-500" />
          <span className="font-sans text-[13px] text-zinc-700">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ProofBar;
