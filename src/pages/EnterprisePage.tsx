import { useState } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import {
  Buildings,
  Headset,
  CurrencyDollar,
  ArrowsLeftRight,
  LockKey,
  Certificate,
  CaretDown,
  Check,
} from "@phosphor-icons/react";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";

const FEATURES = [
  {
    icon: Buildings,
    title: "Capacity assurance & SLAs",
    description:
      "Reserve capacity with deployment guarantees. Contractual SLAs for uptime and performance, backed by a dedicated support line.",
  },
  {
    icon: Headset,
    title: "Dedicated onboarding",
    description:
      "A dedicated engineer helps you migrate, configure, and go live. White-glove support from day one through steady state.",
  },
  {
    icon: CurrencyDollar,
    title: "Custom pricing & invoicing",
    description:
      "Volume discounts, committed-use agreements (1, 3, or 5-year), and consolidated invoicing that fits your procurement process.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Guided migration",
    description:
      "Our team provides a migration plan and engineering support. S3 compatibility means most teams are live in days, not months.",
  },
  {
    icon: LockKey,
    title: "Access controls & audit logs",
    description:
      "Per-bucket API key scoping, fine-grained access policies, and full access logs ready for your security team.",
  },
  {
    icon: Certificate,
    title: "Compliance roadmap",
    description:
      "SOC 2 Type II and ISO 27001 in progress. Talk to us for a current controls overview and documentation.",
  },
];

const STATS = [
  {
    value: "~79%",
    label: "Less than AWS S3",
    note: "No egress fees, no API charges. The savings compound at enterprise scale.",
  },
  {
    value: "$0",
    label: "Egress fees",
    note: "Transfer data out anytime, to anywhere. No lock-in, no exit tax.",
  },
  {
    value: "11 9s",
    label: "Durability",
    note: "Backed by Filecoin's global network of independent storage providers.",
  },
];

const PRICING_TAGS = [
  "No egress fees",
  "No API request charges",
  "Committed-use discounts",
  "Consolidated invoicing",
  "Capacity assurance",
  "Contractual SLAs",
];

const FAQS = [
  {
    q: "What SLAs do you offer?",
    a: "Our business plan includes capacity assurance and deployment SLAs. Contact sales for specific uptime and performance commitments tailored to your workload.",
  },
  {
    q: "How does migration work?",
    a: "We provide a dedicated migration plan and engineering support. Most teams migrate using our S3-compatible API and standard tooling in days. We handle the plan — you just point your config at our endpoint.",
  },
  {
    q: "Where is my data stored?",
    a: "We offer EU and US regions. Data is distributed across an independent network of Filecoin storage providers — not concentrated in a single facility or hyperscaler datacenter.",
  },
  {
    q: "What compliance certifications do you have?",
    a: "SOC 2 Type II and ISO 27001 are actively in progress. Contact us for a current controls overview and compliance documentation for your procurement team.",
  },
  {
    q: "How does enterprise pricing work?",
    a: "Enterprise pricing is custom, based on volume and commitment term (1, 3, or 5-year increments). Contact sales and we'll prepare a quote within one business day.",
  },
  {
    q: "Can we use Fil One alongside AWS or Azure?",
    a: "Yes. S3 compatibility means Fil One integrates cleanly into multi-cloud architectures. Many enterprises use Fil One for cost-sensitive or compliance-sensitive workloads alongside their existing cloud provider.",
  },
];

const EnterprisePage = () => {
  const { heroEndRef } = useScrollTracking();
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.05 });
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.05 });
  const { ref: faqRef, inView: faqInView } = useInView({ threshold: 0.05 });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useSeo({
    title: "Enterprise — Fil One",
    description:
      "Fil One for enterprise: verifiable data integrity, S3-compatible, no egress fees, SLA-backed. Custom pricing for teams that need storage at scale.",
    canonical: "https://filone.io/enterprise",
    ogImage: "https://filone.io/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <div className="relative isolate pt-[58px]" style={{ backgroundColor: "#FFFFFF" }}>
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
                  Enterprise
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
                  maxWidth: 580,
                  margin: 0,
                }}
              >
                Storage infrastructure your team can rely on
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
                Verifiable data integrity, predictable costs, and S3-compatible from day one. Built for teams that need control at scale.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <a href="/contact-sales" className="btn-primary" onClick={() => trackCtaClick("Talk to sales", "/contact-sales", "primary")}>
                  <span className="btn-primary-inner">Talk to sales</span>
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
                Custom pricing · SLA-backed · Dedicated support
              </p>
            </div>
          </div>
        </div>

        {/* Cost stats */}
        <div ref={heroEndRef}>
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-8 px-5 md:px-8 pb-16 md:pb-24 w-full max-w-[1120px] mx-auto">
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

            <div className="flex flex-col items-center gap-2">
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#71717A" }}>
                See how much your team could save
              </p>
              <a
                href="/pricing#calculator"
                className="hover:opacity-75 transition-opacity"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#0070CC", textDecoration: "none" }}
              >
                Open cost calculator →
              </a>
            </div>
          </div>
        </section>
        </div>

        {/* Enterprise features */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#52525B", textTransform: "uppercase" }}>
                What's included
              </span>
              <h2 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: "clamp(22px, 4vw, 30px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}>
                Everything your team needs to move fast
              </h2>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: "#52525B" }}>
                From dedicated migration support to contractual SLAs — built around how enterprise teams actually operate.
              </p>
            </div>

            <div
              ref={featuresRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group"
            >
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-5 p-7 rounded-2xl border reveal${featuresInView ? " in-view" : ""}`}
                  style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}>
                    <Icon size={18} color="#0090FF" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>{title}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.6", color: "#71717A" }}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="w-full px-5 md:px-8 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={pricingRef}
            className={`w-full max-w-[800px] mx-auto reveal${pricingInView ? " in-view" : ""}`}
            style={{ backgroundColor: "#EFF8FF", borderRadius: 24, border: "1px solid rgba(0,144,255,0.15)", boxShadow: "0 2px 20px rgba(0,144,255,0.07)" }}
          >
            <div className="flex flex-col gap-10 items-center text-center px-8 md:px-16 py-16 md:py-20 w-full">
              <div className="flex flex-col gap-4">
                <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#71717A", textTransform: "uppercase" }}>
                  Pricing
                </span>
                <h2
                  className="text-[26px] md:text-[34px]"
                  style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}
                >
                  Custom pricing for every scale.
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "1.65", color: "#71717A", margin: "0 auto", maxWidth: 400 }}>
                  Starts at <span style={{ color: "#09090B", fontWeight: 500 }}>$4.99/TB/month</span> — no egress fees, no API charges. Volume discounts and committed-use agreements available.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {PRICING_TAGS.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full"
                    style={{ backgroundColor: "rgba(0,144,255,0.06)", border: "1px solid rgba(0,144,255,0.14)" }}
                  >
                    <Check size={12} color="#1EBFFF" weight="bold" className="shrink-0" />
                    <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#0056A3", whiteSpace: "nowrap" }}>
                      {tag}
                    </span>
                  </div>
                ))}
              </div>

              <a href="/contact-sales" className="btn-primary" onClick={() => trackCtaClick("Talk to sales", "/contact-sales", "primary")}>
                <span className="btn-primary-inner">Talk to sales</span>
              </a>
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
                return (
                  <div key={q} style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                    <button
                      aria-expanded={isOpen}
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
                      className="overflow-hidden transition-all duration-200"
                      style={{ maxHeight: isOpen ? 1200 : 0 }}
                    >
                      <p className="pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
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
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="w-full max-w-[1120px] mx-auto">
            <div
              className="px-6 md:px-12 py-16 md:py-[104px]"
              style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)",
                borderRadius: 20,
                textAlign: "center",
              }}
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
                  style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12, maxWidth: 440, margin: "0 auto 12px" }}
                >
                  Ready to see what Fil One can do for your team?
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32, maxWidth: 400, margin: "0 auto 32px" }}>
                  We'll prepare a custom quote and migration plan within one business day.
                </p>
                <div className="flex items-center justify-center">
                  <a href="/contact-sales" className="btn-primary btn-primary-dark" onClick={() => trackCtaClick("Get a demo", "/contact-sales", "primary")}>
                    <span className="btn-primary-inner">Get a demo</span>
                  </a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.50)", marginTop: 16 }}>
                  Custom pricing · Response within 1 business day · No commitment required
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

export default EnterprisePage;
