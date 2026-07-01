import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";

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
    storagePricePerTB: 4.99,
    egressPricePerTB: 0,
    apiPer1M: 0,
    isFilOne: true,
  },
  {
    name: "Wasabi",
    storagePricePerTB: 7.99,
    egressPricePerTB: 0,
    apiPer1M: 0,
    isFilOne: false,
  },
  {
    name: "Backblaze B2",
    storagePricePerTB: 7.0,
    egressPricePerTB: 9.0,
    apiPer1M: 0,
    isFilOne: false,
  },
  {
    name: "AWS S3",
    storagePricePerTB: 23.0,
    egressPricePerTB: 90.0,
    apiPer1M: 5.0,
    isFilOne: false,
  },
  {
    name: "Google Cloud",
    storagePricePerTB: 20.0,
    egressPricePerTB: 120.0,
    apiPer1M: 5.0,
    isFilOne: false,
  },
  {
    name: "Azure Blob",
    storagePricePerTB: 18.4,
    egressPricePerTB: 87.0,
    apiPer1M: 5.0,
    isFilOne: false,
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What counts as egress?",
    a: "Egress is any data transferred out of your bucket — to the internet, to another cloud, or to your own servers. With Fil One, all egress is free, always, at any scale.",
  },
  {
    q: "Is there a minimum storage requirement?",
    a: "No. You can store as little or as much as you need. You only pay for what you use, billed per TB per month.",
  },
  {
    q: "How is my bill calculated?",
    a: "You pay $4.99 per TB stored per month. There are no fees for egress or API operations. Your bill is the amount of data you store, multiplied by the rate.",
  },
  {
    q: "Do you offer annual or reserved capacity plans?",
    a: "Yes. For teams with predictable storage needs, we offer reserved capacity plans on 1, 3, or 5-year terms with volume discounts. Contact sales to get a quote.",
  },
  {
    q: "Where is my data stored?",
    a: "All data is stored within the European Union. We do not transfer your data outside EU borders.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. You get 1 TB free for 30 days. No credit card required to start.",
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
  const { ref: faqRef, inView: faqInView } = useInView({ threshold: 0.05 });

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
                  maxWidth: 640,
                  margin: 0,
                }}
              >
                Simple, predictable pricing.<br />
                <span style={{ color: "#0090FF" }}>No surprises.</span>
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
                One flat rate per TB. No egress fees, no API charges, no minimum storage. Up to 80% less than hyperscalers.
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
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 15, color: "#09090B" }}>
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
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 15, color: "#09090B" }}>
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
              <SectionHeading>No hidden fees.</SectionHeading>
              <SectionSub maxWidth={320}>
                Storage capacity only. Everything else is included.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              {[
                { stat: "$0", label: "Egress fees", desc: "Download your data as often as you need. No per-GB transfer charges, ever." },
                { stat: "$0", label: "API request fees", desc: "GET, PUT, LIST, DELETE. No metered API costs layered on top of your storage bill." },
                { stat: "$0", label: "Minimum storage fee", desc: "Pay only for what you store. No floor, no commitment required to get started." },
              ].map(({ stat, label, desc }) => (
                <div key={label} className="flex flex-col gap-3 p-6 rounded-2xl" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 36, color: "#0090FF", letterSpacing: "-0.02em", margin: 0 }}>{stat}</p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#09090B", margin: 0 }}>{label}</p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A", lineHeight: 1.55, margin: 0 }}>{desc}</p>
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
              <SectionHeading>See your actual savings.</SectionHeading>
              <SectionSub maxWidth={520}>
                Enter your storage and egress volumes to compare your monthly bill across providers.
              </SectionSub>
            </div>

            {/* Inputs */}
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-[640px] mx-auto">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-center">
                  <label style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#09090B" }}>
                    Storage
                  </label>
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#0090FF" }}>
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
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#A1A1AA" }}>1 TB</span>
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#A1A1AA" }}>500 TB</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-center">
                  <label style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#09090B" }}>
                    Monthly egress
                  </label>
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#0090FF" }}>
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
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#A1A1AA" }}>0 TB</span>
                  <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#A1A1AA" }}>500 TB</span>
                </div>
              </div>
            </div>

            {/* Results table */}
            <div style={{ overflowX: "auto", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, backgroundColor: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)" }}>
              <table style={{ width: "100%", minWidth: 520, borderCollapse: "collapse", fontFamily: "'Funnel Sans', sans-serif" }}>
                <thead>
                  <tr>
                    {["Provider", "Storage", "Egress", "Total / month"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 20px", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#71717A", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
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
                        <td style={{ padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)", fontSize: 14, fontWeight: c.isFilOne ? 700 : 500, color: c.isFilOne ? "#0070CC" : "#09090B" }}>
                          {c.name}
                          {c.isFilOne && (
                            <span style={{ display: "inline-flex", alignItems: "center", marginLeft: 8, backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", color: "#0070CC", fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 9999, verticalAlign: "middle" }}>
                              You
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)", fontSize: 13.5, color: c.isFilOne ? "#09090B" : "#52525B", fontWeight: c.isFilOne ? 600 : 400 }}>
                          ${storage.toFixed(2)}
                        </td>
                        <td style={{ padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)", fontSize: 13.5, fontWeight: c.isFilOne ? 600 : 400, color: egress === 0 ? "#16a34a" : c.isFilOne ? "#09090B" : "#dc2626" }}>
                          ${egress.toFixed(2)}
                        </td>
                        <td style={{ padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span style={{ fontSize: c.isFilOne ? 17 : 14, fontWeight: c.isFilOne ? 700 : 400, color: c.isFilOne ? "#0070CC" : "#52525B" }}>
                              ${total.toFixed(2)}
                            </span>
                            {!c.isFilOne && savings > 0.5 && (
                              <span style={{ fontSize: 12, fontWeight: 500, color: "#16a34a", backgroundColor: "#f0fdf4", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 9999, padding: "2px 8px", whiteSpace: "nowrap" }}>
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

            <p className="text-xs text-center" style={{ color: "#A1A1AA" }}>
              Competitor prices are estimates based on published list prices in USD. Actual bills may vary.
            </p>
          </div>
        </section>

        {/* ── Publications ─────────────────────────────────────────────────── */}
        <section className="flex flex-col items-center gap-6 px-5 py-12 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, color: "rgb(113,113,122)" }}>
            Our technology has been featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {["Fast Company", "CNBC", "Bloomberg", "Yahoo Finance", "VentureBeat"].map((pub, i, arr) => (
              <span key={pub} className="flex items-center gap-6">
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 16, color: "rgb(82,82,91)" }}>{pub}</span>
                {i < arr.length - 1 && <span style={{ color: "#D4D4D8", fontSize: 20 }}>·</span>}
              </span>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={faqRef}
            className={`flex flex-col gap-10 w-full max-w-[720px] mx-auto reveal${faqInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading>Common questions.</SectionHeading>
            </div>

            <div className="flex flex-col gap-0">
              {FAQS.map((item, i) => (
                <div
                  key={item.q}
                  className="flex flex-col gap-2 py-6"
                  style={{ borderBottom: i < FAQS.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none" }}
                >
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 15, color: "#09090B" }}>
                    {item.q}
                  </p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#71717A", lineHeight: 1.65 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA banner ───────────────────────────────────────────────────── */}
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
              className="px-6 md:px-12 py-16 md:py-20"
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
                  style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}
                >
                  The cheapest object storage in Europe.
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>
                  $4.99/TB, no egress fees, up and running in minutes.
                </p>
                <div className="flex items-center justify-center">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark">
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
