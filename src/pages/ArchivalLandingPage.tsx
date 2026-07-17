import { ShieldCheck, ArrowsOut, ChartLine, Database } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


// Archive comparison scenario: 100 TB stored, one 10 TB restore per year (≈ 853 GB/month).
// AWS S3 Standard: $0.023/GB storage = $2,304/month (tiered); egress $0.09/GB = $76.77/month restore cost.
//   Total monthly: $2,381.
// AWS Glacier Instant: $0.023/GB storage; retrieval $0.03/GB + egress $0.09/GB per restore.
//   Storage: 102,400 × $0.023 = $2,355.20/month.
//   Restore monthly equivalent: 853 GB × ($0.03 + $0.09) = $102.40.
//   Total: $2,457.60/month.
// AWS Glacier Deep Archive: $0.00099/GB storage = $101.38/month.
//   Restore monthly equivalent: 853 GB × ($0.02 + $0.09) = $93.83.
//   Total: $195.21/month.
// Wasabi: $6.99/TB = $699/month. No retrieval or egress.
// Fil One: $4.99/TB = $499/month. No retrieval or egress. Integrity ~24h.
const ARCHIVE_ROWS = [
  {
    provider: "AWS S3 Standard",
    storage100tb: "$2,304",
    retrievalRate: "$0.09/GB egress",
    restoreCost10tb: "$922",
    integrityCheck: "No",
    isFilOne: false,
  },
  {
    provider: "AWS Glacier Instant",
    storage100tb: "$2,355",
    retrievalRate: "$0.03 + $0.09/GB",
    restoreCost10tb: "$1,229",
    integrityCheck: "No",
    isFilOne: false,
  },
  {
    provider: "AWS Glacier Deep Archive",
    storage100tb: "$101",
    retrievalRate: "$0.02 + $0.09/GB",
    restoreCost10tb: "$1,126",
    integrityCheck: "No",
    isFilOne: false,
  },
  {
    provider: "Wasabi",
    storage100tb: "$699",
    retrievalRate: "$0",
    restoreCost10tb: "$0",
    integrityCheck: "No",
    isFilOne: false,
  },
  {
    provider: "Fil One",
    storage100tb: "$499",
    retrievalRate: "$0",
    restoreCost10tb: "$0",
    integrityCheck: "~24 h",
    isFilOne: true,
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Integrity verification, ~24 h",
    desc: "Every archived object is verified approximately every 24 hours. Data cannot silently corrupt or disappear between writes and reads.",
  },
  {
    icon: ArrowsOut,
    title: "No retrieval tax",
    desc: "$0 to read back the archive. Restore testing, partial recovery, and audit reads are included in flat storage pricing.",
  },
  {
    icon: ChartLine,
    title: "11 nines durability",
    desc: "Designed for 11 nines of durability. The storage architecture makes loss a detectable and recoverable event.",
  },
  {
    icon: Database,
    title: "S3-compatible restore",
    desc: "Standard GetObject and multipart download. Any tool that reads S3 restores from Fil One without modification.",
  },
];

const ArchivalLandingPage = () => {
  useSeo({
    title: "Fil One · Know your archive is intact before you need it",
    description:
      "Flat $4.99/TB archival storage with recurring integrity verification every ~24 hours. No retrieval fees, no egress. 11 nines durability.",
    canonical: "https://fil.one/lp/archival",
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
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />

          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            <div
              className="hero-fade-1 flex items-center gap-1.5 text-center"
              style={{
                backgroundColor: "#EFF8FF",
                border: "1px solid rgba(0,144,255,0.2)",
                borderRadius: 14,
                padding: "10px 14px",
                maxWidth: "90vw",
              }}
            >
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 13.5,
                  lineHeight: 1,
                  color: "#0070CC",
                }}
              >
                For long-retention archive owners
              </span>
            </div>

            <h1
              className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
                color: "#09090B",
                textAlign: "center",
                maxWidth: 800,
                margin: 0,
              }}
            >
              Know your archive is intact<br />
              <span style={{ color: "#0090FF" }}>before you need it.</span>
            </h1>

            <p
              className="text-[15px] md:text-[17px] hero-fade-2"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 580,
                margin: 0,
              }}
            >
              Flat $4.99/TB. Recurring integrity verification, no egress, no retrieval tax. 11 nines durability.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>

            <p
              className="hero-fade-4"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#71717A",
                textAlign: "center",
              }}
            >
              No credit card required · No retrieval fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={problemRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>Two problems</SectionLabel>
              <SectionHeading>Archives are assumed intact. The retrieval bill is assumed fine.</SectionHeading>
              <SectionSub>
                Standard archive storage gives you low write cost and no guarantee the data is still intact. It also charges a retrieval fee every time you confirm it is. Neither assumption holds in a serious long-retention scenario.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "The silent archive",
                  catch: "Most storage does not tell you if data changed.",
                  body: "Standard object storage replicates data but does not continuously verify the content of each object. An archive can silently corrupt over months or years — undetectable until a restore attempt fails.",
                },
                {
                  label: "The retrieval penalty",
                  catch: "Testing your archive costs money.",
                  body: "Glacier-tier storage charges per-GB retrieval plus egress on every restore. A single annual test of 10 TB costs over $1,000 on AWS. Teams stop testing their archives — not because they do not need to, but because the bill makes them.",
                },
                {
                  label: "The day-you-need-it cost",
                  catch: "Disaster recovery events are expensive on metered tiers.",
                  body: "A large restore event — the one you actually need the archive for — is a large retrieval and egress event. The cost arrives at the worst possible time. A flat-rate archive has no such moment.",
                },
              ].map(({ label, body, catch: catchLine }) => (
                <div
                  key={label}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#52525B",
                        backgroundColor: "#F4F4F5",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 9999,
                        padding: "3px 10px",
                        marginBottom: 2,
                        alignSelf: "flex-start",
                      }}
                    >
                      {label}
                    </span>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: 18,
                        lineHeight: "1.3",
                        letterSpacing: "-0.01em",
                        color: "#09090B",
                      }}
                    >
                      {catchLine}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "#71717A",
                        marginTop: 4,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={tableRef}
            className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${tableInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>The comparison</SectionLabel>
              <SectionHeading>
                100 TB archive. <span style={{ color: "#0090FF" }}>One 10 TB restore per year.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Same archive workload, five providers. Monthly storage cost, per-restore cost, and whether integrity is verified.
              </SectionSub>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 580,
                  borderCollapse: "collapse",
                  fontFamily: "'Funnel Sans', sans-serif",
                }}
              >
                <thead>
                  <tr>
                    {["Provider", "100 TB/mo", "Retrieval + egress", "Restore 10 TB", "Integrity verification"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "11px 16px",
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "#71717A",
                          borderBottom: "1px solid rgba(0,0,0,0.07)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ARCHIVE_ROWS.map((row) => (
                    <tr key={row.provider} style={{ backgroundColor: row.isFilOne ? "#EFF8FF" : "transparent" }}>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 14,
                          fontWeight: row.isFilOne ? 700 : 500,
                          color: row.isFilOne ? "#0070CC" : "#09090B",
                        }}
                      >
                        {row.provider}
                        {row.isFilOne && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              marginLeft: 8,
                              backgroundColor: "#EFF8FF",
                              border: "1px solid rgba(0,144,255,0.2)",
                              color: "#0070CC",
                              fontFamily: "'Funnel Sans', sans-serif",
                              fontSize: 11,
                              fontWeight: 500,
                              padding: "2px 8px",
                              borderRadius: 9999,
                              verticalAlign: "middle",
                              whiteSpace: "nowrap",
                            }}
                          >
                            You
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: row.isFilOne ? "#09090B" : "#52525B", fontWeight: row.isFilOne ? 600 : 400 }}>{row.storage100tb}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: row.retrievalRate === "$0" ? "#16a34a" : "#dc2626", fontWeight: row.isFilOne ? 600 : 400 }}>{row.retrievalRate}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: row.isFilOne ? 17 : 13.5, fontWeight: row.isFilOne ? 700 : 500, color: row.restoreCost10tb === "$0" ? (row.isFilOne ? "#0070CC" : "#16a34a") : "#dc2626" }}>{row.restoreCost10tb}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: row.isFilOne ? 700 : 400, color: row.integrityCheck !== "No" ? "#0070CC" : "#94A3B8" }}>{row.integrityCheck}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">
              AWS S3 Standard and Glacier rates from public US rate card Q2 2026. S3 Standard storage: tiered $0.023/$0.022/GB; Glacier Instant $0.023/GB; Glacier Deep Archive $0.00099/GB. Retrieval: Deep Archive $0.02/GB + $0.09/GB egress. Restore cost computed: 10,240 GB × stated rates. Wasabi $6.99/TB. Fil One $4.99/TB, $0 retrieval, $0 egress.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={featuresRef}
            className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>An archive that proves itself</SectionLabel>
              <SectionHeading>
                <span style={{ color: "#0090FF" }}>Verification built in.</span> Retrieval included.
              </SectionHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-4 p-6 rounded-2xl border"
                  style={{
                    borderColor: "rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
                    textAlign: "left",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{ backgroundColor: "#EFF8FF" }}
                  >
                    <Icon size={18} color="#0090FF" />
                  </div>
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
              <SectionHeading>One rate. <span style={{ color: "#0090FF" }}>$4.99/TB/month.</span></SectionHeading>
              <SectionSub maxWidth={520}>Storage. That is the whole bill. Integrity verification, 11 nines durability, and free restores are included.</SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A" }}>No credit card required · No retrieval fees · Connects in minutes</p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div
              style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }}
              className="px-6 md:px-12 py-16 md:py-[104px]"
            >
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>An archive that proves itself.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB evaluation. Write your archive and verify it restores — at zero retrieval cost.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Start for free</span></a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">Talk to an expert</a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>No credit card required · No retrieval fees · Connects in minutes</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArchivalLandingPage;
