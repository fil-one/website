import { Check, Plug, ArrowsOut, Globe, ShieldCheck, Lock, ChartLine } from "@phosphor-icons/react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";

const GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="1"/></svg>'
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span
    aria-hidden="true"
    style={{
      fontFamily: "'DM Mono', monospace",
      fontWeight: 500,
      fontSize: 11.5,
      letterSpacing: "0.08em",
      color: "#71717A",
      textTransform: "uppercase" as const,
    }}
  >
    {children}
  </span>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="text-[24px] md:text-[34px]"
    style={{
      fontFamily: "'Aspekta', sans-serif",
      fontWeight: 500,
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
      color: "#09090B",
      margin: 0,
    }}
  >
    {children}
  </h2>
);

const SectionSub = ({ children, maxWidth = 560 }: { children: React.ReactNode; maxWidth?: number }) => (
  <p
    className="text-[15px] md:text-[17px]"
    style={{
      fontFamily: "'Funnel Sans', sans-serif",
      fontWeight: 400,
      lineHeight: "1.65",
      color: "#71717A",
      maxWidth,
      margin: 0,
    }}
  >
    {children}
  </p>
);

const ScatterChart = () => (
  <div
    style={{
      border: "1px solid rgba(0,0,0,0.07)",
      borderRadius: 16,
      padding: "20px 0 0",
      backgroundColor: "#FFFFFF",
      overflowX: "auto",
    }}
  >
    <svg
      viewBox="0 0 1000 548"
      style={{ width: "100%", minWidth: 560, display: "block" }}
      role="img"
      aria-label="Gráfico de dispersión: Fil One está por encima de la frontera coste-rendimiento — mayor rendimiento al menor coste"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="filoneHaloES" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0090FF" stopOpacity="0.3" />
          <stop offset="55%"  stopColor="#0090FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0090FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="filoneZoneES" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#0090FF" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#0090FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d="M 100 80 L 300 80 L 300 240 L 100 240 Z" fill="url(#filoneZoneES)" />

      <line x1="100" y1="80"  x2="100" y2="440" stroke="#E2E8F0" strokeWidth="1" />
      <line x1="100" y1="440" x2="940" y2="440" stroke="#E2E8F0" strokeWidth="1" />

      <line x1="100" y1="350" x2="940" y2="350" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="100" y1="260" x2="940" y2="260" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="100" y1="170" x2="940" y2="170" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />

      <line x1="242" y1="80" x2="242" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="430" y1="80" x2="430" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="572" y1="80" x2="572" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />
      <line x1="714" y1="80" x2="714" y2="440" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,6" />

      <text x="100" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€5</text>
      <text x="242" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€10</text>
      <text x="430" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€25</text>
      <text x="572" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€50</text>
      <text x="714" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€100</text>
      <text x="940" y="462" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit">€300</text>

      <text x="88" y="444" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">0</text>
      <text x="88" y="354" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">100</text>
      <text x="88" y="264" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">200</text>
      <text x="88" y="174" textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">300</text>
      <text x="88" y="84"  textAnchor="end" fill="#94a3b8" fontSize="12" fontFamily="inherit">400</text>

      <text x="520" y="500" textAnchor="middle" fill="#475569" fontSize="14" fontFamily="inherit" fontWeight="600">
        Coste total por TB en € (almacenamiento + egreso)
      </text>
      <text x="520" y="518" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="inherit">
        10 TB almacenados · 10 TB de egreso · cliente de Barcelona
      </text>
      <text x="32" y="260" textAnchor="middle" fill="#475569" fontSize="14" fontFamily="inherit" fontWeight="600"
        transform="rotate(-90 32 260)">
        Rendimiento sostenido (MB/s)
      </text>

      <text x="180" y="410" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="inherit"
        fontWeight="600" letterSpacing="1" style={{ textTransform: "uppercase" as const }}>
        Gama económica
      </text>
      <text x="370" y="410" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="inherit"
        fontWeight="600" letterSpacing="1" style={{ textTransform: "uppercase" as const }}>
        Gama media
      </text>
      <text x="760" y="120" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="inherit"
        fontWeight="600" letterSpacing="1" style={{ textTransform: "uppercase" as const }}>
        Gama hiperescalador
      </text>

      <path
        d="M 168,332 L 169,314 L 325,224 L 729,242 L 743,215 L 787,215"
        stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="8,5" fill="none"
      />
      <text x="600" y="258" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="inherit" fontStyle="italic">
        Frontera coste-rendimiento
      </text>

      <circle cx="168" cy="332" r="9" fill="#94a3b8" />

      <circle cx="169" cy="314" r="9" fill="#94a3b8" />
      <text x="192" y="308" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Wasabi</text>
      <text x="192" y="322" fill="#64748b" fontSize="11" fontFamily="inherit">París</text>
      <text x="192" y="342" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Backblaze B2</text>
      <text x="192" y="356" fill="#64748b" fontSize="11" fontFamily="inherit">Ámsterdam</text>

      <circle cx="325" cy="224" r="9" fill="#94a3b8" />
      <text x="348" y="221" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Cloudflare R2</text>
      <text x="348" y="235" fill="#64748b" fontSize="11" fontFamily="inherit">Global edge</text>

      <circle cx="729" cy="242" r="11" fill="#64748b" />
      <text x="742" y="262" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Azure Blob</text>
      <text x="742" y="276" fill="#64748b" fontSize="11" fontFamily="inherit">Spain Central</text>

      <circle cx="743" cy="215" r="11" fill="#64748b" />
      <text x="743" y="182" textAnchor="middle" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">AWS S3</text>
      <text x="743" y="196" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="inherit">eu-south-2 Madrid</text>

      <circle cx="787" cy="215" r="11" fill="#64748b" />
      <text x="806" y="209" fill="#334155" fontSize="13" fontFamily="inherit" fontWeight="600">Google Cloud</text>
      <text x="806" y="223" fill="#64748b" fontSize="11" fontFamily="inherit">europe-sw1 Madrid</text>

      <circle cx="100" cy="170" r="28" fill="#0090FF" opacity="0.14" />
      <circle cx="100" cy="170" r="18" fill="#0090FF" opacity="0.28" />
      <circle cx="100" cy="170" r="12" fill="#0090FF" />
      <circle cx="100" cy="170" r="5"  fill="#fff" />
      <text x="130" y="162" fill="#0070CC" fontSize="22" fontFamily="inherit" fontWeight="700" letterSpacing="-0.5">Fil One</text>
      <text x="130" y="178" fill="#0090FF" fontSize="13" fontFamily="inherit" fontWeight="500">El más rápido, al menor coste.</text>
    </svg>

    <div style={{
      backgroundColor: "#F4F4F5",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      borderRadius: "0 0 16px 16px",
      padding: "12px 24px",
      marginTop: 0,
    }}>
      <p style={{
        fontFamily: "'Funnel Sans', sans-serif",
        fontSize: 12,
        color: "#52525B",
        lineHeight: 1.6,
        margin: 0,
      }}>
        Cada punto es un proveedor. La posición refleja el coste total por TB (almacenamiento + egreso) para un equipo de 10 TB con 10 TB de egreso mensual, y el rendimiento de lectura paralela sostenida medido desde Barcelona con un cliente S3 paralelo optimizado. El eje de costes es logarítmico.
      </p>
    </div>
  </div>
);

const valueColor = (val: string) => {
  const n = parseFloat(val.replace(/[$€,]/g, ""));
  if (n === 0)  return "#16a34a";
  if (n > 50)   return "#dc2626";
  return "#52525B";
};

const PRICING_ROWS = [
  { provider: "AWS S3 Standard",      region: "eu-south-2 Madrid",          storage: "€197",    egress: "€790",   api: "€1.83", total: "€990",    isFilOne: false },
  { provider: "Google Cloud Storage", region: "europe-southwest1 Madrid",   storage: "€171",    egress: "€1.052", api: "€1.83", total: "€1.226",  isFilOne: false },
  { provider: "Azure Blob",           region: "Spain Central Madrid",        storage: "€178",    egress: "€763",   api: "€1.89", total: "€943",    isFilOne: false },
  { provider: "Wasabi",               region: "eu-west-2 París",            storage: "€59,90",  egress: "€0",     api: "€0",    total: "€59,90",  isFilOne: false },
  { provider: "Backblaze B2",         region: "eu-central-003 Ámsterdam",   storage: "€59,60",  egress: "€0",     api: "€0",    total: "€59,60",  isFilOne: false },
  { provider: "Fil One",              region: "EU-West",                    storage: "€49,90",  egress: "€0",     api: "€0",    total: "€49,90",  isFilOne: true  },
];

const WORKLOADS = [
  {
    tag: "Creativo y media",
    title: "Carga un master de 50 GB en tu NLE",
    desc: "Editores, coloristas y artistas de VFX cargan archivos de proyecto grandes directamente en Premiere, DaVinci Resolve y Nuke. El scrubbing y la reproducción siguen siendo fluidos.",
    stats: [
      { label: "Tiempo de carga", rows: [{ name: "Fil One", val: "7 min", win: true }, { name: "AWS Madrid", val: "7 min", win: false }] },
      { label: "Factura mensual", rows: [{ name: "Fil One", val: "€50", win: true }, { name: "AWS Madrid", val: "€989", win: false }] },
    ],
    speedBadge: "La misma velocidad que ya le gusta a tu equipo",
    savingsBadge: "23× más barato",
  },
  {
    tag: "IA y ML",
    title: "Transmite un dataset de 10 TB, época tras época",
    desc: "Entrenadores de modelos fundacionales, equipos de visión por computador y bucles de fine-tuning. Rendimiento paralelo sostenido en decenas de miles de shards sin sorpresas por límites de velocidad.",
    stats: [
      { label: "Tiempo para transmitir una época completa", rows: [{ name: "Fil One", val: "7 h", win: true }, { name: "AWS Madrid", val: "11 h", win: false }] },
      { label: "Factura mensual a escala de entrenamiento", rows: [{ name: "Fil One", val: "€100", win: true }, { name: "AWS Madrid", val: "€8.278", win: false }] },
    ],
    speedBadge: "Épocas más rápidas. Casi sin factura de infra.",
    savingsBadge: "97× más barato",
  },
  {
    tag: "SaaS y apps de consumo",
    title: "Sirve contenido multimedia sin vigilar el contador",
    desc: "Plataformas de imágenes, herramientas DAM, vaults de documentos, apps de consumo con mucho contenido multimedia. Cada petición de cliente descarga bytes. Cada descarga es gratuita.",
    stats: [
      { label: "Coste para 1M de peticiones de usuarios", rows: [{ name: "Fil One", val: "€0", win: true }, { name: "AWS Madrid", val: "€79", win: false }] },
      { label: "Factura mensual a escala de consumo", rows: [{ name: "Fil One", val: "€25", win: true }, { name: "AWS Madrid", val: "€4.047", win: false }] },
    ],
    speedBadge: "La misma experiencia ágil para tus usuarios.",
    savingsBadge: "189× más barato",
  },
  {
    tag: "Backup y archivo",
    title: "Ingestión a velocidad de línea. Recuperación sin penalización",
    desc: "MSPs, clientes de Veeam y Restic, archivos de fotos, retención de cumplimiento. Object Lock en modo Compliance. La recuperación no cuesta nada.",
    stats: [
      { label: "Tiempo para ingerir 1 TB", rows: [{ name: "Fil One", val: "1,5 h", win: true }, { name: "AWS Madrid", val: "2,2 h", win: false }] },
      { label: "Factura mensual — retención de 50 TB", rows: [{ name: "Fil One", val: "€250", win: true }, { name: "AWS Madrid", val: "€1.064", win: false }] },
    ],
    speedBadge: "Más rápido al entrar. Gratis al salir.",
    savingsBadge: "5× más barato",
  },
];

const INTEGRATIONS = [
  "Iconik", "LucidLink", "Veeam", "Rclone", "Restic",
  "MSP360", "Premiere", "DaVinci Resolve", "Hugging Face",
  "PyTorch", "Arq", "Duplicati",
];

const BarcelonaLandingPageES = () => {
  useSeo({
    title: "Fil One para Barcelona — Velocidad de hiperescalador. Facturas de gama económica.",
    description:
      "Almacenamiento de objetos compatible con S3 para equipos creativos, de IA y SaaS en el sur de Europa. Latencia nativa europea, sin tarifas de egreso, €4,99/TB al mes.",
    canonical: "https://fil.one/lp/es/barcelona",
  });

  const { ref: posRef,          inView: posInView          } = useInView({ threshold: 0.05 });
  const { ref: pricingRef,      inView: pricingInView      } = useInView({ threshold: 0.05 });
  const { ref: featuresRef,     inView: featuresInView     } = useInView({ threshold: 0.05 });
  const { ref: workloadsRef,    inView: workloadsInView    } = useInView({ threshold: 0.05 });
  const { ref: integrationsRef, inView: integrationsInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,          inView: ctaInView          } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <LandingNavbar lang="es" />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="relative isolate pt-[58px]"
          style={{ backgroundColor: "#FFFFFF" }}
        >
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
              backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />

          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            <div
              className="hero-fade-1 flex items-center gap-1.5 text-center"
              style={{
                backgroundColor: "#EFF8FF",
                border: "1px solid rgba(0,144,255,0.2)",
                borderRadius: 14,
                padding: "10px 14px",
                maxWidth: "90vw",
              }}
            >
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 13.5,
                  lineHeight: 1,
                  color: "#0070CC",
                }}
              >
                Para equipos creativos, de IA y SaaS en Barcelona y la Península Ibérica
              </span>
            </div>

            <h1
              className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
                color: "#09090B",
                textAlign: "center",
                maxWidth: 820,
                margin: 0,
              }}
            >
              Velocidad de hiperescalador.<br /><span style={{ color: "#0090FF" }}>Facturas de gama económica.</span>
            </h1>

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
              Fil One es almacenamiento de objetos compatible con S3 diseñado para equipos europeos. Rendimiento de nivel hiperescalador, servido desde infraestructura europea, sin la factura del hiperescalador. Intégralo en tu stack existente en minutos.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Prueba 30 días gratis</span>
              </a>
              <a href="/lp/es/contacto" className="btn-secondary">
                Habla con un experto
              </a>
            </div>

            <p
              className="hero-fade-4"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#71717A",
                textAlign: "center",
              }}
            >
              Sin tarjeta de crédito · Sin tarifas de egreso · Conecta en minutos
            </p>
          </div>
        </section>

        {/* ── Problem ───────────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 py-16 md:py-24 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div className="flex flex-col gap-10 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-4 items-center text-center max-w-[560px] mx-auto">
              <SectionLabel>El problema</SectionLabel>
              <SectionHeading>El almacenamiento en la nube no fue diseñado para equipos de Barcelona.</SectionHeading>
              <SectionSub>
                La mayoría de las opciones de almacenamiento compatibles con S3 tienen precios pensados para grandes empresas globales, no para un estudio en Poblenou, un equipo de IA en el 22@, o una empresa SaaS que sirve a clientes europeos desde una sede en Madrid. Cada alternativa del mercado tiene un problema real.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "Hiperescaladores",
                  title: "Las tarifas de egreso se acumulan en silencio.",
                  body: "AWS, Google Cloud y Azure ganan la conversación de compras por defecto. No porque ofrezcan el mejor valor, sino porque nadie se arriesga eligiéndolos. Un workload de 10 TB en Barcelona sobre AWS eu-south-2 Madrid genera €790 al mes solo en egreso, y la mayoría de los equipos nunca audita esa línea hasta que ya se les ha ido de las manos.",
                  catch: "Fiables, pero la factura no para de crecer.",
                },
                {
                  label: "Alternativas económicas",
                  title: "Rendimiento y cumplimiento en riesgo.",
                  body: "Wasabi y Backblaze cuestan menos que los hiperescaladores en almacenamiento, pero ninguno tiene una región soberana en la UE cerca de ti. Desde Barcelona o Madrid, tu tráfico pasa por París o Ámsterdam. La latencia sube, la postura GDPR se complica, y tus datos quedan fuera de la jurisdicción legal europea.",
                  catch: "Almacenamiento más barato, todo lo demás peor.",
                },
                {
                  label: "No hacer nada",
                  title: "La inercia es la opción más cara.",
                  body: "El almacenamiento se revisa trimestralmente, si acaso. La facturación de AWS es opaca por diseño, cambiar parece arriesgado un martes por la tarde, y comparar benchmarks lleva tiempo que nadie tiene en el calendario. Mientras tanto, el sobrecoste de 23× sigue acumulándose.",
                  catch: "La factura es una línea que nadie gestiona.",
                },
              ].map(({ label, title, body, catch: catchLine }) => (
                <div
                  key={label}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span style={{
                      display: "inline-block",
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#52525B",
                      backgroundColor: "#F4F4F5",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 9999,
                      padding: "3px 10px",
                      marginBottom: 2,
                      alignSelf: "flex-start",
                    }}>
                      {label}
                    </span>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.3", letterSpacing: "-0.01em", color: "#09090B" }}>
                      {catchLine}
                    </p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.65, color: "#71717A", marginTop: 4 }}>
                      {body}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 px-7 py-4"
                    style={{ backgroundColor: "#F4F4F5", borderTop: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <span style={{ color: "#71717A", fontSize: 11, flexShrink: 0 }}>✕</span>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13, color: "#52525B", lineHeight: 1.3 }}>
                      {title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Positioning ───────────────────────────────────────────────────── */}
        <section
          id="posicionamiento"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={posRef}
            className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${posInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Posicionamiento</SectionLabel>
              <SectionHeading>Fuera del tradeoff.</SectionHeading>
              <SectionSub>
                Todas las demás opciones te obligan a elegir entre precio y rendimiento. Fil One no. El gráfico muestra dónde estamos.
              </SectionSub>
            </div>
            <ScatterChart />
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────────────────────── */}
        <section
          id="precios"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            ref={pricingRef}
            className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${pricingInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Precios</SectionLabel>
              <SectionHeading>Tu factura mensual, de seis maneras.</SectionHeading>
              <SectionSub maxWidth={600}>
                Un equipo de 10 TB en Barcelona, con 10 TB de egreso al mes y 500.000 operaciones de objetos.
              </SectionSub>
            </div>

            <div style={{ overflowX: "auto" }}>
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
                    {["Proveedor", "Región", "Almacenamiento", "Egreso", "API / ops", "Total / mes"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "11px 16px",
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
                      <td
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid rgba(0,0,0,0.06)",
                          fontSize: 14,
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
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: row.isFilOne ? 500 : 400, color: row.isFilOne ? "#09090B" : "#52525B" }}>
                        {row.region}
                      </td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: row.isFilOne ? 600 : 400, color: row.isFilOne ? "#09090B" : "#52525B" }}>
                        {row.storage}
                      </td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: row.isFilOne ? 600 : 500, color: row.isFilOne ? "#09090B" : valueColor(row.egress) }}>
                        {row.egress}
                      </td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 13.5, fontWeight: row.isFilOne ? 600 : 500, color: row.isFilOne ? "#09090B" : valueColor(row.api) }}>
                        {row.api}
                      </td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: row.isFilOne ? 17 : 13.5, fontWeight: row.isFilOne ? 700 : 400, color: row.isFilOne ? "#0070CC" : "#52525B" }}>
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Precios de la competencia convertidos de USD a €1 = $1,17 (tasa BCE, mayo 2026). FilOne tiene precios nativos en EUR a €4,99/TB.
            </p>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────────── */}
        <section
          id="caracteristicas"
          className="w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-4 items-center text-center">
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#71717A", textTransform: "uppercase" }}>
                Características
              </span>
              <h2
                className="text-[24px] md:text-[34px]"
                style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.2", letterSpacing: "-0.02em", color: "#09090B", margin: 0 }}
              >
                El <span style={{ color: "#0090FF" }}>S3 que esperabas.</span>
              </h2>
              <p
                className="text-[15px] md:text-[17px]"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", maxWidth: 560, margin: 0 }}
              >
                Compatible con todo lo que ya usa tu equipo. Con precios para los workloads que mueven datos de verdad.
              </p>
            </div>
            <div
              ref={featuresRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group reveal${featuresInView ? " in-view" : ""}`}
            >
              {[
                { icon: Plug,        title: "Compatibilidad S3 directa",      desc: "Misma API, mismos SDK, mismas herramientas. Apunta tu flujo de trabajo actual a nuestro endpoint y sigue produciendo. Sin proyectos de migración." },
                { icon: ArrowsOut,   title: "Sin tarifas de egreso",           desc: "Descargas de clientes, peticiones de usuarios, consultas del dashboard. Cada lectura está incluida. Tu factura se mantiene estable al final de un mes ajetreado." },
                { icon: Globe,       title: "Latencia nativa europea",         desc: "Menos de 15 ms desde Barcelona, Madrid, París y Milán. Al nivel de AWS eu-south-2 Madrid, con soberanía de datos en la UE y jurisdicción legal europea por defecto." },
                { icon: ShieldCheck, title: "Once nueves de durabilidad",      desc: "Almacenamiento distribuido en una red de proveedores independientes. Prueba auditable de que tus bytes están intactos, cada día." },
                { icon: Lock,        title: "Object Lock y versionado",        desc: "Modos de cumplimiento y gobernanza para destinos de backup. Períodos de retención. Registros de auditoría a prueba de manipulaciones. Listo para datos regulados." },
                { icon: ChartLine,   title: "Predecible bajo carga",           desc: "Ingestión a velocidad de línea de 1,5 Gbps por cliente. Lecturas paralelas sostenidas. Varianza entre ejecuciones ajustada para que tus pipelines dejen de adivinar." },
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}>
                    <Icon size={18} color="#0090FF" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>
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

        {/* ── Workloads ─────────────────────────────────────────────────────── */}
        <section
          id="casos-de-uso"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            ref={workloadsRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${workloadsInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Casos de uso</SectionLabel>
              <SectionHeading>Diseñado para lo que tu equipo hace de verdad.</SectionHeading>
              <SectionSub maxWidth={560}>
                Velocidad donde importa. Ahorro que se acumula mes a mes.
              </SectionSub>
            </div>

            <div className="reveal-group grid grid-cols-1 md:grid-cols-2 gap-4">
              {WORKLOADS.map((w, wi) => {
                const barVal = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
                return (
                  <div
                    key={w.tag}
                    className={`reveal${workloadsInView ? " in-view" : ""}`}
                    style={{
                      border: "1px solid rgba(0,0,0,0.07)",
                      borderRadius: 20,
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
                      overflow: "hidden",
                      transitionDelay: workloadsInView ? `${wi * 70}ms` : "0ms",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ padding: "28px 28px 24px" }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: "#EFF8FF",
                        border: "1px solid rgba(0,144,255,0.2)",
                        borderRadius: 9999,
                        padding: "4px 12px",
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 500,
                        fontSize: 10.5,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#0070CC",
                        marginBottom: 16,
                        whiteSpace: "nowrap",
                      }}>
                        {w.tag}
                      </span>
                      <h3 style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 20,
                        color: "#09090B",
                        marginBottom: 10,
                        lineHeight: "1.3",
                        letterSpacing: "-0.02em",
                      }}>
                        {w.title}
                      </h3>
                      <p style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        color: "#71717A",
                        lineHeight: 1.65,
                        margin: 0,
                      }}>
                        {w.desc}
                      </p>
                    </div>

                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "20px 28px 0" }}>
                      {w.stats.map((stat, si) => {
                        const vals = stat.rows.map(r => barVal(r.val));
                        const maxVal = Math.max(...vals);
                        return (
                          <div key={stat.label} style={{ marginBottom: 20 }}>
                            {si > 0 && <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.06)", margin: "0 0 20px" }} />}
                            <p style={{
                              fontFamily: "'DM Mono', monospace",
                              fontWeight: 500,
                              fontSize: 10,
                              letterSpacing: "0.09em",
                              textTransform: "uppercase",
                              color: "#94a3b8",
                              marginBottom: 12,
                            }}>
                              {stat.label}
                            </p>
                            {stat.rows.map((r, ri) => {
                              const pct = maxVal === 0 ? 100 : Math.max(3, (vals[ri] / maxVal) * 100);
                              return (
                                <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                  <span style={{
                                    fontFamily: "'Funnel Sans', sans-serif",
                                    fontWeight: r.win ? 600 : 400,
                                    fontSize: 13.5,
                                    color: "#09090B",
                                    width: 100,
                                    flexShrink: 0,
                                  }}>
                                    {r.name}
                                  </span>
                                  <div style={{ flex: 1, height: 10, backgroundColor: "rgba(0,0,0,0.06)", borderRadius: 99 }}>
                                    <div style={{
                                      width: `${pct}%`,
                                      height: "100%",
                                      borderRadius: 99,
                                      backgroundColor: r.win ? "#0090FF" : "#CBD5E1",
                                    }} />
                                  </div>
                                  <span style={{
                                    fontFamily: "'Funnel Sans', sans-serif",
                                    fontWeight: r.win ? 700 : 400,
                                    fontSize: 14,
                                    color: r.win ? "#0070CC" : "#09090B",
                                    width: 68,
                                    textAlign: "right",
                                    flexShrink: 0,
                                  }}>
                                    {r.val}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>

                    <div style={{
                      margin: "4px 16px 16px",
                      borderRadius: 12,
                      backgroundColor: "#EFF8FF",
                      padding: "14px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      marginTop: "auto",
                    }}>
                      <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#52525B" }}>
                        {w.speedBadge}
                      </span>
                      <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 700, fontSize: 18, color: "#0070CC", whiteSpace: "nowrap" }}>
                        {w.savingsBadge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Integrations ──────────────────────────────────────────────────── */}
        <section
          id="integraciones"
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={integrationsRef}
            className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${integrationsInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Integraciones</SectionLabel>
              <SectionHeading>Funciona con tu stack actual.</SectionHeading>
              <SectionSub maxWidth={440}>
                Compatible con la API S3. Si habla con AWS, habla con nosotros.
              </SectionSub>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {INTEGRATIONS.map((name) => (
                <div
                  key={name}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.09)",
                    borderRadius: 10,
                    padding: "12px 24px",
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 15.5,
                    color: "#374151",
                  }}
                >
                  {name}
                </div>
              ))}
            </div>

            <a
              href="https://docs.fil.one"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Ver documentación →
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
                  Lanza tu próximo proyecto con Fil One
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
                  Bucket de evaluación de 1 TB gratuito. Integración en menos de 2 minutos.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Prueba 30 días gratis</span>
                  </a>
                  <a href="/lp/es/contacto" className="btn-secondary btn-secondary-dark">
                    Habla con un experto
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
                  Sin tarjeta de crédito · Sin tarifas de egreso
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter lang="es" />
    </div>
  );
};

export default BarcelonaLandingPageES;
