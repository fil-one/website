import type { ReactNode } from "react";
import { SectionLabel } from "@/components/LandingPrimitives";

export interface FlowNode {
  title: string;
  /** Second line inside the node. */
  detail?: string;
  /** The Fil One node: solid brand blue with a soft ring. */
  fil?: boolean;
}

export interface FlowStep {
  /** Mono label on the arrow leading into the next node. */
  label: string;
  node: FlowNode;
}

interface FlowCardProps {
  label?: ReactNode;
  /** The first node. */
  from: FlowNode;
  /** Each arrow and the node it points at, left to right. */
  steps: FlowStep[];
  /** Footnote under the diagram. */
  note?: ReactNode;
  className?: string;
}

const Node = ({ title, detail, fil }: FlowNode) => (
  <div
    className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[10px] border px-4 py-4 text-center font-sans text-[15px] font-medium leading-[1.3] text-white md:px-[18px] md:py-[18px] ${
      fil
        ? "border-brand-400 bg-brand-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_0_0_4px_rgba(0,144,255,0.18),0_8px_24px_-8px_rgba(0,144,255,0.6)]"
        : "border-white/[0.18] bg-schematic-node shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_16px_-8px_rgba(0,0,0,0.6)]"
    }`}
  >
    <span>{title}</span>
    {detail && <span className={`text-[13px] font-normal leading-[1.35] ${fil ? "text-white/90" : "text-white/75"}`}>{detail}</span>}
  </div>
);

const Arrow = ({ label }: { label: string }) => (
  <div className="relative mx-2.5 hidden h-px w-[124px] shrink-0 bg-brand-300/45 md:block">
    <span className="absolute -right-px -top-1 border-[4.5px] border-transparent border-l-[7px] border-l-brand-300" />
    <span className="absolute bottom-2.5 left-1/2 w-[136px] -translate-x-1/2 text-center font-mono text-[11px] font-medium uppercase leading-[1.4] tracking-[0.06em] text-brand-300">
      {label}
    </span>
  </div>
);

/**
 * A three-node "how it flows" schematic on the navy dotted panel: source,
 * the Fil One bucket, destination, with the two moves labelled on the arrows.
 * Below md the arrows drop out and the nodes stack, with the labels between them.
 */
const FlowCard = ({ label = "How it flows", from, steps, note, className = "" }: FlowCardProps) => (
  <div
    className={`relative flex flex-col gap-2.5 rounded-2xl border border-white/[0.08] bg-schematic px-6 pb-6 pt-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:px-7 md:pb-6 md:pt-[26px]${className ? ` ${className}` : ""}`}
    style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "18px 18px", backgroundPosition: "-4px -4px" }}
  >
    <SectionLabel tone="dark">
      <span className="text-brand-300">{label}</span>
    </SectionLabel>
    <div className="flex flex-col items-stretch gap-3 pt-6 md:flex-row md:items-center md:gap-0">
      <Node {...from} />
      {steps.map(({ label: stepLabel, node }) => (
        <div key={stepLabel} className="contents">
          <Arrow label={stepLabel} />
          <span className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-brand-300 md:hidden">
            ↓ {stepLabel}
          </span>
          <Node {...node} />
        </div>
      ))}
    </div>
    {note && <p className="m-0 pt-1.5 font-sans text-small leading-[1.5] text-white/70">{note}</p>}
  </div>
);

export default FlowCard;
