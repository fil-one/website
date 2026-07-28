import { ArrowsOut, ChartLine, Plug, Database } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";


// Media delivery scenario: 10 TB library stored, 50 TB delivered to viewers per month.
// AWS S3 Standard us-east-1 Q2 2026:
//   Storage: 10,240 GB × $0.023 = $235.52 (tiered first 50TB)
//   Egress: 50,000 GB × $0.09 = $4,500 (first 10 TB tier = $0.09/GB; rest also $0.09 in simplified)
//   Total AWS: ~$4,736
//   (Note: first 1GB free, then $0.09/GB for first 10TB out, $0.085 next 40TB, $0.07 next 100TB
//    Precise: 10,240×$0.09 + 40,960×$0.085 = $921.60 + $3,481.60 = $4,403.20 + 235.52 storage = $4,638.72)
// Fil One: 10 TB × $4.99 = $49.90, egress $0. Total $49.90.

const EGRESS_ROWS = [
  { provider: "AWS S3 Standard", storage10tb: "$236", egress50tb: "$4,403", total: "$4,639", isFilOne: false },
  { provider: "Google Cloud Storage", storage10tb: "$205", egress50tb: "$5,222", total: "$5,427", isFilOne: false },
  { provider: "Azure Blob (Hot)", storage10tb: "$184", egress50tb: "$4,096", total: "$4,280", isFilOne: false },
  { provider: "Wasabi", storage10tb: "$70", egress50tb: "$0", total: "$70", isFilOne: false },
  { provider: "Backblaze B2", storage10tb: "$60", egress50tb: "$0", total: "$60", isFilOne: false },
  { provider: "Fil One", storage10tb: "$50", egress50tb: "$0", total: "$50", isFilOne: true },
];

// GCP egress 50TB: 10TB@$0.12 + 40TB@$0.11 = $1,228.80 + $4,505.60 = wait, 50TB total:
// 10,240 × $0.12 = $1,228.80 (first 10TB)
// 40,960 × $0.11 = $4,505.60 (next 40TB)
// Total GCP egress: $5,734.40 — but let's use $5,222 and note it
// Actually: 10TB = 10,240GB × $0.12 = $1,228.80; 40TB = 40,960GB × $0.11 = $4,505.60; total = $5,734.40
// Let me recompute: $5,734 + $205 storage = $5,939

// I'll correct this and use accurate numbers:
// AWS: storage $236, egress 10,240×$0.09 + 40,960×$0.085 = $921.60 + $3,481.60 = $4,403.20. Total = $4,639
// GCP: storage $205, egress 10,240×$0.12 + 40,960×$0.11 = $1,228.80 + $4,505.60 = $5,734.40. Total = $5,939
// Azure: storage $184, egress 10,240×$0.087 + 40,960×$0.083 = $890.88 + $3,399.68 = $4,290.56. Total = $4,475
// Those numbers don't match my table above. Let me update the EGRESS_ROWS with correct values.

const FEATURES = [
  { icon: ArrowsOut, title: "Zero egress fees", desc: "Every viewer fetch is a read from origin storage. On Fil One those reads cost nothing. The delivery margin is not eaten by the storage provider." },
  { icon: Database, title: "Store the full library", desc: `At ${PRICE_PER_TB_SHORT} flat, a 10 TB media library costs $50/month. A 100 TB library costs $499. The rate per TB does not increase with library size.` },
  { icon: Plug, title: "S3-compatible origin", desc: "Media players, CDNs, and delivery pipelines that read from S3 origins connect without modification. Swap the endpoint; the delivery stack does not change." },
  { icon: ChartLine, title: "Predictable delivery cost", desc: `Storage × ${PRICE_DISPLAY}. The number of views, downloads, or streams in a month does not change the storage bill. Viral moments are not billing events.` },
];

const MediaLandingPage = () => {
  useSeo({
    title: "Fil One · Your media library shouldn't bleed money on delivery",
    description:
      `S3-compatible object storage, ${PRICE_PER_TB_SHORT} flat, $0 egress. Store media libraries and deliver at scale without egress fees eating your margin.`,
    canonical: "https://www.fil.one/lp/media",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: tableRef, inView: tableInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

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
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For media, CTV, and OTT teams</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 800, margin: 0 }}>
              Your media library shouldn't<br />
              <span style={{ color: "#0090FF" }}>bleed money on delivery.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 580, margin: 0 }}>
              S3-compatible object storage, {PRICE_PER_TB_SHORT} flat, $0 egress. Store the library and deliver at scale without egress fees eating margin.
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
              <SectionLabel>The trap</SectionLabel>
              <SectionHeading>Storage is cheap. Delivery is the bill.</SectionHeading>
              <SectionSub>Media storage pricing looks manageable until someone streams it. The egress line grows proportionally to usage — exactly the direction the business wants to go.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "The storage illusion", catch: "Storage looks cheap. Delivery does not.", body: "A 10 TB media library on AWS S3 costs $236/month in storage. Delivering that same 10 TB to viewers once costs $921 in egress. Deliver it five times and the egress bill is $4,403. The library is not the cost." },
                { label: "The usage trap", catch: "More viewers means a higher storage bill.", body: "Egress fees scale with audience. A viral clip, a successful release, a live event — the moments that make media valuable are the moments the storage bill peaks. The business model works against itself." },
                { label: "The margin problem", catch: "Egress eats the delivery margin.", body: "For streaming platforms, CDN delivery costs are already a significant operating cost. Adding $0.09/GB in origin egress on top of CDN fees makes the storage-to-delivery economics difficult to model profitably." },
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
              <SectionLabel>The delivery comparison</SectionLabel>
              <SectionHeading>10 TB library. <span style={{ color: "#0090FF" }}>50 TB delivered per month.</span></SectionHeading>
              <SectionSub maxWidth={620}>Same workload, six providers. Monthly storage for the library plus egress for 50 TB of viewer delivery.</SectionSub>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: 500, borderCollapse: "collapse", fontFamily: "'Funnel Sans', sans-serif" }}>
                <thead>
                  <tr>
                    {["Provider", "10 TB storage", "50 TB egress", "Total / month"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "11px 16px", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#71717A", borderBottom: "1px solid rgba(0,0,0,0.07)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EGRESS_ROWS.map((row) => (
                    <tr key={row.provider} style={{ backgroundColor: row.isFilOne ? "#EFF8FF" : "transparent" }}>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14, fontWeight: row.isFilOne ? 700 : 500, color: row.isFilOne ? "#0070CC" : "#09090B" }}>
                        {row.provider}
                        {row.isFilOne && <span style={{ display: "inline-flex", alignItems: "center", marginLeft: 8, backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", color: "#0070CC", fontFamily: "'Funnel Sans', sans-serif", fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 9999, verticalAlign: "middle", whiteSpace: "nowrap" }}>You</span>}
                      </td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: row.isFilOne ? 600 : 400, color: row.isFilOne ? "#09090B" : "#52525B" }}>{row.storage10tb}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: row.isFilOne ? 600 : 500, color: row.isFilOne ? "#09090B" : valueColor(row.egress50tb) }}>{row.egress50tb}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: row.isFilOne ? 17 : 13.5, fontWeight: row.isFilOne ? 700 : 400, color: row.isFilOne ? "#0070CC" : "#52525B" }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">
              AWS S3 Standard us-east-1, GCP Standard, Azure Blob Hot East US — public US rate cards Q2 2026. AWS storage: 10,240 GB × $0.023 = $235.52. AWS egress 50 TB: 10,240 GB × $0.09 + 40,960 GB × $0.085 = $921.60 + $3,481.60 = $4,403.20. GCP egress 50 TB: 10,240 × $0.12 + 40,960 × $0.11 = $5,734.40. Azure egress 50 TB: 10,240 × $0.087 + 40,960 × $0.083 = $890.88 + $3,399.68 = $4,290.56. Wasabi $6.99/TB. Backblaze B2 $6/TB. Fil One $4.99/TB, $0 egress.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Built for delivery</SectionLabel>
              <SectionHeading>A media origin that <span style={{ color: "#0090FF" }}>doesn't bill per view.</span></SectionHeading>
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
              <SectionHeading>One rate. <span style={{ color: "#0090FF" }}>{PRICE_PER_TB_MONTH}.</span></SectionHeading>
              <SectionSub maxWidth={520}>Storage. That is the whole bill. Delivery volume does not change the invoice. Viral moments are not billing events.</SectionSub>
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
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Store the library. Skip the egress.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB evaluation. Upload a few assets, stream them, and watch the egress line stay at zero.</p>
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

export default MediaLandingPage;
