import { Plug, ArrowsOut, ShieldCheck, Lock, MapPin, Rocket } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';
import IntegrationsSection from "@/components/IntegrationsSection";

// ─── Grid texture (matches Index.tsx hero) ─────────────────────────────────────

// ─── Pricing table helpers ────────────────────────────────────────────────────
// Colours egress/API cells: $0 → green, large fees → red, small fees → neutral
const valueColor = (val: string) => {
  const n = parseFloat(val.replace(/[$€,]/g, ""));
  if (n === 0)  return "#16a34a"; // green
  if (n > 50)   return "#dc2626"; // red
  return "#52525B";               // neutral
};

// ─── Pricing table data ────────────────────────────────────────────────────────
const PRICING_ROWS = [
  { provider: "Fil One",              region: "EU-West",                    storage: "€49.90",  egress: "€0",     api: "€0",    total: "€49.90",  isFilOne: true  },
  { provider: "Backblaze B2",         region: "eu-central-003 Amsterdam",   storage: "€59.60",  egress: "€0",     api: "€0",    total: "€59.60",  isFilOne: false },
  { provider: "Wasabi",               region: "eu-west-2 Paris",            storage: "€59.90",  egress: "€0",     api: "€0",    total: "€59.90",  isFilOne: false },
  { provider: "AWS S3 Standard",      region: "eu-south-2 Madrid",          storage: "€197",    egress: "€790",   api: "€1.83", total: "€990",    isFilOne: false },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
const BarcelonaLandingPage = () => {
  useSeo({
    title: "Fil One for Barcelona: European Storage, €4.99/TB, No Egress Fees",
    description:
      "S3-compatible object storage for teams in Barcelona. EU data sovereignty, zero egress fees, at €4.99/TB. Drop into your existing stack in minutes.",
    canonical: "https://www.fil.one/lp/barcelona",
  });

  const { ref: posRef,          inView: posInView          } = useInView({ threshold: 0.05 });
  const { ref: pricingRef,      inView: pricingInView      } = useInView({ threshold: 0.05 });
  const { ref: featuresRef,     inView: featuresInView     } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,          inView: ctaInView          } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative isolate pt-[58px] md:pt-[94px]"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          {/* Blue radial glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
            }}
          />
          {/* Grid texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />

          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-10 md:pb-14">
            {/* Headline */}
            <h1
              className="text-[34px] sm:text-[44px] md:text-[62px] hero-fade-2"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
                color: "#09090B",
                textAlign: "center",
                maxWidth: 760,
                margin: 0,
              }}
            >
              European storage.<br /><span style={{ color: "#0090FF" }}>€4.99/TB, no egress fees.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-[15px] md:text-[17px] hero-fade-2"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 520,
                margin: 0,
              }}
            >
              S3-compatible object storage that keeps your data in Europe.<br />Works with your existing tools, no migration needed.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-lg btn-primary-glow">
                <span className="btn-primary-inner">Try 30 days for free</span>
              </a>
            </div>

          </div>
        </section>

        {/* ── Publications / Social proof ──────────────────────────────────── */}
        <section className="flex flex-col items-center gap-12 px-5 pt-8 md:pt-10 pb-16 md:pb-20 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col items-center gap-4 w-full">
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, color: "rgb(113, 113, 122)" }}>
              Our technology has been featured in
            </p>
            <div className="marquee-mask w-full max-w-2xl overflow-hidden">
              <div className="marquee-track flex items-center w-max">
                {[0, 1].map((copy) => (
                  <span key={copy} className="flex items-center gap-8 pr-8" aria-hidden={copy === 1}>
                    {["Fast Company", "CNBC", "Bloomberg", "Yahoo Finance", "VentureBeat"].map((pub) => (
                      <span key={pub} className="flex items-center gap-8">
                        <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 20, color: "rgb(113, 113, 122)", textAlign: "center", lineHeight: 1.5, whiteSpace: "nowrap" }}>{pub}</span>
                        <span style={{ color: "#D4D4D8", fontSize: 20 }}>·</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Positioning ───────────────────────────────────────────────── */}
        <section
          id="positioning"
          className="px-5 md:px-8 py-16 md:py-20 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            ref={posRef}
            className={`flex flex-col md:flex-row gap-8 md:gap-14 items-stretch md:items-start w-full max-w-[1120px] mx-auto reveal${posInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left md:max-w-[320px]">
              <SectionLabel>Why Fil One</SectionLabel>
              <SectionHeading>Unbeatably <span style={{ color: "#0090FF" }}>low cost</span></SectionHeading>
              <SectionSub maxWidth={320}>
                S3-compatible, EU-sovereign, zero egress. No hidden fees, no pricing surprises.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full flex-1">
              {[
                { stat: "€4.99/TB", label: "Flat monthly rate" },
                { stat: "€0", label: "Egress fees" },
                { stat: "20×", label: "Cheaper than AWS" },
              ].map(({ stat, label }) => (
                <div key={stat} className="flex flex-col items-center gap-1 px-6 py-9 rounded-2xl text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 36, color: "#0090FF", letterSpacing: "-0.02em", margin: 0 }}>{stat}</p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "#09090B", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing table ─────────────────────────────────────────────────── */}
        <section
          id="compare"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={pricingRef}
            className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${pricingInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>Your monthly bill, <span style={{ color: "#0090FF" }}>four ways</span></SectionHeading>
              <SectionSub maxWidth={600}>
                A 10 TB team in Barcelona, delivering 10 TB of egress each month, running 500,000 object operations.
              </SectionSub>
            </div>

            {/* Mobile: stacked cards (table below is md+ only) */}
            <div className="flex flex-col gap-3 md:hidden">
              {PRICING_ROWS.map((row) => (
                <div
                  key={row.provider}
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: row.isFilOne ? "#EFF8FF" : "#FFFFFF",
                    border: row.isFilOne ? "1px solid rgba(0,144,255,0.25)" : "1px solid rgba(0,0,0,0.07)",
                    fontFamily: "'Funnel Sans', sans-serif",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ fontSize: 16, fontWeight: 700, color: row.isFilOne ? "#0070CC" : "#09090B" }}>
                      {row.provider}
                    </span>
                    {row.isFilOne && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: "#EFF8FF",
                          border: "1px solid rgba(0,144,255,0.2)",
                          color: "#0070CC",
                          fontSize: 11,
                          fontWeight: 500,
                          padding: "2px 8px",
                          borderRadius: 9999,
                          whiteSpace: "nowrap",
                        }}
                      >
                        You
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-y-2" style={{ fontSize: 14 }}>
                    <span style={{ color: "#71717A" }}>Region</span>
                    <span style={{ textAlign: "right", color: "#52525B" }}>{row.region}</span>
                    <span style={{ color: "#71717A" }}>Storage</span>
                    <span style={{ textAlign: "right", color: "#09090B" }}>{row.storage}</span>
                    <span style={{ color: "#71717A" }}>Egress</span>
                    <span style={{ textAlign: "right", color: row.isFilOne ? "#09090B" : valueColor(row.egress) }}>{row.egress}</span>
                    <span style={{ color: "#71717A" }}>API / ops</span>
                    <span style={{ textAlign: "right", color: row.isFilOne ? "#09090B" : valueColor(row.api) }}>{row.api}</span>
                    <span style={{ color: "#71717A", fontWeight: 600, paddingTop: 8, borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: 4 }}>Total / month</span>
                    <span
                      style={{
                        textAlign: "right",
                        fontWeight: 700,
                        color: row.isFilOne ? "#0070CC" : "#09090B",
                        paddingTop: 8,
                        borderTop: "1px solid rgba(0,0,0,0.06)",
                        marginTop: 4,
                      }}
                    >
                      {row.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop / tablet: full table */}
            <div className="hidden md:block" style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 600,
                  borderCollapse: "collapse",
                  fontFamily: "'Funnel Sans', sans-serif",
                }}
              >
                <thead>
                  <tr>
                    {["Provider", "Region", "Storage", "Egress", "API / ops", "Total / month"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "14px 16px",
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "#71717A",
                          borderBottom: "1px solid rgba(0,0,0,0.07)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRICING_ROWS.map((row) => (
                    <tr
                      key={row.provider}
                      style={{ backgroundColor: row.isFilOne ? "#EFF8FF" : "transparent" }}
                    >
                      {/* Provider */}
                      <td
                        style={{
                          padding: "20px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 16,
                          fontWeight: row.isFilOne ? 700 : 500,
                          color: row.isFilOne ? "#0070CC" : "#09090B",
                        }}
                      >
                        {row.provider}
                        {row.isFilOne && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              marginLeft: 8,
                              backgroundColor: "#EFF8FF",
                              border: "1px solid rgba(0,144,255,0.2)",
                              color: "#0070CC",
                              fontFamily: "'Funnel Sans', sans-serif",
                              fontSize: 11,
                              fontWeight: 500,
                              padding: "2px 8px",
                              borderRadius: 9999,
                              verticalAlign: "middle",
                              whiteSpace: "nowrap",
                            }}
                          >
                            You
                          </span>
                        )}
                      </td>
                      {/* Region */}
                      <td
                        style={{
                          padding: "20px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 15.5,
                          fontWeight: row.isFilOne ? 500 : 400,
                          color: row.isFilOne ? "#09090B" : "#52525B",
                        }}
                      >
                        {row.region}
                      </td>
                      {/* Storage */}
                      <td
                        style={{
                          padding: "20px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 15.5,
                          fontWeight: row.isFilOne ? 600 : 400,
                          color: row.isFilOne ? "#09090B" : "#52525B",
                        }}
                      >
                        {row.storage}
                      </td>
                      {/* Egress */}
                      <td
                        style={{
                          padding: "20px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 15.5,
                          fontWeight: row.isFilOne ? 600 : 500,
                          color: row.isFilOne ? "#09090B" : valueColor(row.egress),
                        }}
                      >
                        {row.egress}
                      </td>
                      {/* API */}
                      <td
                        style={{
                          padding: "20px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 15.5,
                          fontWeight: row.isFilOne ? 600 : 500,
                          color: row.isFilOne ? "#09090B" : valueColor(row.api),
                        }}
                      >
                        {row.api}
                      </td>
                      {/* Total */}
                      <td
                        style={{
                          padding: "20px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: row.isFilOne ? 19.5 : 15.5,
                          fontWeight: row.isFilOne ? 700 : 400,
                          color: row.isFilOne ? "#0070CC" : "#52525B",
                        }}
                      >
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              Competitor prices converted from USD at €1 = $1.17 (ECB rate, May 2026). Fil One is priced natively in EUR at €4.99/TB.
            </p>

            {/* Mid-page CTA after pricing table */}
            <div className="flex items-center justify-center mt-4">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Try 30 days for free</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section
          id="features"
          className="w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-4 items-center text-center">
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#71717A", textTransform: "uppercase" }}>
                Features
              </span>
              <h2
                className="text-[24px] md:text-[34px]"
                style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.2", letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}
              >
                The <span style={{ color: "#0090FF" }}>S3 you expected</span>
              </h2>
              <p
                className="text-[15px] md:text-[17px]"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", maxWidth: 560, margin: 0 }}
              >
                Compatible with everything your team already uses.
              </p>
            </div>
            <div
              ref={featuresRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group reveal${featuresInView ? " in-view" : ""}`}
            >
              {[
                { icon: Plug,        title: "Drop-in S3 compatibility",    desc: "Same API, same SDKs, same tools. Point your existing workflow at our endpoint." },
                { icon: ArrowsOut,   title: "Zero egress fees",            desc: "Every read is free, so your bill stays flat no matter how busy the month." },
                { icon: ShieldCheck, title: "Eleven nines of durability",  desc: "99.999999999% durability, replicated across locations and monitored around the clock." },
                { icon: Lock,        title: "Object Lock and versioning",  desc: "Compliance modes, retention periods, and tamper-evident audit logs." },
                { icon: MapPin,      title: "Your data never leaves the EU", desc: "Storage stays within European borders, ready for your compliance reviews." },
                { icon: Rocket,      title: "Up and running in minutes",   desc: "Generate access keys, point your tools at our endpoint, and start uploading." },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-5 p-8 rounded-2xl border reveal${featuresInView ? " in-view" : ""}`}
                  style={{
                    borderColor: "rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}>
                    <Icon size={26} color="#0090FF" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 18, lineHeight: "1.3", color: "#09090B" }}>
                      {title}
                    </p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.6", color: "#71717A" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Integrations ──────────────────────────────────────────────────── */}
        <IntegrationsSection />

        {/* ── CTA Banner ────────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={ctaRef}
            className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}
          >
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
              {/* White grid texture, drifting slowly */}
              <div
                aria-hidden="true"
                className="cta-grid-drift"
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

              {/* Soft breathing glow behind the copy */}
              <div
                aria-hidden="true"
                className="cta-glow-pulse"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 480,
                  height: 480,
                  marginLeft: -240,
                  marginTop: -240,
                  background: "radial-gradient(circle, rgba(30,191,255,0.20) 0%, transparent 70%)",
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
                  The cheapest object storage in Europe
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
                  €4.99/TB, no egress fees, up and running in minutes.
                </p>

                <div className="flex items-center justify-center">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark btn-primary-lg btn-primary-glow">
                    <span className="btn-primary-inner">Try 30 days for free</span>
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
                  No credit card required
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

export default BarcelonaLandingPage;
