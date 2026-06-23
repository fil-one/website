import { useState } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Check, CaretDown } from "@phosphor-icons/react";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";

const FEATURES = [
  {
    title: "Bring your own LLM keys",
    description:
      "Use OpenAI, Anthropic, or Cohere for embeddings and completions. You pay your provider directly — no markup from Fil One.",
  },
  {
    title: "Automatic indexing",
    description:
      "Files uploaded to enabled buckets are indexed in near real-time. Deleted files are automatically removed from the index.",
  },
  {
    title: "Multiple integration options",
    description:
      "Access your knowledge base via the Fil One dashboard, MCP server for Claude and Cursor, or direct REST API.",
  },
  {
    title: "Custom embedding models",
    description:
      "Use any OpenAI-compatible endpoint, including self-hosted models. Switch providers without re-indexing.",
  },
];

const STATS = [
  {
    value: "1-click",
    label: "Enable on any bucket",
    note: "No migration or data export. Works with your existing storage plan.",
  },
  {
    value: "$0",
    label: "LLM markup",
    note: "Bring your own OpenAI, Anthropic, or Cohere keys. Provider costs go directly to you.",
  },
  {
    value: "< 1 min",
    label: "Indexing time",
    note: "New uploads are chunked and indexed in near real-time as they arrive.",
  },
];

const USE_CASES = [
  {
    number: "01",
    title: "Connect your bucket",
    description: "Enable Bucket Intelligence on any existing bucket with one click. No migration or data export needed.",
  },
  {
    number: "02",
    title: "Files get indexed automatically",
    description: "New uploads are chunked and indexed in near real-time using your chosen embedding model and API key.",
  },
  {
    number: "03",
    title: "Ask questions, get answers",
    description: "Query via the dashboard, MCP endpoint, or REST API. Answers come with cited source file excerpts.",
  },
];

const FILE_TYPES = ["PDF", "Markdown", "Plain text", "HTML", "DOCX"];

const FAQS = [
  {
    q: "What file types are supported?",
    a: "PDF, Markdown, plain text (.txt), HTML, and DOCX at launch. More formats on the roadmap.",
  },
  {
    q: "Where are my LLM API keys stored?",
    a: "Encrypted at rest using industry-standard encryption. Keys are never logged or included in responses.",
  },
  {
    q: "How fast is indexing?",
    a: "Near real-time — typically under a minute for most files. Larger documents may take a few minutes.",
  },
  {
    q: "Can I use a custom embedding model?",
    a: "Yes. Any OpenAI-compatible endpoint works, including self-hosted models like nomic-embed or mxbai-embed.",
  },
  {
    q: "What happens when I delete a file from my bucket?",
    a: "It is automatically removed from the index. No manual cleanup needed.",
  },
];

const RagPipelineProductPage = () => {
  const { heroEndRef } = useScrollTracking();
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ucRef, inView: ucInView } = useInView({ threshold: 0.05 });
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.1 });
  const { ref: faqRef, inView: faqInView } = useInView({ threshold: 0.05 });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useSeo({
    title: "RAG Pipeline — Fil One",
    description:
      "Turn any Fil One bucket into a queryable knowledge base. Auto-index files, semantic search, bring your own LLM keys. +$15/TB/month add-on.",
    canonical: "https://fil.one/bucket-intelligence",
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
                  Coming soon · Bucket Intelligence
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
                Turn any bucket into a queryable knowledge base
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
                Auto-index your files as they arrive. Ask questions in plain language — powered by your own OpenAI, Anthropic, or Cohere keys.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <a href="/waitlist/bucket-intelligence" className="btn-primary" onClick={() => trackCtaClick("Join the waitlist", "/waitlist/bucket-intelligence", "primary")}>
                  <span className="btn-primary-inner">Join the waitlist</span>
                </a>
                <a href="https://docs.fil.one" target="_blank" rel="noopener noreferrer" className="btn-secondary" onClick={() => { trackCtaClick("Explore docs", "https://docs.fil.one", "secondary"); trackDocsClick("https://docs.fil.one"); }}>
                  Explore docs
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={heroEndRef}>
          <section className="w-full px-5 md:px-8 pt-0 pb-0" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="w-full max-w-[1120px] mx-auto">
              <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full reveal-group">
                {STATS.map(({ value, label, note }) => (
                  <div
                    key={label}
                    className={`flex flex-col gap-3 p-8 rounded-2xl border reveal${statsInView ? " in-view" : ""}`}
                    style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}
                  >
                    <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: "clamp(28px, 5vw, 40px)", lineHeight: 1, letterSpacing: "-0.03em", color: "#0090FF", margin: 0 }}>
                      {value}
                    </p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B", margin: 0 }}>{label}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A", margin: 0 }}>{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Features */}
        <div>
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#52525B", textTransform: "uppercase" }}>
                Features
              </span>
              <h2 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: "clamp(22px, 4vw, 30px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}>
                Built around your existing stack
              </h2>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: "#52525B" }}>
                No chunking scripts, no vector DB to provision, no new API keys to manage — just your bucket and your LLM provider.
              </p>
            </div>

            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full reveal-group">
              {FEATURES.map(({ title, description }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-4 p-7 rounded-2xl border reveal${featuresInView ? " in-view" : ""}`}
                  style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex gap-3 items-start">
                    <Check size={15} color="#0090FF" className="shrink-0" style={{ marginTop: 2 }} />
                    <div className="flex flex-col gap-1.5">
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>{title}</p>
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.6", color: "#71717A" }}>{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Supported file types */}
            <div className="flex flex-col gap-4 items-center">
              <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.07em", color: "#A1A1AA", textTransform: "uppercase" }}>
                Supported file types
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {FILE_TYPES.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "#52525B",
                      backgroundColor: "#F4F4F5",
                      border: "1px solid rgba(0,0,0,0.07)",
                      borderRadius: 8,
                      padding: "5px 12px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        </div>

        {/* Use cases */}
        <section className="w-full px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#F4F4F5" }}>
          <div className="flex flex-col gap-12 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#52525B", textTransform: "uppercase" }}>
                How it works
              </span>
              <h2 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: "clamp(24px, 4vw, 32px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}>
                Up and running in minutes
              </h2>
            </div>
            <div ref={ucRef} className={`grid grid-cols-1 sm:grid-cols-3 gap-6 reveal${ucInView ? " in-view" : ""}`}>
              {USE_CASES.map(({ number, title, description }) => (
                <div key={number} className="flex flex-col gap-3">
                  <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 28, color: "#0090FF", lineHeight: 1 }}>
                    {number}
                  </span>
                  <h3 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B", margin: 0 }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 14, lineHeight: "1.6", color: "#71717A", margin: 0 }}>
                    {description}
                  </p>
                </div>
              ))}
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
                  Turn your buckets into knowledge bases
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
                  <a href="/waitlist/bucket-intelligence" className="btn-primary btn-primary-dark" onClick={() => trackCtaClick("Join the waitlist", "/waitlist/bucket-intelligence", "primary")}>
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
                  Requires an active storage plan · No extra infrastructure
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

export default RagPipelineProductPage;
