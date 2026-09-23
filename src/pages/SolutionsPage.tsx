import {
  ShieldCheck,
  Brain,
  FilmSlate,
  Cube,
  Flask,
  ListMagnifyingGlass,
  ArrowRight,
  CurrencyDollar,
  ArrowsLeftRight,
  Plugs,
  Lock,
  Key,
  Globe,
} from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Icon from "@/components/Icon";
import IconTile from "@/components/IconTile";
import ProofBar from "@/components/ProofBar";
import FeatureCard from "@/components/FeatureCard";
import Step from "@/components/Step";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { trackCtaClick } from "@/lib/analytics";
import { PRICE_DISPLAY, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SIGNUP_URL = signupUrl();
const DOCS_URL = "https://docs.fil.one";

/**
 * Workloads, each anchored so the retired /solutions/* URLs can redirect
 * straight to the section that replaced them.
 */
const WORKLOADS = [
  {
    id: "backup",
    icon: ShieldCheck,
    title: "Backup and disaster recovery",
    body: "Write backups to a bucket with versioning and object lock, set when you create it. Under compliance retention, an object cannot be overwritten or deleted before its term is up, by anyone holding your keys. Restores carry no egress charge, so a recovery drill costs the same as not running one.",
    points: [
      "Object lock in governance or compliance mode",
      "Version history on every object",
      "Restores and drills bill nothing extra",
    ],
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI training data and checkpoints",
    body: "Keep datasets, checkpoints, and model artifacts in buckets your training code already knows how to read. Reading the same corpus for every epoch, or pulling it across to rented GPU capacity somewhere else, does not add a line to the bill. Large objects go up with multipart upload.",
    points: [
      "Flat rate whether you read a corpus once or a hundred times",
      "Multipart upload for large artifacts",
      "Works with any S3-compatible loader",
    ],
  },
  {
    id: "media",
    icon: FilmSlate,
    title: "Media and long-term archive",
    body: "One storage class at one price. There is no cold tier, so nothing to rehydrate, no retrieval fee, and no minimum storage duration to plan around. Send a client a cut with a presigned link that expires on your schedule, up to seven days, instead of opening the bucket.",
    points: [
      "No retrieval fees and no rehydration wait",
      "Presigned download links, private bucket",
      "Same price for archive and active files",
    ],
  },
  {
    id: "apps",
    icon: Cube,
    title: "Application and platform storage",
    body: "User uploads, exports, and everything else your product keeps. Point your SDK at a regional endpoint with path-style addressing and keep the code you have. Buckets stay private, and you hand out access with time-limited presigned URLs rather than public objects.",
    points: [
      "S3 API with path-style addressing",
      "Presigned URLs for uploads and downloads",
      "Per-bucket keys for each service you run",
    ],
  },
  {
    id: "research",
    icon: Flask,
    title: "Research and regulated datasets",
    body: "Choose Europe (France) or US East (Michigan) when you create a bucket, with more regions on the way. The region is fixed from that moment, and an access key works in one region only, so where a dataset lives is a property of the bucket rather than a policy someone has to remember.",
    points: [
      "Region chosen per bucket, more on the way",
      "Access keys scoped to one region",
      "Raw and derived data at the same flat rate",
    ],
  },
  {
    id: "logs",
    icon: ListMagnifyingGlass,
    title: "Logs, telemetry, and retention",
    body: "Retention that does not get more expensive the longer you hold it. Logs and telemetry are billed per TB stored, with nothing charged per request on the way in or out. When the data has to survive for a fixed term, create the bucket with object lock and a retention period.",
    points: [
      "No per-request charge on writes or reads",
      "Retention periods from days to years",
      "Audit log of console activity, exportable as CSV",
    ],
  },
];

/** What holds true in every bucket, whichever workload brought you here. */
const PLATFORM = [
  {
    icon: CurrencyDollar,
    title: "One line on the bill",
    description: `Storage is the only thing metered, at ${PRICE_PER_TB_MONTH}. No request charges, no tier to choose, no minimum storage duration.`,
  },
  {
    icon: ArrowsLeftRight,
    title: "No egress fees",
    description: "Data out to the internet, to another cloud, or back to your own servers is not billed, at any volume.",
  },
  {
    icon: Plugs,
    title: "The S3 API you already use",
    description: "Keep your SDK or CLI. Point it at your region's endpoint, switch on path-style addressing, and carry on.",
  },
  {
    icon: Lock,
    title: "Object lock and versioning",
    description: "Governance or compliance retention plus version history, chosen when the bucket is created.",
  },
  {
    icon: Key,
    title: "Keys scoped to the job",
    description: "Give a key one bucket or all of them, read, write, list, or delete, and an expiry date if it should not outlive the task.",
  },
  {
    icon: Globe,
    title: "You pick the region",
    description: "Europe (France) or US East (Michigan), decided per bucket and fixed from then on. More regions are on the way.",
  },
];

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
  const { ref: platformRef, inView: platformInView } = useInView({ threshold: 0.05 });
  const { ref: stepsRef, inView: stepsInView } = useInView({ threshold: 0.05 });

  useSeo({
    title: "Solutions · Fil One",
    description:
      `Backups, training data, archives, app storage, research data, and logs on one S3-compatible platform. Flat ${PRICE_PER_TB_MONTH}, no egress fees, EU or US regions.`,
    canonical: "https://www.fil.one/solutions",
    ogImage: "https://www.fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <Hero
          glow
          grid
          titleSize="text-[30px] sm:text-[38px] md:text-[50px]"
          title={<>One bucket, <span className="text-brand-500">every workload</span></>}
          description="Backups, training sets, archives, app data, research, and logs. The same flat rate per TB, the same S3 API, and no egress fees whichever one you came for."
          titleMaxWidth={640}
          descriptionMaxWidth={560}
          contentClassName="pb-16 md:pb-20"
          tagline="1 TB free for 30 days · No credit card required · No egress fees"
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
              "Europe or US East",
            ]}
          />
        </div>

        {/* Workloads */}
        <section className="w-full bg-white px-5 md:px-8 py-24 md:py-32">
          <div className="mx-auto flex w-full max-w-container flex-col gap-14 md:gap-16">
            <div className="flex flex-col items-center gap-3 text-center">
              <SectionLabel>Workloads</SectionLabel>
              <SectionHeading maxWidth={620}>What teams keep here</SectionHeading>
              <SectionSub maxWidth={560}>
                Six patterns that share one trait: the data is large, it gets read back, and the
                reading is what makes it expensive somewhere else.
              </SectionSub>
            </div>

            <div ref={workloadsRef} className="grid grid-cols-1 gap-5 lg:grid-cols-2 reveal-group">
              {WORKLOADS.map(({ id, icon, title, body, points }) => (
                <article
                  key={id}
                  id={id}
                  className={`flex scroll-mt-28 flex-col gap-4 rounded-2xl border border-black/[0.07] bg-white p-7 shadow-elevated reveal${
                    workloadsInView ? " in-view" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconTile icon={icon} size={20} className="h-11 w-11" />
                    <h3 className="m-0 font-display text-[18px] font-medium leading-[1.3] tracking-[-0.015em] text-zinc-950">
                      {title}
                    </h3>
                  </div>
                  <p className="m-0 font-sans text-[14px] font-normal leading-[1.65] text-zinc-500">
                    {body}
                  </p>
                  <ul className="m-0 mt-auto flex list-none flex-col gap-2 p-0 pt-1">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                        <span className="font-sans text-[13.5px] leading-[1.5] text-zinc-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Platform */}
        <section className="w-full bg-zinc-50 px-5 md:px-8 py-24 md:py-32">
          <div className="mx-auto flex w-full max-w-container flex-col gap-14 md:gap-16">
            <div className="flex flex-col items-center gap-3 text-center">
              <SectionLabel>Every bucket</SectionLabel>
              <SectionHeading maxWidth={620}>The same platform underneath</SectionHeading>
            </div>
            <div
              ref={platformRef}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 reveal-group"
            >
              {PLATFORM.map(({ icon, title, description }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={description}
                  className={`reveal${platformInView ? " in-view" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How to start */}
        <section className="w-full border-y border-zinc-200 bg-white px-5 md:px-8 py-24 md:py-32">
          <div className="mx-auto flex w-full max-w-container flex-col gap-12 items-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <SectionLabel>Getting started</SectionLabel>
              <SectionHeading>Four steps, whichever workload</SectionHeading>
            </div>
            <div
              ref={stepsRef}
              className={`grid w-full grid-cols-1 divide-y divide-zinc-200 lg:grid-cols-4 lg:divide-x lg:divide-y-0 reveal${
                stepsInView ? " in-view" : ""
              }`}
            >
              {STEPS.map(({ number, title, body }) => (
                <Step
                  key={number}
                  number={number}
                  title={title}
                  description={body}
                  className="py-8 first:pt-0 last:pb-0 lg:py-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
                />
              ))}
            </div>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-[14px] font-medium text-brand-500 no-underline transition-opacity hover:opacity-70"
              onClick={() => trackCtaClick("Read the docs", DOCS_URL, "secondary")}
            >
              Read the docs
              <Icon icon={ArrowRight} size={14} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </section>

        <FaqSection include={[
          "Is Fil One compatible with my existing tools?",
          "How do I migrate from AWS / Azure / Google Cloud?",
          "Where is my data stored?",
          "What counts as egress?",
          "How is my bill calculated, and is there a minimum charge?",
          "Do you offer annual or reserved capacity plans?",
        ]} />

        <CtaBanner
          heading="Start with the workload that hurts most"
          subhead="1 TB free for 30 days, with 2 TB of egress and no credit card. Move one bucket and compare the bill."
          cta={{
            label: "Start for free",
            href: SIGNUP_URL,
            onClick: () => trackCtaClick("Start for free", SIGNUP_URL, "primary"),
          }}
          secondaryCta={{
            label: "Talk to sales",
            href: "/contact-sales",
            onClick: () => trackCtaClick("Talk to sales", "/contact-sales", "secondary"),
          }}
          note={`S3-compatible · ${PRICE_PER_TB_MONTH} · Europe or US East`}
        />

      </main>
      <Footer />
    </div>
  );
};

export default SolutionsPage;
