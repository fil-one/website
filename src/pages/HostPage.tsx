import { Gauge, ArrowLineRight, Target, MapPin, Globe, HardDrives, Code, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/Button";
import Icon from "@/components/Icon";
import IconTile from "@/components/IconTile";
import SpaceCard from "@/components/SpaceCard";
import ZoneDiagram from "@/components/ZoneDiagram";
import ProofStrip from "@/components/ProofStrip";
import CtaBanner from "@/components/CtaBanner";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";
import drivesRack from "../assets/drives-rack.webp";

/** The neocloud form. */
export const HOST_APPLY_HREF = "/host/apply";

const PROBLEMS: { icon: PhosphorIcon; title: string; body: string }[] = [
  { icon: Gauge, title: "Scratch is priced for the run", body: "A growing share of what sits on your most expensive storage hasn't been read in weeks." },
  { icon: ArrowLineRight, title: "Nowhere else to go", body: "So customers move it to a hyperscaler or another cloud, and the storage revenue goes with them." },
  { icon: Target, title: "Disks are scarce", body: "High-capacity drives are on allocation, with long lead times. Build your own tier and you wait on hardware while demand walks out the door." },
];

const PRODUCT: { icon: PhosphorIcon; title: string; body: string }[] = [
  { icon: MapPin, title: "Local", body: "In your building, on a cross-connect. Under 1 ms to your compute, so data parked between runs stays close and bills as yours." },
  { icon: Globe, title: "Regional", body: "Erasure coded across several data centers, so data survives a site loss. Keeps each tenant in-jurisdiction and still bills as yours." },
  { icon: HardDrives, title: "We fund the hardware", body: "Our drives, racks and operations. No capex, no drive lead times, no new hires." },
  { icon: Code, title: "S3 as they know it", body: "Standard S3 API and tools. Per-tenant keys and usage metering feed your billing. Nothing to rewrite." },
];

const COMMERCIALS: [string, string][] = [
  ["Your brand", "on the console, the docs and the S3 endpoint"],
  ["Per-tenant keys and RBAC:", "no customer reaches another's data"],
  ["Per-bucket metering", "exported into your billing system"],
  ["Partner API", "to provision tenants from your own tools"],
  ["SSO", "through your identity provider"],
];

const STEPS: [string, string, string][] = [
  ["01", "Pick the workload", "One cluster, one bucket pattern, agreed numbers."],
  ["02", "Regional endpoint live", "A tenant on our nearest site while we survey yours. Measure throughput and egress saved."],
  ["03", "Go live locally", "If the numbers hold, we rack the Capacity tier in your building."],
  ["04", "Start earning", "Sell it under your brand. Storage revenue that used to leave now shows up on your invoice."],
];

const LEDGER: [string, string][] = [
  ["Datasets and checkpoints read back", "100 TB / mo"],
  ["Hyperscaler egress, public list", "$0.09 / GB"],
  ["Egress alone, per month", "≈ $9,000"],
  ["Per year, before a byte of storage", "≈ $108,000"],
];

const HostPage = () => {
  useSeo();
  const problem = useInView({ threshold: 0.05 });
  const product = useInView({ threshold: 0.05 });
  const egress = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PlatformNavbar contactSalesHref={HOST_APPLY_HREF} />
      <main id="main-content">
        {/* Hero: pitch left, the building schematic right */}
        <section className="relative isolate w-full overflow-hidden pt-header md:pt-header-md">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-blue-halo" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 [mask-image:theme(backgroundImage.hero-grid-mask)] [-webkit-mask-image:theme(backgroundImage.hero-grid-mask)]"
            style={{ backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`, backgroundSize: "60px 60px", backgroundPosition: "center top" }}
          />
          <div className="mx-auto grid w-full max-w-container grid-cols-1 items-center gap-10 px-5 pb-16 pt-14 md:px-8 md:pt-20 lg:grid-cols-[1fr_600px] lg:gap-12">
            <div className="flex flex-col gap-5 hero-fade-1">
              <SectionLabel>Neoclouds and data centers</SectionLabel>
              <h1 className="m-0 font-display text-h1 font-medium leading-[1.08] tracking-[-0.025em] text-zinc-950 md:text-[52px]">
                Extend your cloud.
                <br />
                <span className="text-brand-500">Sell the storage.</span>
              </h1>
              <SectionSub maxWidth={460}>
                We put S3 object storage in your data center. You sell it to your customers inside your own product, right next to your compute.
              </SectionSub>
              <div className="mt-1.5 flex flex-wrap items-center gap-3">
                <Button variant="primary" glow href={HOST_APPLY_HREF} onClick={() => trackCtaClick("Talk to an engineer", HOST_APPLY_HREF, "primary")}>
                  Talk to an engineer
                </Button>
                <Button variant="secondary" href="#how">
                  How it works
                </Button>
              </div>
            </div>
            <div className="hero-fade-2">
              <ZoneDiagram />
            </div>
          </div>
        </section>

        {/* Proof strip */}
        <div className="w-full px-5 pb-20 md:px-8">
          <div className="mx-auto w-full max-w-container border-t border-black/[0.08] pt-7">
            <ProofStrip
              className="max-w-[900px]"
              items={[
                { figure: "<1 ms", label: "To your compute, on a cross-connect" },
                { figure: "Your price", label: "Resell under your brand, keep the spread" },
                { figure: "$0 capex", label: "We fund, rack and run the hardware" },
              ]}
            />
          </div>
        </div>

        {/* The problem — the page's dark card */}
        <div className="w-full px-5 md:px-8">
          <div ref={problem.ref} className={`mx-auto w-full max-w-container reveal${problem.inView ? " in-view" : ""}`}>
            <SpaceCard>
              <div className="flex flex-col gap-12">
                <div className="flex max-w-[760px] flex-col gap-4">
                  <SectionLabel tone="dark">The problem</SectionLabel>
                  <SectionHeading tone="dark" size="text-h2 md:text-h1">
                    Scratch is too expensive
                    <br />
                    <span className="text-brand-400">to park data between runs.</span>
                  </SectionHeading>
                  <SectionSub tone="dark">
                    WEKA, VAST and local NVMe are priced for the run in flight. Without a cheaper tier in your building, data waiting on the next job ends up leaving.
                  </SectionSub>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {PROBLEMS.map(({ icon, title, body }) => (
                    <div key={title} className="flex flex-col gap-[18px] rounded-2xl border border-white/[0.14] bg-white/[0.05] p-7">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-500/[0.16] text-white shadow-[inset_0_0_0_1px_rgba(56,166,255,0.35)]">
                        <Icon icon={icon} size={24} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="m-0 font-sans text-[18px] font-medium leading-[1.3] text-white">{title}</h3>
                        <p className="m-0 font-sans text-body-sm leading-[1.6] text-white/65">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpaceCard>
          </div>
        </div>

        {/* The product */}
        <section id="how" className="w-full scroll-mt-header px-5 py-24 md:px-8">
          <div ref={product.ref} className={`mx-auto flex w-full max-w-container flex-col gap-10 reveal${product.inView ? " in-view" : ""}`}>
            <div className="flex max-w-[760px] flex-col gap-3.5">
              <SectionLabel>The product</SectionLabel>
              <SectionHeading size="text-h2 md:text-h1">Object storage built to be resold.</SectionHeading>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCT.map(({ icon, title, body }) => (
                <div key={title} className="flex flex-col gap-4 rounded-2xl border border-black/[0.07] bg-white p-7 shadow-elevated">
                  <IconTile icon={icon} size="lg" />
                  <div className="flex flex-col gap-2">
                    <h3 className="m-0 font-sans text-body-lg font-medium leading-[1.3] text-zinc-950">{title}</h3>
                    <p className="m-0 font-sans text-[14px] leading-[1.6] text-zinc-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The egress meter goes to zero — the deep-blue drive card */}
        <div className="w-full px-5 md:px-8">
          <div
            ref={egress.ref}
            className={`relative mx-auto w-full max-w-container overflow-hidden rounded-3xl bg-brand-700 bg-cover reveal${egress.inView ? " in-view" : ""}`}
            style={{ backgroundImage: `url(${drivesRack})`, backgroundPosition: "center 30%" }}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-drives-tint" />
            <div className="relative grid grid-cols-1 items-center gap-10 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col gap-5">
                <SectionLabel tone="dark">Today · read back from another region</SectionLabel>
                <SectionHeading tone="dark" size="text-h2 md:text-h1">The egress meter goes to zero.</SectionHeading>
                <div className="flex flex-col border-t border-white/20">
                  {LEDGER.map(([a, b], i) => (
                    <div key={a} className="flex items-baseline justify-between gap-6 border-b border-white/[0.14] py-3">
                      <span className="font-sans text-body-sm text-white/[0.78]">{a}</span>
                      <span className={`font-mono font-medium text-white ${i === 3 ? "text-[20px]" : "text-[15px]"}`}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-[20px] border border-white/[0.14] bg-space/55 p-8 backdrop-blur-[6px] md:p-10">
                <SectionLabel tone="dark">
                  <span className="text-brand-300">On a cross-connect in your own building</span>
                </SectionLabel>
                <span className="font-display text-[72px] font-medium leading-[0.95] text-white md:text-[88px]">$0</span>
                <p className="m-0 font-sans text-[16px] leading-[1.6] text-white/[0.82]">
                  in egress. Scratch holds the working set it was bought for, and the same 100 TB becomes a line on your invoice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The commercials */}
        <section className="w-full px-5 pb-24 pt-[104px] md:px-8">
          <div className="mx-auto grid w-full max-w-container grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-3.5">
              <SectionLabel>The commercials</SectionLabel>
              <SectionHeading size="text-h2 md:text-h1">
                You sell it.
                <br />
                You price it.
              </SectionHeading>
              <SectionSub>
                We bill you one wholesale rate per terabyte, with no egress or retrieval component. You set the retail price your customers see and keep the spread.
              </SectionSub>
            </div>
            <div className="flex flex-col pt-2">
              <span className="pb-2.5">
                <SectionLabel>White label, end to end</SectionLabel>
              </span>
              {COMMERCIALS.map(([a, b]) => (
                <div key={a} className="flex items-start gap-2.5 border-b border-black/[0.07] py-2.5 font-sans text-body leading-[1.55] text-zinc-700">
                  <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-brand-500/40 bg-brand-50 text-brand-600">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.5 8.5l2.3 2.3L11.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span>
                    <strong className="font-medium text-zinc-950">{a}</strong> {b}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The pilot */}
        <section className="w-full border-y border-zinc-100 bg-zinc-50 px-5 py-24 md:px-8">
          <div className="mx-auto flex w-full max-w-container flex-col gap-10">
            <div className="flex max-w-[760px] flex-col gap-3.5">
              <SectionLabel>The pilot</SectionLabel>
              <SectionHeading size="text-h2 md:text-h1">One workload. One site. Start earning.</SectionHeading>
              <SectionSub>Pick the workload that annoys you most: checkpoint sprawl, dataset reloads, a backup target you overpay for.</SectionSub>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map(([n, a, b]) => (
                <div key={n} className="flex flex-col gap-2.5 border-t border-black/10 pt-5">
                  <span className="font-mono text-[12px] font-medium tracking-[0.08em] text-brand-600">{n}</span>
                  <h3 className="m-0 font-sans text-[18px] font-medium leading-[1.3] text-zinc-950">{a}</h3>
                  <p className="m-0 font-sans text-[14px] leading-[1.6] text-zinc-600">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-24" />
        <CtaBanner
          image="window"
          heading="Be first in your region."
          headingMaxWidth={560}
          subheadMaxWidth={560}
          subhead="We are expanding the network now. The first partner in a region helps shape how its zone is built. All we need to start: a name on the workload, and an hour with the infra team that owns it."
          cta={{ label: "Talk to an engineer", href: HOST_APPLY_HREF, onClick: () => trackCtaClick("Talk to an engineer", HOST_APPLY_HREF, "primary") }}
          secondaryCta={{ label: "How it works", href: "#how" }}
        />
      </main>
      <Footer contactSalesHref={HOST_APPLY_HREF} />
    </div>
  );
};

export default HostPage;
