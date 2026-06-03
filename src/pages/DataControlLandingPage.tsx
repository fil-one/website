import { ShieldCheck, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


const FEATURES = [
  { icon: ShieldCheck, title: "Integrity verification, ~24 h",      desc: "Every stored object is verified approximately every 24 hours. Data cannot silently change without detection — observable integrity, not a vendor assurance.",              placeholder: false },
  { icon: ArrowsOut,   title: "No exit egress",                      desc: "$0 to move data out. Portability is not penalised. You can leave without an exit bill — which means staying is a choice, not a lock-in.",                                     placeholder: false },
  { icon: Plug,        title: "S3-compatible tooling",               desc: "Standard S3 API — your existing SDKs, CLIs, and audit tooling work without custom adapters. Control does not require a new stack.",                                            placeholder: false },
  { icon: ChartLine,   title: "Operator-level placement",            desc: "{{NEEDS PROOF: specific region and operator-pinning capability — which operators/regions can be selected, and how this is configured}}",                                        placeholder: true  },
];

const DataControlLandingPage = () => {
  useSeo({
    title: "Fil One — Your data, under your control",
    description:
      "S3-compatible storage with EU region endpoint, recurring integrity verification, $0 exit egress, and no vendor lock-in. Flat $4.99/TB.",
    canonical: "https://fil.one/lp/data-control",
  });

  const { ref: problemRef,  inView: problemInView  } = useInView({ threshold: 0.05 });
  const { ref: trustRef,    inView: trustInView    } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,      inView: ctaInView      } = useInView({ threshold: 0.05 });

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
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For EU teams with data residency and control requirements</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 760, margin: 0 }}>
              Your data,<br /><span style={{ color: "#0090FF" }}>under your control.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 580, margin: 0 }}>
              S3-compatible storage with EU region endpoint, recurring integrity verification every ~24 hours, and $0 exit egress. Control is provable, not contractual.
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
              <SectionLabel>The control gap</SectionLabel>
              <SectionHeading>Hyperscalers offer regions. They don't offer proof.</SectionHeading>
              <SectionSub maxWidth={620}>
                Selecting an EU region on AWS or Google Cloud controls where data is written by default. It does not give you a verifiable record that the data hasn't changed, moved, or been silently accessed — it gives you a contractual assurance.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "The region illusion",   catch: "A region setting is not data control.",            body: "Cloud providers replicate, migrate, and process data across infrastructure according to their own operational needs. An EU region bucket stays in EU storage — but the operational boundary is defined by the vendor, not you." },
                { label: "The exit penalty",      catch: "Portability costs money on metered storage.",      body: "Moving data out of a hyperscaler costs $0.09/GB. At any meaningful scale, that exit bill is the mechanism that makes 'control' feel theoretical. Real control requires the ability to leave without a financial penalty." },
                { label: "The audit assumption",  catch: "Compliance asks for evidence, not assurances.",    body: "Audit and regulatory frameworks are increasingly asking for verifiable data provenance — not vendor SLA documents. Integrity verification that runs automatically provides a record, not a promise." },
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

        {/* Trust / integrity section */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={trustRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${trustInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>What control looks like</SectionLabel>
              <SectionHeading>Verified integrity. <span style={{ color: "#0090FF" }}>Zero exit cost. EU endpoint.</span></SectionHeading>
              <SectionSub maxWidth={620}>
                Three things that make control concrete: data you can prove hasn't changed, data you can move without a bill, and data that stays in EU infrastructure.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { heading: "~24-hour integrity verification", sub: "Every stored object is verified on a recurring basis — approximately every 24 hours. Data cannot silently corrupt or change without detection. This is built into the storage layer, not a monitoring add-on." },
                { heading: "EU endpoint at eu-west-1", sub: "Data written to https://eu-west-1.s3.fil.one stays in EU-hosted infrastructure. Standard S3 tools connect with the endpoint change — no re-architecture." },
                { heading: "$0 exit egress", sub: "Moving your data to another provider costs nothing in egress. Portability is structural, not contractual. The exit is $0 from day one." },
              ].map(({ heading, sub }) => (
                <div key={heading} style={{ border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, backgroundColor: "#F9FAFB", padding: "24px 24px" }}>
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
              <SectionLabel>Capabilities</SectionLabel>
              <SectionHeading>Control that is <span style={{ color: "#0090FF" }}>observable, not promised.</span></SectionHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc, placeholder }) => (
                <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl border" style={{ borderColor: placeholder ? "rgba(180,83,9,0.2)" : "rgba(0,0,0,0.07)", backgroundColor: placeholder ? "#FFFBEB" : "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04)", textAlign: "left" }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}><Icon size={18} color="#0090FF" /></div>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>{title}</p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: placeholder ? "#92400E" : "#71717A" }}>{desc}</p>
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
              <SectionSub maxWidth={520}>Storage. No egress, no per-request fees. EU data residency does not carry a premium over the standard rate.</SectionSub>
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
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Your data. Verifiable integrity. No exit bill.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB on the EU endpoint. Point your existing S3 tools and see integrity verification in action.</p>
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

export default DataControlLandingPage;
