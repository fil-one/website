import { HardDrive, ChatDots, Robot, Check, ArrowRight } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";
import SectionHeader from "@/components/SectionHeader";
import Badge from "@/components/Badge";

const STORAGE_FEATURES = [
  "11 nines durability, verified daily",
  "Fully S3-compatible, no code changes needed",
  "No egress fees, no API request charges",
];

const RAG_FEATURES = [
  "Auto-indexes files in your bucket on upload",
  "Semantic search powered by your own LLM keys",
  "Supports PDF, Markdown, DOCX, HTML, and more",
];

const AGENT_FEATURES = [
  "Connect AI tools and automations",
  "Works with your existing buckets",
  "No egress fees",
  "Revoke access any time",
];

const ProductsSection = () => {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: storageRef, inView: storageInView } = useInView({ threshold: 0.1 });
  const { ref: addonsRef, inView: addonsInView } = useInView({ threshold: 0.05 });

  return (
    <section
      id="products"
      className="w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex flex-col gap-10 items-center px-5 md:px-8 pt-40 md:pt-52 pb-24 md:pb-32 w-full max-w-[1120px] mx-auto">

        {/* Heading */}
        <SectionHeader
          ref={headingRef}
          className={`max-w-[560px] reveal${headingInView ? " in-view" : ""}`}
          label="Products"
          title="Start with storage. Build AI on top."
          subtitle="Storage is the foundation. Bucket Intelligence and AI Agent Toolkit will soon connect directly to your buckets, no extra infrastructure needed."
        />

        {/* Foundation card — Object Storage */}
        <div
          ref={storageRef}
          className={`w-full reveal${storageInView ? " in-view" : ""}`}
        >
          <div
            className="w-full p-8 pb-6 md:p-10 md:pb-6 rounded-2xl border"
            style={{
              borderColor: "rgba(0,144,255,0.2)",
              backgroundColor: "#FAFEFF",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 24px rgba(0,144,255,0.06)",
            }}
          >
            <div className="flex flex-col gap-6">
              {/* Header: icon + title */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                  style={{ backgroundColor: "#EFF8FF" }}
                >
                  <HardDrive size={18} color="#0090FF" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    fontSize: 22,
                    lineHeight: "1.2",
                    letterSpacing: "-0.015em",
                    color: "#09090B",
                    margin: 0,
                  }}
                >
                  Object Storage
                </h3>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 15,
                  lineHeight: "1.6",
                  color: "#52525B",
                  maxWidth: 600,
                  marginTop: -8,
                }}
              >
                S3-compatible, verifiably durable object storage. Drop-in compatible with every S3 SDK and workflow, and the substrate every other capability runs on.
              </p>

              {/* Features */}
              <div className="flex flex-col gap-2.5">
                {STORAGE_FEATURES.map((f) => (
                  <div key={f} className="flex gap-3 items-start">
                    <Check size={14} color="#0090FF" className="shrink-0" style={{ marginTop: 2 }} />
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.5", color: "#52525B" }}>
                      {f}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

              {/* Footer: price + links + CTA */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p
                    style={{
                      fontFamily: "'Aspekta', sans-serif",
                      fontWeight: 500,
                      fontSize: 20,
                      color: "#09090B",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    $4.99
                    <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#71717A", letterSpacing: 0 }}>
                      {" "}/ TB / month
                    </span>
                  </p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, color: "#71717A", marginTop: 4 }}>
                    30-day free trial · no credit card
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="/storage"
                    className="flex items-center gap-1 transition-opacity hover:opacity-70"
                    style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A", textDecoration: "none", whiteSpace: "nowrap" }}
                  >
                    Learn more
                  </a>
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary" onClick={() => trackCtaClick("Start free trial", "https://app.fil.one/login?screen_hint=signup", "primary")}>
                    <span className="btn-primary-inner">Start free trial</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-6" style={{ backgroundColor: "rgba(0,0,0,0.10)" }} />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.07em",
              color: "#71717A",
              textTransform: "uppercase",
            }}
          >
            Add capabilities to your buckets
          </span>
          <div className="w-px h-6" style={{ backgroundColor: "rgba(0,0,0,0.10)" }} />
        </div>

        {/* Add-on cards */}
        <div
          ref={addonsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full reveal-group"
        >
          {/* Bucket Intelligence */}
          <div
            className={`flex flex-col gap-5 p-7 rounded-2xl border reveal${addonsInView ? " in-view" : ""}`}
            style={{
              borderColor: "rgba(0,0,0,0.07)",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            {/* Header: icon + title + badge */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}>
                  <ChatDots size={18} color="#0090FF" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    fontSize: 19,
                    lineHeight: "1.2",
                    letterSpacing: "-0.015em",
                    color: "#09090B",
                    margin: 0,
                  }}
                >
                  Bucket Intelligence
                </h3>
              </div>
              <Badge className="shrink-0">Coming soon</Badge>
            </div>

            {/* Subtitle + description */}
            <div className="flex flex-col gap-1">
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: "1.4", color: "#52525B" }}>
                Turn any bucket into a queryable knowledge base
              </p>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A" }}>
                Powered by a built-in RAG Pipeline. Files are auto-indexed as they land in your bucket. Ask questions in plain language using your own OpenAI, Anthropic, or Cohere keys.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2">
              {RAG_FEATURES.map((f) => (
                <div key={f} className="flex gap-2.5 items-start">
                  <Check size={14} color="#0090FF" className="shrink-0" style={{ marginTop: 2 }} />
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.5", color: "#52525B" }}>{f}</p>
                </div>
              ))}
            </div>

            <a
              href="/bucket-intelligence"
              className="flex items-center gap-0.5 transition-opacity hover:opacity-70 self-start"
              style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", textDecoration: "none" }}
            >
              Learn more
            </a>

            <div className="flex-1" />
            <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B", letterSpacing: "-0.015em", lineHeight: 1 }}>
                  Free for early testers
                </p>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12, color: "#71717A", marginTop: 3 }}>
                  LLM costs billed by your provider
                </p>
              </div>
              <a
                href="/waitlist/bucket-intelligence"
                className="flex items-center gap-1.5 shrink-0 transition-opacity hover:opacity-70"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#0090FF", textDecoration: "none" }}
                onClick={() => trackCtaClick("Join waitlist", "/waitlist/bucket-intelligence", "secondary")}
              >
                Join waitlist <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* AI Agent Toolkit */}
          <div
            className={`flex flex-col gap-5 p-7 rounded-2xl border reveal${addonsInView ? " in-view" : ""}`}
            style={{
              borderColor: "rgba(0,0,0,0.07)",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            {/* Header: icon + title + badge */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}>
                  <Robot size={18} color="#0090FF" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    fontSize: 19,
                    lineHeight: "1.2",
                    letterSpacing: "-0.015em",
                    color: "#09090B",
                    margin: 0,
                  }}
                >
                  AI Agent Toolkit
                </h3>
              </div>
              <Badge className="shrink-0">Coming soon</Badge>
            </div>

            {/* Subtitle + description */}
            <div className="flex flex-col gap-1">
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: "1.4", color: "#52525B" }}>
                Connect your AI tools and automations to Fil One
              </p>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A" }}>
                Pick an integration, paste a config block, and your buckets are immediately available for your AI agents to use or to trigger automations from bucket events.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2">
              {AGENT_FEATURES.map((f) => (
                <div key={f} className="flex gap-2.5 items-start">
                  <Check size={14} color="#0090FF" className="shrink-0" style={{ marginTop: 2 }} />
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.5", color: "#52525B" }}>{f}</p>
                </div>
              ))}
            </div>

            <a
              href="/ai-agent-toolkit"
              className="flex items-center gap-0.5 transition-opacity hover:opacity-70 self-start"
              style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", textDecoration: "none" }}
            >
              Learn more
            </a>

            <div className="flex-1" />
            <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B", letterSpacing: "-0.015em", lineHeight: 1 }}>
                  Free for early testers
                </p>
              </div>
              <a
                href="/waitlist/ai-agent-toolkit"
                className="flex items-center gap-1.5 shrink-0 transition-opacity hover:opacity-70"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#0090FF", textDecoration: "none" }}
                onClick={() => trackCtaClick("Join waitlist", "/waitlist/ai-agent-toolkit", "secondary")}
              >
                Join waitlist <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
