import { Database, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";

// Per-call cost comparison for agent workload:
// 1 billion operations/month (mix of PUT state writes + GET context reads).
// AWS S3: PUTs $0.005/1K + GETs $0.0004/1K — for simplicity using PUT rate throughout:
//   1,000,000,000 / 1,000 × $0.005 = $5,000 in request fees alone.
//   Plus egress if agent reads context cross-region: significant additional cost.
// Managed AI storage (per-query pricing): $0.001–$0.01 per call typically.
//   At $0.002/call × 1B calls = $2,000,000 (extreme example, but illustrative).
// Fil One: $0 per request, $0 egress. Cost = only bytes stored.
const PUT_ROWS = [
  { name: "AWS S3 Standard",        rate: "$0.005 / 1K PUTs",    monthly: "$5,000",  win: false, you: false },
  { name: "Google Cloud Storage",   rate: "$0.05 / 10K ops",     monthly: "$5,000",  win: false, you: false },
  { name: "Azure Blob Storage",     rate: "$0.055 / 10K writes", monthly: "$5,500",  win: false, you: false },
  { name: "Wasabi",                 rate: "$0 per request",       monthly: "$0",      win: true,  you: false },
  { name: "Backblaze B2",           rate: "$0 per request",       monthly: "$0",      win: true,  you: false },
  { name: "Fil One",                rate: "$0 per request",       monthly: "$0",      win: true,  you: true  },
];

const FEATURES = [
  {
    icon: Database,
    title: "No per-request fees",
    desc: "PUT, GET, LIST, HEAD — all included in flat storage. Agents that write state every turn and read context on every call pay $0 in request fees.",
  },
  {
    icon: ArrowsOut,
    title: "No egress on context reads",
    desc: "Retrieving memory, loading corpus chunks, and reading prior outputs cost $0 in egress. Agent loops that read frequently pay only for what they store.",
  },
  {
    icon: Plug,
    title: "S3-compatible · existing tools work",
    desc: "boto3, @aws-sdk/client-s3, LangChain S3 loaders, LlamaIndex — any tool that reads or writes S3 connects with an endpoint change. No new SDK.",
  },
  {
    icon: ChartLine,
    title: "Cost that scales with data, not calls",
    desc: `${PRICE_PER_TB_SHORT} flat. An agent that makes 10 million calls a day but stores 1 TB pays ${PRICE_DISPLAY}/month. Call frequency is not a billing input.`,
  },
];

const AgentLoopsLandingPage = () => {
  useSeo({
    title: "Fil One · Let agents run. Not your bill.",
    description:
      `S3-compatible storage at ${PRICE_PER_TB_SHORT} flat. No per-PUT fees, no per-GET fees, no egress. Agent loops run at full speed without a per-call counter.`,
    canonical: "https://www.fil.one/lp/agent-loops",
  });

  const { ref: problemRef,  inView: problemInView  } = useInView({ threshold: 0.05 });
  const { ref: proofRef,    inView: proofInView    } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,      inView: ctaInView      } = useInView({ threshold: 0.05 });

  const AGENT_CODE = `import boto3, os

# Flat-rate storage — no per-call counter
s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
    region_name="eu-west-1",
)

# Write state on every agent step — $0 per PUT
s3.put_object(
    Bucket="agent-state",
    Key=f"agents/{agent_id}/step-{step}.json",
    Body=json.dumps(state),
)

# Read context on every turn — $0 egress
ctx = s3.get_object(
    Bucket="agent-state",
    Key=f"memory/{agent_id}/context.json",
)["Body"].read()

# High-frequency tool output — still $0 per call
s3.put_object(
    Bucket="agent-state",
    Key=f"outputs/{run_id}/{tool}/{ts}.json",
    Body=json.dumps(tool_output),
)
# 10 million calls today: $0 in request fees`;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative isolate pt-[58px] md:pt-[94px]" style={{ backgroundColor: "#FFFFFF" }}>
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)" }} />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`, backgroundSize: "60px 60px", backgroundPosition: "center top", maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)" }} />
          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            <div className="hero-fade-1 flex items-center gap-1.5 text-center" style={{ backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", borderRadius: 14, padding: "10px 14px", maxWidth: "90vw" }}>
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For developers building AI agents and autonomous pipelines</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 720, margin: 0 }}>
              Let agents run.<br /><span style={{ color: "#0090FF" }}>Not your bill.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 580, margin: 0 }}>
              S3-compatible storage at {PRICE_PER_TB_SHORT} flat. No per-PUT fees, no per-GET fees, no egress. Agent loops run at full speed without a per-call counter.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p className="hero-fade-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", textAlign: "center" }}>No credit card required · No per-request fees · Connects in minutes</p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={problemRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>The billing problem</SectionLabel>
              <SectionHeading>Agents are high-frequency workloads. Per-call pricing taxes that frequency.</SectionHeading>
              <SectionSub>
                Every agent step writes state. Every context-aware turn reads memory. Every tool call produces output. Storage that charges per operation makes agents expensive to run, and the cost scales with capability, not with data volume.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "The write counter",
                  catch: "Every state write is a metered event on S3.",
                  body: "AWS S3 charges $0.005 per 1,000 PUTs. An agent writing state on every step, across hundreds of concurrent runs, generates millions of PUTs per day. At scale, the request bill exceeds the storage bill.",
                },
                {
                  label: "The retrieval tax",
                  catch: "Reading context and memory charges egress.",
                  body: "Agents that retrieve context, load memory, or read prior outputs pay $0.09/GB in egress on every read from AWS. The more context-aware the agent, the more it reads, and the more the bill grows.",
                },
                {
                  label: "The framework lock",
                  catch: "Purpose-built AI storage charges per query.",
                  body: "Managed vector databases and agent memory platforms charge per API call. Teams building high-frequency agents find that per-query pricing makes the storage layer the dominant cost, not the LLM.",
                },
              ].map(({ label, body, catch: c }) => (
                <div key={label} className="flex flex-col rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}>
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#52525B", backgroundColor: "#F4F4F5", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 9999, padding: "3px 10px", marginBottom: 2, alignSelf: "flex-start" }}>{label}</span>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.3", letterSpacing: "-0.01em", color: "#09090B" }}>{c}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.65, color: "#71717A", marginTop: 4 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof — code block + per-call comparison */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={proofRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${proofInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>The proof</SectionLabel>
              <SectionHeading>
                Same boto3. <span style={{ color: "#0090FF" }}>Zero per-call counter.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Any S3-compatible tool your agent already uses connects with an endpoint change. Writes, reads, and lists are all included in flat storage.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code block */}
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#0F172A" }}>
                <div style={{ padding: "10px 16px", backgroundColor: "#1E293B", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#94A3B8" }}>
                  agent_storage.py
                </div>
                <pre style={{ margin: 0, padding: "20px 18px", fontFamily: "'DM Mono', monospace", fontSize: 12.5, lineHeight: 1.65, color: "#E2E8F0", overflowX: "auto" }}>
                  {AGENT_CODE}
                </pre>
              </div>

              {/* Per-call comparison */}
              <div style={{ border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, backgroundColor: "#F9FAFB", padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
                <SectionLabel>Request fees only — 1 billion ops/month</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {PUT_ROWS.map(r => (
                    <div key={r.name} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, padding: "10px 14px", backgroundColor: r.you ? "#EFF8FF" : "#FFFFFF", border: `1px solid ${r.you ? "rgba(0,144,255,0.2)" : "rgba(0,0,0,0.07)"}`, borderRadius: 10 }}>
                      <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: r.you ? 700 : 500, fontSize: 13.5, color: r.you ? "#0070CC" : "#09090B" }}>{r.name}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11.5, color: "#71717A", flex: 1, textAlign: "center" }}>{r.rate}</span>
                      <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 700, fontSize: 14, color: r.win ? "#16a34a" : "#dc2626", whiteSpace: "nowrap" }}>{r.monthly}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#71717A", margin: 0 }}>
                  Public US rate cards, Q2 2026. Request fees only — storage and egress are separate on metered tiers and zero on Fil One. AWS: 1,000,000,000 / 1,000 × $0.005 = $5,000. Google: $0.05/10K × 1B = $5,000. Azure: $0.055/10K × 1B = $5,500.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Built for high-frequency workloads</SectionLabel>
              <SectionHeading>
                Storage cost that scales with <span style={{ color: "#0090FF" }}>data, not with calls.</span>
              </SectionHeading>
              <SectionSub maxWidth={560}>The only change is the endpoint. Call frequency stops being a billing variable.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl border" style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04)", textAlign: "left" }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}><Icon size={18} color="#0090FF" /></div>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>{title}</p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A" }}>{desc}</p>
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
              <SectionHeading>One rate. <span style={{ color: "#0090FF" }}>{PRICE_PER_TB_MONTH}.</span></SectionHeading>
              <SectionSub maxWidth={520}>Storage. That is the whole bill. Run agents at any frequency — the invoice is determined by bytes stored, not calls made.</SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A" }}>No credit card required · No per-request fees · Connects in minutes</p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }} className="px-6 md:px-12 py-16 md:py-[104px]">
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Let agents run. Not your bill.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB evaluation. Connect your existing agent storage code and watch the request counter disappear.</p>
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

export default AgentLoopsLandingPage;
