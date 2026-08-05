import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { trackEvent } from "@/lib/analytics";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import { useSeo } from "@/hooks/useSeo";
import { useLang } from "@/hooks/useLang";
import { SectionLabel } from "@/components/LandingPrimitives";
import {
  TextField,
  TextAreaField,
  CheckboxField,
  SubmitButton,
  FormSuccess,
  FormError,
} from "@/components/FormControls";
import { HS_SUPPORT_FORM_GUID, submitHubSpotForm } from "@/lib/hubspot";
import { S3_ENDPOINT_HOST } from "@/lib/s3-endpoint";

const CATEGORY_OPTIONS = [
  { label: "Problema con el producto", value: "PRODUCT_ISSUE" },
  { label: "Problema de facturación", value: "BILLING_ISSUE" },
  { label: "Consulta general", value: "GENERAL_INQUIRY" },
  { label: "Solicitud de funcionalidad", value: "FEATURE_REQUEST" },
];

const QUICK_LINKS = [
  { label: "Documentación", sub: "Guías, referencia de API y SDKs", href: "https://docs.fil.one" },
  { label: "Estado", sub: "Estado del sistema y disponibilidad en tiempo real", href: "https://status.fil.one" },
];

const FAQS = [
  {
    q: "¿Fil One admite IPFS o CIDs?",
    a: "No. Fil One es almacenamiento de objetos compatible con S3. No admite recuperación por IPFS ni direccionamiento de contenido mediante CIDs. Si necesitas fijación (pinning) en IPFS o acceso basado en CID, echa un vistazo a Filecoin Open Cloud (FOC).",
  },
  {
    q: "¿Puedo hacer público un bucket?",
    a: "Actualmente no se admiten buckets públicos. Para compartir archivos concretos, puedes generar una URL prefirmada desde el panel o mediante la API de S3. Esto da acceso por tiempo limitado a un objeto específico sin hacer público todo el bucket.",
  },
  {
    q: "¿Hay costes ocultos además del precio de almacenamiento?",
    a: "No. Fil One cobra una tarifa plana por TB almacenado al mes, sin cargos de salida (egress), sin cargos por solicitudes de API y sin penalizaciones por recuperación. Lo que ves es lo que pagas.",
  },
  {
    q: "¿Cómo migro desde Storacha u otro proveedor compatible con S3?",
    a: `Fil One es totalmente compatible con S3, así que herramientas como rclone funcionan sin configuración adicional. Apunta rclone a ${S3_ENDPOINT_HOST} con tus credenciales de Fil One y sincroniza tus datos. Si necesitas ayuda con una migración más grande, escríbenos y te guiaremos.`,
  },
  {
    q: "¿Puedo pagar con tokens FIL?",
    a: "Por ahora no. La facturación es en USD. Si pagar en FIL es un requisito imprescindible, ponte en contacto y podemos explorar opciones según tu volumen de almacenamiento.",
  },
];

const SupportBcnES = () => {
  useLang("es");
  useSeo({
    title: "Soporte · Fil One Almacenamiento S3",
    description: "Obtén ayuda del equipo de soporte de Fil One. Envía una solicitud y te responderemos en breve.",
    canonical: "https://www.fil.one/lp/es/soporte",
  });

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    company: "",
    content: "",
    categories: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState(false);

  const set = (key: keyof Omit<typeof form, "categories">) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleCategory = (value: string) => {
    setCategoryError(false);
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(value)
        ? f.categories.filter((c) => c !== value)
        : [...f.categories, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.categories.length === 0) {
      setCategoryError(true);
      return;
    }
    setLoading(true);
    setError(null);
    setCategoryError(false);

    const result = await submitHubSpotForm({
      formGuid: HS_SUPPORT_FORM_GUID,
      pageName: "Barcelona ES Soporte",
      networkErrorMessage: "Error de red. Por favor, comprueba tu conexión y vuelve a intentarlo.",
      fields: [
        { objectTypeId: "0-1", name: "firstname", value: form.firstname },
        { objectTypeId: "0-1", name: "lastname", value: form.lastname },
        { objectTypeId: "0-1", name: "email", value: form.email },
        { objectTypeId: "0-1", name: "company", value: form.company },
        { objectTypeId: "0-5", name: "content", value: form.content },
        { objectTypeId: "0-5", name: "hs_ticket_category", value: form.categories.join(";") },
      ],
    });

    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSubmitted(true);
    trackEvent("Form Submit", { form: "support", page: window.location.pathname });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar lang="es" supportHref="/lp/es/soporte" contactSalesHref="/lp/es/contacto" />

      <main id="main-content" className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Soporte</SectionLabel>
            <h1 className="m-0 font-display font-medium text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] text-zinc-950">
              Obtén ayuda
            </h1>
            <p className="m-0 font-sans font-normal text-[15px] leading-[1.6] text-zinc-500">
              Consulta las preguntas frecuentes o envía una solicitud.
            </p>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map(({ label, sub, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 rounded-xl border border-black/[0.08] p-4 no-underline transition-colors hover:bg-black/[0.02]"
              >
                <div className="flex items-center gap-1">
                  <span className="font-sans font-medium text-[14px] text-zinc-950">
                    {label}
                  </span>
                  <ArrowUpRight size={13} className="text-zinc-600" />
                </div>
                <span className="font-sans text-[12.5px] text-zinc-500">
                  {sub}
                </span>
              </a>
            ))}
          </div>

          {/* FAQ */}
          <div className="flex flex-col">
            <div className="mb-4">
              <SectionLabel>Preguntas frecuentes</SectionLabel>
            </div>
            <FaqAccordion items={FAQS} idPrefix="soporte-faq" />
          </div>

          {submitted ? (
            <FormSuccess title="Nos pondremos en contacto pronto.">
              Gracias por ponerte en contacto. Nuestro equipo revisará tu solicitud y te responderá en breve.
            </FormSuccess>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-5">

              {/* Nombre / Apellido */}
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Nombre" required type="text" value={form.firstname} onChange={set("firstname")} placeholder="Ana" />
                <TextField label="Apellido" type="text" value={form.lastname} onChange={set("lastname")} placeholder="García" />
              </div>

              {/* Correo / Empresa */}
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Correo electrónico" required type="email" value={form.email} onChange={set("email")} placeholder="ana@empresa.com" />
                <TextField label="Empresa" type="text" value={form.company} onChange={set("company")} placeholder="Acme Inc." />
              </div>

              <TextAreaField
                label="Descripción del ticket"
                required
                value={form.content}
                onChange={set("content")}
                placeholder="Describe tu problema o pregunta…"
                rows={5}
              />

              <CheckboxField
                legend="Categoría"
                required
                options={CATEGORY_OPTIONS}
                values={form.categories}
                onToggle={toggleCategory}
                error={categoryError ? "Por favor, selecciona al menos una categoría." : undefined}
              />

              <div className="h-px w-full bg-black/[0.07]" />

              {/* Aviso de privacidad */}
              <p className="font-sans font-normal text-[13px] leading-[1.7] text-zinc-500">
                Fil One necesita la información de contacto que nos proporcionas para ponerse en contacto contigo sobre nuestros productos y servicios. Puedes darte de baja de estas comunicaciones en cualquier momento. Para más información sobre cómo darte de baja, así como sobre nuestras prácticas de privacidad y nuestro compromiso de proteger tu privacidad, consulta nuestra{" "}
                <a href="/privacy" className="text-zinc-500 underline">Política de privacidad</a>.
              </p>

              {/* Tiempo de respuesta */}
              <div className="flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-zinc-100 px-4 py-3">
                <div className="h-2 w-2 shrink-0 rounded-full bg-success-500" />
                <p className="m-0 font-sans text-[13.5px] text-zinc-600">
                  Normalmente respondemos en <span className="font-medium text-zinc-950">1 día laborable</span>.
                </p>
              </div>

              {/* Enviar */}
              <div className="flex flex-col gap-2 pt-1">
                <SubmitButton loading={loading}>
                  {loading ? "Enviando…" : "Enviar"}
                </SubmitButton>
                {error && <FormError>{error}</FormError>}
              </div>

            </form>
          )}

        </div>
      </main>

      <Footer lang="es" supportHref="/lp/es/soporte" contactSalesHref="/lp/es/contacto" />
    </div>
  );
};

export default SupportBcnES;
