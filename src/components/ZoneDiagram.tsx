import type { ReactNode } from "react";
import { SectionLabel } from "@/components/LandingPrimitives";
import drivesRack from "../assets/drives-rack.webp";

const Tag = ({ children, fil }: { children: ReactNode; fil?: boolean }) => (
  <span className={`absolute right-3 top-2.5 font-mono text-[9.5px] tracking-[0.1em] ${fil ? "text-white/80" : "text-white/45"}`}>{children}</span>
);

const Node = ({
  title,
  sub,
  tag,
  fil,
  outline,
  children,
}: {
  title: string;
  sub: string;
  tag?: string;
  fil?: boolean;
  /** Blue inset outline (the resilient cloud node). */
  outline?: boolean;
  children?: ReactNode;
}) => (
  <div
    className={`relative flex w-full flex-col items-start gap-1 rounded-[10px] border py-3.5 pl-4 pr-14 text-left font-sans text-[14.5px] font-medium leading-[1.3] text-white ${
      fil
        ? "border-brand-400 bg-brand-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_0_0_4px_rgba(0,144,255,0.18),0_8px_24px_-8px_rgba(0,144,255,0.6)]"
        : "border-white/[0.18] bg-schematic-node shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_16px_-8px_rgba(0,0,0,0.6)]"
    }${outline ? " shadow-[inset_0_0_0_1px_rgba(56,166,255,0.55)]" : ""}`}
  >
    {tag && <Tag fil={fil}>{tag}</Tag>}
    <span>{title}</span>
    <span className={`text-[12.5px] font-normal leading-[1.4] ${fil ? "text-white/90" : "text-white/75"}`}>{sub}</span>
    {children}
  </div>
);

const VArrow = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center gap-0.5 py-1">
    <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-brand-300">{label}</span>
    <span className="h-3.5 w-px bg-brand-300/45" />
  </div>
);

const MonoLabel = ({ children, dim }: { children: ReactNode; dim?: boolean }) => (
  <span className={`font-mono text-[9.5px] uppercase tracking-[0.1em] ${dim ? "text-white/45" : "text-brand-300"}`}>{children}</span>
);

/**
 * The Host a zone hero schematic: the partner's building on the left (compute,
 * scratch, then the Fil One Capacity tier on a cross-connect), the internet
 * boundary as a vertical rule, and beyond it Fil One Sovereign versus other clouds.
 */
const ZoneDiagram = () => (
  <div
    className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-schematic bg-cover text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
    style={{ backgroundImage: `url(${drivesRack})`, backgroundPosition: "center 40%" }}
  >
    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,22,44,0.78)_0%,rgba(14,22,44,0.84)_60%,rgba(10,16,32,0.94)_100%)]" />
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "18px 18px", backgroundPosition: "-4px -4px" }}
    />
    <div className="relative grid grid-cols-1 gap-6 px-5 pb-6 pt-5 md:grid-cols-[1fr_56px_236px] md:gap-0 md:px-6">
      <div className="flex flex-col">
        <span className="pb-3">
          <SectionLabel tone="dark">Your building</SectionLabel>
        </span>
        <Node title="Compute" sub="AI, HPC, analytics and app workloads" tag="YOURS" />
        <div className="h-2" />
        <Node title="WEKA / VAST scratch" sub="Hot working set, checkpoints in flight" tag="YOURS" />
        <VArrow label="cross-connect" />
        <Node title="Fil One Capacity · HDD" sub="Archives, backups, completed jobs, logs" tag="OURS" fil>
          <span className="mt-2 font-mono text-[11px] tracking-[0.04em] text-white/90">&lt;1 ms · no internet path · no egress meter</span>
        </Node>
      </div>

      <div className="relative flex items-center justify-center self-stretch">
        <div className="absolute inset-x-0 top-1/2 h-px bg-brand-300/45 md:inset-x-auto md:inset-y-0 md:left-1/2 md:h-auto md:w-px" />
        <span className="relative bg-schematic px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-brand-300 md:px-0.5 md:py-2.5 md:[writing-mode:vertical-rl] md:rotate-180">
          internet
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="pb-1">
          <SectionLabel tone="dark">Beyond your building</SectionLabel>
        </span>
        <MonoLabel>Our resilient cloud</MonoLabel>
        <Node
          title="Fil One Sovereign"
          sub="Erasure coded across several data centers. Survives a site loss, with fast transfer and sharing between sites. Stays in-jurisdiction. Deployed in days, not weeks."
          tag="OURS"
          outline
        />
        <span className="pt-2">
          <MonoLabel dim>Other clouds</MonoLabel>
        </span>
        <div className="w-full rounded-[10px] border border-dashed border-white/[0.18] bg-white/[0.03] px-3.5 py-3 text-left font-sans text-[12.5px] leading-[1.4] text-white/70">
          &gt;50 ms over the public internet. Egress metered (AWS, GCP) or capped (Backblaze 3× stored, Wasabi fair use).
        </div>
      </div>
    </div>
  </div>
);

export default ZoneDiagram;
