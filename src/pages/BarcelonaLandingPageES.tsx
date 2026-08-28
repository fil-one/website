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
import { PRICE_PER_TB, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SIGNUP_URL = signupUrl();
const SUPPORT_HREF = "/lp/es/soporte";
const CONTACT_SALES_HREF = "/lp/es/contacto";

/** The modelled workload: 10 TB stored, 10 TB egress, 500K operations a month. */
const WORKLOAD_TB = 10;
// Prices stay in the site-wide USD format ("$4.99/TB") on the Spanish pages
// too, so the headline rate reads identically everywhere it appears.
const FIL_ONE_TOTAL = `$${(PRICE_PER_TB * WORKLOAD_TB).toFixed(2)}`;

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
      egress: "$0",
      api: "$0",
      total: FIL_ONE_TOTAL,
    },
  },
  {
    provider: "Backblaze B2",
    values: {
      region: "eu-central-003 Amsterdam",
      storage: "$69.50",
      egress: "$0",
      api: "$0",
      total: "$69.50",
    },
  },
  {
    provider: "Wasabi",
    values: {
      region: "eu-west-2 Paris",
      storage: "$79.90",
      egress: "$0",
      api: "$0",
      total: "$79.90",
    },
  },
  {
    provider: "AWS S3 Standard",
    values: {
      region: "eu-south-2 Madrid",
      storage: "$230",
      egress: "$900",
      api: "$2.50",
      total: "$1,132.50",
    },
  },
];

const STATS = [
  { stat: PRICE_PER_TB_SHORT, label: "Precio fijo mensual" },
  { stat: "$0", label: "Costes por egress" },
  // El 20× es sobre la factura total, que depende del egress, así que
  // solo se cumple con un uso intensivo de lectura. La nota indica el escenario.
  {
    stat: "20×",
    label: "Más barato que AWS",
    note: `Con ${WORKLOAD_TB} TB de almacenamiento y ${WORKLOAD_TB} TB de egress`,
  },
];

const FEATURES = [
  { icon: Plug, title: "Compatibilidad inmediata con S3", desc: "La misma API, los mismos SDK y herramientas. Conecta tu flujo de trabajo a nuestro endpoint y sigue trabajando." },
  { icon: ArrowsOut, title: "Sin cargos por egress", desc: "Cada lectura es gratis, así que tu factura se mantiene plana sin importar cuánto uses el servicio." },
  { icon: ShieldCheck, title: "Respaldado por un SLA publicado", desc: "Un compromiso de disponibilidad con crédito por servicio y una página de estado pública en status.fil.one." },
  { icon: Lock, title: "Object Lock y versionado", desc: "Modo Governance o Compliance, retención de hasta 100 años y un historial de versiones completo." },
  { icon: MapPin, title: "Tus datos nunca salen de la UE", desc: "La infraestructura de almacenamiento permanece dentro de las fronteras europeas." },
  { icon: Rocket, title: "Listo en cuestión de minutos", desc: "Genera tus claves de acceso, apunta tus herramientas a nuestro endpoint y empieza a subir datos." },
];

const BarcelonaLandingPageES = () => {
  useLang("es");
  useSeo({
    title: `Fil One para Barcelona: Almacenamiento Europeo, ${PRICE_PER_TB_SHORT}, Sin Egress`,
    description:
      `Almacenamiento de objetos compatible con S3 para equipos en Barcelona. Soberanía de datos en la UE, cero comisiones de egress, a ${PRICE_PER_TB_SHORT}. Intégralo en tu stack actual en minutos.`,
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
          // 900, not the EN page's 760: the Spanish second line measures 862px
          // at the 62px display size and would otherwise wrap to three lines.
          titleMaxWidth={900}
          descriptionMaxWidth={520}
          contentClassName="pb-10 md:pb-14"
          title={
            <>
              Almacenamiento europeo.
              <br />
              <span className="text-brand-500">{PRICE_PER_TB_SHORT}, sin cargos por egress.</span>
            </>
          }
          description="Almacenamiento de objetos compatible con S3 que mantiene tus datos en Europa. Funciona con las herramientas que ya utilizas, sin necesidad de migraciones."
          ctas={[{ label: "Empieza con 30 días gratis", href: SIGNUP_URL, variant: "primary", size: "lg", glow: true }]}
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
                Compatible con S3, soberanía de datos en la UE y sin cargos por egress. Sin costes ocultos ni
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
                Un equipo en Barcelona con {WORKLOAD_TB} TB de almacenamiento, {WORKLOAD_TB} TB de egress al mes y
                500.000 operaciones sobre objetos.
              </SectionSub>
            </div>

            <PriceComparisonTable
              columns={PRICING_COLUMNS}
              rows={PRICING_ROWS}
              caption={`Coste mensual por proveedor para una carga de ${WORKLOAD_TB} TB en Europa`}
              providerHeader="Proveedor"
              highlightLabel="Tú"
              centerFootnote
              footnote="Los precios de los demás proveedores son sus tarifas de lista publicadas para regiones de la UE. Todos los precios se indican en USD."
            />

            {/* Mid-page CTA after pricing table */}
            <div className="flex items-center justify-center mt-4">
              <Button variant="primary" href={SIGNUP_URL}>
                Empieza con 30 días gratis
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
          ctaLabel="Ver documentación →"
        />

        {/* ── CTA Banner ────────────────────────────────────────────────────── */}
        <CtaBanner
          heading="El almacenamiento de objetos más económico de Europa"
          headingMaxWidth={620}
          subhead={`${PRICE_PER_TB_SHORT}, sin costes por egress y listo para usar en minutos.`}
          cta={{ label: "Empieza con 30 días gratis", href: SIGNUP_URL }}
          note="1 TB de almacenamiento y 2 TB de egress gratis durante 30 días. No necesitas tarjeta de crédito."
        />
      </main>

      <Footer lang="es" supportHref={SUPPORT_HREF} contactSalesHref={CONTACT_SALES_HREF} />
    </div>
  );
};

export default BarcelonaLandingPageES;
