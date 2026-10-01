import { useEffect, useState, type MouseEvent } from "react";
import { Archive, Brain, Database, FilmStrip, ShieldCheck, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import Icon from "@/components/Icon";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeatureList from "@/components/FeatureList";
import FlowCard, { type FlowNode, type FlowStep } from "@/components/FlowCard";
import TextLink from "@/components/TextLink";
import CtaBanner from "@/components/CtaBanner";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useSeo } from "@/hooks/useSeo";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";
import { PRICE_DISPLAY } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const DOCS_URL = "https://docs.fil.one";
const CONTACT_HREF = "/contact-sales";

interface Workload {
  id: string;
  icon: PhosphorIcon;
  nav: string;
  title: string;
  body: string;
  points: string[];
  from: FlowNode;
  steps: FlowStep[];
  note: string;
}

/**
 * The five workloads, in order. Each id doubles as the URL hash, so the
 * homepage cards and the retired /solutions/* redirects open the right section.
 */
const WORKLOADS: Workload[] = [
  {
    id: "training",
    icon: Brain,
    nav: "AI training and models",
    title: "AI training and model work",
    body: "Your NVMe holds the batch in flight. Finished checkpoints and the datasets you aren't training on today move to Fil One, then stream back at multi-Gbps when the next run needs them.",
    points: ["NVMe freed up for the working set", "Versioned datasets you can reproduce", "Rehydrate with no egress fee"],
    from: { title: "NVMe or scratch", detail: "Active training set, checkpoints in flight" },
    steps: [
      { label: "Offload finished work", node: { title: "Fil One bucket, versioned", detail: "Finished checkpoints, dataset versions, eval results", fil: true } },
      { label: "Rehydrate · $0 egress", node: { title: "Next training run", detail: "Streams back at multi-Gbps" } },
    ],
    note: "Turn on Object Lock to make checkpoints immutable once they land.",
  },
  {
    id: "lakes",
    icon: Database,
    nav: "Data lakes and ETL",
    title: "Data lakes and ETL",
    body: "Keep hot tables and the query cache on your fastest storage. The files behind them (Parquet, ORC, Avro, CSV and JSON), plus raw history and older partitions, live on Fil One, where full scans don't come with an egress bill.",
    points: ["One flat price per TB as the lake grows", "Keys scoped to one bucket, per team or per client", "No API request charges on scans"],
    from: { title: "Hot tables and cache", detail: "Hot tables, query cache" },
    steps: [
      { label: "Age out partitions", node: { title: "Lake on Fil One", detail: "Parquet, ORC and CSV files, raw history, older partitions", fil: true } },
      { label: "Full scans · $0 egress", node: { title: "Query and ETL engines", detail: "Scan the whole lake, no egress bill" } },
    ],
    note: "Scan the whole lake as often as you need, with no API request charges.",
  },
  {
    id: "backup",
    icon: Archive,
    nav: "Backup and archive",
    title: "Backup and archive",
    body: "Production stays on your primary storage. Every backup and archive copy goes to Fil One, ready to restore without a retrieval fee. Turn on Object Lock when copies need to be immutable.",
    points: ["Object Lock for immutable backups", "No retrieval fees or waits to restore", "No minimum storage duration"],
    from: { title: "Production systems", detail: "Production systems and databases" },
    steps: [
      { label: "Back up", node: { title: "Backup bucket on Fil One", detail: "Backups, snapshots, long-term archive", fil: true } },
      { label: "Restore · $0 egress", node: { title: "Back in production", detail: "Restore with no retrieval fee" } },
    ],
    note: "Restores cost nothing extra, however often you test them.",
  },
  {
    id: "media",
    icon: FilmStrip,
    nav: "Media",
    title: "Media",
    body: "Keep the project you're cutting on fast local or shared storage. Masters, raw footage and finished projects move to Fil One and come back into the edit at multi-Gbps, with no transfer fees.",
    points: ["Edit storage freed up for active work", "Multi-Gbps pulls for large files", "No egress when footage comes back"],
    from: { title: "Active edit storage", detail: "The project you're cutting now" },
    steps: [
      { label: "Offload masters", node: { title: "Media bucket on Fil One", detail: "Masters, raw footage, finished projects", fil: true } },
      { label: "Pull back · $0 egress", node: { title: "Next edit", detail: "Back into the edit at multi-Gbps" } },
    ],
    note: "Everything stays warm, milliseconds away.",
  },
  {
    id: "logs",
    icon: ShieldCheck,
    nav: "Security logs",
    title: "Security and audit logs",
    body: "Recent events stay in your SIEM for live detection. Older logs move to Fil One, ready for threat hunts, forensics and audits. Add Object Lock for tamper-proof retention.",
    points: ["Object Lock for tamper-proof retention", "No API request charges on high-volume writes", "Read back for forensics and audits with no egress fees"],
    from: { title: "SIEM and observability", detail: "Recent events in your SIEM and observability stack" },
    steps: [
      { label: "Age out", node: { title: "Log bucket on Fil One", detail: "Everything past your hot window", fil: true } },
      { label: "Read back · $0 egress", node: { title: "Threat hunts, forensics, audits", detail: "Read back with no egress fees" } },
    ],
    note: "Keep security logs as long as your compliance rules require, at one flat price.",
  },
];

const PATTERN = [
  { figure: "One class", label: "Same bucket type for every workload" },
  { figure: PRICE_DISPLAY, label: "Per TB per month, flat" },
  { figure: "$0 egress", label: "No API, retrieval or exit fees. Subject to fair use." },
  { figure: "Multi-Gbps", label: "Sustained reads, not archive retrieval" },
];

const WorkloadsPage = () => {
  useSeo();
  const [active, setActive] = useState(WORKLOADS[0].id);

  // Side-nav clicks glide to the section instead of jumping, and keep the
  // hash in the URL so the link still copies. Respects reduced-motion.
  const goTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  // Highlight the side-nav entry for the section in view: the last section
  // whose top has passed the upper 40% of the viewport.
  useEffect(() => {
    const sections = WORKLOADS.map((w) => document.getElementById(w.id)).filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const el of sections) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PlatformNavbar />
      <main id="main-content">
        <div className="relative isolate overflow-hidden bg-white">
          <Hero
            grid
            glow
            badge={<SectionLabel>Bring a workload</SectionLabel>}
            title={
              <>
                Keep hot data hot.
                <br />
                <span className="text-brand-500">Keep everything else in play.</span>
              </>
            }
            description="Your fastest tier holds the working set. Move finished checkpoints, datasets, backups, footage and logs off it and onto fast, lower-cost Fil One storage, ready to come back at multi-Gbps."
            titleMaxWidth={780}
            descriptionMaxWidth={680}
            ctas={[
              { label: "Start for free", href: signupUrl(), variant: "primary", size: "lg", glow: true, onClick: () => trackCtaClick("Start for free", signupUrl(), "primary") },
              { label: "Talk to an engineer", href: CONTACT_HREF, variant: "secondary", onClick: () => trackCtaClick("Talk to an engineer", CONTACT_HREF, "secondary") },
            ]}
            tagline={<>1&nbsp;TB free for 30 days · No credit card required</>}
            contentClassName="pb-10"
          />
        </div>

        {/* Sticky side nav + the five sections */}
        <section className="w-full px-5 md:px-8">
          <div className="mx-auto grid w-full max-w-container grid-cols-1 items-start gap-8 lg:grid-cols-[224px_1fr] lg:gap-16">
            <aside className="z-10 hidden lg:sticky lg:top-[calc(theme(spacing.header)+24px)] lg:flex lg:flex-col lg:gap-1 lg:pt-14">
              <span className="px-3 pb-2.5">
                <SectionLabel>Workloads</SectionLabel>
              </span>
              {WORKLOADS.map((w) => (
                <a
                  key={w.id}
                  href={`#${w.id}`}
                  onClick={goTo(w.id)}
                  aria-current={active === w.id ? "location" : undefined}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 font-sans text-[14px] no-underline transition-colors ${
                    active === w.id ? "bg-brand-50 font-medium text-brand-700" : "text-zinc-600 hover:bg-black/[0.03]"
                  }`}
                >
                  <Icon icon={w.icon} size={16} className={active === w.id ? "text-brand-600" : "text-zinc-400"} />
                  {w.nav}
                </a>
              ))}
            </aside>

            <div className="flex flex-col">
              {WORKLOADS.map((w, i) => (
                <section
                  key={w.id}
                  id={w.id}
                  className={`relative z-0 flex scroll-mt-header flex-col gap-7 pb-[88px] ${i === 0 ? "pt-14" : "pt-20"}`}
                >
                  {i % 2 === 1 && (
                    <div aria-hidden="true" className="absolute inset-y-0 -left-[100vw] -right-[100vw] -z-10 bg-zinc-50" />
                  )}
                  {/* Watermark: the workload's icon, large and faint, so each section has its own silhouette */}
                  <div aria-hidden="true" className={`pointer-events-none absolute right-0 hidden text-brand-700 md:block ${i % 2 === 1 ? "opacity-[0.06]" : "opacity-[0.08]"} ${i === 0 ? "top-24" : "top-[120px]"}`}>
                    <Icon icon={w.icon} size={160} weight="regular" />
                  </div>
                  <div className="flex max-w-[640px] flex-col gap-3.5">
                    <SectionHeading>{w.title}</SectionHeading>
                    <SectionSub maxWidth={640}>{w.body}</SectionSub>
                  </div>
                  <FeatureList items={w.points} className="max-w-[560px]" />
                  <FlowCard from={w.from} steps={w.steps} note={<>{w.note} $0 egress subject to fair use.</>} />
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <TextLink href={signupUrl()} tone="brand" onClick={() => trackCtaClick("Start with 1 TB free", signupUrl(), "secondary")}>
                      Start with 1 TB free →
                    </TextLink>
                    <TextLink href={DOCS_URL} external onClick={() => trackDocsClick(DOCS_URL)}>
                      Read the docs ↗
                    </TextLink>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* The pattern: one storage class, every workload */}
        <section className="mt-2 w-full border-y border-brand-500/[0.12] bg-brand-50 px-5 py-20 md:px-8">
          <div className="mx-auto flex w-full max-w-container flex-col gap-10">
            <div className="flex max-w-[700px] flex-col gap-3.5">
              <SectionLabel>
                <span className="text-brand-600">The pattern</span>
              </SectionLabel>
              <SectionHeading size="text-h2 md:text-h1">
                One storage class.
                <br />
                <span className="text-brand-500">Every workload.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                The same bucket, the same price and the same speed, whether it holds checkpoints, a data lake, backups, footage or logs.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PATTERN.map(({ figure, label }) => (
                <div key={figure} className="flex flex-col gap-2 rounded-2xl border border-brand-500/[0.18] bg-white p-6 shadow-elevated">
                  <span className="font-display text-[30px] font-medium leading-none tracking-[-0.02em] text-zinc-950">{figure}</span>
                  <span className="font-sans text-[14px] leading-[1.4] text-zinc-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-24" />
        <CtaBanner
          image="window"
          heading="Bring a workload."
          headingMaxWidth={560}
          subheadMaxWidth={460}
          subhead="1 TB free for 30 days, no credit card. Not sure which fits? Talk to an engineer."
          cta={{ label: "Start for free", href: signupUrl(), onClick: () => trackCtaClick("Start for free", signupUrl(), "primary") }}
          secondaryCta={{ label: "Talk to an engineer", href: CONTACT_HREF, onClick: () => trackCtaClick("Talk to an engineer", CONTACT_HREF, "secondary") }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default WorkloadsPage;
