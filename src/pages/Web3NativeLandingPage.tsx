import { ShieldCheck, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


const FEATURES = [
  {
    icon: Plug,
    title: "S3-compatible · existing tools work",
    desc: "boto3, aws-sdk, rclone, DuckDB, PyArrow fsspec — any tool that reads or writes S3 connects with an endpoint change. No new SDK, no wrapper library.",
  },
  {
    icon: ShieldCheck,
    title: "Filecoin-backed verifiable integrity",
    desc: "Every object receives a CID and is verified via Proof of Spacetime approximately every 24 hours. The storage layer produces proof, not assertions.",
  },
  {
    icon: ArrowsOut,
    title: "No egress on data reads",
    desc: "On-chain analytics pipelines, indexers, and research workflows that read data repeatedly pay $0 in egress. Data-intensive Web3 work costs what it stores.",
  },
  {
    icon: ChartLine,
    title: "Flat cost at any scale",
    desc: "$4.99/TB regardless of volume. Petabyte-scale research datasets, blockchain analytics archives, and developer infra pay the same rate per TB.",
  },
];

const Web3NativeLandingPage = () => {
  useSeo({
    title: "Fil One · You didn't build in Web3 to end up fully dependent on Amazon",
    description:
      "S3-compatible object storage backed by Filecoin. CID per object, Proof of Spacetime verification, $4.99/TB flat. For Web3-native analytics, research, and dev infra teams.",
    canonical: "https://www.fil.one/lp/web3-native",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: proofRef, inView: proofInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  const CONNECT_CODE = `import boto3, os

# Decentralized object storage — S3-compatible
# Backed by Filecoin Proof of Spacetime
s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
    region_name="eu-west-1",
)

# Write on-chain analytics output
s3.put_object(
    Bucket="chain-data",
    Key=f"snapshots/{chain}/{block_height}.parquet",
    Body=parquet_bytes,
)

# Read back for querying — $0 egress
import pyarrow.dataset as ds
dataset = ds.dataset(
    "s3://chain-data/snapshots/ethereum/",
    filesystem=s3_filesystem,  # fsspec / PyArrow S3FileSystem
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
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For Web3-native analytics, research, and dev infrastructure teams</span>
            </div>

            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 820, margin: 0 }}>
              You didn't build in Web3<br />
              <span style={{ color: "#0090FF" }}>to end up fully dependent on Amazon.</span>
            </h1>

            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 600, margin: 0 }}>
              Decentralized object storage backed by Filecoin. S3-compatible — your existing tools connect today. $4.99/TB flat.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>

            <p className="hero-fade-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", textAlign: "center" }}>
              No credit card required · Filecoin-backed · S3-compatible
            </p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={problemRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[640px] mx-auto">
              <SectionLabel>The problem</SectionLabel>
              <SectionHeading>The decentralized storage alternatives either don't scale or don't integrate.</SectionHeading>
              <SectionSub maxWidth={620}>
                IPFS is great for content addressing. Arweave is useful for permanent storage. Neither gives you an S3-compatible API, predictable performance, or a bill you can plan around. So Web3 teams end up back on AWS.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "The integration tax",
                  catch: "Non-S3 storage breaks the data stack.",
                  body: "Your analytics pipeline uses PyArrow, DuckDB, and Spark — all of which read S3. The moment decentralized storage requires a different API, you're rewriting tooling instead of building product. Teams choose AWS S3 to avoid the rewrite.",
                },
                {
                  label: "The S3 dependency",
                  catch: "Web3 data on a Web2 storage layer.",
                  body: "On-chain analytics, chain snapshots, indexer outputs, and research datasets all live on AWS S3 because the alternatives don't integrate cleanly. The infrastructure the Web3 ecosystem runs on is, in practice, centralized.",
                },
                {
                  label: "The cost at scale",
                  catch: "Blockchain data is large and read frequently.",
                  body: "Chain snapshots are hundreds of GB. Analytics queries read the same datasets repeatedly. At $0.09/GB egress on AWS, a moderately active analytics workload generates egress bills that constrain how often teams re-query their own data.",
                },
              ].map(({ label, body, catch: catchLine }) => (
                <div key={label} className="flex flex-col rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}>
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#52525B", backgroundColor: "#F4F4F5", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 9999, padding: "3px 10px", marginBottom: 2, alignSelf: "flex-start" }}>{label}</span>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.3", letterSpacing: "-0.01em", color: "#09090B" }}>{catchLine}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.65, color: "#71717A", marginTop: 4 }}>{body}</p>
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
              <SectionLabel>The connection</SectionLabel>
              <SectionHeading>
                S3-compatible. <span style={{ color: "#0090FF" }}>Filecoin underneath.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Your existing boto3, PyArrow, DuckDB, and Spark tooling connects with an endpoint change. Data is stored on Filecoin — CID issued per object, verified via Proof of Spacetime approximately every 24 hours.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#0F172A" }}>
                <div style={{ padding: "10px 16px", backgroundColor: "#1E293B", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#94A3B8" }}>
                  chain_analytics.py
                </div>
                <pre style={{ margin: 0, padding: "20px 18px", fontFamily: "'DM Mono', monospace", fontSize: 12.5, lineHeight: 1.65, color: "#E2E8F0", overflowX: "auto" }}>
                  {CONNECT_CODE}
                </pre>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <SectionLabel>What's verifiable</SectionLabel>
                {[
                  { stat: "CID per object", detail: "Every stored object gets a content identifier — a cryptographic fingerprint. Change the data and the CID no longer matches." },
                  { stat: "Proof of Spacetime", detail: "Filecoin's PoSt proves storage providers are continuously holding data as committed. Runs approximately every 24 hours." },
                  { stat: "11 nines durability", detail: "Data is distributed across an independent network of Filecoin storage providers. No single-provider failure mode." },
                  { stat: "$0 egress on reads", detail: "Re-run analytics queries, re-index chain data, re-query research datasets. No egress bill, no read-frequency tax." },
                ].map(({ stat, detail }) => (
                  <div key={stat} style={{ border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, backgroundColor: "#F9FAFB", padding: "16px 18px" }}>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#09090B", marginBottom: 4 }}>{stat}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A", margin: 0 }}>{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>For Web3-native teams</SectionLabel>
              <SectionHeading>
                Decentralized storage that <span style={{ color: "#0090FF" }}>actually integrates.</span>
              </SectionHeading>
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
              <SectionHeading>One rate. <span style={{ color: "#0090FF" }}>$4.99/TB/month.</span></SectionHeading>
              <SectionSub maxWidth={520}>Storage. That is the whole bill. Filecoin-backed integrity verification, $0 egress, and 11 nines durability are included.</SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A" }}>No credit card required · Filecoin-backed · S3-compatible</p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }} className="px-6 md:px-12 py-16 md:py-[104px]">
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Decentralized storage that works.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB evaluation. Connect your existing S3 tools and store data on Filecoin-backed infrastructure in minutes.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Start for free</span></a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">Talk to an expert</a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>No credit card required · Filecoin-backed · S3-compatible</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Web3NativeLandingPage;
