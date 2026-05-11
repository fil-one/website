import { useState, useRef } from "react";
import { useInView } from "@/hooks/useInView";

const MIN_TB = 1;
const MAX_TB = 1000;
const PRESETS = [1, 10, 50, 100, 500, 1000];

// $/TB/month — storage-only, published list prices as of 2025
const PROVIDERS: { name: string; pricePerTB: number; egress?: boolean }[] = [
  { name: "Fil One",       pricePerTB: 4.99 },
  { name: "Backblaze B2",  pricePerTB: 6.95 },
  { name: "Wasabi",        pricePerTB: 6.99 },
  { name: "Cloudflare R2", pricePerTB: 15.36 },
  { name: "Azure Blob",    pricePerTB: 18.43,  egress: true },
  { name: "Google Cloud",  pricePerTB: 20.48,  egress: true },
  { name: "AWS S3",        pricePerTB: 23.55,  egress: true },
];

const fmtMo = (n: number) => {
  if (n >= 10000) return `$${Math.round(n / 1000)}k`;
  if (n >= 1000)  return `$${(n / 1000).toFixed(1)}k`;
  return `$${n.toFixed(2)}`;
};

const fmtYr = (n: number) => {
  const yr = n * 12;
  if (yr >= 10000) return `$${Math.round(yr / 1000)}k/yr`;
  return `$${Math.round(yr).toLocaleString()}/yr`;
};

const fmtSavings = (n: number) => {
  const yr = n * 12;
  if (yr >= 10000) return `$${Math.round(yr / 1000)}k`;
  return `$${Math.round(yr).toLocaleString()}`;
};

const displayTB = (n: number) =>
  n >= 1000
    ? `${n / 1000 === Math.floor(n / 1000) ? n / 1000 : (n / 1000).toFixed(1)} PB`
    : `${n} TB`;

const mono: React.CSSProperties = { fontFamily: "'DM Mono', monospace" };
const sans: React.CSSProperties = { fontFamily: "'Funnel Sans', sans-serif" };
const display: React.CSSProperties = { fontFamily: "'Aspekta', sans-serif" };

export default function StorageCalculatorSection() {
  const [tb, setTb] = useState(1);
  const [inputVal, setInputVal] = useState("1");
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setInputVal(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= MIN_TB && num <= MAX_TB) {
      setTb(num);
    }
  };

  const handleInputBlur = () => {
    setInputFocused(false);
    const num = parseInt(inputVal, 10);
    if (isNaN(num) || num < MIN_TB) {
      setTb(MIN_TB);
      setInputVal(String(MIN_TB));
    } else if (num > MAX_TB) {
      setTb(MAX_TB);
      setInputVal(String(MAX_TB));
    } else {
      setInputVal(String(num));
    }
  };

  const handlePreset = (v: number) => {
    setTb(v);
    setInputVal(String(v));
  };

  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: bodyRef,    inView: bodyInView    } = useInView({ threshold: 0.02 });

  const filoneMo     = PROVIDERS[0].pricePerTB * tb;
  const maxMo        = PROVIDERS[PROVIDERS.length - 1].pricePerTB * tb;
  const savingsVsAWS = (PROVIDERS[PROVIDERS.length - 1].pricePerTB - PROVIDERS[0].pricePerTB) * tb;

  const sliderPct = ((tb - MIN_TB) / (MAX_TB - MIN_TB)) * 100;
  const sliderBg  = `linear-gradient(to right, #0090FF ${sliderPct}%, #DCDCDE ${sliderPct}%)`;

  return (
    <section
      id="calculator"
      className="flex flex-col items-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* ── Heading ── */}
      <div
        ref={headingRef}
        className={`flex flex-col gap-3 items-center text-center w-full max-w-[560px] mb-12 reveal${headingInView ? " in-view" : ""}`}
      >
        <span
          aria-hidden="true"
          style={{ ...mono, fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#52525B", textTransform: "uppercase" }}
        >
          Calculator
        </span>
        <h2
          className="text-[26px] md:text-[32px]"
          style={{ ...display, fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#09090B" }}
        >
          How much could you save?
        </h2>
        <p style={{ ...sans, fontWeight: 400, fontSize: 16, lineHeight: 1.6, color: "#52525B" }}>
          With Fil One there are no egress fees and no hidden costs.
        </p>
      </div>

      {/* ── Body ── */}
      <div
        ref={bodyRef}
        className={`w-full max-w-[680px] flex flex-col gap-5 reveal${bodyInView ? " in-view" : ""}`}
      >

        {/* ── Input controls — no card ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Custom number input — right-aligned above slider */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                border: `1.5px solid ${inputFocused ? "#0090FF" : "#C4C4C8"}`,
                borderRadius: 8,
                padding: "4px 8px 4px 10px",
                boxShadow: inputFocused ? "0 0 0 3px rgba(0,144,255,0.12)" : "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
                cursor: "text",
              }}
              onClick={() => inputRef.current?.focus()}
            >
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                value={inputFocused ? inputVal : String(tb)}
                onChange={handleInputChange}
                onFocus={() => { setInputFocused(true); setInputVal(String(tb)); }}
                onBlur={handleInputBlur}
                aria-label="Storage amount in TB"
                style={{
                  ...sans,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#09090B",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  width: 40,
                  textAlign: "right",
                  padding: 0,
                  cursor: "text",
                }}
              />
              <span style={{ ...sans, fontSize: 12, color: "#71717A", marginLeft: 4, whiteSpace: "nowrap" }}>TB</span>
            </div>
          </div>

          {/* Slider */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <input
              type="range"
              className="calc-slider"
              min={MIN_TB}
              max={MAX_TB}
              step={1}
              value={tb}
              onChange={(e) => { const v = Number(e.target.value); setTb(v); setInputVal(String(v)); }}
              aria-label={`Storage amount: ${displayTB(tb)} per month`}
              aria-valuemin={MIN_TB}
              aria-valuemax={MAX_TB}
              aria-valuenow={tb}
              style={{ background: sliderBg }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ ...mono, fontSize: 10.5, color: "#52525B" }}>1 TB</span>
              <span style={{ ...mono, fontSize: 10.5, color: "#52525B" }}>1,000 TB</span>
            </div>
          </div>
        </div>

        {/* ── Comparison chart ── */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.10)",
            borderRadius: 20,
            overflow: "hidden",
            marginTop: 4,
          }}
        >
          {/* Fil One row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "20px 24px",
              backgroundColor: "rgba(0,144,255,0.05)",
              borderBottom: "1px solid rgba(0,144,255,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0, minWidth: 110 }}>
              <span style={{ ...sans, fontWeight: 600, fontSize: 14, color: "#09090B", whiteSpace: "nowrap" }}>
                Fil One
              </span>
              {/* Badge: dark blue text on light blue bg — passes contrast */}
              <span
                style={{
                  ...mono, fontSize: 9.5, letterSpacing: "0.05em", textTransform: "uppercase",
                  color: "#0055CC", backgroundColor: "rgba(0,144,255,0.12)",
                  borderRadius: 4, padding: "2px 5px", whiteSpace: "nowrap",
                }}
              >
                your plan
              </span>
            </div>
            <div style={{ flex: 1, height: 6, backgroundColor: "rgba(0,144,255,0.15)", borderRadius: 99, overflow: "hidden", minWidth: 20 }}>
              <div
                style={{
                  height: "100%",
                  width: `${(filoneMo / maxMo) * 100}%`,
                  minWidth: 4,
                  background: "linear-gradient(90deg, #1EBFFF, #0090FF)",
                  borderRadius: 99,
                  transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <span style={{ ...sans, fontWeight: 600, fontSize: 15, color: "#0055CC", whiteSpace: "nowrap" }}>
                {fmtMo(filoneMo)}/mo
              </span>
              <div style={{ ...sans, fontSize: 11.5, color: "#52525B", marginTop: 1, whiteSpace: "nowrap" }}>
                {fmtYr(filoneMo)}
              </div>
            </div>
          </div>

          {/* Competitor rows */}
          {PROVIDERS.slice(1).map((p, i) => {
            const mo      = p.pricePerTB * tb;
            const barPct  = (mo / maxMo) * 100;
            const pctMore = Math.round(((mo - filoneMo) / filoneMo) * 100);
            const isLast  = i === PROVIDERS.length - 2;

            return (
              <div
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "18px 24px",
                  borderBottom: isLast ? "none" : "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ flexShrink: 0, minWidth: 110 }}>
                  <span style={{ ...sans, fontWeight: 500, fontSize: 13.5, color: "#3F3F46", whiteSpace: "nowrap" }}>
                    {p.name}
                  </span>
                </div>
                <div style={{ flex: 1, height: 6, backgroundColor: "#E8E8EA", borderRadius: 99, overflow: "hidden", minWidth: 20 }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${barPct}%`,
                      minWidth: 4,
                      backgroundColor: "#A1A1AA",
                      borderRadius: 99,
                      transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                    <span style={{ ...sans, fontWeight: 400, fontSize: 13.5, color: "#3F3F46", whiteSpace: "nowrap" }}>
                      {fmtMo(mo)}/mo
                    </span>
                    {p.egress && (
                      <span style={{
                        ...sans,
                        fontSize: 10,
                        fontWeight: 500,
                        color: "#52525B",
                        backgroundColor: "#E4E4E7",
                        borderRadius: 4,
                        padding: "1px 5px",
                        whiteSpace: "nowrap",
                      }}>
                        + egress
                      </span>
                    )}
                  </div>
                  <div style={{ ...mono, fontSize: 10, color: "#71717A", marginTop: 1, whiteSpace: "nowrap" }}>
                    +{pctMore}% vs Fil One
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footnote ── */}
        <p style={{ ...sans, fontSize: 12, color: "#52525B", lineHeight: 1.6, padding: "0 4px" }}>
          Estimates based on published list prices (2025), first-tier rates. Does not include egress,
          API request, or retrieval fees — which can significantly increase costs for AWS, GCP, and Azure.
        </p>

        {/* ── Savings CTA ── */}
        <div
          className="flex flex-col items-center gap-5"
          style={{ paddingTop: 44, textAlign: "center" }}
        >
          <p
            className="text-[15px] md:text-[17px]"
            style={{ ...sans, fontWeight: 400, color: "#52525B", lineHeight: 1.5, maxWidth: 480 }}
          >
            Switch to Fil One and save at least{" "}
            <span style={{ color: "#0055CC", fontWeight: 700 }}>
              {fmtSavings(savingsVsAWS)}/year
            </span>{" "}
            vs AWS S3.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
              <span className="btn-primary-inner">Try 30 days for free</span>
            </a>
            <a href="/contact-sales" className="btn-secondary">Contact sales</a>
          </div>
        </div>

      </div>
    </section>
  );
}
