import { Database, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { S3_ENDPOINT } from "@/lib/s3-endpoint";


// Storage cost comparison for ML training data.
// AWS EFS (gp bursting): $0.30/GB = $307.20/TB
// AWS S3 Standard: $0.023/GB = $23.55/TB + $0.09/GB egress per training run
// Fil One: $4.99/TB, $0 egress
// 10 TB training data, 20 training runs/month reading the full set:
//   EFS:  10 TB stored = $3,072/mo  (no egress charge but very expensive storage)
//   S3:   10 TB stored = $235.52 + 20 runs × 10 TB × $0.09/GB egress
//         = $235.52 + 20 × 10,240 × $0.09 = $235.52 + $18,432 = $18,668/mo
//   Fil One: 10 TB × $4.99 = $49.90, egress $0
const COST_ROWS = [
  { storage: "AWS EFS (gp)",         perTb: "$307/TB",   egress: "N/A",        monthly10tb: "$3,072",  isFilOne: false },
  { storage: "AWS S3 + 20 runs",     perTb: "$23.55/TB", egress: "$0.09/GB",   monthly10tb: "$18,668", isFilOne: false },
  { storage: "Fil One",              perTb: PRICE_PER_TB_SHORT,  egress: "$0",         monthly10tb: "$50",     isFilOne: true  },
];

const FEATURES = [
  { icon: ChartLine, title: "62× cheaper than EFS", desc: `AWS EFS costs $0.30/GB ($307/TB). Fil One costs ${PRICE_PER_TB_SHORT}. At 10 TB of training data, that is $3,072/month vs $50 — before a single training run reads a byte.` },
  { icon: ArrowsOut, title: "No egress on training reads", desc: "Each training run reads the full dataset. On AWS S3, 20 runs a month over 10 TB costs $18,432 in egress alone. On Fil One, every read is included in flat storage." },
  { icon: Plug,      title: "fsspec / PyArrow / HuggingFace native", desc: "PyTorch DataLoader, JAX, HuggingFace datasets, and PyArrow all support S3-compatible storage via fsspec. Change the endpoint — nothing else changes." },
  { icon: Database,  title: "Flat cost at any run frequency", desc: `Run training 5 times or 500 times. The storage bill is the TB you keep times ${PRICE_DISPLAY}. Run frequency is an engineering decision, not a cost one.` },
];

const MlTrainingLandingPage = () => {
  useSeo({
    title: "Fil One · Build around the clock",
    description:
      `S3-compatible training-data storage at ${PRICE_PER_TB_SHORT} flat. No egress on dataset reads. 62× cheaper than AWS EFS. fsspec, PyArrow, and HuggingFace datasets work natively.`,
    canonical: "https://www.fil.one/lp/ml-training",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: proofRef,   inView: proofInView   } = useInView({ threshold: 0.05 });
  const { ref: featuresRef,inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,     inView: ctaInView     } = useInView({ threshold: 0.05 });

  const FSSPEC_CODE = `import fsspec, os
import pyarrow.dataset as ds
from torch.utils.data import DataLoader

# Training data on Fil One — ${PRICE_PER_TB_SHORT}, $0 egress per run
fs = fsspec.filesystem(
    "s3",
    endpoint_url="${S3_ENDPOINT}",
    key=os.environ["FIL_ACCESS_KEY"],
    secret=os.environ["FIL_SECRET_KEY"],
)

# PyArrow reads Parquet shards directly — same API as S3
dataset = ds.dataset(
    "s3://training-data/imagenet/shards/",
    filesystem=fs,
    format="parquet",
)

# HuggingFace datasets — same endpoint
from datasets import load_dataset
ds_hf = load_dataset(
    "parquet",
    data_files="s3://training-data/instruct/train.parquet",
    storage_options={
        "endpoint_url": "${S3_ENDPOINT}",
        "key": os.environ["FIL_ACCESS_KEY"],
        "secret": os.environ["FIL_SECRET_KEY"],
    },
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
            <div className="hero-fade-1 flex items-center gap-1.5 text-center" style={{ backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", borderRadius: 14, padding: "10px 14px", maxWidth: "90vw" }}>
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For ML infrastructure leads and training teams</span>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 720, margin: 0 }}>
              Build around<br /><span style={{ color: "#0090FF" }}>the clock.</span>
            </h1>
            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 580, margin: 0 }}>
              Training-data storage at {PRICE_PER_TB_SHORT} flat. No egress on dataset reads. fsspec, PyArrow, and HuggingFace datasets work natively — change the endpoint, keep the code.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p className="hero-fade-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", textAlign: "center" }}>No credit card required · No egress fees · Connects in minutes</p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={problemRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[640px] mx-auto">
              <SectionLabel>The tradeoff</SectionLabel>
              <SectionHeading>Fast storage or affordable storage. Training teams have been told to pick one.</SectionHeading>
              <SectionSub maxWidth={620}>
                In-cluster storage (EFS, NFS, proprietary object stores) is fast but expensive. Standard cloud object storage is cheap but slow from the compute side — and charges egress every time a run reads the dataset. Fil One is both flat and S3-compatible.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "The EFS tax",         catch: "$307/TB for in-cluster storage.",                   body: "AWS EFS costs $0.30/GB — $307/TB — because it is optimised for latency, not cost. A 10 TB training corpus costs $3,072/month. Teams pay that to avoid the alternative: slow, metered S3." },
                { label: "The egress trap",      catch: "Every training run reads the full dataset.",        body: "Using standard S3 instead of EFS saves on storage but adds $0.09/GB egress per read. 20 training runs over a 10 TB dataset costs $18,432 in egress alone that month. The compute bill is not the whole story." },
                { label: "The iteration limit",  catch: "Storage cost constrains how often you can train.",  body: "When each run carries an egress cost, teams gate training iterations. Ablations get skipped. Re-runs get deferred. The research output is shaped by the infrastructure bill." },
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

        {/* Proof */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={proofRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${proofInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>The numbers</SectionLabel>
              <SectionHeading>10 TB training data. <span style={{ color: "#0090FF" }}>20 training runs per month.</span></SectionHeading>
              <SectionSub maxWidth={620}>Same dataset, three storage options. Monthly cost for storage plus the egress cost of reading the full set 20 times.</SectionSub>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code block */}
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#0F172A" }}>
                <div style={{ padding: "10px 16px", backgroundColor: "#1E293B", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#94A3B8" }}>training_data.py</div>
                <pre style={{ margin: 0, padding: "20px 18px", fontFamily: "'DM Mono', monospace", fontSize: 12.5, lineHeight: 1.65, color: "#E2E8F0", overflowX: "auto" }}>{FSSPEC_CODE}</pre>
              </div>

              {/* Cost table */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <SectionLabel>Monthly cost, 10 TB + 20 full-dataset reads</SectionLabel>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Funnel Sans', sans-serif" }}>
                    <thead>
                      <tr>
                        {["Storage", "Rate", "Egress", "Total/mo"].map(h => (
                          <th key={h} style={{ textAlign: "left", padding: "9px 12px", fontSize: 10.5, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#71717A", borderBottom: "1px solid rgba(0,0,0,0.07)", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COST_ROWS.map(r => (
                        <tr key={r.storage} style={{ backgroundColor: r.isFilOne ? "#EFF8FF" : "transparent" }}>
                          <td style={{ padding: "12px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: r.isFilOne ? 700 : 500, color: r.isFilOne ? "#0070CC" : "#09090B" }}>{r.storage}{r.isFilOne && <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 500, color: "#0070CC", backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", borderRadius: 9999, padding: "2px 7px" }}>You</span>}</td>
                          <td style={{ padding: "12px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13, color: "#52525B" }}>{r.perTb}</td>
                          <td style={{ padding: "12px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13, color: r.egress === "$0" ? "#16a34a" : "#dc2626", fontWeight: r.egress === "$0" ? 600 : 400 }}>{r.egress}</td>
                          <td style={{ padding: "12px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: r.isFilOne ? 16 : 13.5, fontWeight: r.isFilOne ? 700 : 500, color: r.isFilOne ? "#0070CC" : "#dc2626" }}>{r.monthly10tb}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#71717A", margin: 0 }}>
                  AWS EFS gp bursting us-east-1: $0.30/GB. AWS S3 Standard: $0.023/GB storage + $0.09/GB egress per read. Computed: EFS 10,240 GB × $0.30 = $3,072; S3 storage $235.52 + 20 runs × 10,240 GB × $0.09 = $18,432 egress. Fil One: 10 TB × $4.99 = $49.90, egress $0. Q2 2026 public rate cards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Why it works</SectionLabel>
              <SectionHeading>Training cost that scales with <span style={{ color: "#0090FF" }}>dataset size, not run count.</span></SectionHeading>
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
              <SectionSub maxWidth={520}>Storage. That is the whole bill. Run training 5 times or 500 times — the storage invoice does not change.</SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A" }}>No credit card required · No egress fees · Connects in minutes</p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }} className="px-6 md:px-12 py-16 md:py-[104px]">
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Run as many times as the model needs.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB evaluation. Point fsspec or PyArrow at the endpoint and run the training loop — the egress line will not be there.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Start for free</span></a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">Talk to an expert</a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>No credit card required · No egress fees · Connects in minutes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MlTrainingLandingPage;
