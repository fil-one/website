import { HardDrive, ChatDots, Robot } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/Button";
import IconTile from "@/components/IconTile";
import FeatureList from "@/components/FeatureList";
import TextLink from "@/components/TextLink";
import ProductCard from "@/components/ProductCard";
import { PRICE_DISPLAY } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const STORAGE_FEATURES = [
  "11 nines durability, verified daily",
  "Fully S3-compatible, no code changes needed",
  "No egress fees, no API request charges",
];

const RAG_FEATURES = [
  "Auto-indexes files in your bucket on upload",
  "Semantic search powered by your own LLM keys",
  "Supports PDF, Markdown, DOCX, HTML, and more",
];

const AGENT_FEATURES = [
  "Connect AI tools and automations",
  "Works with your existing buckets",
  "No egress fees",
  "Revoke access any time",
];

const ProductsSection = () => {
  const { ref: headingRef, inView: headingInView } = useInView();
  const { ref: storageRef, inView: storageInView } = useInView({ threshold: 0.1 });
  const { ref: addonsRef, inView: addonsInView } = useInView({ threshold: 0.05 });

  return (
    <section
      id="products"
      className="w-full"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="flex flex-col gap-10 items-center px-5 md:px-8 pt-40 md:pt-52 pb-24 md:pb-32 w-full max-w-container mx-auto">

        {/* Heading */}
        <SectionHeader
          ref={headingRef}
          className={`max-w-[560px] reveal${headingInView ? " in-view" : ""}`}
          label="Products"
          title="Start with storage. Build AI on top."
          subtitle="Storage is the foundation. Bucket Intelligence and AI Agent Toolkit will soon connect directly to your buckets, no extra infrastructure needed."
        />

        {/* Foundation card — Object Storage */}
        <div
          ref={storageRef}
          className={`w-full reveal${storageInView ? " in-view" : ""}`}
        >
          <div
            className="w-full rounded-2xl border border-brand/20 bg-[#FAFEFF] p-8 pb-6 md:p-10 md:pb-6"
            style={{
              // Bespoke blue-tinted card shadow — no matching token (differs from shadow-elevated).
              boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 24px rgba(0,144,255,0.06)",
            }}
          >
            <div className="flex flex-col gap-6">
              {/* Header: icon + title */}
              <div className="flex items-center gap-3">
                <IconTile icon={HardDrive} />
                <h3 className="m-0 font-display text-[22px] font-medium leading-[1.2] tracking-[-0.015em] text-zinc-950">
                  Object Storage
                </h3>
              </div>

              {/* Description */}
              <p className="-mt-2 max-w-[600px] font-sans text-[15px] font-normal leading-[1.6] text-zinc-600">
                S3-compatible, verifiably durable object storage. Drop-in compatible with every S3 SDK and workflow, and the substrate every other capability runs on.
              </p>

              {/* Features */}
              <FeatureList items={STORAGE_FEATURES} />

              {/* Divider */}
              <div className="h-px w-full bg-black/[0.06]" />

              {/* Footer: price + links + CTA */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-display text-[20px] font-medium leading-none tracking-[-0.02em] text-zinc-950">
                    {PRICE_DISPLAY}
                    <span className="font-sans text-[14px] font-normal tracking-normal text-zinc-500">
                      {" "}/ TB / month
                    </span>
                  </p>
                  <p className="mt-1 font-sans text-[12.5px] font-normal text-zinc-500">
                    30-day free trial · no credit card
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <TextLink href="/storage">Learn more</TextLink>
                  <Button variant="primary" href={signupUrl()} onClick={() => trackCtaClick("Start free trial", signupUrl(), "primary")}>
                    Start free trial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-6" style={{ backgroundColor: "rgba(0,0,0,0.10)" }} />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.07em",
              color: "#71717A",
              textTransform: "uppercase",
            }}
          >
            Add capabilities to your buckets
          </span>
          <div className="w-px h-6" style={{ backgroundColor: "rgba(0,0,0,0.10)" }} />
        </div>

        {/* Add-on cards */}
        <div
          ref={addonsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full reveal-group"
        >
          <ProductCard
            className={`reveal${addonsInView ? " in-view" : ""}`}
            icon={ChatDots}
            title="Bucket Intelligence"
            badge="Coming soon"
            subtitle="Turn any bucket into a queryable knowledge base"
            description="Powered by a built-in RAG Pipeline. Files are auto-indexed as they land in your bucket. Ask questions in plain language using your own OpenAI, Anthropic, or Cohere keys."
            features={RAG_FEATURES}
            learnMoreHref="/bucket-intelligence"
            footerTitle="Included at no charge during early testing"
            footerNote="LLM usage is billed by your provider"
            waitlistHref="/waitlist/bucket-intelligence"
            onWaitlistClick={() => trackCtaClick("Join waitlist", "/waitlist/bucket-intelligence", "secondary")}
          />

          <ProductCard
            className={`reveal${addonsInView ? " in-view" : ""}`}
            icon={Robot}
            title="AI Agent Toolkit"
            badge="Coming soon"
            subtitle="Connect your AI tools and automations to Fil One"
            description="Pick an integration, paste a config block, and your buckets are immediately available for your AI agents to use or to trigger automations from bucket events."
            features={AGENT_FEATURES}
            learnMoreHref="/ai-agent-toolkit"
            footerTitle="Available to early testers at no charge"
            waitlistHref="/waitlist/ai-agent-toolkit"
            onWaitlistClick={() => trackCtaClick("Join waitlist", "/waitlist/ai-agent-toolkit", "secondary")}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
