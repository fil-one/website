import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Check } from "@phosphor-icons/react";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";
import Hero from "@/components/Hero";
import Pill from "@/components/Pill";
import StatCard from "@/components/StatCard";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBanner from "@/components/CtaBanner";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";

const WAITLIST_URL = "/waitlist/bucket-intelligence";
const DOCS_URL = "https://docs.fil.one";

const FEATURES = [
  {
    title: "Bring your own LLM keys",
    description:
      "Use OpenAI, Anthropic, or Cohere for embeddings and completions. You pay your provider directly, with no markup from Fil One.",
  },
  {
    title: "Automatic indexing",
    description:
      "Files uploaded to enabled buckets are indexed in near real-time. Deleted files are automatically removed from the index.",
  },
  {
    title: "Multiple integration options",
    description:
      "Access your knowledge base via the Fil One dashboard, MCP server for Claude and Cursor, or direct REST API.",
  },
  {
    title: "Custom embedding models",
    description:
      "Use any OpenAI-compatible endpoint, including self-hosted models. Switch providers without re-indexing.",
  },
];

const STATS = [
  {
    stat: "1-click",
    label: "Enable on any bucket",
    note: "No migration or data export. Works with your existing storage plan.",
  },
  {
    stat: "$0",
    label: "LLM markup",
    note: "Bring your own OpenAI, Anthropic, or Cohere keys. Provider costs go directly to you.",
  },
  {
    stat: "< 1 min",
    label: "Indexing time",
    note: "New uploads are chunked and indexed in near real-time as they arrive.",
  },
];

const USE_CASES = [
  {
    number: "01",
    title: "Connect your bucket",
    description: "Enable Bucket Intelligence on any existing bucket with one click. No migration or data export needed.",
  },
  {
    number: "02",
    title: "Files get indexed automatically",
    description: "New uploads are chunked and indexed in near real-time using your chosen embedding model and API key.",
  },
  {
    number: "03",
    title: "Ask questions, get answers",
    description: "Query via the dashboard, MCP endpoint, or REST API. Answers come with cited source file excerpts.",
  },
];

const FILE_TYPES = ["PDF", "Markdown", "Plain text", "HTML", "DOCX"];

const FAQS = [
  {
    q: "What file types are supported?",
    a: "PDF, Markdown, plain text (.txt), HTML, and DOCX at launch. More formats on the roadmap.",
  },
  {
    q: "Where are my LLM API keys stored?",
    a: "Encrypted at rest using industry-standard encryption. Keys are never logged or included in responses.",
  },
  {
    q: "How fast is indexing?",
    a: "Near real-time. Typically under a minute for most files. Larger documents may take a few minutes.",
  },
  {
    q: "Can I use a custom embedding model?",
    a: "Yes. Any OpenAI-compatible endpoint works, including self-hosted models like nomic-embed or mxbai-embed.",
  },
  {
    q: "What happens when I delete a file from my bucket?",
    a: "It is automatically removed from the index. No manual cleanup needed.",
  },
];

const RagPipelineProductPage = () => {
  const { heroEndRef } = useScrollTracking();
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ucRef, inView: ucInView } = useInView({ threshold: 0.05 });

  useSeo({
    title: "RAG Pipeline · Fil One",
    description:
      "Turn any Fil One bucket into a queryable knowledge base. Auto-index files, semantic search, bring your own LLM keys. +$15/TB/month add-on.",
    canonical: "https://www.fil.one/bucket-intelligence",
    ogImage: "https://www.fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <Hero
          glow
          grid
          badge={<Pill>Early access · Bucket Intelligence</Pill>}
          titleSize="text-[28px] sm:text-[34px] md:text-[44px]"
          title="Turn any bucket into a queryable knowledge base"
          description="Auto-index your files as they arrive. Ask questions in plain language, powered by your own OpenAI, Anthropic, or Cohere keys."
          titleMaxWidth={560}
          descriptionMaxWidth={460}
          contentClassName="pb-14 md:pb-20"
          ctas={[
            {
              label: "Join the waitlist",
              href: WAITLIST_URL,
              variant: "primary",
              onClick: () => trackCtaClick("Join the waitlist", WAITLIST_URL, "primary"),
            },
            {
              label: "Explore docs",
              href: DOCS_URL,
              variant: "secondary",
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: () => {
                trackCtaClick("Explore docs", DOCS_URL, "secondary");
                trackDocsClick(DOCS_URL);
              },
            },
          ]}
        />

        {/* Stats */}
        <div ref={heroEndRef}>
          <section className="w-full px-5 md:px-8 bg-white">
            <div
              ref={statsRef}
              className={`grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-container mx-auto reveal${statsInView ? " in-view" : ""}`}
            >
              {STATS.map(({ stat, label, note }) => (
                <StatCard key={label} stat={stat} label={label} note={note} />
              ))}
            </div>
          </section>
        </div>

        {/* Features */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <SectionLabel>Features</SectionLabel>
              <SectionHeading>Built around your existing stack</SectionHeading>
              <SectionSub maxWidth={480}>
                No chunking scripts, no vector DB to provision, no new API keys to manage. Just your bucket and your LLM provider.
              </SectionSub>
            </div>

            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full reveal-group">
              {FEATURES.map(({ title, description }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-4 p-7 rounded-2xl border border-black/[0.07] bg-white shadow-elevated reveal${featuresInView ? " in-view" : ""}`}
                >
                  <div className="flex gap-3 items-start">
                    <Check size={15} className="shrink-0 mt-0.5 text-brand-500" />
                    <div className="flex flex-col gap-1.5">
                      <p className="font-sans font-medium text-[15px] leading-[1.3] text-zinc-950">{title}</p>
                      <p className="font-sans font-normal text-[14px] leading-[1.6] text-zinc-500">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Supported file types */}
            <div className="flex flex-col gap-4 items-center">
              <p className="font-mono font-medium text-[11px] tracking-[0.07em] uppercase text-zinc-600">
                Supported file types
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {FILE_TYPES.map((t) => (
                  <span
                    key={t}
                    className="font-mono font-medium text-[12px] text-zinc-600 bg-zinc-100 border border-black/[0.07] rounded-lg px-3 py-[5px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="w-full px-5 md:px-8 py-24 md:py-32 bg-zinc-50 border-y border-zinc-100">
          <div className="flex flex-col gap-12 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>How it works</SectionLabel>
              <SectionHeading>Up and running in minutes</SectionHeading>
            </div>
            <div ref={ucRef} className={`grid grid-cols-1 sm:grid-cols-3 gap-6 reveal${ucInView ? " in-view" : ""}`}>
              {USE_CASES.map(({ number, title, description }) => (
                <div key={number} className="flex flex-col gap-3">
                  <span className="font-mono font-medium text-[28px] leading-none text-brand-500">{number}</span>
                  <h3 className="font-display font-medium text-[15px] text-zinc-950 m-0">{title}</h3>
                  <p className="font-sans text-[14px] leading-[1.6] text-zinc-500 m-0">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-10 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-[720px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading>Common questions</SectionHeading>
            </div>
            <FaqAccordion items={FAQS} idPrefix="bi-faq" />
          </div>
        </section>

        {/* CTA Banner */}
        <CtaBanner
          heading="Turn your buckets into knowledge bases"
          subhead="Early access is open. Join the waitlist and be first in line."
          cta={{
            label: "Join the waitlist",
            href: WAITLIST_URL,
            onClick: () => trackCtaClick("Join the waitlist", WAITLIST_URL, "primary"),
          }}
          note="Requires an active storage plan · No extra infrastructure"
        />

      </main>
      <Footer />
    </div>
  );
};

export default RagPipelineProductPage;
