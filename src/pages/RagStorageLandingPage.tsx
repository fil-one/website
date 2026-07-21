import { Database, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


const FEATURES = [
  {
    icon: Database,
    title: "Store the whole corpus",
    desc: "At $4.99/TB flat, a 1 TB document store is $4.99/month. A 10 TB corpus is $49.90. The storage price does not penalise breadth.",
    devLabel: null,
  },
  {
    icon: ArrowsOut,
    title: "No egress on retrieval reads",
    desc: "Retrieval pipelines read raw documents on every query. Those reads are included in flat storage — there is no $0.09/GB egress line on retrieval.",
    devLabel: null,
  },
  {
    icon: ChartLine,
    title: "Predictable corpus cost",
    desc: "Storage volume times $4.99. No per-request fees on reads or writes. The corpus bill grows with what you keep, not how often you query it.",
    devLabel: null,
  },
  {
    icon: Plug,
    title: "Native RAG integrations",
    desc: "LangChain, LlamaIndex, and Haystack connectors for direct corpus management.",
    devLabel: "In development",
  },
];

const RagStorageLandingPage = () => {
  useSeo({
    title: "Fil One · RAG corpus storage at flat cost",
    description:
      "S3-compatible object storage at $4.99/TB flat. Store retrieval-augmented generation document corpora without per-query or per-read charges.",
    canonical: "https://www.fil.one/lp/rag-storage",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: proofRef, inView: proofInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  const CORPUS_CODE = `import boto3, os

s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
    region_name="eu-west-1",
)

# Store a document chunk for retrieval
s3.put_object(
    Bucket="rag-corpus",
    Key="documents/doc-001.txt",
    Body=document_text.encode(),
)

# Retrieve during augmentation — egress $0
obj = s3.get_object(
    Bucket="rag-corpus",
    Key="documents/doc-001.txt",
)
context = obj["Body"].read().decode()`;

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
                For developers building retrieval-augmented apps
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
              Your corpus is a storage cost,<br />
              <span style={{ color: "#0090FF" }}>not a per-query tax.</span>
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
              S3-compatible storage at $4.99/TB flat. Store the whole document corpus without per-read or per-request fees eating into retrieval margin.
            </p>

            <div className="flex flex-row items-center gap-3 mt-2 hero-fade-3">
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
              <SectionHeading>Retrieval economics tax the corpus, not just the query.</SectionHeading>
              <SectionSub>
                The storage layer for a retrieval-augmented pipeline looks cheap on the surface. Then the egress and per-request lines compound with query volume and the corpus size becomes something to prune.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "The corpus cap",
                  catch: "The budget decides how broad the corpus is.",
                  body: "Every document stored has a per-GB cost. Every retrieval read has an egress cost. Teams start pruning the corpus — not because the documents have no value, but because the storage economics do not reward coverage.",
                },
                {
                  label: "The retrieval bill",
                  catch: "Every retrieval hits the egress line.",
                  body: "A 1 TB corpus read 5 times a month for batch retrieval incurs $450 in egress on AWS at $0.09/GB — on top of $23.55 in storage. The storage is the smaller charge. The reads are the bill.",
                },
                {
                  label: "The scale wall",
                  catch: "More documents means higher cost per query.",
                  body: "Add more documents, pay more per retrieval pass, pay more per API call. The corpus that would answer more questions costs more to maintain. Teams cap it at a size they can afford, not a size that is useful.",
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

        {/* Proof — code block + cost comparison */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={proofRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${proofInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>The connection</SectionLabel>
              <SectionHeading>
                Same S3 API. A corpus bill <span style={{ color: "#0090FF" }}>determined by storage, not reads.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Any S3-compatible client reads and writes the document store. Retrieval reads are included in flat storage — no egress counter.
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
                  corpus.py
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
                  {CORPUS_CODE}
                </pre>
              </div>

              {/* Cost comparison */}
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
                <SectionLabel>Monthly cost, 1 TB corpus + 5 TB retrieval reads</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    {
                      name: "AWS S3 Standard",
                      breakdown: "$23.55 storage + $460.80 egress",
                      total: "$484/mo",
                      win: false,
                      you: false,
                    },
                    {
                      name: "Fil One",
                      breakdown: "1 TB × $4.99 — egress $0",
                      total: "$4.99/mo",
                      win: true,
                      you: true,
                    },
                  ].map((r) => (
                    <div
                      key={r.name}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "14px 16px",
                        backgroundColor: r.you ? "#EFF8FF" : "#FFFFFF",
                        border: `1px solid ${r.you ? "rgba(0,144,255,0.2)" : "rgba(0,0,0,0.07)"}`,
                        borderRadius: 10,
                        flexWrap: "wrap",
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
                          fontSize: 11.5,
                          color: "#71717A",
                          flex: 1,
                          textAlign: "center",
                          minWidth: 120,
                        }}
                      >
                        {r.breakdown}
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
                  AWS S3 Standard us-east-1 Q2 2026: $0.023/GB storage, $0.09/GB egress. Computed from stated inputs — 1,024 GB × $0.023 = $23.55 storage; 5,120 GB × $0.09 = $460.80 egress. Fil One: 1 TB × $4.99 = $4.99, egress $0.
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
              <SectionLabel>What's live and what's coming</SectionLabel>
              <SectionHeading>
                Storage that scales with <span style={{ color: "#0090FF" }}>corpus size, not query rate.</span>
              </SectionHeading>
              <SectionSub maxWidth={560}>
                The storage layer is live today. Native RAG tooling integrations are in development.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc, devLabel }) => (
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 15,
                        lineHeight: "1.3",
                        color: "#09090B",
                        margin: 0,
                      }}
                    >
                      {title}
                    </p>
                    {devLabel && (
                      <span
                        style={{
                          display: "inline-block",
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 500,
                          fontSize: 10,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "#B45309",
                          backgroundColor: "#FFFBEB",
                          border: "1px solid rgba(180,83,9,0.2)",
                          borderRadius: 9999,
                          padding: "2px 8px",
                        }}
                      >
                        {devLabel}
                      </span>
                    )}
                  </div>
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
                    {devLabel && (
                      <>
                        {" "}
                        <a
                          href="/waitlist/bucket-intelligence"
                          style={{ color: "#0070CC", textDecoration: "underline" }}
                        >
                          Join the waitlist for early access.
                        </a>
                      </>
                    )}
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
                Storage. That is the whole bill. No egress fees on retrieval reads, no per-request fees. The corpus cost is the TB you keep, multiplied by one number.
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
                  Store the whole corpus.
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
                  Free 1 TB evaluation. Point your existing S3 client at the endpoint and stop rationing coverage.
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

export default RagStorageLandingPage;
