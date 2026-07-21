import { ShieldCheck, ChartLine, ArrowsOut, Database } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


// Preservation comparison scenario: 10 TB collection, one full fixity review per year, amortized monthly.
// 10 TB = 10,240 GB. A fixity review reads the entire collection once a year to re-verify checksums.
// AWS S3 Standard: storage 10,240 GB × $0.023/GB ≈ $236/mo.
//   Fixity read: 10 TB × $0.09/GB egress ≈ $900/yr ≈ $75/mo. All-in ≈ $311/mo.
// AWS Glacier Deep Archive: storage 10,240 GB × $0.00099/GB ≈ $10/mo.
//   Fixity read: 10 TB × ($0.02 retrieval + $0.09 egress) ≈ $1,100/yr ≈ $92/mo. All-in ≈ $102/mo.
// Wasabi: $6.99/TB = $70/mo. No retrieval or egress fees.
// Fil One: $4.99/TB = $50/mo. No retrieval or egress fees. Integrity verified ~24 h.
const PRESERVATION_ROWS = [
  {
    provider: "AWS S3 Standard",
    storage: "$236",
    egress: "~$75",
    allIn: "$311",
    integrity: "No",
    isFilOne: false,
  },
  {
    provider: "AWS Glacier Deep Archive",
    storage: "$10",
    egress: "~$92",
    allIn: "$102",
    integrity: "No",
    isFilOne: false,
  },
  {
    provider: "Wasabi",
    storage: "$70",
    egress: "$0",
    allIn: "$70",
    integrity: "No",
    isFilOne: false,
  },
  {
    provider: "Fil One",
    storage: "$50",
    egress: "$0",
    allIn: "$50",
    integrity: "~24 h",
    isFilOne: true,
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Integrity verification, ~24 h",
    desc: "Every preserved object is re-verified approximately every 24 hours. You do not wait a year to authenticate that a file is unchanged. Checks are continuous and built in to storage.",
  },
  {
    icon: ChartLine,
    title: "11 nines durability",
    desc: "Distributed, redundant architecture with no single point of failure. Designed to deliver 11 nines of durability, backed by continuous, audit-ready integrity records.",
  },
  {
    icon: ArrowsOut,
    title: "$0 retrieval, $0 egress",
    desc: "Reading the collection back — for an audit, a migration, or a patron request — costs nothing. Accessing your archive is no longer a line item you ration.",
  },
  {
    icon: Database,
    title: "S3-compatible",
    desc: "Standard GetObject, PutObject, and multipart transfer. Preservation tools, BagIt workflows, and repository software that speak S3 connect without modification.",
  },
];

const DigitalPreservationLandingPage = () => {
  useSeo({
    title: "Fil One · Preservation you can verify",
    description:
      "Flat $4.99/TB digital preservation storage with integrity verification every ~24 hours. No retrieval fees, no egress. 11 nines durability, S3-compatible.",
    canonical: "https://www.fil.one/lp/digital-preservation",
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
                For libraries, archives & memory institutions
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
                maxWidth: 820,
                margin: 0,
              }}
            >
              Preservation you can<br />
              <span style={{ color: "#0090FF" }}>verify.</span>
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
              Integrity verified every 24 hours, not once a year. Built in at $4.99/TB flat.
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
              No credit card required · No egress fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={problemRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[620px] mx-auto">
              <SectionLabel>The preservation gap</SectionLabel>
              <SectionHeading>A fixity report is a snapshot. Decay doesn’t wait for the next one.</SectionHeading>
              <SectionSub>
                Preservation depends on knowing the files are unchanged. Most storage only tells you once a year — and charges you to find out. Neither the gap nor the bill belongs in a serious archival program.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "The annual blind spot",
                  catch: "A year is a long time to not know.",
                  body: "A once-a-year fixity review confirms integrity on the day it runs. For the other 364 days the collection is unverified. Silent corruption that lands in month two surfaces ten months later — if the review even catches it.",
                },
                {
                  label: "The cost of checking",
                  catch: "Verifying your archive is a metered read.",
                  body: "On metered tiers, every fixity review is a full-collection read priced per GB in retrieval and egress. The more thoroughly you preserve, the more it costs to prove you did — so teams check less than they should.",
                },
                {
                  label: "The format you cannot open",
                  catch: "Proprietary tiers complicate the future.",
                  body: "Preservation is measured in decades. Storage tiers with restore delays, retrieval classes, and per-request semantics add operational risk to a workload whose entire point is to be simple, readable, and intact far into the future.",
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
                10 TB collection. <span style={{ color: "#0090FF" }}>One fixity review a year — or one every day.</span>
              </SectionHeading>
              <SectionSub maxWidth={640}>
                Same preservation workload, four providers. Monthly storage, the cost of reading the collection back to verify it, and whether integrity is actually checked.
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
                    {["Provider", "Storage 10 TB/mo", "Retrieval + egress", "All-in /mo", "Integrity verification"].map((h) => (
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
                  {PRESERVATION_ROWS.map((row) => (
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
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: row.isFilOne ? "#09090B" : "#52525B", fontWeight: row.isFilOne ? 600 : 400 }}>{row.storage}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, color: row.egress === "$0" ? "#16a34a" : "#dc2626", fontWeight: row.isFilOne ? 600 : 400 }}>{row.egress}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: row.isFilOne ? 17 : 13.5, fontWeight: row.isFilOne ? 700 : 500, color: row.isFilOne ? "#0070CC" : "#09090B" }}>{row.allIn}</td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: row.isFilOne ? 700 : 400, color: row.integrity !== "No" ? "#0070CC" : "#94A3B8" }}>{row.integrity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">
              Scenario: 10 TB collection with one full fixity read per year, amortized monthly. AWS S3 Standard: ≈$236/mo storage ($0.023/GB) + ≈$75/mo amortized fixity (10 TB × $0.09/GB egress per year) ≈ $311/mo. AWS Glacier Deep Archive: ≈$10/mo storage ($0.00099/GB) + ≈$92/mo amortized fixity (10 TB × ($0.02 retrieval + $0.09 egress)/GB per year) ≈ $102/mo. Wasabi: $6.99/TB = $70/mo, no egress. Fil One: $4.99/TB = $50/mo, $0 egress, integrity verified ~24 h. AWS and Wasabi rates from public US price cards, Q2 2026; figures indicative and rounded.
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
              <SectionLabel>Preservation that proves itself</SectionLabel>
              <SectionHeading>
                <span style={{ color: "#0090FF" }}>Verification built in.</span> Reading included.
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
              <SectionSub maxWidth={520}>Storage. That is the whole bill. Integrity verification, 11 nines durability, and free reads are included — verifying the collection never adds a cent.</SectionSub>
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
            <div
              style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }}
              className="px-6 md:px-12 py-16 md:py-[104px]"
            >
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Preservation you can verify.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB evaluation. Write a collection, watch it verify, and read it back — at zero retrieval cost.</p>
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

export default DigitalPreservationLandingPage;
