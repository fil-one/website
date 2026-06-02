import { ChartLine, ArrowsOut, Plug, Wallet } from "@phosphor-icons/react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";

const GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="1"/></svg>'
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span
    aria-hidden="true"
    style={{
      fontFamily: "'DM Mono', monospace",
      fontWeight: 500,
      fontSize: 11.5,
      letterSpacing: "0.08em",
      color: "#71717A",
      textTransform: "uppercase" as const,
    }}
  >
    {children}
  </span>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="text-[24px] md:text-[34px]"
    style={{
      fontFamily: "'Aspekta', sans-serif",
      fontWeight: 500,
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
      color: "#09090B",
      margin: 0,
    }}
  >
    {children}
  </h2>
);

const SectionSub = ({ children, maxWidth = 560 }: { children: React.ReactNode; maxWidth?: number }) => (
  <p
    className="text-[15px] md:text-[17px]"
    style={{
      fontFamily: "'Funnel Sans', sans-serif",
      fontWeight: 400,
      lineHeight: "1.65",
      color: "#71717A",
      maxWidth,
      margin: 0,
    }}
  >
    {children}
  </p>
);

// Scale-up comparison. AWS S3 Standard tiered rates: $0.023/GB for first 50 TB,
// $0.022 next 450 TB, $0.021 over 500 TB. Plus $0.09/GB egress (first 10 TB).
// Egress assumes 50% of stored volume read each month — a low estimate for
// active product workloads.
const SCALE_ROWS = [
  {
    scale: "1 TB",
    awsStorage: "$24",
    awsEgress: "$45",
    awsTotal: "$69",
    filone: "$5",
  },
  {
    scale: "10 TB",
    awsStorage: "$236",
    awsEgress: "$451",
    awsTotal: "$687",
    filone: "$50",
  },
  {
    scale: "50 TB",
    awsStorage: "$1,178",
    awsEgress: "$2,250",
    awsTotal: "$3,428",
    filone: "$250",
  },
  {
    scale: "100 TB",
    awsStorage: "$2,335",
    awsEgress: "$4,418",
    awsTotal: "$6,753",
    filone: "$499",
  },
];

const FEATURES = [
  {
    icon: Wallet,
    title: "Predictable invoice",
    desc: "Multiply $4.99 by the TB you keep. That number is the bill. Show it to the board without a caveat slide.",
  },
  {
    icon: ChartLine,
    title: "Scales linearly, not exponentially",
    desc: "When usage doubles, the bill doubles. No tier transitions, no egress cliffs, no surprise PUT charges from a viral launch day.",
  },
  {
    icon: Plug,
    title: "S3-compatible from day one",
    desc: "boto3, AWS CLI, every SDK. You write the same code you would have on AWS. If you outgrow us, you can leave the same way.",
  },
  {
    icon: ArrowsOut,
    title: "No egress on customer reads",
    desc: "Customer downloads, embedded media, dashboard fetches, mobile app pulls — every read is included.",
  },
];

const StartupsLandingPage = () => {
  useSeo({
    title: "Fil One — Storage that doesn't outgrow your revenue",
    description:
      "Flat $4.99/TB object storage for early-stage startups. No egress, no per-request fees, no surprise invoice. S3-compatible from day one.",
    canonical: "https://fil.one/lp/startups",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: tableRef, inView: tableInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <LandingNavbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative isolate pt-[58px]" style={{ backgroundColor: "#FFFFFF" }}>
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
                For founders and first infra hires
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
                maxWidth: 780,
                margin: 0,
              }}
            >
              Your storage bill shouldn't<br />
              <span style={{ color: "#0090FF" }}>outgrow your revenue.</span>
            </h1>

            <p
              className="text-[15px] md:text-[17px] hero-fade-2"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 560,
                margin: 0,
              }}
            >
              $4.99/TB flat. No egress, no per-request fees, no surprise invoice. The line item you can defend in the next runway conversation.
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
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>The trap</SectionLabel>
              <SectionHeading>The cloud bill scales with success.</SectionHeading>
              <SectionSub>
                Hyperscaler pricing was written assuming the buyer is a hyperscaler customer. For a five-person startup, that means a bill that compounds with growth in three directions at once — storage tier, egress, and per-request fees — none of which line up with your revenue curve.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "Month 1",
                  body: "10 GB of user uploads, a few hundred reads a day. AWS sends a $2 bill. Nothing to worry about. The terms-of-service paragraph nobody read says egress is $0.09 per GB and PUTs are $5 per million.",
                  catch: "The pricing looked reasonable.",
                },
                {
                  label: "Month 12",
                  body: "Product market fit. Usage 100×. The same line items now read $687 a month and climb every Monday morning. The default reaction is to spend an engineering sprint on caching, sampling, and CDNs to bend the curve down.",
                  catch: "The bill grew faster than ARR.",
                },
                {
                  label: "Month 24",
                  body: "A real Series A. Storage is now a board-level conversation. The CFO wants a forecast. The forecast has too many AWS knobs in it. Switching costs were quoted as an engineering quarter, so the line keeps growing.",
                  catch: "You started running the bill, not building.",
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
                        color: "#0070CC",
                        backgroundColor: "#EFF8FF",
                        border: "1px solid rgba(0,144,255,0.2)",
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

        {/* Cost-at-scale table */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={tableRef}
            className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${tableInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Cost at scale</SectionLabel>
              <SectionHeading>
                Same workload. <span style={{ color: "#0090FF" }}>Different curves.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                AWS S3 Standard at advertised rates, with 50% of stored data read each month. Fil One flat-rate against the same scenarios.
              </SectionSub>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 640,
                  borderCollapse: "collapse",
                  fontFamily: "'Funnel Sans', sans-serif",
                }}
              >
                <thead>
                  <tr>
                    {["Workload", "AWS storage", "AWS egress", "AWS total / mo", "Fil One / mo"].map((h) => (
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
                  {SCALE_ROWS.map((row) => (
                    <tr key={row.scale}>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#09090B",
                        }}
                      >
                        {row.scale}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13.5,
                          color: "#52525B",
                        }}
                      >
                        {row.awsStorage}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 13.5,
                          color: "#dc2626",
                          fontWeight: 500,
                        }}
                      >
                        {row.awsEgress}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#09090B",
                        }}
                      >
                        {row.awsTotal}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#0070CC",
                          backgroundColor: "#EFF8FF",
                        }}
                      >
                        {row.filone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              AWS S3 Standard storage tiers and egress rates from public US Q2 2026 rate card. Egress estimated at 50% of stored volume read per month — conservative for an active product. Per-request fees not included.
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
              <SectionLabel>Why startups use it</SectionLabel>
              <SectionHeading>
                Storage that <span style={{ color: "#0090FF" }}>doesn't need a FinOps team.</span>
              </SectionHeading>
              <SectionSub maxWidth={560}>
                One line, one rate. The thing you ship instead of the thing you optimise.
              </SectionSub>
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
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 15,
                      lineHeight: "1.3",
                      color: "#09090B",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: "1.6",
                      color: "#71717A",
                    }}
                  >
                    {desc}
                  </p>
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
              <SectionHeading>
                One rate. <span style={{ color: "#0090FF" }}>$4.99/TB/month.</span>
              </SectionHeading>
              <SectionSub maxWidth={520}>
                That is the bill. Multiplied by TB. The number you put in the model.
              </SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#71717A",
              }}
            >
              No credit card required · No egress fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={ctaRef}
            className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}
          >
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
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                    '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>'
                  )}")`,
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
                  Pick the line item you don't have to optimise.
                </h2>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 17,
                    color: "rgba(255,255,255,0.60)",
                    marginBottom: 32,
                  }}
                >
                  Free 1 TB evaluation. The same SDK calls. A different bill.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Start for free</span>
                  </a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">
                    Talk to an expert
                  </a>
                </div>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.60)",
                    marginTop: 16,
                  }}
                >
                  No credit card required · No egress fees · Connects in minutes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default StartupsLandingPage;
