import { useState, type ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import JsonLd from "@/components/JsonLd";

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
        <p>Fil One provides an S3-compatible API: if your application works with AWS S3, it works with Fil One. Point your SDK or CLI at our endpoint and authenticate with your API keys.</p>
        <p>Fil One takes a security-first approach to S3-compatibility. The S3-compatible API enables simple setup and migration. Storage supports private buckets by default, with public access consistent with full S3 parity coming soon.</p>
        <p>Read <a href="https://docs.fil.one" target="_blank" rel="noopener noreferrer" className="faq-link">Fil One docs</a>, <a href="https://app.fil.one" target="_blank" rel="noopener noreferrer" className="faq-link">access the app</a> to get started with no code required, or <a href="/contact-sales" className="faq-link">talk to someone on our team</a> to get started.</p>
      </div>
    ),
  },
  {
    question: "What kinds of organizations use Fil One?",
    answer:
      "Fil One is optimized for large-scale storage needs, including AI and data-intensive workloads, multi-cloud strategies, audit-sensitive data, and long-term retention.",
  },
  {
    question: "How does Fil One approach security and compliance?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>Fil One uses industry-standard encryption with per-object data encryption keys, ensuring your data is protected regardless of which provider it's stored with. We are actively pursuing SOC 2 Type II and ISO 27001 certifications — if you'd like to be notified when those are finalized or have other questions about security, reach out to our team directly at <a href="mailto:security@fil.one" className="faq-link">security@fil.one</a>.</p>
      </div>
    ),
  },
  {
    question: "How do I migrate from AWS / Azure / Google Cloud?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>After you create an account and provision your first bucket, migrating to Fil One is straightforward with our S3-compatible interface. You can integrate directly into your codebase using any S3-compatible SDK, or use the AWS CLI to migrate your data with a single command.</p>
        <p>For enterprise teams who want more hands-on support during migration, our team is available to walk you through every step. Reach out at <a href="mailto:sales@fil.one" className="faq-link">sales@fil.one</a>, and we'll make sure the transition is seamless.</p>
      </div>
    ),
  },
  {
    question: "What is Filecoin?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>Filecoin is a distributed storage network launched in 2020, designed to make data portable, verifiable, and resilient by default.</p>
        <p>Instead of relying on a single proprietary vendor, Filecoin uses open protocols and an open market to store data with a global network of independent providers — helping reduce single points of failure and deliver true multi-cloud durability.</p>
      </div>
    ),
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: typeof faq.answer === "string" ? faq.answer : faq.question,
    },
  })),
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: listRef, inView: listInView } = useInView({ threshold: 0.04 });

  return (
    <>
    <JsonLd data={faqSchema} />
    <section
      id="faq"
      className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className={`flex flex-col gap-3 items-center text-center w-full max-w-[560px] reveal${headingInView ? " in-view" : ""}`}
      >
        <span
          aria-hidden="true"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 11.5,
            letterSpacing: "0.08em",
            color: "#71717A",
            textTransform: "uppercase",
          }}
        >
          FAQ
        </span>
        <h2
          className="text-[26px] md:text-[32px]"
          style={{
            fontFamily: "'Aspekta', sans-serif",
            fontWeight: 500,
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            color: "#09090B",
          }}
        >
          Frequently asked questions
        </h2>
      </div>

      {/* FAQ list */}
      <div
        ref={listRef}
        className={`w-full max-w-[720px] reveal${listInView ? " in-view" : ""}`}
      >
        {faqs.map((faq, i) => {
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
                onClick={() => setOpenIndex(isOpen ? null : i)}
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
