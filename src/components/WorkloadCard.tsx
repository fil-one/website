import Pill from "@/components/Pill";
import MetricBars, { type MetricBarGroup } from "@/components/MetricBars";

export interface Workload {
  /** Pill label naming the workload, e.g. "Analytics". */
  tag: string;
  title: string;
  desc: string;
  /** Bar comparison groups shown under the copy. */
  stats: MetricBarGroup[];
  /** Left-hand line in the footer strip: what the workload gains. */
  speedBadge: string;
  /** Right-hand figure in the footer strip: what it saves. */
  savingsBadge: string;
}

interface WorkloadCardProps {
  workload: Workload;
  className?: string;
  /** Entrance stagger, in ms, applied as a transition delay. */
  delayMs?: number;
}

/**
 * One read-heavy workload: pill, title, description, a bar comparison, then a
 * tinted footer strip pairing the qualitative win with the saved figure. The
 * footer is pinned to the bottom so a row of cards lines up regardless of how
 * many bar groups each one carries.
 */
const WorkloadCard = ({ workload, className = "", delayMs }: WorkloadCardProps) => (
  <div
    className={`flex flex-col overflow-hidden rounded-[20px] border border-black/[0.07] bg-white shadow-elevated${
      className ? ` ${className}` : ""
    }`}
    style={delayMs != null ? { transitionDelay: `${delayMs}ms` } : undefined}
  >
    <div className="px-7 pt-7 pb-6">
      <Pill className="mb-4">{workload.tag}</Pill>
      <h3 className="m-0 mb-2.5 font-sans font-medium text-[20px] leading-[1.3] tracking-[-0.02em] text-zinc-950">
        {workload.title}
      </h3>
      <p className="m-0 font-sans text-[14px] leading-[1.65] text-zinc-500">{workload.desc}</p>
    </div>

    <div className="border-t border-black/[0.06] px-7 pt-5">
      <MetricBars groups={workload.stats} />
    </div>

    <div className="mt-auto mx-4 mb-4 flex items-center justify-between gap-3 rounded-xl bg-brand-50 px-5 py-3.5">
      <span className="font-sans text-[13.5px] text-zinc-600">{workload.speedBadge}</span>
      <span className="whitespace-nowrap font-sans font-bold text-[15px] text-brand-600">
        {workload.savingsBadge}
      </span>
    </div>
  </div>
);

export default WorkloadCard;
