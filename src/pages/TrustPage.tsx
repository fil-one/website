import type { ReactNode } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import {
  ShieldCheck,
  Certificate,
  LockKey,
  Lock,
  Key,
  Buildings,
  FileText,
  Question,
  Bug,
  Cube,
  Eye,
  ArrowsClockwise,
  SealCheck,
  MapPin,
  UserCircleGear,
  Globe,
  Stack,
  ClockCounterClockwise,
  Pulse,
  Envelope,
  LockSimple,
  ArrowRight,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { trackCtaClick } from "@/lib/analytics";
import { Button } from "@/components/Button";
import Icon from "@/components/Icon";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import Pill from "@/components/Pill";

const SECURITY_EMAIL = "security@fil.one";
const requestHref = (subject: string) => `mailto:${SECURITY_EMAIL}?subject=${encodeURIComponent(subject)}`;

const TABS = [
  { id: "verifiable", label: "Verifiable storage" },
  { id: "compliance", label: "Compliance" },
  { id: "protection", label: "Data protection" },
  { id: "resources", label: "Resources" },
  { id: "faq", label: "FAQ" },
];

interface Feature {
  icon: PhosphorIcon;
  title: string;
  description: ReactNode;
}

type Status = "inherited" | "supported" | "planned";

// Status labels are deliberately literal. Never add a "Certified" status until
// Fil One itself holds a dated report we can hand to a customer.
// Dots are decorative; the label carries the meaning.
const STATUS: Record<Status, { label: string; dot: string }> = {
  inherited: { label: "Data center level", dot: "bg-success-600" },
  supported: { label: "Supported", dot: "bg-brand-500" },
  planned: { label: "On our roadmap", dot: "bg-zinc-400" },
};

function InlineLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1 whitespace-nowrap font-medium text-zinc-950 no-underline transition-colors hover:text-brand-600"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Icon icon={ArrowRight} size={13} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

const VERIFIABLE: Feature[] = [
  {
    icon: ArrowsClockwise,
    title: "Continuous proofs",
    description: "Storage providers prove, again and again, that they still hold your data.",
  },
  {
    icon: Cube,
    title: "Public record",
    description: "Every proof is recorded on the Filecoin blockchain, open for anyone to check.",
  },
  {
    icon: Eye,
    title: "Verify without downloading",
    description: "Confirm your data is intact without pulling it back or taking our word for it.",
  },
  {
    icon: Stack,
    title: "Independent providers",
    description: "Objects are erasure coded across independent providers, so none is a single point of failure.",
  },
];

// TODO(confirm before publishing): SOC 2 for Fil One itself stays "planned"
// until an auditor or compliance platform is engaged; only then move it to an
// "In progress" status. GDPR assumes a DPA exists and Legal has signed off.
const FRAMEWORKS: { name: string; status: Status; description: string; request?: { label: string; subject: string } }[] = [
  {
    name: "ISO 27001",
    status: "inherited",
    description: "The data center facilities behind every region are ISO 27001 certified.",
    request: { label: "Request certificate", subject: "Data center ISO 27001 certificate" },
  },
  {
    name: "SOC 2",
    status: "inherited",
    description: "Our data center facilities undergo SOC 2 audits.",
    request: { label: "Request report", subject: "Data center SOC 2 report" },
  },
  {
    name: "PCI DSS",
    status: "inherited",
    description: "The facilities we run on are certified to PCI DSS standards.",
  },
  {
    name: "GDPR",
    status: "supported",
    description: "Keep personal data in the EU with our Europe region.",
    request: { label: "Request DPA", subject: "Data processing agreement (DPA)" },
  },
  {
    name: "SOC 2 for Fil One",
    status: "planned",
    description: "An independent audit of Fil One's own controls, beyond our facilities.",
  },
];

const PROTECTION: Feature[] = [
  { icon: LockKey, title: "Encrypted at rest", description: "Every object is encrypted with AES-256 by default, with nothing to configure." },
  { icon: Lock, title: "Encrypted in transit", description: "Every request to Fil One runs over TLS." },
  { icon: SealCheck, title: "Object lock", description: "Make objects immutable for a retention period you set, in every region." },
  { icon: ClockCounterClockwise, title: "Versioning", description: "Keep prior versions so an overwrite or delete is never final." },
  { icon: ArrowsClockwise, title: "Built for durability", description: "Designed for 11 nines of durability." },
  { icon: Key, title: "Customer-held keys", description: "Encrypt client-side with standard S3 tooling and we store only ciphertext." },
];

const ACCESS: Feature[] = [
  { icon: Key, title: "Bucket-scoped keys", description: "Give people, pipelines and agents keys scoped to a single bucket." },
  { icon: UserCircleGear, title: "Roles and policies", description: "Role-based access and bucket policies control who can do what." },
  { icon: Globe, title: "Region-scoped keys", description: "Each access key works in one region only." },
  { icon: MapPin, title: "Data residency", description: "Choose Europe (France) or US East (Michigan). Data stays in its region." },
];

const INFRASTRUCTURE: Feature[] = [
  { icon: Certificate, title: "Certified facilities", description: "Data centers certified to ISO 27001, SOC 2, and PCI DSS." },
  { icon: Buildings, title: "Independent operators", description: "Each region is run by an independent storage operator." },
  {
    icon: Pulse,
    title: "Public status",
    description: (
      <>
        Live availability for every region.{" "}
        <InlineLink href="https://status.fil.one" external>View status</InlineLink>
      </>
    ),
  },
];

interface Resource {
  title: string;
  /** Public resources link straight through; the rest are requested by email. */
  href?: string;
}

// TODO(confirm before publishing): every locked item must be something we can
// actually send within a few business days of a request.
const RESOURCES: Resource[] = [
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Use", href: "/terms" },
  { title: "Service Level Agreement", href: "/sla" },
  { title: "Acceptable Use Policy", href: "/aup" },
  { title: "Data center ISO 27001 certificate" },
  { title: "Data center SOC 2 report" },
  { title: "Data processing agreement (DPA)" },
  { title: "Subprocessor list" },
  { title: "Security questionnaire (CAIQ, SIG Lite, or your own)" },
];

// TODO(confirm before publishing): answers mirror the site FAQ and the
// compliance statuses above; keep them in sync if either changes.
const FAQS: FaqItem[] = [
  {
    q: "Is Fil One SOC 2 certified?",
    a: "Not yet as a company. The data center facilities that host Fil One are certified to ISO 27001, SOC 2, and PCI DSS, and we can share their reports on request. An audit of Fil One's own controls is on our roadmap.",
  },
  {
    q: "How can I verify my data is stored?",
    a: "Fil One runs on Filecoin, where storage providers continuously prove with cryptographic proofs recorded on a public blockchain that they still hold the data. You can verify your data without downloading it.",
  },
  {
    q: "Who holds the encryption keys?",
    a: "Server-side encryption keys are held by the regional storage operator that fulfills your bucket's region. If your policy requires you to hold the keys, encrypt client-side before upload with standard S3 tooling, and Fil One stores only ciphertext.",
  },
  {
    q: "Where is my data stored?",
    a: "You choose Europe (France) or US East (Michigan) when you create a bucket. A bucket's region is fixed at creation, so data written there stays there.",
  },
  {
    q: "How do I request security documents?",
    a: `Email ${SECURITY_EMAIL} with the documents you need, such as facility reports, our DPA, or a completed questionnaire.`,
  },
];

/**
 * One trust-center section: an icon eyebrow and a two-tone statement on the
 * left (dark lead sentence, muted continuation), detail on the right. Sections
 * are separated by a single hairline instead of cards.
 */
const Section = ({
  id,
  icon,
  eyebrow,
  lead,
  body,
  children,
}: {
  id: string;
  icon: PhosphorIcon;
  eyebrow: string;
  lead: string;
  body: string;
  children: ReactNode;
}) => (
  <section id={id} aria-labelledby={`${id}-label`} className="scroll-mt-[104px] border-t border-black/[0.07] first:border-t-0">
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 py-16 md:py-24">
      <div className="flex flex-col gap-4 lg:max-w-[400px]">
        <h2 id={`${id}-label`} className="inline-flex items-center gap-2 font-sans font-medium text-body-sm text-brand-600 m-0">
          <Icon icon={icon} size={16} />
          {eyebrow}
        </h2>
        <p className="font-display font-medium text-[19px] md:text-[21px] leading-[1.45] tracking-[-0.01em] m-0 text-pretty">
          <span className="text-zinc-950">{lead}</span> <span className="text-zinc-500">{body}</span>
        </p>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
);

const FeatureGrid = ({ items }: { items: Feature[] }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9 list-none p-0 m-0">
    {items.map(({ icon, title, description }) => (
      <li key={title} className="flex flex-col gap-2">
        <h3 className="inline-flex items-center gap-2 font-sans font-medium text-body text-zinc-950 m-0">
          <Icon icon={icon} size={17} className="text-zinc-500" />
          {title}
        </h3>
        <p className="font-sans text-body-sm leading-[1.6] text-zinc-500 m-0">{description}</p>
      </li>
    ))}
  </ul>
);

const TrustPage = () => {
  useSeo();

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PlatformNavbar />
      <main id="main-content">

        {/* Company header */}
        <header className="w-full border-b border-black/[0.07] bg-white pt-header">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between px-5 md:px-8 pt-10 pb-8 md:pt-16 md:pb-10 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-4 max-w-[640px]">
              <Pill className="self-start">Trust center</Pill>
              <h1 className="font-display font-medium text-h2 md:text-h1 tracking-[-0.02em] leading-[1.1] text-zinc-950 m-0">
                Fil One Trust Center
              </h1>
              <p className="font-sans text-body md:text-body-lg leading-[1.6] text-zinc-600 m-0">
                Fil One is S3-compatible object storage built on Filecoin. Storage is backed by cryptographic proof, not just promises. Here is how we protect your data, and an honest view of where our compliance stands today.
              </p>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 list-none p-0 m-0 font-sans text-body-sm">
                <li>
                  <a href={`mailto:${SECURITY_EMAIL}`} className="inline-flex items-center gap-1.5 text-zinc-600 underline underline-offset-2 hover:text-brand-600">
                    <Icon icon={Envelope} size={16} /> {SECURITY_EMAIL}
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="inline-flex items-center gap-1.5 text-zinc-600 underline underline-offset-2 hover:text-brand-600">
                    <Icon icon={FileText} size={16} /> Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://status.fil.one" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-zinc-600 underline underline-offset-2 hover:text-brand-600">
                    <Icon icon={Pulse} size={16} /> System status
                  </a>
                </li>
              </ul>
            </div>
            <Button
              variant="primary"
              tone="zinc"
              href={requestHref("Security documentation request")}
              onClick={() => trackCtaClick("Request documents", `mailto:${SECURITY_EMAIL}`, "primary")}
              className="self-start md:self-auto shrink-0"
            >
              Request documents
            </Button>
          </div>
        </header>

        {/* Section nav */}
        <nav aria-label="Trust center sections" className="sticky top-header z-40 w-full border-b border-black/[0.07] bg-white/85 backdrop-blur-[20px]">
          <ul className="flex gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-5 md:px-8 w-full max-w-container mx-auto list-none m-0">
            {TABS.map(({ id, label }) => (
              <li key={id} className="shrink-0">
                <a href={`#${id}`} className="block py-3 font-sans text-[13.5px] text-zinc-500 no-underline transition-colors hover:text-zinc-950">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-5 md:px-8 w-full max-w-container mx-auto">

          <Section
            id="verifiable"
            icon={ShieldCheck}
            eyebrow="Verifiable storage"
            lead="Proof, not promises."
            body="An audit shows a provider's controls looked right on the day it ran. On Filecoin, storage is proven continuously, with cryptographic proofs anyone can check."
          >
            {/* TODO: link to the docs page that explains how to check a proof, once it exists. */}
            <FeatureGrid items={VERIFIABLE} />
          </Section>

          <Section
            id="compliance"
            icon={Certificate}
            eyebrow="Compliance"
            lead="An honest view of where we stand."
            body="We label every framework by what holds today. Data center level means the facilities that host our infrastructure hold the certification, not Fil One as a company."
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9 list-none p-0 m-0">
              {FRAMEWORKS.map(({ name, status, description, request }) => (
                <li key={name} className="flex flex-col gap-2">
                  <h3 className="font-sans font-medium text-body text-zinc-950 m-0">{name}</h3>
                  <span className="inline-flex items-center gap-2 font-sans text-small text-zinc-600">
                    <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${STATUS[status].dot}`} />
                    {STATUS[status].label}
                  </span>
                  <p className="font-sans text-body-sm leading-[1.6] text-zinc-500 m-0">
                    {description}
                    {request && (
                      <>
                        {" "}
                        <InlineLink href={requestHref(`Request: ${request.subject}`)}>{request.label}</InlineLink>
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="protection"
            icon={LockKey}
            eyebrow="Data protection"
            lead="Encrypted and immutable by default."
            body="Your data is encrypted at rest and in transit with nothing to configure, and object lock keeps it from being changed or deleted."
          >
            <FeatureGrid items={PROTECTION} />
          </Section>

          <Section
            id="access"
            icon={Key}
            eyebrow="Access and residency"
            lead="You decide who gets in, and where data lives."
            body="Scope every key to the narrowest access it needs, and pin each bucket to the region your policy requires."
          >
            <FeatureGrid items={ACCESS} />
          </Section>

          <Section
            id="infrastructure"
            icon={Buildings}
            eyebrow="Infrastructure"
            lead="Independent operators, certified facilities."
            body="Fil One runs in professionally operated data centers, and each region is run by an independent storage operator."
          >
            <FeatureGrid items={INFRASTRUCTURE} />
          </Section>

          <Section
            id="resources"
            icon={FileText}
            eyebrow="Resources"
            lead="Everything your review needs."
            body="Our policies are public. Facility reports, our DPA, the subprocessor list, and questionnaire answers are available on request."
          >
            <ul className="list-none p-0 m-0 border-t border-black/[0.07]">
              {RESOURCES.map(({ title, href }) => (
                <li key={title} className="border-b border-black/[0.07]">
                  <a
                    href={href ?? requestHref(`Request: ${title}`)}
                    className="group flex items-center justify-between gap-4 py-3.5 font-sans text-body-sm text-zinc-950 no-underline"
                  >
                    <span className="transition-colors group-hover:text-brand-600">{title}</span>
                    {href ? (
                      <Icon icon={ArrowRight} size={14} className="shrink-0 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-950" />
                    ) : (
                      <span className="inline-flex items-center gap-1.5 shrink-0 text-small text-zinc-500 transition-colors group-hover:text-zinc-950">
                        <Icon icon={LockSimple} size={13} />
                        Request
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="faq"
            icon={Question}
            eyebrow="FAQ"
            lead="Common questions."
            body="The answers security teams ask for most. For anything else, email us."
          >
            <div className="border-b border-black/[0.07]">
              <FaqAccordion items={FAQS} idPrefix="trust-faq" />
            </div>
          </Section>

          {/* TODO(confirm before publishing): response window and safe-harbor wording with Engineering and Legal. */}
          <Section
            id="disclosure"
            icon={Bug}
            eyebrow="Responsible disclosure"
            lead="Found a vulnerability?"
            body="We'll acknowledge your report, keep you updated, and credit you once it's fixed if you'd like. Please give us a reasonable chance to fix it before disclosing publicly."
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-medium text-body text-zinc-950 m-0">Report it to our security team</h3>
              <p className="font-sans text-body-sm leading-[1.6] text-zinc-500 m-0">
                Include a description of the issue and steps to reproduce it.{" "}
                <InlineLink href={requestHref("Vulnerability report")}>{SECURITY_EMAIL}</InlineLink>
              </p>
            </div>
          </Section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrustPage;
