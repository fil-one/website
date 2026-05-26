import { Check, ArrowRight } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import StorageCalculatorSection from "@/components/StorageCalculatorSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";

const PAYGO_FEATURES = [
  "Pay monthly",
  "No egress fees",
  "No API request fees",
  "Data integrity guarantees",
  "AI Agent Toolkit included",
];

const BUSINESS_FEATURES = [
  "Purchase in 1, 3, or 5-year increments",
  "No egress or API request fees",
  "Data integrity guarantees",
  "Capacity assurance and deployment SLAs",
  "AI Agent Toolkit included",
];

const RAG_FEATURES = [
  "Auto-indexes files in your bucket on upload",
  "Semantic search with your own LLM keys",
  "Supports PDF, Markdown, DOCX, HTML, and more",
];

const AGENT_FEATURES = [
  "MCP server for Claude Desktop & Cursor",
  "OAuth for Zapier, Make.com & n8n",
  "LangChain, LlamaIndex & Vercel AI SDK support",
];

const sharedCard = {
  borderColor: "rgba(0,0,0,0.07)",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
};

const PricingPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: storageRef, inView: storageInView } = useInView({ threshold: 0.05 });
  const { ref: addonsRef, inView: addonsInView } = useInView({ threshold: 0.05 });

  useSeo({
    title: "Pricing — Fil One",
    description:
      "Simple, predictable pricing for Object Storage, RAG Pipeline, and AI Agent Toolkit. Start free, scale as you grow.",
    canonical: "https://filone.io/pricing",
    ogImage: "https://filone.io/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">
        <div
          className="flex flex-col gap-20 items-center px-5 md:px-8 pt-32 md:pt-40 pb-24 md:pb-32 w-full max-w-[1120px] mx-auto"
        >
          {/* Hero */}
          <div
            ref={heroRef}
            className={`flex flex-col gap-3 items-center text-center max-w-[520px] reveal${heroInView ? " in-view" : ""}`}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 11.5,
                letterSpacing: "0.08em",
                color: "#71717A",
                textTransform: "uppercase",
              }}
            >
              Pricing
            </span>
            <h1
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(28px, 5vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#09090B",
                margin: 0,
              }}
            >
              Simple, predictable pricing
            </h1>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 1.65,
                color: "#71717A",
                margin: 0,
              }}
            >
              Start with 1 TB free. Pay only for what you use — no egress fees, no surprises.
            </p>
          </div>

          {/* Object Storage */}
          <div ref={storageRef} className="flex flex-col gap-8 w-full">
            <div className={`flex flex-col gap-1 reveal${storageInView ? " in-view" : ""}`}>
              <h2
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  fontSize: 20,
                  letterSpacing: "-0.015em",
                  color: "#09090B",
                  margin: 0,
                }}
              >
                Object Storage
              </h2>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#71717A", margin: 0 }}>
                The foundation every Fil One account starts with.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-stretch reveal-group">
              {/* Pay-as-you-go */}
              <div
                className={`flex flex-1 flex-col gap-8 items-start p-8 rounded-2xl border reveal${storageInView ? " in-view" : ""}`}
                style={sharedCard}
              >
                <div className="flex flex-col gap-1 w-full">
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B" }}>
                    Pay-as-you-go
                  </p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A" }}>
                    For teams getting started
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-end gap-2 flex-wrap">
                    <span style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 28, lineHeight: 1, color: "#09090B", letterSpacing: "-0.02em" }}>
                      $4.99
                    </span>
                    <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#71717A", paddingBottom: 4 }}>
                      / TB / month
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: 1.55, color: "#71717A" }}>
                    Free for the first 30 days.
                  </p>
                </div>

                <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

                <div className="flex flex-col gap-3.5 w-full">
                  {PAYGO_FEATURES.map((item) => (
                    <div key={item} className="flex gap-3 items-center w-full">
                      <Check size={15} color="#0090FF" className="shrink-0" />
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.4, color: "#52525B" }}>{item}</p>
                    </div>
                  ))}
                </div>

                <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary mt-auto w-full">
                  <span className="btn-primary-inner w-full justify-center">Try for free</span>
                </a>
              </div>

              {/* Business plan */}
              <div
                className={`flex flex-1 flex-col gap-8 items-start p-8 rounded-2xl border reveal${storageInView ? " in-view" : ""}`}
                style={sharedCard}
              >
                <div className="flex flex-col gap-1 w-full">
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B" }}>
                    Business plan
                  </p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A" }}>
                    For enterprises with scale
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <span style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 28, lineHeight: 1, color: "#09090B", letterSpacing: "-0.02em" }}>
                    Custom pricing
                  </span>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: 1.55, color: "#71717A" }}>
                    Ideal for predictable storage needs or compliance-driven requirements.
                  </p>
                </div>

                <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

                <div className="flex flex-col gap-3.5 w-full">
                  {BUSINESS_FEATURES.map((item) => (
                    <div key={item} className="flex gap-3 items-center w-full">
                      <Check size={15} color="#0090FF" className="shrink-0" />
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.4, color: "#52525B" }}>{item}</p>
                    </div>
                  ))}
                </div>

                <a href="/contact-sales" className="btn-secondary mt-auto w-full justify-center">
                  Contact sales
                </a>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div ref={addonsRef} className="flex flex-col gap-8 w-full">
            <div className={`flex flex-col gap-1 reveal${addonsInView ? " in-view" : ""}`}>
              <h2
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  fontSize: 20,
                  letterSpacing: "-0.015em",
                  color: "#09090B",
                  margin: 0,
                }}
              >
                Add-ons
              </h2>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#71717A", margin: 0 }}>
                Connect directly to your buckets — no extra infrastructure.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-stretch reveal-group">
              {/* RAG Pipeline */}
              <div
                className={`flex flex-1 flex-col gap-6 p-8 rounded-2xl border reveal${addonsInView ? " in-view" : ""}`}
                style={sharedCard}
              >
                <div className="flex items-center justify-between gap-3">
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B" }}>
                    RAG Pipeline
                  </p>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10.5,
                      letterSpacing: "0.06em",
                      color: "#0070CC",
                      textTransform: "uppercase",
                      backgroundColor: "#EFF8FF",
                      border: "1px solid rgba(0,144,255,0.2)",
                      borderRadius: 9999,
                      padding: "3px 8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Coming soon
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 24, lineHeight: 1, color: "#09090B", letterSpacing: "-0.02em" }}>
                    +$15
                    <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#71717A", letterSpacing: 0 }}> / TB / month</span>
                  </span>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A" }}>
                    add-on · LLM costs billed by your provider
                  </p>
                </div>

                <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

                <div className="flex flex-col gap-3">
                  {RAG_FEATURES.map((item) => (
                    <div key={item} className="flex gap-3 items-start">
                      <Check size={14} color="#0090FF" className="shrink-0" style={{ marginTop: 2 }} />
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: 1.5, color: "#52525B" }}>{item}</p>
                    </div>
                  ))}
                </div>

                <a
                  href="/contact-sales"
                  className="flex items-center gap-1.5 mt-auto transition-opacity hover:opacity-70 self-start"
                  style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#0090FF", textDecoration: "none" }}
                >
                  Join waitlist <ArrowRight size={14} />
                </a>
              </div>

              {/* AI Agent Toolkit */}
              <div
                className={`flex flex-1 flex-col gap-6 p-8 rounded-2xl border reveal${addonsInView ? " in-view" : ""}`}
                style={sharedCard}
              >
                <div className="flex items-center justify-between gap-3">
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B" }}>
                    AI Agent Toolkit
                  </p>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10.5,
                      letterSpacing: "0.06em",
                      color: "#0070CC",
                      textTransform: "uppercase",
                      backgroundColor: "#EFF8FF",
                      border: "1px solid rgba(0,144,255,0.2)",
                      borderRadius: 9999,
                      padding: "3px 8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Coming soon
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 24, lineHeight: 1, color: "#09090B", letterSpacing: "-0.02em" }}>
                    Free
                  </span>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A" }}>
                    add-on · included with your storage plan
                  </p>
                </div>

                <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

                <div className="flex flex-col gap-3">
                  {AGENT_FEATURES.map((item) => (
                    <div key={item} className="flex gap-3 items-start">
                      <Check size={14} color="#0090FF" className="shrink-0" style={{ marginTop: 2 }} />
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: 1.5, color: "#52525B" }}>{item}</p>
                    </div>
                  ))}
                </div>

                <a
                  href="/contact-sales"
                  className="flex items-center gap-1.5 mt-auto transition-opacity hover:opacity-70 self-start"
                  style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#0090FF", textDecoration: "none" }}
                >
                  Join waitlist <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <StorageCalculatorSection />

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
