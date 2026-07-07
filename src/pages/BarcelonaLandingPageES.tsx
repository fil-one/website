import { Plug, ArrowsOut, ShieldCheck, Lock, MapPin, Rocket } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';

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

// ─── Integrations ──────────────────────────────────────────────────────────────
const INTEGRATIONS = [
  "Iconik", "LucidLink", "Veeam", "Rclone", "Restic",
  "MSP360", "Premiere", "DaVinci Resolve", "Hugging Face",
  "PyTorch", "Arq", "Duplicati",
];

// ─── Page ──────────────────────────────────────────────────────────────────────
const BarcelonaLandingPageES = () => {
  useSeo({
    title: "Fil One para Barcelona: Almacenamiento Europeo, €4.99/TB, Sin Egress",
    description:
      "Almacenamiento de objetos compatible con S3 para equipos en Barcelona. Soberanía de datos en la UE, cero comisiones de egress, a €4.99/TB. Intégralo en tu stack actual en minutos.",
    canonical: "https://fil.one/lp/es/barcelona",
  });

  const { ref: posRef,          inView: posInView          } = useInView({ threshold: 0.05 });
  const { ref: pricingRef,      inView: pricingInView      } = useInView({ threshold: 0.05 });
  const { ref: featuresRef,     inView: featuresInView     } = useInView({ threshold: 0.05 });
  const { ref: integrationsRef, inView: integrationsInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,          inView: ctaInView          } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar lang="es" supportHref="/lp/es/soporte" contactSalesHref="/lp/es/contacto" />

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
              Almacenamiento europeo.<br /><span style={{ color: "#0090FF" }}>4,99 €/TB, sin cargos por tráfico de salida.</span>
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
              Almacenamiento de objetos compatible con S3 que mantiene tus datos en Europa. Funciona con las herramientas que ya utilizas, sin necesidad de migraciones.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-lg btn-primary-glow">
                <span className="btn-primary-inner">Prueba gratis por 30 días</span>
              </a>
            </div>

          </div>
        </section>

        {/* ── Publications / Social proof ──────────────────────────────────── */}
        <section className="flex flex-col items-center gap-12 px-5 pt-8 md:pt-10 pb-16 md:pb-20 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col items-center gap-4 w-full">
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, color: "rgb(113, 113, 122)" }}>
              Nuestra tecnología ha sido destacada en
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
              <SectionLabel>Por qué Fil One</SectionLabel>
              <SectionHeading>Un coste <span style={{ color: "#0090FF" }}>imbatible</span></SectionHeading>
              <SectionSub maxWidth={320}>
                Compatible con S3, soberanía de datos en la UE y sin cargos por tráfico de salida. Sin costes ocultos ni sorpresas.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full flex-1">
              {[
                { stat: "€4.99/TB", label: "Precio fijo mensual" },
                { stat: "€0", label: "Costes de salida" },
                { stat: "20×", label: "Más barato que AWS" },
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
              <SectionLabel>Precios</SectionLabel>
              <SectionHeading>Tu factura mensual, <span style={{ color: "#0090FF" }}>de cuatro formas</span></SectionHeading>
              <SectionSub maxWidth={600}>
                Un equipo de 10 TB en Barcelona, con 10 TB de tráfico de salida al mes y con 500.000 operaciones de objetos.
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
                        Tú
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-y-2" style={{ fontSize: 14 }}>
                    <span style={{ color: "#71717A" }}>Región</span>
                    <span style={{ textAlign: "right", color: "#52525B" }}>{row.region}</span>
                    <span style={{ color: "#71717A" }}>Almacenamiento</span>
                    <span style={{ textAlign: "right", color: "#09090B" }}>{row.storage}</span>
                    <span style={{ color: "#71717A" }}>Egress</span>
                    <span style={{ textAlign: "right", color: row.isFilOne ? "#09090B" : valueColor(row.egress) }}>{row.egress}</span>
                    <span style={{ color: "#71717A" }}>API / ops</span>
                    <span style={{ textAlign: "right", color: row.isFilOne ? "#09090B" : valueColor(row.api) }}>{row.api}</span>
                    <span style={{ color: "#71717A", fontWeight: 600, paddingTop: 8, borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: 4 }}>Total / mes</span>
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
                    {["Proveedor", "Región", "Almacenamiento", "Egress", "API / ops", "Total / mes"].map((h) => (
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
                            Tú
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
              Los precios de la competencia se han convertido de USD utilizando el tipo de cambio de €1 = $1.17 (Tipo de cambio ECB, Mayo 2026). Fil One tiene un precio nativo en euros de 4.99 €/TB.
            </p>

            {/* Mid-page CTA after pricing table */}
            <div className="flex items-center justify-center mt-4">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Prueba gratis por 30 días</span>
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
                Funcionalidades
              </span>
              <h2
                className="text-[24px] md:text-[34px]"
                style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.2", letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}
              >
                El <span style={{ color: "#0090FF" }}>S3 que esperabas</span>
              </h2>
              <p
                className="text-[15px] md:text-[17px]"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", maxWidth: 560, margin: 0 }}
              >
                Compatible con todo lo que tu equipo ya utiliza.
              </p>
            </div>
            <div
              ref={featuresRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group reveal${featuresInView ? " in-view" : ""}`}
            >
              {[
                { icon: Plug,        title: "Compatibilidad inmediata con S3",  desc: "La misma API, los mismos SDKs y herramientas. Conecta tu flujo a nuestro endpoint y sigue trabajando." },
                { icon: ArrowsOut,   title: "Sin cargos por tráfico de salida", desc: "Cada lectura es gratis, así que tu factura se mantiene plana sin importar cuánto uses el servicio." },
                { icon: ShieldCheck, title: "Once nueves de durabilidad",       desc: "99,999999999% de durabilidad, replicada en varias ubicaciones y monitorizada permanentemente." },
                { icon: Lock,        title: "Object Lock y versionado",         desc: "Modos de cumplimiento, periodos de retención y registros de auditoría a prueba de manipulación." },
                { icon: MapPin,      title: "Tus datos nunca salen de la UE",   desc: "La infraestructura de almacenamiento permanece dentro de las fronteras europeas." },
                { icon: Rocket,      title: "Listo en cuestión de minutos",     desc: "Genera tus claves de acceso, configura tus herramientas existentes para que apunten a nuestro endpoint y empieza a subir datos." },
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
        <section
          id="integrations"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={integrationsRef}
            className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${integrationsInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Integraciones</SectionLabel>
              <SectionHeading>Funciona con tu <span style={{ color: "#0090FF" }}>stack actual</span></SectionHeading>
              <SectionSub maxWidth={440}>
                Compatible con la API de S3. Si funciona con AWS, funciona con nosotros.
              </SectionSub>
            </div>

            <div className="marquee-mask w-full overflow-hidden">
              <div className="marquee-track marquee-track-slow flex items-center w-max" style={{ gap: 12 }}>
                {[0, 1].map((copy) => (
                  <div key={copy} style={{ display: "flex", gap: 12 }} aria-hidden={copy === 1}>
                    {INTEGRATIONS.map((name) => (
                      <div
                        key={name}
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid rgba(0,0,0,0.09)",
                          borderRadius: 10,
                          padding: "14px 26px",
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: 16.5,
                          color: "#374151",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://docs.fil.one"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Ver la documentación →
            </a>
          </div>
        </section>

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
                    maxWidth: 620,
                    margin: "0 auto 12px",
                  }}
                >
                  El almacenamiento de objetos más económico de Europa
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
                  4,99 €/TB, sin costes de salida y listo para usar en minutos.
                </p>

                <div className="flex items-center justify-center">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark btn-primary-lg btn-primary-glow">
                    <span className="btn-primary-inner">Prueba gratis por 30 días</span>
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
                  No se requiere tarjeta de crédito.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang="es" />
    </div>
  );
};

export default BarcelonaLandingPageES;
