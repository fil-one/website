import { Check } from "@phosphor-icons/react";
import Icon from "@/components/Icon";

interface FeatureListProps {
  items: string[];
  className?: string;
}

/**
 * Vertical list of features, each a brand check + label. Renders a semantic
 * <ul>/<li>, routes the check through the shared <Icon>, and uses brand/zinc
 * tokens (check inherits text-brand-500 via currentColor).
 */
const FeatureList = ({ items, className = "" }: FeatureListProps) => (
  <ul className={`flex flex-col gap-2.5${className ? ` ${className}` : ""}`}>
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <Icon icon={Check} size={14} className="mt-0.5 shrink-0 text-brand-500" />
        <span className="font-sans text-[14px] font-normal leading-[1.5] text-zinc-600">
          {item}
        </span>
      </li>
    ))}
  </ul>
);

export default FeatureList;
