import { useEffect } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { useSeo } from "@/hooks/useSeo";
import { SectionLabel } from "@/components/LandingPrimitives";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import PricingCard from "@/components/PricingCard";
import ProofStrip from "@/components/ProofStrip";
import CostCalculatorSection from "@/components/CostCalculatorSection";
import CtaBanner from "@/components/CtaBanner";
import { trackCtaClick, trackDocsClick } from "@/lib/analytics";
import { COMPETITORS, MONTHLY_MINIMUM_DISPLAY, PRICE_DISPLAY } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";

const DOCS_URL = "https://docs.fil.one";
const SALES_HREF = "/contact-sales";

// ─── Plans ─────────────────────────────────────────────────────────────────────
const PAYGO_FEATURES = [
  "1 TB free for 30 days, no credit card",
  "No API charges or retrieval fees",
  "Object Lock and versioning included",
  `${MONTHLY_MINIMUM_DISPLAY} monthly minimum`,
];

const RESERVED_FEATURES = [
  "Commit for 1, 3 or 5 years",
  "Capacity assurance and deployment SLAs",
  "Everything in Pay as you go",
  "Guided migration and invoicing",
];

const FEES = [
  { figure: "$0", label: "Egress", note: "Subject to fair use." },
  { figure: "$0", label: "API requests" },
  { figure: "$0", label: "Retrieval fees" },
];

// ─── Billing FAQ ───────────────────────────────────────────────────────────────
const BILLING_FAQS: FaqItem[] = [
  {
    question: "How is my bill calculated?",
    answer: `You pay ${PRICE_DISPLAY} per TB stored per month, and nothing for egress, API requests or retrieval, subject to fair use. There are no tiers to move between and no minimum storage duration.`,
  },
  {
    question: "Is there a minimum charge?",
    answer: `Yes, ${MONTHLY_MINIMUM_DISPLAY} a month. Store under 1 TB and you pay the minimum; store more and you pay per TB for what you use.`,
  },
  {
    question: "What counts as egress?",
    answer:
      "Egress is any data transferred out of your bucket: to the internet, to another cloud or to your own servers. On a paid plan there is no egress charge, subject to fair use, and no per-request charges either. The 30-day trial includes 2 TB of egress.",
  },
  {
    question: "What's included in the free trial?",
    answer:
      "1 TB of storage and 2 TB of egress for 30 days, with no credit card required. Every feature is included, so you can test Object Lock, versioning and your own tooling before you pay anything. Upgrade to a paid plan to keep going after that.",
  },
  {
    question: "How does reserved capacity work?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>
          Commit to a capacity for 1, 3 or 5 years and we price it for you, with capacity assurance and deployment SLAs, guided migration and invoicing. Everything in Pay as you go is included.{" "}
          <a href={SALES_HREF} className="faq-link">Talk to sales</a> and we will put a quote together.
        </p>
      </div>
    ),
  },
  {
    question: "How can I pay?",
    answer: (
      <div className="flex flex-col gap-3 pb-5" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A" }}>
        <p>
          Pay as you go is billed monthly in USD. Reserved capacity is invoiced. We do not currently accept FIL; if paying in FIL is a hard requirement,{" "}
          <a href={SALES_HREF} className="faq-link">get in touch</a> and we can explore options depending on your storage volume.
        </p>
      </div>
    ),
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
const PricingPage = () => {
  useSeo();

  // Deep links like /pricing#calculator arrive as a full page load; the target
  // section only exists after render, so scroll to it once on mount.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Defer a frame so the section is in the DOM before we scroll.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PlatformNavbar />

      <main id="main-content">
        {/* ── Hero + plans ─────────────────────────────────────────────────── */}
        <div className="relative isolate overflow-hidden bg-white">
          <Hero
            grid
            glow
            badge={<SectionLabel>Pricing</SectionLabel>}
            title={
              <>
                Serious performance.
                <br />
                <span className="text-brand-500">Simple pricing.</span>
              </>
            }
            description={`One flat rate: ${PRICE_DISPLAY} per TB per month for S3-compatible storage. No API charges, no retrieval fees, no surprises.`}
            titleMaxWidth={780}
            descriptionMaxWidth={640}
            contentClassName="pb-6"
          >
            <div className="mt-14 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <PricingCard
                name="Pay as you go"
                tagline="For teams getting started"
                price={PRICE_DISPLAY}
                priceSuffix="per TB per month"
                features={PAYGO_FEATURES}
                cta={{
                  label: "Start for free",
                  href: signupUrl(),
                  variant: "primary",
                  onClick: () => trackCtaClick("Start for free", signupUrl(), "primary"),
                }}
                highlighted
              />
              <PricingCard
                name="Reserved capacity"
                tagline="For teams at scale"
                price="Custom"
                features={RESERVED_FEATURES}
                cta={{
                  label: "Talk to sales",
                  href: SALES_HREF,
                  variant: "secondary",
                  onClick: () => trackCtaClick("Talk to sales", SALES_HREF, "secondary"),
                }}
              />
            </div>
          </Hero>
        </div>

        {/* ── No hidden fees ───────────────────────────────────────────────── */}
        <section className="w-full px-5 pb-24 pt-10 md:px-8">
          <div className="mx-auto flex w-full max-w-container flex-col items-center gap-5 border-t border-black/[0.08] pt-8">
            <SectionLabel>No hidden fees</SectionLabel>
            <ProofStrip items={FEES} />
          </div>
        </section>

        {/* ── Calculator ───────────────────────────────────────────────────── */}
        <CostCalculatorSection id="calculator" competitors={COMPETITORS} tone="dark" />

        {/* ── Billing FAQ ──────────────────────────────────────────────────── */}
        <FaqSection
          items={BILLING_FAQS}
          layout="side"
          label="Billing FAQ"
          title="Questions about pricing"
          sideLink={{ label: "More answers in the docs ↗", href: DOCS_URL, external: true, onClick: () => trackDocsClick(DOCS_URL) }}
        />

        {/* ── CTA banner ───────────────────────────────────────────────────── */}
        <CtaBanner
          image="window"
          heading="Bring a workload."
          headingMaxWidth={560}
          subheadMaxWidth={460}
          subhead="1 TB free for 30 days, no credit card. Prefer to talk first? Talk to sales."
          cta={{ label: "Start for free", href: signupUrl(), onClick: () => trackCtaClick("Start for free", signupUrl(), "primary") }}
          secondaryCta={{ label: "Talk to sales", href: SALES_HREF, onClick: () => trackCtaClick("Talk to sales", SALES_HREF, "secondary") }}
        />
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
