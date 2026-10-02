import { Quotes } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

/** Quotes cleared for marketing use. Add a card here once a quote is approved. */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Robotics is in the early innings of data collection, and the datasets are already running into the petabytes, with demand climbing fast. The tech behind Fil One gives us scaled, genuinely cheap storage without egress penalties, which is exactly what an emerging sector like robotics data collection needs to move quickly. It's the storage layer we can grow into.",
    name: "Jon Victor",
    role: "President",
    company: "BitRobot Foundation",
  },
  {
    quote:
      "Fil One is one of the most ambitious efforts in all of web3, and integrating it lets our customers tap verifiable, content-addressed storage at planetary scale as a native part of how they build.",
    name: "Porter Stowell",
    role: "CEO",
    company: "Web3.io",
  },
];

/**
 * Cleared quotes on the homepage: one card each, name and company in text
 * (no logos, so no logo permissions needed). Not labelled as customers.
 */
const TestimonialsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });
  const cols = TESTIMONIALS.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2";
  return (
    <section className="w-full px-5 py-24 md:px-8 md:py-32">
      <div ref={ref} className={`mx-auto flex w-full max-w-container flex-col gap-10 reveal${inView ? " in-view" : ""}`}>
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionHeading>What builders are saying.</SectionHeading>
        </div>
        <div className={`grid grid-cols-1 gap-4 ${cols}`}>
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="m-0 flex flex-col gap-6 rounded-2xl border border-black/[0.07] bg-white p-8 shadow-elevated"
            >
              <Quotes size={24} weight="fill" className="text-brand-500" aria-hidden="true" />
              <blockquote className="m-0 flex-1 font-sans text-[17px] leading-[1.6] text-zinc-800">{t.quote}</blockquote>
              <figcaption className="flex flex-col gap-0.5 font-sans text-[14px] leading-[1.5]">
                <span className="font-medium text-zinc-950">{t.name}</span>
                <span className="text-zinc-500">
                  {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
