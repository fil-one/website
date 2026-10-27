import type { ReactNode } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import {
  ShieldCheck,
  LockKey,
  Lock,
  SealCheck,
  Certificate,
  FileText,
  Globe,
  Heartbeat,
  IdentificationBadge,
  SquaresFour,
  Check,
  Clock,
  Pulse,
  Envelope,
  LockSimple,
  ArrowRight,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { trackCtaClick } from "@/lib/analytics";
import Hero from "@/components/Hero";
import CtaBanner from "@/components/CtaBanner";
import Icon from "@/components/Icon";
import IconTile from "@/components/IconTile";
import FeatureCard from "@/components/FeatureCard";
import Pill from "@/components/Pill";
import TextLink from "@/components/TextLink";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import { TRUST_DOCUMENTS, trustRequestHref } from "@/lib/trustDocuments";
import { SectionHeading, SectionLabel, SectionSub } from "@/components/LandingPrimitives";

const SECURITY_EMAIL = "security@fil.one";
const LEGAL_EMAIL = "legal@fil.one";

const TABS = [
  { id: "infrastructure", label: "Infrastructure" },
  { id: "frameworks", label: "Frameworks" },
  { id: "controls", label: "Built-in controls" },
  { id: "resources", label: "Resources" },
  { id: "faq", label: "FAQ" },
];

// Status labels are deliberately literal. Never add a "Certified" status until
// Fil One itself holds a dated report we can hand to a customer.
// HIPAA, CJIS and GDPR aren't certifications, so they read "Supported".
type Status = "supported" | "progress";

const STATUS: Record<Status, { label: string; tone: "success" | "neutral" }> = {
  supported: { label: "Supported", tone: "success" },
  progress: { label: "In progress", tone: "neutral" },
};

interface Framework {
  id: string;
  name: string;
  kind: string;
  icon: PhosphorIcon;
  status: Status;
  summary: string;
  points: string[];
  /** Available frameworks: the document and how to request it. */
  doc?: string;
  cta?: { label: string; href: string };
  /** In-progress frameworks: which document is coming, and when. Replaces doc and cta. */
  pending?: string;
}

// TODO(confirm before publishing): every status below with Legal and
// Compliance. HIPAA assumes a signed BAA template exists; CJIS "Supported"
// assumes the Security Addendum and personnel requirements are met; GDPR
// assumes a DPA exists; SOC 2, ISO 27001 and NIST stay "In progress" only
// while an auditor or compliance platform is engaged.
const FRAMEWORKS: Framework[] = [
  {
    id: "hipaa",
    name: "HIPAA / HITECH",
    kind: "US health data",
    icon: Heartbeat,
    status: "supported",
    summary: "Rules for protecting health information, with HITECH adding breach notification duties. Sign a BAA with Fil One before storing any PHI.",
    points: [
      "Business Associate Agreement on request",
      "Encryption at rest (AES-256) and TLS in transit",
      "Object lock for tamper-proof retention",
    ],
    doc: "BAA",
    cta: { label: "Request a BAA", href: trustRequestHref("baa") },
  },
  {
    id: "cjis",
    name: "CJIS Security Policy",
    kind: "US criminal justice data",
    icon: IdentificationBadge,
    status: "supported",
    summary: "FBI requirements for systems that store or process criminal justice information (CJI).",
    points: ["Encryption in transit and at rest", "Immutable retention with object lock"],
    doc: "Security Addendum",
    cta: { label: "Talk to sales", href: "/contact-sales" },
  },
  {
    id: "gdpr",
    name: "GDPR",
    kind: "EU data protection",
    icon: Globe,
    status: "supported",
    summary: "You are the controller for personal data you store, and Fil One processes it on your instructions. Buckets placed in Europe keep data in the EU.",
    points: ["Place buckets in Europe to keep data in jurisdiction", "Data Processing Addendum"],
    doc: "DPA",
    cta: { label: "Request DPA", href: trustRequestHref("dpa") },
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    kind: "AICPA attestation",
    icon: ShieldCheck,
    status: "progress",
    summary: "An independent audit of how security, availability and confidentiality controls operate over time, not just on one day.",
    points: ["Storage runs in data centers with SOC 2 reports", "Encryption at rest and in transit, on by default"],
    pending: "Report available under NDA after the audit",
  },
  {
    id: "iso27001",
    name: "ISO/IEC 27001",
    kind: "Information security management",
    icon: Certificate,
    status: "progress",
    summary: "The international standard for running an information security management system (ISMS) with documented risk treatment.",
    points: ["Facilities certified to ISO 27001", "Role-based access and bucket-scoped keys"],
    pending: "Certificate available once certified",
  },
  {
    id: "nist",
    name: "NIST SP 800-53",
    kind: "Federal security controls",
    icon: SquaresFour,
    status: "progress",
    summary: "The US federal catalog of security and privacy controls, used by agencies and their vendors.",
    points: ["Access control: scoped keys and bucket policies", "System integrity: object lock and versioning"],
    pending: "Control mapping available once complete",
  },
];

const HERO_BADGES = [
  { id: "hipaa", label: "HIPAA / HITECH" },
  { id: "cjis", label: "CJIS" },
  { id: "gdpr", label: "GDPR" },
  { id: "soc2", label: "SOC 2 Type II" },
  { id: "iso27001", label: "ISO/IEC 27001" },
  { id: "nist", label: "NIST 800-53" },
];

// FeatureCard descriptions must fit two lines.
const CONTROLS: { icon: PhosphorIcon; title: string; description: string }[] = [
  { icon: LockKey, title: "Encrypted at rest", description: "AES-256 on every object. Or encrypt client-side yourself." },
  { icon: Lock, title: "TLS on every request", description: "All traffic to the S3 endpoint runs over TLS." },
  { icon: SealCheck, title: "Object lock and versioning", description: "Turn on per bucket for compliance retention." },
  { icon: ShieldCheck, title: "Cryptographic proof", description: "Verify your data is stored, without downloading it." },
];

const RESOURCE_GROUPS: { heading: string; items: { title: string; href: string; requested?: boolean }[] }[] = [
  {
    heading: "Public policies",
    items: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Use", href: "/terms" },
      { title: "Service Level Agreement", href: "/sla" },
      { title: "Acceptable Use Policy", href: "/aup" },
    ],
  },
  {
    heading: "Available on request",
    items: TRUST_DOCUMENTS.map(({ value, label }) => ({ title: label, href: trustRequestHref(value), requested: true })),
  },
];

// TODO(confirm before publishing): answers mirror the site FAQ and the
// framework statuses above; keep them in sync if either changes.
const FAQS: FaqItem[] = [
  {
    q: "Is Fil One SOC 2 certified?",
    a: "Not yet as a company. The data center facilities that host Fil One are certified to ISO 27001, SOC 2, and PCI DSS. A SOC 2 Type II attestation for Fil One itself is in progress.",
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
    a: "You choose whether each bucket is placed in Europe or the US when you create it. Placement is fixed at creation, so data written to a bucket stays where you put it.",
  },
  {
    q: "How do I request security documents?",
    a: "Use the request form linked from Resources on this page to ask for our DPA or a BAA.",
  },
];

const HEADER_LINK = "inline-flex items-center gap-1.5 text-zinc-600 underline underline-offset-2 hover:text-brand-600";

/** Section shell: eyebrow, heading and optional sub, then content. */
const Section = ({
  id,
  eyebrow,
  title,
  sub,
  className = "",
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
  children: ReactNode;
}) => (
  <section id={id} aria-labelledby={`${id}-heading`} className={`scroll-mt-[104px] px-5 md:px-8 py-20 md:py-28 w-full ${className}`}>
    <div className="flex flex-col gap-10 md:gap-12 w-full max-w-container mx-auto">
      <div className="flex flex-col gap-4">
        <SectionLabel>{eyebrow}</SectionLabel>
        <SectionHeading id={`${id}-heading`}>{title}</SectionHeading>
        {sub && <SectionSub maxWidth={640}>{sub}</SectionSub>}
      </div>
      {children}
    </div>
  </section>
);

const CheckItem = ({ icon, iconClass, children }: { icon: PhosphorIcon; iconClass: string; children: ReactNode }) => (
  <li className="flex gap-2.5 font-sans text-body-sm leading-[1.55] text-zinc-700">
    <Icon icon={icon} size={18} className={`mt-px shrink-0 ${iconClass}`} />
    {children}
  </li>
);

const TrustPage = () => {
  useSeo();

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PlatformNavbar />
      <main id="main-content">

        <Hero
          glow
          grid
          badge={<Pill>Trust center</Pill>}
          title={<>Compliance you can check,<br className="hidden sm:block" /> <span className="text-brand-500">not just trust</span></>}
          titleMaxWidth={860}
          description="How Fil One supports the frameworks your compliance teams ask about."
          descriptionMaxWidth={640}
          contentClassName="pb-16 md:pb-20"
        >
          <ul aria-label="Frameworks" className="mt-10 flex flex-wrap justify-center gap-2.5 list-none p-0 m-0">
            {HERO_BADGES.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-black/[0.08] bg-white/70 font-mono text-[13px] text-zinc-700 no-underline transition-colors hover:border-brand/30 hover:text-zinc-950"
                >
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Hero>

        {/* Section nav, with the contact and policy links pinned opposite the tabs */}
        <div className="sticky top-header z-40 w-full border-y border-black/[0.07] bg-white/85 backdrop-blur-[20px]">
          <div className="px-5 md:px-8 w-full">
          <div className="flex items-center justify-between gap-8 w-full max-w-container mx-auto">
            <nav aria-label="Trust center sections" className="min-w-0">
              <ul className="flex gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden list-none p-0 m-0">
                {TABS.map(({ id, label }) => (
                  <li key={id} className="shrink-0">
                    <a href={`#${id}`} className="block py-3 font-sans text-[13.5px] text-zinc-600 no-underline transition-colors hover:text-zinc-950">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Below lg these links live in the footer and the closing CTA instead. */}
            <ul aria-label="Trust center links" className="hidden lg:flex shrink-0 items-center gap-5 list-none p-0 m-0 font-sans text-[13.5px]">
              <li>
                <a href={`mailto:${SECURITY_EMAIL}`} className={HEADER_LINK}>
                  <Icon icon={Envelope} size={15} /> {SECURITY_EMAIL}
                </a>
              </li>
              <li>
                <a href="/privacy" className={HEADER_LINK}>
                  <Icon icon={FileText} size={15} /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://status.fil.one" target="_blank" rel="noopener noreferrer" className={HEADER_LINK}>
                  <Icon icon={Pulse} size={15} /> System status
                </a>
              </li>
            </ul>
          </div>
          </div>
        </div>

        <Section
          id="infrastructure"
          eyebrow="Infrastructure"
          title="Certified where your data lives"
          sub="Compliance comes down to scope. Ours covers two: the data centers that store your objects, and the network and software Fil One runs on top of them."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-5 p-8 md:p-10 rounded-2xl border border-success-600/20 bg-success-50">
              <div className="flex items-start justify-between gap-3">
                <SectionLabel>Data centers</SectionLabel>
                <Pill tone="success">Current</Pill>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-display font-medium text-[56px] md:text-[72px] leading-none tracking-[-0.04em] text-zinc-950">100%</span>
                <span className="font-sans text-body md:text-body-lg leading-[1.5] text-zinc-700">of Fil One storage runs in certified data centers.</span>
              </div>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                <CheckItem icon={Check} iconClass="text-success-700">ISO/IEC 27001 certified</CheckItem>
                <CheckItem icon={Check} iconClass="text-success-700">SOC 2 Type II attested</CheckItem>
                <CheckItem icon={Check} iconClass="text-success-700">PCI DSS certified</CheckItem>
              </ul>
            </div>

            <div className="flex flex-col gap-5 p-8 md:p-10 rounded-2xl border border-black/[0.07] bg-white shadow-elevated">
              <div className="flex items-start justify-between gap-3">
                <SectionLabel>Fil One</SectionLabel>
                <Pill tone="neutral">In progress</Pill>
              </div>
              <h3 className="font-display font-medium text-h4 md:text-[28px] leading-[1.2] tracking-[-0.02em] text-zinc-950 m-0">
                The network and the software, audited too
              </h3>
              <p className="font-sans text-body-sm md:text-body leading-[1.65] text-zinc-500 m-0">
                Fil One runs the network and writes the software that stores your data. We're now pursuing the same attestations for Fil One itself.
              </p>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                <CheckItem icon={Clock} iconClass="text-zinc-500">ISO/IEC 27001 certification</CheckItem>
                <CheckItem icon={Clock} iconClass="text-zinc-500">SOC 2 Type II attestation</CheckItem>
              </ul>
            </div>
          </div>
        </Section>

        <Section
          id="frameworks"
          eyebrow="Frameworks"
          title={<>Where our <span className="text-brand-500">network and software</span> stand</>}
          sub="Every framework your compliance team asks about, and its status today."
          className="bg-zinc-50 border-y border-black/[0.05]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {FRAMEWORKS.map(({ id, name, kind, icon, status, summary, points, doc, cta, pending }) => (
              <article
                key={id}
                id={id}
                aria-labelledby={`${id}-name`}
                className={`scroll-mt-[120px] flex flex-col gap-5 px-6 pt-6 sm:px-8 sm:pt-8 pb-5 rounded-2xl border border-black/[0.07] bg-white shadow-elevated`}
              >
                <div className="flex items-start justify-between gap-3">
                  <IconTile icon={icon} />
                  <Pill tone={STATUS[status].tone}>{STATUS[status].label}</Pill>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 id={`${id}-name`} className="font-sans font-medium text-body-lg leading-[1.3] text-zinc-950 m-0">{name}</h3>
                  <span className="font-sans text-small text-zinc-500">{kind}</span>
                </div>
                <p className="font-sans text-body-sm leading-[1.6] text-zinc-500 m-0 text-pretty">{summary}</p>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {points.map((p) => (
                    <CheckItem key={p} icon={Check} iconClass="text-brand-600">{p}</CheckItem>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 min-h-[42px] pt-5 border-t border-black/[0.07]">
                  {pending ? (
                    <span className="inline-flex items-center gap-1.5 font-sans text-small text-zinc-500">
                      <Icon icon={Clock} size={14} className="shrink-0" />
                      {pending}
                    </span>
                  ) : (
                    <>
                      <span className="font-sans text-small text-zinc-500">{doc}</span>
                      {cta && (
                        <TextLink
                          href={cta.href}
                          tone="brand"
                          arrow
                          onClick={() => trackCtaClick(cta.label, cta.href, "secondary")}
                        >
                          {cta.label}
                        </TextLink>
                      )}
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="controls"
          eyebrow="Built-in controls"
          title="Security built in"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {CONTROLS.map(({ icon, title, description }) => (
              <FeatureCard key={title} icon={icon} title={title} description={description} />
            ))}
          </div>
        </Section>

        <Section
          id="resources"
          eyebrow="Resources"
          title="Everything your review needs"
          sub="Our policies are public. Our DPA and BAA are available on request."
          className="bg-zinc-50 border-y border-black/[0.05]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {RESOURCE_GROUPS.map(({ heading, items }) => (
              <div key={heading} className="flex flex-col gap-3">
                <h3 className="font-sans font-medium text-body-sm text-zinc-950 m-0">{heading}</h3>
                <ul className="list-none p-0 m-0 border-t border-black/[0.07]">
                  {items.map(({ title, href, requested }) => (
                    <li key={title} className="border-b border-black/[0.07]">
                      <a
                        href={href}
                        className="group flex items-center justify-between gap-4 py-3.5 font-sans text-body-sm text-zinc-700 no-underline"
                      >
                        <span className="transition-colors group-hover:text-brand-600">{title}</span>
                        {!requested ? (
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
              </div>
            ))}
          </div>
        </Section>

        {/* FAQ: heading on the left, questions on the right */}
        <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-[104px] px-5 md:px-8 py-20 md:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-10 lg:gap-16 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-4">
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading id="faq-heading">Common questions</SectionHeading>
              <SectionSub maxWidth={360}>The answers security teams ask for most.<br />Can't find yours?</SectionSub>
              <TextLink
                href="/contact-sales"
                tone="brand"
                arrow
                className="self-start"
                onClick={() => trackCtaClick("Talk to sales", "/contact-sales", "secondary")}
              >
                Talk to sales
              </TextLink>
            </div>
            <FaqAccordion items={FAQS} idPrefix="trust-faq" />
          </div>
        </section>

        <CtaBanner
          heading="Talk to our team"
          subhead="Questions about security, compliance, or need a document? Our team can take care of you."
          cta={{
            label: "Talk to sales",
            href: "/contact-sales",
            onClick: () => trackCtaClick("Talk to sales", "/contact-sales", "primary"),
          }}
          note={
            <>
              Security questions: <a href={`mailto:${SECURITY_EMAIL}`} className="text-white underline underline-offset-2">{SECURITY_EMAIL}</a>
              {" · "}
              Legal terms: <a href={`mailto:${LEGAL_EMAIL}`} className="text-white underline underline-offset-2">{LEGAL_EMAIL}</a>
            </>
          }
        />

      </main>
      <Footer />
    </div>
  );
};

export default TrustPage;
