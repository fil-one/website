interface PressMarqueeProps {
  /** Publication / logo labels to scroll. */
  items: string[];
  /** Label font size — md (16px, default) or lg (20px). */
  size?: "md" | "lg";
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<PressMarqueeProps["size"]>, string> = {
  md: "text-[16px]",
  lg: "text-[20px]",
};

/**
 * Infinite-scroll marquee of press / publication names. The row is duplicated
 * so the CSS `marquee-track` animation loops seamlessly; the second copy is
 * aria-hidden. Shared by PressBar (award callout) and FeaturedInBar (logos only).
 */
const PressMarquee = ({ items, size = "md", className = "" }: PressMarqueeProps) => (
  <div className={`marquee-mask w-full max-w-2xl overflow-hidden${className ? ` ${className}` : ""}`}>
    <div className="marquee-track flex items-center w-max">
      {[0, 1].map((copy) => (
        <span key={copy} className="flex items-center gap-8 pr-8" aria-hidden={copy === 1}>
          {items.map((item) => (
            <span key={item} className="flex items-center gap-8">
              <span className={`font-sans ${SIZE_CLASSES[size]} font-medium text-zinc-600`}>{item}</span>
              {/* Purely visual separator: hidden from assistive tech so the
                  list reads as names, not "Bloomberg middle dot CNBC". */}
              <span aria-hidden="true" className="text-[20px] text-zinc-300">·</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  </div>
);

export default PressMarquee;
