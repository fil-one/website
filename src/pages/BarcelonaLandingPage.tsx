import { Check, Plug, ArrowsOut, Globe, ShieldCheck, Lock, ChartLine } from "@phosphor-icons/react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';

// ─── Grid texture (matches Index.tsx hero) ─────────────────────────────────────

// ─── Scatter chart ─────────────────────────────────────────────────────────────

// Exact SVG extracted from the reference at thunderous-concha-70113b.netlify.app
// viewBox 0 0 1000 560, chart area x:100→940, y:80→440
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

      {/* Fil One exclusive zone */}
      <path d="M 100 80 L 300 80 L 300 240 L 100 240 Z" fill="url(#filoneZone)" />

      {/* Axis frame */}
      <line x1="100" y1="80"  x2="100" y2="440" stroke="#E2E8F0" strokeWidth="1" />
      <line x1="100" y1="440" x2="940" y2="440" stroke="#E2E8F0" strokeWidth="1" />

      {/* Y gridlines */}
      <line x1="100" y1="350" x2="940" y2="350" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="100" y1="260" x2="940" y2="260" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="100" y1="170" x2="940" y2="170" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />

      {/* X gridlines */}
      <line x1="242" y1="80" x2="242" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="430" y1="80" x2="430" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="572" y1="80" x2="572" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="714" y1="80" x2="714" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />

      {/* X axis labels */}
      <text x="100" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€5</text>
      <text x="242" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€10</text>
      <text x="430" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€25</text>
      <text x="572" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€50</text>
      <text x="714" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€100</text>
      <text x="940" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€300</text>

      {/* Y axis labels */}
      <text x="88" y="444" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">0</text>
      <text x="88" y="354" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">100</text>
      <text x="88" y="264" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">200</text>
      <text x="88" y="174" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">300</text>
      <text x="88" y="84"  textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">400</text>

      {/* Axis titles */}
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

      {/* Tier labels */}
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

      {/* Cost-performance frontier line */}
      <path
        d="M 168,332 L 169,314 L 325,224 L 729,242 L 743,215 L 787,215"
        stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="8,5" fill="none"
      />
      <text x="600" y="258" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit" fontStyle="italic">
        Cost-performance frontier
      </text>

      {/* ── Backblaze B2 ── */}
      <circle cx="168" cy="332" r="9" fill="#94a3b8" />

      {/* ── Wasabi ── */}
      <circle cx="169" cy="314" r="9" fill="#94a3b8" />
      <text x="192" y="308" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Wasabi</text>
      <text x="192" y="322" fill="#64748b" fontSize="11" fontFamily="inherit">Paris</text>
      <text x="192" y="342" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Backblaze B2</text>
      <text x="192" y="356" fill="#64748b" fontSize="11" fontFamily="inherit">Amsterdam</text>

      {/* ── Cloudflare R2 ── */}
      <circle cx="325" cy="224" r="9" fill="#94a3b8" />
      <text x="348" y="221" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Cloudflare R2</text>
      <text x="348" y="235" fill="#64748b" fontSize="11" fontFamily="inherit">Global edge</text>

      {/* ── Azure Blob ── */}
      <circle cx="729" cy="242" r="11" fill="#64748b" />
      <text x="742" y="262" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Azure Blob</text>
      <text x="742" y="276" fill="#64748b" fontSize="11" fontFamily="inherit">Spain Central</text>

      {/* ── AWS S3 ── */}
      <circle cx="743" cy="215" r="11" fill="#64748b" />
      <text x="743" y="182" textAnchor="middle" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">AWS S3</text>
      <text x="743" y="196" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="inherit">eu-south-2 Madrid</text>

      {/* ── Google Cloud ── */}
      <circle cx="787" cy="215" r="11" fill="#64748b" />
      <text x="806" y="209" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Google Cloud</text>
      <text x="806" y="223" fill="#64748b" fontSize="11" fontFamily="inherit">europe-sw1 Madrid</text>

      {/* ── Fil One (hero dot) ── */}
      <circle cx="100" cy="170" r="28" fill="#0090FF" opacity="0.14" />
      <circle cx="100" cy="170" r="18" fill="#0090FF" opacity="0.28" />
      <circle cx="100" cy="170" r="12" fill="#0090FF" />
      <circle cx="100" cy="170" r="5"  fill="#fff" />
      <text x="130" y="162" fill="#0070CC" fontSize="22" fontFamily="inherit" fontWeight="700" letterSpacing="-0.5">Fil One</text>
      <text x="130" y="178" fill="#0090FF" fontSize="13" fontFamily="inherit" fontWeight="500">Fastest, lowest cost.</text>
    </svg>

    {/* Meta note — footer strip style */}
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

// ─── Pricing table helpers ────────────────────────────────────────────────────
// Colours egress/API cells: $0 → green, large fees → red, small fees → neutral
const valueColor = (val: string) => {
  const n = parseFloat(val.replace(/[$€,]/g, ""));
  if (n === 0)  return "#16a34a"; // green
  if (n > 50)   return "#dc2626"; // red
  return "#52525B";               // neutral
};

// ─── Pricing table data ────────────────────────────────────────────────────────
const PRICING_ROWS = [
  { provider: "AWS S3 Standard",      region: "eu-south-2 Madrid",          storage: "€197",    egress: "€790",   api: "€1.83", total: "€990",    isFilOne: false },
  { provider: "Google Cloud Storage", region: "europe-southwest1 Madrid",   storage: "€171",    egress: "€1,052", api: "€1.83", total: "€1,226",  isFilOne: false },
  { provider: "Azure Blob",           region: "Spain Central Madrid",        storage: "€178",    egress: "€763",   api: "€1.89", total: "€943",    isFilOne: false },
  { provider: "Wasabi",               region: "eu-west-2 Paris",            storage: "€59.90",  egress: "€0",     api: "€0",    total: "€59.90",  isFilOne: false },
  { provider: "Backblaze B2",         region: "eu-central-003 Amsterdam",   storage: "€59.60",  egress: "€0",     api: "€0",    total: "€59.60",  isFilOne: false },
  { provider: "Fil One",              region: "EU-West",                    storage: "€49.90",  egress: "€0",     api: "€0",    total: "€49.90",  isFilOne: true  },
];

// ─── Feature cards ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    title: "Drop-in S3 compatibility",
    desc: "Same API, same SDKs, same tools. Point your existing workflow at our endpoint and keep shipping. No migration project.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="14" height="9" rx="2" stroke="#0090FF" strokeWidth="1.5" />
        <path d="M6 5V4a3 3 0 016 0v1" stroke="#0090FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Zero egress fees",
    desc: "Client pulls, customer downloads, dashboard queries. Every read is included. Your bill stays flat at the end of a busy month.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="#0090FF" strokeWidth="1.5" />
        <path d="M9 5v4l2.5 2.5" stroke="#0090FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "European-native latency",
    desc: "Under 15 ms to Barcelona, Madrid, Paris, Milan. On par with hyperscaler Madrid, sovereign by default.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7" stroke="#0090FF" strokeWidth="1.5" />
        <path d="M9 4c-3 0-5.5 2.2-5.5 5 0 2.5 2 3.8 5.5 3.8s5.5-1.3 5.5-3.8C14.5 6.2 12 4 9 4z" stroke="#0090FF" strokeWidth="1.5" />
        <path d="M9 4v9.8M3.5 9h11" stroke="#0090FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Eleven nines of durability",
    desc: "Distributed storage across an independent provider network. Audit-ready proof that your bytes are intact, every day.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill="rgba(0,144,255,0.12)" stroke="#0090FF" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Object Lock and versioning",
    desc: "Compliance and governance modes for backup targets. Retention periods. Tamper-evident audit logs. Ready for regulated data.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="12" height="12" rx="2" stroke="#0090FF" strokeWidth="1.5" />
        <path d="M6 9h6M6 6h4M6 12h3" stroke="#0090FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Predictable under load",
    desc: "Line-rate ingest at 1.5 Gbps per client. Sustained parallel reads. Tight run-to-run variance so your pipelines stop guessing.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <polyline points="2,13 6,8 10,10 14,4 16,6" stroke="#0090FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// ─── Workload cards ────────────────────────────────────────────────────────────
const WORKLOADS = [
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

// ─── Integrations ──────────────────────────────────────────────────────────────
const INTEGRATIONS = [
  "Iconik", "LucidLink", "Veeam", "Rclone", "Restic",
  "MSP360", "Premiere", "DaVinci Resolve", "Hugging Face",
  "PyTorch", "Arq", "Duplicati",
];

// ─── Page ──────────────────────────────────────────────────────────────────────
const BarcelonaLandingPage = () => {
  useSeo({
    title: "Fil One for Barcelona — Hyperscaler speed. Budget-tier bills.",
    description:
      "S3-compatible object storage for creative, AI, and SaaS teams across Southern Europe. European-native latency, zero egress fees, €4.99/TB per month.",
    canonical: "https://filone.io/lp/barcelona",
  });

  const { ref: posRef,          inView: posInView          } = useInView({ threshold: 0.05 });
  const { ref: pricingRef,      inView: pricingInView      } = useInView({ threshold: 0.05 });
  const { ref: featuresRef,     inView: featuresInView     } = useInView({ threshold: 0.05 });
  const { ref: workloadsRef,    inView: workloadsInView    } = useInView({ threshold: 0.05 });
  const { ref: integrationsRef, inView: integrationsInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,          inView: ctaInView          } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <LandingNavbar />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative isolate pt-[58px]"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          {/* Blue radial glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
            }}
          />
          {/* Grid texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />

          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            {/* Announcement badge — matches HeroSection.tsx */}
            <div
              className="hero-fade-1 flex items-center gap-1.5 text-center"
              style={{
                backgroundColor: "#EFF8FF",
                border: "1px solid rgba(0,144,255,0.2)",
                borderRadius: 14,
                padding: "10px 14px",
                maxWidth: "90vw",
              }}
            >
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 13.5,
                  lineHeight: 1,
                  color: "#0070CC",
                }}
              >
                For creative, AI, and SaaS teams in Barcelona and across the Iberian Peninsula
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
                color: "#09090B",
                textAlign: "center",
                maxWidth: 660,
                margin: 0,
              }}
            >
              Hyperscaler speed.<br /><span style={{ color: "#0090FF" }}>Budget-tier bills.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-[15px] md:text-[17px] hero-fade-2"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 520,
                margin: 0,
              }}
            >
              Fil One is S3-compatible object storage built for European teams. You get hyperscaler-grade performance, served from EU infrastructure, without the hyperscaler invoice. Drop it into your existing stack in minutes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Try 30 days for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>

            {/* Trust line */}
            <p
              className="hero-fade-4"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#71717A",
                textAlign: "center",
              }}
            >
              No credit card required · No egress fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* ── Problem + Why teams are stuck (merged) ───────────────────────── */}
        <section
          className="px-5 md:px-8 py-16 md:py-24 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div className="flex flex-col gap-10 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-4 items-center text-center max-w-[560px] mx-auto">
              <SectionLabel>The problem</SectionLabel>
              <SectionHeading>Cloud storage wasn't designed for Barcelona teams.</SectionHeading>
              <SectionSub>
                Most S3-compatible storage options are priced for global enterprises, not for a studio in Poblenou, an AI team in 22@, or a SaaS company serving European customers from a Madrid HQ. Every alternative on the market today comes with a real catch.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "Hyperscalers",
                  pillBg: "#EFF8FF", pillBorder: "rgba(0,144,255,0.2)", pillColor: "#0070CC",
                  title: "Reliable, but the bill keeps growing.",
                  body: "AWS, Google Cloud, and Azure win the procurement conversation by default. Not because they offer the best value, but because nobody gets fired for picking them. A 10 TB Barcelona workload running on AWS eu-south-2 Madrid burns €790 a month in egress alone, and most teams never audit the line item until it is already out of hand.",
                  catch: "Egress fees compound silently.",
                },
                {
                  label: "Budget alternatives",
                  pillBg: "#F0FDF4", pillBorder: "rgba(21,128,61,0.2)", pillColor: "#15803D",
                  title: "Cheaper storage, worse everything else.",
                  body: "Wasabi and Backblaze undercut hyperscalers on storage, but neither runs an EU-sovereign region close to you. From Barcelona or Madrid, your traffic loops through Paris or Amsterdam. Latency goes up, GDPR posture gets murky, and your data sits outside European legal jurisdiction.",
                  catch: "Performance and compliance both suffer.",
                },
                {
                  label: "Doing nothing",
                  pillBg: "#FFFBEB", pillBorder: "rgba(180,83,9,0.2)", pillColor: "#B45309",
                  title: "The bill is a line item nobody owns.",
                  body: "Storage gets reviewed quarterly, if that. AWS billing is opaque by design, switching sounds risky on a Tuesday afternoon, and benchmarking takes time nobody has on the calendar. Meanwhile the 23× premium keeps compounding.",
                  catch: "Inertia is the most expensive option.",
                },
              ].map(({ label, pillBg, pillBorder, pillColor, title, body, catch: catchLine }) => (
                <div
                  key={label}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Card body */}
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span style={{
                      display: "inline-block",
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#52525B",
                      backgroundColor: "#F4F4F5",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 9999,
                      padding: "3px 10px",
                      marginBottom: 2,
                      alignSelf: "flex-start",
                    }}>
                      {label}
                    </span>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.3", letterSpacing: "-0.01em", color: "#09090B" }}>
                      {catchLine}
                    </p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.65, color: "#71717A", marginTop: 4 }}>
                      {body}
                    </p>
                  </div>
                  {/* Footer strip */}
                  <div
                    className="flex items-center gap-2 px-7 py-4"
                    style={{ backgroundColor: "#F4F4F5", borderTop: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <span style={{ color: "#71717A", fontSize: 11, flexShrink: 0 }}>✕</span>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13, color: "#52525B", lineHeight: 1.3 }}>
                      {title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Positioning / Scatter Chart ───────────────────────────────────── */}
        <section
          id="positioning"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={posRef}
            className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${posInView ? " in-view" : ""}`}
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
        </section>

        {/* ── Pricing table ─────────────────────────────────────────────────── */}
        <section
          id="compare"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            ref={pricingRef}
            className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${pricingInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>Your monthly bill, six ways.</SectionHeading>
              <SectionSub maxWidth={600}>
                A 10 TB team in Barcelona, delivering 10 TB of egress each month, running 500,000 object operations.
              </SectionSub>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 600,
                  borderCollapse: "collapse",
                  fontFamily: "'Funnel Sans', sans-serif",
                }}
              >
                <thead>
                  <tr>
                    {["Provider", "Region", "Storage", "Egress", "API / ops", "Total / month"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "11px 16px",
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "#71717A",
                          borderBottom: "1px solid rgba(0,0,0,0.07)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRICING_ROWS.map((row) => (
                    <tr
                      key={row.provider}
                      style={{ backgroundColor: row.isFilOne ? "#EFF8FF" : "transparent" }}
                    >
                      {/* Provider */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 14,
                          fontWeight: row.isFilOne ? 700 : 500,
                          color: row.isFilOne ? "#0070CC" : "#09090B",
                        }}
                      >
                        {row.provider}
                        {row.isFilOne && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              marginLeft: 8,
                              backgroundColor: "#EFF8FF",
                              border: "1px solid rgba(0,144,255,0.2)",
                              color: "#0070CC",
                              fontFamily: "'Funnel Sans', sans-serif",
                              fontSize: 11,
                              fontWeight: 500,
                              padding: "2px 8px",
                              borderRadius: 9999,
                              verticalAlign: "middle",
                              whiteSpace: "nowrap",
                            }}
                          >
                            You
                          </span>
                        )}
                      </td>
                      {/* Region */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13.5,
                          fontWeight: row.isFilOne ? 500 : 400,
                          color: row.isFilOne ? "#09090B" : "#52525B",
                        }}
                      >
                        {row.region}
                      </td>
                      {/* Storage */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13.5,
                          fontWeight: row.isFilOne ? 600 : 400,
                          color: row.isFilOne ? "#09090B" : "#52525B",
                        }}
                      >
                        {row.storage}
                      </td>
                      {/* Egress */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13.5,
                          fontWeight: row.isFilOne ? 600 : 500,
                          color: row.isFilOne ? "#09090B" : valueColor(row.egress),
                        }}
                      >
                        {row.egress}
                      </td>
                      {/* API */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13.5,
                          fontWeight: row.isFilOne ? 600 : 500,
                          color: row.isFilOne ? "#09090B" : valueColor(row.api),
                        }}
                      >
                        {row.api}
                      </td>
                      {/* Total */}
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: row.isFilOne ? 17 : 13.5,
                          fontWeight: row.isFilOne ? 700 : 400,
                          color: row.isFilOne ? "#0070CC" : "#52525B",
                        }}
                      >
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Competitor prices converted from USD at €1 = $1.17 (ECB rate, May 2026). FilOne is priced natively in EUR at €4.99/TB.
            </p>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section
          id="features"
          className="w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-4 items-center text-center">
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#71717A", textTransform: "uppercase" }}>
                Features
              </span>
              <h2
                className="text-[24px] md:text-[34px]"
                style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.2", letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}
              >
                The <span style={{ color: "#0090FF" }}>S3 you expected.</span>
              </h2>
              <p
                className="text-[15px] md:text-[17px]"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", maxWidth: 560, margin: 0 }}
              >
                Compatible with everything your team already uses. Priced for the workloads that move real data.
              </p>
            </div>
            <div
              ref={featuresRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group reveal${featuresInView ? " in-view" : ""}`}
            >
              {[
                { icon: Plug,        title: "Drop-in S3 compatibility",    desc: "Same API, same SDKs, same tools. Point your existing workflow at our endpoint and keep shipping. No migration project." },
                { icon: ArrowsOut,   title: "Zero egress fees",            desc: "Client pulls, customer downloads, dashboard queries. Every read is included. Your bill stays flat at the end of a busy month." },
                { icon: Globe,       title: "European-native latency",     desc: "Under 15 ms from Barcelona, Madrid, Paris, and Milan. Matches AWS eu-south-2 Madrid round-trip, with EU data sovereignty and European legal jurisdiction by default." },
                { icon: ShieldCheck, title: "Eleven nines of durability",  desc: "Distributed storage across an independent provider network. Audit-ready proof that your bytes are intact, every day." },
                { icon: Lock,        title: "Object Lock and versioning",  desc: "Compliance and governance modes for backup targets. Retention periods. Tamper-evident audit logs. Ready for regulated data." },
                { icon: ChartLine,   title: "Predictable under load",      desc: "Line-rate ingest at 1.5 Gbps per client. Sustained parallel reads. Tight run-to-run variance so your pipelines stop guessing." },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-5 p-8 rounded-2xl border reveal${featuresInView ? " in-view" : ""}`}
                  style={{
                    borderColor: "rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}>
                    <Icon size={18} color="#0090FF" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>
                      {title}
                    </p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.6", color: "#71717A" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Workloads ─────────────────────────────────────────────────────── */}
        <section
          id="workloads"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            ref={workloadsRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${workloadsInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Workloads</SectionLabel>
              <SectionHeading>Built for what your team actually does.</SectionHeading>
              <SectionSub maxWidth={460}>
                Speed where it matters. Savings that compound month over month.
              </SectionSub>
            </div>

            <div
              className="reveal-group"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {WORKLOADS.map((w, wi) => {
                // parse numeric value for bar width calculation
                const barVal = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
                return (
                  <div
                    key={w.tag}
                    className={`reveal${workloadsInView ? " in-view" : ""}`}
                    style={{
                      border: "1px solid rgba(0,0,0,0.07)",
                      borderRadius: 20,
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                      overflow: "hidden",
                      transitionDelay: workloadsInView ? `${wi * 70}ms` : "0ms",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* ── Header ── */}
                    <div style={{ padding: "28px 28px 24px" }}>
                      {/* Pill — same as hero announcement badge */}
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: "#EFF8FF",
                        border: "1px solid rgba(0,144,255,0.2)",
                        borderRadius: 9999,
                        padding: "4px 12px",
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 500,
                        fontSize: 10.5,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#0070CC",
                        marginBottom: 16,
                        whiteSpace: "nowrap",
                      }}>
                        {w.tag}
                      </span>
                      <h3 style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 20,
                        color: "#09090B",
                        marginBottom: 10,
                        lineHeight: "1.3",
                        letterSpacing: "-0.02em",
                      }}>
                        {w.title}
                      </h3>
                      <p style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        color: "#71717A",
                        lineHeight: 1.65,
                        margin: 0,
                      }}>
                        {w.desc}
                      </p>
                    </div>

                    {/* ── Stats ── */}
                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "20px 28px 0" }}>
                      {w.stats.map((stat, si) => {
                        const vals = stat.rows.map(r => barVal(r.val));
                        const maxVal = Math.max(...vals);
                        return (
                          <div key={stat.label} style={{ marginBottom: 20 }}>
                            {si > 0 && <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.06)", margin: "0 0 20px" }} />}
                            {/* Stat label */}
                            <p style={{
                              fontFamily: "'DM Mono', monospace",
                              fontWeight: 500,
                              fontSize: 10,
                              letterSpacing: "0.09em",
                              textTransform: "uppercase",
                              color: "#94a3b8",
                              marginBottom: 12,
                            }}>
                              {stat.label}
                            </p>
                            {/* Bar rows */}
                            {stat.rows.map((r, ri) => {
                              const pct = maxVal === 0 ? 100 : Math.max(3, (vals[ri] / maxVal) * 100);
                              return (
                                <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                  <span style={{
                                    fontFamily: "'Funnel Sans', sans-serif",
                                    fontWeight: r.win ? 600 : 400,
                                    fontSize: 13.5,
                                    color: "#09090B",
                                    width: 100,
                                    flexShrink: 0,
                                  }}>
                                    {r.name}
                                  </span>
                                  <div style={{ flex: 1, height: 10, backgroundColor: "rgba(0,0,0,0.06)", borderRadius: 99 }}>
                                    <div style={{
                                      width: `${pct}%`,
                                      height: "100%",
                                      borderRadius: 99,
                                      backgroundColor: r.win ? "#0090FF" : "#CBD5E1",
                                    }} />
                                  </div>
                                  <span style={{
                                    fontFamily: "'Funnel Sans', sans-serif",
                                    fontWeight: r.win ? 700 : 400,
                                    fontSize: 14,
                                    color: r.win ? "#0070CC" : "#09090B",
                                    width: 68,
                                    textAlign: "right",
                                    flexShrink: 0,
                                  }}>
                                    {r.val}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>

                    {/* ── Bottom summary strip ── */}
                    <div style={{
                      margin: "4px 16px 16px",
                      borderRadius: 12,
                      backgroundColor: "#EFF8FF",
                      padding: "14px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      marginTop: "auto",
                    }}>
                      <span style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 13.5,
                        color: "#52525B",
                      }}>
                        {w.speedBadge}
                      </span>
                      <span style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#0070CC",
                        whiteSpace: "nowrap",
                      }}>
                        {w.savingsBadge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Integrations ──────────────────────────────────────────────────── */}
        <section
          id="integrations"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={integrationsRef}
            className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${integrationsInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Integrations</SectionLabel>
              <SectionHeading>Works with your existing stack.</SectionHeading>
              <SectionSub maxWidth={440}>
                S3 API compatible. If it talks to AWS, it talks to us.
              </SectionSub>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {INTEGRATIONS.map((name) => (
                <div
                  key={name}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.09)",
                    borderRadius: 10,
                    padding: "12px 24px",
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 15.5,
                    color: "#374151",
                  }}
                >
                  {name}
                </div>
              ))}
            </div>

            <a
              href="https://docs.fil.one"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View documentation →
            </a>
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={ctaRef}
            className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)",
                borderRadius: 20,
                textAlign: "center",
              }}
              className="px-6 md:px-12 py-16 md:py-[104px]"
            >
              {/* White grid texture */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`,
                  backgroundSize: "60px 60px",
                  maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative" }}>
                <h2
                  className="text-[26px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: "1.12",
                    color: "#FFFFFF",
                    marginBottom: 12,
                  }}
                >
                  Ship your next project on Fil One
                </h2>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 17,
                    color: "rgba(255,255,255,0.60)",
                    marginBottom: 32,
                  }}
                >
                  Free 1 TB evaluation bucket. Onboarding in under 2 minutes.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Try 30 days for free</span>
                  </a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">
                    Talk to an expert
                  </a>
                </div>

                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.60)",
                    marginTop: 16,
                  }}
                >
                  No credit card required · No egress fees
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default BarcelonaLandingPage;
