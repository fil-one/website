import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import FaqSection from "@/components/FaqSection";
import {
  ShieldCheck,
  Lock,
  Globe,
  ClockCounterClockwise,
  CurrencyDollar,
  CheckSquare,
  CheckCircle,
} from "@phosphor-icons/react";

const FEATURES = [
  {
    icon: Lock,
    title: "Immutable backups",
    body: "Object lock prevents ransomware from encrypting or deleting your backups. Set retention policies that no credential — not even root — can override.",
  },
  {
    icon: ShieldCheck,
    title: "Verifiable data integrity",
    body: "Every backup is sealed and verifiable. Detect corruption or tampering before you need to restore — not after.",
  },
  {
    icon: Globe,
    title: "Geo-distributed redundancy",
    body: "Data is distributed across independent storage providers globally. No single datacenter failure can compromise your recovery.",
  },
  {
    icon: ClockCounterClockwise,
    title: "Point-in-time recovery",
    body: "Versioned buckets let you restore any object to any point in time. Recover from accidental deletion or malicious modification in seconds.",
  },
  {
    icon: CurrencyDollar,
    title: "No egress on restores",
    body: "A disaster is bad enough. Don't pay per-GB egress fees every time you restore. Fil One never charges for data transfer.",
  },
  {
    icon: CheckSquare,
    title: "Compliance-ready",
    body: "Immutability, encryption at rest, and verifiable audit trails support SOC 2, HIPAA, and GDPR requirements. Certifications in progress.",
  },
];

const SCENARIOS = [
  {
    title: "Ransomware recovery",
    body: "Immutable object lock means your backups can't be encrypted or deleted by an attacker who gains access to your infrastructure. Restore clean copies with confidence.",
  },
  {
    title: "Database & VM backup",
    body: "Works with Veeam, Commvault, Nakivo, and any backup tool with S3-compatible target support. No agent to install, no proprietary lock-in.",
  },
  {
    title: "Compliance archiving",
    body: "Write-once, read-many (WORM) storage with tamper-evident audit logs. Satisfy regulatory retention requirements without expensive tape infrastructure.",
  },
  {
    title: "Disaster recovery",
    body: "Multi-region redundancy with no egress on failover. Define your RTO and RPO, test your plan quarterly, and pay nothing when you actually need it.",
  },
];

const EnterpriseBackupSolutionPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: featRef, inView: featInView } = useInView({ threshold: 0.1 });
  const { ref: scRef, inView: scInView } = useInView({ threshold: 0.1 });

  useSeo({
    title: "Enterprise Backup & Disaster Recovery — Fil One",
    description:
      "Immutable, geo-distributed backup storage with no egress fees. Ransomware resilience, cryptographic integrity, and compliance-ready for enterprise teams.",
    canonical: "https://fil.one/solutions/enterprise-backup",
    ogImage: "https://fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <div className="relative isolate pt-[94px]" style={{ backgroundColor: "#FFFFFF" }}>
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
                  Solutions · Enterprise Backup & DR
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
                  maxWidth: 500,
                  margin: 0,
                }}
              >
                Backups ransomware can't touch
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
                Immutable, geo-distributed backup storage with verifiable data integrity — and zero egress fees when disaster strikes and you need to restore.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <a href="/contact-sales" className="btn-primary">
                  <span className="btn-primary-inner">Talk to sales</span>
                </a>
                <a href="https://app.fil.one/login?screen_hint=signup" className="btn-secondary">
                  Start for free
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
              "Immutable object lock",
              "Verifiable data integrity",
              "Geo-distributed redundancy",
              "WORM compliance",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle size={14} weight="fill" style={{ color: "#0090FF", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#52525B" }}>{item}</span>
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
                  Enterprise-grade
                </span>
                <h2
                  className="text-[24px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2",
                    color: "#09090B",
                    maxWidth: 520,
                    margin: 0,
                  }}
                >
                  Resilience built into the storage layer
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

        {/* Scenarios */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#F4F4F5" }}>
          <div className="max-w-[1120px] mx-auto">
            <div ref={scRef} className={`reveal${scInView ? " in-view" : ""}`}>
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
                  Scenarios
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
                  Every recovery scenario, covered
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SCENARIOS.map(({ title, body }) => (
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
          "How does Fil One approach security and compliance?",
          "How does data integrity verification work with Fil One?",
          "Is Fil One hot, warm, or cold storage? Is it like Glacier?",
          "How do I migrate from AWS / Azure / Google Cloud?",
          "What kinds of organizations use Fil One?",
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
                    maxWidth: 560,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Your recovery plan deserves better storage
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
                  Talk to our enterprise team about custom retention policies, SLAs, and compliance requirements.
                </p>
                <div className="flex items-center justify-center">
                  <a href="/contact-sales" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Talk to sales</span>
                  </a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>
                  S3-compatible · Immutable object lock · $4.99/TB/month
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

export default EnterpriseBackupSolutionPage;
