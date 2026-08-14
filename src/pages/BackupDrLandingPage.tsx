import { ArrowsOut, Clock, ShieldCheck } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import Hero from "@/components/Hero";
import Pill from "@/components/Pill";
import ProblemCards, { type ProblemCard } from "@/components/ProblemCards";
import PriceComparisonTable, {
  type PriceComparisonColumn,
  type PriceComparisonRow,
} from "@/components/PriceComparisonTable";
import MetricBars, { type MetricBarGroup } from "@/components/MetricBars";
import MetricCard from "@/components/MetricCard";
import CtaBanner from "@/components/CtaBanner";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No retrieval fees · S3-compatible";

const HERO_CTAS = [
  { label: "Start for free", href: SIGNUP_URL, variant: "primary" as const },
  { label: "Talk to an expert", href: SALES_URL, variant: "secondary" as const },
];

const PROBLEMS: ProblemCard[] = [
  {
    label: "Archive tiers",
    tone: "warning",
    catch: "The bill arrives when you need the data.",
    body: "S3 Glacier Deep Archive holds bytes at under $1 per TB-month. Beautiful invoice. Then the actual restore is $20 per TB retrieved, plus $90 per TB egress, plus a 12-hour wait. You priced the storage and bought the worst day of your year.",
  },
  {
    label: "Hot tiers",
    tone: "brand",
    catch: "Restore costs the same as everyday reads.",
    body: "S3 Standard restores instantly — and bills $90 per TB on the way out. A full-region restore on a 50 TB workload is several thousand dollars in egress alone, on top of the monthly storage line that was already the largest in your S3 invoice.",
  },
  {
    label: "Untested DR plans",
    tone: "danger",
    catch: "Drills get skipped because they cost.",
    body: "Each drill is a charge. So drills slip. The runbook ages. The exact path that runs at 3am is the one path nobody has run, on the cloud, with the current bucket layout, since the last reorg. The DR plan exists only on paper.",
  },
];

// Scenario: 50 TB retained for DR, plus one full restore of a 5 TB workload to
// recover from a failed primary. Restore line collapses storage + retrieval +
// egress for that one event.
const COMPARISON_COLUMNS: PriceComparisonColumn[] = [
  { key: "tier", header: "Tier" },
  { key: "storage", header: "Storage / mo" },
  { key: "restore", header: "5 TB restore", colorByValue: true },
  { key: "catch", header: "Catch", note: true },
];

const COMPARISON_ROWS: PriceComparisonRow[] = [
  {
    provider: "AWS S3 Standard",
    values: { tier: "Hot", storage: "$1,178", restore: "$461", catch: "Egress on every restore" },
  },
  {
    provider: "AWS Glacier Instant",
    values: { tier: "Cold (instant)", storage: "$205", restore: "$512", catch: "Retrieval + egress fees" },
  },
  {
    provider: "AWS Glacier Deep Archive",
    values: { tier: "Archive", storage: "$51", restore: "$563", catch: "+12 h restore wait" },
  },
  {
    provider: "Wasabi",
    values: { tier: "Hot", storage: "$350", restore: "$0", catch: "90-day minimum retention" },
  },
  {
    provider: "Fil One",
    isFilOne: true,
    values: { tier: "Hot", storage: "$250", restore: "$0", catch: "No retrieval. No egress." },
  },
];

interface Workload {
  tag: string;
  title: string;
  desc: string;
  stats: MetricBarGroup[];
  speedBadge: string;
  savingsBadge: string;
}

const WORKLOADS: Workload[] = [
  {
    tag: "Full-region restore",
    title: "Recover a workload when the primary is gone",
    desc: "Pull every byte back. Standard S3 GET. No retrieval line item, no egress charge — the bill for the worst day is the same as the bill for any other day.",
    stats: [
      {
        label: "5 TB full restore",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "S3 Glacier", val: "$512" },
        ],
      },
    ],
    speedBadge: "Restore is a GET, not a procurement event.",
    savingsBadge: "$0 per restore",
  },
  {
    tag: "Quarterly DR drills",
    title: "Test the restore plan as often as it should be tested",
    desc: "Most DR plans go untested because each drill costs real money. Free retrieval means quarterly — or monthly — drills cost what they should: nothing.",
    stats: [
      {
        label: "Cost per drill (1 TB pull)",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "S3 Glacier", val: "$102" },
        ],
      },
      {
        label: "Annualised (4 drills)",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "S3 Glacier", val: "$410" },
        ],
      },
    ],
    speedBadge: "Run drills until the runbook is right.",
    savingsBadge: "Test it for free",
  },
  {
    tag: "Granular file-level recovery",
    title: "Pull back a single file without a retrieval ticket",
    desc: "Tape and archive tiers tax small restores the same as full ones. Hot, S3-compatible storage means a single file recovery is a single GET — for $0.",
    stats: [
      {
        label: "1 GB single-file restore",
        rows: [
          { name: "Fil One", val: "$0", win: true },
          { name: "S3 Glacier Deep", val: "$0.11" },
        ],
      },
    ],
    speedBadge: "Recovery without a retrieval workflow.",
    savingsBadge: "Hot tier pricing",
  },
  {
    tag: "Object Lock & retention",
    title: "Compliance and ransomware protections, built in",
    desc: "Object Lock in Compliance or Governance mode. Per-object retention periods. Versioning. Ransomware can't overwrite or delete what is locked.",
    stats: [
      {
        label: "Lock modes",
        rows: [
          { name: "Fil One", val: "Both", win: true },
          { name: "S3 Standard", val: "Both" },
        ],
      },
      {
        label: "Retention granularity",
        rows: [
          { name: "Fil One", val: "Per-object", win: true },
          { name: "S3 Standard", val: "Per-object" },
        ],
      },
    ],
    speedBadge: "Same lock primitives as S3.",
    savingsBadge: "Audit-ready",
  },
];

const RESTORE_METRICS = [
  {
    icon: Clock,
    label: "Restore latency",
    value: "{{NEEDS PROOF: measured restore latency to first byte}}",
    note: "Standard S3 GET — no thaw, no retrieval queue.",
  },
  {
    icon: ArrowsOut,
    label: "Restore throughput",
    value: "{{NEEDS PROOF: measured restore throughput per client}}",
    note: "Parallel-read friendly. Saturates a tuned S3 client.",
  },
  {
    icon: ShieldCheck,
    label: "Object Lock & versioning",
    value: "Available",
    note: "Compliance and Governance modes. Per-object retention.",
  },
];

const BackupDrLandingPage = () => {
  useSeo({
    title: "Fil One · Restore without the retrieval bill",
    description:
      `S3-compatible backup target at ${PRICE_PER_TB_SHORT} flat. No retrieval fees. No egress. Object Lock and versioning included. Restore with the S3 tools your backup software already uses.`,
    canonical: "https://www.fil.one/lp/backup-dr",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.05 });
  const { ref: workloadsRef, inView: workloadsInView } = useInView({ threshold: 0.05 });
  const { ref: restoreRef, inView: restoreInView } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Hero
          glow
          grid
          badge={<Pill wrap>For backup &amp; DR owners tired of retrieval invoices</Pill>}
          titleSize="text-[30px] sm:text-[38px] md:text-[54px]"
          titleMaxWidth={760}
          descriptionMaxWidth={560}
          contentClassName="pb-20 md:pb-28"
          title={
            <>
              Restore without the
              <br />
              <span className="text-brand-500">retrieval bill.</span>
            </>
          }
          description={`Flat ${PRICE_PER_TB_SHORT}. No retrieval fees, no egress, no archive-tier wait. A hot, S3-compatible backup target you can actually afford to restore from.`}
          ctas={HERO_CTAS}
          tagline={TAGLINE}
        />

        {/* ── Problem — the restore tax ────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full bg-zinc-50">
          <div
            ref={problemRef}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${problemInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>The trap</SectionLabel>
              <SectionHeading>A backup you can't afford to restore isn't a backup.</SectionHeading>
              <SectionSub>
                Archive tiers win the storage-cost slide and lose the restore-cost conversation. By the time you need
                them, the bill is a new procurement event, the wait is measured in hours, and the DR drill nobody ran
                last quarter is now today's incident.
              </SectionSub>
            </div>

            <ProblemCards items={PROBLEMS} />
          </div>
        </section>

        {/* ── Comparison — restore is the column that matters ──────────────── */}
        <section id="compare" className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={pricingRef}
            className={`flex flex-col gap-8 w-full max-w-container mx-auto reveal${pricingInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>The comparison</SectionLabel>
              <SectionHeading>
                Hold 50 TB. <span className="text-brand-500">Restore 5 TB.</span>
              </SectionHeading>
              <SectionSub maxWidth={640}>
                Standard DR scenario. The cheap-to-store columns get expensive the day you actually need the data.
              </SectionSub>
            </div>

            <PriceComparisonTable
              columns={COMPARISON_COLUMNS}
              rows={COMPARISON_ROWS}
              caption="Monthly storage cost and one-off 5 TB restore cost for a 50 TB DR workload, by provider"
              footnote="AWS S3 Standard, Glacier Instant Retrieval, and Deep Archive rates from public US Q2 2026 rate cards. Restore line combines retrieval + egress for one 5 TB pull. Wasabi pricing assumes 90-day minimum retention met. Fil One is a flat-rate hot tier — no separate restore line."
            />
          </div>
        </section>

        {/* ── Workloads ────────────────────────────────────────────────────── */}
        <section id="workloads" className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50">
          <div
            ref={workloadsRef}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${workloadsInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>What you can actually do</SectionLabel>
              <SectionHeading>Backups you'll test. Restores you'll trust.</SectionHeading>
              <SectionSub maxWidth={500}>
                A backup target priced like cold storage and behaving like hot storage.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WORKLOADS.map((workload, i) => (
                <div
                  key={workload.tag}
                  className={`flex flex-col overflow-hidden rounded-[20px] border border-black/[0.07] bg-white shadow-elevated reveal${workloadsInView ? " in-view" : ""}`}
                  style={{ transitionDelay: workloadsInView ? `${i * 70}ms` : "0ms" }}
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
              ))}
            </div>
          </div>
        </section>

        {/* ── Restore performance ──────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={restoreRef}
            className={`flex flex-col gap-8 w-full max-w-container mx-auto reveal${restoreInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Restore performance</SectionLabel>
              <SectionHeading>Hot tier, not archive.</SectionHeading>
              <SectionSub maxWidth={600}>
                A backup target you can restore from at production read speed, using the same S3 SDK your backup
                software already speaks.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[960px] mx-auto">
              {RESTORE_METRICS.map(({ icon, label, value, note }) => (
                <MetricCard key={label} icon={icon} label={label} value={value} note={note} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Dark CTA ─────────────────────────────────────────────────────── */}
        <CtaBanner
          heading="A backup target you'll actually test."
          subhead="Free 1 TB evaluation. Point Veeam, Restic, MSP360, or any S3 client at the endpoint."
          headingMaxWidth={560}
          cta={{ label: "Start for free", href: SIGNUP_URL }}
          secondaryCta={{ label: "Talk to an expert", href: SALES_URL }}
          note={TAGLINE}
        />
      </main>

      <Footer />
    </div>
  );
};

export default BackupDrLandingPage;
