import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Check } from "@phosphor-icons/react";
import { CITY_MAP } from "@/data/adsCities";
import { useSeo } from "@/hooks/useSeo";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import filOneLogo from "../assets/fil-one-logo.svg";
import NotFound from "./NotFound";
import { trackCtaClick } from "@/lib/analytics";

// ─── Grid texture (matches Index.tsx hero) ────────────────────────────────────

const GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.09" stroke-width="1"/></svg>'
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

const AdsNavbar = ({ loginLabel, signupLabel }: { loginLabel: string; signupLabel: string }) => (
  <nav
    className="fixed top-0 left-0 right-0 z-50 border-b"
    style={{
      backgroundColor: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderColor: "rgba(0,0,0,0.06)",
    }}
  >
    <div className="flex items-center justify-between px-5 md:px-8 h-[58px] max-w-[1120px] mx-auto w-full">
      <a href="/" style={{ textDecoration: "none" }}>
        <img src={filOneLogo} alt="Fil One" style={{ height: 20, width: "auto", display: "block" }} />
      </a>
      <div className="flex items-center gap-2.5">
        <a href="https://app.fil.one/login" className="btn-secondary" onClick={() => trackCtaClick(loginLabel, "https://app.fil.one/login", "secondary")}>{loginLabel}</a>
        <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-sm" onClick={() => trackCtaClick(signupLabel, "https://app.fil.one/login?screen_hint=signup", "primary")}>
          <span className="btn-primary-inner">{signupLabel}</span>
        </a>
      </div>
    </div>
  </nav>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const AdsFooter = ({ privacyLabel, termsLabel }: { privacyLabel: string; termsLabel: string }) => (
  <footer className="px-5 md:px-8 py-6 border-t w-full" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
    <div className="max-w-[1120px] mx-auto w-full flex items-center justify-between flex-wrap gap-3">
      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12, color: "#71717A" }}>
        © 2026 Fil One. All rights reserved.
      </p>
      <div className="flex items-center gap-5">
        {[{ label: privacyLabel, href: "/privacy" }, { label: termsLabel, href: "/terms" }].map(({ label, href }) => (
          <a key={href} href={href}
            style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12, color: "#71717A", textDecoration: "none" }}
            className="hover:text-[#09090B] transition-colors duration-150"
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── Mono label (PRECIO / TB / MES style) ─────────────────────────────────────

const MonoLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontFamily: "'DM Mono', monospace",
    fontWeight: 500,
    fontSize: 10.5,
    letterSpacing: "0.07em",
    color: "#71717A",  // 4.83:1 on white ✓ (was #A1A1AA 2.56:1 ✗)
    textTransform: "uppercase" as const,
  }}>
    {children}
  </span>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const AdsLandingPage = () => {
  const { heroEndRef } = useScrollTracking();
  const { lang, city } = useParams<{ lang: string; city: string }>();
  const config = CITY_MAP[lang ?? ""]?.[city ?? ""];

  useEffect(() => {
    if (config?.lang) document.documentElement.lang = config.lang;
    return () => { document.documentElement.lang = "en"; };
  }, [config?.lang]);

  useSeo(
    config
      ? { title: config.seoTitle, description: config.seoDescription, canonical: config.canonical }
      : { title: "Not Found — Fil One", description: "", canonical: "https://fil.one" }
  );

  if (!config) return <NotFound />;

  const {
    loginLabel, signupLabel,
    eyebrow, headline, subheadline, ctaLabel, ctaTagline, contactSalesLabel,
    priceRowLabel, rttRowLabel, bestPriceLabel,
    filoneLocation, scalewayLocation, backblazeLocation, wasabiLocation,
    filonePrice, scalewayPrice, backblazePrice, wasabiPrice,
    featuredCity, hereLabel, latencyRows, speedClaim, tableCtaLabel,
    featuresSectionLabel, features,
    privacyLabel, termsLabel,
  } = config;

  // Shared column layout: row label col + 4 provider cols
  const gridCols = "minmax(130px, 1.8fr) 1fr 1fr 1fr 1fr";

  // Light blue tint + side borders for Fil One column cells
  const filoneCellBg = "#EFF8FF";
  const filoneSideBorder = "1px solid rgba(0,112,204,0.12)";
  // Horizontal dividers inside the Fil One column (slightly lighter than side borders)
  const filoneRowDivider = "1px solid rgba(0,112,204,0.08)";
  const rowBorder = "1px solid rgba(0,0,0,0.06)";

  const providerHeaders = [
    { name: "Fil One",   location: filoneLocation,    isFilOne: true  },
    { name: "Scaleway",  location: scalewayLocation,  isFilOne: false },
    { name: "Backblaze", location: backblazeLocation, isFilOne: false },
    { name: "Wasabi",    location: wasabiLocation,    isFilOne: false },
  ];

  const providerPrices = [filonePrice, scalewayPrice, backblazePrice, wasabiPrice];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <AdsNavbar loginLabel={loginLabel} signupLabel={signupLabel} />

      {/* ── Hero + Table — unified white section with grid texture ── */}
      <div className="relative isolate pt-[58px]" style={{ backgroundColor: "#FFFFFF" }}>
        {/* Grid texture — same as Index.tsx */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
            backgroundSize: "60px 60px",
            backgroundPosition: "center top",
            maskImage:
              "radial-gradient(ellipse 80% 55% at 50% 0%, black 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 60%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 55% at 50% 0%, black 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 60%, transparent 75%)",
          }}
        />

        {/* Hero text */}
        <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-16 md:pb-20">
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 11.5,
            letterSpacing: "0.08em",
            color: "#71717A",
            textTransform: "uppercase",
          }}>
            {eyebrow}
          </span>

          <h1
            className="text-[26px] sm:text-[34px] md:text-[44px]"
            style={{
              fontFamily: "'Aspekta', sans-serif",
              fontWeight: 500,
              lineHeight: "1.12",
              letterSpacing: "-0.02em",
              color: "#09090B",
              textAlign: "center",
              maxWidth: 620,
              margin: 0,
            }}
          >
            {headline}
          </h1>

          <p
            className="text-[15px] md:text-[16.5px]"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              lineHeight: "1.65",
              color: "#71717A",
              textAlign: "center",
              maxWidth: 440,
              margin: 0,
            }}
          >
            {subheadline}
          </p>

          <div className="flex flex-col items-center gap-3 mt-2">
            <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary" onClick={() => trackCtaClick(ctaLabel, "https://app.fil.one/login?screen_hint=signup", "primary")}>
              <span className="btn-primary-inner">{ctaLabel}</span>
            </a>
            <p style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#71717A",
              textAlign: "center",
            }}>
              {ctaTagline}
            </p>
          </div>
        </div>

        {/* ── Comparison table — flows directly from hero ── */}
        <div className="overflow-x-auto px-5 md:px-8 pb-20 md:pb-28">
          <div
            style={{ minWidth: 560, maxWidth: 960, margin: "0 auto" }}
            role="table"
            aria-label={rttRowLabel}
          >

            {/* ── Column headers ── */}
            <div role="rowgroup">
              <div role="row" className="grid" style={{ gridTemplateColumns: gridCols }}>
                <div role="columnheader" />
                {providerHeaders.map(({ name, location, isFilOne }) => (
                  <div
                    key={name}
                    role="columnheader"
                    className="px-4 py-4 flex flex-col items-center justify-center gap-0.5"
                    style={{
                      backgroundColor: isFilOne ? filoneCellBg : "transparent",
                      borderLeft: isFilOne ? filoneSideBorder : undefined,
                      borderRight: isFilOne ? filoneSideBorder : undefined,
                      borderTop: isFilOne ? filoneSideBorder : undefined,
                      borderRadius: isFilOne ? "10px 10px 0 0" : undefined,
                    }}
                  >
                    <span style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: isFilOne ? 700 : 500,
                      fontSize: 13.5,
                      color: isFilOne ? "#0070CC" : "#09090B",
                      letterSpacing: "-0.01em",
                    }}>
                      {name}
                    </span>
                    <span style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 11.5,
                      color: "#71717A",  // 4.83:1 on white ✓ (was #A1A1AA 2.56:1 ✗)
                    }}>
                      {location}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Price row ── */}
            <div role="rowgroup">
              <div role="row" className="grid" style={{ gridTemplateColumns: gridCols }}>
                <div
                  role="rowheader"
                  className="px-3 py-3.5 flex items-center"
                  style={{ borderTop: rowBorder }}
                >
                  <MonoLabel>{priceRowLabel}</MonoLabel>
                </div>
                {providerPrices.map((price, i) => {
                  const isFilOne = i === 0;
                  return (
                    <div
                      key={i}
                      role="cell"
                      className={`px-4 py-3.5 flex items-center justify-center ${isFilOne ? "flex-col gap-0.5" : ""}`}
                      style={{
                        backgroundColor: isFilOne ? filoneCellBg : "transparent",
                        borderLeft: isFilOne ? filoneSideBorder : undefined,
                        borderRight: isFilOne ? filoneSideBorder : undefined,
                        borderTop: isFilOne ? filoneRowDivider : rowBorder,
                      }}
                    >
                      <span style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: isFilOne ? 700 : 500,
                        fontSize: 13.5,
                        color: isFilOne ? "#0070CC" : "#52525B",
                      }}>
                        {price}
                      </span>
                      {isFilOne && (
                        <span
                          style={{
                            fontFamily: "'Funnel Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: 10.5,
                            color: "#059669",
                            backgroundColor: "#ECFDF5",
                            border: "1px solid rgba(5,150,105,0.30)",
                            borderRadius: 999,
                            padding: "2px 8px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {bestPriceLabel}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Latency rows ── */}
            <div role="rowgroup">
              {latencyRows.map((row, rowIndex) => {
                const isFeatured = row.city === featuredCity;
                const isLastRow = rowIndex === latencyRows.length - 1;
                const vals = [row.filone, row.scaleway, row.backblaze, row.wasabi];
                return (
                  <div
                    key={row.city}
                    role="row"
                    className="grid"
                    style={{ gridTemplateColumns: gridCols }}
                  >
                    {/* City label */}
                    <div
                      role="rowheader"
                      className="px-3 py-3.5 flex items-center gap-2"
                      style={{ borderTop: rowBorder }}
                    >
                      <span style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: isFeatured ? 700 : 400,
                        fontSize: 13.5,
                        color: "#09090B",
                      }}>
                        {row.city}
                      </span>
                      {isFeatured && (
                        <span style={{
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 500,
                          fontSize: 9.5,
                          letterSpacing: "0.06em",
                          color: "#0070CC",
                          backgroundColor: "#EFF8FF",
                          border: "1px solid rgba(0,112,204,0.2)",
                          borderRadius: 999,
                          padding: "2px 7px",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}>
                          {hereLabel}
                        </span>
                      )}
                    </div>

                    {/* Provider cells */}
                    {vals.map((val, j) => {
                      const isFilOne = j === 0;
                      return (
                        <div
                          key={j}
                          role="cell"
                          className="px-4 py-3.5 flex items-center justify-center"
                          style={{
                            backgroundColor: isFilOne ? filoneCellBg : "transparent",
                            borderLeft: isFilOne ? filoneSideBorder : undefined,
                            borderRight: isFilOne ? filoneSideBorder : undefined,
                            borderTop: isFilOne ? filoneRowDivider : rowBorder,
                            borderBottom: isFilOne && isLastRow ? filoneSideBorder : undefined,
                            borderRadius: isFilOne && isLastRow ? "0 0 10px 10px" : undefined,
                          }}
                        >
                          <div className={isFilOne && isFeatured ? "flex flex-col items-center gap-0.5" : ""}>
                            <span style={{
                              fontFamily: "'Funnel Sans', sans-serif",
                              fontWeight: isFilOne ? 600 : 400,
                              fontSize: 13.5,
                              // competitor values: #52525B = 7.32:1 on white ✓
                              color: isFilOne ? "#0070CC" : "#52525B",
                            }}>
                              {val} ms
                            </span>
                            {isFilOne && isFeatured && (
                              <span style={{
                                fontFamily: "'Funnel Sans', sans-serif",
                                fontWeight: 500,
                                fontSize: 10.5,
                                color: "#059669",
                                backgroundColor: "#ECFDF5",
                                border: "1px solid rgba(5,150,105,0.30)",
                                borderRadius: 999,
                                padding: "2px 8px",
                                whiteSpace: "nowrap",
                              }}>
                                {speedClaim}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* ── Why Fil One — simple checklist ── */}
      <div ref={heroEndRef}>
      <section
        className="flex flex-col items-center px-5 md:px-8 pt-10 md:pt-14 pb-16 md:pb-24"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="flex flex-col items-center gap-8 max-w-[720px] mx-auto">

          <span aria-hidden="true" style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "#71717A",  // 4.83:1 on white ✓ (was #A1A1AA 2.56:1 ✗)
            textTransform: "uppercase",
          }}>
            {featuresSectionLabel}
          </span>

          <ul className="flex flex-col gap-4" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {features.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  size={16}
                  weight="bold"
                  color="#0090FF"
                  style={{ marginTop: 2, flexShrink: 0 }}
                />
                <span style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 15,
                  lineHeight: "1.5",
                  color: "#09090B",
                  textAlign: "left",
                }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary" onClick={() => trackCtaClick(ctaLabel, "https://app.fil.one/login?screen_hint=signup", "primary")}>
                <span className="btn-primary-inner">{ctaLabel}</span>
              </a>
              <a href="/contact-sales" className="btn-secondary" onClick={() => trackCtaClick(contactSalesLabel, "/contact-sales", "secondary")}>
                {contactSalesLabel}
              </a>
            </div>
            <p style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#71717A",
              textAlign: "center",
            }}>
              {ctaTagline}
            </p>
          </div>
        </div>
      </section>
      </div>

      <AdsFooter privacyLabel={privacyLabel} termsLabel={termsLabel} />
    </div>
  );
};

export default AdsLandingPage;
