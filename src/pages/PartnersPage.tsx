import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import {
  Users,
  Code,
  ShieldCheck,
  CurrencyDollar,
  Cube,
  ArrowsLeftRight,
  ChartLineUp,
  Chat,
  CheckCircle,
} from "@phosphor-icons/react";

const PARTNER_ROLES = [
  {
    icon: Users,
    title: "Channel",
    subtitle: "Resellers · VARs · referral partners",
    body: "Add modern, cost-predictable cloud storage to your portfolio and solve real customer storage problems — with margins that work.",
    bullets: [
      "Reseller and referral models",
      "Transparent $4.99/TB pricing, no egress fees",
      "Deal support and co-marketing",
    ],
    cta: "Become a Channel partner",
    href: "/partners/apply",
  },
  {
    icon: Code,
    title: "Technology",
    subtitle: "ISVs · platforms · integration partners",
    body: "Build and market joint solutions on Fil One. If your product speaks S3, it already speaks Fil One — point it at our endpoint and ship.",
    bullets: [
      "Drop-in S3-compatible API & SDKs",
      "Verifiable data integrity (daily CID proofs)",
      "Joint launch & integration listing",
    ],
    cta: "Become a Technology partner",
    href: "/partners/apply",
  },
  {
    icon: ShieldCheck,
    title: "Managed Service Provider",
    subtitle: "MSPs · backup & DR providers",
    body: "Protect more data with predictable, cost-effective storage. No surprise egress or API bills — so your margins stay yours.",
    bullets: [
      "Predictable, all-in pricing",
      "11 nines durability, multi-cloud by design",
      "Works with the backup tools you already run",
    ],
    cta: "Become an MSP partner",
    href: "/partners/apply",
  },
];

const WHY_FEATURES = [
  {
    icon: CurrencyDollar,
    title: "No egress fees",
    body: "$4.99/TB/month, no API request charges, no surprise bills. Easy to quote, easy to win.",
  },
  {
    icon: Cube,
    title: "11 nines durability",
    body: "Distributed, redundant storage with daily, audit-ready proof that data is exactly as uploaded.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Drop-in S3 compatibility",
    body: "Existing tools, SDKs and workflows just work. Minimal lift to integrate or migrate.",
  },
  {
    icon: ChartLineUp,
    title: "Multi-cloud, no lock-in",
    body: "Data spread across an independent network of providers. Meet residency needs, avoid single-vendor risk.",
  },
  {
    icon: Cube,
    title: "Built for AI & scale",
    body: "Optimized for large datasets and data-intensive workloads, with consistent performance as data grows.",
  },
  {
    icon: Chat,
    title: "People, not portals",
    body: "A responsive partner team that helps with deals, migrations and integrations — start with a single email.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Reach out",
    body: "Tell us about your business and the role that fits. One email — a real person on our team replies.",
  },
  {
    number: "02",
    title: "Plan together",
    body: "We align on commercials, technical fit and go-to-market, then set you up with the access you need.",
  },
  {
    number: "03",
    title: "Launch & grow",
    body: "Sell, integrate or bundle Fil One — backed by deal support, co-marketing and our partner team.",
  },
];

const PartnersPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: rolesRef, inView: rolesInView } = useInView({ threshold: 0.1 });
  const { ref: whyRef, inView: whyInView } = useInView({ threshold: 0.1 });
  const { ref: stepsRef, inView: stepsInView } = useInView({ threshold: 0.1 });

  useSeo({
    title: "Partners — Fil One",
    description:
      "Channel, Technology, and MSP partner programs for Fil One. Resell, integrate, or bundle verifiable cloud storage with your business.",
    canonical: "https://filone.io/partners",
    ogImage: "https://filone.io/og-image.png",
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
                  Partner Program
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
                  maxWidth: 580,
                  margin: 0,
                }}
              >
                Choose the way to partner that fits your business
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
                However you reach customers, there's a path to partner with Fil One. Pick a role to start the conversation.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <a href="/partners/apply" className="btn-primary">
                  <span className="btn-primary-inner">Apply to partner</span>
                </a>
                <a href="/contact-sales" className="btn-secondary">
                  Talk to our team
                </a>
              </div>
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
              "Competitive partner margins",
              "Deal registration & co-sell support",
              "Simple pricing — easy to quote and win",
              "No egress fees — no surprise bills",
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

        {/* Partner role cards */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-[1120px] mx-auto">
            <div ref={rolesRef} className={`reveal${rolesInView ? " in-view" : ""}`}>
              <div className="flex flex-col items-center gap-4 mb-14 md:mb-16 text-center">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.07em",
                    color: "#71717A",
                    textTransform: "uppercase",
                  }}
                >
                  One program. Multiple roles.
                </span>
                <h2
                  className="text-[24px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2",
                    color: "#09090B",
                    maxWidth: 440,
                    margin: 0,
                  }}
                >
                  Find the role that fits
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PARTNER_ROLES.map(({ icon: Icon, title, subtitle, body, bullets, cta, href }) => (
                  <div
                    key={title}
                    className="flex flex-col gap-4 rounded-2xl p-6 border"
                    style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF" }}
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                      style={{ backgroundColor: "#EFF8FF" }}
                    >
                      <Icon size={18} color="#0090FF" />
                    </div>

                    <div>
                      <h3
                        style={{
                          fontFamily: "'Aspekta', sans-serif",
                          fontWeight: 500,
                          fontSize: 16,
                          color: "#09090B",
                          margin: "0 0 3px",
                        }}
                      >
                        {title}
                      </h3>
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#0070CC", margin: 0 }}>
                        {subtitle}
                      </p>
                    </div>

                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 14, lineHeight: "1.6", color: "#71717A", margin: 0, flex: 1 }}>
                      {body}
                    </p>

                    <ul className="flex flex-col gap-2">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle size={14} weight="fill" style={{ color: "#0090FF", flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#52525B", lineHeight: "1.5" }}>
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={href}
                      className="btn-primary w-full mt-2"
                    >
                      <span className="btn-primary-inner w-full justify-center">{cta}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Fil One */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-[1120px] mx-auto">
            <div ref={whyRef} className={`reveal${whyInView ? " in-view" : ""}`}>
              <div className="flex flex-col items-center gap-4 mb-14 md:mb-16 text-center">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.07em",
                    color: "#71717A",
                    textTransform: "uppercase",
                  }}
                >
                  Why partner with Fil One
                </span>
                <h2
                  className="text-[24px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: "1.2",
                    color: "#09090B",
                    maxWidth: 480,
                    margin: 0,
                  }}
                >
                  Storage your customers will actually want
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 15, color: "#71717A", margin: 0, maxWidth: 400 }}>
                  A product that's easy to sell, easy to integrate, and easy to trust.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {WHY_FEATURES.map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="flex flex-col gap-5 rounded-2xl p-8 border"
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
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B", margin: 0 }}>
                        {title}
                      </p>
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 14, lineHeight: "1.6", color: "#71717A", margin: 0 }}>
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-5 md:px-8 py-24 md:py-32" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-[1120px] mx-auto">
            <div ref={stepsRef} className={`reveal${stepsInView ? " in-view" : ""}`}>
              <div className="flex flex-col items-center gap-4 mb-14 text-center">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.07em",
                    color: "#71717A",
                    textTransform: "uppercase",
                  }}
                >
                  How it works
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
                  From hello to launched in three steps
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {STEPS.map(({ number, title, body }) => (
                  <div key={number} className="flex flex-col gap-3">
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 500,
                        fontSize: 28,
                        color: "rgba(0,144,255,0.25)",
                        lineHeight: 1,
                      }}
                    >
                      {number}
                    </span>
                    <h3 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 15, color: "#09090B", margin: 0 }}>
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
                  Let's find the right way to partner
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>
                  Not sure which role fits? Tell us about your business and we'll point you to the best path.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="/partners/apply" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Email the partner team</span>
                  </a>
                  <a
                    href="https://docs.fil.one"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                    }}
                  >
                    Read the docs →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default PartnersPage;
