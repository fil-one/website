import { Plug, ArrowsOut, Globe, ShieldCheck, Lock, ChartLine } from "@phosphor-icons/react";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import {
  LandingPage,
  LandingHero,
  LandingSection,
  SectionLabel,
  SectionHeading,
  SectionSub,
  ProblemCards,
  ComparisonTable,
  FeatureCards,
  WorkloadCards,
  IntegrationPills,
  DarkCtaBanner,
} from "@/components/landing";
import type {
  ProblemCard,
  FeatureCard,
  WorkloadCard,
  ComparisonColumn,
  ComparisonRow,
  HeroCta,
} from "@/components/landing";

// ─── Data ─────────────────────────────────────────────────────────────────────

const HERO_CTAS: HeroCta[] = [
  { label: "Try 30 days for free", href: "https://app.fil.one/login?screen_hint=signup", variant: "primary" },
  { label: "Talk to an expert", href: "/lp/barcelona/contacto", variant: "secondary" },
];

const PROBLEMS: ProblemCard[] = [
  {
    label: "Hyperscalers",
    catchLine: "Egress fees compound silently.",
    body: "AWS, Google Cloud, and Azure win the procurement conversation by default. Not because they offer the best value, but because nobody gets fired for picking them. A 10 TB Barcelona workload running on AWS eu-south-2 Madrid burns €790 a month in egress alone, and most teams never audit the line item until it is already out of hand.",
    footer: "Reliable, but the bill keeps growing.",
  },
  {
    label: "Budget alternatives",
    catchLine: "Performance and compliance both suffer.",
    body: "Wasabi and Backblaze undercut hyperscalers on storage, but neither runs an EU-sovereign region close to you. From Barcelona or Madrid, your traffic loops through Paris or Amsterdam. Latency goes up, GDPR posture gets murky, and your data sits outside European legal jurisdiction.",
    footer: "Cheaper storage, worse everything else.",
  },
  {
    label: "Doing nothing",
    catchLine: "Inertia is the most expensive option.",
    body: "Storage gets reviewed quarterly, if that. AWS billing is opaque by design, switching sounds risky on a Tuesday afternoon, and benchmarking takes time nobody has on the calendar. Meanwhile the 23× premium keeps compounding.",
    footer: "The bill is a line item nobody owns.",
  },
];

const PRICING_COLUMNS: ComparisonColumn[] = [
  { key: "provider", header: "Provider" },
  { key: "region", header: "Region" },
  { key: "storage", header: "Storage" },
  { key: "egress", header: "Egress" },
  { key: "api", header: "API / ops" },
  { key: "total", header: "Total / month" },
];

const PRICING_ROWS: ComparisonRow[] = [
  { provider: "AWS S3 Standard",      region: "eu-south-2 Madrid",          storage: "€197",    egress: "€790",   api: "€1.83", total: "€990"   },
  { provider: "Google Cloud Storage", region: "europe-southwest1 Madrid",   storage: "€171",    egress: "€1,052", api: "€1.83", total: "€1,226" },
  { provider: "Azure Blob",           region: "Spain Central Madrid",        storage: "€178",    egress: "€763",   api: "€1.89", total: "€943"   },
  { provider: "Wasabi",               region: "eu-west-2 Paris",            storage: "€59.90",  egress: "€0",     api: "€0",    total: "€59.90" },
  { provider: "Backblaze B2",         region: "eu-central-003 Amsterdam",   storage: "€59.60",  egress: "€0",     api: "€0",    total: "€59.60" },
  { provider: "Fil One",              region: "EU-West",                    storage: "€49.90",  egress: "€0",     api: "€0",    total: "€49.90", isFilOne: true },
];

const FEATURES: FeatureCard[] = [
  { icon: Plug,        title: "Drop-in S3 compatibility",    desc: "Same API, same SDKs, same tools. Point your existing workflow at our endpoint and keep shipping. No migration project." },
  { icon: ArrowsOut,   title: "Zero egress fees",            desc: "Client pulls, customer downloads, dashboard queries. Every read is included. Your bill stays flat at the end of a busy month." },
  { icon: Globe,       title: "European-native latency",     desc: "Under 15 ms from Barcelona, Madrid, Paris, and Milan. Matches AWS eu-south-2 Madrid round-trip, with EU data sovereignty and European legal jurisdiction by default." },
  { icon: ShieldCheck, title: "Eleven nines of durability",  desc: "Distributed storage across an independent provider network. Audit-ready proof that your bytes are intact, every day." },
  { icon: Lock,        title: "Object Lock and versioning",  desc: "Compliance and governance modes for backup targets. Retention periods. Tamper-evident audit logs. Ready for regulated data." },
  { icon: ChartLine,   title: "Predictable under load",      desc: "Line-rate ingest at 1.5 Gbps per client. Sustained parallel reads. Tight run-to-run variance so your pipelines stop guessing." },
];

const WORKLOADS: WorkloadCard[] = [
  {
    tag: "Creative and media",
    title: "Pull a 50 GB master into your NLE",
    desc: "Editors, colorists, and VFX artists load large project files straight into Premiere, DaVinci Resolve, and Nuke. Scrubbing and playback stay snappy.",
    stats: [
      { label: "Load time", rows: [{ name: "Fil One", val: "7 min", win: true }, { name: "AWS Madrid", val: "7 min", win: false }] },
      { label: "Monthly bill", rows: [{ name: "Fil One", val: "€50", win: true }, { name: "AWS Madrid", val: "€989", win: false }] },
    ],
    speedBadge: "Same speed your team already loves",
    savingsBadge: "23× cheaper",
  },
  {
    tag: "AI and ML",
    title: "Stream a 10 TB dataset, epoch after epoch",
    desc: "Foundation-model trainers, CV teams, and fine-tuning loops. Sustained parallel throughput across tens of thousands of shards without rate-limit surprises.",
    stats: [
      { label: "Time to stream one full epoch", rows: [{ name: "Fil One", val: "7 hr", win: true }, { name: "AWS Madrid", val: "11 hr", win: false }] },
      { label: "Monthly bill at training scale", rows: [{ name: "Fil One", val: "€100", win: true }, { name: "AWS Madrid", val: "€8,278", win: false }] },
    ],
    speedBadge: "Faster epochs. Almost no infra bill.",
    savingsBadge: "97× cheaper",
  },
  {
    tag: "SaaS and consumer apps",
    title: "Serve user media without watching the meter",
    desc: "Image platforms, DAM tools, document vaults, media-heavy consumer apps. Every customer request pulls bytes. Every pull is free.",
    stats: [
      { label: "Cost to serve 1M user fetches", rows: [{ name: "Fil One", val: "€0", win: true }, { name: "AWS Madrid", val: "€79", win: false }] },
      { label: "Monthly bill at consumer scale", rows: [{ name: "Fil One", val: "€25", win: true }, { name: "AWS Madrid", val: "€4,047", win: false }] },
    ],
    speedBadge: "Same snappy feel for your users.",
    savingsBadge: "189× cheaper",
  },
  {
    tag: "Backup and archive",
    title: "Ingest at line rate. Retrieve without penalty",
    desc: "MSPs, Veeam and Restic customers, photo archives, compliance retention. Object Lock in Compliance mode. Retrieval costs nothing.",
    stats: [
      { label: "Time to ingest 1 TB", rows: [{ name: "Fil One", val: "1.5 hr", win: true }, { name: "AWS Madrid", val: "2.2 hr", win: false }] },
      { label: "Monthly bill — 50 TB retention", rows: [{ name: "Fil One", val: "€250", win: true }, { name: "AWS Madrid", val: "€1,064", win: false }] },
    ],
    speedBadge: "Faster in. Free to pull out.",
    savingsBadge: "5× cheaper",
  },
];

const INTEGRATIONS = [
  "Iconik", "LucidLink", "Veeam", "Rclone", "Restic",
  "MSP360", "Premiere", "DaVinci Resolve", "Hugging Face",
  "PyTorch", "Arq", "Duplicati",
];

const CTA_BUTTONS: HeroCta[] = [
  { label: "Try 30 days for free", href: "https://app.fil.one/login?screen_hint=signup", variant: "primary" },
  { label: "Talk to an expert", href: "/lp/barcelona/contacto", variant: "secondary" },
];

// ─── Scatter chart (page-specific) ────────────────────────────────────────────

const ScatterChart = () => (
  <div
    style={{
      border: "1px solid rgba(0,0,0,0.07)",
      borderRadius: 16,
      padding: "20px 0 0",
      backgroundColor: "#FFFFFF",
      overflowX: "auto",
    }}
  >
    <svg
      viewBox="0 0 1000 548"
      style={{ width: "100%", minWidth: 560, display: "block" }}
      role="img"
      aria-label="Scatter chart: Fil One sits above the cost-performance frontier — fastest throughput at the lowest cost"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="filoneHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0090FF" stopOpacity="0.3" />
          <stop offset="55%"  stopColor="#0090FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0090FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="filoneZone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#0090FF" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#0090FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d="M 100 80 L 300 80 L 300 240 L 100 240 Z" fill="url(#filoneZone)" />

      <line x1="100" y1="80"  x2="100" y2="440" stroke="#E2E8F0" strokeWidth="1" />
      <line x1="100" y1="440" x2="940" y2="440" stroke="#E2E8F0" strokeWidth="1" />

      <line x1="100" y1="350" x2="940" y2="350" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="100" y1="260" x2="940" y2="260" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="100" y1="170" x2="940" y2="170" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />

      <line x1="242" y1="80" x2="242" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="430" y1="80" x2="430" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="572" y1="80" x2="572" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="714" y1="80" x2="714" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />

      <text x="100" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€5</text>
      <text x="242" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€10</text>
      <text x="430" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€25</text>
      <text x="572" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€50</text>
      <text x="714" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€100</text>
      <text x="940" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€300</text>

      <text x="88" y="444" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">0</text>
      <text x="88" y="354" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">100</text>
      <text x="88" y="264" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">200</text>
      <text x="88" y="174" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">300</text>
      <text x="88" y="84"  textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">400</text>

      <text x="520" y="500" textAnchor="middle" fill="#475569" fontSize="14" fontFamily="inherit" fontWeight="600">
        All-in cost per TB in € (storage + egress)
      </text>
      <text x="520" y="518" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="inherit">
        10 TB stored · 10 TB egress · Barcelona client
      </text>
      <text x="32" y="260" textAnchor="middle" fill="#475569" fontSize="14" fontFamily="inherit" fontWeight="600"
        transform="rotate(-90 32 260)">
        Sustained throughput (MB/s)
      </text>

      <text x="180" y="410" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="inherit"
        fontWeight="600" letterSpacing="1" style={{ textTransform: "uppercase" as const }}>
        Budget tier
      </text>
      <text x="370" y="410" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="inherit"
        fontWeight="600" letterSpacing="1" style={{ textTransform: "uppercase" as const }}>
        Mid tier
      </text>
      <text x="760" y="120" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="inherit"
        fontWeight="600" letterSpacing="1" style={{ textTransform: "uppercase" as const }}>
        Hyperscaler tier
      </text>

      <path
        d="M 168,332 L 169,314 L 325,224 L 729,242 L 743,215 L 787,215"
        stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="8,5" fill="none"
      />
      <text x="600" y="258" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit" fontStyle="italic">
        Cost-performance frontier
      </text>

      <circle cx="168" cy="332" r="9" fill="#94a3b8" />
      <circle cx="169" cy="314" r="9" fill="#94a3b8" />
      <text x="192" y="308" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Wasabi</text>
      <text x="192" y="322" fill="#64748b" fontSize="11" fontFamily="inherit">Paris</text>
      <text x="192" y="342" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Backblaze B2</text>
      <text x="192" y="356" fill="#64748b" fontSize="11" fontFamily="inherit">Amsterdam</text>

      <circle cx="325" cy="224" r="9" fill="#94a3b8" />
      <text x="348" y="221" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Cloudflare R2</text>
      <text x="348" y="235" fill="#64748b" fontSize="11" fontFamily="inherit">Global edge</text>

      <circle cx="729" cy="242" r="11" fill="#64748b" />
      <text x="742" y="262" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Azure Blob</text>
      <text x="742" y="276" fill="#64748b" fontSize="11" fontFamily="inherit">Spain Central</text>

      <circle cx="743" cy="215" r="11" fill="#64748b" />
      <text x="743" y="182" textAnchor="middle" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">AWS S3</text>
      <text x="743" y="196" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="inherit">eu-south-2 Madrid</text>

      <circle cx="787" cy="215" r="11" fill="#64748b" />
      <text x="806" y="209" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Google Cloud</text>
      <text x="806" y="223" fill="#64748b" fontSize="11" fontFamily="inherit">europe-sw1 Madrid</text>

      <circle cx="100" cy="170" r="28" fill="#0090FF" opacity="0.14" />
      <circle cx="100" cy="170" r="18" fill="#0090FF" opacity="0.28" />
      <circle cx="100" cy="170" r="12" fill="#0090FF" />
      <circle cx="100" cy="170" r="5"  fill="#fff" />
      <text x="130" y="162" fill="#0070CC" fontSize="22" fontFamily="inherit" fontWeight="700" letterSpacing="-0.5">Fil One</text>
      <text x="130" y="178" fill="#0090FF" fontSize="13" fontFamily="inherit" fontWeight="500">Fastest, lowest cost.</text>
    </svg>

    <div style={{
      backgroundColor: "#F4F4F5",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      borderRadius: "0 0 16px 16px",
      padding: "12px 24px",
      marginTop: 0,
    }}>
      <p style={{
        fontFamily: "'Funnel Sans', sans-serif",
        fontSize: 12,
        color: "#52525B",
        lineHeight: 1.6,
        margin: 0,
      }}>
        Each dot is one provider. Position reflects all-in cost per TB (storage + egress) for a 10 TB team with 10 TB of monthly egress, and measured sustained read throughput from Barcelona on a tuned parallel S3 client. Cost axis is logarithmic.
      </p>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const BarcelonaLandingPage = () => {
  useSeo({
    title: "Fil One for Barcelona — Hyperscaler speed. Budget-tier bills.",
    description:
      "S3-compatible object storage for creative, AI, and SaaS teams across Southern Europe. European-native latency, zero egress fees, €4.99/TB per month.",
    canonical: "https://filone.io/lp/barcelona",
  });

  const { ref: posRef, inView: posInView } = useInView({ threshold: 0.05 });

  return (
    <LandingPage>
      {/* Hero */}
      <LandingHero
        badge="For creative, AI, and SaaS teams in Barcelona and across the Iberian Peninsula"
        headline={<>Hyperscaler speed.<br /><span style={{ color: "#0090FF" }}>Budget-tier bills.</span></>}
        sub="Fil One is S3-compatible object storage built for European teams. You get hyperscaler-grade performance, served from EU infrastructure, without the hyperscaler invoice. Drop it into your existing stack in minutes."
        ctas={HERO_CTAS}
        trustLine="No credit card required · No egress fees · Connects in minutes"
      />

      {/* Problem + Why teams are stuck */}
      <LandingSection bg="gray" noReveal>
        <ProblemCards
          label="The problem"
          heading="Cloud storage wasn't designed for Barcelona teams."
          sub="Most S3-compatible storage options are priced for global enterprises, not for a studio in Poblenou, an AI team in 22@, or a SaaS company serving European customers from a Madrid HQ. Every alternative on the market today comes with a real catch."
          cards={PROBLEMS}
        />
      </LandingSection>

      {/* Positioning / Scatter Chart (page-specific) */}
      <LandingSection id="positioning">
        <div
          ref={posRef}
          className={`flex flex-col gap-8 w-full reveal${posInView ? " in-view" : ""}`}
        >
          <div className="flex flex-col gap-3 items-center text-center">
            <SectionLabel>Positioning</SectionLabel>
            <SectionHeading>Outside the tradeoff.</SectionHeading>
            <SectionSub>
              Every other option forces a tradeoff between price and performance. Fil One does not. The chart below shows where we land.
            </SectionSub>
          </div>
          <ScatterChart />
        </div>
      </LandingSection>

      {/* Pricing table */}
      <LandingSection id="compare" bg="gray">
        <ComparisonTable
          label="Pricing"
          heading="Your monthly bill, six ways."
          sub="A 10 TB team in Barcelona, delivering 10 TB of egress each month, running 500,000 object operations."
          columns={PRICING_COLUMNS}
          rows={PRICING_ROWS}
          footnote="Competitor prices converted from USD at €1 = $1.17 (ECB rate, May 2026). FilOne is priced natively in EUR at €4.99/TB."
        />
      </LandingSection>

      {/* Features */}
      <LandingSection id="features">
        <FeatureCards
          label="Features"
          heading={<>The <span style={{ color: "#0090FF" }}>S3 you expected.</span></>}
          sub="Compatible with everything your team already uses. Priced for the workloads that move real data."
          cards={FEATURES}
        />
      </LandingSection>

      {/* Workloads */}
      <LandingSection id="workloads" bg="gray">
        <WorkloadCards
          label="Workloads"
          heading="Built for what your team actually does."
          sub="Speed where it matters. Savings that compound month over month."
          cards={WORKLOADS}
        />
      </LandingSection>

      {/* Integrations */}
      <LandingSection id="integrations">
        <IntegrationPills
          label="Integrations"
          heading="Works with your existing stack."
          sub="S3 API compatible. If it talks to AWS, it talks to us."
          integrations={INTEGRATIONS}
        />
      </LandingSection>

      {/* CTA Banner */}
      <DarkCtaBanner
        heading="Ship your next project on Fil One"
        sub="Free 1 TB evaluation bucket. Onboarding in under 2 minutes."
        ctas={CTA_BUTTONS}
        trustLine="No credit card required · No egress fees"
      />
    </LandingPage>
  );
};

export default BarcelonaLandingPage;
