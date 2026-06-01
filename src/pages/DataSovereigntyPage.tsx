import { Globe, ShieldCheck, Lock, Eye, MapPin, ArrowsOutCardinal, Buildings, Scales, FirstAidKit, CurrencyEur } from "@phosphor-icons/react";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import {
  LandingPage,
  LandingHero,
  LandingSection,
  SectionLabel,
  SectionHeading,
  SectionSub,
  ProblemCards,
  FeatureCards,
  ValueProps,
  DarkCtaBanner,
} from "@/components/landing";
import type {
  ProblemCard,
  FeatureCard,
  ValueProp,
  HeroCta,
} from "@/components/landing";

// ─── Data ─────────────────────────────────────────────────────────────────────

const HERO_CTAS: HeroCta[] = [
  { label: "Try 30 days for free", href: "https://app.fil.one/login?screen_hint=signup", variant: "primary" },
  { label: "Talk to an expert", href: "/contact-sales", variant: "secondary" },
];

const PROBLEMS: ProblemCard[] = [
  {
    label: "Hyperscalers",
    catchLine: "Your data crosses borders you never approved.",
    body: "AWS, Google Cloud, and Azure replicate objects across regions by default. A team in Frankfurt may discover their data transits through US-based infrastructure — subject to the CLOUD Act and FISA 702 — without any explicit opt-in. For organisations under GDPR Article 44, that's not a configuration detail. It's a compliance violation waiting to surface in an audit.",
    footer: "Global by design. Sovereign by accident.",
  },
  {
    label: "Compliance theatre",
    catchLine: "A checkbox isn't the same as a guarantee.",
    body: "Most providers offer an 'EU region' option and a compliance PDF. But the parent entity is still a US corporation. Metadata, encryption keys, and support access may still route through US jurisdiction. When a regulator asks where your data actually lives and who can access it, 'we selected the EU region' is not a sufficient answer.",
    footer: "Configured for compliance. Not built for it.",
  },
  {
    label: "Doing nothing",
    catchLine: "Regulations don't wait for your next review cycle.",
    body: "The EU Data Act took effect in September 2025. DORA applies to financial entities since January 2025. Canada's CPPA is advancing through Parliament. Every quarter without a data sovereignty strategy is a quarter where your organisation is exposed — and where a regulator, client, or auditor could ask questions you can't answer yet.",
    footer: "The cost of inaction compounds faster than storage fees.",
  },
];

const FEATURES: FeatureCard[] = [
  {
    icon: MapPin,
    title: "EU-resident infrastructure",
    desc: "Your data lives in EU-based storage providers. Not 'EU region selected on a US platform' — infrastructure physically located in and legally governed by European jurisdiction. Currently serving from Southern France with sub-15 ms latency across Western Europe.",
  },
  {
    icon: Eye,
    title: "Cryptographic proof of location and integrity",
    desc: "Every object receives a content-addressed fingerprint (CID) verified every 24 hours via Filecoin Proof of Spacetime. You don't take our word for where your data is — you verify it independently. Auditors can confirm data residency against the public blockchain.",
  },
  {
    icon: Lock,
    title: "Object Lock and retention policies",
    desc: "Compliance and governance modes for immutable retention. Set legal holds, define retention periods, and enforce WORM storage for regulatory archives. Tamper-evident by design — not by policy.",
  },
  {
    icon: ArrowsOutCardinal,
    title: "No vendor lock-in",
    desc: "Standard S3 API. No proprietary format, no migration tax, no exit fees. If regulations change or you need to move, your data leaves with the same tools you used to put it in. Sovereignty means you control the exit, too.",
  },
  {
    icon: ShieldCheck,
    title: "Eleven nines of durability",
    desc: "Data is distributed across an independent network of storage providers — not concentrated in a single data centre. Redundancy is cryptographically verified, not just contractually promised.",
  },
  {
    icon: CurrencyEur,
    title: "Flat, predictable pricing in EUR",
    desc: "€4.99/TB/month. No egress fees. No per-request charges. No surprise line items after a busy month. Budget for compliance infrastructure without budgeting for billing uncertainty.",
  },
];

const USE_CASES: FeatureCard[] = [
  {
    icon: FirstAidKit,
    title: "Healthcare and life sciences",
    desc: "Patient records, imaging data, clinical trial archives, and genomic datasets under GDPR, national health data laws, and the European Health Data Space regulation. Object Lock for retention. Verifiable proof for audit. EU-only infrastructure by default.",
    cta: { label: "Talk to our team", href: "/contact-sales" },
  },
  {
    icon: Scales,
    title: "Financial services and insurance",
    desc: "Transaction archives, risk model outputs, KYC documents, and regulatory correspondence under DORA, MiFID II, and Solvency II. Immutable storage with cryptographic integrity proofs satisfies record-keeping requirements without relying on a provider's word.",
    cta: { label: "Talk to our team", href: "/contact-sales" },
  },
  {
    icon: Buildings,
    title: "Government and public sector",
    desc: "Citizen data, case files, geospatial datasets, and interagency archives under national data residency mandates. From EU member states to Canadian federal and provincial requirements — sovereign infrastructure with no foreign jurisdiction exposure.",
    cta: { label: "Talk to our team", href: "/contact-sales" },
  },
];

const VALUE_PROPS: ValueProp[] = [
  {
    icon: MapPin,
    title: "Choose where your data lives",
    body: "Currently serving from EU-West (Southern France), with coverage across Western Europe at sub-15 ms. Fil One's provider network model means new sovereign regions can come online without migrating your data off-platform. You pick the jurisdiction — the infrastructure follows.",
  },
  {
    icon: Eye,
    title: "Prove it to anyone who asks",
    body: "Every object is cryptographically fingerprinted and verified every 24 hours on-chain. When a regulator, auditor, or client asks where your data is and whether it's intact, you hand them a proof — not a PDF.",
  },
  {
    icon: ArrowsOutCardinal,
    title: "Adapt without starting over",
    body: "Regulations change. Jurisdictions shift. Fil One uses standard S3 APIs with no proprietary formats and no exit fees. If you need to move regions, change providers, or comply with a new mandate, the migration is a CLI command — not a project.",
  },
];

// ─── Page-specific: Sovereignty proof section ─────────────────────────────────

const SovereigntyProof = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-10 w-full reveal${inView ? " in-view" : ""}`}
    >
      <div className="flex flex-col gap-4 items-center text-center max-w-[560px] mx-auto">
        <SectionLabel>How it works</SectionLabel>
        <SectionHeading>
          Sovereignty you can <span style={{ color: "#0090FF" }}>verify</span>, not just configure
        </SectionHeading>
        <SectionSub>
          Most providers ask you to trust their region labels. Fil One gives you cryptographic proof.
        </SectionSub>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {[
          {
            step: "01",
            title: "You upload to an EU endpoint",
            body: "Objects land at eu-west-1.s3.fil.one — infrastructure physically in the EU, operated under European legal jurisdiction. Standard S3 API, same tools you already use.",
          },
          {
            step: "02",
            title: "Filecoin verifies every 24 hours",
            body: "Each object receives a content-addressed identifier (CID). Storage providers prove possession via Proof of Spacetime — a cryptographic challenge verified on the Filecoin blockchain. No self-reporting. No trust required.",
          },
          {
            step: "03",
            title: "You prove residency to anyone",
            body: "Hand an auditor the CID. They can independently verify where the data is stored, that it hasn't been modified, and that the storage provider has proven possession within the last 24 hours. The proof is public and immutable.",
          },
        ].map(({ step, title, body }) => (
          <div
            key={step}
            className="flex flex-col gap-4 p-7 rounded-2xl"
            style={{
              border: "1px solid rgba(0,0,0,0.07)",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 28,
                letterSpacing: "-0.02em",
                color: "#0090FF",
                lineHeight: 1,
              }}
            >
              {step}
            </span>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 16, lineHeight: "1.35", color: "#09090B", margin: 0 }}>
              {title}
            </p>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A", margin: 0 }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Page-specific: Regulation timeline ───────────────────────────────────────

const RegulationTimeline = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  const regulations = [
    { name: "GDPR", status: "In force", year: "2018", desc: "General Data Protection Regulation — requires lawful basis for cross-border data transfers (Articles 44–49). Schrems II invalidated the EU–US Privacy Shield." },
    { name: "DORA", status: "In force", year: "Jan 2025", desc: "Digital Operational Resilience Act — ICT risk management for EU financial entities. Requires demonstrable control over third-party data infrastructure." },
    { name: "EU Data Act", status: "In force", year: "Sep 2025", desc: "Mandates data portability, fair contract terms for cloud services, and the right to switch providers without penalty or vendor lock-in." },
    { name: "EHDS", status: "Advancing", year: "2025–26", desc: "European Health Data Space — framework for secure, sovereign handling of electronic health data across EU member states." },
    { name: "CPPA", status: "Advancing", year: "2025–26", desc: "Canada's Consumer Privacy Protection Act — modernises federal privacy law with data residency and portability requirements." },
  ];

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-10 w-full reveal${inView ? " in-view" : ""}`}
    >
      <div className="flex flex-col gap-4 max-w-[560px]">
        <SectionLabel>Regulatory landscape</SectionLabel>
        <SectionHeading>The rules are tightening. The deadlines are real.</SectionHeading>
        <SectionSub>
          Data sovereignty isn't an abstract concern — it's a compliance requirement with teeth. Here's what's already in force or imminent.
        </SectionSub>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {regulations.map(({ name, status, year, desc }) => (
          <div
            key={name}
            className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 p-5 rounded-xl"
            style={{
              border: "1px solid rgba(0,0,0,0.07)",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div className="flex items-center gap-3 sm:w-[180px] shrink-0">
              <span style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                fontSize: 17,
                color: "#09090B",
                letterSpacing: "-0.01em",
              }}>
                {name}
              </span>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                color: status === "In force" ? "#059669" : "#B45309",
                backgroundColor: status === "In force" ? "#ECFDF5" : "#FFFBEB",
                border: `1px solid ${status === "In force" ? "rgba(5,150,105,0.3)" : "rgba(180,83,9,0.2)"}`,
                borderRadius: 9999,
                padding: "3px 8px",
                whiteSpace: "nowrap" as const,
              }}>
                {status}
              </span>
            </div>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 500,
              fontSize: 12,
              color: "#71717A",
              whiteSpace: "nowrap",
              minWidth: 70,
            }}>
              {year}
            </span>
            <p style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "1.6",
              color: "#71717A",
              margin: 0,
              flex: 1,
            }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CTA_BUTTONS: HeroCta[] = [
  { label: "Try 30 days for free", href: "https://app.fil.one/login?screen_hint=signup", variant: "primary" },
  { label: "Talk to an expert", href: "/contact-sales", variant: "secondary" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const DataSovereigntyPage = () => {
  useSeo({
    title: "Fil One — Data Sovereignty. S3-compatible storage under European jurisdiction.",
    description:
      "S3-compatible object storage with cryptographic proof of data residency. EU infrastructure, GDPR-ready by architecture, no vendor lock-in. €4.99/TB per month, no egress fees.",
    canonical: "https://fil.one/lp/data-sovereignty",
  });

  return (
    <LandingPage>
      {/* Hero */}
      <LandingHero
        badge="For regulated industries and data-sovereign teams"
        headline={<>Your data shouldn't need<br />a passport.<br /><span style={{ color: "#0090FF" }}>Keep it where it belongs.</span></>}
        sub="S3-compatible object storage with verifiable data residency. EU infrastructure by default, cryptographic proof of location, no foreign jurisdiction exposure. Your data stays yours."
        headlineSize="text-[28px] sm:text-[36px] md:text-[48px]"
        headlineMaxWidth={640}
        subMaxWidth={480}
        ctas={HERO_CTAS}
        trustLine="No credit card required · No egress fees · EU-resident infrastructure"
      />

      {/* Problem */}
      <LandingSection bg="gray" noReveal>
        <ProblemCards
          label="The problem"
          heading="You don't actually know where your data is."
          sub="Most cloud storage was designed for convenience, not sovereignty. When a regulator asks exactly where a dataset lives and who has legal access to it, most teams can't answer with certainty."
          cards={PROBLEMS}
        />
      </LandingSection>

      {/* How it works — sovereignty proof (page-specific) */}
      <LandingSection>
        <SovereigntyProof />
      </LandingSection>

      {/* Features */}
      <LandingSection id="features" bg="gray">
        <FeatureCards
          label="Built for sovereignty"
          heading={<>S3 storage that <span style={{ color: "#0090FF" }}>proves where it is.</span></>}
          sub="Not just an EU region selector. Infrastructure, verification, and legal jurisdiction designed for data sovereignty from the ground up."
          cards={FEATURES}
        />
      </LandingSection>

      {/* Regulation timeline (page-specific) */}
      <LandingSection>
        <RegulationTimeline />
      </LandingSection>

      {/* Use cases — regulated industries */}
      <LandingSection bg="gray">
        <FeatureCards
          label="Regulated industries"
          heading="Built for teams where data residency is non-negotiable."
          sub="Fil One is a natural fit for data-intensive industries where the cost of non-compliance is measured in fines, lost contracts, and board-level scrutiny."
          cards={USE_CASES}
          centerHeader={false}
        />
      </LandingSection>

      {/* Value props */}
      <LandingSection>
        <ValueProps
          label="Why Fil One"
          heading={<>Sovereignty means <span style={{ color: "#0090FF" }}>control</span>, not just compliance.</>}
          items={VALUE_PROPS}
        />
      </LandingSection>

      {/* CTA Banner */}
      <DarkCtaBanner
        heading="Your data is yours. Store it that way."
        sub="Free 1 TB evaluation bucket. EU infrastructure. Onboarding in under 2 minutes."
        ctas={CTA_BUTTONS}
        trustLine="No credit card required · No egress fees · No vendor lock-in"
      />
    </LandingPage>
  );
};

export default DataSovereigntyPage;
