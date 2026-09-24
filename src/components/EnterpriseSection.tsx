import {
  Buildings,
  Headset,
  CurrencyDollar,
  ArrowsLeftRight,
  LockKey,
  Certificate,
  UsersThree,
} from "@phosphor-icons/react";
import SplitFeatureSection from "@/components/SplitFeatureSection";
import { trackCtaClick } from "@/lib/analytics";

const CONTACT_HREF = "/contact-sales";

const CAPABILITIES = [
  {
    icon: Buildings,
    title: "Capacity assurance and SLAs",
    description: "Guaranteed capacity and contractual SLAs for uptime, performance, and support.",
  },
  {
    icon: Headset,
    title: "Dedicated onboarding",
    description: "A dedicated engineer helps you migrate, configure, and go live from day one.",
  },
  {
    icon: CurrencyDollar,
    title: "Custom pricing and invoicing",
    description: "Volume discounts, committed-use terms, and consolidated invoicing.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Guided migration",
    description: "A migration plan and engineering support.",
  },
  {
    icon: LockKey,
    title: "Access controls",
    description: "Per-bucket API key scoping and fine-grained access policies.",
  },
  {
    icon: UsersThree,
    title: "Team roles and permissions",
    description:
      "Invite teammates to your organization and assign owner, admin, member, or read-only roles.",
  },
  {
    icon: Certificate,
    title: "Certified infrastructure",
    description:
      "Delivered through top-tier data centers certified to ISO 27001, SOC 2, and PCI DSS standards.",
  },
];

/** Enterprise band on the homepage: pitch + capability list, via SplitFeatureSection. */
const EnterpriseSection = () => (
  <SplitFeatureSection
    label="Enterprise"
    heading="Storage your team can rely on"
    description="Predictable costs, contractual commitments, and hands-on support for teams running storage at scale."
    items={CAPABILITIES}
    cta={{
      label: "Talk to sales",
      href: CONTACT_HREF,
      onClick: () => trackCtaClick("Talk to sales", CONTACT_HREF, "secondary"),
    }}
  />
);

export default EnterpriseSection;
