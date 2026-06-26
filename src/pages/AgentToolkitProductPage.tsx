import { useState } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Check, LockKey, CurrencyDollar, ShieldCheck, Wrench, CaretDown, Robot, Plug, Terminal, Copy } from "@phosphor-icons/react";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";

type IntegrationLang = "json" | "python";

const INTEGRATION_GROUPS: {
  icon: React.ElementType;
  label: string;
  description: string;
  integrations: string[];
  lang: IntegrationLang;
  filename: string;
  code: string;
}[] = [
  {
    icon: Robot,
    label: "Use in AI apps",
    description: "Full read/write access to your buckets via MCP.",
    integrations: ["Claude Desktop", "Cursor", "Continue", "Claude.ai", "ChatGPT"],
    lang: "json",
    filename: "claude_desktop_config.json",
    code: `{
  "mcpServers": {
    "fil-one": {
      "command": "npx",
      "args": ["-y", "@fil-one/mcp-server"],
      "env": {
        "FIL_ACCESS_KEY": "your-access-key",
        "FIL_SECRET_KEY": "your-secret-key"
      }
    }
  }
}`,
  },
  {
    icon: Plug,
    label: "Use in automations",
    description: "Trigger workflows from bucket events via OAuth or webhooks.",
    integrations: ["Zapier", "n8n", "Make.com", "Webhooks & REST"],
    lang: "json",
    filename: "webhook-event.json",
    code: `{
  "event": "object.created",
  "bucket": "my-bucket",
  "key": "uploads/report-q3.pdf",
  "size": 204800,
  "etag": "d8e8fca2dc0f896fd7cb4cb0031ba249",
  "timestamp": "2025-05-26T14:32:00Z",
  "metadata": {
    "content-type": "application/pdf"
  }
}`,
  },
  {
    icon: Terminal,
    label: "Use in code",
    description: "S3-compatible. Pre-built loaders for LangChain, LlamaIndex, and more.",
    integrations: ["LangChain", "LlamaIndex", "Vercel AI SDK", "CrewAI", "Fil One SDK"],
    lang: "python",
    filename: "agent.py",
    code: `from langchain_community.document_loaders import S3FileLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os

# Load documents directly from your Fil One bucket
loader = S3FileLoader(
    bucket="my-bucket",
    key="docs/handbook.pdf",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
)

docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=500)
chunks = splitter.split_documents(docs)`,
  },
];

function highlightCode(line: string, lang: IntegrationLang): string {
  const s = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (lang === "json") {
    return s
      .replace(/"([^"]*)"(\s*:)?/g, (_m, content, colon) =>
        colon
          ? `<span style="color:#0451A5">"${content}"</span>${colon}`
          : `<span style="color:#A31515">"${content}"</span>`
      )
      .replace(/: (\d+)/g, ': <span style="color:#098658">$1</span>');
  }

  // Python
  if (s.trimStart().startsWith("#")) {
    return `<span style="color:#008000;font-style:italic">${s}</span>`;
  }
  let out = s;
  out = out.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span style="color:#A31515">$1</span>');
  out = out.replace(/\b(from|import|os|def|class|return|if|else|for|in|as|None|True|False)\b/g, '<span style="color:#0000FF">$1</span>');
  return out;
}

const WHY = [
  {
    icon: LockKey,
    title: "Data sovereignty",
    description:
      "Agent data lives in your buckets, not a third-party SaaS you don't control. Your keys, your data.",
  },
  {
    icon: ShieldCheck,
    title: "Verifiable storage",
    description:
      "Every file is cryptographically verified on Filecoin's network. Agent memory you can actually audit.",
  },
  {
    icon: CurrencyDollar,
    title: "No extra cost",
    description:
      "The toolkit is free with your storage plan. You pay only for the storage you actually use.",
  },
  {
    icon: Wrench,
    title: "No infrastructure to manage",
    description:
      "Fil One handles durability, scaling, and replication. You just write to a bucket.",
  },
];

const FAQS = [
  {
    q: "What is MCP?",
    a: "Model Context Protocol — an open standard for connecting AI models to tools and data sources. Supported by Claude, Cursor, Continue, and others.",
  },
  {
    q: "Which apps are supported at launch?",
    a: "Claude Desktop, Cursor, Continue, Claude.ai, ChatGPT, Zapier, Make.com, and n8n. More coming.",
  },
  {
    q: "Is my agent data private?",
    a: "Yes — it lives in your Fil One buckets under your API keys. No third party can access it.",
  },
  {
    q: "Do I need the toolkit to use Fil One with code?",
    a: "No. Any S3-compatible SDK works out of the box. The toolkit adds MCP, OAuth connectors, and pre-built integrations on top.",
  },
  {
    q: "Can I use it with Claude?",
    a: "Yes — both Claude Desktop (via MCP config file) and Claude.ai (via OAuth). Takes about two minutes to set up.",
  },
];

const AgentToolkitProductPage = () => {
  const { heroEndRef } = useScrollTracking();
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: integrationsRef, inView: integrationsInView } = useInView({ threshold: 0.05 });
  const { ref: whyRef, inView: whyInView } = useInView({ threshold: 0.05 });
  const { ref: faqRef, inView: faqInView } = useInView({ threshold: 0.05 });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeIntegration, setActiveIntegration] = useState(0);
  const [codeCopied, setCodeCopied] = useState(false);

  useSeo({
    title: "AI Agent Toolkit — Fil One",
    description:
      "Plug Fil One into Claude, Cursor, Zapier, and 10+ more integrations via MCP and OAuth. Free with your storage plan.",
    canonical: "https://fil.one/ai-agent-toolkit",
    ogImage: "https://fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <div className="relative isolate pt-[58px] md:pt-[94px]" style={{ backgroundColor: "#FFFFFF" }}>
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
            className={`flex flex-col items-center gap-6 pt-20 md:pt-[120px] pb-14 md:pb-20 px-5 md:px-8 max-w-[1120px] mx-auto w-full reveal${heroInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col items-center gap-6 w-full">
              {/* Badge */}
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
                  Early access · AI Agent Toolkit
                </span>
              </div>

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
                  maxWidth: 560,
                  margin: 0,
                }}
              >
                Connect your AI stack to your buckets
              </h1>

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
                Native MCP server, OAuth-ready connectors, and pre-built SDK integrations for every major AI framework. Your agent data stays in your Fil One buckets, under your own keys.
              </p>

              <div className="flex flex-row items-center gap-3 mt-2">
                <a href="/waitlist/ai-agent-toolkit" className="btn-primary" onClick={() => trackCtaClick("Join the waitlist", "/waitlist/ai-agent-toolkit", "primary")}>
                  <span className="btn-primary-inner">Join the waitlist</span>
                </a>
                <a href="https://docs.fil.one" target="_blank" rel="noopener noreferrer" className="btn-secondary" onClick={() => { trackCtaClick("Explore docs", "https://docs.fil.one", "secondary"); trackDocsClick("https://docs.fil.one"); }}>
                  Explore docs
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Integrations */}
        <div ref={heroEndRef}>
        <section className="w-full px-5 md:px-8 pt-6 md:pt-8 pb-16 md:pb-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-4 w-full max-w-[1120px] mx-auto">

            {/* Integration cards — horizontal row */}
            <div
              ref={integrationsRef}
              className={`grid grid-cols-1 md:grid-cols-3 gap-3 reveal${integrationsInView ? " in-view" : ""}`}
            >
              {INTEGRATION_GROUPS.map(({ icon: Icon, label, description, integrations }, i) => {
                const isActive = activeIntegration === i;
                return (
                  <button
                    key={label}
                    onClick={() => setActiveIntegration(i)}
                    className="text-left w-full flex flex-col justify-start"
                    style={{
                      padding: 20,
                      borderRadius: 16,
                      backgroundColor: isActive ? "#EFF8FF" : "#FAFAFA",
                      border: isActive ? "1px solid rgba(0,144,255,0.28)" : "1px solid rgba(0,0,0,0.07)",
                      boxShadow: isActive
                        ? "0 0 0 1px rgba(0,144,255,0.1), 0 2px 16px rgba(0,144,255,0.08)"
                        : "0 1px 3px rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    <div className="flex flex-col gap-3">
                      <div
                        className="flex items-center justify-center rounded-lg shrink-0"
                        style={{ width: 30, height: 30, backgroundColor: isActive ? "rgba(0,144,255,0.1)" : "rgba(0,0,0,0.05)", transition: "background-color 0.2s ease" }}
                      >
                        <Icon size={14} color={isActive ? "#0090FF" : "#A1A1AA"} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14.5, color: "#09090B", margin: 0, lineHeight: "1.3" }}>{label}</p>
                        <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", margin: 0, lineHeight: "1.5" }}>{description}</p>
                        <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12, color: "#A1A1AA", margin: "4px 0 0", lineHeight: "1.4" }}>{integrations.join(" · ")}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Code panel — full width below cards */}
            <div className="w-full">
              <div style={{ backgroundColor: "#FFFFFF", borderRadius: 14, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
                {/* Editor chrome */}
                <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 400, fontSize: 12, color: "#09090B", backgroundColor: "#F4F4F5", borderRadius: 6, padding: "4px 10px" }}>
                    {INTEGRATION_GROUPS[activeIntegration].filename}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(INTEGRATION_GROUPS[activeIntegration].code);
                      setCodeCopied(true);
                      setTimeout(() => setCodeCopied(false), 1800);
                    }}
                    className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                    style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, color: codeCopied ? "#0090FF" : "#A1A1AA", background: "none", border: "none", cursor: "pointer", padding: "4px 6px", borderRadius: 6 }}
                  >
                    {codeCopied ? <Check size={13} /> : <Copy size={13} />}
                    {codeCopied ? "Copied" : "Copy"}
                  </button>
                </div>

                {/* Code area */}
                <div style={{ display: "grid", overflowX: "auto", minHeight: 320 }}>
                  {INTEGRATION_GROUPS.map(({ label, code, lang }, i) => {
                    const lines = code.split("\n");
                    return (
                      <pre
                        key={label}
                        style={{
                          gridArea: "1 / 1",
                          margin: 0,
                          padding: "20px 0",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 13,
                          lineHeight: 1.75,
                          minWidth: "max-content",
                          opacity: activeIntegration === i ? 1 : 0,
                          transition: "opacity 0.3s ease",
                          pointerEvents: activeIntegration === i ? "auto" : "none",
                        }}
                      >
                        {lines.map((line, j) => (
                          <div key={j} className="flex px-5 hover:bg-black/[0.02] transition-colors">
                            <span style={{ minWidth: 36, textAlign: "right", paddingRight: 20, color: "#D4D4D8", userSelect: "none", flexShrink: 0, fontSize: 12 }}>
                              {j + 1}
                            </span>
                            <span
                              style={{ color: "#374151", whiteSpace: "pre" }}
                              dangerouslySetInnerHTML={{ __html: highlightCode(line, lang) }}
                            />
                          </div>
                        ))}
                      </pre>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </section>
        </div>

        {/* Why Fil One */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#52525B", textTransform: "uppercase" }}>
                Why Fil One
              </span>
              <h2 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: "clamp(22px, 4vw, 30px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}>
                Your agent data belongs to you
              </h2>
            </div>

            <div ref={whyRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full reveal-group">
              {WHY.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-4 p-7 rounded-2xl border reveal${whyInView ? " in-view" : ""}`}
                  style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}>
                    <Icon size={18} color="#0090FF" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>{title}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.6", color: "#71717A" }}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="w-full px-5 md:px-8 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="w-full max-w-[800px] mx-auto" style={{ backgroundColor: "#EFF8FF", borderRadius: 24, border: "1px solid rgba(0,144,255,0.15)", boxShadow: "0 2px 20px rgba(0,144,255,0.07)" }}>
          <div className="flex flex-col gap-10 items-center text-center px-8 md:px-16 py-16 md:py-20 w-full">

            <div className="flex flex-col gap-4">
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#71717A", textTransform: "uppercase" }}>
                Pricing
              </span>
              <h2
                className="text-[26px] md:text-[34px]"
                style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}
              >
                Free with your storage plan.
              </h2>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "1.65", color: "#71717A", margin: "0 auto", maxWidth: 380 }}>
                No separate licence, no per-request fees. Enable it in your account and it's ready to use.
              </p>
            </div>

            {/* Feature tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "MCP server included",
                "OAuth connectors included",
                "SDK support included",
                "No per-request fees",
                "No per-connection fees",
              ].map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full"
                  style={{
                    backgroundColor: "rgba(0,144,255,0.06)",
                    border: "1px solid rgba(0,144,255,0.14)",
                  }}
                >
                  <Check size={12} color="#1EBFFF" weight="bold" className="shrink-0" />
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#0056A3", whiteSpace: "nowrap" }}>
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            <a href="/waitlist/ai-agent-toolkit" className="btn-primary" onClick={() => trackCtaClick("Join the waitlist", "/waitlist/ai-agent-toolkit", "primary")}>
              <span className="btn-primary-inner">Join the waitlist</span>
            </a>
          </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-10 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[720px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#52525B", textTransform: "uppercase" }}>
                FAQ
              </span>
              <h2 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: "clamp(22px, 4vw, 30px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}>
                Common questions
              </h2>
            </div>

            <div ref={faqRef} className={`w-full reveal${faqInView ? " in-view" : ""}`}>
              {FAQS.map(({ q, a }, i) => {
                const isOpen = openFaqIndex === i;
                const panelId = `faq-panel-${i}`;
                const buttonId = `faq-btn-${i}`;
                return (
                  <div key={q} style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                    <button
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="flex items-center justify-between w-full gap-4 py-5 text-left group transition-colors"
                    >
                      <span
                        className={`transition-colors group-hover:text-[#0070CC] ${isOpen ? "text-[#0070CC]" : "text-[#09090B]"}`}
                        style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.4" }}
                      >
                        {q}
                      </span>
                      <CaretDown
                        size={17}
                        className={`shrink-0 transition-all duration-200 group-hover:text-[#0070CC] ${isOpen ? "text-[#0070CC]" : "text-[#71717A]"}`}
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="overflow-hidden transition-all duration-200"
                      style={{ maxHeight: isOpen ? 1200 : 0 }}
                    >
                      <p
                        className="pb-5"
                        style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}
                      >
                        {a}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }} />
            </div>
          </div>
        </section>

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
              {/* White grid texture */}
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
                  Let your AI agents work with your data
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
                  Early access is open. Join the waitlist and be first in line.
                </p>
                <div className="flex items-center justify-center">
                  <a href="/waitlist/ai-agent-toolkit" className="btn-primary btn-primary-dark" onClick={() => trackCtaClick("Join the waitlist", "/waitlist/ai-agent-toolkit", "primary")}>
                    <span className="btn-primary-inner">Join the waitlist</span>
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
                  Works with Claude, Cursor, LangChain, and more · Free add-on
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

export default AgentToolkitProductPage;
