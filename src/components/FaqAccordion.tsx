import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import JsonLd from "@/components/JsonLd";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  /** Unique prefix for element ids, so multiple accordions can share a page. */
  idPrefix?: string;
  /** Emit FAQPage JSON-LD for rich results (default true). */
  schema?: boolean;
}

const buildSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

/**
 * Data-driven FAQ accordion: single-open, keyboard/AT-accessible (aria-expanded
 * + aria-controls linking trigger↔panel, collapsed panels aria-hidden), and it
 * emits FAQPage structured data. Answers are plain strings so the schema text is
 * always the real answer. Unlike FaqSection (content baked in), this takes items.
 */
const FaqAccordion = ({ items, idPrefix = "faq", schema = true }: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <>
      {schema && <JsonLd data={buildSchema(items)} />}
      <div ref={ref} className={`w-full reveal${inView ? " in-view" : ""}`}>
        {items.map(({ q, a }, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={q} className="border-t border-black/[0.07]">
              <button
                id={`${idPrefix}-trigger-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-panel-${i}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex items-center justify-between w-full gap-4 py-5 text-left group transition-colors"
              >
                <span
                  className={`font-sans font-medium text-[15px] leading-[1.4] transition-colors group-hover:text-brand-600 ${isOpen ? "text-brand-600" : "text-zinc-950"}`}
                >
                  {q}
                </span>
                <CaretDown
                  size={17}
                  className={`shrink-0 transition-all duration-200 group-hover:text-brand-600 ${isOpen ? "text-brand-600 rotate-180" : "text-zinc-500"}`}
                />
              </button>
              <div
                id={`${idPrefix}-panel-${i}`}
                role="region"
                aria-labelledby={`${idPrefix}-trigger-${i}`}
                aria-hidden={!isOpen}
                className="overflow-hidden transition-all duration-200"
                style={{ maxHeight: isOpen ? 1200 : 0 }}
              >
                <p className="pb-5 font-sans font-normal text-[14px] leading-[1.65] text-zinc-500">
                  {a}
                </p>
              </div>
            </div>
          );
        })}
        <div className="border-t border-black/[0.07]" />
      </div>
    </>
  );
};

export default FaqAccordion;
