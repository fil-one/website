import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import {
  Users,
  Code,
  ShieldCheck,
  CurrencyDollar,
  Cube,
  ArrowsLeftRight,
  ChartLineUp,
  Chat,
} from "@phosphor-icons/react";
import Hero from "@/components/Hero";
import Pill from "@/components/Pill";
import ProofBar from "@/components/ProofBar";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";
import Step from "@/components/Step";
import CtaBanner from "@/components/CtaBanner";
import FeaturedInBar from "@/components/FeaturedInBar";
import RoleCard from "@/components/RoleCard";
import { Button } from "@/components/Button";

const PARTNER_ROLES = [
  {
    icon: Users,
    title: "Channel Partner",
    subtitle: "Resellers · VARs · Referral Partners",
    description: "You sell technology solutions and want to add cloud storage to your portfolio.",
    bullets: [
      "Resell Fil One or refer customers",
      "Earn revenue through reseller or referral programs",
      "Get sales, deal, and co-marketing support",
    ],
  },
  {
    icon: Code,
    title: "Technology Partner",
    subtitle: "ISVs · Platforms · Integration Partners",
    description: "You build software and want to integrate storage directly into your product.",
    bullets: [
      "Integrate Fil One through our S3-compatible API",
      "Embed storage into your product or platform",
      "Jointly launch and market integrations",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Managed Service Provider (MSP)",
    subtitle: "Backup Providers · IT Services · Disaster Recovery",
    description: "You manage infrastructure, backup, or data services on behalf of clients.",
    bullets: [
      "Manage customer storage and backups",
      "Offer storage as part of a managed service",
      "Reduce costs with predictable pricing and no egress fees",
    ],
  },
];

const WHY_FEATURES = [
  {
    icon: CurrencyDollar,
    title: "No egress fees",
    body: "No API request charges, no surprise bills. Easy to quote, easy to win.",
  },
  {
    icon: Cube,
    title: "Controls that pass an audit",
    body: "Object Lock retention in Governance or Compliance mode, plus a full version history on every object.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Drop-in S3 compatibility",
    body: "Existing tools, SDKs and workflows just work. Minimal lift to integrate or migrate.",
  },
  {
    icon: ChartLineUp,
    title: "Multi-cloud, no lock-in",
    body: "An independent network of providers. Meet residency needs, avoid single-vendor risk.",
  },
  {
    icon: Cube,
    title: "Built for AI & scale",
    body: "Tuned for large, data-intensive workloads with consistent performance at scale.",
  },
  {
    icon: Chat,
    title: "People, not portals",
    body: "A responsive partner team that helps with deals, migrations and integrations.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Reach out",
    body: "Tell us about your business and the role that fits. Our partner team will get back to you shortly.",
  },
  {
    number: "02",
    title: "Plan together",
    body: "We align on commercials, technical fit, and go-to-market, then get you set up.",
  },
  {
    number: "03",
    title: "Launch & grow",
    body: "Sell, integrate or bundle Fil One, backed by deal support, co-marketing and our partner team.",
  },
];

const PROOF_POINTS = [
  "Competitive partner margins",
  "Deal registration & co-sell support",
  "Simple pricing, easy to quote and win",
  "No egress fees, no surprise bills",
];

const PartnersPage = () => {
  const { ref: whyRef, inView: whyInView } = useInView({ threshold: 0.1 });
  const { ref: stepsRef, inView: stepsInView } = useInView({ threshold: 0.1 });
  const { ref: rolesRef, inView: rolesInView } = useInView({ threshold: 0.1 });

  useSeo({
    title: "Partners · Fil One",
    description:
      "Channel, Technology, and MSP partner programs for Fil One. Resell, integrate, or bundle S3-compatible cloud storage with no egress fees.",
    canonical: "https://www.fil.one/partners",
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
          contentClassName="pb-24 md:pb-32"
          badge={<Pill>Partner Program</Pill>}
          title={<>Choose the way to partner <span className="text-brand-500">that fits your business</span></>}
          titleMaxWidth={620}
          description="However you reach customers, there's a path to partner with Fil One. Pick a role to start the conversation."
          descriptionMaxWidth={460}
          ctas={[
            { label: "Become a partner", href: "/partners/apply", variant: "primary", size: "lg", glow: true },
          ]}
        />

        {/* Featured in */}
        <FeaturedInBar />

        {/* Proof bar */}
        <ProofBar items={PROOF_POINTS} />

        {/* Why Fil One */}
        <section className="px-5 md:px-8 py-24 md:py-32 bg-white">
          <div ref={whyRef} className={`max-w-container mx-auto reveal${whyInView ? " in-view" : ""}`}>
            <SectionHeader
              className="max-w-[520px] mb-14 md:mb-16"
              label="Why partner with Fil One"
              title={<>Storage your customers <br /><span className="text-brand-500">will actually want</span></>}
              subtitle="A product that's easy to sell, easy to integrate, and easy to trust."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_FEATURES.map(({ icon, title, body }) => (
                <FeatureCard key={title} icon={icon} title={title} description={body} />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button
                variant="secondary"
                href="https://docs.fil.one"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore documentation
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-5 md:px-8 py-24 md:py-32 bg-zinc-50 border-y border-zinc-100">
          <div ref={stepsRef} className={`max-w-container mx-auto reveal${stepsInView ? " in-view" : ""}`}>
            <SectionHeader
              className="mb-14"
              label="How it works"
              title="From hello to launched in three steps"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-zinc-200">
              {STEPS.map(({ number, title, body }) => (
                <Step
                  key={number}
                  number={number}
                  title={title}
                  description={body}
                  className="sm:px-8 sm:first:pl-0 sm:last:pr-0"
                />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button variant="primary" href="/partners/apply">Become a partner</Button>
            </div>
          </div>
        </section>

        {/* One program. Multiple roles. */}
        <section className="px-5 md:px-8 py-24 md:py-32 bg-white">
          <div ref={rolesRef} className={`max-w-container mx-auto reveal${rolesInView ? " in-view" : ""}`}>
            <SectionHeader
              className="max-w-[440px] mb-14 md:mb-16"
              label="One program, multiple roles"
              title="Find the role that fits"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PARTNER_ROLES.map((role) => (
                <RoleCard key={role.title} {...role} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CtaBanner
          heading="Let's find the right way to partner"
          subhead="Not sure which role fits? Tell us about your business and we'll point you to the best path."
          cta={{ label: "Become a partner", href: "/partners/apply" }}
        />

      </main>
      <Footer />
    </div>
  );
};

export default PartnersPage;
