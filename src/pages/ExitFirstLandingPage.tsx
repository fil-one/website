import { ArrowsOut, Plug, ChartLine, ShieldCheck } from "@phosphor-icons/react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";

// Exit cost on 100 TB. Hyperscaler internet egress vs Fil One.
// AWS S3 us-east-1: 102,400 GB × $0.09 = $9,216. Fil One: $0.
const EXIT_ROWS = [
  { provider: "AWS S3 Standard", egressRate: "$0.09 / GB", exit100tb: "$9,216", isFilOne: false },
  { provider: "Google Cloud", egressRate: "$0.08–$0.12 / GB", exit100tb: "$9,831", isFilOne: false },
  { provider: "Azure Blob (Hot)", egressRate: "up to $0.087 / GB", exit100tb: "$7,602", isFilOne: false },
  { provider: "Fil One", egressRate: "$0", exit100tb: "$0", isFilOne: true },
];

const FEATURES = [
  { icon: Plug, title: "Full S3 parity", desc: "Standard S3 API. The tools that read and write Fil One are the same ones that read and write everywhere else — so the migrate-off command is one you already know." },
  { icon: ArrowsOut, title: "$0 egress on exit", desc: "Moving your data out costs nothing. The exit isn't a renegotiation or a budget request — it's a sync command you can run today, for free." },
  { icon: ChartLine, title: "Flat, predictable cost", desc: "$4.99/TB/month while you stay. No egress, no per-request fees — the bill that would normally make leaving expensive doesn't exist." },
  { icon: ShieldCheck, title: "Integrity-verified data", desc: "Every object is verified approximately every 24 hours, so the data you eventually move out is provably the data you put in." },
];

const ExitFirstLandingPage = () => {
  useSeo({
    title: "Fil One — Here's how to leave. Read it before you start.",
    description:
      "S3-compatible storage with $0 egress. The exit is a documented one-line sync command, not a renegotiation. Verify the way out before you commit. $4.99/TB flat.",
    canonical: "https://fil.one/lp/exit-first",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: proofRef, inView: proofInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  const MIGRATE_OFF = `# Leaving Fil One — the whole migration, one command.
# Same S3 API on both ends; $0 egress means it costs nothing.

rclone sync filone:my-bucket aws:my-bucket --progress

# 'filone' and 'aws' are standard S3 remotes in rclone.conf.
# Point any S3 client the same way — the data is yours to move,
# any time, at no exit cost.`;

  const valueColor = (val: string) => (val === "$0" ? "#16a34a" : "#dc2626");

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <LandingNavbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative isolate pt-[58px]" style={{ backgroundColor: "#FFFFFF" }}>
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)" }} />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`, backgroundSize: "60px 60px", backgroundPosition: "center top", maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)" }} />
          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            <div className="hero-fade-1 flex items-center gap-1.5 text-center" style={{ backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", borderRadius: 14, padding: "10px 14px", maxWidth: "90vw" }}>
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For anyone who's been burned by lock-in</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 800, margin: 0 }}>
              Here's how to leave.<br /><span style={{ color: "#0090FF" }}>Read it before you start.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 600, margin: 0 }}>
              S3-compatible, $0 egress. The exit is a documented one-line command, not a renegotiation. You can verify the way out before you ever commit.
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
              <SectionLabel>The lock-in you can't see</SectionLabel>
              <SectionHeading>Every vendor says "no lock-in." Few will show you the exit.</SectionHeading>
              <SectionSub>If you've been burned before, the claim isn't enough — you want to see the way out before you put data in. With most providers, you only discover the real exit cost when you try to leave.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "Egress is the lock", catch: "Leaving 100 TB costs $9,216 on AWS.", body: "At $0.09/GB internet egress, the bill to move data out scales with how valuable your dataset has become. The lock isn't in the contract — it's in the exit invoice." },
                { label: "Proprietary surface", catch: "A non-S3 API means leaving is a rewrite.", body: "When the storage API is bespoke, exiting means re-engineering every integration. The switching cost is engineering time, and it grows with every feature you build on top." },
                { label: "The untested exit", catch: "You learn the cost only when you try to go.", body: "Most teams never run the migration until they have to — by then the dataset is large, the egress bill is real, and the 'no lock-in' promise meets the actual number." },
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

        {/* Proof — migrate-off command + exit cost */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={proofRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${proofInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>The exit, in advance</SectionLabel>
              <SectionHeading>The way out is <span style={{ color: "#0090FF" }}>one command and $0.</span></SectionHeading>
              <SectionSub maxWidth={620}>Here is the migration off Fil One — before you've put anything in. Same S3 API on both ends, no egress charge to move data out.</SectionSub>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#0F172A" }}>
                <div style={{ padding: "10px 16px", backgroundColor: "#1E293B", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#94A3B8" }}>migrate-off.sh</div>
                <pre style={{ margin: 0, padding: "20px 18px", fontFamily: "'DM Mono', monospace", fontSize: 12.5, lineHeight: 1.65, color: "#E2E8F0", overflowX: "auto" }}>{MIGRATE_OFF}</pre>
              </div>
              <div style={{ border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, backgroundColor: "#F9FAFB", padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
                <SectionLabel>Cost to move 100 TB out</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {EXIT_ROWS.map(r => (
                    <div key={r.provider} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, padding: "10px 14px", backgroundColor: r.isFilOne ? "#EFF8FF" : "#FFFFFF", border: `1px solid ${r.isFilOne ? "rgba(0,144,255,0.2)" : "rgba(0,0,0,0.07)"}`, borderRadius: 10 }}>
                      <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: r.isFilOne ? 700 : 500, fontSize: 13.5, color: r.isFilOne ? "#0070CC" : "#09090B" }}>{r.provider}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11.5, color: "#71717A", flex: 1, textAlign: "center" }}>{r.egressRate}</span>
                      <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 700, fontSize: 14, color: valueColor(r.exit100tb), whiteSpace: "nowrap" }}>{r.exit100tb}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#71717A", margin: 0 }}>Public US rate cards, Q2 2026. AWS: 102,400 GB × $0.09 = $9,216. GCP tiered (10 TB @ $0.12 + 40 @ $0.11 + 50 @ $0.08) = $9,831. Azure tiered = $7,602. Fil One: $0 egress.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Why the exit is real</SectionLabel>
              <SectionHeading>Portable by default, <span style={{ color: "#0090FF" }}>provable on day one.</span></SectionHeading>
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
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Know the exit before you commit.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", maxWidth: 560, marginLeft: "auto", marginRight: "auto", marginBottom: 32 }}>$4.99/TB/month — storage only, no egress in or out. Free 1 TB evaluation: put data in, run the migrate-off command, and watch it cost nothing. Then decide.</p>
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
      <LandingFooter />
    </div>
  );
};

export default ExitFirstLandingPage;
