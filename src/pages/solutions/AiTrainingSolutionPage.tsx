import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import FaqSection from "@/components/FaqSection";
import {
  Database,
  Lightning,
  ShieldCheck,
  CurrencyDollar,
  ArrowsClockwise,
  Code,
  CheckCircle,
} from "@phosphor-icons/react";

const FEATURES = [
  {
    icon: Database,
    title: "Petabyte-scale dataset storage",
    body: "Store training corpora, tokenized datasets, and raw crawl data with no practical size limits. Organize with prefixes and lifecycle rules.",
  },
  {
    icon: Lightning,
    title: "High-throughput reads",
    body: "Sustained multi-Gbps throughput so your GPU cluster never starves waiting for the next batch. Designed for continuous streaming reads.",
  },
  {
    icon: ShieldCheck,
    title: "Verifiable data integrity",
    body: "Every object is cryptographically sealed. Prove your training data hasn't drifted or been tampered with.",
  },
  {
    icon: CurrencyDollar,
    title: "No egress fees, ever",
    body: "Move data between cloud regions, download checkpoints for fine-tuning, or replicate across providers. Zero egress charges, always.",
  },
  {
    icon: ArrowsClockwise,
    title: "S3-compatible, drop-in",
    body: "Works with PyTorch DataLoader, HuggingFace datasets, Ray Data, and any S3-compatible SDK. One endpoint swap and you're live.",
  },
  {
    icon: Code,
    title: "Checkpoint versioning",
    body: "Tag model checkpoints with metadata, roll back to any point in training, and share artifacts across teams via presigned URLs.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Create a bucket",
    body: "Provision a bucket in seconds from the dashboard. Pick your preferred region.",
  },
  {
    number: "02",
    title: "Swap your endpoint",
    body: "Replace your existing S3 endpoint URL with Fil One's. No SDK changes, no re-architecture.",
  },
  {
    number: "03",
    title: "Upload your data",
    body: "Use rclone, the AWS CLI, or any S3 library to migrate datasets and checkpoints.",
  },
  {
    number: "04",
    title: "Train with confidence",
    body: "Your data is verifiably intact, your reads are fast, and your egress bill is zero.",
  },
];

const AiTrainingSolutionPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: featRef, inView: featInView } = useInView({ threshold: 0.1 });
  const { ref: stepsRef, inView: stepsInView } = useInView({ threshold: 0.1 });

  useSeo({
    title: "AI Training & Inference Storage — Fil One",
    description:
      "S3-compatible object storage built for AI workloads. Store training datasets, model weights, and checkpoints with verifiable integrity and no egress fees.",
    canonical: "https://fil.one/solutions/ai-training",
    ogImage: "https://fil.one/og-image.png",
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
                  Solutions · AI Training & Inference
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
                  maxWidth: 520,
                  margin: 0,
                }}
              >
                Storage that keeps your GPUs fed
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
                Store training datasets, model weights, and checkpoints with verifiable integrity — and move data freely with zero egress fees.
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

        {/* Social proof bar */}
        <div
          className="border-y px-5 md:px-8 py-5"
          style={{ borderColor: "rgba(0,0,0,0.06)", backgroundColor: "#FAFAFA" }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "S3-compatible — drop-in replacement",
              "$4.99 / TB / month",
              "Cryptographic data integrity",
              "Multi-region redundancy",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle size={14} weight="fill" style={{ color: "#0090FF", flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "#52525B",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-[1120px] mx-auto">
            <div
              ref={featRef}
              className={`reveal${featInView ? " in-view" : ""}`}
            >
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
                  Built for AI teams
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
                  Everything your training pipeline needs
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
                          fontSize: 13.5,
                          lineHeight: "1.6",
                          color: "#71717A",
                        }}
                      >
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#F4F4F5" }}>
          <div className="max-w-[1120px] mx-auto">
            <div
              ref={stepsRef}
              className={`reveal${stepsInView ? " in-view" : ""}`}
            >
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
                  Get started in minutes
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
                  Four steps to zero egress bills
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {STEPS.map(({ number, title, body }) => (
                  <div key={number} className="flex flex-col gap-3">
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 500,
                        fontSize: 28,
                        color: "#0090FF",
                        lineHeight: 1,
                      }}
                    >
                      {number}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Aspekta', sans-serif",
                        fontWeight: 500,
                        fontSize: 15,
                        color: "#09090B",
                        margin: 0,
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontSize: 14,
                        lineHeight: "1.6",
                        color: "#71717A",
                        margin: 0,
                      }}
                    >
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
          "How does data integrity verification work with Fil One?",
          "Is Fil One compatible with my existing tools?",
          "How do I migrate from AWS / Azure / Google Cloud?",
          "How does Fil One approach security and compliance?",
        ]} />

        {/* CTA Banner */}
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
                  Stop paying egress fees on every training run
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
                  Start with 1 TB free. No credit card, no egress fees, no surprises.
                </p>
                <div className="flex items-center justify-center">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Start for free</span>
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

export default AiTrainingSolutionPage;
