import { useState } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  CalendarBlank,
  MapPin,
  BowlFood,
  Users,
  ChatCircle,
  UsersThree,
  Check,
} from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { useLang } from "@/hooks/useLang";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { Button } from "@/components/Button";
import Pill from "@/components/Pill";
import Icon from "@/components/Icon";
import IconTile from "@/components/IconTile";
import CtaBanner from "@/components/CtaBanner";
import { TextField, SubmitButton, FormSuccess, FormError } from "@/components/FormControls";
import { submitEventRsvp } from "@/lib/eventRsvp";
import { validateFields, hasErrors, focusFirstInvalid, type FieldErrors } from "@/lib/formValidation";
import { trackCtaClick, trackEvent } from "@/lib/analytics";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import jamesPhoto from "@/assets/team-james-kurz.jpg";
import rwPhoto from "@/assets/team-rw-holleman.jpg";
import pepoPhoto from "@/assets/host-pepo-pinar.webp";

// ─── Event ────────────────────────────────────────────────────────────────────

const RSVP_HREF = "#rsvp";
const CALENDAR_HREF = "/events/fil-one-madrid-2026-11-12-es.ics";
const MAP_HREF =
  "https://www.google.com/maps/search/?api=1&query=Restaurante+Bancal+Calle+de+Serrano+95+28006+Madrid";
const CONTACT_HREF = "/lp/es/contacto";
const SUPPORT_HREF = "/lp/es/soporte";
/** Where guests send cancellations, so their place goes to the waitlist. */
const HOSTS_EMAIL = "sales@fil.one";

interface EventDetail {
  icon: PhosphorIcon;
  title: string;
  body: string;
  link?: { label: string; href: string };
}

const EVENT_DETAILS: EventDetail[] = [
  { icon: CalendarBlank, title: "Jueves, 12 de noviembre de 2026", body: "A partir de las 17:30" },
  {
    icon: MapPin,
    title: "Restaurante Bancal",
    body: "C. de Serrano, 95, Chamartín, 28006 Madrid",
    link: { label: "Ver mapa", href: MAP_HREF },
  },
  { icon: BowlFood, title: "Una tarde de tapas, en persona", body: "Evento gratuito" },
  { icon: Users, title: "Aforo limitado", body: "Confirma tu asistencia para asegurarte una plaza o entrar en la lista de espera" },
];

const EVENING = [
  {
    icon: BowlFood,
    title: "De tapas",
    body: "Buena cocina de aquí y unas copas en el Restaurante Bancal, en plena calle de Serrano.",
  },
  {
    icon: ChatCircle,
    title: "Los equipos, de cerca",
    body: "Pasa un rato con quienes están detrás de Fil One y Bonum, sin una mesa de reuniones de por medio.",
  },
  {
    icon: UsersThree,
    title: "Entre colegas",
    body: "Conoce a otros profesionales del sector en España: centros de datos, nube y tecnología.",
  },
];

// ─── Fil One ──────────────────────────────────────────────────────────────────

const LEGACY_POINTS = [
  "Un solo centro de datos suele dar servicio a todo un continente, lejos de los clientes y de sus servidores.",
  "La redundancia se paga a base de copias completas: si quieres que tus datos sobrevivan a la pérdida de un edificio, toca pagar otra copia.",
  "Backblaze y Wasabi no tienen región en España: si quieres redundancia, tus datos acaban fuera del país.",
];

const FIL_ONE_POINTS = [
  { lead: "Más rápido:", body: "en el mismo edificio que las GPU o a un paso." },
  { lead: "Más resiliente:", body: "con erasure coding, los datos se reparten entre varios centros de datos; si cae uno, siguen ahí." },
  { lead: "Soberano:", body: "tus datos se quedan en España, bajo la legislación española y de la UE." },
];

/** Sovereign tier list price, USD per TB per month. Not in pricing.constants yet. */
const SOVEREIGN_PRICE = 8.99;

const PROOF = [
  { figure: "API de S3", note: "Tus SDK y herramientas funcionan sin cambios" },
  { figure: "11 nueves", note: "Durabilidad del 99,999999999 %, con erasure coding" },
  { figure: "Object Lock", note: "Una clave propia para cada objeto" },
  { figure: "Independiente", note: "Con el respaldo de la Filecoin Foundation" },
  { figure: PRICE_PER_TB_SHORT, note: `Al mes. Plan Sovereign: $${SOVEREIGN_PRICE.toFixed(2)}.` },
];

interface ResilienceCost {
  provider: string;
  /** USD per TB per month to keep data available through the loss of one facility. */
  price: number;
  display: string;
  note: string;
  isFilOne?: boolean;
}

// Wasabi and B2 are two full copies at their single-copy list rate ($7.99 and
// $6.95), the cheapest way either survives a site loss.
const RESILIENCE_COSTS: ResilienceCost[] = [
  { provider: "Amazon S3 Standard", price: 23, display: "~$23", note: "Datos repartidos entre centros de datos de una misma región. Proveedor estadounidense." },
  { provider: "Wasabi", price: 15.98, display: "$15.98", note: "Dos copias completas en dos regiones. Sin región en España." },
  { provider: "Backblaze B2", price: 13.9, display: "$13.90", note: "Dos copias completas en dos regiones. Sin región en España." },
  {
    provider: "Fil One Sovereign",
    price: SOVEREIGN_PRICE,
    display: `$${SOVEREIGN_PRICE.toFixed(2)} · ${Math.round((1 - SOVEREIGN_PRICE / 13.9) * 100)} % menos que Backblaze`,
    note: "Una sola copia con erasure coding, repartida entre centros de datos de Fil One en España.",
    isFilOne: true,
  },
];

const MAX_RESILIENCE_COST = Math.max(...RESILIENCE_COSTS.map((c) => c.price));

const PARTNERS = [
  {
    role: "Vende, integra y da soporte",
    name: "Bonum",
    body: "Soporte técnico de primera, en español. Oficinas en Madrid, Querétaro, Dallas y Boston. Participó en el despliegue de las redes 5G en España.",
  },
  {
    role: "Construye y opera",
    name: "Fil One",
    body: "Financia, despliega y gestiona el almacenamiento: capital, hardware, software y el día a día de la operación.",
  },
  {
    role: "Alojan",
    name: "Centros de datos asociados",
    body: "Instalaciones locales repartidas por España que, juntas, forman una sola región soberana: si una falla, las demás responden.",
  },
];

interface Host {
  initials: string;
  name: string;
  role: string;
  isFilOne: boolean;
  /** Headshot; hosts without one show their initials. */
  photo?: string;
}

// Roles the draft left open show the company alone until confirmed.
const HOSTS: Host[] = [
  { initials: "JK", name: "James Kurz", role: "Chief Strategy Officer, Fil One", isFilOne: true, photo: jamesPhoto },
  { initials: "RH", name: "R.W. Holleman", role: "Head of Revenue, Fil One", isFilOne: true, photo: rwPhoto },
  { initials: "PP", name: "Pepo Piñar", role: "Bonum", isFilOne: false, photo: pepoPhoto },
  { initials: "MG", name: "Miguel Gambra", role: "Bonum", isFilOne: false },
];

// ─── RSVP form ────────────────────────────────────────────────────────────────

type RsvpField = "firstname" | "lastname" | "email" | "company" | "jobtitle" | "invitedBy" | "dietary";

const EMPTY_RSVP: Record<RsvpField, string> = {
  firstname: "",
  lastname: "",
  email: "",
  company: "",
  jobtitle: "",
  invitedBy: "",
  dietary: "",
};

/** Event key written to the sheet's "event" column. */
const RSVP_EVENT = "madrid-2026-11-12";

const RsvpForm = () => {
  const [form, setForm] = useState(EMPTY_RSVP);
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors<RsvpField>>({});

  const set = (key: RsvpField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldErrors = validateFields<RsvpField>({
      firstname: { value: form.firstname, required: true },
      lastname: { value: form.lastname, required: true },
      email: { value: form.email, required: true, email: true },
      company: { value: form.company, required: true },
      jobtitle: { value: form.jobtitle, required: true },
      invitedBy: { value: form.invitedBy },
      dietary: { value: form.dietary },
    }, "es");
    setErrors(fieldErrors);
    if (hasErrors(fieldErrors)) {
      focusFirstInvalid(e.currentTarget);
      return;
    }
    setLoading(true);
    setError(null);

    const result = await submitEventRsvp({ event: RSVP_EVENT, ...form, website: honeypot }, "es");

    setLoading(false);
    if (!result.ok) {
      setError(result.error ?? null);
      return;
    }
    setSubmitted(true);
    trackEvent("Form Submit", { form: "event-rsvp-madrid", page: window.location.pathname });
  };

  if (submitted) {
    return (
      <FormSuccess
        title="¡Gracias! Ya tenemos tu respuesta"
        action={
          <Button variant="secondary" href={CALENDAR_HREF} download>
            Añadir al calendario
          </Button>
        }
      >
        Te escribiremos para confirmarte la plaza. Si ya está todo lleno, pasas a la lista de espera y te avisamos en
        cuanto haya un hueco.
      </FormSuccess>
    );
  }

  return (
    // data-hs-do-not-collect stops the HubSpot tracking script also logging
    // this form; RSVPs go only to the sheet.
    <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-6" noValidate>
      {/* Honeypot: off-screen and skipped by keyboard and screen readers, so
          only bots fill it. The sheet script drops any RSVP that has it set. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="Nombre" required autoComplete="given-name" value={form.firstname} onChange={set("firstname")} error={errors.firstname} />
        <TextField label="Apellidos" required autoComplete="family-name" value={form.lastname} onChange={set("lastname")} error={errors.lastname} />
        <TextField label="Correo de trabajo" required type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        <TextField label="Empresa" required autoComplete="organization" value={form.company} onChange={set("company")} error={errors.company} />
        <TextField label="Cargo" required autoComplete="organization-title" value={form.jobtitle} onChange={set("jobtitle")} error={errors.jobtitle} />
        <TextField label="¿Quién te ha invitado? (opcional)" value={form.invitedBy} onChange={set("invitedBy")} error={errors.invitedBy} />
      </div>
      <TextField label="Alergias o dieta especial (opcional)" value={form.dietary} onChange={set("dietary")} error={errors.dietary} />

      <div className="flex flex-col gap-3">
        <SubmitButton loading={loading}>{loading ? "Enviando…" : "Confirmar asistencia"}</SubmitButton>
        <p className="m-0 font-sans text-small leading-[1.6] text-zinc-500 text-center">
          Solo usaremos tus datos para este evento.{" "}
          <a href="/privacy" className="text-zinc-500 underline">
            Política de privacidad
          </a>
        </p>
      </div>
      {error && <FormError>{error}</FormError>}
    </form>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const CARD_CLASS = "rounded-2xl border border-black/[0.07] bg-white shadow-elevated-sm";

const MadridEventLandingPageES = () => {
  useLang("es");
  useSeo();

  const eveningView = useInView({ threshold: 0.05 });
  const aboutView = useInView({ threshold: 0.05 });
  const priceView = useInView({ threshold: 0.05 });
  const spainView = useInView({ threshold: 0.05 });
  const hostsView = useInView({ threshold: 0.05 });
  const rsvpView = useInView({ threshold: 0.05 });
  const faqView = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar lang="es" supportHref={SUPPORT_HREF} contactSalesHref={CONTACT_HREF} />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative isolate w-full pt-header md:pt-header-md">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10 bg-blue-halo" />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10 [mask-image:theme(backgroundImage.hero-grid-mask)] [-webkit-mask-image:theme(backgroundImage.hero-grid-mask)]"
            style={{
              backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center 30px",
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center px-5 md:px-8 pt-20 md:pt-[120px] pb-20 md:pb-28 max-w-container mx-auto w-full">
            <div className="flex flex-col items-start gap-6 hero-fade-1">
              <Pill wrap>Tapas en Madrid · 12 de noviembre</Pill>
              <h1 className="m-0 font-display font-medium text-[34px] sm:text-[44px] md:text-[58px] leading-[1.1] tracking-[-0.025em] text-zinc-950">
                <span className="text-brand-500">Fil One</span> llega a España
              </h1>
              <p className="m-0 max-w-[520px] font-sans text-body md:text-body-lg leading-[1.65] text-zinc-500 text-pretty">
                Ven a pasar una tarde relajada de tapas y copas en Madrid con los equipos de Fil One y Bonum. Sin
                presentaciones ni discursos comerciales: solo buena comida, buena compañía y la ocasión de seguir con las
                conversaciones que hemos empezado esta semana.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 hero-fade-2">
                <Button
                  variant="primary"
                  size="lg"
                  glow
                  href={RSVP_HREF}
                  onClick={() => trackCtaClick("RSVP", RSVP_HREF, "primary")}
                >
                  Confirmar asistencia
                </Button>
                <Button
                  variant="secondary"
                  href={CALENDAR_HREF}
                  download
                  onClick={() => trackCtaClick("Add to calendar", CALENDAR_HREF, "secondary")}
                >
                  Añadir al calendario
                </Button>
              </div>
              <p className="m-0 font-sans text-[13px] leading-[1.5] text-zinc-500 hero-fade-3">
                Evento gratuito · Plazas limitadas · Confirma tu asistencia o apúntate a la lista de espera
              </p>
            </div>

            <aside aria-label="Datos del evento" className={`${CARD_CLASS} p-6 sm:p-7 flex flex-col gap-5 hero-fade-2`}>
              <SectionLabel>Información práctica</SectionLabel>
              <ul className="m-0 p-0 list-none flex flex-col gap-5">
                {EVENT_DETAILS.map(({ icon, title, body, link }) => (
                  <li key={title} className="flex gap-3">
                    <Icon icon={icon} size={18} className="mt-0.5 shrink-0 text-brand-600" />
                    <div className="flex flex-col gap-0.5">
                      <p className="m-0 font-sans font-semibold text-body-sm text-zinc-950">{title}</p>
                      <p className="m-0 font-sans text-small leading-[1.55] text-zinc-500">
                        {body}
                        {link && (
                          <>
                            {" · "}
                            <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
                              {link.label}
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* ── The evening ──────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full bg-zinc-50">
          <div
            ref={eveningView.ref}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${eveningView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>El plan</SectionLabel>
              <SectionHeading>
                <span className="text-brand-500">Cerrar la semana</span> sin prisas
              </SectionHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {EVENING.map(({ icon, title, body }) => (
                <div key={title} className="flex flex-col gap-3">
                  <IconTile icon={icon} />
                  <h3 className="m-0 font-sans font-medium text-body-lg text-zinc-950">{title}</h3>
                  <p className="m-0 font-sans text-body-sm leading-[1.6] text-zinc-500 text-pretty">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RSVP ─────────────────────────────────────────────────────────── */}
        <section id="rsvp" className="px-5 md:px-8 py-24 md:py-32 w-full bg-white scroll-mt-24">
          <div
            ref={rsvpView.ref}
            className={`grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start w-full max-w-container mx-auto reveal${rsvpView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Confirmación de asistencia</SectionLabel>
              <SectionHeading>
                Resérvate <span className="text-brand-500">un hueco</span>
              </SectionHeading>
              <SectionSub maxWidth={280}>
                El aforo es limitado. Confirma tu asistencia para asegurarte una plaza; si ya está todo lleno, te
                apuntamos a la lista de espera y te avisamos en cuanto haya un hueco.
              </SectionSub>
            </div>
            <div className={`${CARD_CLASS} p-6 sm:p-8`}>
              <RsvpForm />
            </div>
          </div>
        </section>

        {/* ── About Fil One ────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50">
          <div
            ref={aboutView.ref}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${aboutView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Sobre Fil One</SectionLabel>
              <SectionHeading>
                Otros te cobran por copia. <span className="text-brand-500">Nosotros, por byte.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Fil One es una nube de almacenamiento de objetos compatible con S3. Sus nodos están en centros de datos
                locales, junto a los servidores que los usan, y se conectan entre sí para formar regiones soberanas a
                prueba de caídas.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/[0.07] bg-white p-6 sm:p-8 flex flex-col gap-4">
                <SectionLabel>El problema · La nube tradicional</SectionLabel>
                <h3 className="m-0 font-sans font-medium text-h4 text-zinc-950">Unos pocos centros gigantes, lejos de tus datos</h3>
                <ul className="m-0 pl-5 flex flex-col gap-2 list-disc marker:text-zinc-400">
                  {LEGACY_POINTS.map((point) => (
                    <li key={point} className="font-sans text-body-sm leading-[1.6] text-zinc-600">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-brand-500/20 bg-brand-50 p-6 sm:p-8 flex flex-col gap-4">
                <span className="font-mono font-medium text-eyebrow tracking-[0.08em] uppercase text-brand-600">
                  La solución · Fil One
                </span>
                <h3 className="m-0 font-sans font-medium text-h4 text-zinc-950">Muchos emplazamientos pequeños, unidos en una sola región soberana</h3>
                <ul className="m-0 p-0 list-none flex flex-col gap-2">
                  {FIL_ONE_POINTS.map(({ lead, body }) => (
                    <li key={lead} className="flex gap-2.5 font-sans text-body-sm leading-[1.6] text-zinc-600">
                      <Icon icon={Check} size={16} weight="bold" className="mt-[3px] shrink-0 text-brand-600" />
                      <span>
                        <strong className="font-semibold text-zinc-950">{lead}</strong> {body}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 pt-10 border-t border-black/[0.07]">
              {PROOF.map(({ figure, note }) => (
                <div key={figure} className="flex flex-col gap-1.5">
                  {/* 22px on phones: "Independiente" is 5px wider than a 360px screen's column at 24px. */}
                  <span className="font-display font-medium text-[22px] sm:text-[24px] leading-[1.15] tracking-[-0.02em] text-brand-600">
                    {figure}
                  </span>
                  <span className="font-sans text-small leading-[1.5] text-zinc-500">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Price vs. the alternatives ───────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={priceView.ref}
            className={`grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start w-full max-w-container mx-auto reveal${priceView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Comparativa de precios</SectionLabel>
              <SectionHeading>
                Cuánto cuesta seguir en pie si <span className="text-brand-500">pierdes un centro de datos</span>
              </SectionHeading>
              <SectionSub maxWidth={280}>
                Precio de lista por TB y mes para que tus datos sigan disponibles aunque caiga uno de los centros de datos.
              </SectionSub>
            </div>

            <figure className={`${CARD_CLASS} m-0 p-6 sm:p-8 flex flex-col gap-6`}>
              {RESILIENCE_COSTS.map(({ provider, price, display, note, isFilOne }) => (
                <div key={provider} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className={`font-sans text-body-sm font-semibold ${isFilOne ? "text-brand-600" : "text-zinc-950"}`}>
                      {provider}
                    </span>
                    <span className={`font-sans text-body-sm font-semibold text-right ${isFilOne ? "text-brand-600" : "text-zinc-950"}`}>
                      {display}
                    </span>
                  </div>
                  <div aria-hidden="true" className="h-2.5 rounded-full bg-black/[0.06]">
                    <div
                      className={`h-full rounded-full ${isFilOne ? "bg-brand-500" : "bg-zinc-300"}`}
                      style={{ width: `${(price / MAX_RESILIENCE_COST) * 100}%` }}
                    />
                  </div>
                  <span className="font-sans text-small text-zinc-500">{note}</span>
                </div>
              ))}
              <figcaption className="pt-5 border-t border-black/[0.07] font-sans text-[12px] leading-[1.6] text-zinc-500">
                Precios de lista a octubre de 2026. No incluyen cargos por egress ni por solicitudes. Con el plan
                Sovereign, los datos se reparten entre varios centros de datos de Fil One en España.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Fil One and Bonum in Spain ───────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50">
          <div
            ref={spainView.ref}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${spainView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Fil One y Bonum en España</SectionLabel>
              <SectionHeading>
                Datos de aquí, <span className="text-brand-500">guardados aquí</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Fil One funciona como una única región S3 repartida entre centros de datos asociados, sujeta a la
                legislación española y de la UE. En España lo comercializa Bonum, un grupo tecnológico al servicio del mundo
                hispanohablante desde 1999.
              </SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PARTNERS.map(({ role, name, body }) => (
                <div key={name} className={`${CARD_CLASS} p-6 sm:p-7 flex flex-col gap-3`}>
                  <SectionLabel>{role}</SectionLabel>
                  <h3 className="m-0 font-sans font-medium text-body-lg text-zinc-950">{name}</h3>
                  <p className="m-0 font-sans text-body-sm leading-[1.6] text-zinc-500 text-pretty">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hosts ────────────────────────────────────────────────────────── */}
        <section id="hosts" className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={hostsView.ref}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${hostsView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Anfitriones</SectionLabel>
              <SectionHeading>
                Te presentamos a <span className="text-brand-500">tus anfitriones</span>
              </SectionHeading>
            </div>
            <ul className="m-0 p-0 list-none grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {HOSTS.map(({ initials, name, role, isFilOne, photo }) => (
                <li key={name} className={`${CARD_CLASS} overflow-hidden flex flex-col`}>
                  {/* Empty alt: the name is printed right below the photo. */}
                  {photo ? (
                    <img src={photo} alt="" loading="lazy" className="aspect-square w-full object-cover bg-zinc-100" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className={`flex aspect-square w-full items-center justify-center font-display font-medium text-[40px] sm:text-[56px] ${
                        isFilOne ? "bg-brand-50 text-brand-600" : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {initials}
                    </span>
                  )}
                  <div className="flex flex-col gap-0.5 p-4 sm:p-5">
                    <p className="m-0 font-sans font-semibold text-body-sm text-zinc-950">{name}</p>
                    <p className="m-0 font-sans text-small text-zinc-500">{role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section id="faq" className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50">
          <div
            ref={faqView.ref}
            className={`flex flex-col gap-8 w-full max-w-[720px] mx-auto reveal${faqView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Preguntas frecuentes</SectionLabel>
              <SectionHeading>
                Lo que <span className="text-brand-500">conviene saber</span>
              </SectionHeading>
            </div>
            <dl className="m-0 border-t border-black/[0.07]">
              <div className="py-5 border-b border-black/[0.07] flex flex-col gap-1.5">
                <dt className="font-sans font-semibold text-body-sm text-zinc-950">¿Puedo venir con alguien de mi empresa?</dt>
                <dd className="m-0 font-sans text-body-sm leading-[1.65] text-zinc-500">
                  Claro que sí. Como las plazas son limitadas, pídele que confirme su asistencia por separado para que
                  podamos guardarle sitio.
                </dd>
              </div>
              <div className="py-5 border-b border-black/[0.07] flex flex-col gap-1.5">
                <dt className="font-sans font-semibold text-body-sm text-zinc-950">¿Y si al final no puedo ir?</dt>
                <dd className="m-0 font-sans text-body-sm leading-[1.65] text-zinc-500">
                  Escríbenos a{" "}
                  <a href={`mailto:${HOSTS_EMAIL}`} className="text-brand-600 underline">
                    {HOSTS_EMAIL}
                  </a>{" "}
                  para que podamos ceder tu plaza a alguien de la lista de espera. Y si aun así quieres saber más sobre
                  Fil One,{" "}
                  <a href={CONTACT_HREF} className="text-brand-600 underline">
                    concierta una llamada con un experto
                  </a>{" "}
                  cuando mejor te venga.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────────────────────── */}
        <CtaBanner
          surface="grey"
          heading="Nos vemos en Madrid"
          subhead="El jueves 12 de noviembre, a partir de las 17:30, en el Restaurante Bancal (C. de Serrano, 95)."
          subheadMaxWidth={520}
          cta={{
            label: "Confirmar asistencia",
            href: RSVP_HREF,
            onClick: () => trackCtaClick("RSVP", RSVP_HREF, "primary"),
          }}
          secondaryCta={{
            label: "Hablar con un experto",
            href: CONTACT_HREF,
            onClick: () => trackCtaClick("Talk to an expert", CONTACT_HREF, "secondary"),
          }}
          note="Evento gratuito · Plazas limitadas · Lista de espera si se llena"
        />
      </main>

      <Footer lang="es" supportHref={SUPPORT_HREF} contactSalesHref={CONTACT_HREF} />
    </div>
  );
};

export default MadridEventLandingPageES;
