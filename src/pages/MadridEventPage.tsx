import { useState, type ReactNode } from "react";
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
import type { Lang } from "@/lib/i18n";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";
import jamesPhoto from "@/assets/host-james-kurz.webp";
import rwPhoto from "@/assets/host-rw-holleman.webp";
import pepoPhoto from "@/assets/host-pepo-pinar.webp";

/**
 * The Madrid tapas evening page, rendered in English at /lp/madrid and in
 * Spanish at /lp/es/madrid. Both routes share this one component so a change
 * to the layout or the event details lands in both languages at once; only the
 * copy below differs.
 */

// ─── Event ────────────────────────────────────────────────────────────────────

const RSVP_HREF = "#rsvp";
const CODE_OF_CONDUCT_HREF = "https://github.com/filecoin-project/community/blob/master/CODE_OF_CONDUCT.md";
/** Where guests send cancellations, so their place goes to the waitlist. */
const HOSTS_EMAIL = "sales@fil.one";
/** Event key written to the sheet's "event" column, the same in both languages. */
const RSVP_EVENT = "madrid-2026-11-12";

/** The page in each language, for the navbar's EN/ES switcher. */
const MADRID_EVENT_PATHS: Record<Lang, string> = { en: "/lp/madrid", es: "/lp/es/madrid" };

/** Links that point at a different page per language. */
const HREFS: Record<Lang, { calendar: string; contact: string; support: string }> = {
  en: { calendar: "/events/fil-one-madrid-2026-11-12.ics", contact: "/contact-sales", support: "/support" },
  es: { calendar: "/events/fil-one-madrid-2026-11-12-es.ics", contact: "/lp/es/contacto", support: "/lp/es/soporte" },
};

/** Sovereign tier list price, USD per TB per month. Not in pricing.constants yet. */
const SOVEREIGN_PRICE = 8.99;
const SOVEREIGN_DISPLAY = `$${SOVEREIGN_PRICE.toFixed(2)}`;
const SOVEREIGN_SAVING = Math.round((1 - SOVEREIGN_PRICE / 13.9) * 100);

interface EventDetail {
  icon: PhosphorIcon;
  title: string;
  body: string;
  link?: { label: string; href: string };
}

interface CostRow {
  provider: string;
  /** USD per TB per month to keep data available through the loss of one facility. */
  price: number;
  display: string;
  note: string;
  isFilOne?: boolean;
}

interface Host {
  initials: string;
  name: string;
  role: string;
  isFilOne: boolean;
  /** Headshot; hosts without one show their initials. */
  photo?: string;
}

// Roles the draft left open show the company alone until confirmed. Names and
// job titles stay in English on both pages.
const HOSTS: Host[] = [
  { initials: "JK", name: "James Kurz", role: "Chief Strategy Officer, Fil One", isFilOne: true, photo: jamesPhoto },
  { initials: "RH", name: "R.W. Holleman", role: "Head of Revenue, Fil One", isFilOne: true, photo: rwPhoto },
  { initials: "PP", name: "Pepo Piñar", role: "Bonum", isFilOne: false, photo: pepoPhoto },
  { initials: "MG", name: "Miguel Gambra", role: "Bonum", isFilOne: false },
];

// ─── Copy ─────────────────────────────────────────────────────────────────────

interface FaqEntry {
  question: string;
  answer: ReactNode;
}

interface SectionCopy {
  label: string;
  heading: ReactNode;
}

/** Every visitor-facing string on the page, once per language. */
interface MadridEventCopy {
  hero: {
    badge: string;
    title: ReactNode;
    description: string;
    rsvp: string;
    addToCalendar: string;
    tagline: string;
    detailsLabel: string;
    details: EventDetail[];
  };
  evening: SectionCopy & { items: { icon: PhosphorIcon; title: string; body: string }[] };
  rsvp: SectionCopy & { sub: string };
  form: {
    firstname: string;
    lastname: string;
    email: string;
    company: string;
    jobtitle: string;
    invitedBy: string;
    dietary: string;
    submit: string;
    sending: string;
    privacyNote: string;
    privacyLink: string;
    conductNote: string;
    conductLink: string;
    successTitle: string;
    successBody: string;
  };
  hosts: SectionCopy;
  about: SectionCopy & {
    sub: string;
    problemLabel: string;
    problemTitle: string;
    problemPoints: string[];
    solutionLabel: string;
    solutionTitle: string;
    solutionPoints: { lead: string; body: string }[];
    proof: { figure: string; note: string }[];
  };
  price: SectionCopy & { sub: string; rows: CostRow[]; caption: string };
  spain: SectionCopy & { sub: string; partners: { role: string; name: string; body: string }[] };
  faq: SectionCopy & { items: FaqEntry[] };
  cta: { heading: string; subhead: string; rsvp: string; talkToExpert: string; note: string };
}

const LINK_CLASS = "text-brand-600 underline";

const conductLink = (label: string) => (
  <a href={CODE_OF_CONDUCT_HREF} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
    {label}
  </a>
);

const hostsEmailLink = (
  <a href={`mailto:${HOSTS_EMAIL}`} className={LINK_CLASS}>
    {HOSTS_EMAIL}
  </a>
);

const COPY: Record<Lang, MadridEventCopy> = {
  en: {
    hero: {
      badge: "Tapas evening · Madrid · 12 November",
      title: (
        <>
          Introducing <span className="text-brand-500">Fil One</span> to Spain
        </>
      ),
      description:
        "Join the Fil One and Bonum teams for a relaxed evening of tapas and drinks in Madrid. No slides, no pitch: just good food, good company and a chance to continue the conversations we started this week.",
      rsvp: "RSVP",
      addToCalendar: "Add to calendar",
      tagline: "Free to attend · Limited capacity · RSVP to confirm your place or join the waitlist",
      detailsLabel: "The details",
      details: [
        { icon: CalendarBlank, title: "Thursday, 12 November 2026", body: "From 17:30" },
        { icon: MapPin, title: "Venue to be announced", body: "Madrid. We'll share the address soon." },
        { icon: BowlFood, title: "An evening of tapas, in person", body: "Free to attend" },
        { icon: Users, title: "Limited capacity", body: "RSVP to secure your invitation or join the waitlist" },
      ],
    },
    evening: {
      label: "The evening",
      heading: (
        <>
          A relaxed way to <span className="text-brand-500">close the week</span>
        </>
      ),
      items: [
        { icon: BowlFood, title: "Tapas and drinks", body: "Good Spanish food and drinks in Madrid, at a venue we'll announce soon." },
        {
          icon: ChatCircle,
          title: "Meet the teams",
          body: "Spend time with the people behind Fil One and Bonum, away from the meeting room.",
        },
        {
          icon: UsersThree,
          title: "Connect with peers",
          body: "Meet others from Spain's data center, cloud and technology community.",
        },
      ],
    },
    rsvp: {
      label: "RSVP",
      heading: (
        <>
          Save your <span className="text-brand-500">seat at the table</span>
        </>
      ),
      sub: "Capacity is limited. RSVP to confirm your invitation; if the evening is full, we'll add you to the waitlist and let you know as soon as a place opens up.",
    },
    form: {
      firstname: "First name",
      lastname: "Last name",
      email: "Work email",
      company: "Company",
      jobtitle: "Role",
      invitedBy: "Who invited you? (optional)",
      dietary: "Dietary requirements (optional)",
      submit: "RSVP",
      sending: "Sending…",
      privacyNote: "We'll only use your details for this event.",
      privacyLink: "Privacy policy",
      conductNote: "By attending, you agree to the",
      conductLink: "code of conduct",
      successTitle: "Thanks, your RSVP is in",
      successBody:
        "We'll confirm your place by email. If the evening is full, you're on the waitlist and we'll let you know as soon as a place opens up.",
    },
    hosts: {
      label: "Your hosts",
      heading: (
        <>
          Meet <span className="text-brand-500">your hosts</span>
        </>
      ),
    },
    about: {
      label: "About Fil One",
      heading: (
        <>
          They sell copies. <span className="text-brand-500">We sell bytes.</span>
        </>
      ),
      sub: "Fil One is an S3-compatible object storage cloud. Its nodes live inside local data centers, next to the compute that uses them, and link up into resilient sovereign regions.",
      problemLabel: "The problem · Legacy cloud storage",
      problemTitle: "A few giant data centers, far from the data",
      problemPoints: [
        "One site often serves a whole continent, far from customers and their compute.",
        "Redundancy is priced as full copies: survive losing a building, pay for another copy.",
        "Backblaze and Wasabi have no region in Spain, so resilient data leaves the country.",
      ],
      solutionLabel: "The solution · Fil One",
      solutionTitle: "Many small sites, linked into one sovereign region",
      solutionPoints: [
        { lead: "Faster:", body: "in the same building as the GPUs, or a short hop away." },
        { lead: "More resilient:", body: "data is erasure coded across sites; lose a data center and it's still there." },
        { lead: "Sovereign:", body: "Spanish data stored in Spain, under Spanish and EU law." },
      ],
      proof: [
        { figure: "Drop-in S3", note: "Your SDKs and tools work unchanged" },
        { figure: "11 nines", note: "99.999999999% durability, erasure coded" },
        { figure: "Object Lock", note: "A separate key per object" },
        { figure: "Independent", note: "Backed by the Filecoin Foundation" },
        { figure: PRICE_PER_TB_SHORT, note: `Per month. Sovereign ${SOVEREIGN_DISPLAY}.` },
      ],
    },
    price: {
      label: "Price vs. the alternatives",
      heading: (
        <>
          What it costs to survive <span className="text-brand-500">losing a data center</span>
        </>
      ),
      sub: "List price per TB per month to keep data available if one facility goes down.",
      // Wasabi and B2 are two full copies at their single-copy list rate ($7.99
      // and $6.95), the cheapest way either survives a site loss.
      rows: [
        { provider: "Amazon S3 Standard", price: 23, display: "~$23", note: "Spread across sites in one region. US provider." },
        { provider: "Wasabi", price: 15.98, display: "$15.98", note: "Two full copies in two regions. No region in Spain." },
        { provider: "Backblaze B2", price: 13.9, display: "$13.90", note: "Two full copies in two regions. No region in Spain." },
        {
          provider: "Fil One Sovereign",
          price: SOVEREIGN_PRICE,
          display: `${SOVEREIGN_DISPLAY} · ${SOVEREIGN_SAVING}% below Backblaze`,
          note: "One erasure-coded copy across Fil One sites in Spain.",
          isFilOne: true,
        },
      ],
      caption:
        "List prices, October 2026. Excludes egress and request fees. Sovereign runs across multiple Fil One sites in Spain.",
    },
    spain: {
      label: "Fil One and Bonum in Spain",
      heading: (
        <>
          Spanish data, <span className="text-brand-500">stored in Spain</span>
        </>
      ),
      sub: "One S3 region across partner data centers, under Spanish and EU law. Bonum, a technology group serving the Spanish-speaking world since 1999, brings Fil One to the Spanish market.",
      partners: [
        {
          role: "Sells, integrates, supports",
          name: "Bonum",
          body: "Best-in-class support in Spanish. Offices in Madrid, Querétaro, Dallas and Boston; helped bring 5G networks to Spain.",
        },
        {
          role: "Builds and runs",
          name: "Fil One",
          body: "Funds, deploys and operates the storage: capital, hardware, software and day-to-day operations.",
        },
        {
          role: "Host",
          name: "Data center partners",
          body: "Local facilities across Spain, joining up into one distributed, resilient sovereign region.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      heading: (
        <>
          Good to <span className="text-brand-500">know</span>
        </>
      ),
      items: [
        {
          question: "Can I bring a colleague?",
          answer: "Please do. As capacity is limited, ask them to RSVP separately so we can save a place for them.",
        },
        {
          question: "What if I can't make it?",
          answer: (
            <>
              Please write to your hosts at {hostsEmailLink} so we can free up your place for someone on the waitlist.
              If you'd still like to hear more about Fil One,{" "}
              <a href={HREFS.en.contact} className={LINK_CLASS}>
                book a call with an expert
              </a>{" "}
              at a time that suits you.
            </>
          ),
        },
        {
          question: "Is there a code of conduct?",
          answer: (
            <>
              Yes. We want everyone to feel welcome, so all guests and hosts agree to follow the Filecoin community{" "}
              {conductLink("code of conduct")}.
            </>
          ),
        },
      ],
    },
    cta: {
      heading: "Nos vemos en Madrid",
      subhead: "Thursday, 12 November from 17:30 in Madrid. Venue to be announced.",
      rsvp: "RSVP",
      talkToExpert: "Talk to an expert",
      note: "Free to attend · Limited capacity · Waitlist available",
    },
  },

  es: {
    hero: {
      badge: "Tapas en Madrid · 12 de noviembre",
      title: (
        <>
          <span className="text-brand-500">Fil One</span> llega a España
        </>
      ),
      description:
        "Ven a pasar una tarde relajada de tapas y copas en Madrid con los equipos de Fil One y Bonum. Sin presentaciones ni discursos comerciales: solo buena comida, buena compañía y la ocasión de seguir con las conversaciones que hemos empezado esta semana.",
      rsvp: "Confirmar asistencia",
      addToCalendar: "Añadir al calendario",
      tagline: "Evento gratuito · Plazas limitadas · Confirma tu asistencia o apúntate a la lista de espera",
      detailsLabel: "Información práctica",
      details: [
        { icon: CalendarBlank, title: "Jueves, 12 de noviembre de 2026", body: "A partir de las 17:30" },
        { icon: MapPin, title: "Lugar por confirmar", body: "Madrid. Muy pronto compartiremos la dirección." },
        { icon: BowlFood, title: "Una tarde de tapas, en persona", body: "Evento gratuito" },
        {
          icon: Users,
          title: "Aforo limitado",
          body: "Confirma tu asistencia para asegurarte una plaza o entrar en la lista de espera",
        },
      ],
    },
    evening: {
      label: "El plan",
      heading: (
        <>
          <span className="text-brand-500">Cerrar la semana</span> sin prisas
        </>
      ),
      items: [
        {
          icon: BowlFood,
          title: "De tapas",
          body: "Buena cocina de aquí y unas copas en Madrid, en un local que anunciaremos muy pronto.",
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
      ],
    },
    rsvp: {
      label: "Confirmación de asistencia",
      heading: (
        <>
          Resérvate <span className="text-brand-500">un hueco</span>
        </>
      ),
      sub: "El aforo es limitado. Confirma tu asistencia para asegurarte una plaza; si ya está todo lleno, te apuntamos a la lista de espera y te avisamos en cuanto haya un hueco.",
    },
    form: {
      firstname: "Nombre",
      lastname: "Apellidos",
      email: "Correo de trabajo",
      company: "Empresa",
      jobtitle: "Cargo",
      invitedBy: "¿Quién te ha invitado? (opcional)",
      dietary: "Alergias o dieta especial (opcional)",
      submit: "Confirmar asistencia",
      sending: "Enviando…",
      privacyNote: "Solo usaremos tus datos para este evento.",
      privacyLink: "Política de privacidad",
      conductNote: "Al asistir, aceptas el",
      conductLink: "código de conducta",
      successTitle: "¡Gracias! Ya tenemos tu respuesta",
      successBody:
        "Te escribiremos para confirmarte la plaza. Si ya está todo lleno, pasas a la lista de espera y te avisamos en cuanto haya un hueco.",
    },
    hosts: {
      label: "Anfitriones",
      heading: (
        <>
          Te presentamos a <span className="text-brand-500">tus anfitriones</span>
        </>
      ),
    },
    about: {
      label: "Sobre Fil One",
      heading: (
        <>
          Otros te cobran por copia. <span className="text-brand-500">Nosotros, por byte.</span>
        </>
      ),
      sub: "Fil One es una nube de almacenamiento de objetos compatible con S3. Sus nodos están en centros de datos locales, junto a los servidores que los usan, y se conectan entre sí para formar regiones soberanas a prueba de caídas.",
      problemLabel: "El problema · La nube tradicional",
      problemTitle: "Unos pocos centros gigantes, lejos de tus datos",
      problemPoints: [
        "Un solo centro de datos suele dar servicio a todo un continente, lejos de los clientes y de sus servidores.",
        "La redundancia se paga a base de copias completas: si quieres que tus datos sobrevivan a la pérdida de un edificio, toca pagar otra copia.",
        "Backblaze y Wasabi no tienen región en España: si quieres redundancia, tus datos acaban fuera del país.",
      ],
      solutionLabel: "La solución · Fil One",
      solutionTitle: "Muchos emplazamientos pequeños, unidos en una sola región soberana",
      solutionPoints: [
        { lead: "Más rápido:", body: "en el mismo edificio que las GPU o a un paso." },
        {
          lead: "Más resiliente:",
          body: "con erasure coding, los datos se reparten entre varios centros de datos; si cae uno, siguen ahí.",
        },
        { lead: "Soberano:", body: "tus datos se quedan en España, bajo la legislación española y de la UE." },
      ],
      proof: [
        { figure: "API de S3", note: "Tus SDK y herramientas funcionan sin cambios" },
        { figure: "11 nueves", note: "Durabilidad del 99,999999999 %, con erasure coding" },
        { figure: "Object Lock", note: "Una clave propia para cada objeto" },
        { figure: "Independiente", note: "Con el respaldo de la Filecoin Foundation" },
        { figure: PRICE_PER_TB_SHORT, note: `Al mes. Plan Sovereign: ${SOVEREIGN_DISPLAY}.` },
      ],
    },
    price: {
      label: "Comparativa de precios",
      heading: (
        <>
          Cuánto cuesta seguir en pie si <span className="text-brand-500">pierdes un centro de datos</span>
        </>
      ),
      sub: "Precio de lista por TB y mes para que tus datos sigan disponibles aunque caiga uno de los centros de datos.",
      rows: [
        {
          provider: "Amazon S3 Standard",
          price: 23,
          display: "~$23",
          note: "Datos repartidos entre centros de datos de una misma región. Proveedor estadounidense.",
        },
        { provider: "Wasabi", price: 15.98, display: "$15.98", note: "Dos copias completas en dos regiones. Sin región en España." },
        { provider: "Backblaze B2", price: 13.9, display: "$13.90", note: "Dos copias completas en dos regiones. Sin región en España." },
        {
          provider: "Fil One Sovereign",
          price: SOVEREIGN_PRICE,
          display: `${SOVEREIGN_DISPLAY} · ${SOVEREIGN_SAVING} % menos que Backblaze`,
          note: "Una sola copia con erasure coding, repartida entre centros de datos de Fil One en España.",
          isFilOne: true,
        },
      ],
      caption:
        "Precios de lista a octubre de 2026. No incluyen cargos por egress ni por solicitudes. Con el plan Sovereign, los datos se reparten entre varios centros de datos de Fil One en España.",
    },
    spain: {
      label: "Fil One y Bonum en España",
      heading: (
        <>
          Datos de aquí, <span className="text-brand-500">guardados aquí</span>
        </>
      ),
      sub: "Fil One funciona como una única región S3 repartida entre centros de datos asociados, sujeta a la legislación española y de la UE. En España lo comercializa Bonum, un grupo tecnológico al servicio del mundo hispanohablante desde 1999.",
      partners: [
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
      ],
    },
    faq: {
      label: "Preguntas frecuentes",
      heading: (
        <>
          Lo que <span className="text-brand-500">conviene saber</span>
        </>
      ),
      items: [
        {
          question: "¿Puedo venir con alguien de mi empresa?",
          answer:
            "Claro que sí. Como las plazas son limitadas, pídele que confirme su asistencia por separado para que podamos guardarle sitio.",
        },
        {
          question: "¿Y si al final no puedo ir?",
          answer: (
            <>
              Escríbenos a {hostsEmailLink} para que podamos ceder tu plaza a alguien de la lista de espera. Y si aun así
              quieres saber más sobre Fil One,{" "}
              <a href={HREFS.es.contact} className={LINK_CLASS}>
                concierta una llamada con un experto
              </a>{" "}
              cuando mejor te venga.
            </>
          ),
        },
        {
          question: "¿Hay un código de conducta?",
          answer: (
            <>
              Sí. Queremos que todo el mundo se sienta bienvenido, así que asistentes y anfitriones se comprometen a
              seguir el {conductLink("código de conducta")} de la comunidad de Filecoin.
            </>
          ),
        },
      ],
    },
    cta: {
      heading: "Nos vemos en Madrid",
      subhead: "El jueves 12 de noviembre, a partir de las 17:30, en Madrid. Lugar por confirmar.",
      rsvp: "Confirmar asistencia",
      talkToExpert: "Hablar con un experto",
      note: "Evento gratuito · Plazas limitadas · Lista de espera si se llena",
    },
  },
};

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

const RsvpForm = ({ lang }: { lang: Lang }) => {
  const t = COPY[lang].form;
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
    const fieldErrors = validateFields<RsvpField>(
      {
        firstname: { value: form.firstname, required: true },
        lastname: { value: form.lastname, required: true },
        email: { value: form.email, required: true, email: true },
        company: { value: form.company, required: true },
        jobtitle: { value: form.jobtitle, required: true },
        invitedBy: { value: form.invitedBy },
        dietary: { value: form.dietary },
      },
      lang,
    );
    setErrors(fieldErrors);
    if (hasErrors(fieldErrors)) {
      focusFirstInvalid(e.currentTarget);
      return;
    }
    setLoading(true);
    setError(null);

    const result = await submitEventRsvp({ event: RSVP_EVENT, ...form, website: honeypot }, lang);

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
        title={t.successTitle}
        action={
          <Button variant="secondary" href={HREFS[lang].calendar} download>
            {COPY[lang].hero.addToCalendar}
          </Button>
        }
      >
        {t.successBody}
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
        <TextField label={t.firstname} required autoComplete="given-name" value={form.firstname} onChange={set("firstname")} error={errors.firstname} />
        <TextField label={t.lastname} required autoComplete="family-name" value={form.lastname} onChange={set("lastname")} error={errors.lastname} />
        <TextField label={t.email} required type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        <TextField label={t.company} required autoComplete="organization" value={form.company} onChange={set("company")} error={errors.company} />
        <TextField label={t.jobtitle} required autoComplete="organization-title" value={form.jobtitle} onChange={set("jobtitle")} error={errors.jobtitle} />
        <TextField label={t.invitedBy} value={form.invitedBy} onChange={set("invitedBy")} error={errors.invitedBy} />
      </div>
      <TextField label={t.dietary} value={form.dietary} onChange={set("dietary")} error={errors.dietary} />

      <div className="flex flex-col gap-3">
        <SubmitButton loading={loading}>{loading ? t.sending : t.submit}</SubmitButton>
        <p className="m-0 font-sans text-small leading-[1.6] text-zinc-500 text-center">
          {t.privacyNote}{" "}
          <a href="/privacy" className="text-zinc-500 underline">
            {t.privacyLink}
          </a>
          <br />
          {t.conductNote}{" "}
          <a href={CODE_OF_CONDUCT_HREF} target="_blank" rel="noopener noreferrer" className="text-zinc-500 underline">
            {t.conductLink}
          </a>
          .
        </p>
      </div>
      {error && <FormError>{error}</FormError>}
    </form>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const CARD_CLASS = "rounded-2xl border border-black/[0.07] bg-white shadow-elevated-sm";

const MadridEventPage = ({ lang }: { lang: Lang }) => {
  useLang(lang);
  useSeo();

  const t = COPY[lang];
  const hrefs = HREFS[lang];
  const maxCost = Math.max(...t.price.rows.map((row) => row.price));

  const eveningView = useInView({ threshold: 0.05 });
  const rsvpView = useInView({ threshold: 0.05 });
  const hostsView = useInView({ threshold: 0.05 });
  const aboutView = useInView({ threshold: 0.05 });
  const priceView = useInView({ threshold: 0.05 });
  const spainView = useInView({ threshold: 0.05 });
  const faqView = useInView({ threshold: 0.05 });

  // Analytics labels stay in English so both pages report under one name.
  const trackRsvp = () => trackCtaClick("RSVP", RSVP_HREF, "primary");

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar
        lang={lang}
        supportHref={hrefs.support}
        contactSalesHref={hrefs.contact}
        languagePaths={MADRID_EVENT_PATHS}
      />

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
              <Pill wrap>{t.hero.badge}</Pill>
              <h1 className="m-0 font-display font-medium text-[34px] sm:text-[44px] md:text-[58px] leading-[1.1] tracking-[-0.025em] text-zinc-950">
                {t.hero.title}
              </h1>
              <p className="m-0 max-w-[520px] font-sans text-body md:text-body-lg leading-[1.65] text-zinc-500 text-pretty">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 hero-fade-2">
                {/* Default size, no glow: next to a secondary button the large
                    glowing primary stands taller (same rule as CtaBanner). */}
                <Button variant="primary" href={RSVP_HREF} onClick={trackRsvp}>
                  {t.hero.rsvp}
                </Button>
                <Button
                  variant="secondary"
                  href={hrefs.calendar}
                  download
                  onClick={() => trackCtaClick("Add to calendar", hrefs.calendar, "secondary")}
                >
                  {t.hero.addToCalendar}
                </Button>
              </div>
              <p className="m-0 font-sans text-[13px] leading-[1.5] text-zinc-500 hero-fade-3">{t.hero.tagline}</p>
            </div>

            <aside aria-label={t.hero.detailsLabel} className={`${CARD_CLASS} p-6 sm:p-7 flex flex-col gap-5 hero-fade-2`}>
              <SectionLabel>{t.hero.detailsLabel}</SectionLabel>
              <ul className="m-0 p-0 list-none flex flex-col gap-5">
                {t.hero.details.map(({ icon, title, body, link }) => (
                  <li key={title} className="flex gap-3">
                    <Icon icon={icon} size={18} className="mt-0.5 shrink-0 text-brand-600" />
                    <div className="flex flex-col gap-0.5">
                      <p className="m-0 font-sans font-semibold text-body-sm text-zinc-950">{title}</p>
                      <p className="m-0 font-sans text-small leading-[1.55] text-zinc-500">
                        {body}
                        {link && (
                          <>
                            {" · "}
                            <a href={link.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
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
              <SectionLabel>{t.evening.label}</SectionLabel>
              <SectionHeading>{t.evening.heading}</SectionHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.evening.items.map(({ icon, title, body }) => (
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
              <SectionLabel>{t.rsvp.label}</SectionLabel>
              <SectionHeading>{t.rsvp.heading}</SectionHeading>
              <SectionSub maxWidth={280}>{t.rsvp.sub}</SectionSub>
            </div>
            <div className={`${CARD_CLASS} p-6 sm:p-8`}>
              <RsvpForm lang={lang} />
            </div>
          </div>
        </section>

        {/* ── Hosts ────────────────────────────────────────────────────────── */}
        <section id="hosts" className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50">
          <div
            ref={hostsView.ref}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${hostsView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>{t.hosts.label}</SectionLabel>
              <SectionHeading>{t.hosts.heading}</SectionHeading>
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

        {/* ── About Fil One ────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={aboutView.ref}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${aboutView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>{t.about.label}</SectionLabel>
              <SectionHeading>{t.about.heading}</SectionHeading>
              <SectionSub maxWidth={620}>{t.about.sub}</SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/[0.07] bg-zinc-50 p-6 sm:p-8 flex flex-col gap-4">
                <SectionLabel>{t.about.problemLabel}</SectionLabel>
                <h3 className="m-0 font-sans font-medium text-h4 text-zinc-950">{t.about.problemTitle}</h3>
                <ul className="m-0 pl-5 flex flex-col gap-2 list-disc marker:text-zinc-400">
                  {t.about.problemPoints.map((point) => (
                    <li key={point} className="font-sans text-body-sm leading-[1.6] text-zinc-600">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-brand-500/20 bg-brand-50 p-6 sm:p-8 flex flex-col gap-4">
                <span className="font-mono font-medium text-eyebrow tracking-[0.08em] uppercase text-brand-600">
                  {t.about.solutionLabel}
                </span>
                <h3 className="m-0 font-sans font-medium text-h4 text-zinc-950">{t.about.solutionTitle}</h3>
                <ul className="m-0 p-0 list-none flex flex-col gap-2">
                  {t.about.solutionPoints.map(({ lead, body }) => (
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
              {t.about.proof.map(({ figure, note }) => (
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
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50">
          <div
            ref={priceView.ref}
            className={`grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start w-full max-w-container mx-auto reveal${priceView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>{t.price.label}</SectionLabel>
              <SectionHeading>{t.price.heading}</SectionHeading>
              <SectionSub maxWidth={280}>{t.price.sub}</SectionSub>
            </div>

            <figure className={`${CARD_CLASS} m-0 p-6 sm:p-8 flex flex-col gap-6`}>
              {t.price.rows.map(({ provider, price, display, note, isFilOne }) => (
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
                      style={{ width: `${(price / maxCost) * 100}%` }}
                    />
                  </div>
                  <span className="font-sans text-small text-zinc-500">{note}</span>
                </div>
              ))}
              <figcaption className="pt-5 border-t border-black/[0.07] font-sans text-[12px] leading-[1.6] text-zinc-500">
                {t.price.caption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Fil One and Bonum in Spain ───────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={spainView.ref}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${spainView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>{t.spain.label}</SectionLabel>
              <SectionHeading>{t.spain.heading}</SectionHeading>
              <SectionSub maxWidth={620}>{t.spain.sub}</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.spain.partners.map(({ role, name, body }) => (
                <div key={name} className={`${CARD_CLASS} p-6 sm:p-7 flex flex-col gap-3`}>
                  <SectionLabel>{role}</SectionLabel>
                  <h3 className="m-0 font-sans font-medium text-body-lg text-zinc-950">{name}</h3>
                  <p className="m-0 font-sans text-body-sm leading-[1.6] text-zinc-500 text-pretty">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section id="faq" className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50">
          <div
            ref={faqView.ref}
            className={`flex flex-col gap-8 w-full max-w-[720px] mx-auto reveal${faqView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>{t.faq.label}</SectionLabel>
              <SectionHeading>{t.faq.heading}</SectionHeading>
            </div>
            <dl className="m-0 border-t border-black/[0.07]">
              {t.faq.items.map(({ question, answer }) => (
                <div key={question} className="py-5 border-b border-black/[0.07] flex flex-col gap-1.5">
                  <dt className="font-sans font-semibold text-body-sm text-zinc-950">{question}</dt>
                  <dd className="m-0 font-sans text-body-sm leading-[1.65] text-zinc-500">{answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────────────────────── */}
        <CtaBanner
          surface="grey"
          heading={t.cta.heading}
          subhead={t.cta.subhead}
          subheadMaxWidth={520}
          cta={{ label: t.cta.rsvp, href: RSVP_HREF, onClick: trackRsvp }}
          secondaryCta={{
            label: t.cta.talkToExpert,
            href: hrefs.contact,
            onClick: () => trackCtaClick("Talk to an expert", hrefs.contact, "secondary"),
          }}
          note={t.cta.note}
        />
      </main>

      <Footer lang={lang} supportHref={hrefs.support} contactSalesHref={hrefs.contact} />
    </div>
  );
};

export default MadridEventPage;
