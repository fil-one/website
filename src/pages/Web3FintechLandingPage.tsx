import { ShieldCheck, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';
import { PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";


const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Cryptographic integrity per object",
    desc: "Every stored object receives a CID and is verified against it via Filecoin Proof of Spacetime approximately every 24 hours. Data cannot silently corrupt or disappear without on-chain detection.",
  },
  {
    icon: ArrowsOut,
    title: "No single-provider lock-in",
    desc: "Data is distributed across an independent network of Filecoin storage providers — not a single data centre or cloud region. No AWS failure mode reaches the storage layer.",
  },
  {
    icon: Plug,
    title: "S3-compatible · no SDK changes",
    desc: "Your existing boto3, aws-sdk, or S3-compatible tooling connects with an endpoint change. Exchange backends, wallet data pipelines, and DeFi indexers work without modification.",
  },
  {
    icon: ChartLine,
    title: "Flat, predictable cost",
    desc: `${PRICE_PER_TB_SHORT} flat. No egress fees on reads, no per-request charges. High-volume on-chain event indexing and custody audit logs don't generate surprise invoices.`,
  },
];

const Web3FintechLandingPage = () => {
  useSeo({
    title: "Fil One · Decentralized storage for Web3 fintech",
    description:
      "S3-compatible object storage built on Filecoin. Cryptographic integrity verification per object. For exchanges, DeFi protocols, custody providers, and crypto wallets.",
    canonical: "https://www.fil.one/lp/web3-fintech",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: proofRef, inView: proofInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  const CUSTODY_CODE = `import boto3, os

# Drop-in replacement for AWS S3 —
# backed by Filecoin, not a hyperscaler data centre
s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
    region_name="eu-west-1",
)

# Store custody audit logs — CID issued on write,
# verified via Proof of Spacetime every ~24 h
s3.put_object(
    Bucket="custody-audit",
    Key=f"logs/{wallet_address}/{block_height}.json",
    Body=audit_record,
    ContentType="application/json",
)

# Read back for compliance — $0 egress
obj = s3.get_object(
    Bucket="custody-audit",
    Key=f"logs/{wallet_address}/{block_height}.json",
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
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>For exchanges, DeFi protocols, custody providers, and crypto wallets</span>
            </div>

            <h1 className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 820, margin: 0 }}>
              You're not Web3 if when AWS goes down,<br />
              <span style={{ color: "#0090FF" }}>your app does too.</span>
            </h1>

            <p className="text-[15px] md:text-[17px] hero-fade-2" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 600, margin: 0 }}>
              S3-compatible object storage built on Filecoin. Cryptographic integrity verification per object. No single-provider lock-in. Walk the walk.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href={signupUrl()} className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
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
              <SectionLabel>The contradiction</SectionLabel>
              <SectionHeading>Decentralized products built on centralized infrastructure are a liability.</SectionHeading>
              <SectionSub maxWidth={620}>
                Exchanges, custody providers, and DeFi protocols store user assets, audit logs, and transaction history on AWS S3. When AWS has an incident, so does the protocol. That is not a Web3 architecture.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "The single-point failure",
                  catch: "AWS us-east-1 going down takes your protocol with it.",
                  body: "If your exchange order book, custody audit trail, or DeFi state is stored in a single cloud region, you have a single point of failure. Your smart contracts are decentralized. Your data layer is not.",
                },
                {
                  label: "The trust mismatch",
                  catch: "Your users are trusting a chain. Your data trusts a corporation.",
                  body: "Blockchain-native users hold self-custody wallets and verify everything on-chain. Their trust in your protocol assumes the same verifiability applies to the underlying data store. A proprietary cloud does not provide that.",
                },
                {
                  label: "The audit gap",
                  catch: "Regulated crypto needs verifiable data, not just cloud SLAs.",
                  body: "Exchanges and custody providers operating under MiCA, BitLicense, or similar frameworks need data provenance that an AWS SLA does not provide. Cryptographic per-object verification is the audit trail regulators are starting to ask for.",
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

        {/* Proof — code block + integrity callout */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={proofRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${proofInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>How it works</SectionLabel>
              <SectionHeading>
                Same S3 API. <span style={{ color: "#0090FF" }}>Filecoin underneath.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Your existing exchange backend, custody pipeline, or DeFi indexer connects with an endpoint change. Every object written gets a CID and is verified via Proof of Spacetime — continuously, on-chain.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code block */}
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#0F172A" }}>
                <div style={{ padding: "10px 16px", backgroundColor: "#1E293B", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#94A3B8" }}>
                  custody_audit.py
                </div>
                <pre style={{ margin: 0, padding: "20px 18px", fontFamily: "'DM Mono', monospace", fontSize: 12.5, lineHeight: 1.65, color: "#E2E8F0", overflowX: "auto" }}>
                  {CUSTODY_CODE}
                </pre>
              </div>

              {/* Integrity callout */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { heading: "CID per object", sub: "Every stored object receives a content identifier (CID). The CID is a cryptographic fingerprint of the data — change a single byte and the CID no longer matches." },
                  { heading: "Proof of Spacetime verification", sub: "Filecoin's Proof of Spacetime confirms storage providers are continuously holding the data as committed. This runs approximately every 24 hours, automatically." },
                  { heading: "No single-provider dependency", sub: "Data is distributed across an independent network of Filecoin storage providers. There is no AWS region, no single data centre, and no hyperscaler failure mode to inherit." },
                  { heading: "11 nines durability", sub: "Designed for 11 nines. Loss is a detectable event — not a silent failure — because the proof system requires it." },
                ].map(({ heading, sub }) => (
                  <div key={heading} style={{ border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14, backgroundColor: "#F9FAFB", padding: "18px 20px" }}>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 15, color: "#09090B", marginBottom: 6, lineHeight: "1.3" }}>{heading}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A", margin: 0 }}>{sub}</p>
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
              <SectionLabel>Built for Web3 fintech</SectionLabel>
              <SectionHeading>
                Infrastructure that <span style={{ color: "#0090FF" }}>matches your values.</span>
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
              <SectionHeading>One rate. <span style={{ color: "#0090FF" }}>{PRICE_PER_TB_MONTH}.</span></SectionHeading>
              <SectionSub maxWidth={520}>Storage. That is the whole bill. No egress on compliance reads, no per-request fees on audit queries. Predictable cost for unpredictable on-chain activity.</SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href={signupUrl()} className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
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
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>Walk the walk.</h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>Free 1 TB evaluation. Connect your existing S3 client and store data on Filecoin-backed infrastructure in minutes.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href={signupUrl()} className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Start for free</span></a>
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

export default Web3FintechLandingPage;
