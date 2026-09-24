import type { ReactNode } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Button } from "@/components/Button";
import IconTile from "@/components/IconTile";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";

export interface SplitFeatureItem {
  icon: PhosphorIcon;
  title: string;
  description: string;
}

interface SplitFeatureSectionProps {
  label: ReactNode;
  heading: ReactNode;
  description: ReactNode;
  items: SplitFeatureItem[];
  /**
   * Optional button under the pitch copy. Always the secondary variant: these
   * are sales CTAs ("Talk to sales"), matching the navbar hierarchy.
   */
  cta?: { label: string; href: string; onClick?: () => void };
  /** Section background; grey uses the standard zinc-50 band with hairline borders. */
  tone?: "white" | "grey";
}

/**
 * Two-column split: a pitch column on the left (sticky on desktop) and a
 * hairline-divided feature list on the right. Deliberately not a card grid,
 * so it reads differently from card sections around it and long lists stay
 * compact. Used by the homepage Enterprise band and the neocloud page.
 */
const SplitFeatureSection = ({ label, heading, description, items, cta, tone = "white" }: SplitFeatureSectionProps) => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section
      className={`w-full px-5 md:px-8 py-24 md:py-32 ${
        tone === "grey" ? "bg-zinc-50 border-y border-zinc-100" : "bg-white"
      }`}
    >
      <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-20">

        {/* Pitch column */}
        <div className="mx-auto flex max-w-[560px] flex-col items-center gap-4 text-center lg:mx-0 lg:max-w-none lg:sticky lg:top-28 lg:items-start lg:self-start lg:text-left">
          <SectionLabel>{label}</SectionLabel>
          <SectionHeading>{heading}</SectionHeading>
          <SectionSub>{description}</SectionSub>
          {cta && (
            <Button variant="secondary" href={cta.href} className="mt-2" onClick={cta.onClick}>
              {cta.label}
            </Button>
          )}
        </div>

        {/* Feature list */}
        <div ref={ref} className="reveal-group">
          <ul className="m-0 flex list-none flex-col p-0">
            {items.map(({ icon, title, description: itemDescription }, i) => (
              <li
                key={title}
                className={`flex items-start gap-4 py-6 ${i === 0 ? "" : "border-t border-black/[0.07]"} reveal${
                  inView ? " in-view" : ""
                }`}
              >
                <IconTile icon={icon} className="mt-0.5" />
                <div className="flex flex-col gap-1">
                  <h3 className="m-0 text-pretty font-sans text-body-lg font-medium leading-[1.3] text-zinc-950">
                    {title}
                  </h3>
                  <p className="m-0 text-pretty font-sans text-body-sm font-normal leading-[1.6] text-zinc-500">
                    {itemDescription}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default SplitFeatureSection;
