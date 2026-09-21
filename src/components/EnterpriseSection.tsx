import {
  Buildings,
  Headset,
  CurrencyDollar,
  ArrowsLeftRight,
  LockKey,
  Certificate,
  ArrowRight,
} from "@phosphor-icons/react";
import { Button } from "@/components/Button";
import Icon from "@/components/Icon";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";

const CONTACT_HREF = "/contact-sales";

const CAPABILITIES = [
  {
    icon: Buildings,
    title: "Capacity assurance & SLAs",
    description: "Guaranteed capacity and contractual SLAs for uptime, performance, and support.",
  },
  {
    icon: Headset,
    title: "Dedicated onboarding",
    description: "A dedicated engineer helps you migrate, configure, and go live from day one.",
  },
  {
    icon: CurrencyDollar,
    title: "Custom pricing & invoicing",
    description: "Volume discounts, committed-use terms, and consolidated invoicing.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Guided migration",
    description: "A migration plan and engineering support get most teams live in days.",
  },
  {
    icon: LockKey,
    title: "Access controls",
    description: "Per-bucket API key scoping and fine-grained access policies.",
  },
  {
    icon: Certificate,
    title: "Certified infrastructure",
    description:
      "Delivered through top-tier data centers certified to ISO 27001, SOC 2, and PCI DSS standards.",
  },
];

/**
 * Enterprise band: a two-column split — a fixed pitch column on the left and a
 * hairline-divided capability list on the right. Deliberately not a card grid,
 * so it reads differently from the use-case and comparison sections it sits
 * between, and so six items stay compact instead of filling two more rows.
 */
const EnterpriseSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section className="w-full px-5 md:px-8 py-24 md:py-32 bg-zinc-50">
      <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-20">

        {/* Pitch column */}
        <div className="flex flex-col items-start gap-4 lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>Enterprise</SectionLabel>
          <SectionHeading maxWidth={320}>Storage your team can rely on</SectionHeading>
          <SectionSub maxWidth={340}>
            Predictable costs, contractual commitments, and hands-on support for teams running
            storage at scale.
          </SectionSub>
          <Button
            variant="primary"
            href={CONTACT_HREF}
            className="mt-2"
            onClick={() => trackCtaClick("Talk to sales", CONTACT_HREF, "primary")}
          >
            Talk to sales
            <Icon icon={ArrowRight} size={15} weight="bold" />
          </Button>
        </div>

        {/* Capability list */}
        <div ref={ref} className="reveal-group">
          <ul className="m-0 flex list-none flex-col p-0">
            {CAPABILITIES.map(({ icon, title, description }, i) => (
              <li
                key={title}
                className={`flex items-start gap-4 py-6 ${i === 0 ? "" : "border-t border-black/[0.07]"} reveal${
                  inView ? " in-view" : ""
                }`}
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-500 shadow-elevated">
                  <Icon icon={icon} size={17} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="m-0 font-sans text-[16px] font-medium leading-[1.3] text-zinc-950">
                    {title}
                  </h3>
                  <p className="m-0 font-sans text-[14px] font-normal leading-[1.6] text-zinc-500">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default EnterpriseSection;
