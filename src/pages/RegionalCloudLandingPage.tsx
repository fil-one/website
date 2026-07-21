import { ArrowsOut, ChartLine, Plug, ShieldCheck } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


const FEATURES = [
  { icon: Plug, title: "S3-compatible API", desc: "Your customers use standard S3 tooling — the same SDKs, CLIs, and integrations they already run. No custom adapters." },
  { icon: ShieldCheck, title: "SLA-backed infrastructure", desc: "Deployment SLAs for capacity assurance, available on annual terms. Enterprise and multi-year terms through the Business plan." },
  { icon: ArrowsOut, title: "No egress penalty", desc: "Your customers move data in and out without egress fees. The cost model does not penalise usage — predictable for them and for you." },
  { icon: ChartLine, title: "Network reach", desc: "{{NEEDS PROOF: specific regions and geographies covered by the storage network — needed to make credible partner-facing claims}}" },
];

const RegionalCloudLandingPage = () => {
  useSeo({
    title: "Fil One · Offer global storage without building it",
    description:
      "S3-compatible object storage infrastructure you can embed in your regional cloud offering. SLA-backed, partner-ready. Contact for commercial terms.",
    canonical: "https://www.fil.one/lp/regional-cloud",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: networkRef, inView: networkInView } = useInView({ threshold: 0.05 });
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
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For teams building regional or sovereign cloud offerings</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 800, margin: 0 }}>
              Offer global storage<br />
              <span style={{ color: "#0090FF" }}>without building it.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 580, margin: 0 }}>
              S3-compatible object storage infrastructure you can embed in your cloud product. SLA-backed, partner-ready, flat pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="/contact-sales" className="btn-primary"><span className="btn-primary-inner">Talk to our team</span></a>
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-secondary">Evaluate the API</a>
            </div>
            <p className="hero-fade-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", textAlign: "center" }}>Partner and enterprise terms available · Contact-led</p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={problemRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>Build vs buy</SectionLabel>
              <SectionHeading>Storage infrastructure is a capex commitment, not a feature.</SectionHeading>
              <SectionSub>Building durable, S3-compatible object storage from scratch requires hardware capex, operational headcount, and years of iteration. Partners who embed Fil One skip that — and launch with a production-grade storage layer on day one.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "The build cost", catch: "Storage infrastructure takes years to mature.", body: "Durability, consistency, and S3 compatibility at scale are unsolved by a small engineering team quickly. A regional cloud that builds storage internally competes with its own roadmap." },
                { label: "The capex commitment", catch: "Hardware cycles do not match customer growth.", body: "On-premise storage scales in discrete increments. Over-provisioning is expensive. Under-provisioning means customer SLA failures. Embedding a pay-per-use layer removes the hardware commitment." },
                { label: "The integration tax", catch: "Customers want S3. Not a proprietary API.", body: "A storage product that requires its own SDK loses customers to hyperscalers immediately. S3 compatibility means every existing tool, SDK, and workflow that customers already run will work on day one." },
              ].map(({ label, body, catch: catchLine }) => (
                <div key={label} className="flex flex-col rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}>
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#52525B", backgroundColor: "#F4F4F5", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 9999, padding: "3px 10px", marginBottom: 2, alignSelf: "flex-start" }}>{label}</span>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.3", letterSpacing: "-0.01em", color: "#09090B" }}>{catchLine}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.65, color: "#71717A", marginTop: 4 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Network / SLA section */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={networkRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${networkInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Partner infrastructure</SectionLabel>
              <SectionHeading>SLA-backed. <span style={{ color: "#0090FF" }}>S3-compatible from day one.</span></SectionHeading>
              <SectionSub maxWidth={620}>Deployment SLAs and capacity assurance are available on annual and multi-year terms. The storage layer your customers see is standard S3 — no custom integration required.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { heading: "Deployment SLAs", sub: "Capacity assurance and deployment SLAs available on 1, 3, and 5-year terms via the Business plan. Contact for terms." },
                { heading: "S3 API compatibility", sub: "Full S3 API — same SDKs, same tooling, same integration patterns as AWS S3. No re-architecture for your customers." },
                { heading: "Flat, predictable pricing", sub: "$4.99/TB/month, no egress, no per-request fees. Simple cost modelling for your own pricing layer." },
              ].map(({ heading, sub }) => (
                <div key={heading} style={{ border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, backgroundColor: "#F9FAFB", padding: "24px 24px", textAlign: "left" }}>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 17, color: "#09090B", marginBottom: 8, lineHeight: "1.3" }}>{heading}</p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A", margin: 0 }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Partner capabilities</SectionLabel>
              <SectionHeading>What your cloud <span style={{ color: "#0090FF" }}>runs on.</span></SectionHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc }) => {
                const isPlaceholder = desc.startsWith("{{NEEDS PROOF");
                return (
                  <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl border" style={{ borderColor: isPlaceholder ? "rgba(180,83,9,0.2)" : "rgba(0,0,0,0.07)", backgroundColor: isPlaceholder ? "#FFFBEB" : "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04)", textAlign: "left" }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}><Icon size={18} color="#0090FF" /></div>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>{title}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: isPlaceholder ? "#92400E" : "#71717A" }}>{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dark CTA — contact-led */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }} className="px-6 md:px-12 py-16 md:py-[104px]">
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Your cloud. Our network underneath.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Talk to the Fil One partnerships team about embedding the storage layer in your cloud product. Enterprise and multi-year terms available.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="/contact-sales" className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Talk to our team</span></a>
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-secondary btn-secondary-dark">Evaluate the API</a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>Partner and enterprise terms available · sales@fil.one</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RegionalCloudLandingPage;
