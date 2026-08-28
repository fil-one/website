import { useState, isValidElement, type ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import JsonLd from "@/components/JsonLd";
import SectionHeader from "@/components/SectionHeader";
import { trackEvent, trackDocsClick } from "@/lib/analytics";
import { PRICE_DISPLAY } from "@/lib/pricing";
import { consoleOrigin } from "@/lib/console-url";

const faqs = [
  {
    question: "How do I stop data from being altered or deleted?",
    answer:
      "Create the bucket with versioning and Object Lock, and set a retention period anywhere from one day to 100 years. In Compliance mode a locked object cannot be overwritten or deleted before its retention expires, by your credentials or by ours. Versioning keeps every prior version of a key, so you can list the full history and download any version you need. Both are chosen at bucket creation, so the protection is in place before the first upload.",
  },
  {
    question: "Is Fil One compatible with my existing tools?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>Fil One speaks the S3 API, so you keep the SDK and CLI you already use. Point it at your region&rsquo;s endpoint, switch on path-style addressing, and authenticate with a Fil One access key. Everyday object work behaves the way your code expects: put, get, head, list, delete, presigned URLs, and multipart upload from your own SDK.</p>
        <p>Buckets are private by default. For the operation-by-operation detail, including the calls that differ between regions, see the S3 compatibility reference in the docs.</p>
        <p>Read <a href="https://docs.fil.one" target="_blank" rel="noopener noreferrer" className="faq-link" onClick={() => trackDocsClick("https://docs.fil.one")}>Fil One docs</a>, <a href={consoleOrigin()} target="_blank" rel="noopener noreferrer" className="faq-link">access the app</a> to get started with no code required, or <a href="/contact-sales" className="faq-link">talk to someone on our team</a> to get started.</p>
      </div>
    ),
  },
  {
    question: "What kinds of organizations use Fil One?",
    answer:
      "Built for large-scale storage needs, including AI and data-intensive workloads, multi-cloud strategies, audit-sensitive data, and long-term retention.",
  },
  {
    question: "How does Fil One approach security and compliance?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>Objects are encrypted at rest by the storage gateway using AES256 (SSE-S3), and every request runs over TLS. It is on by default with nothing to configure. Keys are held by the regional storage operator that fulfils your bucket&rsquo;s region, so if your policy requires you to hold the keys yourself, encrypt client-side before upload with the standard S3 tooling and Fil One stores the ciphertext. Our services are delivered through top-tier data centers that are certified to ISO 27001, SOC 2, and PCI DSS standards. Reach out to <a href="mailto:security@fil.one" className="faq-link">security@fil.one</a> for compliance documentation or any other security questions.</p>
      </div>
    ),
  },
  {
    question: "How do I migrate from AWS / Azure / Google Cloud?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>After you create an account and provision your first bucket, migrating to Fil One is straightforward with our S3-compatible interface. Integrate directly into your codebase with any S3-compatible SDK, or migrate your data with a single AWS CLI command.</p>
        <p>Enterprise teams who want more hands-on support can work directly with our team through every step of migration. Reach out at <a href="mailto:sales@fil.one" className="faq-link">sales@fil.one</a> to get started.</p>
      </div>
    ),
  },
  {
    question: "What is Bucket Intelligence and how does it work?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>Switch it on for a bucket and Fil One indexes the files in it, then answers plain-language questions grounded in that bucket&rsquo;s contents. A recurring pass picks up new files, so there is no pipeline for you to build or run.</p>
        <p>The embedding and answering models are hosted and paid for by Fil One, so there is no provider account or API key to supply. Bucket Intelligence is in early access, and free while it is.</p>
      </div>
    ),
  },
  {
    question: "What is the AI Agent Toolkit?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>It is a planned way to connect AI tools and automations to your buckets without writing integration code. It has not shipped yet, and the details may change before it does, so treat it as a direction rather than a feature list.</p>
        <p>You do not have to wait to give an agent storage. An ordinary Fil One access key is all LangChain, LlamaIndex, CrewAI, or the Vercel AI SDK need to read and write your buckets today, and you can revoke that key at any time.</p>
      </div>
    ),
  },
  {
    question: "Do I need to use all three products together?",
    answer:
      "Not required. Object Storage is the foundation every Fil One account starts with, and it works great on its own as an S3-compatible store. Both additional products connect directly to your existing buckets when they launch, with no data migration needed.",
  },
  {
    question: "What counts as egress?",
    answer:
      "Egress is any data transferred out of your bucket: to the internet, to another cloud, or to your own servers. On a paid plan it is free at any scale, and there are no per-request charges either. The 30-day trial includes 2 TB of egress.",
  },
  {
    question: "Is there a minimum charge?",
    answer:
      `Storage is billed at ${PRICE_DISPLAY} per TB per month, with a ${PRICE_DISPLAY} monthly minimum. Store under 1 TB and you pay the ${PRICE_DISPLAY} minimum; store more and you pay per TB for what you use, with no egress or API fees.`,
  },
  {
    question: "How is my bill calculated?",
    answer:
      `Billing is ${PRICE_DISPLAY} per TB stored per month, with no fees for egress or API operations. Your bill is what you store multiplied by the rate, subject to a ${PRICE_DISPLAY} monthly minimum.`,
  },
  {
    question: "Do you offer annual or reserved capacity plans?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>Yes. Teams with predictable storage needs can talk to us about multi-year committed capacity. <a href="/contact-sales" className="faq-link">Contact sales</a> and we will put a quote together.</p>
      </div>
    ),
  },
  {
    question: "Where is my data stored?",
    answer:
      "You choose when you create the bucket: Europe (France) or US East (Michigan). A bucket\u2019s region is fixed at creation, so data written there stays there. Each region has its own endpoint, and an access key is scoped to a single region.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Thirty days with 1 TB of storage and 2 TB of egress included, and no credit card to start. Reaching the storage allowance pauses new uploads while reads keep working; reaching the egress allowance ends access until you move to a paid plan.",
  },
  {
    question: "What is Filecoin?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>Filecoin is a distributed storage network launched in 2020, built on open protocols so that stored data stays portable instead of tied to one vendor.</p>
        <p>Rather than a single proprietary provider, Filecoin uses an open market of independent storage providers. Fil One puts an S3-compatible layer in front of that market, so you get the independence without changing your tooling.</p>
      </div>
    ),
  },
];

/**
 * Flatten a string | ReactNode answer to plain text for the JSON-LD
 * acceptedAnswer. Previously ReactNode answers fell back to the *question*,
 * so those FAQPage entries emitted the question as its own answer.
 */
function answerToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(answerToText).join(" ");
  if (isValidElement(node)) return answerToText((node.props as { children?: ReactNode }).children);
  return "";
}

const buildFaqSchema = (items: typeof faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: (typeof faq.answer === "string" ? faq.answer : answerToText(faq.answer))
        .replace(/\s+/g, " ")
        .trim(),
    },
  })),
});

interface FaqSectionProps {
  include?: string[]; // if provided, only show FAQs whose question is in this list
}

const FaqSection = ({ include }: FaqSectionProps = {}) => {
  const visibleFaqs = include ? faqs.filter((f) => include.includes(f.question)) : faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: listRef, inView: listInView } = useInView({ threshold: 0.04 });

  const faqSchema = buildFaqSchema(visibleFaqs);

  return (
    <>
    <JsonLd data={faqSchema} />
    <section
      id="faq"
      className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Heading */}
      <SectionHeader
        ref={headingRef}
        className={`w-full max-w-[560px] reveal${headingInView ? " in-view" : ""}`}
        label="FAQ"
        title="Frequently asked questions"
      />

      {/* FAQ list */}
      <div
        ref={listRef}
        className={`w-full max-w-container-prose reveal${listInView ? " in-view" : ""}`}
      >
        {visibleFaqs.map((faq, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-btn-${i}`;
          return (
            <div
              key={faq.question}
              style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
            >
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  const opening = !isOpen;
                  setOpenIndex(opening ? i : null);
                  if (opening) trackEvent("FAQ Expand", { question: faq.question.slice(0, 80), page: window.location.pathname });
                }}
                className="flex items-center justify-between w-full gap-4 py-5 text-left group transition-colors"
              >
                <span
                  className={`transition-colors group-hover:text-[#0070CC] ${isOpen ? "text-[#0070CC]" : "text-[#09090B]"}`}
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 15,
                    lineHeight: "1.4",
                  }}
                >
                  {faq.question}
                </span>
                <CaretDown
                  size={17}
                  className={`shrink-0 transition-all duration-200 group-hover:text-[#0070CC] ${isOpen ? "text-[#0070CC]" : "text-[#71717A]"}`}
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {/* Answer is always in the DOM so crawlers can index it;
                  overflow-hidden + maxHeight handles the visual collapse. */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="overflow-hidden transition-all duration-200"
                style={{ maxHeight: isOpen ? 1200 : 0 }}
                // Keep the answer in the DOM (for crawlers) but, while collapsed,
                // remove it from the tab order and a11y tree via `inert` so
                // keyboard/AT users can't land on hidden links. (`inert` isn't in
                // the React 18 prop types, hence the cast.)
                {...(isOpen ? {} : ({ inert: "" } as Record<string, string>))}
              >
                {typeof faq.answer === "string" ? (
                  <p
                    className="pb-5"
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: "1.65",
                      color: "#71717A",
                    }}
                  >
                    {faq.answer}
                  </p>
                ) : (
                  faq.answer
                )}
              </div>
            </div>
          );
        })}
        {/* Bottom border */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }} />
      </div>
    </section>
    </>
  );
};

export default FaqSection;
