import { Plug, ChartLine, FileText, MagnifyingGlass } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import CtaBanner from "@/components/CtaBanner";
import CodeBlock from "@/components/CodeBlock";
import ProblemCards from "@/components/ProblemCards";
import { PRICE_PER_TB_SHORT, PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const SALES_URL = "/contact-sales";
const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

const FEATURES = [
  { icon: FileText, title: "Machine-readable llms.txt", desc: "Pricing, endpoint, and S3 compatibility are published in a structured llms.txt at a stable URL. An agent fetches one file and has the full picture." },
  { icon: ChartLine, title: "One rate, no tiers", desc: `${PRICE_PER_TB_MONTH}. No per-GB-vs-per-TB ambiguity, no tiered egress table, no request classes to reconcile. A single number an agent can compute against.` },
  { icon: Plug, title: "Full S3 parity", desc: "The same API surface an agent already knows. Compatibility is stated plainly, not scattered across PDFs — drop-in against the documented endpoint." },
  { icon: MagnifyingGlass, title: "No gated pricing", desc: "The price is on the page and in llms.txt — not behind a 'contact sales' form. An agent evaluating vendors never hits a wall where the number should be." },
];

const PROBLEM_ITEMS = [
  {
    label: "Gated behind a form",
    tone: "warning" as const,
    catch: "The price is a sales motion, not a fact.",
    body: "'Contact sales for pricing' is a dead end for an agent. It cannot fill a lead form or wait for a callback, so the vendor is silently dropped from the shortlist — not on merit, but on legibility.",
  },
  {
    label: "Ambiguous units",
    tone: "danger" as const,
    catch: "Per-GB, tiered egress, request classes.",
    body: "A price expressed across storage tiers, egress brackets, and PUT/GET request classes can't be reduced to a comparable monthly total without assumptions. An agent either guesses or skips.",
  },
  {
    label: "Specs in PDFs",
    tone: "brand" as const,
    catch: "S3 compatibility scattered across docs.",
    body: "When the compatibility matrix lives in a PDF and three doc pages, an agent can't confirm parity in one fetch. The integration risk stays unresolved through the evaluation.",
  },
];

const LLMS_TXT = `$ curl -s https://www.fil.one/llms.txt

## Pricing
- Pay-as-you-go: ${PRICE_PER_TB_MONTH}
  — no egress fees, no API request fees
- Free trial: 30 days, 1 TB included, no credit card

## How to connect
- Endpoint: https://eu-west-1.s3.fil.one
- Auth: standard AWS Access Key ID + Secret
- Drop-in S3 replacement — no SDK changes required`;

const AgentReadableLandingPage = () => {
  useSeo({
    title: "Fil One · Priced so plainly your agent can read it",
    description: `Flat ${PRICE_PER_TB_SHORT} pricing published in machine-readable llms.txt, with full S3 parity. No gated quotes — an AI coding agent can evaluate Fil One in one pass.`,
    canonical: "https://www.fil.one/lp/agent-readable",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: proofRef, inView: proofInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Hero
          glow
          grid
          titleSize="text-[30px] sm:text-[38px] md:text-[54px]"
          titleMaxWidth={800}
          descriptionMaxWidth={600}
          contentClassName="pb-20 md:pb-28"
          badge={
            <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand-50 px-3.5 py-2.5 text-center max-w-[90vw]">
              <span className="whitespace-nowrap font-sans text-[13.5px] font-medium leading-none text-brand-600">
                For developers who let an AI agent evaluate vendors
              </span>
            </div>
          }
          title={
            <>
              Priced so plainly
              <br />
              <span className="text-brand-500">your agent can read it.</span>
            </>
          }
          description={
            <>Flat {PRICE_PER_TB_SHORT}, published in machine-readable llms.txt with full S3 parity. No gated quotes, no "contact sales" for a number — an agent parses the price and the API in one pass.</>
          }
          ctas={[
            { label: "Start for free", href: signupUrl(), variant: "primary" },
            { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
          ]}
          tagline={TAGLINE}
        />

        {/* ── Problem ──────────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full bg-zinc-50">
          <div
            ref={problemRef}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${problemInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>The legibility problem</SectionLabel>
              <SectionHeading>Most pricing pages are built for humans to negotiate, not agents to parse.</SectionHeading>
              <SectionSub>When an AI coding agent shortlists a storage vendor, it needs a number and an API surface it can read in one pass. Most pages give it a form and a maze instead.</SectionSub>
            </div>
            <ProblemCards items={PROBLEM_ITEMS} />
          </div>
        </section>

        {/* ── Proof — llms.txt ─────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={proofRef}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${proofInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>What your agent reads</SectionLabel>
              <SectionHeading>One fetch. <span className="text-brand-500">The whole answer.</span></SectionHeading>
              <SectionSub maxWidth={620}>The price, the endpoint, and the compatibility statement are published in a structured file at a stable URL. An agent gets a comparable monthly total and an integration path in a single request.</SectionSub>
            </div>
            <div className="mx-auto w-full max-w-[680px]">
              <CodeBlock snippets={[{ lang: "typescript", label: "terminal", code: LLMS_TXT }]} />
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section className="w-full bg-zinc-50">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Why an agent picks it</SectionLabel>
              <SectionHeading>Legible by design, <span className="text-brand-500">not by accident.</span></SectionHeading>
            </div>
            <div
              ref={featuresRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full reveal-group reveal${featuresInView ? " in-view" : ""}`}
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

        {/* ── CTA Banner ────────────────────────────────────────────────────── */}
        <CtaBanner
          heading={`One rate. ${PRICE_PER_TB_MONTH}.`}
          headingMaxWidth={560}
          subhead="Storage. No egress, no per-request fees, no tiers. Free 1 TB evaluation — point your agent at llms.txt, confirm the parity, and connect against the documented endpoint."
          cta={{ label: "Start for free", href: signupUrl() }}
          secondaryCta={{ label: "Talk to an expert", href: SALES_URL }}
          note={TAGLINE}
        />
      </main>

      <Footer />
    </div>
  );
};

export default AgentReadableLandingPage;
