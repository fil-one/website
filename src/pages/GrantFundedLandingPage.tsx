import { CurrencyDollar, Wallet, Clock, Database } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "@/components/LandingPage";
import { COMPETITORS, PRICE_PER_TB, PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";

/** Whole-dollar display for a monthly total, e.g. 29.95 -> "$30". */
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const WASABI_PER_TB = COMPETITORS.find((c) => c.name === "Wasabi")!.storagePricePerTB;
const WASABI_5TB = usd(5 * WASABI_PER_TB);
const FIL_ONE_5TB = usd(5 * PRICE_PER_TB);

const TAGLINE = "No credit card required · No retrieval fees · Connects in minutes";

// Grant comparison scenario: 5 TB of research data, one annual review, amortized monthly.
// AWS S3 Standard: storage 5,120 GB x $0.023/GB ~= $118/mo. Annual review: 5 TB x $0.09/GB
//   egress ~= $461/yr ~= $38/mo. All-in ~= $156/mo.
// AWS Glacier Deep Archive: storage 5,120 GB x $0.00099/GB ~= $5/mo. Annual review: 5 TB x
//   ($0.02 retrieval + $0.09 egress) ~= $563/yr ~= $47/mo. All-in ~= $52/mo.
// Wasabi: 5 TB x its COMPETITORS rate, no retrieval/egress. Fil One: 5 TB x PRICE_PER_TB, no retrieval/egress/exit fees.
const config: LandingPageConfig = {
  seo: {
    title: "Fil One · Storage that outlives the grant cycle",
    description: `Flat ${PRICE_PER_TB_SHORT} research data storage with no exit fees. Predictable for multi-year grants, S3-compatible.`,
    canonical: "https://www.fil.one/lp/grant-funded",
  },

  hero: {
    badge: "For grant-funded research",
    titleMaxWidth: 820,
    descriptionMaxWidth: 580,
    title: (
      <>
        Storage that outlives
        <br />
        <span className="text-brand-500">the grant cycle</span>
      </>
    ),
    description: `Flat ${PRICE_PER_TB_SHORT}. A cost you can write into a data management plan and trust to hold. No exit or retrieval fees.`,
    ctas: [
      { label: "Start for free", href: signupUrl(), variant: "primary" },
      { label: "Talk to sales", href: SALES_URL, variant: "secondary" },
    ],
    tagline: TAGLINE,
  },

  problem: {
    label: "The funding mismatch",
    heading: "The grant has an end date. The retention requirement does not.",
    sub: "Funders want data kept for years after the award closes. But the budget is fixed, the costs are variable, and the bill keeps arriving long after the grant period ends.",
    subMaxWidth: 620,
    items: [
      {
        label: "The budget you cannot forecast",
        tone: "warning",
        catch: "Variable costs, fixed award.",
        body: "A data-management plan needs a storage number that holds for the life of the grant. Metered tiers with egress and retrieval charges produce a bill that moves with usage, impossible to commit to in a proposal written years in advance.",
      },
      {
        label: "The cost after the money",
        tone: "danger",
        catch: "Retention outlasts the funding.",
        body: "Funders increasingly require data kept for five to ten years after a grant closes. The award covers a fraction of that. Whatever storage you choose has to stay cheap and accessible long after the grant line is closed.",
      },
      {
        label: "The toll to leave",
        tone: "brand",
        catch: "Moving the data costs money.",
        body: "When the project ends, and data migrates to an institutional or disciplinary repository, retrieval fees turn the handover into an unbudgeted expense, charged precisely when every dollar has been spoken for.",
      },
    ],
  },

  comparison: {
    label: "The comparison",
    heading: (
      <>
        5 TB of data. <span className="text-brand-500">One review a year.</span>
      </>
    ),
    sub: "Same dataset, same annual read-back, four providers. Monthly storage, the cost to read it back, and the all-in number you would put in the budget.",
    subMaxWidth: 640,
    caption: "Monthly storage and amortized annual read-back cost, by provider",
    columns: [
      { key: "storage", header: "Storage 5 TB/mo" },
      { key: "egress", header: "Retrieval + egress", colorByValue: true },
      { key: "allIn", header: "All-in / mo", total: true },
    ],
    rows: [
      { provider: "AWS S3 Standard", values: { storage: "$118", egress: "~$38/mo", allIn: "$156" } },
      { provider: "AWS Glacier Deep Archive", values: { storage: "$5", egress: "~$47/mo", allIn: "$52" } },
      { provider: "Wasabi", values: { storage: WASABI_5TB, egress: "$0", allIn: WASABI_5TB } },
      { provider: "Fil One", isFilOne: true, values: { storage: FIL_ONE_5TB, egress: "$0", allIn: FIL_ONE_5TB } },
    ],
    footnote:
      `Scenario: 5 TB of research data with one annual read-back, amortized monthly. AWS S3 Standard: ≈$118/mo storage ($0.023/GB) + ≈$38/mo amortized read-back (5 TB × $0.09/GB egress per year) ≈ $156/mo. AWS Glacier Deep Archive: ≈$5/mo storage ($0.00099/GB) + ≈$47/mo amortized read-back (5 TB × ($0.02 retrieval + $0.09 egress)/GB per year) ≈ $52/mo. Wasabi: $${WASABI_PER_TB}/TB = ${WASABI_5TB}/mo, no egress. Fil One: ${PRICE_PER_TB_SHORT} = ${FIL_ONE_5TB}/mo, $0 egress, no exit fees. AWS rates from public eu-west-1 price cards, Q2 2026; Wasabi from its public price card. Figures indicative and rounded.`,
  },

  features: {
    label: "Built for the long award",
    heading: <><span className="text-brand-500">One number for the budget.</span> Accessible for the duration.</>,
    sub: "A flat rate, no exit fees, and no archive-tier wait, for data that has to outlast the grant that funded it.",
    items: [
      {
        icon: CurrencyDollar,
        title: "Predictable flat rate",
        desc: `${PRICE_PER_TB_MONTH}, flat. A number you can write into a data management plan and a multi-year budget and trust to hold up.`,
      },
      {
        icon: Wallet,
        title: "No exit fees",
        desc: "Leaving costs nothing. When the grant ends or the data moves to an institutional repository, you read everything back at $0. No invoice on the way out.",
      },
      {
        icon: Clock,
        title: "No archive-tier wait",
        desc: "Objects are readable the instant they're requested, with no rehydration delay for whoever inherits the data after the grant closes.",
      },
      {
        icon: Database,
        title: "S3-compatible",
        desc: "Standard S3 API. The tools, scripts, and repository software your project already uses connect without modification, and so will whoever inherits the data later.",
      },
    ],
  },

  cta: {
    heading: "A number that outlives the award.",
    subhead: "Free 1 TB evaluation. Put a flat, predictable storage line in your next data management plan.",
    cta: { label: "Start for free", href: signupUrl() },
    secondaryCta: { label: "Talk to sales", href: SALES_URL },
    note: TAGLINE,
  },
};

const GrantFundedLandingPage = () => <LandingPage config={config} />;

export default GrantFundedLandingPage;
