import { ShieldCheck, ArrowsOut, ChartLine, Database } from "@phosphor-icons/react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


// PB-scale cost comparison. 1 PB = 1,000 TB = 1,024,000 GB.
// AWS S3 Standard us-east-1 Q2 2026 storage tiers:
//   First 50 TB (51,200 GB):   $0.023/GB → $1,177.60
//   Next 450 TB (460,800 GB):  $0.022/GB → $10,137.60
//   Over 500 TB (512,000 GB):  $0.021/GB → $10,752.00
//   Total 1 PB storage: $22,067.20 → $22,067
// 1 PB + 200 TB analysis reads (204,800 GB) egress at $0.09/GB = $18,432
// AWS total: $22,067 + $18,432 = $40,499
// Fil One: 1,000 TB × $4.99 = $4,990/month, egress $0. Total $4,990.
const PB_ROWS = [
  { provider: "AWS S3 Standard", storage1pb: "$22,067", egress200tb: "$18,432", total: "$40,499", isFilOne: false },
  { provider: "Fil One",          storage1pb: "$4,990",  egress200tb: "$0",      total: "$4,990",  isFilOne: true  },
];

const FEATURES = [
  { icon: ShieldCheck, title: "Recurring integrity verification", desc: "Every stored object is verified approximately every 24 hours. Genomics datasets cannot silently corrupt between write and analysis without detection." },
  { icon: Database, title: "11 nines durability", desc: "Designed for 11 nines of durability. Long-retention datasets — sequenced once, analysed for years — require a storage layer that treats loss as an event to detect and recover." },
  { icon: ArrowsOut, title: "No egress on analysis", desc: "Re-analysing the dataset from a new pipeline, re-running variant calling, or sharing data with collaborators costs $0 in egress. The cost is the bytes you keep." },
  { icon: ChartLine, title: "Flat petabyte pricing", desc: "$4.99/TB regardless of scale. 1 TB and 1 PB pay the same rate per TB. Retention decisions are not driven by storage-tier economics." },
];

const GenomicsLandingPage = () => {
  useSeo({
    title: "Fil One — Petabyte retention without the petabyte bill",
    description:
      "S3-compatible storage at $4.99/TB flat for genomics and research data. Recurring integrity verification, 11 nines durability, $0 egress. Keep the whole dataset for years.",
    canonical: "https://fil.one/lp/genomics",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: tableRef, inView: tableInView } = useInView({ threshold: 0.05 });
  const { ref: integrityRef, inView: integrityInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

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
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For genomics and research teams with long-retention datasets</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 800, margin: 0 }}>
              Petabyte retention<br /><span style={{ color: "#0090FF" }}>without the petabyte bill.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 580, margin: 0 }}>
              S3-compatible storage at $4.99/TB flat, with recurring integrity verification and 11 nines durability. Keep the whole dataset, for years.
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
              <SectionLabel>The problem</SectionLabel>
              <SectionHeading>Petabyte datasets cost petabytes to keep and petabytes to re-analyse.</SectionHeading>
              <SectionSub>Genomics data is produced once but analysed repeatedly, often years later as pipelines improve. Standard storage pricing charges again on every analysis — and assumes the data is intact without proving it.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "The storage bill", catch: "1 PB on AWS costs $22,067/month.", body: "AWS S3 Standard at tiered rates — $0.023/GB for the first 50 TB, $0.022 for the next 450 TB, $0.021 after — adds up to $22,067/month for a single petabyte. Before a single analysis read." },
                { label: "The re-analysis cost", catch: "Running a new pipeline means paying egress again.", body: "Re-analysing 200 TB of sequencing data with a new variant-calling pipeline incurs 204,800 GB × $0.09 = $18,432 in egress on AWS. Teams plan re-analysis cycles around the egress cost, not the science." },
                { label: "The integrity assumption", catch: "Long-retention data is assumed intact.", body: "Standard object storage replicates data but does not continuously verify each stored object's content. A genomics archive held for five years can silently degrade — undetectable until the analysis fails." },
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

        {/* Comparison table */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={tableRef} className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${tableInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>The numbers</SectionLabel>
              <SectionHeading>1 PB stored. <span style={{ color: "#0090FF" }}>200 TB re-analysed per month.</span></SectionHeading>
              <SectionSub maxWidth={620}>Monthly storage for 1 PB plus egress for 200 TB of analysis reads. Computed from public US rate cards, Q2 2026.</SectionSub>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: 480, borderCollapse: "collapse", fontFamily: "'Funnel Sans', sans-serif" }}>
                <thead>
                  <tr>
                    {["Provider", "1 PB storage/mo", "200 TB egress/mo", "Total / month"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "11px 16px", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#71717A", borderBottom: "1px solid rgba(0,0,0,0.07)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PB_ROWS.map((row) => (
                    <tr key={row.provider} style={{ backgroundColor: row.isFilOne ? "#EFF8FF" : "transparent" }}>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14, fontWeight: row.isFilOne ? 700 : 500, color: row.isFilOne ? "#0070CC" : "#09090B" }}>
                        {row.provider}
                        {row.isFilOne && <span style={{ display: "inline-flex", alignItems: "center", marginLeft: 8, backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", color: "#0070CC", fontFamily: "'Funnel Sans', sans-serif", fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 9999, verticalAlign: "middle", whiteSpace: "nowrap" }}>You</span>}
                      </td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: row.isFilOne ? 600 : 400, color: row.isFilOne ? "#09090B" : "#52525B" }}>{row.storage1pb}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: row.isFilOne ? 600 : 500, color: row.egress200tb === "$0" ? (row.isFilOne ? "#09090B" : "#16a34a") : "#dc2626" }}>{row.egress200tb}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: row.isFilOne ? 17 : 13.5, fontWeight: row.isFilOne ? 700 : 400, color: row.isFilOne ? "#0070CC" : "#dc2626" }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">
              AWS S3 Standard us-east-1 Q2 2026 storage: tiered rates — first 50 TB $0.023/GB ($1,177.60), next 450 TB $0.022/GB ($10,137.60), over 500 TB $0.021/GB ($10,752.00) = $22,067.20 for 1,024,000 GB. AWS egress: 204,800 GB × $0.09 = $18,432. Fil One: 1,000 TB × $4.99 = $4,990, egress $0.
            </p>
          </div>
        </section>

        {/* Integrity section */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={integrityRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${integrityInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Data integrity</SectionLabel>
              <SectionHeading>Sequenced once. <span style={{ color: "#0090FF" }}>Verifiable indefinitely.</span></SectionHeading>
              <SectionSub maxWidth={620}>Genomics data that is produced once and retained for years needs continuous verification, not a write-and-hope model. Every object on Fil One is verified approximately every 24 hours — the storage layer actively confirms integrity.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { heading: "~24-hour verification cadence", sub: "Every stored object is verified on a recurring basis. Data cannot silently corrupt over months or years without detection." },
                { heading: "11 nines durability", sub: "Designed for 11 nines of durability. Long-retention research data is treated as irreplaceable — because it is." },
                { heading: "$0 to re-analyse", sub: "Running a new pipeline against the full dataset costs $0 in egress. Analysis decisions are driven by the science, not the read cost." },
              ].map(({ heading, sub }) => (
                <div key={heading} style={{ border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, backgroundColor: "#FFFFFF", padding: "24px 24px", textAlign: "left" }}>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 17, color: "#09090B", marginBottom: 8, lineHeight: "1.3" }}>{heading}</p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A", margin: 0 }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Research storage</SectionLabel>
              <SectionHeading>Keep the whole dataset. <span style={{ color: "#0090FF" }}>For years.</span></SectionHeading>
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
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div className="flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>One rate. <span style={{ color: "#0090FF" }}>$4.99/TB/month.</span></SectionHeading>
              <SectionSub maxWidth={520}>Storage. That is the whole bill. Integrity verification, 11 nines durability, and free egress are included at every scale.</SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A" }}>No credit card required · No egress fees · Connects in minutes</p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }} className="px-6 md:px-12 py-16 md:py-[104px]">
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Keep the whole dataset. For years.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB evaluation. Upload a dataset slice and confirm your existing analysis tooling connects without modification.</p>
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

export default GenomicsLandingPage;
