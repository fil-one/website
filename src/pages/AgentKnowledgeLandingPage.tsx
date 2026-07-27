import { Database, ArrowsOut, ChartLine, Plug, ArrowRight } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


const FEATURES = [
  {
    icon: Database,
    title: "Agent memory & state",
    desc: "Persist conversation history, task queues, episodic memory, and checkpoint files across agent restarts. Standard PutObject/GetObject — the agent writes, the agent reads.",
    comingSoon: false,
    waitlistHref: null,
  },
  {
    icon: ChartLine,
    title: "Flat cost for loop traffic",
    desc: "Agents write frequently and read back their own outputs. Per-request billing makes loops expensive. $4.99/TB flat — no PUT fees, no GET fees, no egress.",
    comingSoon: false,
    waitlistHref: null,
  },
  {
    icon: ArrowsOut,
    title: "RAG corpus storage",
    desc: "Store raw documents, chunked text, and embeddings backing a retrieval pipeline. Reads are included in flat storage — no per-retrieval egress counter.",
    comingSoon: true,
    waitlistHref: "/waitlist/bucket-intelligence",
  },
  {
    icon: Plug,
    title: "AI toolkit integrations",
    desc: "LangChain, LlamaIndex, and Haystack connectors for direct corpus management, plus agent memory integrations.",
    comingSoon: true,
    waitlistHref: "/waitlist/ai-agent-toolkit",
  },
];

const AgentKnowledgeLandingPage = () => {
  useSeo({
    title: "Fil One · Turn Object Storage Into an Agent Knowledge Layer",
    description:
      "S3-compatible storage purpose-built for AI agents: agent memory, RAG corpus, model artifacts, and inference I/O. $4.99/TB flat, no per-request fees.",
    canonical: "https://www.fil.one/lp/agent-knowledge-layer",
  });

  const { ref: problemRef,  inView: problemInView  } = useInView({ threshold: 0.05 });
  const { ref: proofRef,    inView: proofInView    } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,      inView: ctaInView      } = useInView({ threshold: 0.05 });

  const AGENT_CODE = `import boto3, os

s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
    region_name="eu-west-1",
)

# Agent memory — persist across restarts
s3.put_object(
    Bucket="agent-store",
    Key=f"memory/{agent_id}/session-{session_id}.json",
    Body=json.dumps(memory_state),
)

# RAG corpus — store chunked documents
s3.put_object(
    Bucket="agent-store",
    Key=f"corpus/{namespace}/doc-{doc_id}.txt",
    Body=chunk_text.encode(),
)

# Retrieve for augmentation — $0 egress
obj = s3.get_object(
    Bucket="agent-store",
    Key=f"corpus/{namespace}/doc-{doc_id}.txt",
)

# Inference outputs — archive completions for eval
s3.put_object(
    Bucket="agent-store",
    Key=f"traces/{run_id}/{step}.json",
    Body=json.dumps(trace),
)`;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative isolate pt-[58px] md:pt-[94px]" style={{ backgroundColor: "#FFFFFF" }}>
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)" }} />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`, backgroundSize: "60px 60px", backgroundPosition: "center top", maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)" }} />
          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            <div className="hero-fade-1 flex items-center gap-2.5" style={{ backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", borderRadius: 9999, padding: "5px 14px 5px 6px", maxWidth: "90vw" }}>
              <span className="badge-pulse" style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.06em", color: "#FFFFFF", textTransform: "uppercase", backgroundColor: "#0090FF", borderRadius: 9999, padding: "3px 8px", lineHeight: 1.4 }}>
                Coming soon
              </span>
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC", whiteSpace: "nowrap" }}>
                RAG Pipeline &amp; Agent Toolkit
              </span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 820, margin: 0 }}>
              Turn object storage into<br /><span style={{ color: "#0090FF" }}>an agent knowledge layer.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 480, margin: 0 }}>
              S3 object storage with a built-in RAG pipeline. No stitching required, no per-query fees.
            </p>
            <div className="flex flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start storing for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p className="hero-fade-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", textAlign: "center" }}>No credit card required · No per-request fees · Connects in minutes</p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={problemRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[720px] mx-auto">
              <SectionLabel>The cost structure problem</SectionLabel>
              <SectionHeading>You don't just pay to store your data.<br />You pay for every step that makes it usable.</SectionHeading>
              <SectionSub maxWidth={620}>
                Building a knowledge base on standard object storage providers means stitching together multiple services, each billed separately. Then your agents start running, and every query, memory read, and retrieval call adds to the tab. The stack is expensive to build and even more expensive to run.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "The architecture cost", catch: null,  highlight: false, body: "A typical RAG-enabled agent requires several services duct-taped together. A vector database, a retrieval layer, a compute service, and an object store, each with its own integration, its own failure point, and its own bill. You're paying for complexity before your agents run a single query." },
                { label: "The usage cost",        catch: null,  highlight: false, body: "A single agent task triggers dozens of retrieval calls: context lookups, memory reads, state writes. Multiply that across thousands of tasks per hour and the meter runs constantly. Every action your agents take is a billable event." },
                { label: "A different model",     catch: "Fil One collapses the stack and the bill", highlight: true, body: "One platform for agent memory, RAG corpus, and retrieval. No glue code required. You pay for storage, not for what your agents do with it." },
              ].map(({ label, body, catch: c, highlight }) => (
                <div key={label} className="flex flex-col rounded-2xl overflow-hidden" style={{
                  border: highlight ? "1px solid rgba(0,144,255,0.25)" : "1px solid rgba(0,0,0,0.07)",
                  backgroundColor: highlight ? "#EFF8FF" : "#FFFFFF",
                  boxShadow: highlight ? "0px 1px 3px rgba(0,144,255,0.08), 0px 4px 16px rgba(0,144,255,0.10)" : "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                }}>
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    {c ? (
                      <>
                        <span style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0070CC", backgroundColor: "rgba(0,144,255,0.1)", border: "1px solid rgba(0,144,255,0.2)", borderRadius: 9999, padding: "3px 10px", marginBottom: 2, alignSelf: "flex-start" }}>{label}</span>
                        <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.3", letterSpacing: "-0.01em", color: "#09090B" }}>{c}</p>
                      </>
                    ) : (
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.3", letterSpacing: "-0.01em", color: "#09090B" }}>{label}</p>
                    )}
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.65, color: highlight ? "#1e3a5f" : "#71717A", marginTop: 4 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof — code block */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={proofRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${proofInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>One bucket</SectionLabel>
              <SectionHeading>Memory. Corpus. Traces. <span style={{ color: "#0090FF" }}>One endpoint.</span></SectionHeading>
              <SectionSub maxWidth={620}>
                Standard S3 PutObject and GetObject cover every agent storage pattern. No new SDK, no per-query pricing. Flat storage for the full knowledge layer.
              </SectionSub>
            </div>
            <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#0F172A" }}>
              <div style={{ padding: "10px 16px", backgroundColor: "#1E293B", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#94A3B8" }}>agent_storage.py</div>
              <pre style={{ margin: 0, padding: "20px 18px", fontFamily: "'DM Mono', monospace", fontSize: 12.5, lineHeight: 1.65, color: "#E2E8F0", overflowX: "auto" }}>{AGENT_CODE}</pre>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>What's live and what's coming</SectionLabel>
              <SectionHeading>Storage that works <span style={{ color: "#0090FF" }}>the way agents do.</span></SectionHeading>
              <SectionSub maxWidth={560}>S3-compatible storage built for agents is live today. Be the first to try native RAG pipeline and AI agents integrations.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc, comingSoon, waitlistHref }) => (
                <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04)", textAlign: "left" }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}><Icon size={18} color="#0090FF" /></div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B", margin: 0 }}>{title}</p>
                    {comingSoon && <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#52525B", backgroundColor: "#E4E4E7", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 9999, padding: "2px 8px" }}>Coming soon</span>}
                  </div>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A" }}>
                    {desc}
                  </p>
                  {comingSoon && waitlistHref && (
                    <a href={waitlistHref} className="flex items-center gap-1" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#0090FF", textDecoration: "none", alignSelf: "flex-start", marginTop: "auto" }}>
                      Join the waitlist
                      <ArrowRight size={14} weight="bold" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }} className="px-6 md:px-12 py-16 md:py-[104px]">
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>One rate. $4.99/TB/month.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", maxWidth: 560, marginLeft: "auto", marginRight: "auto", marginBottom: 32 }}>Storage only — no PUT fees, no GET fees, no egress. Try it free with 1 TB: one place to store your data, retrieve it, and put it to work.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Start for free</span></a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">Talk to an expert</a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>No credit card required · No per-request fees · Connects in minutes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AgentKnowledgeLandingPage;
