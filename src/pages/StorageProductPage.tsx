import { useEffect } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";
import StorageUseCasesSection from "@/components/StorageUseCasesSection";
import UseCasesSection from "@/components/UseCasesSection";
import ComparisonSection from "@/components/ComparisonSection";
import StorageCalculatorSection from "@/components/StorageCalculatorSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";

const STATS = [
  {
    value: "$4.99",
    label: "Per TB / month",
    note: "Flat rate. No egress fees, no API charges, no retrieval penalties.",
  },
  {
    value: "$0",
    label: "Egress fees",
    note: "Transfer data out anytime, to anywhere. No lock-in, no exit tax.",
  },
  {
    value: "11 9s",
    label: "Durability",
    note: "Backed by an independent global network of storage providers.",
  },
];

const StorageProductPage = () => {
  const { heroEndRef } = useScrollTracking();
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.05 });

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
  }, []);

  useSeo({
    title: "Object Storage — Fil One",
    description:
      "S3-compatible object storage built for the AI era. Verifiable data integrity, no egress fees, $4.99/TB/month. The foundation every Fil One account starts with.",
    canonical: "https://fil.one/storage",
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
                  Object Storage · S3-compatible
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
                Store more. Pay less.<br />Own it completely.
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
                Fully S3-compatible object storage with no egress fees, no API request charges, and verifiable data integrity on every byte.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary" onClick={() => trackCtaClick("Start for free", "https://app.fil.one/login?screen_hint=signup", "primary")}>
                  <span className="btn-primary-inner">Start for free</span>
                </a>
                <a href="https://docs.fil.one" target="_blank" rel="noopener noreferrer" className="btn-secondary" onClick={() => { trackCtaClick("Explore docs", "https://docs.fil.one", "secondary"); trackDocsClick("https://docs.fil.one"); }}>
                  Explore docs
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

        {/* Stats */}
        <div ref={heroEndRef}>
          <section className="w-full px-5 md:px-8 pt-0 pb-0" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="w-full max-w-[1120px] mx-auto">
              <div
                ref={statsRef}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full reveal-group"
              >
                {STATS.map(({ value, label, note }) => (
                  <div
                    key={label}
                    className={`flex flex-col gap-3 p-8 rounded-2xl border reveal${statsInView ? " in-view" : ""}`}
                    style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}
                  >
                    <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: "clamp(32px, 5vw, 44px)", lineHeight: 1, letterSpacing: "-0.03em", color: "#0090FF", margin: 0 }}>
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
        <UseCasesSection heading="S3 storage made simple" />

        {/* Use cases */}
        <StorageUseCasesSection />

        {/* Calculator */}
        <StorageCalculatorSection />

        {/* Comparison */}
        <ComparisonSection bordered />

        {/* FAQ */}
        <FaqSection include={[
          "Is Fil One hot, warm, or cold storage? Is it like Glacier?",
          "How does data integrity verification work with Fil One?",
          "Is Fil One compatible with my existing tools?",
          "What kinds of organizations use Fil One?",
          "How does Fil One approach security and compliance?",
          "How do I migrate from AWS / Azure / Google Cloud?",
          "What is Filecoin?",
        ]} />

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
                  Your data, your keys, your control
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
                  Start with 1 TB free. No credit card, no egress fees, no surprises.
                </p>
                <div className="flex items-center justify-center">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark" onClick={() => trackCtaClick("Start for free", "https://app.fil.one/login?screen_hint=signup", "primary")}>
                    <span className="btn-primary-inner">Start for free</span>
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

export default StorageProductPage;
