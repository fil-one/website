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
    body: "Pull a 4K master to a new edit suite, share a rough cut with a client, or restore from archive — free ingress and egress, always.",
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

const COMPARISON = [
  { label: "Storage cost / TB / mo", filOne: "$4.99", aws: "$23+", gcp: "$20+" },
  { label: "Egress fees", filOne: "None", aws: "$0.09/GB", gcp: "$0.08/GB" },
  { label: "Retrieval fees", filOne: "None", aws: "Up to $0.03/GB", gcp: "None (standard)" },
  { label: "Minimum storage duration", filOne: "None", aws: "90 days (Glacier)", gcp: "None" },
  { label: "Data integrity proof", filOne: "Cryptographic", aws: "Checksum only", gcp: "Checksum only" },
];

const MediaArchiveSolutionPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: featRef, inView: featInView } = useInView({ threshold: 0.1 });
  const { ref: cmpRef, inView: cmpInView } = useInView({ threshold: 0.1 });

  useSeo({
    title: "Media & Archive Storage — Fil One",
    description:
      "Low-cost, high-durability object storage for video, audio, and long-term archives. No egress fees, no retrieval penalties. $4.99/TB/month.",
    canonical: "https://filone.io/solutions/media-archive",
    ogImage: "https://filone.io/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <div className="relative isolate pt-[94px]" style={{ backgroundColor: "#FFFFFF" }}>
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
                Durable, low-cost storage for video masters, raw footage, and long-term archives — with no egress fees and no retrieval penalties.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
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
              "No egress fees",
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
                    fontSize: 11,
                    letterSpacing: "0.07em",
                    color: "#0070CC",
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
                    maxWidth: 500,
                    margin: 0,
                  }}
                >
                  Archive without the cloud storage tax
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="flex flex-col gap-3 rounded-2xl p-6 border"
                    style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FAFAFA" }}
                  >
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-lg"
                      style={{ backgroundColor: "#EFF8FF", color: "#0070CC" }}
                    >
                      <Icon size={18} weight="duotone" />
                    </div>
                    <h3 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B", margin: 0 }}>
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

        {/* Comparison table */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#F4F4F5" }}>
          <div className="max-w-[1120px] mx-auto">
            <div ref={cmpRef} className={`reveal${cmpInView ? " in-view" : ""}`}>
              <div className="flex flex-col items-center gap-4 mb-14 text-center">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.07em",
                    color: "#0070CC",
                    textTransform: "uppercase",
                  }}
                >
                  How we compare
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
                  Fil One vs. the big clouds
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#FFFFFF" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                      {["", "Fil One", "AWS S3", "Google Cloud"].map((h, i) => (
                        <th
                          key={h + i}
                          style={{
                            fontFamily: "'Funnel Sans', sans-serif",
                            fontWeight: i === 1 ? 600 : 500,
                            fontSize: 13,
                            color: i === 1 ? "#0070CC" : "#09090B",
                            textAlign: i === 0 ? "left" : "center",
                            padding: "14px 20px",
                            backgroundColor: i === 1 ? "#EFF8FF" : "transparent",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map(({ label, filOne, aws, gcp }, ri) => (
                      <tr
                        key={label}
                        style={{ borderBottom: ri < COMPARISON.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
                      >
                        <td style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#52525B", padding: "14px 20px" }}>
                          {label}
                        </td>
                        <td style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#0070CC", textAlign: "center", padding: "14px 20px", backgroundColor: "#EFF8FF" }}>
                          {filOne}
                        </td>
                        <td style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#71717A", textAlign: "center", padding: "14px 20px" }}>
                          {aws}
                        </td>
                        <td style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#71717A", textAlign: "center", padding: "14px 20px" }}>
                          {gcp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
