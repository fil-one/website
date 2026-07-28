import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { LockKey, CurrencyDollar, ArrowsLeftRight, Wrench } from "@phosphor-icons/react";
import { trackCtaClick } from "@/lib/analytics";
import Hero from "@/components/Hero";
import Pill from "@/components/Pill";
import CheckChip from "@/components/CheckChip";
import { Button } from "@/components/Button";
import FeatureCard from "@/components/FeatureCard";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBanner from "@/components/CtaBanner";
import ProofBar from "@/components/ProofBar";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";

const WAITLIST_URL = "/waitlist/ai-agent-toolkit";

const PROOF = [
  "Works with Claude, Cursor & ChatGPT",
  "Automate via Zapier, n8n & webhooks",
  "SDKs for LangChain, LlamaIndex & more",
];

const WHY = [
  {
    icon: LockKey,
    title: "Data sovereignty",
    description:
      "Agent data lives in your buckets, not a third-party SaaS you don't control. Your keys, your data.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Open, portable storage",
    description:
      "Your agent data lives in standard S3-compatible buckets. Export or migrate it anytime, with no proprietary formats to trap you.",
  },
  {
    icon: CurrencyDollar,
    title: "No extra cost",
    description:
      "The toolkit is free with your storage plan. You pay for the storage you use, never for the toolkit itself.",
  },
  {
    icon: Wrench,
    title: "No infrastructure to manage",
    description:
      "Fil One handles durability, scaling, and replication as your agents grow. You just write to a bucket.",
  },
];

const PRICING_TAGS = [
  "MCP server included",
  "OAuth connectors included",
  "SDK support included",
  "No per-request fees",
  "No per-connection fees",
];

const FAQS = [
  {
    q: "What is MCP?",
    a: "Model Context Protocol, an open standard for connecting AI models to tools and data sources. Supported by Claude, Cursor, Continue, and others.",
  },
  {
    q: "Which apps are supported at launch?",
    a: "Claude Desktop, Cursor, Continue, Claude.ai, ChatGPT, Zapier, Make.com, and n8n. More coming.",
  },
  {
    q: "Is my agent data private?",
    a: "Yes. It lives in your Fil One buckets under your API keys. No third party can access it.",
  },
  {
    q: "Do I need the toolkit to use Fil One with code?",
    a: "No. Any S3-compatible SDK works out of the box. The toolkit adds MCP, OAuth connectors, and pre-built integrations on top.",
  },
  {
    q: "Can I use it with Claude?",
    a: "Yes. Both Claude Desktop (via MCP config file) and Claude.ai (via OAuth). Takes about two minutes to set up.",
  },
];

const AgentToolkitProductPage = () => {
  const { heroEndRef } = useScrollTracking();
  const { ref: proofRef, inView: proofInView } = useInView({ threshold: 0.05 });
  const { ref: whyRef, inView: whyInView } = useInView({ threshold: 0.05 });

  useSeo({
    title: "AI Agent Toolkit · Fil One",
    description:
      "Plug Fil One into Claude, Cursor, Zapier, and 10+ more integrations via MCP and OAuth. Free with your storage plan.",
    canonical: "https://www.fil.one/ai-agent-toolkit",
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
          title={<><span className="text-brand-500">Connect your AI stack</span> to your buckets</>}
          description="Let AI tools like Claude and Cursor read and write files directly in your buckets. Your data, your keys, no lock-in."
          titleMaxWidth={585}
          descriptionMaxWidth={460}
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

        {/* Why Fil One */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <SectionLabel>Why Fil One</SectionLabel>
              <SectionHeading>Your agent <span className="text-brand-500">data belongs to you</span></SectionHeading>
            </div>

            <div ref={whyRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full reveal-group">
              {WHY.map(({ icon, title, description }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={description}
                  className={`reveal${whyInView ? " in-view" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="w-full px-5 md:px-8 py-16 md:py-24 bg-white">
          <div className="w-full max-w-[800px] mx-auto rounded-3xl border border-brand/20 bg-brand-50 shadow-brand-ambient">
            <div className="flex flex-col gap-10 items-center text-center px-8 md:px-16 py-16 md:py-20 w-full">

              <div className="flex flex-col gap-4 items-center">
                <SectionLabel>Pricing</SectionLabel>
                <SectionHeading>Free with your storage plan</SectionHeading>
                <SectionSub maxWidth={380}>
                  No separate licence, no per-request fees. Join the waitlist to get early access.
                </SectionSub>
              </div>

              {/* Feature tags */}
              <div className="flex flex-wrap justify-center gap-2">
                {PRICING_TAGS.map((tag) => (
                  <CheckChip key={tag}>{tag}</CheckChip>
                ))}
              </div>

              <Button
                variant="primary"
                size="lg"
                href={WAITLIST_URL}
                onClick={() => trackCtaClick("Join the waitlist", WAITLIST_URL, "primary")}
              >
                Join the waitlist
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-10 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container-prose mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading>Common questions</SectionHeading>
            </div>
            <FaqAccordion items={FAQS} idPrefix="ait-faq" />
          </div>
        </section>

        {/* CTA Banner */}
        <CtaBanner
          heading={<>Let your AI agents work with<br />your data</>}
          subhead="Early access is open. Join the waitlist and be first in line."
          cta={{
            label: "Join the waitlist",
            href: WAITLIST_URL,
            onClick: () => trackCtaClick("Join the waitlist", WAITLIST_URL, "primary"),
          }}
        />

      </main>
      <Footer />
    </div>
  );
};

export default AgentToolkitProductPage;
