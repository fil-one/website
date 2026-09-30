import { ArrowRight } from "@phosphor-icons/react";
import Icon from "@/components/Icon";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";

/** Base path of the workloads page; each card links to a section anchor on it. */
export const WORKLOADS_PATH = "/workloads";

export const WORKLOADS = [
  { id: "training", title: "AI training & models", description: "Offload finished checkpoints and datasets. Rehydrate at multi-Gbps." },
  { id: "lakes", title: "Data lakes & ETL", description: "Full-scan the whole lake at one flat price." },
  { id: "backup", title: "Backup & archive", description: "Off-site copies, with Object Lock when you need it. No retrieval fees." },
  { id: "media", title: "Media", description: "Masters and footage, one pull away from the edit." },
  { id: "logs", title: "Security logs", description: "SIEM and audit logs past your hot window, kept as long as you need." },
] as const;

/** Homepage workloads: five link cards into the sections of the workloads page. */
const WorkloadsGrid = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });
  return (
    <section id="workloads" className="w-full px-5 pb-14 pt-24 md:px-8 md:pt-24">
      <div ref={ref} className={`mx-auto flex w-full max-w-container flex-col gap-10 reveal${inView ? " in-view" : ""}`}>
        <div className="flex max-w-[760px] flex-col gap-3.5">
          <SectionLabel>Workloads</SectionLabel>
          <SectionHeading size="text-h2 md:text-h1">
            Built for data that <span className="text-brand-500">stays in play.</span>
          </SectionHeading>
          <SectionSub maxWidth={640} size="text-body md:text-[16px]">
            Move finished checkpoints, backups, footage and logs to lower-cost storage, and pull them back at full speed when you need them.
          </SectionSub>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {WORKLOADS.map(({ id, title, description }) => (
            <a
              key={id}
              href={`${WORKLOADS_PATH}#${id}`}
              className="group flex min-h-[176px] flex-col gap-2 rounded-2xl border border-black/[0.07] bg-white p-6 text-inherit no-underline shadow-elevated transition-colors hover:border-black/[0.14]"
            >
              <span className="font-sans text-body-lg font-medium leading-[1.3] text-zinc-950">{title}</span>
              <span className="font-sans text-[14px] leading-[1.6] text-zinc-500">{description}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 font-sans text-[14px] font-medium text-brand-600">
                How it works
                <Icon icon={ArrowRight} size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkloadsGrid;
