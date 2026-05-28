import { useState } from "react";
import Navbar from "@/components/Navbar";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import {
  ArrowRight,
  ArrowUpRight,
  CurrencyDollar,
  SealCheck,
  Plugs,
} from "@phosphor-icons/react";

const PAIN_POINTS = [
  {
    icon: CurrencyDollar,
    problem: "Egress fees on every training run",
    solution:
      "Flat $4.99/TB/month. No egress fees, no per-request charges. Pull your checkpoints and datasets as many times as you need.",
  },
  {
    icon: SealCheck,
    problem: '"Did this checkpoint get corrupted?"',
    solution:
      "Fil One is backed by Filecoin. Cryptographic proofs continuously verify your data is stored exactly as you uploaded it.",
  },
  {
    icon: Plugs,
    problem: "Switching storage means learning a new SDK",
    solution:
      "It's just S3. If you already use boto3 or the AWS CLI, you're done. Change one endpoint URL and keep your entire workflow intact.",
  },
];

const CODE_TABS = [
  {
    label: "Save checkpoint",
    code: `import boto3, os

s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ONE_KEY"],
    aws_secret_access_key=os.environ["FIL_ONE_SECRET"],
    region_name="eu-west-1",
)

# Save your model checkpoint — no egress fees when you load it back
s3.upload_file(
    "model_epoch_10.pt",
    "my-models",
    "checkpoints/run_42/epoch_10.pt",
)`,
  },
  {
    label: "Upload dataset",
    code: `import boto3, os
from pathlib import Path

s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ONE_KEY"],
    aws_secret_access_key=os.environ["FIL_ONE_SECRET"],
    region_name="eu-west-1",
)

# Upload a versioned dataset — iterate freely, no per-request charges
for f in Path("./dataset").glob("*.parquet"):
    s3.upload_file(str(f), "my-datasets", f"v2/{f.name}")
    print(f"uploaded {f.name}")`,
  },
  {
    label: "Load in training",
    code: `import boto3, os, torch

s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ONE_KEY"],
    aws_secret_access_key=os.environ["FIL_ONE_SECRET"],
    region_name="eu-west-1",
)

# Pull checkpoints as often as you need — costs nothing extra
s3.download_file(
    "my-models",
    "checkpoints/run_42/epoch_10.pt",
    "/tmp/model.pt",
)
model.load_state_dict(torch.load("/tmp/model.pt", map_location="cpu"))`,
  },
];

const WHY_ITEMS = [
  {
    number: "01",
    title: "No egress fees",
    body: "AI is iterative. You run the same evaluation dozens of times before shipping, pull model weights for every inference test, and rescan your datasets more than you'd like to admit. Every pass through your data shouldn't add to the bill. We charge for storage — not for using what you stored.",
  },
  {
    number: "02",
    title: "Verifiable integrity",
    body: "When you revisit an experiment six months from now, your training data should be bit-for-bit what it was the day you ran it. Filecoin's cryptographic proofs make that provable — not just hoped for. Reproducibility is hard enough without your storage layer being a variable.",
  },
  {
    number: "03",
    title: "It's just S3",
    body: "Your tooling already speaks S3. PyTorch, HuggingFace, boto3, the AWS CLI — they all do. We didn't build a new protocol because there was no reason to. Change one endpoint URL and keep everything else exactly as it is.",
  },
];

const TOOLS = [
  "boto3 (Python)",
  "AWS SDK v3 (JS/TS)",
  "aws-sdk-go-v2 (Go)",
  "AWS CLI",
  "rclone",
  "s3cmd",
  "MinIO Client",
  "Cyberduck",
];

const AiPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { ref: painRef, inView: painInView } = useInView({ threshold: 0.06 });
  const { ref: codeRef, inView: codeInView } = useInView({ threshold: 0.06 });
  const { ref: toolsRef, inView: toolsInView } = useInView({ threshold: 0.06 });
  const { ref: whyRef, inView: whyInView } = useInView({ threshold: 0.04 });

  useSeo({
    title: "Fil One for AI & ML — S3 Storage Without Egress Fees",
    description:
      "Stop paying egress fees on every training run. Fil One is S3-compatible object storage for AI teams — store model checkpoints, training datasets, and artifacts with cryptographic data integrity. $4.99/TB/month, no egress fees.",
    canonical: "https://filone.io/ai",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <div className="relative isolate" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.09" stroke-width="1"/></svg>'
              )}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />
          <section className="relative w-full overflow-hidden pt-[58px]">
            <div className="relative flex flex-col items-center pt-20 md:pt-[120px] pb-24 md:pb-32 px-5 md:px-8 max-w-[1120px] mx-auto w-full">
              <div className="flex flex-col items-center gap-6 w-full hero-fade-1">
                {/* Badge */}
                <a
                  href="https://docs.fil.one/quickstart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "#EFF8FF",
                    border: "1px solid rgba(0,144,255,0.2)",
                    borderRadius: 9999,
                    padding: "4px 4px 4px 10px",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 13.5,
                      lineHeight: 1,
                      color: "#0070CC",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Storage for the AI era
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 21,
                      height: 21,
                      borderRadius: "50%",
                      backgroundColor: "rgba(0,112,204,0.12)",
                      flexShrink: 0,
                    }}
                  >
                    <ArrowRight size={11} weight="bold" color="#0070CC" />
                  </span>
                </a>

                {/* Headline */}
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
                  Built for AI teams that iterate fast
                </h1>

                {/* Subheadline */}
                <p
                  className="text-[15px] md:text-[16.5px]"
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    lineHeight: "1.65",
                    color: "#71717A",
                    textAlign: "center",
                    maxWidth: 460,
                    margin: 0,
                  }}
                >
                  Model weights, training datasets, fine-tuning artifacts — on the S3 API you already know. Zero egress fees, flat pricing, Filecoin-backed integrity.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-10 hero-fade-2">
                <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                  <span className="btn-primary-inner">Start free — 1 TB included</span>
                </a>
                <a
                  href="https://docs.fil.one"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-1"
                >
                  Read the docs
                  <ArrowUpRight size={13} style={{ color: "#A1A1AA", marginTop: 1 }} aria-hidden="true" />
                </a>
              </div>

              {/* Tagline */}
              <p
                className="mt-4 hero-fade-3"
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: "1.5",
                  color: "#71717A",
                  textAlign: "center",
                }}
              >
                No credit card required · No egress fees · Connects in minutes
              </p>
            </div>
          </section>
        </div>

        {/* Pain points */}
        <section
          className="w-full"
          style={{
            backgroundColor: "#FAFAFA",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[560px]">
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
                Why AI teams switch
              </span>
              <h2
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(24px, 4vw, 32px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "#09090B",
                  margin: 0,
                }}
              >
                Storage that gets out of your way
              </h2>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#52525B",
                }}
              >
                Three things that slow AI teams down. Here's how Fil One handles them.
              </p>
            </div>

            <div ref={painRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full reveal-group">
              {PAIN_POINTS.map(({ icon: Icon, problem, solution }) => (
                <div
                  key={problem}
                  className={`flex flex-col gap-5 p-8 rounded-2xl border reveal${painInView ? " in-view" : ""}`}
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
                      {problem}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: "1.6",
                        color: "#71717A",
                      }}
                    >
                      {solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code snippets */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={codeRef}
            className={`flex flex-col gap-10 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto reveal${codeInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center max-w-[560px]">
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
                One endpoint swap
              </span>
              <h2
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(24px, 4vw, 32px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "#09090B",
                  margin: 0,
                }}
              >
                You already know how to use it
              </h2>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#52525B",
                }}
              >
                If you've touched boto3 or the AWS CLI before, you're 90% done.
              </p>
            </div>

            {/* Tabbed code block */}
            <div
              className="w-full max-w-[740px] rounded-2xl overflow-hidden border"
              style={{ borderColor: "rgba(0,0,0,0.09)" }}
            >
              {/* Tab bar */}
              <div
                className="flex items-center border-b overflow-x-auto"
                style={{
                  borderColor: "rgba(0,0,0,0.09)",
                  backgroundColor: "#F8F8F8",
                  scrollbarWidth: "none",
                }}
              >
                {CODE_TABS.map((tab, i) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(i)}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: activeTab === i ? 500 : 400,
                      fontSize: 12.5,
                      color: activeTab === i ? "#09090B" : "#71717A",
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: activeTab === i ? "2px solid #0090FF" : "2px solid transparent",
                      padding: "12px 18px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "color 150ms ease",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Code area */}
              <pre
                className="p-6 md:p-8 overflow-x-auto"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  lineHeight: "1.75",
                  backgroundColor: "#FAFAFA",
                  color: "#09090B",
                  margin: 0,
                  minHeight: 240,
                }}
              >
                <code>{CODE_TABS[activeTab].code}</code>
              </pre>
            </div>

            <a
              href="https://docs.fil.one/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "#0090FF",
                textDecoration: "none",
              }}
            >
              Full quickstart guide
              <ArrowUpRight size={14} style={{ marginTop: 1 }} />
            </a>
          </div>
        </section>

        {/* Works with */}
        <section
          className="w-full"
          style={{
            backgroundColor: "#FAFAFA",
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div
            ref={toolsRef}
            className={`flex flex-col gap-8 items-center px-5 md:px-8 py-20 w-full max-w-[1120px] mx-auto reveal${toolsInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-2 items-center text-center">
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
                Works with
              </span>
              <h2
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(22px, 3.5vw, 28px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "#09090B",
                  margin: 0,
                }}
              >
                Your stack, unchanged
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 justify-center max-w-[600px]">
              {TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-full border"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "#52525B",
                    borderColor: "rgba(0,0,0,0.10)",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Why Fil One */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex flex-col gap-14 px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
            {/* Heading */}
            <div className="flex flex-col gap-3 max-w-[520px]">
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
                Why Fil One
              </span>
              <h2
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(24px, 4vw, 32px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "#09090B",
                  margin: 0,
                }}
              >
                Designed for how AI actually works
              </h2>
            </div>

            {/* Items */}
            <div ref={whyRef} className="flex flex-col reveal-group">
              {WHY_ITEMS.map(({ number, title, body }) => (
                <div
                  key={number}
                  className={`grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-16 py-10 border-t reveal${whyInView ? " in-view" : ""}`}
                  style={{ borderColor: "rgba(0,0,0,0.07)" }}
                >
                  {/* Left: number + title */}
                  <div className="flex md:flex-col gap-3 md:gap-2 items-baseline md:items-start">
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#A1A1AA",
                        flexShrink: 0,
                      }}
                    >
                      {number}
                    </span>
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
                  </div>

                  {/* Right: body */}
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 15,
                      lineHeight: "1.75",
                      color: "#52525B",
                      margin: 0,
                      maxWidth: 580,
                    }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default AiPage;
