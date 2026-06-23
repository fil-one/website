import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import FaqSection from "@/components/FaqSection";
import {
  FilmSlate,
  CloudArrowDown,
  Archive,
  CurrencyDollar,
  ArrowsClockwise,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react";

const FEATURES = [
  {
    icon: FilmSlate,
    title: "Raw footage & finished masters",
    body: "Store camera originals, proxies, and finished files alongside each other. Reference from your NLE via S3 mount or direct API.",
  },
  {
    icon: CloudArrowDown,
    title: "No egress fees on downloads",
    body: "Pull a 4K master to a new edit suite, share a rough cut with a client, or restore from archive. No egress fees.",
  },
  {
    icon: Archive,
    title: "Long-term archive at low cost",
    body: "$4.99/TB/month, no retrieval fees, no minimum storage duration. Cheaper than cold tiers that penalize you for accessing your own data.",
  },
  {
    icon: CurrencyDollar,
    title: "Predictable billing",
    body: "Flat per-TB rate. No per-operation fees, no tiered retrieval charges, no surprise bills after a busy delivery month.",
  },
  {
    icon: ArrowsClockwise,
    title: "S3-compatible — works with your tools",
    body: "Integrates with DaVinci Resolve, Final Cut Pro via S3 plugins, LucidLink, Iconik, and any media asset management system with S3 support.",
  },
  {
    icon: ShieldCheck,
    title: "Verifiable asset provenance",
    body: "Every file gets a cryptographic seal. Prove a master was never altered after delivery — useful for licensing disputes and compliance audits.",
  },
];


const USECASES = [
  {
    title: "Broadcast & streaming archives",
    body: "Store finished episodes, raw camera rolls, and ingest files in one place. Access any asset instantly without retrieval delays or fees.",
  },
  {
    title: "Post-production studios",
    body: "Keep proxies, color-graded masters, and project files alongside each other. Share deliverables with clients via presigned URLs — no FTP, no courier.",
  },
  {
    title: "News & documentary teams",
    body: "Archive years of footage with verifiable provenance. Prove a clip was never altered — essential for editorial credibility and licensing.",
  },
  {
    title: "Sports rights & licensing",
    body: "Store highlight reels, raw match footage, and licensed clips at scale. Pull content for re-licensing or distribution with zero egress cost.",
  },
];

const MediaArchiveSolutionPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: featRef, inView: featInView } = useInView({ threshold: 0.1 });
  const { ref: ucRef, inView: ucInView } = useInView({ threshold: 0.1 });

  useSeo({
    title: "Media & Archive Storage — Fil One",
    description:
      "Low-cost, high-durability object storage for video, audio, and long-term archives. No egress fees, no retrieval penalties. $4.99/TB/month.",
    canonical: "https://fil.one/solutions/media-archive",
    ogImage: "https://fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <div className="relative isolate pt-[58px] md:pt-[94px]" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.09" stroke-width="1"/></svg>')}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />
          <div
            ref={heroRef}
            className={`flex flex-col items-center gap-6 pt-20 md:pt-[120px] pb-24 md:pb-32 px-5 md:px-8 max-w-[1120px] mx-auto w-full reveal${heroInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.07em",
                    color: "#0070CC",
                    textTransform: "uppercase",
                    backgroundColor: "#EFF8FF",
                    border: "1px solid rgba(0,144,255,0.2)",
                    borderRadius: 9999,
                    padding: "3px 10px",
                  }}
                >
                  Solutions · Media & Archive
                </span>
              </div>

              <h1
                className="text-[28px] sm:text-[34px] md:text-[44px]"
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  lineHeight: "1.12",
                  letterSpacing: "-0.02em",
                  color: "#09090B",
                  textAlign: "center",
                  maxWidth: 600,
                  margin: 0,
                }}
              >
                Archive petabytes. Pay nothing to get them back.
              </h1>

              <p
                className="text-[15px] md:text-[16.5px]"
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  lineHeight: "1.65",
                  color: "#71717A",
                  textAlign: "center",
                  maxWidth: 480,
                  margin: 0,
                }}
              >
                Durable, low-cost storage for video masters, raw footage, and long-term archives. No egress fees and no retrieval penalties.
              </p>

              <div className="flex flex-row items-center gap-3 mt-2">
                <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                  <span className="btn-primary-inner">Start for free</span>
                </a>
                <a href="/contact-sales" className="btn-secondary">
                  Talk to sales
                </a>
              </div>

              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  color: "#71717A",
                  textAlign: "center",
                }}
              >
                1 TB free for 30 days · No credit card required · No egress fees
              </p>
            </div>
          </div>
        </div>

        {/* Proof bar */}
        <div
          className="border-y px-5 md:px-8 py-5"
          style={{ borderColor: "rgba(0,0,0,0.06)", backgroundColor: "#FAFAFA" }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "$4.99 / TB / month",
              "No retrieval penalties",
              "S3-compatible",
              "Verifiable provenance",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle size={14} weight="fill" style={{ color: "#0090FF", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#52525B" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-[1120px] mx-auto">
            <div ref={featRef} className={`reveal${featInView ? " in-view" : ""}`}>
              <div className="flex flex-col items-center gap-4 mb-14 md:mb-16 text-center">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 500,
                    fontSize: 11.5,
                    letterSpacing: "0.08em",
                    color: "#52525B",
                    textTransform: "uppercase",
                  }}
                >
                  Built for media teams
                </span>
                <h2
                  className="text-[24px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2",
                    color: "#09090B",
                    maxWidth: 620,
                    margin: 0,
                  }}
                >
                  Archive without the cloud storage tax
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FEATURES.map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="flex flex-col gap-5 p-8 rounded-2xl border"
                    style={{
                      borderColor: "rgba(0,0,0,0.07)",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                      style={{ backgroundColor: "#EFF8FF" }}
                    >
                      <Icon size={18} color="#0090FF" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>
                        {title}
                      </p>
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13.5, lineHeight: "1.6", color: "#71717A" }}>
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Use cases */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#F4F4F5", borderTop: "1px solid #E4E4E7", borderBottom: "1px solid #E4E4E7" }}>
          <div className="max-w-[1120px] mx-auto">
            <div ref={ucRef} className={`reveal${ucInView ? " in-view" : ""}`}>
              <div className="flex flex-col items-center gap-4 mb-14 text-center">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 500,
                    fontSize: 11.5,
                    letterSpacing: "0.08em",
                    color: "#52525B",
                    textTransform: "uppercase",
                  }}
                >
                  Use cases
                </span>
                <h2
                  className="text-[24px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2",
                    color: "#09090B",
                    margin: 0,
                  }}
                >
                  What teams are archiving
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {USECASES.map(({ title, body }) => (
                  <div
                    key={title}
                    className="rounded-2xl p-7 border"
                    style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF" }}
                  >
                    <h3 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 16, color: "#09090B", margin: "0 0 8px" }}>
                      {title}
                    </h3>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 14, lineHeight: "1.6", color: "#71717A", margin: 0 }}>
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection include={[
          "Is Fil One hot, warm, or cold storage? Is it like Glacier?",
          "How do I migrate from AWS / Azure / Google Cloud?",
          "Is Fil One compatible with my existing tools?",
          "How does data integrity verification work with Fil One?",
        ]} />

        {/* CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="w-full max-w-[1120px] mx-auto">
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
                  Cut your archive bill by up to 80%
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>
                  Start with 1 TB free. No credit card, no egress fees, no surprises.
                </p>
                <div className="flex items-center justify-center">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Start for free</span>
                  </a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>
                  S3-compatible · Verifiable integrity · $4.99/TB/month after trial
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default MediaArchiveSolutionPage;
