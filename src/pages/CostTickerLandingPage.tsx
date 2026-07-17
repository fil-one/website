import { ChartLine, ArrowsOut, Plug, ShieldCheck } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";

// Same 10 TB workload, 10 TB read/month — the "meter" each provider runs.
// AWS: 10,240×$0.023 = $235.52 storage + 10,240×$0.09 = $921.60 egress ≈ $1,157
// Google: 10,240×$0.020 = $204.80 + 10,240×$0.12 = $1,228.80 ≈ $1,434
// Azure (Hot): ~$184 storage + 10,240×$0.087 = $890.88 ≈ $1,075
// Fil One: 10×$4.99 = $49.90, $0 egress
const COMPARE_ROWS = [
  { provider: "AWS S3 Standard", storage: "$236", egress: "$922", total: "$1,157", isFilOne: false },
  { provider: "Google Cloud", storage: "$205", egress: "$1,229", total: "$1,434", isFilOne: false },
  { provider: "Azure Blob (Hot)", storage: "$184", egress: "$891", total: "$1,075", isFilOne: false },
  { provider: "Fil One", storage: "$50", egress: "$0", total: "$50", isFilOne: true },
];

const FEATURES = [
  { icon: ArrowsOut, title: "No egress meter", desc: "Every byte you read on a hyperscaler ticks the egress meter at $0.09/GB. On Fil One that meter doesn't exist — reads are included." },
  { icon: ChartLine, title: "No request meter", desc: "PUT, GET, LIST, HEAD all run a per-operation counter elsewhere. Here they're free, so a busy month doesn't become an expensive one." },
  { icon: Plug, title: "S3-compatible", desc: "Point your existing tools at the endpoint. The workload doesn't change — only the meter that was quietly running underneath it." },
  { icon: ShieldCheck, title: "The invoice you can predict", desc: "Stored TB times $4.99. You know December's bill in January, because nothing in between is metered." },
];

const CostTickerLandingPage = () => {
  useSeo({
    title: "Fil One · Watch the meter you're not paying",
    description:
      "Hyperscalers meter every read, request, and byte out. Fil One is flat $4.99/TB with no egress and no per-request fees. See the side-by-side.",
    canonical: "https://fil.one/lp/cost-ticker",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: tableRef, inView: tableInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

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
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For anyone tired of cloud bill surprises</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 760, margin: 0 }}>
              Watch the meter<br /><span style={{ color: "#0090FF" }}>you're not paying.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 600, margin: 0 }}>
              Hyperscalers meter every read, every request, every byte out. Fil One is flat $4.99/TB — no egress, no per-request fees. Same workload, side by side.
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
            <div className="flex flex-col gap-4 items-center text-center max-w-[620px] mx-auto">
              <SectionLabel>The invisible meter</SectionLabel>
              <SectionHeading>The bill is a surprise because the meter runs where you can't see it.</SectionHeading>
              <SectionSub>Storage looks cheap on the rate card. The cost shows up later, metered against activity you don't watch in real time — and lands as a number nobody forecast.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "The egress meter", catch: "Every read ticks at $0.09/GB.", body: "Reading 10 TB back from AWS in a month adds $922 — nearly 4× the $236 storage charge. The meter runs hardest exactly when your data is most useful." },
                { label: "The request meter", catch: "Every operation is counted.", body: "PUT, GET, LIST, and HEAD each carry a per-thousand charge. A busy pipeline or a chatty app spins the counter all month, and the total only appears at the end." },
                { label: "The month-end reveal", catch: "You learn the cost after you've spent it.", body: "Activity-metered billing means the invoice is a report of what already happened. There's no knob to turn in advance — only a number to absorb afterward." },
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

        {/* Proof — side-by-side meter */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={tableRef} className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${tableInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>The meter, side by side</SectionLabel>
              <SectionHeading>10 TB stored, <span style={{ color: "#0090FF" }}>10 TB read in a month.</span></SectionHeading>
              <SectionSub maxWidth={620}>The same workload on four providers. Storage barely moves; the egress meter is the whole story — and on Fil One it reads zero.</SectionSub>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: 480, borderCollapse: "collapse", fontFamily: "'Funnel Sans', sans-serif" }}>
                <thead>
                  <tr>
                    {["Provider", "Storage", "Egress meter", "Total / month"].map(h => (
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
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: r.egress === "$0" ? "#16a34a" : "#dc2626", fontWeight: r.egress === "$0" ? 600 : 500 }}>{r.egress}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: r.isFilOne ? 17 : 13.5, fontWeight: r.isFilOne ? 700 : 400, color: r.isFilOne ? "#0070CC" : "#52525B" }}>{r.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">Public US rate cards, Q2 2026. AWS: 10,240 GB × $0.023 = $235.52 storage + 10,240 GB × $0.09 = $921.60 egress. Google: $0.020/GB storage + $0.12/GB egress. Azure Hot: ~$0.018/GB storage + $0.087/GB egress. Fil One: $4.99/TB, $0 egress, no per-request fees.</p>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Meters you don't pay</SectionLabel>
              <SectionHeading>The bill is the rate <span style={{ color: "#0090FF" }}>times what you store. Full stop.</span></SectionHeading>
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

        {/* Dark CTA */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }} className="px-6 md:px-12 py-16 md:py-[104px]">
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Turn off the meter. $4.99/TB/month.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", maxWidth: 560, marginLeft: "auto", marginRight: "auto", marginBottom: 32 }}>Storage only — no egress meter, no request meter, no tiers. Free 1 TB evaluation: run your real workload and compare the invoice. The egress line will read zero.</p>
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

export default CostTickerLandingPage;
