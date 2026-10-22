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
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { Button } from "@/components/Button";
import Pill from "@/components/Pill";
import Icon from "@/components/Icon";
import IconTile from "@/components/IconTile";
import CtaBanner from "@/components/CtaBanner";
import { TextField, SubmitButton, FormSuccess, FormError } from "@/components/FormControls";
import { HS_EVENT_RSVP_FORM_GUID, submitHubSpotForm } from "@/lib/hubspot";
import { validateFields, hasErrors, focusFirstInvalid, type FieldErrors } from "@/lib/formValidation";
import { trackCtaClick, trackEvent } from "@/lib/analytics";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";

// ─── Event ────────────────────────────────────────────────────────────────────

const RSVP_HREF = "#rsvp";
const CALENDAR_HREF = "/events/fil-one-madrid-2026-11-12.ics";
const MAP_HREF =
  "https://www.google.com/maps/search/?api=1&query=Restaurante+Bancal+Calle+de+Serrano+95+28006+Madrid";
const CONTACT_HREF = "/contact-sales";
/** Where guests send cancellations, so their place goes to the waitlist. */
const HOSTS_EMAIL = "sales@fil.one";

interface EventDetail {
  icon: PhosphorIcon;
  title: string;
  body: string;
  link?: { label: string; href: string };
}

const EVENT_DETAILS: EventDetail[] = [
  { icon: CalendarBlank, title: "Thursday, 12 November 2026", body: "From 17:30" },
  {
    icon: MapPin,
    title: "Restaurante Bancal",
    body: "C. de Serrano, 95, Chamartín, 28006 Madrid",
    link: { label: "Map", href: MAP_HREF },
  },
  { icon: BowlFood, title: "An evening of tapas, in person", body: "Free to attend" },
  { icon: Users, title: "Limited capacity", body: "RSVP to secure your invitation or join the waitlist" },
];

const EVENING = [
  {
    icon: BowlFood,
    title: "Tapas and drinks",
    body: "Good Spanish food and drinks at Restaurante Bancal on Calle de Serrano.",
  },
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
];

// ─── Fil One ──────────────────────────────────────────────────────────────────

const LEGACY_POINTS = [
  "One site often serves a whole continent, far from customers and their compute.",
  "Redundancy is priced as full copies: survive losing a building, pay for another copy.",
  "Backblaze and Wasabi have no region in Spain, so resilient data leaves the country.",
];

const FIL_ONE_POINTS = [
  { lead: "Faster:", body: "in the same building as the GPUs, or a short hop away." },
  { lead: "More resilient:", body: "data is erasure coded across sites; lose a data center and it's still there." },
  { lead: "Sovereign:", body: "Spanish data stored in Spain, under Spanish and EU law." },
];

/** Sovereign tier list price, USD per TB per month. Not in pricing.constants yet. */
const SOVEREIGN_PRICE = 8.99;

const PROOF = [
  { figure: "Drop-in S3", note: "Your SDKs and tools work unchanged" },
  { figure: "11 nines", note: "99.999999999% durability, erasure coded" },
  { figure: "Object Lock", note: "A separate key per object" },
  { figure: "Independent", note: "Backed by the Filecoin Foundation" },
  { figure: PRICE_PER_TB_SHORT, note: `Per month. Sovereign $${SOVEREIGN_PRICE.toFixed(2)}.` },
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
  { provider: "Amazon S3 Standard", price: 23, display: "~$23", note: "Spread across sites in one region. US provider." },
  { provider: "Wasabi", price: 15.98, display: "$15.98", note: "Two full copies in two regions. No region in Spain." },
  { provider: "Backblaze B2", price: 13.9, display: "$13.90", note: "Two full copies in two regions. No region in Spain." },
  {
    provider: "Fil One Sovereign",
    price: SOVEREIGN_PRICE,
    display: `$${SOVEREIGN_PRICE.toFixed(2)} · ${Math.round((1 - SOVEREIGN_PRICE / 13.9) * 100)}% below Backblaze`,
    note: "One erasure-coded copy across Fil One sites in Spain.",
    isFilOne: true,
  },
];

const MAX_RESILIENCE_COST = Math.max(...RESILIENCE_COSTS.map((c) => c.price));

const PARTNERS = [
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
];

// Roles the draft left open show the company alone until confirmed.
const HOSTS = [
  { initials: "JK", name: "James Kurz", role: "Chief Strategy Officer, Fil One", isFilOne: true },
  { initials: "RH", name: "R.W. Holleman", role: "Fil One", isFilOne: true },
  { initials: "PP", name: "Pepo Piñar", role: "Bonum", isFilOne: false },
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

const RsvpForm = () => {
  const [form, setForm] = useState(EMPTY_RSVP);
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
    });
    setErrors(fieldErrors);
    if (hasErrors(fieldErrors)) {
      focusFirstInvalid(e.currentTarget);
      return;
    }
    setLoading(true);
    setError(null);

    const result = await submitHubSpotForm({
      formGuid: HS_EVENT_RSVP_FORM_GUID,
      pageName: "Madrid tapas evening RSVP",
      fields: [
        { objectTypeId: "0-1", name: "firstname", value: form.firstname },
        { objectTypeId: "0-1", name: "lastname", value: form.lastname },
        { objectTypeId: "0-1", name: "email", value: form.email },
        { objectTypeId: "0-1", name: "company", value: form.company },
        { objectTypeId: "0-1", name: "jobtitle", value: form.jobtitle },
        { objectTypeId: "0-1", name: "event_invited_by", value: form.invitedBy },
        { objectTypeId: "0-1", name: "event_dietary_requirements", value: form.dietary },
      ],
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "By submitting this RSVP, you consent to allow Fil One to store and process your details for this event.",
        },
      },
    });

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
        title="Thanks, your RSVP is in"
        action={
          <Button variant="secondary" href={CALENDAR_HREF} download>
            Add to calendar
          </Button>
        }
      >
        We'll confirm your place by email. If the evening is full, you're on the waitlist and we'll let you know as
        soon as a place opens up.
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField label="First name" required autoComplete="given-name" value={form.firstname} onChange={set("firstname")} error={errors.firstname} />
        <TextField label="Last name" required autoComplete="family-name" value={form.lastname} onChange={set("lastname")} error={errors.lastname} />
        <TextField label="Work email" required type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        <TextField label="Company" required autoComplete="organization" value={form.company} onChange={set("company")} error={errors.company} />
        <TextField label="Role" required autoComplete="organization-title" value={form.jobtitle} onChange={set("jobtitle")} error={errors.jobtitle} />
        <TextField label="Who invited you? (optional)" value={form.invitedBy} onChange={set("invitedBy")} error={errors.invitedBy} />
      </div>
      <TextField label="Dietary requirements (optional)" value={form.dietary} onChange={set("dietary")} error={errors.dietary} />

      <div className="flex flex-col gap-3">
        <SubmitButton loading={loading}>{loading ? "Sending…" : "RSVP"}</SubmitButton>
        <p className="m-0 font-sans text-small leading-[1.6] text-zinc-500 text-center">
          We'll only use your details for this event.{" "}
          <a href="/privacy" className="text-zinc-500 underline">
            Privacy policy
          </a>
        </p>
      </div>
      {error && <FormError>{error}</FormError>}
    </form>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const CARD_CLASS = "rounded-2xl border border-black/[0.07] bg-white shadow-elevated-sm";

const MadridEventLandingPage = () => {
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
      <PlatformNavbar />

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
              <Pill wrap>Tapas evening · Madrid · 12 November</Pill>
              <h1 className="m-0 font-display font-medium text-[34px] sm:text-[44px] md:text-[58px] leading-[1.1] tracking-[-0.025em] text-zinc-950">
                Introducing <span className="text-brand-500">Fil One</span> to Spain
              </h1>
              <p className="m-0 max-w-[520px] font-sans text-body md:text-body-lg leading-[1.65] text-zinc-500 text-pretty">
                Join the Fil One and Bonum teams for a relaxed evening of tapas and drinks in Madrid. No slides, no
                pitch: just good food, good company and a chance to continue the conversations we started this week.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 hero-fade-2">
                <Button
                  variant="primary"
                  size="lg"
                  glow
                  href={RSVP_HREF}
                  onClick={() => trackCtaClick("RSVP", RSVP_HREF, "primary")}
                >
                  RSVP
                </Button>
                <Button
                  variant="secondary"
                  href={CALENDAR_HREF}
                  download
                  onClick={() => trackCtaClick("Add to calendar", CALENDAR_HREF, "secondary")}
                >
                  Add to calendar
                </Button>
              </div>
              <p className="m-0 font-sans text-[13px] leading-[1.5] text-zinc-500 hero-fade-3">
                Free to attend · Limited capacity · RSVP to confirm your place or join the waitlist
              </p>
            </div>

            <aside aria-label="Event details" className={`${CARD_CLASS} p-6 sm:p-7 flex flex-col gap-5 hero-fade-2`}>
              <SectionLabel>The details</SectionLabel>
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
              <SectionLabel>The evening</SectionLabel>
              <SectionHeading>
                A relaxed way to <span className="text-brand-500">close the week</span>
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

        {/* ── About Fil One ────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={aboutView.ref}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${aboutView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>About Fil One</SectionLabel>
              <SectionHeading>
                They sell copies. <span className="text-brand-500">We sell bytes.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Fil One is an S3-compatible object storage cloud. Its nodes live inside local data centers, next to the
                compute that uses them, and link up into resilient sovereign regions.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/[0.07] bg-zinc-50 p-6 sm:p-8 flex flex-col gap-4">
                <SectionLabel>The problem · Legacy cloud storage</SectionLabel>
                <h3 className="m-0 font-sans font-medium text-h4 text-zinc-950">A few giant data centers, far from the data</h3>
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
                  The solution · Fil One
                </span>
                <h3 className="m-0 font-sans font-medium text-h4 text-zinc-950">Many small sites, linked into one sovereign region</h3>
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
                  <span className="font-display font-medium text-[24px] leading-[1.15] tracking-[-0.02em] text-brand-600">
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
              <SectionLabel>Price vs. the alternatives</SectionLabel>
              <SectionHeading>
                What it costs to survive <span className="text-brand-500">losing a data center</span>
              </SectionHeading>
              <SectionSub maxWidth={280}>
                List price per TB per month to keep data available if one facility goes down.
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
                List prices, October 2026. Excludes egress and request fees. Sovereign runs across multiple Fil One sites
                in Spain.
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
              <SectionLabel>Fil One and Bonum in Spain</SectionLabel>
              <SectionHeading>
                Spanish data, <span className="text-brand-500">stored in Spain</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                One S3 region across partner data centers, under Spanish and EU law. Bonum, a technology group serving
                the Spanish-speaking world since 1999, brings Fil One to the Spanish market.
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
        <section id="hosts" className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50">
          <div
            ref={hostsView.ref}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${hostsView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>Your hosts</SectionLabel>
              <SectionHeading>
                Meet <span className="text-brand-500">your hosts</span>
              </SectionHeading>
            </div>
            <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HOSTS.map(({ initials, name, role, isFilOne }) => (
                <li key={name} className={`${CARD_CLASS} p-6 flex flex-col gap-4`}>
                  <span
                    aria-hidden="true"
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-display font-medium text-[16px] ${
                      isFilOne ? "bg-brand-50 text-brand-600" : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {initials}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="m-0 font-sans font-semibold text-body-sm text-zinc-950">{name}</p>
                    <p className="m-0 font-sans text-small text-zinc-500">{role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── RSVP ─────────────────────────────────────────────────────────── */}
        <section id="rsvp" className="px-5 md:px-8 py-24 md:py-32 w-full bg-white scroll-mt-24">
          <div
            ref={rsvpView.ref}
            className={`grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start w-full max-w-container mx-auto reveal${rsvpView.inView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>RSVP</SectionLabel>
              <SectionHeading>
                Save your <span className="text-brand-500">seat at the table</span>
              </SectionHeading>
              <SectionSub maxWidth={280}>
                Capacity is limited. RSVP to confirm your invitation; if the evening is full, we'll add you to the
                waitlist and let you know as soon as a place opens up.
              </SectionSub>
            </div>
            <div className={`${CARD_CLASS} p-6 sm:p-8`}>
              <RsvpForm />
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
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading>
                Good to <span className="text-brand-500">know</span>
              </SectionHeading>
            </div>
            <dl className="m-0 border-t border-black/[0.07]">
              <div className="py-5 border-b border-black/[0.07] flex flex-col gap-1.5">
                <dt className="font-sans font-semibold text-body-sm text-zinc-950">Can I bring a colleague?</dt>
                <dd className="m-0 font-sans text-body-sm leading-[1.65] text-zinc-500">
                  Please do. As capacity is limited, ask them to RSVP separately so we can save a place for them.
                </dd>
              </div>
              <div className="py-5 border-b border-black/[0.07] flex flex-col gap-1.5">
                <dt className="font-sans font-semibold text-body-sm text-zinc-950">What if I can't make it?</dt>
                <dd className="m-0 font-sans text-body-sm leading-[1.65] text-zinc-500">
                  Please write to your hosts at{" "}
                  <a href={`mailto:${HOSTS_EMAIL}`} className="text-brand-600 underline">
                    {HOSTS_EMAIL}
                  </a>{" "}
                  so we can free up your place for someone on the waitlist. If you'd still like to hear more about Fil
                  One,{" "}
                  <a href={CONTACT_HREF} className="text-brand-600 underline">
                    book a call with an expert
                  </a>{" "}
                  at a time that suits you.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────────────────────── */}
        <CtaBanner
          surface="grey"
          heading="Nos vemos en Madrid"
          subhead="Thursday, 12 November from 17:30 at Restaurante Bancal, C. de Serrano, 95."
          subheadMaxWidth={520}
          cta={{ label: "RSVP", href: RSVP_HREF, onClick: () => trackCtaClick("RSVP", RSVP_HREF, "primary") }}
          secondaryCta={{
            label: "Talk to an expert",
            href: CONTACT_HREF,
            onClick: () => trackCtaClick("Talk to an expert", CONTACT_HREF, "secondary"),
          }}
          note="Free to attend · Limited capacity · Waitlist available"
        />
      </main>

      <Footer />
    </div>
  );
};

export default MadridEventLandingPage;
