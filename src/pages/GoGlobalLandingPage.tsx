import { ArrowsOut, ChartLine, Plug, ShieldCheck } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


// Scale cost comparison: 1 PB stored
// AWS S3: $22,067/month (tiered)
// Fil One: $4,990/month
const SCALE_ROWS = [
  { scale: "10 TB",   aws: "$236",    filOne: "$50",    },
  { scale: "100 TB",  aws: "$2,304",  filOne: "$499",   },
  { scale: "500 TB",  aws: "$11,315", filOne: "$2,495", },
  { scale: "1 PB",    aws: "$22,067", filOne: "$4,990", },
];

const FEATURES = [
  { icon: Plug,        title: "S3-compatible from day one", desc: "Your customers use the same SDKs, CLIs, and integrations they already run. No custom adapter, no lock-in to a proprietary API surface." },
  { icon: ArrowsOut,   title: "No egress for your customers", desc: "Customers who read their own data at scale pay $0 in egress. A storage product that doesn't penalise usage is easier to sell." },
  { icon: ShieldCheck, title: "SLA-backed, enterprise terms", desc: "Capacity assurance and deployment SLAs available on 1, 3, and 5-year terms via the Business plan. Predictable infrastructure for a predictable product." },
  { icon: ChartLine,   title: "Flat pricing that scales linearly", desc: "$4.99/TB regardless of volume. At 1 PB, that is $4,990/month — a number you can build a product margin on. No tier waterfall to model." },
];

const GoGlobalLandingPage = () => {
  useSeo({
    title: "Fil One · Go global. Skip the multi-year build.",
    description:
      "Embed S3-compatible object storage into your product. Global network, SLA-backed, $4.99/TB flat. No capex, no infrastructure build — contact for enterprise and embedding terms.",
    canonical: "https://www.fil.one/lp/go-global",
  });

  const { ref: problemRef,  inView: problemInView  } = useInView({ threshold: 0.05 });
  const { ref: scaleRef,    inView: scaleInView    } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,      inView: ctaInView      } = useInView({ threshold: 0.05 });

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
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For data-heavy scale-ups offering storage as part of their product</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 760, margin: 0 }}>
              Go global.<br /><span style={{ color: "#0090FF" }}>Skip the multi-year build.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 600, margin: 0 }}>
              Embed S3-compatible object storage into your product. Global network, SLA-backed, $4.99/TB flat. Your customers get global storage — you skip the infrastructure capex.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="/contact-sales" className="btn-primary"><span className="btn-primary-inner">Talk to our team</span></a>
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-secondary">Evaluate the API</a>
            </div>
            <p className="hero-fade-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", textAlign: "center" }}>Enterprise and embedding terms available · Contact-led</p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={problemRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[640px] mx-auto">
              <SectionLabel>The build vs buy decision</SectionLabel>
              <SectionHeading>Building globally competitive storage infrastructure takes years and serious capex.</SectionHeading>
              <SectionSub maxWidth={620}>
                Data-heavy scale-ups that want to offer storage as a first-class product feature face a choice: build the infrastructure themselves (3–5 years, significant capex) or stay regional. Embedding Fil One removes the infrastructure build from the roadmap.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "The build cost",    catch: "Durable S3-compatible storage at scale takes years.",         body: "Durability, S3 API parity, multi-region replication, and operational tooling at petabyte scale is a multi-year engineering programme. A product team that builds this is not building the product." },
                { label: "The capex ceiling", catch: "Hardware cycles don't match customer growth.",               body: "On-premise or co-lo storage infrastructure scales in discrete hardware increments. Teams overbuild capacity and carry unused cost, or underbuild and miss customer demand. A pay-per-use layer removes the commitment." },
                { label: "The regional trap", catch: "Staying regional limits the addressable market.",             body: "A product that only serves one region competes against hyperscalers that serve every region. Embedding a global-network storage layer makes the product globally competitive without the multi-year infrastructure investment." },
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

        {/* Scale cost table */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={scaleRef} className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${scaleInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>The cost model</SectionLabel>
              <SectionHeading>Storage that <span style={{ color: "#0090FF" }}>scales linearly with your product.</span></SectionHeading>
              <SectionSub maxWidth={620}>Monthly storage cost at different scales. AWS S3 Standard (tiered) vs Fil One flat rate. The gap widens as the product grows.</SectionSub>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: 400, borderCollapse: "collapse", fontFamily: "'Funnel Sans', sans-serif" }}>
                <thead>
                  <tr>
                    {["Scale", "AWS S3 Standard", "Fil One"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "11px 16px", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#71717A", borderBottom: "1px solid rgba(0,0,0,0.07)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCALE_ROWS.map(r => (
                    <tr key={r.scale}>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14, fontWeight: 600, color: "#09090B" }}>{r.scale}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: "#dc2626", fontWeight: 500 }}>{r.aws}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 15, color: "#0070CC", fontWeight: 700, backgroundColor: "#EFF8FF" }}>{r.filOne}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">AWS S3 Standard us-east-1 Q2 2026: tiered storage $0.023/GB first 50 TB, $0.022/GB next 450 TB, $0.021/GB over 500 TB. Fil One $4.99/TB flat. Storage only; egress additional on AWS, $0 on Fil One.</p>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>For product teams</SectionLabel>
              <SectionHeading>Global storage that your <span style={{ color: "#0090FF" }}>customers already know how to use.</span></SectionHeading>
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

        {/* Dark CTA — contact-led */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }} className="px-6 md:px-12 py-16 md:py-[104px]">
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Global storage in your product. None of the capex.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Talk to the Fil One team about embedding the storage layer in your product. Enterprise and multi-year terms available.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="/contact-sales" className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Talk to our team</span></a>
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-secondary btn-secondary-dark">Evaluate the API</a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>Enterprise and embedding terms available · sales@fil.one</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GoGlobalLandingPage;
