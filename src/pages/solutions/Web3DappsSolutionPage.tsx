import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import FaqSection from "@/components/FaqSection";
import {
  LinkSimple,
  ShieldCheck,
  Globe,
  CurrencyDollar,
  Code,
  Lock,
  CheckCircle,
} from "@phosphor-icons/react";

const FEATURES = [
  {
    icon: LinkSimple,
    title: "On-chain verifiable storage",
    body: "Every object gets a cryptographic proof anchored to Filecoin. Smart contracts can verify asset authenticity without trusting a centralized server.",
  },
  {
    icon: ShieldCheck,
    title: "NFT metadata & asset hosting",
    body: "Store and serve NFT metadata, images, and media at scale. No IPFS pinning complexity, no gateway timeouts — just a reliable S3-compatible endpoint.",
  },
  {
    icon: Globe,
    title: "Decentralized by default",
    body: "Data is distributed across independent Filecoin storage providers globally. No single point of failure, no vendor lock-in.",
  },
  {
    icon: CurrencyDollar,
    title: "Predictable, low-cost pricing",
    body: "Flat $4.99/TB/month. No per-request fees that explode with NFT traffic spikes. No egress charges when your dApp serves data to users.",
  },
  {
    icon: Code,
    title: "S3 API — works with your stack",
    body: "Use any S3-compatible SDK, including ethers.js workflows that write metadata post-mint. No proprietary API to learn.",
  },
  {
    icon: Lock,
    title: "Immutable object locking",
    body: "Lock NFT assets and metadata so they can never be altered or deleted — meeting collector expectations and marketplace requirements.",
  },
];

const USECASES = [
  {
    title: "NFT collections",
    body: "Host artwork, metadata JSON, and provenance records. Objects are content-addressed and immutable.",
  },
  {
    title: "dApp backends",
    body: "Replace centralized S3 buckets backing your dApp with verifiable, decentralized storage. One endpoint change, zero re-architecture.",
  },
  {
    title: "Token-gated content",
    body: "Store gated media behind presigned URLs. Only wallets holding the token can generate a valid access link — enforced at the application layer.",
  },
  {
    title: "On-chain game assets",
    body: "Game items, skins, and save states stored with verifiable provenance. Players can prove ownership and authenticity independently of your servers.",
  },
];

const Web3DappsSolutionPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: featRef, inView: featInView } = useInView({ threshold: 0.1 });
  const { ref: ucRef, inView: ucInView } = useInView({ threshold: 0.1 });

  useSeo({
    title: "Web3 & dApp Storage — Fil One",
    description:
      "Verifiable, decentralized object storage for NFTs, dApps, and on-chain assets. S3-compatible, no egress fees, cryptographic proof on every object.",
    canonical: "https://fil.one/solutions/web3-dapps",
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
            className={`flex flex-col items-center gap-6 pt-20 md:pt-[120px] pb-24 md:pb-32 px-5 md:px-8 max-w-[1120px] mx-auto w-full reveal${heroInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col items-center gap-6 w-full">
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
                  Solutions · Web3 & dApps
                </span>
              </div>

              <h1
                className="text-[28px] sm:text-[34px] md:text-[44px]"
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  lineHeight: "1.12",
                  letterSpacing: "-0.02em",
                  color: "#09090B",
                  textAlign: "center",
                  maxWidth: 600,
                  margin: 0,
                }}
              >
                Storage your smart contracts can trust
              </h1>

              <p
                className="text-[15px] md:text-[16.5px]"
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  lineHeight: "1.65",
                  color: "#71717A",
                  textAlign: "center",
                  maxWidth: 480,
                  margin: 0,
                }}
              >
                Cryptographic proof on every object. No centralized chokepoints, no IPFS pinning headaches — just verifiable, durable storage for NFTs and dApps.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                  <span className="btn-primary-inner">Start for free</span>
                </a>
                <a href="/contact-sales" className="btn-secondary">
                  Talk to sales
                </a>
              </div>

              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  color: "#71717A",
                  textAlign: "center",
                }}
              >
                1 TB free for 30 days · No credit card required · No egress fees
              </p>
            </div>
          </div>
        </div>

        {/* Proof bar */}
        <div
          className="border-y px-5 md:px-8 py-5"
          style={{ borderColor: "rgba(0,0,0,0.06)", backgroundColor: "#FAFAFA" }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "On-chain verifiable proofs",
              "Immutable object locking",
              "S3-compatible API",
              "Filecoin-backed durability",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle size={14} weight="fill" style={{ color: "#0090FF", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#52525B" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-[1120px] mx-auto">
            <div ref={featRef} className={`reveal${featInView ? " in-view" : ""}`}>
              <div className="flex flex-col items-center gap-4 mb-14 md:mb-16 text-center">
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
                  Built for Web3
                </span>
                <h2
                  className="text-[24px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2",
                    color: "#09090B",
                    maxWidth: 620,
                    margin: 0,
                  }}
                >
                  Off-chain storage with on-chain integrity
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FEATURES.map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="flex flex-col gap-5 p-8 rounded-2xl border"
                    style={{
                      borderColor: "rgba(0,0,0,0.07)",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                      style={{ backgroundColor: "#EFF8FF" }}
                    >
                      <Icon size={18} color="#0090FF" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>
                        {title}
                      </p>
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13.5, lineHeight: "1.6", color: "#71717A" }}>
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#F4F4F5" }}>
          <div className="max-w-[1120px] mx-auto">
            <div ref={ucRef} className={`reveal${ucInView ? " in-view" : ""}`}>
              <div className="flex flex-col items-center gap-4 mb-14 text-center">
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
                  Use cases
                </span>
                <h2
                  className="text-[24px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2",
                    color: "#09090B",
                    margin: 0,
                  }}
                >
                  What teams are building
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {USECASES.map(({ title, body }) => (
                  <div
                    key={title}
                    className="rounded-2xl p-7 border"
                    style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF" }}
                  >
                    <h3 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 16, color: "#09090B", margin: "0 0 8px" }}>
                      {title}
                    </h3>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 14, lineHeight: "1.6", color: "#71717A", margin: 0 }}>
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection include={[
          "How does data integrity verification work with Fil One?",
          "What is Filecoin?",
          "Is Fil One compatible with my existing tools?",
          "How does Fil One approach security and compliance?",
        ]} />

        {/* CTA */}
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
                  Decentralized storage, centralized simplicity
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>
                  Start with 1 TB free. No credit card, no egress fees, no surprises.
                </p>
                <div className="flex items-center justify-center">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Start for free</span>
                  </a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>
                  S3-compatible · Verifiable integrity · $4.99/TB/month after trial
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

export default Web3DappsSolutionPage;
