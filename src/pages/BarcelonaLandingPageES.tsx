import { Plug, ArrowsOut, ShieldCheck, Lock, MapPin, Rocket } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { useLang } from "@/hooks/useLang";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import Hero from "@/components/Hero";
import { Button } from "@/components/Button";
import FeaturedInBar from "@/components/FeaturedInBar";
import StatCard from "@/components/StatCard";
import FeatureCard from "@/components/FeatureCard";
import CtaBanner from "@/components/CtaBanner";
import IntegrationsSection from "@/components/IntegrationsSection";
import PriceComparisonTable, {
  type PriceComparisonColumn,
  type PriceComparisonRow,
} from "@/components/PriceComparisonTable";
import {
  PRICE_PER_TB_EUR,
  PRICE_PER_TB_SHORT_EUR_ES,
  EUR_USD_RATE,
  eurEs,
} from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const SUPPORT_HREF = "/lp/es/soporte";
const CONTACT_SALES_HREF = "/lp/es/contacto";

/** The modelled workload: 10 TB stored, 10 TB egress, 500K operations a month. */
const WORKLOAD_TB = 10;
const FIL_ONE_TOTAL = eurEs(PRICE_PER_TB_EUR * WORKLOAD_TB);

const PRICING_COLUMNS: PriceComparisonColumn[] = [
  { key: "region", header: "Región" },
  { key: "storage", header: "Almacenamiento" },
  { key: "egress", header: "Egress", colorByValue: true },
  { key: "api", header: "API / ops", colorByValue: true },
  { key: "total", header: "Total / mes", total: true },
];

const PRICING_ROWS: PriceComparisonRow[] = [
  {
    provider: "Fil One",
    isFilOne: true,
    values: {
      region: "EU-West",
      storage: FIL_ONE_TOTAL,
      egress: eurEs(0, 0),
      api: eurEs(0, 0),
      total: FIL_ONE_TOTAL,
    },
  },
  {
    provider: "Backblaze B2",
    values: {
      region: "eu-central-003 Ámsterdam",
      storage: eurEs(59.6),
      egress: eurEs(0, 0),
      api: eurEs(0, 0),
      total: eurEs(59.6),
    },
  },
  {
    provider: "Wasabi",
    values: {
      region: "eu-west-2 París",
      storage: eurEs(59.9),
      egress: eurEs(0, 0),
      api: eurEs(0, 0),
      total: eurEs(59.9),
    },
  },
  {
    provider: "AWS S3 Standard",
    values: {
      region: "eu-south-2 Madrid",
      storage: eurEs(197, 0),
      egress: eurEs(790, 0),
      api: eurEs(1.83),
      total: eurEs(990, 0),
    },
  },
];

const STATS = [
  { stat: PRICE_PER_TB_SHORT_EUR_ES, label: "Precio fijo mensual" },
  { stat: eurEs(0, 0), label: "Costes de salida" },
  // El 20× es sobre la factura total, que depende del tráfico de salida, así que
  // solo se cumple con un uso intensivo de lectura. La nota indica el escenario.
  {
    stat: "20×",
    label: "Más barato que AWS",
    note: `Con ${WORKLOAD_TB} TB almacenados y ${WORKLOAD_TB} TB de salida`,
  },
];

const FEATURES = [
  { icon: Plug, title: "Compatibilidad inmediata con S3", desc: "La misma API, los mismos SDKs y herramientas. Conecta tu flujo a nuestro endpoint y sigue trabajando." },
  { icon: ArrowsOut, title: "Sin cargos por tráfico de salida", desc: "Cada lectura es gratis, así que tu factura se mantiene plana sin importar cuánto uses el servicio." },
  { icon: ShieldCheck, title: "Once nueves de durabilidad", desc: "99,999999999% de durabilidad, replicada en varias ubicaciones y monitorizada permanentemente." },
  { icon: Lock, title: "Object Lock y versionado", desc: "Modos de cumplimiento, periodos de retención y registros de auditoría a prueba de manipulación." },
  { icon: MapPin, title: "Tus datos nunca salen de la UE", desc: "La infraestructura de almacenamiento permanece dentro de las fronteras europeas." },
  { icon: Rocket, title: "Listo en cuestión de minutos", desc: "Genera tus claves de acceso, apunta tus herramientas a nuestro endpoint y empieza a subir datos." },
];

const BarcelonaLandingPageES = () => {
  useLang("es");
  useSeo({
    title: `Fil One para Barcelona: Almacenamiento Europeo, ${PRICE_PER_TB_SHORT_EUR_ES}, Sin Egress`,
    description:
      `Almacenamiento de objetos compatible con S3 para equipos en Barcelona. Soberanía de datos en la UE, cero comisiones de egress, a ${PRICE_PER_TB_SHORT_EUR_ES}. Intégralo en tu stack actual en minutos.`,
    canonical: "https://www.fil.one/lp/es/barcelona",
  });

  const { ref: posRef, inView: posInView } = useInView({ threshold: 0.05 });
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar lang="es" supportHref={SUPPORT_HREF} contactSalesHref={CONTACT_SALES_HREF} />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Hero
          glow
          grid
          titleSize="text-[34px] sm:text-[44px] md:text-[62px]"
          titleMaxWidth={760}
          descriptionMaxWidth={520}
          contentClassName="pb-10 md:pb-14"
          title={
            <>
              Almacenamiento europeo.
              <br />
              <span className="text-brand-500">{PRICE_PER_TB_SHORT_EUR_ES}, sin cargos por tráfico de salida.</span>
            </>
          }
          description="Almacenamiento de objetos compatible con S3 que mantiene tus datos en Europa. Funciona con las herramientas que ya utilizas, sin necesidad de migraciones."
          ctas={[{ label: "Prueba gratis por 30 días", href: SIGNUP_URL, variant: "primary", size: "lg", glow: true }]}
        />

        {/* ── Publications / Social proof ──────────────────────────────────── */}
        <FeaturedInBar intro="Nuestra tecnología ha sido destacada en" />

        {/* ── Positioning ───────────────────────────────────────────────────── */}
        <section id="positioning" className="px-5 md:px-8 py-16 md:py-20 w-full bg-zinc-50">
          <div
            ref={posRef}
            className={`flex flex-col md:flex-row gap-8 md:gap-14 items-stretch md:items-start w-full max-w-container mx-auto reveal${posInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left md:max-w-[320px]">
              <SectionLabel>Por qué Fil One</SectionLabel>
              <SectionHeading>
                Un coste <span className="text-brand-500">imbatible</span>
              </SectionHeading>
              <SectionSub maxWidth={320}>
                Compatible con S3, soberanía de datos en la UE y sin cargos por tráfico de salida. Sin costes ocultos ni
                sorpresas.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full flex-1">
              {STATS.map(({ stat, label, note }) => (
                <StatCard key={label} stat={stat} label={label} note={note} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing table ─────────────────────────────────────────────────── */}
        <section id="compare" className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={pricingRef}
            className={`flex flex-col gap-8 w-full max-w-container mx-auto reveal${pricingInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Precios</SectionLabel>
              <SectionHeading>
                Tu factura mensual, <span className="text-brand-500">de cuatro formas</span>
              </SectionHeading>
              <SectionSub maxWidth={600}>
                Un equipo de {WORKLOAD_TB} TB en Barcelona, con {WORKLOAD_TB} TB de tráfico de salida al mes y con
                500.000 operaciones de objetos.
              </SectionSub>
            </div>

            <PriceComparisonTable
              columns={PRICING_COLUMNS}
              rows={PRICING_ROWS}
              caption={`Coste mensual por proveedor para una carga de ${WORKLOAD_TB} TB en Europa`}
              providerHeader="Proveedor"
              highlightLabel="Tú"
              centerFootnote
              footnote={
                <>
                  Los precios de la competencia se han convertido de USD utilizando el tipo de cambio de 1 € = $
                  {EUR_USD_RATE} (tipo de cambio del BCE, mayo de 2026). Fil One tiene un precio nativo en euros de{" "}
                  {PRICE_PER_TB_SHORT_EUR_ES}.
                </>
              }
            />

            {/* Mid-page CTA after pricing table */}
            <div className="flex items-center justify-center mt-4">
              <Button variant="primary" href={SIGNUP_URL}>
                Prueba gratis por 30 días
              </Button>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section id="features" className="w-full bg-zinc-50">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-4 items-center text-center">
              <SectionLabel>Funcionalidades</SectionLabel>
              <SectionHeading>
                El <span className="text-brand-500">S3 que esperabas</span>
              </SectionHeading>
              <SectionSub>Compatible con todo lo que tu equipo ya utiliza.</SectionSub>
            </div>
            <div
              ref={featuresRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group reveal${featuresInView ? " in-view" : ""}`}
            >
              {FEATURES.map(({ icon, title, desc }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={desc}
                  className={`reveal${featuresInView ? " in-view" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Integrations ──────────────────────────────────────────────────── */}
        <IntegrationsSection
          label="Integraciones"
          heading={
            <>
              Funciona con tu <span className="text-brand-500">stack actual</span>
            </>
          }
          description="Compatible con la API de S3. Si funciona con AWS, funciona con nosotros."
          ctaLabel="Ver la documentación →"
        />

        {/* ── CTA Banner ────────────────────────────────────────────────────── */}
        <CtaBanner
          heading="El almacenamiento de objetos más económico de Europa"
          headingMaxWidth={620}
          subhead={`${PRICE_PER_TB_SHORT_EUR_ES}, sin costes de salida y listo para usar en minutos.`}
          cta={{ label: "Prueba gratis por 30 días", href: SIGNUP_URL }}
          note="No se requiere tarjeta de crédito."
        />
      </main>

      <Footer lang="es" supportHref={SUPPORT_HREF} contactSalesHref={CONTACT_SALES_HREF} />
    </div>
  );
};

export default BarcelonaLandingPageES;
