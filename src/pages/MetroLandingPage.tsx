import { ArrowsOut, ChartLine, Plug, ShieldCheck } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';

// 10 TB stored, 10 TB read/month — same scenario as egress page for comparability.
// AWS S3 Standard us-east-1: $0.023/GB storage + $0.09/GB egress.
//   Storage: 10,240 × $0.023 = $235.52
//   Egress:  10,240 × $0.09  = $921.60
//   Total: $1,157.12 → $1,157
// Fil One: 10 × $4.99 = $49.90, $0 egress.
const COMPARE_ROWS = [
  { provider: "AWS S3 Standard",   storage: "$236", egress: "$922", total: "$1,157", isFilOne: false },
  { provider: "Google Cloud",      storage: "$205", egress: "$1,228", total: "$1,433", isFilOne: false },
  { provider: "Azure Blob (Hot)",  storage: "$184", egress: "$890",  total: "$1,074", isFilOne: false },
  { provider: "Wasabi",            storage: "$70",  egress: "$0",    total: "$70",    isFilOne: false },
  { provider: "Backblaze B2",      storage: "$60",  egress: "$0",    total: "$60",    isFilOne: false },
  { provider: "Fil One",           storage: "$50",  egress: "$0",    total: "$50",    isFilOne: true  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Global network of providers",
    desc: "Data is distributed across an independent global network of storage providers — not concentrated in three or four hyperscaler regions. Your team doesn't pay a proximity premium.",
  },
  {
    icon: ArrowsOut,
    title: "No egress fees",
    desc: "$0 to read your own data. The cost of accessing data from wherever you are is the same as the cost of storing it — nothing extra.",
  },
  {
    icon: Plug,
    title: "S3-compatible",
    desc: "Standard S3 API. The same SDKs, CLIs, and integrations your team already uses connect with an endpoint change. No migration project.",
  },
  {
    icon: ChartLine,
    title: "Flat, predictable cost",
    desc: "$4.99/TB regardless of where your team is, how often they read, or how fast your data grows. One rate. One line on the invoice.",
  },
];

const MetroLandingPage = () => {
  useSeo({
    title: "Fil One · Hyperscaler speed. Budget-tier bills.",
    description:
      "S3-compatible object storage at $4.99/TB flat. A global network of storage providers — fast reads without the hyperscaler price tag. No egress fees.",
    canonical: "https://www.fil.one/lp/metro",
  });

  const { ref: problemRef,  inView: problemInView  } = useInView({ threshold: 0.05 });
  const { ref: tableRef,    inView: tableInView    } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,      inView: ctaInView      } = useInView({ threshold: 0.05 });

  const valueColor = (val: string) => {
    if (val === "$0") return "#16a34a";
    const n = parseFloat(val.replace(/[$,]/g, ""));
    if (n > 100) return "#dc2626";
    return "#52525B";
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative isolate pt-[58px] md:pt-[94px]" style={{ backgroundColor: "#FFFFFF" }}>
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)" }} />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`, backgroundSize: "60px 60px", backgroundPosition: "center top", maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)" }} />
          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            <div className="hero-fade-1 flex items-center gap-1.5 text-center" style={{ backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", borderRadius: 14, padding: "10px 14px", maxWidth: "90vw" }}>
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For SaaS and creative teams who need fast, affordable storage</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 720, margin: 0 }}>
              Hyperscaler speed.<br /><span style={{ color: "#0090FF" }}>Budget-tier bills.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 580, margin: 0 }}>
              S3-compatible object storage at $4.99/TB flat. A global network of storage providers — fast access without the hyperscaler price tag. No egress fees.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p className="hero-fade-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", textAlign: "center" }}>No credit card required · No egress fees · Connects in minutes</p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={problemRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>The assumption</SectionLabel>
              <SectionHeading>Fast and affordable storage are assumed to be a tradeoff. They aren't.</SectionHeading>
              <SectionSub>Hyperscalers price storage and egress to capture teams who assume they need the largest network. The assumption is that cheaper alternatives are slower or further away. Fil One's distributed network removes that tradeoff.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "The proximity premium",
                  catch: "Hyperscalers charge extra for being close.",
                  body: "Storing and reading data from a major cloud region costs full hyperscaler rates. Teams assume they pay for the proximity. In reality, they pay for the brand — and the egress on every read compounds it.",
                },
                {
                  label: "The egress multiplier",
                  catch: "Reading your data adds to the bill every time.",
                  body: "At $0.09/GB egress, a team reading 10 TB of assets per month pays $921 just to access their own data — on top of $236 in storage. The data is nearby; the bill is not proportional.",
                },
                {
                  label: "The cheap-but-slow assumption",
                  catch: "Teams assume alternatives compromise on speed.",
                  body: "The reason most teams stay on hyperscaler storage is the fear that alternatives are slower or less reliable. A globally distributed network of providers removes that constraint — without the hyperscaler invoice.",
                },
              ].map(({ label, body, catch: c }) => (
                <div key={label} className="flex flex-col rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}>
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#52525B", backgroundColor: "#F4F4F5", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 9999, padding: "3px 10px", marginBottom: 2, alignSelf: "flex-start" }}>{label}</span>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.3", letterSpacing: "-0.01em", color: "#09090B" }}>{c}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.65, color: "#71717A", marginTop: 4 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={tableRef} className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${tableInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>The comparison</SectionLabel>
              <SectionHeading>10 TB stored. <span style={{ color: "#0090FF" }}>10 TB read per month.</span></SectionHeading>
              <SectionSub maxWidth={620}>Same workload, six providers. Storage is a small line — egress is the bill on hyperscalers. On Fil One, egress does not exist as a line item.</SectionSub>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: 480, borderCollapse: "collapse", fontFamily: "'Funnel Sans', sans-serif" }}>
                <thead>
                  <tr>
                    {["Provider", "Storage", "Egress", "Total / month"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "11px 16px", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#71717A", borderBottom: "1px solid rgba(0,0,0,0.07)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map(r => (
                    <tr key={r.provider} style={{ backgroundColor: r.isFilOne ? "#EFF8FF" : "transparent" }}>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14, fontWeight: r.isFilOne ? 700 : 500, color: r.isFilOne ? "#0070CC" : "#09090B" }}>
                        {r.provider}{r.isFilOne && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 500, color: "#0070CC", backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", borderRadius: 9999, padding: "2px 7px", verticalAlign: "middle" }}>You</span>}
                      </td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: r.isFilOne ? "#09090B" : "#52525B", fontWeight: r.isFilOne ? 600 : 400 }}>{r.storage}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: r.egress === "$0" ? "#16a34a" : valueColor(r.egress), fontWeight: r.egress === "$0" ? 600 : 500 }}>{r.egress}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: r.isFilOne ? 17 : 13.5, fontWeight: r.isFilOne ? 700 : 400, color: r.isFilOne ? "#0070CC" : "#52525B" }}>{r.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">AWS S3 Standard, Google Cloud Storage, Azure Blob Hot — public US rate cards Q2 2026. AWS: 10,240 GB × $0.023 storage + 10,240 GB × $0.09 egress. GCP: $0.020/GB storage + $0.12/GB egress first 10 TB. Azure: ~$0.018/GB storage + $0.087/GB egress. Wasabi $6.99/TB. Backblaze B2 $6/TB. Fil One $4.99/TB, $0 egress.</p>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Why it works</SectionLabel>
              <SectionHeading>
                Fast access. <span style={{ color: "#0090FF" }}>Flat cost.</span>
              </SectionHeading>
              <SectionSub maxWidth={560}>A global network of providers, S3-compatible, no egress. The tradeoff between performance and cost doesn't hold here.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04)", textAlign: "left" }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}><Icon size={18} color="#0090FF" /></div>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>{title}</p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>One rate. <span style={{ color: "#0090FF" }}>$4.99/TB/month.</span></SectionHeading>
              <SectionSub maxWidth={520}>Storage. That is the whole bill. No egress, no per-request charges, no regional pricing tiers. Fast access doesn't cost extra here.</SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A" }}>No credit card required · No egress fees · Connects in minutes</p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }} className="px-6 md:px-12 py-16 md:py-[104px]">
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Hyperscaler speed. Budget-tier bills.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB evaluation. Point your existing S3 tools at the endpoint and run the same workload.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Start for free</span></a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">Talk to an expert</a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>No credit card required · No egress fees · Connects in minutes</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default MetroLandingPage;
