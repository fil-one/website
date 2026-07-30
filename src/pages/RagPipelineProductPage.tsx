import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import {
  ArrowsClockwise,
  Cpu,
  Key,
  Lock,
  PlugsConnected,
  Quotes,
  ShieldCheck,
  StackSimple,
} from "@phosphor-icons/react";
import { trackCtaClick } from "@/lib/analytics";
import Hero from "@/components/Hero";
import Pill from "@/components/Pill";
import ProofBar from "@/components/ProofBar";
import Tag from "@/components/Tag";
import Step from "@/components/Step";
import FeatureCard from "@/components/FeatureCard";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBanner from "@/components/CtaBanner";
import CodeBlock, { type CodeSnippet } from "@/components/CodeBlock";
import TextLink from "@/components/TextLink";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";

const WAITLIST_URL = "/waitlist/bucket-intelligence";
const DOCS_URL = "https://docs.fil.one";

const FEATURES = [
  {
    icon: Cpu,
    title: "Managed model in early access",
    description:
      "During early access, queries run on a model we manage for you. Bring your own OpenAI, Anthropic, or Cohere keys after launch, with no markup from Fil One.",
  },
  {
    icon: ArrowsClockwise,
    title: "Automatic indexing",
    description:
      "Enable a bucket and Fil One keeps its index in sync with your files. Updated files are re-indexed and deleted files are removed, with no manual steps.",
  },
  {
    icon: PlugsConnected,
    title: "Query it your way",
    description:
      "Ask questions from the Fil One dashboard or your own app via the REST API and scoped API keys. An MCP server for Claude and Cursor is coming soon.",
  },
  {
    icon: StackSimple,
    title: "Custom embedding models",
    description:
      "After launch, bring any OpenAI-compatible endpoint, including self-hosted models, and switch providers without re-indexing.",
  },
];

const PROOF = [
  "Enable on any bucket",
  "No data migration",
  "Answers cite their sources",
  "Managed model included",
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
    description: "Fil One extracts, chunks, and embeds your files and keeps the index up to date automatically, using a model we manage for you.",
  },
  {
    number: "03",
    title: "Ask questions, get answers",
    description: "Query from the dashboard or the REST API. Answers are generated from your indexed content and cite the source files they draw on.",
  },
];

const FILE_TYPES = ["Markdown", "Plain text", "HTML", "DOCX", "PPTX", "PDF"];

const TRUST = [
  {
    icon: Quotes,
    title: "Grounded in your data",
    description: "Answers are generated only from your indexed files and cite their sources. No outside knowledge, no invented references.",
  },
  {
    icon: Key,
    title: "Scoped, revocable keys",
    description: "Create query-only API keys limited to specific buckets, and revoke them anytime. Keys are stored as hashes, never in plain text.",
  },
  {
    icon: ShieldCheck,
    title: "Resistant to prompt injection",
    description: "Your files and questions are treated strictly as data, so a malicious document cannot hijack the model or leak other content.",
  },
  {
    icon: Lock,
    title: "You stay in control",
    description: "Turn Bucket Intelligence on per bucket, and off just as easily. Only users on your account can query your indexes.",
  },
];

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    lang: "python",
    label: "Python",
    code: `import requests

res = requests.post(
    "https://app.fil.one/api/buckets/handbook/query?region=us-east-1",
    headers={"Authorization": "Bearer sk_rag_your_key"},
    json={"query": "What is our refund policy?", "top_k": 5},
)
data = res.json()
print(data["answer"])
print(data["sources"])  # source files the answer cites`,
  },
  {
    lang: "typescript",
    label: "TypeScript",
    code: `const res = await fetch(
  "https://app.fil.one/api/buckets/handbook/query?region=us-east-1",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer sk_rag_your_key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: "What is our refund policy?", top_k: 5 }),
  },
);
const data = await res.json();
console.log(data.answer, data.sources);`,
  },
];

const FAQS = [
  {
    q: "What file types are supported?",
    a: "Markdown, plain text (.txt), HTML, DOCX, PDF, and PPTX at launch. More formats on the roadmap.",
  },
  {
    q: "Can I query my buckets from my own app?",
    a: "Yes. Every enabled bucket is queryable over a REST API, authorized with scoped API keys you create in the dashboard. A key can be limited to specific buckets and can only ask questions, never read or write your files.",
  },
  {
    q: "How fast is indexing?",
    a: "Indexing runs automatically in the background. New and changed files are picked up on a regular schedule, so your index stays current without any manual steps.",
  },
  {
    q: "Can I use my own model or embeddings?",
    a: "Not during early access, when queries use a model we manage for you. After launch you will be able to bring your own OpenAI, Anthropic, or Cohere keys and any OpenAI-compatible embedding endpoint, including self-hosted models.",
  },
  {
    q: "What happens when I delete a file from my bucket?",
    a: "It is automatically removed from the index on the next sync. No manual cleanup needed.",
  },
];

const RagPipelineProductPage = () => {
  const { heroEndRef } = useScrollTracking();
  const { ref: proofRef, inView: proofInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ucRef, inView: ucInView } = useInView({ threshold: 0.05 });
  const { ref: devRef, inView: devInView } = useInView({ threshold: 0.05 });
  const { ref: trustRef, inView: trustInView } = useInView({ threshold: 0.05 });

  useSeo({
    title: "Bucket Intelligence · Fil One",
    description:
      "Turn any Fil One bucket into a queryable knowledge base. Auto-index files, semantic search, and a managed model. Free during early access.",
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
          badge={<Pill>Early access</Pill>}
          titleSize="text-[34px] sm:text-[44px] md:text-[58px]"
          title={<>Turn any bucket into a <span className="text-brand-500">queryable knowledge base</span></>}
          description="Auto-index your files and ask questions in plain language, powered by a model we manage for you during early access. Support for your own keys is coming soon."
          titleMaxWidth={760}
          descriptionMaxWidth={480}
          contentClassName="pb-14 md:pb-20"
          ctas={[
            {
              label: "Join the waitlist",
              href: WAITLIST_URL,
              variant: "primary",
              size: "lg",
              glow: true,
              onClick: () => trackCtaClick("Join the waitlist", WAITLIST_URL, "primary"),
            },
          ]}
        />

        {/* Proof bar */}
        <div ref={heroEndRef}>
          <div ref={proofRef} className={`reveal${proofInView ? " in-view" : ""}`}>
            <ProofBar items={PROOF} />
          </div>
        </div>

        {/* Features */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <SectionLabel>Features</SectionLabel>
              <SectionHeading>Built around your existing stack</SectionHeading>
              <SectionSub maxWidth={480}>
                No chunking scripts, no vector DB, nothing to configure. Just your bucket, ready to query.
              </SectionSub>
            </div>

            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full reveal-group">
              {FEATURES.map(({ icon, title, description }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={description}
                  className={`reveal${featuresInView ? " in-view" : ""}`}
                />
              ))}
            </div>

            {/* Supported file types */}
            <div className="flex flex-col gap-4 items-center">
              <p className="font-mono font-medium text-[11.5px] tracking-[0.08em] uppercase text-zinc-500">
                Supported file types
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {FILE_TYPES.map((t) => (
                  <Tag key={t}>{t}</Tag>
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
            <div
              ref={ucRef}
              className={`grid grid-cols-1 divide-y divide-zinc-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0 reveal${ucInView ? " in-view" : ""}`}
            >
              {USE_CASES.map(({ number, title, description }) => (
                <Step
                  key={number}
                  number={number}
                  title={title}
                  description={description}
                  className="py-8 first:pt-0 last:pb-0 sm:py-0 sm:px-8 sm:first:pl-0 sm:last:pr-0"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Developer / API */}
        <section className="w-full bg-white">
          <div
            ref={devRef}
            className={`flex flex-col gap-10 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto reveal${devInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center max-w-[520px]">
              <SectionLabel>For developers</SectionLabel>
              <SectionHeading>Query it from your own app</SectionHeading>
              <SectionSub maxWidth={520} size="text-[14px] md:text-[15px]">
                Every enabled bucket is a REST endpoint. Authorize requests with scoped API keys, and get back an answer plus the source files it used.
              </SectionSub>
            </div>
            <div className="w-full max-w-[820px]">
              <CodeBlock snippets={CODE_SNIPPETS} />
            </div>
            <TextLink href={DOCS_URL} tone="brand" arrow external>
              Read the API reference
            </TextLink>
          </div>
        </section>

        {/* Trust */}
        <section className="w-full px-5 md:px-8 py-24 md:py-32 bg-zinc-50 border-y border-zinc-100">
          <div className="flex flex-col gap-12 items-center w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <SectionLabel>Trust</SectionLabel>
              <SectionHeading maxWidth={370}>
                Answers you can trust, <span className="text-brand-500">data you control</span>
              </SectionHeading>
            </div>
            <div ref={trustRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full reveal-group">
              {TRUST.map(({ icon, title, description }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={description}
                  className={`reveal${trustInView ? " in-view" : ""}`}
                />
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
          heading="Ask your buckets anything"
          subhead="Early access is open. Join the waitlist and be first in line."
          cta={{
            label: "Join the waitlist",
            href: WAITLIST_URL,
            onClick: () => trackCtaClick("Join the waitlist", WAITLIST_URL, "primary"),
          }}
          note="Free during early access · Requires an active storage plan"
        />

      </main>
      <Footer />
    </div>
  );
};

export default RagPipelineProductPage;
