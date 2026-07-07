import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import FaqSection from "@/components/FaqSection";
import { PressBar } from "@/components/PressBar";

// ─── Pricing tiers ─────────────────────────────────────────────────────────────
const PAYGO_FEATURES = [
  "1 TB free for 30 days",
  "Pay monthly",
  "No egress or API request fees",
  "Data integrity guarantees",
];

const BUSINESS_FEATURES = [
  "Purchase in 1, 3, or 5-year increments",
  "No egress or API request fees",
  "Data integrity guarantees",
  "Capacity assurance and deployment SLAs",
];

// ─── Calculator competitors ────────────────────────────────────────────────────
const COMPETITORS = [
  {
    name: "Fil One",
    region: null,
    storagePricePerTB: 4.99,
    egressPricePerTB: 0,
    apiPer1M: 0,
    isFilOne: true,
  },
  {
    name: "Wasabi",
    region: null,
    storagePricePerTB: 7.99,
    egressPricePerTB: 0,
    apiPer1M: 0,
    isFilOne: false,
  },
  {
    name: "Backblaze B2",
    region: null,
    storagePricePerTB: 6.95,
    egressPricePerTB: 10.0,
    apiPer1M: 0,
    isFilOne: false,
  },
  {
    name: "AWS S3",
    region: "eu-west-1",
    storagePricePerTB: 23.0,
    egressPricePerTB: 90.0,
    apiPer1M: 5.0,
    isFilOne: false,
  },
];


// ─── Page ──────────────────────────────────────────────────────────────────────
const PricingPage = () => {
  useSeo({
    title: "Pricing — Fil One",
    description:
      "S3-compatible object storage at $4.99/TB with no egress fees. See how much you could save compared to AWS, Google Cloud, and Azure.",
    canonical: "https://fil.one/pricing",
  });

  const [storedTB, setStoredTB] = useState(10);
  const [egressTB, setEgressTB] = useState(10);

  const { ref: benefitsRef, inView: benefitsInView } = useInView({ threshold: 0.05 });
  const { ref: calcRef, inView: calcInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  const calcTotal = (c: typeof COMPETITORS[0]) =>
    c.storagePricePerTB * storedTB + c.egressPricePerTB * egressTB;

  const filOneTotal = calcTotal(COMPETITORS[0]);
  const sortedCompetitors = [...COMPETITORS].sort((a, b) => calcTotal(a) - calcTotal(b));

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 pt-[58px] md:pt-[94px] pb-16 md:pb-24 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col items-center gap-10 w-full max-w-[1120px] mx-auto pt-16 md:pt-24">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1
                className="text-[32px] sm:text-[40px] md:text-[52px]"
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  lineHeight: "1.08",
                  letterSpacing: "-0.025em",
                  color: "#09090B",
                  maxWidth: 800,
                  margin: 0,
                }}
              >
                The <span style={{ color: "#0090FF" }}>cheapest S3-compatible</span> storage solution.
              </h1>
              <p
                className="text-[15px] md:text-[17px]"
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  lineHeight: "1.65",
                  color: "#71717A",
                  maxWidth: 520,
                  margin: 0,
                }}
              >
                One flat rate per TB. No egress fees and no API charges.
              </p>
            </div>

            {/* Pricing cards */}
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-[800px]">
              {/* Pay-as-you-go */}
              <div
                className="flex flex-1 flex-col gap-7 p-8 rounded-2xl border"
                style={{
                  borderColor: "rgba(0,144,255,0.25)",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 0 0 4px rgba(0,144,255,0.06), 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, color: "#09090B" }}>
                    Pay-as-you-go
                  </p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A" }}>
                    For teams getting started
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-end gap-1.5">
                    <span style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 44, lineHeight: 1, color: "#09090B", letterSpacing: "-0.025em" }}>
                      $4.99
                    </span>
                    <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#71717A", paddingBottom: 6 }}>
                      / TB / month
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A" }}>
                    Free for the first 30 days.
                  </p>
                </div>

                <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

                <div className="flex flex-col gap-3">
                  {PAYGO_FEATURES.map((f) => (
                    <div key={f} className="flex gap-3 items-center">
                      <Check size={14} color="#0090FF" className="shrink-0" />
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#52525B" }}>{f}</p>
                    </div>
                  ))}
                </div>

                <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary mt-auto w-full">
                  <span className="btn-primary-inner w-full justify-center">Start for free</span>
                </a>
              </div>

              {/* Business */}
              <div
                className="flex flex-1 flex-col gap-7 p-8 rounded-2xl border"
                style={{
                  borderColor: "rgba(0,0,0,0.07)",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, color: "#09090B" }}>
                    Business
                  </p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A" }}>
                    For enterprises with scale
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <span style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 32, lineHeight: 1, color: "#09090B", letterSpacing: "-0.025em" }}>
                    Custom pricing
                  </span>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A", marginTop: 4 }}>
                    Ideal for predictable storage needs or compliance-driven requirements.
                  </p>
                </div>

                <div className="w-full h-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

                <div className="flex flex-col gap-3">
                  {BUSINESS_FEATURES.map((f) => (
                    <div key={f} className="flex gap-3 items-center">
                      <Check size={14} color="#0090FF" className="shrink-0" />
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#52525B" }}>{f}</p>
                    </div>
                  ))}
                </div>

                <a href="/contact-sales" className="btn-secondary mt-auto w-full justify-center">
                  Contact sales
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── No hidden fees ───────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-16 md:py-20 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={benefitsRef}
            className={`flex flex-col md:flex-row gap-8 items-start w-full max-w-[1120px] mx-auto reveal${benefitsInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 md:max-w-[320px]">
              <SectionLabel>What's included</SectionLabel>
              <SectionHeading>No hidden fees</SectionHeading>
              <SectionSub maxWidth={320}>
                $4.99/TB/month for storage capacity. Everything else is included.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full flex-1">
              {[
                { stat: "$0", label: "Egress fees" },
                { stat: "$0", label: "API request fees" },
                { stat: "$0", label: "Exit fees" },
              ].map(({ stat, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 px-6 py-9 rounded-2xl text-center" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 36, color: "#0090FF", letterSpacing: "-0.02em", margin: 0 }}>{stat}</p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "#09090B", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cost calculator ───────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={calcRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${calcInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Cost calculator</SectionLabel>
              <SectionHeading>See your <span style={{ color: "#0090FF" }}>actual savings</span></SectionHeading>
              <SectionSub maxWidth={520}>
                Enter your storage and egress volumes to compare your monthly bill across providers.
              </SectionSub>
            </div>

            {/* Inputs */}
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-[640px] mx-auto">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-center">
                  <label style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 16, color: "#09090B" }}>
                    Storage
                  </label>
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "#0070CC" }}>
                    {storedTB} TB
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={storedTB}
                  onChange={(e) => setStoredTB(Number(e.target.value))}
                  className="w-full calc-slider"
                />
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#71717A" }}>1 TB</span>
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#71717A" }}>500 TB</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-center">
                  <label style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 16, color: "#09090B" }}>
                    Monthly egress
                  </label>
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 16, color: "#0070CC" }}>
                    {egressTB} TB
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500}
                  value={egressTB}
                  onChange={(e) => setEgressTB(Number(e.target.value))}
                  className="w-full calc-slider"
                />
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#71717A" }}>0 TB</span>
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#71717A" }}>500 TB</span>
                </div>
              </div>
            </div>

            {/* Results: stacked cards on mobile */}
            <div className="flex flex-col gap-3 md:hidden">
              {sortedCompetitors.map((c) => {
                const storage = c.storagePricePerTB * storedTB;
                const egress = c.egressPricePerTB * egressTB;
                const total = storage + egress;
                const savings = total - filOneTotal;
                return (
                  <div
                    key={c.name}
                    className="rounded-2xl p-4"
                    style={{
                      backgroundColor: c.isFilOne ? "#EFF8FF" : "#FFFFFF",
                      border: c.isFilOne ? "1px solid rgba(0,144,255,0.25)" : "1px solid rgba(0,0,0,0.07)",
                      fontFamily: "'Funnel Sans', sans-serif",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span style={{ fontSize: 16, fontWeight: c.isFilOne ? 700 : 500, color: c.isFilOne ? "#0070CC" : "#09090B" }}>
                        {c.name}
                      </span>
                      {c.isFilOne && (
                        <span style={{ display: "inline-flex", alignItems: "center", backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", color: "#0070CC", fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 9999 }}>
                          You
                        </span>
                      )}
                      {c.region && (
                        <span style={{ fontSize: 13, color: "#71717A" }}>
                          {c.region}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-y-2" style={{ fontSize: 14 }}>
                      <span style={{ color: "#71717A" }}>Storage</span>
                      <span style={{ textAlign: "right", color: c.isFilOne ? "#09090B" : "#52525B", fontWeight: c.isFilOne ? 600 : 400 }}>${storage.toFixed(2)}</span>
                      <span style={{ color: "#71717A" }}>Egress</span>
                      <span style={{ textAlign: "right", fontWeight: c.isFilOne ? 600 : 400, color: egress === 0 ? "#16a34a" : c.isFilOne ? "#09090B" : "#dc2626" }}>${egress.toFixed(2)}</span>
                      <span style={{ color: "#71717A", fontWeight: 600, paddingTop: 8, borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: 4 }}>Total / month</span>
                      <span style={{ textAlign: "right", fontWeight: 700, color: c.isFilOne ? "#0070CC" : "#09090B", paddingTop: 8, borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: 4 }}>
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    {!c.isFilOne && savings > 0.5 && (
                      <div className="mt-3">
                        <span style={{ fontSize: 13, fontWeight: 500, color: "#15803d", backgroundColor: "#f0fdf4", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 9999, padding: "2px 8px", whiteSpace: "nowrap" }}>
                          {Math.round(savings / filOneTotal)}× more expensive
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Results table: desktop / tablet */}
            <div className="hidden md:block" style={{ overflowX: "auto", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, backgroundColor: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}>
              <table style={{ width: "100%", minWidth: 520, borderCollapse: "collapse", fontFamily: "'Funnel Sans', sans-serif" }}>
                <thead>
                  <tr>
                    {["Provider", "Storage", "Egress", "Total / month"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "16px 20px", fontSize: 12, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#71717A", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedCompetitors.map((c) => {
                    const storage = c.storagePricePerTB * storedTB;
                    const egress = c.egressPricePerTB * egressTB;
                    const total = storage + egress;
                    const savings = total - filOneTotal;
                    return (
                      <tr key={c.name} style={{ backgroundColor: c.isFilOne ? "#EFF8FF" : "transparent" }}>
                        <td style={{ padding: "20px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 16, fontWeight: c.isFilOne ? 700 : 500, color: c.isFilOne ? "#0070CC" : "#09090B" }}>
                              {c.name}
                            </span>
                            {c.isFilOne && (
                              <span style={{ display: "inline-flex", alignItems: "center", backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", color: "#0070CC", fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 9999 }}>
                                You
                              </span>
                            )}
                            {c.region && (
                              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#71717A" }}>
                                {c.region}
                              </span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: "20px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)", fontSize: 15, color: c.isFilOne ? "#09090B" : "#52525B", fontWeight: c.isFilOne ? 600 : 400 }}>
                          ${storage.toFixed(2)}
                        </td>
                        <td style={{ padding: "20px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)", fontSize: 15, fontWeight: c.isFilOne ? 600 : 400, color: egress === 0 ? "#16a34a" : c.isFilOne ? "#09090B" : "#dc2626" }}>
                          ${egress.toFixed(2)}
                        </td>
                        <td style={{ padding: "20px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span style={{ fontSize: c.isFilOne ? 19 : 16, fontWeight: c.isFilOne ? 700 : 400, color: c.isFilOne ? "#0070CC" : "#52525B" }}>
                              ${total.toFixed(2)}
                            </span>
                            {!c.isFilOne && savings > 0.5 && (
                              <span style={{ fontSize: 13, fontWeight: 500, color: "#15803d", backgroundColor: "#f0fdf4", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 9999, padding: "2px 8px", whiteSpace: "nowrap" }}>
                                {Math.round(savings / filOneTotal)}× more expensive
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-center" style={{ color: "#71717A" }}>
              Prices are published list rates in USD as of July 2026. Backblaze B2 includes free egress up to 3× your monthly stored amount; the $10/TB rate applies beyond that threshold. Regional pricing may vary.
            </p>
          </div>
        </section>

        {/* ── Publications ─────────────────────────────────────────────────── */}
        <PressBar backgroundColor="#F9FAFB" />

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <FaqSection include={[
          "What counts as egress?",
          "How is my bill calculated?",
          "Do you offer annual or reserved capacity plans?",
          "Where is my data stored?",
        ]} />

        {/* ── CTA banner ───────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
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
                  style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12, maxWidth: 480, margin: "0 auto 12px" }}
                >
                  Up to 22× cheaper than AWS
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>
                  $4.99/TB, no egress fees, up and running in minutes.
                </p>
                <div className="flex items-center justify-center">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark btn-primary-lg btn-primary-glow">
                    <span className="btn-primary-inner">Start for free</span>
                  </a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>
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

export default PricingPage;
