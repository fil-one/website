import { ArrowsOut, ChartLine, Plug, Database } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';
import { PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";


// Cost-at-scale table. Scenario: 50% egress ratio (reads = 50% of stored volume per month).
// AWS S3 Standard us-east-1 Q2 2026 (storage tiered; egress $0.09/GB):
//   1 TB:   storage 1,024×$0.023=$23.55,  egress 512×$0.09=$46.08.  Total $69.63 → $70
//   10 TB:  storage 10,240×$0.023=$235.52, egress 5,120×$0.09=$460.80. Total $696.32 → $696
//   100 TB: storage (51,200×$0.023)+(51,200×$0.022)=$1,177.60+$1,126.40=$2,304,
//           egress 51,200×$0.09=$4,608. Total $6,912
//   500 TB: storage (51,200×$0.023)+(460,800×$0.022)=$1,177.60+$10,137.60=$11,315.20,
//           egress 256,000×$0.09=$23,040. Total $34,355
// Fil One: 1TB×$4.99=$4.99, 10TB×$4.99=$49.90, 100TB×$4.99=$499, 500TB×$4.99=$2,495
const SCALE_ROWS = [
  { scale: "1 TB",   awsStorage: "$24",    awsEgress: "$46",    awsTotal: "$70",     filOne: "$5" },
  { scale: "10 TB",  awsStorage: "$236",   awsEgress: "$461",   awsTotal: "$697",    filOne: "$50" },
  { scale: "100 TB", awsStorage: "$2,304", awsEgress: "$4,608", awsTotal: "$6,912",  filOne: "$499" },
  { scale: "500 TB", awsStorage: "$11,315",awsEgress: "$23,040",awsTotal: "$34,355", filOne: "$2,495" },
];

const FEATURES = [
  { icon: ChartLine, title: "Flat, predictable cost", desc: "One rate per TB. Player growth, UGC spikes, and live-event surges don't change the rate. Cost planning for storage is one multiplication." },
  { icon: ArrowsOut, title: "No egress fees", desc: "Serving game assets, player replays, or UGC to clients costs $0 in egress. Multiplayer downloads are not a billing event." },
  { icon: Database, title: "S3-compatible", desc: "Standard S3 SDKs for asset pipelines, save-game syncs, and replay storage. Drop in as a replacement without changing the existing upload code." },
  { icon: Plug, title: "No per-request fees", desc: "High-frequency asset reads during matchmaking, lobby loading, and live sessions don't accrue per-GET charges. Request rate is not a cost input." },
];

const GamingLandingPage = () => {
  useSeo({
    title: "Fil One · Player data that scales without bill shock",
    description:
      `${PRICE_PER_TB_SHORT} flat storage for game studios. Store player data, UGC, and game assets without egress fees or per-request billing. No bill shock on growth.`,
    canonical: "https://www.fil.one/lp/gaming",
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
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For game studios storing player data, UGC, and assets</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 760, margin: 0 }}>
              Player data that scales<br /><span style={{ color: "#0090FF" }}>without bill shock.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 580, margin: 0 }}>
              {PRICE_PER_TB_SHORT} flat. No egress, no per-request fees, S3-compatible. Storage cost grows linearly with your player base — not ahead of it.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href={signupUrl()} className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
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
              <SectionHeading>Spiky growth makes hyperscaler storage bills unpredictable.</SectionHeading>
              <SectionSub>Player data, UGC, replays, and game assets grow with the game. On AWS, storage cost scales with volume but egress scales with activity — and player activity is exactly what you're trying to drive.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "Launch day", catch: "Traffic spikes become egress bills.", body: "A successful launch or live event brings player spikes. On AWS, every asset served — game files, player avatars, replays — adds to the egress counter. The best day for the game is the most expensive day for the storage bill." },
                { label: "UGC growth", catch: "More uploads means more reads means more cost.", body: "User-generated content that gets shared, downloaded, and viewed is high-read storage. On per-egress pricing, popular UGC costs more to serve than unpopular UGC. The platform success penalises the infrastructure bill." },
                { label: "The surprise invoice", catch: "Storage forecasts omit egress.", body: "Infra cost planning for a game typically models storage volume. Egress is an activity multiplier that is hard to forecast without production data. The invoice after a good month regularly surprises." },
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

        {/* Cost-at-scale comparison */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={tableRef} className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${tableInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>Flat vs tiered</SectionLabel>
              <SectionHeading>What storage costs <span style={{ color: "#0090FF" }}>as the game grows.</span></SectionHeading>
              <SectionSub maxWidth={620}>AWS S3 Standard vs Fil One at 50% egress ratio (reads = half of stored volume per month). Storage and egress computed from stated volume and public rate cards.</SectionSub>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: 540, borderCollapse: "collapse", fontFamily: "'Funnel Sans', sans-serif" }}>
                <thead>
                  <tr>
                    {["Scale", "AWS storage", "AWS egress (50%)", "AWS total", "Fil One total"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "11px 16px", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#71717A", borderBottom: "1px solid rgba(0,0,0,0.07)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCALE_ROWS.map((row) => (
                    <tr key={row.scale}>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14, fontWeight: 600, color: "#09090B" }}>{row.scale}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: "#52525B" }}>{row.awsStorage}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: "#dc2626", fontWeight: 500 }}>{row.awsEgress}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: "#dc2626", fontWeight: 700 }}>{row.awsTotal}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 15, color: "#0070CC", fontWeight: 700, backgroundColor: "#EFF8FF" }}>{row.filOne}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">
              AWS S3 Standard us-east-1 Q2 2026: storage tiered $0.023/GB (first 50 TB), $0.022/GB (next 450 TB); egress $0.09/GB. Fil One $4.99/TB flat, egress $0. Computed from stated inputs — 1 TB: 1,024 GB × $0.023 = $23.55 storage + 512 GB × $0.09 = $46.08 egress; 500 TB: (51,200 × $0.023) + (460,800 × $0.022) = $11,315.20 storage + 256,000 × $0.09 = $23,040 egress.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Built for games</SectionLabel>
              <SectionHeading>Storage that grows with <span style={{ color: "#0090FF" }}>player count, not bill.</span></SectionHeading>
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
              <SectionSub maxWidth={520}>Storage. That is the whole bill. No egress, no per-request fees. The invoice is predictable before the season starts.</SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href={signupUrl()} className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
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
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Flat storage for unpredictable growth.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB evaluation. Connect your existing S3 asset pipeline and see a storage bill that doesn't react to player activity.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href={signupUrl()} className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Start for free</span></a>
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

export default GamingLandingPage;
