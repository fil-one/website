import { Brain, Robot, Check, ArrowRight } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";

const RAG_FEATURES = [
  "Indexes new files on a recurring pass, no scripts to run",
  "Semantic search on a model we host and pay for",
  "Supports PDF, Markdown, DOCX, HTML, and more",
  "One-click enable on existing buckets",
];

const AGENT_FEATURES = [
  "MCP server for Claude Desktop & Cursor",
  "OAuth connectors for Zapier, Make.com & n8n",
  "Persistent agent memory in a bucket you own",
  "No extra infrastructure to manage",
];

const AiCapabilitiesSection = () => {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: cardsRef, inView: cardsInView } = useInView({ threshold: 0.08 });

  return (
    <section
      id="ai-capabilities"
      className="w-full"
      style={{ backgroundColor: "#F4F4F5" }}
    >
      <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`flex flex-col gap-3 items-center text-center max-w-[560px] reveal${headingInView ? " in-view" : ""}`}
        >
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
            AI Capabilities
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
            Make your data work harder
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
            Two AI-native capabilities built on top of your Fil One storage. Both are in development, and both read from the buckets you already have.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full reveal-group">
          {/* RAG Pipeline */}
          <div
            className={`flex flex-col gap-7 p-8 rounded-2xl border reveal${cardsInView ? " in-view" : ""}`}
            style={{
              borderColor: "rgba(0,0,0,0.07)",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                style={{ backgroundColor: "#EFF8FF" }}
              >
                <Brain size={18} color="#0090FF" />
              </div>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "#0070CC",
                  textTransform: "uppercase",
                  backgroundColor: "#EFF8FF",
                  border: "1px solid rgba(0,144,255,0.2)",
                  borderRadius: 9999,
                  padding: "3px 9px",
                  whiteSpace: "nowrap",
                }}
              >
                Coming soon
              </span>
            </div>

            <div className="flex flex-col gap-2">
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
                RAG Pipeline
              </h3>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14.5,
                  lineHeight: "1.6",
                  color: "#71717A",
                }}
              >
                Turn any bucket into a queryable knowledge base. Files get indexed automatically as they arrive — ask questions in plain language, powered by your own LLM keys.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {RAG_FEATURES.map((f) => (
                <div key={f} className="flex gap-3 items-start">
                  <Check size={15} color="#0090FF" className="shrink-0" style={{ marginTop: 2 }} />
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: "1.55",
                      color: "#52525B",
                    }}
                  >
                    {f}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

            <div className="flex items-end justify-between gap-4">
              <div>
                <p
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    fontSize: 20,
                    color: "#09090B",
                    letterSpacing: "-0.015em",
                    lineHeight: 1,
                  }}
                >
                  +$15
                  <span
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      color: "#71717A",
                      letterSpacing: 0,
                    }}
                  >
                    {" "}/ TB / month
                  </span>
                </p>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 12.5,
                    color: "#A1A1AA",
                    marginTop: 4,
                  }}
                >
                  add-on · LLM costs billed directly by your provider
                </p>
              </div>
              <a
                href="/waitlist/bucket-intelligence"
                className="flex items-center gap-1.5 shrink-0 transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#0090FF",
                  textDecoration: "none",
                }}
              >
                Join waitlist
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* AI Agent Toolkit */}
          <div
            className={`flex flex-col gap-7 p-8 rounded-2xl border reveal${cardsInView ? " in-view" : ""}`}
            style={{
              borderColor: "rgba(0,0,0,0.07)",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                style={{ backgroundColor: "#EFF8FF" }}
              >
                <Robot size={18} color="#0090FF" />
              </div>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "#0070CC",
                  textTransform: "uppercase",
                  backgroundColor: "#EFF8FF",
                  border: "1px solid rgba(0,144,255,0.2)",
                  borderRadius: 9999,
                  padding: "3px 9px",
                  whiteSpace: "nowrap",
                }}
              >
                Coming soon
              </span>
            </div>

            <div className="flex flex-col gap-2">
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
                AI Agent Toolkit
              </h3>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14.5,
                  lineHeight: "1.6",
                  color: "#71717A",
                }}
              >
                Plug Fil One into AI assistants and automation tools. Connect Claude, Cursor, Zapier, and 10+ more integrations — your agent data stays in your buckets, not theirs.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {AGENT_FEATURES.map((f) => (
                <div key={f} className="flex gap-3 items-start">
                  <Check size={15} color="#0090FF" className="shrink-0" style={{ marginTop: 2 }} />
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: "1.55",
                      color: "#52525B",
                    }}
                  >
                    {f}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

            <div className="flex items-end justify-between gap-4">
              <div>
                <p
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    fontSize: 20,
                    color: "#09090B",
                    letterSpacing: "-0.015em",
                    lineHeight: 1,
                  }}
                >
                  Free
                </p>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 12.5,
                    color: "#A1A1AA",
                    marginTop: 4,
                  }}
                >
                  add-on · included with your storage plan
                </p>
              </div>
              <a
                href="/waitlist/ai-agent-toolkit"
                className="flex items-center gap-1.5 shrink-0 transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#0090FF",
                  textDecoration: "none",
                }}
              >
                Join waitlist
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiCapabilitiesSection;
