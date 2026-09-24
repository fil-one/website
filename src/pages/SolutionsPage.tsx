import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ArrowUpRight, Check } from "@phosphor-icons/react";
import backupArt from "@/assets/illustrations/workloads/01-backup-disaster-recovery.svg";
import aiArt from "@/assets/illustrations/workloads/02-ai-training-checkpoints.svg";
import mediaArt from "@/assets/illustrations/workloads/03-media-archive.svg";
import researchArt from "@/assets/illustrations/workloads/04-research-residency.svg";
import logsArt from "@/assets/illustrations/workloads/05-logs-retention.svg";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/Button";
import Hero from "@/components/Hero";
import Icon from "@/components/Icon";
import ProofBar from "@/components/ProofBar";
import TextLink from "@/components/TextLink";
import IntegrationsSection from "@/components/IntegrationsSection";
import CostCalculatorSection from "@/components/CostCalculatorSection";
import Step from "@/components/Step";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { trackCtaClick } from "@/lib/analytics";
import { COMPETITORS, PRICE_DISPLAY, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SIGNUP_URL = signupUrl();
const DOCS_URL = "https://docs.fil.one";

/**
 * Workloads, shown one at a time as tabs. Each id doubles as a URL hash, so
 * the retired /solutions/* URLs (redirected to /solutions#<id>) open the
 * matching tab.
 */
const WORKLOADS = [
  {
    id: "backup",
    art: backupArt,
    tab: "Backup and DR",
    title: "Backup and disaster recovery",
    body: "A drill or a real recovery pulls everything back out, and elsewhere that is billed per GB. Here reads are free, and object lock keeps backups from being deleted before their term is up.",
    points: [
      "Object lock in governance or compliance mode",
      "Version history in versioned buckets",
      "Restores and drills bill nothing extra",
    ],
  },
  {
    id: "ai",
    art: aiArt,
    tab: "AI training data",
    title: "AI training data and checkpoints",
    body: "Training loops read the same data over and over, often from GPUs in another cloud. The rate stays flat whether you read a dataset once or a hundred times.",
    points: [
      "Move data to GPUs in any cloud, egress free",
      "Multipart upload for large artifacts",
      "Works with any S3-compatible loader",
    ],
  },
  {
    id: "media",
    art: mediaArt,
    tab: "Media and archive",
    title: "Media and long-term archive",
    body: "There is one storage class at one price, so nothing to rehydrate and no retrieval fee. Share a cut with a presigned link that expires within seven days.",
    points: [
      "No retrieval fees and no rehydration wait",
      "Presigned download links, private bucket",
      "Same price for archive and active files",
    ],
  },
  {
    id: "research",
    art: researchArt,
    tab: "Research data",
    title: "Research and residency-sensitive data",
    body: "Choose Europe (France) or US East (Michigan) when you create a bucket. The region is fixed from then on, and each access key works in one region only.",
    points: [
      "Region chosen per bucket, more on the way",
      "Access keys scoped to one region",
      "Raw and derived data at the same flat rate",
    ],
  },
  {
    id: "logs",
    art: logsArt,
    tab: "Logs and retention",
    title: "Logs, telemetry, and retention",
    body: "Logs are billed per TB stored, with no charge per request on the way in or out. When records must survive a fixed term, create the bucket with object lock and a retention period.",
    points: [
      "No per-request charge on writes or reads",
      "Retention periods from days to years",
      "Audit log of console activity, exportable as CSV",
    ],
  },
];

/** The workload named by the URL hash, if it names one. */
const workloadFromHash = () => {
  if (typeof window === "undefined") return undefined;
  const hash = window.location.hash.slice(1);
  return WORKLOADS.some(({ id }) => id === hash) ? hash : undefined;
};

const STEPS = [
  {
    number: "01",
    title: "Create a bucket",
    body: "Pick the region, and turn on versioning and object lock if the workload needs them. Both are set at creation.",
  },
  {
    number: "02",
    title: "Mint a scoped key",
    body: "Grant one bucket or all of them, only the operations that service needs, with an expiry date if it should lapse.",
  },
  {
    number: "03",
    title: "Point your tools at it",
    body: "Your region's S3 endpoint with path-style addressing. No SDK to swap and no rewrite.",
  },
  {
    number: "04",
    title: "Move the data",
    body: "rclone, the AWS CLI, or any S3 library. Multipart upload handles the large objects.",
  },
];

const SolutionsPage = () => {
  const { heroEndRef } = useScrollTracking();
  const { ref: workloadsRef, inView: workloadsInView } = useInView({ threshold: 0.03 });
  // Start on the first tab so the prerendered HTML and the first client render
  // match; the effect below then applies any #hash from the URL.
  const [activeWorkload, setActiveWorkload] = useState(WORKLOADS[0].id);

  // Follow the initial hash, in-page hash links, and back/forward to the matching tab.
  useEffect(() => {
    const onHashChange = () => {
      const id = workloadFromHash();
      if (id) setActiveWorkload(id);
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // On narrow screens the tab track scrolls sideways; keep the selected tab in
  // view. Scrolls only the track, never the page.
  const tabTrackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = tabTrackRef.current;
    const tab = track?.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
    if (!track || !tab || track.scrollWidth <= track.clientWidth) return;
    const trackBox = track.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    track.scrollLeft += tabBox.left - trackBox.left - (trackBox.width - tabBox.width) / 2;
  }, [activeWorkload]);

  // Sliding pill behind the active tab. Measured from the tab itself so it
  // tracks font loading and resizes; null until measured (tab keeps its own bg).
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  useLayoutEffect(() => {
    const track = tabTrackRef.current;
    const measure = () => {
      const tab = track?.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
      if (tab) setPill({ left: tab.offsetLeft, width: tab.offsetWidth });
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    track?.querySelectorAll('[role="tab"]').forEach((tab) => observer.observe(tab));
    return () => observer.disconnect();
  }, [activeWorkload]);

  // When the track overflows, fade whichever edge has hidden tabs so the cut
  // reads as "scroll for more" rather than a clipped layout.
  const [edgeFade, setEdgeFade] = useState({ left: false, right: false });
  useEffect(() => {
    const track = tabTrackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setEdgeFade({ left: track.scrollLeft > 1, right: track.scrollLeft < max - 1 });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const FADE = "40px";
  const trackMask = `linear-gradient(to right, ${edgeFade.left ? "transparent" : "#000"}, #000 ${FADE}, #000 calc(100% - ${FADE}), ${
    edgeFade.right ? "transparent" : "#000"
  })`;

  // Keep the URL shareable without jumping the page.
  const selectWorkload = (id: string) => {
    setActiveWorkload(id);
    window.history.replaceState(null, "", `#${id}`);
  };
  const { ref: stepsRef, inView: stepsInView } = useInView({ threshold: 0.05 });

  useSeo();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <Hero
          glow
          grid
          titleSize="text-[30px] sm:text-[38px] md:text-[50px]"
          title={<>Storage for <span className="whitespace-nowrap text-gradient-flow">every workload</span></>}
          description="From backups and AI training data to media archives, research data, and logs, every workload runs on the same S3-compatible buckets at one flat rate per TB."
          titleMaxWidth={760}
          descriptionMaxWidth={640}
          contentClassName="pb-16 md:pb-20"
          tagline="1 TB free for 30 days · No credit card required"
          ctas={[
            {
              label: "Start for free",
              href: SIGNUP_URL,
              variant: "primary",
              size: "lg",
              glow: true,
              onClick: () => trackCtaClick("Start for free", SIGNUP_URL, "primary"),
            },
          ]}
        />

        <div ref={heroEndRef}>
          <ProofBar
            items={[
              "S3-compatible API",
              `${PRICE_DISPLAY} / TB / month`,
              "No egress fees",
              "Europe or US East, more regions soon",
            ]}
          />
        </div>

        {/* Workloads */}
        <section className="w-full bg-white px-5 md:px-8 py-24 md:py-32">
          <div className="mx-auto flex w-full max-w-container flex-col gap-14 md:gap-16">
            <div className="flex flex-col items-center gap-3 text-center">
              <SectionLabel>Workloads</SectionLabel>
              <SectionHeading maxWidth={620}>Find your workload</SectionHeading>
              <SectionSub maxWidth={620}>
                Same buckets, same flat rate, no egress fees.
              </SectionSub>
            </div>

            {/* Hash targets for /solutions#<id> links, landing just above the tabs. The tabs pull up by one gap (-mt) so this empty row adds no space. */}
            <div className="relative">
              {WORKLOADS.map(({ id }) => (
                <span key={id} id={id} className="absolute -top-28" aria-hidden="true" />
              ))}
            </div>

            <TabsPrimitive.Root
              ref={workloadsRef}
              value={activeWorkload}
              onValueChange={selectWorkload}
              className={`-mt-14 flex flex-col gap-8 md:-mt-16 reveal${workloadsInView ? " in-view" : ""}`}
            >
              {/* Segmented control: one track, the active tab lifts onto it. Scrolls sideways on narrow screens instead of wrapping. */}
              {/* mx-auto (not justify-center) centres the track when it fits and lets it scroll from its first tab when it doesn't */}
              <div
                ref={tabTrackRef}
                className="-mx-5 flex overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
                style={{ maskImage: trackMask, WebkitMaskImage: trackMask }}
              >
                <TabsPrimitive.List
                  aria-label="Workloads"
                  className="relative mx-auto inline-flex shrink-0 gap-1 rounded-full border border-black/[0.06] bg-zinc-100/80 p-1"
                >
                  {pill && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-1 left-0 rounded-full bg-white shadow-elevated-sm ring-1 ring-black/[0.05] transition-[transform,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                      style={{ width: pill.width, transform: `translateX(${pill.left}px)` }}
                    />
                  )}
                  {WORKLOADS.map(({ id, tab }) => (
                    <TabsPrimitive.Trigger
                      key={id}
                      value={id}
                      className={`relative whitespace-nowrap rounded-full px-4 py-1.5 font-sans text-[13.5px] font-medium text-zinc-600 transition-colors duration-200 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 data-[state=active]:text-zinc-950 ${
                        pill ? "" : "data-[state=active]:bg-white data-[state=active]:shadow-elevated-sm data-[state=active]:ring-1 data-[state=active]:ring-black/[0.05]"
                      }`}
                    >
                      {tab}
                    </TabsPrimitive.Trigger>
                  ))}
                </TabsPrimitive.List>
              </div>

              {WORKLOADS.map(({ id, title, body, points, art }) => (
                <TabsPrimitive.Content
                  key={id}
                  value={id}
                  className="grid grid-cols-1 overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-1 data-[state=active]:duration-300 motion-reduce:animate-none lg:grid-cols-2"
                >
                  <div className="flex flex-col gap-6 p-8 md:p-10">
                    <div className="flex flex-col gap-3">
                      <h3 className="m-0 font-display text-[24px] font-medium leading-[1.25] tracking-[-0.02em] text-zinc-950 md:text-[28px]">
                        {title}
                      </h3>
                      <p className="m-0 max-w-[520px] text-pretty font-sans text-[15px] font-normal leading-[1.65] text-zinc-500">{body}</p>
                    </div>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                      {points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <Icon icon={Check} size={15} weight="bold" className="mt-[3px] shrink-0 text-brand-600" aria-hidden="true" />
                          <span className="text-pretty font-sans text-[14.5px] leading-[1.5] text-zinc-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Decorative workload art; the image is absolutely positioned so the text sets the card height */}
                  <div className="p-3 pt-0 md:p-4 md:pt-0 lg:pl-0 lg:pt-4">
                    <div className="relative h-full min-h-[240px] overflow-hidden rounded-2xl border border-black/[0.05] bg-[#F6F6F7] bg-illustration-panel">
                      <img src={art} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 block h-full w-full select-none object-contain" />
                    </div>
                  </div>
                </TabsPrimitive.Content>
              ))}
            </TabsPrimitive.Root>

            <p className="m-0 text-center font-sans text-[14px] text-zinc-500">
              Running a GPU cloud?{" "}
              <TextLink href="/neocloud" tone="brand" arrow onClick={() => trackCtaClick("Neoclouds", "/neocloud", "secondary")}>
                See how neoclouds use Fil One
              </TextLink>
            </p>
          </div>
        </section>

        <IntegrationsSection tone="grey" description="S3 API compatible. The backup, media, and ML tools you run today already know how to talk to it." />

        <CostCalculatorSection id="calculator" competitors={COMPETITORS} />

        {/* Getting started */}
        <section className="w-full border-y border-zinc-100 bg-zinc-50 px-5 md:px-8 py-24 md:py-32">
          <div className="mx-auto flex w-full max-w-container flex-col gap-12 items-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <SectionLabel>Getting started</SectionLabel>
              <SectionHeading>Up and running in four steps</SectionHeading>
              <SectionSub maxWidth={520}>
                Whether you are starting fresh or moving data from another provider, all you need
                are the S3 tools you already use.
              </SectionSub>
            </div>
            <div
              ref={stepsRef}
              className={`grid w-full grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-0 reveal${
                stepsInView ? " in-view" : ""
              }`}
            >
              {STEPS.map(({ number, title, body }) => (
                <Step
                  key={number}
                  number={number}
                  title={title}
                  description={body}
                  divided
                />
              ))}
            </div>
            <Button
              variant="secondary"
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick("Read the docs", DOCS_URL, "secondary")}
            >
              Read the docs
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </Button>
          </div>
        </section>

        <FaqSection />

        <CtaBanner
          heading="Stop paying to read your own data"
          headingMaxWidth={640}
          subhead="1 TB free for 30 days, with 2 TB of egress and no credit card."
          cta={{
            label: "Start for free",
            href: SIGNUP_URL,
            onClick: () => trackCtaClick("Start for free", SIGNUP_URL, "primary"),
          }}
          note={`S3-compatible · ${PRICE_PER_TB_MONTH} · Europe or US East`}
        />

      </main>
      <Footer />
    </div>
  );
};

export default SolutionsPage;
