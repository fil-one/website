import { Database, ChartLine, Plug, ShieldCheck } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';
import { PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { S3_ENDPOINT } from "@/lib/s3-endpoint";


const FEATURES = [
  {
    icon: Database,
    title: "No per-request fees",
    desc: "PUT, GET, LIST, HEAD — all included. The line item that dominates a logging workload on AWS does not exist here.",
  },
  {
    icon: Plug,
    title: "S3-compatible logging",
    desc: "Vector, Fluent Bit, Logstash, OpenTelemetry collectors, Loki — all of them write S3. Point them at the Fil One endpoint and ship.",
  },
  {
    icon: ChartLine,
    title: "Predictable bill",
    desc: "Storage charges grow with what you keep, not with how loudly your services log. A noisy deploy stops being a billing event.",
  },
  {
    icon: ShieldCheck,
    title: "Versioning and Object Lock",
    desc: "Tamper-evident audit logs by default. Compliance-mode retention for SOC 2, ISO 27001, and HIPAA evidence retention periods.",
  },
];

const LogRetentionLandingPage = () => {
  useSeo({
    title: "Fil One · Stop sampling your logs to save money",
    description:
      `S3-compatible log storage at ${PRICE_PER_TB_SHORT} flat. No per-request fees. Drop in as a Vector, Fluent Bit, or OTel sink and keep every event.`,
    canonical: "https://www.fil.one/lp/log-retention",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: proofRef, inView: proofInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  const VECTOR_CONFIG = `# vector.toml — write every event to Fil One
[sinks.fil_one_logs]
type      = "aws_s3"
inputs    = ["all_services"]
bucket    = "prod-logs"
endpoint  = "${S3_ENDPOINT}"
region    = "eu-west-1"
compression = "gzip"

[sinks.fil_one_logs.batch]
max_bytes = 10485760    # flush 10 MiB at a time
timeout_secs = 60       # one PUT per shard per minute

[sinks.fil_one_logs.auth]
access_key_id     = "\${FIL_ACCESS_KEY}"
secret_access_key = "\${FIL_SECRET_KEY}"`;

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
                For platform & observability teams
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
                maxWidth: 760,
                margin: 0,
              }}
            >
              Stop sampling your logs<br />
              <span style={{ color: "#0090FF" }}>to save money.</span>
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
              S3-compatible storage at {PRICE_PER_TB_SHORT} flat. No per-request fees, no egress. Keep every event, every span, every audit trail — without watching the PUT counter.
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
              No credit card required · No per-request fees · Connects in minutes
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
              <SectionHeading>Logs are billed per write. Logs are written constantly.</SectionHeading>
              <SectionSub>
                Hyperscaler object storage charges per PUT. A logging pipeline writes by definition. The cheapest way to make the bill smaller is to keep fewer logs — and the price paid for that decision is paid later, in the incident postmortem you cannot reconstruct.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "What you write",
                  body: "100 million PUTs per month is a modest production logging workload. On AWS S3 that is $500 in request charges alone, before a single byte of storage is billed.",
                  catch: "Each write is a metered event.",
                },
                {
                  label: "What you store",
                  body: "10 TB of compressed log data per month is normal for a mid-size platform. Add storage at $0.023/GB and egress for any query that reads back — the bill closes in on $750 a month before you draw a single dashboard.",
                  catch: "Storage is the smaller line.",
                },
                {
                  label: "What you give up",
                  body: "Engineering reacts by sampling. Trace volume gets capped. Debug logs get truncated. The dashboard you finally build only has the events that survived the budget meeting.",
                  catch: "The bill picks which events to keep.",
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

        {/* Proof — code block + per-request comparison */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={proofRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${proofInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>How it lands</SectionLabel>
              <SectionHeading>
                A logging sink that <span style={{ color: "#0090FF" }}>doesn't bill per event.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Vector, Fluent Bit, Logstash, OpenTelemetry — anything that already writes S3 — gets a new endpoint. The PUT counter stops mattering.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code block */}
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.08)",
                  backgroundColor: "#0F172A",
                }}
              >
                <div
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#1E293B",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: "#94A3B8",
                  }}
                >
                  vector.toml
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: "20px 18px",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12.5,
                    lineHeight: 1.65,
                    color: "#E2E8F0",
                    overflowX: "auto",
                  }}
                >
                  {VECTOR_CONFIG}
                </pre>
              </div>

              {/* Per-request comparison */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: 16,
                  backgroundColor: "#F9FAFB",
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <SectionLabel>Per-request math, 100M PUT/month</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { name: "AWS S3 Standard", rate: "$0.005 / 1K PUT", total: "$500.00", win: false },
                    { name: "Google Cloud", rate: "$0.05 / 10K Class A", total: "$500.00", win: false },
                    { name: "Azure Blob", rate: "$0.055 / 10K writes", total: "$550.00", win: false },
                    { name: "Wasabi", rate: "$0 per request", total: "$0", win: true },
                    { name: "Backblaze B2", rate: "$0 per request", total: "$0", win: true },
                    { name: "Fil One", rate: "$0 per request", total: "$0", win: true, you: true },
                  ].map((r) => (
                    <div
                      key={r.name}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "10px 14px",
                        backgroundColor: r.you ? "#EFF8FF" : "#FFFFFF",
                        border: `1px solid ${r.you ? "rgba(0,144,255,0.2)" : "rgba(0,0,0,0.07)"}`,
                        borderRadius: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: r.you ? 700 : 500,
                          fontSize: 14,
                          color: r.you ? "#0070CC" : "#09090B",
                        }}
                      >
                        {r.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 12,
                          color: "#71717A",
                          flex: 1,
                          textAlign: "center",
                        }}
                      >
                        {r.rate}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: 15,
                          color: r.win ? "#16a34a" : "#dc2626",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.total}
                      </span>
                    </div>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 12,
                    color: "#71717A",
                    margin: 0,
                  }}
                >
                  Public US rate cards, Q2 2026. Storage and egress not included in this line — they are extra on the metered tiers, and zero on Fil One.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={featuresRef}
            className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Why it works</SectionLabel>
              <SectionHeading>
                A sink that <span style={{ color: "#0090FF" }}>scales with retention, not write rate.</span>
              </SectionHeading>
              <SectionSub maxWidth={560}>
                Same S3 API, same SDKs. The only thing that changes is the line item that used to dominate the bill.
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
                One rate. <span style={{ color: "#0090FF" }}>{PRICE_PER_TB_MONTH}.</span>
              </SectionHeading>
              <SectionSub maxWidth={520}>
                Storage. That is the whole bill. No PUT charges. No egress. Logs cost what they should — the bytes you decide to keep.
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
              No credit card required · No per-request fees · Connects in minutes
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
                  Keep every log.
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
                  Free 1 TB evaluation. Point your existing collector at the endpoint and watch the request line zero out.
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
                  No credit card required · No per-request fees · Connects in minutes
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

export default LogRetentionLandingPage;
