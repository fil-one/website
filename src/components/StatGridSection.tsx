import type { ReactNode } from "react";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import StatCard from "@/components/StatCard";
import { useInView } from "@/hooks/useInView";

interface StatGridSectionProps {
  /** Eyebrow label above the heading */
  label: ReactNode;
  heading: ReactNode;
  description: ReactNode;
  /** Cards shown in the grid; `label` doubles as the React key */
  stats: { stat: ReactNode; label: string }[];
}

/**
 * A grey section pairing a side heading column with a grid of StatCards
 * (e.g. Pricing "No hidden fees"). Grey treatment matches the homepage:
 * zinc-50 background with zinc-100 top/bottom borders.
 */
const StatGridSection = ({ label, heading, description, stats }: StatGridSectionProps) => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section className="px-5 md:px-8 py-16 md:py-20 w-full bg-zinc-50 border-y border-zinc-100">
      <div
        ref={ref}
        className={`flex flex-col md:flex-row gap-8 items-center md:items-start w-full max-w-container mx-auto reveal${inView ? " in-view" : ""}`}
      >
        <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left md:max-w-[320px]">
          <SectionLabel>{label}</SectionLabel>
          <SectionHeading>{heading}</SectionHeading>
          <SectionSub maxWidth={320}>{description}</SectionSub>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full flex-1">
          {stats.map(({ stat, label: statLabel }) => (
            <StatCard key={statLabel} stat={stat} label={statLabel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatGridSection;
