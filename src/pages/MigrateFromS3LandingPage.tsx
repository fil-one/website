import { ArrowsOut, ChartLine, Plug, ShieldCheck } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


// Price delta scenario: 10 TB stored + 10 TB reads + 1M GET operations
// AWS S3 Standard us-east-1 Q2 2026:
//   Storage: 10,240 GB × $0.023 = $235.52
//   Egress: 10,240 GB × $0.09 = $921.60
//   GETs: 1,000,000 / 1,000 × $0.0004 = $0.40
//   Total: ~$1,157.52
// Fil One: 10 TB × $4.99 = $49.90

const COMPARISON_ROWS = [
  {
    provider: "AWS S3 Standard",
    storage: "$236",
    egress: "$922",
    api: "$0.40",
    total: "$1,158",
    isFilOne: false,
  },
  {
    provider: "Fil One",
    storage: "$50",
    egress: "$0",
    api: "$0",
    total: "$50",
    isFilOne: true,
  },
];

const FEATURES = [
  {
    icon: Plug,
    title: "Full S3 API parity",
    desc: "PutObject, GetObject, DeleteObject, ListObjectsV2, multipart upload, presigned URLs, and bucket operations all work as on AWS. Existing S3 code connects without modification.",
  },
  {
    icon: ArrowsOut,
    title: "No egress on reads",
    desc: "Every GET request on AWS charges $0.09/GB out to the internet. On Fil One, reads are included in flat storage. The SDKs behave identically; the bill does not.",
  },
  {
    icon: ChartLine,
    title: "Predictable flat cost",
    desc: "Storage at $4.99/TB. No egress, no per-request fees, no storage tier waterfall. The line item you plan for is the line item that ships.",
  },
  {
    icon: ShieldCheck,
    title: "Recurring integrity verification",
    desc: "Every object is verified approximately every 24 hours. Data does not silently corrupt or disappear without detection — no extra configuration required.",
  },
];

const MigrateFromS3LandingPage = () => {
  useSeo({
    title: "Fil One · Leaving S3 is a config change, not a rewrite",
    description:
      "Same SDK. New endpoint. Lower bill. Point your existing S3 tools at Fil One and cut storage costs to $4.99/TB flat with $0 egress.",
    canonical: "https://www.fil.one/lp/migrate-from-s3",
  });

  const { ref: codeRef, inView: codeInView } = useInView({ threshold: 0.05 });
  const { ref: tableRef, inView: tableInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  const BOTO3_BEFORE = `# Before — AWS S3
s3 = boto3.client(
    "s3",
    region_name="us-east-1",
)`;

  const BOTO3_AFTER = `# After · Fil One (no other changes)
s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
    region_name="eu-west-1",
)`;

  const NODE_BEFORE = `// Before — AWS S3
const s3 = new S3Client({ region: "us-east-1" });`;

  const NODE_AFTER = `// After · Fil One
const s3 = new S3Client({
  endpoint: "https://eu-west-1.s3.fil.one",
  region: "eu-west-1",
  credentials: {
    accessKeyId: process.env.FIL_ONE_ACCESS_KEY,
    secretAccessKey: process.env.FIL_ONE_SECRET_KEY,
  },
});`;

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
                For teams on AWS S3 looking to reduce storage costs
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
              Leaving S3 is a config change,<br />
              <span style={{ color: "#0090FF" }}>not a rewrite.</span>
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
              Point your existing S3 tools at Fil One. $4.99/TB flat, no egress. Same SDK, same API, lower bill.
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

        {/* Code block — the endpoint swap */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={codeRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${codeInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>The migration</SectionLabel>
              <SectionHeading>
                Change the endpoint. <span style={{ color: "#0090FF" }}>Nothing else.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Fil One implements the S3 API. The code that works on AWS works here — PutObject, GetObject, ListObjectsV2, multipart upload, presigned URLs.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Python */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#71717A",
                    margin: 0,
                  }}
                >
                  Python (boto3)
                </p>
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.08)",
                    backgroundColor: "#0F172A",
                  }}
                >
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
                    {BOTO3_BEFORE + "\n\n" + BOTO3_AFTER}
                  </pre>
                </div>
              </div>

              {/* Node */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#71717A",
                    margin: 0,
                  }}
                >
                  Node.js (@aws-sdk/client-s3)
                </p>
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.08)",
                    backgroundColor: "#0F172A",
                  }}
                >
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
                    {NODE_BEFORE + "\n\n" + NODE_AFTER}
                  </pre>
                </div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 14,
                backgroundColor: "#FFFFFF",
                padding: "20px 24px",
                maxWidth: 680,
              }}
            >
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#09090B",
                  marginBottom: 8,
                }}
              >
                What is compatible
              </p>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  color: "#71717A",
                  margin: 0,
                }}
              >
                PutObject, GetObject, DeleteObject, HeadObject, CopyObject, ListObjectsV2, CreateBucket, DeleteBucket, multipart upload, presigned URLs. Standard Auth v4 signing. For a full compatibility list, see{" "}
                <a href="https://docs.fil.one" style={{ color: "#0070CC" }}>
                  docs.fil.one
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* Price comparison */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={tableRef}
            className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${tableInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>The delta</SectionLabel>
              <SectionHeading>
                10 TB stored, 10 TB read/month. <span style={{ color: "#0090FF" }}>What changes.</span>
              </SectionHeading>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 480,
                  borderCollapse: "collapse",
                  fontFamily: "'Funnel Sans', sans-serif",
                }}
              >
                <thead>
                  <tr>
                    {["Provider", "Storage", "Egress", "API / ops", "Total / month"].map((h) => (
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
                  {COMPARISON_ROWS.map((row) => (
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
                      {[row.storage, row.egress, row.api, row.total].map((v, i) => (
                        <td
                          key={i}
                          style={{
                            padding: "14px 16px",
                            borderBottom: "1px solid rgba(0,0,0,0.06)",
                            fontSize: i === 3 ? (row.isFilOne ? 17 : 13.5) : 13.5,
                            fontWeight: i === 3 ? 700 : row.isFilOne ? 600 : 400,
                            color:
                              v === "$0" ? "#16a34a"
                              : i === 3 && !row.isFilOne ? "#dc2626"
                              : row.isFilOne ? "#0070CC"
                              : "#52525B",
                          }}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">
              AWS S3 Standard us-east-1 Q2 2026: $0.023/GB storage, $0.09/GB internet egress, $0.0004/1K GET. Computed from stated inputs — 10,240 GB × $0.023 = $235.52 storage; 10,240 GB × $0.09 = $921.60 egress; 1M × $0.0004/1K = $0.40 ops. Fil One: 10 TB × $4.99 = $49.90, egress $0, ops $0.
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
              <SectionLabel>What carries over</SectionLabel>
              <SectionHeading>
                S3 parity. <span style={{ color: "#0090FF" }}>Lower bill.</span>
              </SectionHeading>
              <SectionSub maxWidth={560}>
                The same tools, the same APIs, the same integration patterns. The line items that dominated the invoice do not exist here.
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
                Storage. That is the whole bill. No egress fees, no per-request charges. The S3 code carries over; the invoice does not.
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
                  Same SDK. New endpoint. Lower bill.
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
                  Free 1 TB evaluation. Change two lines and run the same workload. The egress line will not be there.
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

      <Footer />
    </div>
  );
};

export default MigrateFromS3LandingPage;
