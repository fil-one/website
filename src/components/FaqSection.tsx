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
    question: "How does data integrity verification work with Fil One?",
    answer:
      "Each dataset is assigned a unique digital fingerprint (CID) at upload, creating a verifiable record of its contents. The system then automatically checks your data on a recurring basis (about every 24 hours) to confirm that the data still matches that original fingerprint, ensuring nothing has been altered.",
  },
  {
    question: "Is Fil One compatible with my existing tools?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>The S3-compatible API means anything built for AWS S3 works here too. Point your SDK or CLI at our endpoint and authenticate with your API keys.</p>
        <p>Security comes first in the S3-compatible design: setup and migration stay simple, and buckets are private by default. Public access with full S3 parity is coming soon.</p>
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
        <p>Encryption is industry-standard, with per-object data encryption keys that protect your data regardless of which provider it's stored with. Our services are delivered through top-tier data centers that are certified to ISO 27001, SOC 2, and PCI DSS standards. Reach out to <a href="mailto:security@fil.one" className="faq-link">security@fil.one</a> for compliance documentation or any other security questions.</p>
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
        <p>Every bucket becomes a queryable knowledge base once Bucket Intelligence is connected. Files are auto-indexed as they land, powered by a built-in RAG pipeline. Ask questions in plain language and get answers grounded in your actual data.</p>
        <p>Bring your own LLM API keys (OpenAI, Anthropic, or Cohere), so AI costs go directly to your provider. Early testers get access at no charge.</p>
      </div>
    ),
  },
  {
    question: "What is the AI Agent Toolkit?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>The AI Agent Toolkit lets you connect your AI tools and automations to Fil One. Pick an integration, paste a config block, and your buckets are immediately available for your AI agents to use or to trigger automations from bucket events.</p>
        <p>It works with your existing buckets, no new setup or credentials needed. Access can be revoked at any time, and there's no cost for early testers.</p>
      </div>
    ),
  },
  {
    question: "Do I need to use all three products together?",
    answer:
      "Not required. Object Storage is the foundation every Fil One account starts with, and it works great on its own as a fully S3-compatible store. Both additional products connect directly to your existing buckets when they launch, with no data migration needed.",
  },
  {
    question: "What counts as egress?",
    answer:
      "Egress is any data transferred out of your bucket: to the internet, to another cloud, or to your own servers. With Fil One, all egress is free, always, at any scale.",
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
        <p>Yes. Teams with predictable storage needs can choose reserved capacity plans on 1, 3, or 5-year terms with volume discounts. <a href="/contact-sales" className="faq-link">Contact sales</a> to get a quote.</p>
      </div>
    ),
  },
  {
    question: "Where is my data stored?",
    answer:
      "It depends on the bucket region you choose. We currently offer an EU region (France) and a US region (Michigan), with more regions on the way.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. The trial includes 1 TB free for 30 days, with no credit card required to start.",
  },
  {
    question: "What is Filecoin?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>Filecoin is a distributed storage network launched in 2020, designed to make data portable, verifiable, and resilient by default.</p>
        <p>Instead of relying on a single proprietary vendor, Filecoin uses open protocols and an open market to store data with a global network of independent providers, helping reduce single points of failure and deliver true multi-cloud durability.</p>
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
