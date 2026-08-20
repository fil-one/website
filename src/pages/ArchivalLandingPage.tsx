import { ShieldCheck, ArrowsOut, ChartLine, Database } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No retrieval fees · Connects in minutes";

// Archive comparison scenario: 100 TB stored, one 10 TB restore per year (~853 GB/month).
// AWS S3 Standard: $0.023/GB storage = $2,304/month (tiered); 10 TB restore = 10,240 GB x $0.09 = $922.
// AWS Glacier Instant: storage 102,400 x $0.023 = $2,355; 10 TB restore = 10,240 x ($0.03+$0.09) = $1,229.
// AWS Glacier Deep Archive: storage 102,400 x $0.00099 = $101; 10 TB restore = 10,240 x ($0.02+$0.09) = $1,126.
// Wasabi: $6.99/TB = $699/month, $0 retrieval. Fil One: $4.99/TB = $499/month, $0 retrieval.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Know your archive works before you need it",
    description: `Flat ${PRICE_PER_TB_SHORT} archival storage with no retrieval fees or egress. Test a restore any time — the bill doesn't change.`,
    canonical: "https://www.fil.one/lp/archival",
  },

  hero: {
    badge: "For long-retention archive owners",
    titleMaxWidth: 800,
    descriptionMaxWidth: 580,
    title: (
      <>
        Know your archive works
        <br />
        <span className="text-brand-500">before you need it.</span>
      </>
    ),
    description: `Flat ${PRICE_PER_TB_SHORT}. No egress, no retrieval tax — so testing a restore doesn't cost you anything extra.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "Two problems",
    heading: "Archives go untested, and the retrieval bill is a surprise.",
    sub: "Standard archive storage gives you low write cost and a retrieval fee every time you check on it. Neither makes for a serious long-retention plan.",
    items: [
      {
        label: "The untested archive",
        tone: "warning",
        catch: "Nobody tests a restore that costs money.",
        body: "Retrieval fees turn a routine restore drill into a budget request. Most archives are never actually restored until the day they're needed — by then, a broken export script or a misconfigured lifecycle rule is a crisis, not a fire drill.",
      },
      {
        label: "The retrieval penalty",
        tone: "danger",
        catch: "Testing your archive costs money.",
        body: "Glacier-tier storage charges per-GB retrieval plus egress on every restore. A single annual test of 10 TB costs over $1,000 on AWS. Teams stop testing their archives — not because they do not need to, but because the bill makes them.",
      },
      {
        label: "The day-you-need-it cost",
        tone: "brand",
        catch: "Disaster recovery events are expensive on metered tiers.",
        body: "A large restore event — the one you actually need the archive for — is a large retrieval and egress event. The cost arrives at the worst possible time. A flat-rate archive has no such moment.",
      },
    ],
  },

  comparison: {
    label: "The comparison",
    heading: (
      <>
        100 TB archive. <span className="text-brand-500">One 10 TB restore per year.</span>
      </>
    ),
    sub: "Same archive workload, five providers. Monthly storage cost and the cost of one annual 10 TB restore.",
    subMaxWidth: 620,
    caption: "Monthly storage and annual 10 TB restore cost, by provider",
    columns: [
      { key: "storage", header: "100 TB / mo" },
      { key: "rate", header: "Retrieval + egress", colorByValue: true },
      { key: "restore", header: "Restore 10 TB", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$2,304", rate: "$0.09/GB egress", restore: "$922" } },
      { provider: "AWS Glacier Instant", values: { storage: "$2,355", rate: "$0.03 + $0.09/GB", restore: "$1,229" } },
      { provider: "AWS Glacier Deep Archive", values: { storage: "$101", rate: "$0.02 + $0.09/GB", restore: "$1,126" } },
      { provider: "Wasabi", values: { storage: "$699", rate: "$0", restore: "$0" } },
      { provider: "Fil One", isFilOne: true, values: { storage: "$499", rate: "$0", restore: "$0" } },
    ],
    footnote:
      "AWS S3 Standard and Glacier rates from public US rate card Q2 2026. S3 Standard storage: tiered $0.023/$0.022/GB; Glacier Instant $0.023/GB; Glacier Deep Archive $0.00099/GB. Retrieval: Deep Archive $0.02/GB + $0.09/GB egress. Restore cost computed: 10,240 GB × stated rates. Wasabi $6.99/TB. Fil One $4.99/TB, $0 retrieval, $0 egress.",
  },

  features: {
    label: "An archive you can afford to test",
    heading: (
      <>
        <span className="text-brand-500">Always restorable.</span> Retrieval included.
      </>
    ),
    sub: "No archive tier, no retrieval bill, no wait to get your data back.",
    items: [
      {
        icon: ShieldCheck,
        title: "No archive-tier wait",
        desc: "Objects are readable the instant you request them — no rehydration delay like Glacier's retrieval tiers. A restore starts immediately.",
      },
      {
        icon: ArrowsOut,
        title: "No retrieval tax",
        desc: "$0 to read back the archive. Restore testing, partial recovery, and audit reads are included in flat storage pricing.",
      },
      {
        icon: Database,
        title: "Object Lock for compliance",
        desc: "Configure retention from 1 day to 100 years at the bucket level, for records that must not be altered or deleted early.",
      },
      {
        icon: ChartLine,
        title: "S3-compatible restore",
        desc: "Standard GetObject and multipart download. Any tool that reads S3 restores from Fil One without modification.",
      },
    ],
  },

  cta: {
    heading: "An archive you can actually test.",
    subhead: "Free 1 TB evaluation. Write your archive and restore it — at zero retrieval cost.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const ArchivalLandingPage = () => <LandingPage config={config} />;

export default ArchivalLandingPage;
