import type { ReactNode } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import Hero, { type HeroCta } from "@/components/Hero";
import Pill from "@/components/Pill";
import ProblemCards, { type ProblemCard } from "@/components/ProblemCards";
import PriceComparisonTable, {
  type PriceComparisonColumn,
  type PriceComparisonRow,
} from "@/components/PriceComparisonTable";
import WorkloadCard, { type Workload } from "@/components/WorkloadCard";
import MetricCard from "@/components/MetricCard";
import CtaBanner from "@/components/CtaBanner";

/** Copy shared by every content section: eyebrow, heading, supporting line. */
interface SectionCopy {
  label: string;
  heading: ReactNode;
  sub: ReactNode;
  /** Cap on the supporting line (px). */
  subMaxWidth?: number;
}

export interface LandingMetric {
  icon: PhosphorIcon;
  label: string;
  value: string;
  note: string;
}

export interface LandingPageConfig {
  seo: { title: string; description: string; canonical: string; ogImage?: string };
  hero: {
    /** Sentence-length audience line above the heading. */
    badge?: string;
    title: ReactNode;
    description: ReactNode;
    titleSize?: string;
    titleMaxWidth?: number;
    descriptionMaxWidth?: number;
    ctas: HeroCta[];
    tagline: ReactNode;
  };
  /** Disqualify the alternatives: three tinted cards naming what goes wrong. */
  problem?: SectionCopy & { items: ProblemCard[] };
  /** Provider cost table. */
  comparison?: SectionCopy & {
    columns: PriceComparisonColumn[];
    rows: PriceComparisonRow[];
    caption: string;
    footnote?: ReactNode;
  };
  /** Per-workload cards with bar comparisons. */
  workloads?: SectionCopy & { items: Workload[] };
  /** Figure cards, e.g. the flat-rate breakdown or measured performance. */
  metrics?: SectionCopy & { items: LandingMetric[]; valueSize?: "md" | "lg" };
  cta: {
    heading: ReactNode;
    subhead: ReactNode;
    headingMaxWidth?: number;
    cta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    note?: ReactNode;
  };
}

const SectionHead = ({ copy, center = false }: { copy: SectionCopy; center?: boolean }) => (
  <div
    className={
      center
        ? "flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto"
        : "flex flex-col gap-3"
    }
  >
    <SectionLabel>{copy.label}</SectionLabel>
    <SectionHeading>{copy.heading}</SectionHeading>
    <SectionSub maxWidth={copy.subMaxWidth}>{copy.sub}</SectionSub>
  </div>
);

/**
 * Shared scaffold for the `/lp/*` landing pages that argue from cost. They all
 * run hero → problem → comparison → workloads → metrics → closing CTA, so each
 * page supplies only copy and data via a LandingPageConfig and every piece of
 * chrome comes from the shared token components.
 *
 * Every content section is optional. Surfaces alternate grey/white in render
 * order rather than being fixed per section, so omitting one does not produce
 * two adjacent sections of the same colour; the closing banner picks the
 * surface that continues the alternation.
 *
 * Distinct from {@link SolutionPage}, which scaffolds the `/solutions/*` pages
 * on a different skeleton (proof bar → features → steps or cards → FAQ).
 */
const LandingPage = ({ config }: { config: LandingPageConfig }) => {
  const { seo, hero, problem, comparison, workloads, metrics, cta } = config;

  useSeo({ ogImage: "https://www.fil.one/og-image.png", ...seo });

  const problemView = useInView({ threshold: 0.05 });
  const comparisonView = useInView({ threshold: 0.05 });
  const workloadsView = useInView({ threshold: 0.05 });
  const metricsView = useInView({ threshold: 0.05 });

  // Surfaces alternate in render order, starting grey under the hero. The
  // closing banner takes the next surface in the sequence so the seam stays
  // invisible however many sections a page actually has.
  let rendered = 0;
  let last: "grey" | "white" = "white";
  const nextSurface = () => {
    last = rendered++ % 2 === 0 ? "grey" : "white";
    return last === "grey" ? "bg-zinc-50" : "bg-white";
  };
  const problemSurface = problem && nextSurface();
  const comparisonSurface = comparison && nextSurface();
  const workloadsSurface = workloads && nextSurface();
  const metricsSurface = metrics && nextSurface();
  // The dark card is inset, so the banner has to match the section it sits
  // under rather than continue the alternation.
  const ctaSurface = last;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Hero
          glow
          grid
          badge={hero.badge ? <Pill wrap>{hero.badge}</Pill> : undefined}
          titleSize={hero.titleSize ?? "text-[30px] sm:text-[38px] md:text-[54px]"}
          titleMaxWidth={hero.titleMaxWidth}
          descriptionMaxWidth={hero.descriptionMaxWidth}
          contentClassName="pb-20 md:pb-28"
          title={hero.title}
          description={hero.description}
          ctas={hero.ctas}
          tagline={hero.tagline}
        />

        {/* ── Problem ──────────────────────────────────────────────────────── */}
        {problem && (
          <section className={`px-5 md:px-8 py-16 md:py-24 w-full ${problemSurface}`}>
            <div
              ref={problemView.ref}
              className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${problemView.inView ? " in-view" : ""}`}
            >
              <SectionHead copy={problem} center />
              <ProblemCards items={problem.items} />
            </div>
          </section>
        )}

        {/* ── Comparison ───────────────────────────────────────────────────── */}
        {comparison && (
          <section id="compare" className={`px-5 md:px-8 py-24 md:py-32 w-full ${comparisonSurface}`}>
            <div
              ref={comparisonView.ref}
              className={`flex flex-col gap-8 w-full max-w-container mx-auto reveal${comparisonView.inView ? " in-view" : ""}`}
            >
              <SectionHead copy={comparison} />
              <PriceComparisonTable
                columns={comparison.columns}
                rows={comparison.rows}
                caption={comparison.caption}
                footnote={comparison.footnote}
              />
            </div>
          </section>
        )}

        {/* ── Workloads ────────────────────────────────────────────────────── */}
        {workloads && (
          <section id="workloads" className={`px-5 md:px-8 py-24 md:py-32 w-full ${workloadsSurface}`}>
            <div
              ref={workloadsView.ref}
              className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${workloadsView.inView ? " in-view" : ""}`}
            >
              <SectionHead copy={workloads} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workloads.items.map((workload, i) => (
                  <WorkloadCard
                    key={workload.tag}
                    workload={workload}
                    className={`reveal${workloadsView.inView ? " in-view" : ""}`}
                    delayMs={workloadsView.inView ? i * 70 : 0}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Metrics ──────────────────────────────────────────────────────── */}
        {metrics && (
          <section className={`px-5 md:px-8 py-24 md:py-32 w-full ${metricsSurface}`}>
            <div
              ref={metricsView.ref}
              className={`flex flex-col gap-10 items-center text-center w-full max-w-container mx-auto reveal${metricsView.inView ? " in-view" : ""}`}
            >
              <div className="flex flex-col gap-3 items-center">
                <SectionLabel>{metrics.label}</SectionLabel>
                <SectionHeading>{metrics.heading}</SectionHeading>
                <SectionSub maxWidth={metrics.subMaxWidth}>{metrics.sub}</SectionSub>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[960px] text-left">
                {metrics.items.map(({ icon, label, value, note }) => (
                  <MetricCard
                    key={label}
                    icon={icon}
                    label={label}
                    value={value}
                    valueSize={metrics.valueSize}
                    note={note}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Closing CTA ──────────────────────────────────────────────────── */}
        <CtaBanner
          surface={ctaSurface}
          heading={cta.heading}
          subhead={cta.subhead}
          headingMaxWidth={cta.headingMaxWidth}
          cta={cta.cta}
          secondaryCta={cta.secondaryCta}
          note={cta.note}
        />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
