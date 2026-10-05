import { ArrowsOut, Clock, ShieldCheck } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No retrieval fees · S3-compatible";

/** Whole-dollar amount, e.g. "$1,178". */
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Restore without the retrieval bill",
    description: `S3-compatible backup target at ${PRICE_PER_TB_SHORT} flat. No retrieval fees. No egress. Object Lock and versioning included. Restore with the S3 tools your backup software already uses.`,
    canonical: "https://www.fil.one/lp/backup-dr",
  },

  hero: {
    badge: "For backup and DR teams",
    titleMaxWidth: 760,
    descriptionMaxWidth: 560,
    title: (
      <>
        Restore without the
        <br />
        <span className="text-brand-500">retrieval bill</span>
      </>
    ),
    description: `Flat ${PRICE_PER_TB_SHORT}. No retrieval fees, no egress, no archive-tier wait. A hot, S3-compatible backup target you can actually afford to restore from.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to sales", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The trap",
    heading: "A backup you can't afford to restore isn't a backup.",
    sub: "Archive tiers win the storage-cost slide and lose the restore-cost conversation. By the time you need them, the bill is a new procurement event, the wait is measured in hours, and the DR drill nobody ran last quarter is now today's incident.",
    items: [
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
        body: "S3 Standard restores instantly, and bills $90 per TB on the way out. A full-region restore on a 50 TB workload is several thousand dollars in egress alone, on top of the monthly storage line that was already the largest in your S3 invoice.",
      },
      {
        label: "Untested DR plans",
        tone: "danger",
        catch: "Drills get skipped because they cost.",
        body: "Each drill is a charge. So drills slip. The runbook ages. The exact path that runs at 3am is the one path nobody has run, on the cloud, with the current bucket layout, since the last reorg. The DR plan exists only on paper.",
      },
    ],
  },

  // Scenario: 50 TB retained for DR, plus one full restore of a 5 TB workload
  // to recover from a failed primary. The restore column collapses storage +
  // retrieval + egress for that one event. AWS eu-west-1 list rates, September 2026:
  // S3 Standard 51,200 GB x $0.023 = $1,178; restore 5,120 GB x $0.09 = $461.
  // Glacier Instant 51,200 x $0.004 = $205; restore 5,120 x ($0.03 + $0.09) = $614.
  // Deep Archive 51,200 x $0.00099 = $51; restore 5,120 x ($0.02 + $0.09) = $563.
  // Wasabi 50 x $7.99 = $400. Fil One 50 x PRICE_PER_TB.
  comparison: {
    label: "The comparison",
    heading: (
      <>
        Hold 50 TB. <span className="text-brand-500">Restore 5 TB.</span>
      </>
    ),
    sub: "Standard DR scenario. The cheap-to-store columns get expensive the day you actually need the data.",
    subMaxWidth: 640,
    caption: "Monthly storage cost and one-off 5 TB restore cost for a 50 TB DR workload, by provider",
    columns: [
      { key: "tier", header: "Tier" },
      { key: "storage", header: "Storage / mo" },
      { key: "restore", header: "5 TB restore", colorByValue: true },
      { key: "catch", header: "Catch", note: true },
    ],
    rows: [
      {
        provider: "AWS S3 Standard",
        values: { tier: "Hot", storage: "$1,178", restore: "$461", catch: "Egress on every restore" },
      },
      {
        provider: "AWS Glacier Instant",
        values: { tier: "Cold (instant)", storage: "$205", restore: "$614", catch: "Retrieval + egress fees" },
      },
      {
        provider: "AWS Glacier Deep Archive",
        values: { tier: "Archive", storage: "$51", restore: "$563", catch: "+12 h restore wait" },
      },
      {
        provider: "Wasabi",
        values: { tier: "Hot", storage: "$400", restore: "$0", catch: "90-day minimum retention" },
      },
      {
        provider: "Fil One",
        isFilOne: true,
        values: { tier: "Hot", storage: usd(50 * PRICE_PER_TB), restore: "$0", catch: "No retrieval. No egress." },
      },
    ],
    footnote:
      "AWS S3 Standard, Glacier Instant Retrieval, and Deep Archive list rates for eu-west-1, September 2026. Restore line combines retrieval + egress for one 5 TB pull. Wasabi at $7.99/TB, assuming its 90-day minimum retention is met. Fil One is a flat-rate hot tier with no separate restore line.",
  },

  workloads: {
    label: "What you can actually do",
    heading: "Backups you'll test. Restores you'll trust.",
    sub: "A backup target priced like cold storage and behaving like hot storage.",
    subMaxWidth: 500,
    items: [
      {
        tag: "Full-region restore",
        title: "Recover a workload when the primary is gone",
        desc: "Pull every byte back. Standard S3 GET. No retrieval line item, no egress charge. The bill for the worst day is the same as the bill for any other day.",
        stats: [
          {
            label: "5 TB full restore",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "S3 Glacier", val: "$614" },
            ],
          },
        ],
        speedBadge: "Restore is a GET, not a procurement event.",
        savingsBadge: "$0 per restore",
      },
      {
        tag: "Quarterly DR drills",
        title: "Test the restore plan as often as it should be tested",
        desc: "Most DR plans go untested because each drill costs real money. Free retrieval means quarterly (or monthly) drills cost what they should: nothing.",
        stats: [
          {
            label: "Cost per drill (1 TB pull)",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "S3 Glacier", val: "$123" },
            ],
          },
          {
            label: "Annualized (4 drills)",
            rows: [
              { name: "Fil One", val: "$0", win: true },
              { name: "S3 Glacier", val: "$492" },
            ],
          },
        ],
        speedBadge: "Run drills until the runbook is right.",
        savingsBadge: "Test it for free",
      },
      {
        tag: "Granular file-level recovery",
        title: "Pull back a single file without a retrieval ticket",
        desc: "Tape and archive tiers tax small restores the same as full ones. Hot, S3-compatible storage means a single file recovery is a single GET, for $0.",
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
        tag: "Object Lock and retention",
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
    ],
  },

  metrics: {
    label: "Restore performance",
    heading: "Hot tier, not archive.",
    sub: "A backup target you can restore from at production read speed, using the same S3 SDK your backup software already speaks.",
    subMaxWidth: 600,
    items: [
      {
        icon: Clock,
        label: "Restore latency",
        value: "{{NEEDS PROOF: measured restore latency to first byte}}",
        note: "Standard S3 GET. No thaw, no retrieval queue.",
      },
      {
        icon: ArrowsOut,
        label: "Restore throughput",
        value: "{{NEEDS PROOF: measured restore throughput per client}}",
        note: "Parallel-read friendly. Saturates a tuned S3 client.",
      },
      {
        icon: ShieldCheck,
        label: "Object Lock and versioning",
        value: "Available",
        note: "Compliance and Governance modes. Per-object retention.",
      },
    ],
  },

  cta: {
    heading: "A backup target you'll actually test.",
    subhead: "Free 1 TB evaluation. Point Veeam, Restic, MSP360, or any S3 client at the endpoint.",
    headingMaxWidth: 560,
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to sales", href: SALES_URL },
    note: TAGLINE,
  },
};

const BackupDrLandingPage = () => <LandingPage config={config} />;

export default BackupDrLandingPage;
