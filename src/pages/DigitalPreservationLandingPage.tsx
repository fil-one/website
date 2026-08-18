import { ShieldCheck, ChartLine, ArrowsOut, Database } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// Preservation comparison scenario: 10 TB collection, one full fixity review per year, amortized monthly.
// AWS S3 Standard: storage 10,240 GB x $0.023/GB ~= $236/mo. Fixity read: 10 TB x $0.09/GB egress
//   ~= $900/yr ~= $75/mo. All-in ~= $311/mo.
// AWS Glacier Deep Archive: storage 10,240 GB x $0.00099/GB ~= $10/mo. Fixity read: 10 TB x
//   ($0.02 retrieval + $0.09 egress) ~= $1,100/yr ~= $92/mo. All-in ~= $102/mo.
// Wasabi: $6.99/TB = $70/mo, no retrieval/egress. Fil One: $4.99/TB = $50/mo, no retrieval/egress.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Preservation you can afford to check",
    description: `Flat ${PRICE_PER_TB_SHORT} digital preservation storage. No retrieval fees, no egress — run fixity checks as often as your program requires. S3-compatible.`,
    canonical: "https://www.fil.one/lp/digital-preservation",
  },

  hero: {
    badge: "For libraries, archives & memory institutions",
    titleMaxWidth: 820,
    descriptionMaxWidth: 580,
    title: (
      <>
        Preservation you can
        <br />
        <span className="text-brand-500">afford to check.</span>
      </>
    ),
    description: `Run fixity checks as often as you want — reading the collection back costs $0, so verification isn't rationed to once a year. Built in at ${PRICE_PER_TB_SHORT} flat.`,
    ctas: [
      { label: "Start for free", href: SIGNUP_URL, variant: "primary" },
      { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The preservation gap",
    heading: "A fixity report is a snapshot. Decay doesn't wait for the next one.",
    sub: "Preservation depends on knowing the files are unchanged. Most storage makes checking expensive, so programs check once a year instead of continuously. Neither the gap nor the bill belongs in a serious archival program.",
    subMaxWidth: 620,
    items: [
      {
        label: "The annual blind spot",
        tone: "warning",
        catch: "A year is a long time to not know.",
        body: "A once-a-year fixity review confirms integrity on the day it runs. For the other 364 days the collection is unchecked. A problem that lands in month two surfaces ten months later — if the next review even catches it.",
      },
      {
        label: "The cost of checking",
        tone: "danger",
        catch: "Verifying your archive is a metered read.",
        body: "On metered tiers, every fixity review is a full-collection read priced per GB in retrieval and egress. The more thoroughly you preserve, the more it costs to check it — so teams check less than they should.",
      },
      {
        label: "The format you cannot open",
        tone: "brand",
        catch: "Proprietary tiers complicate the future.",
        body: "Preservation is measured in decades. Storage tiers with restore delays, retrieval classes, and per-request semantics add operational risk to a workload whose entire point is to be simple, readable, and intact far into the future.",
      },
    ],
  },

  comparison: {
    label: "The comparison",
    heading: (
      <>
        10 TB collection. <span className="text-brand-500">One fixity review a year — or as often as you want.</span>
      </>
    ),
    sub: "Same preservation workload, four providers. Monthly storage plus the cost of reading the collection back to check it.",
    subMaxWidth: 640,
    caption: "Monthly storage and amortized annual fixity-read cost, by provider",
    columns: [
      { key: "storage", header: "Storage 10 TB/mo" },
      { key: "egress", header: "Retrieval + egress", colorByValue: true },
      { key: "allIn", header: "All-in / mo", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$236", egress: "~$75", allIn: "$311" } },
      { provider: "AWS Glacier Deep Archive", values: { storage: "$10", egress: "~$92", allIn: "$102" } },
      { provider: "Wasabi", values: { storage: "$70", egress: "$0", allIn: "$70" } },
      { provider: "Fil One", isFilOne: true, values: { storage: "$50", egress: "$0", allIn: "$50" } },
    ],
    footnote:
      "Scenario: 10 TB collection with one full fixity read per year, amortized monthly. AWS S3 Standard: ≈$236/mo storage ($0.023/GB) + ≈$75/mo amortized fixity (10 TB × $0.09/GB egress per year) ≈ $311/mo. AWS Glacier Deep Archive: ≈$10/mo storage ($0.00099/GB) + ≈$92/mo amortized fixity (10 TB × ($0.02 retrieval + $0.09 egress)/GB per year) ≈ $102/mo. Wasabi: $6.99/TB = $70/mo, no egress. Fil One: $4.99/TB = $50/mo, $0 egress. AWS and Wasabi rates from public US price cards, Q2 2026; figures indicative and rounded.",
  },

  features: {
    label: "Preservation built for checking",
    heading: <>Reading included. <span className="text-brand-500">Checking costs nothing.</span></>,
    sub: "Free reads, no archive-tier wait, and standard S3 tooling — so fixity checks stop being an annual event.",
    items: [
      {
        icon: ShieldCheck,
        title: "Free fixity checks, any time",
        desc: "Reading the collection back to re-verify checksums costs $0 in egress. Run fixity reviews as often as your program requires, not once a year.",
      },
      {
        icon: ChartLine,
        title: "No archive-tier wait",
        desc: "Objects are readable the instant you request them — no rehydration delay before a fixity check or an access request can run.",
      },
      {
        icon: Database,
        title: "S3-compatible",
        desc: "Standard GetObject, PutObject, and multipart transfer. Preservation tools, BagIt workflows, and repository software that speak S3 connect without modification.",
      },
      {
        icon: ArrowsOut,
        title: "Object Lock for compliance",
        desc: "Configure retention from 1 day to 100 years at the bucket level, for collections that must not be altered or deleted early.",
      },
    ],
  },

  cta: {
    heading: "Preservation you can afford to check.",
    subhead: "Free 1 TB evaluation. Write a collection and read it back to check it — at zero retrieval cost.",
    cta: { label: "Start for free", href: SIGNUP_URL },
    secondaryCta: { label: "Talk to an expert", href: SALES_URL },
    note: TAGLINE,
  },
};

const DigitalPreservationLandingPage = () => <LandingPage config={config} />;

export default DigitalPreservationLandingPage;
