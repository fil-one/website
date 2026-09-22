import {
  Buildings,
  Cpu,
  CurrencyDollar,
  Key,
  ClipboardText,
  LockKey,
  Plug,
  Receipt,
  UsersThree,
  HardDrives,
} from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Pill from "@/components/Pill";
import ProofBar from "@/components/ProofBar";
import FeatureCard from "@/components/FeatureCard";
import IconTile from "@/components/IconTile";
import Step from "@/components/Step";
import CtaBanner from "@/components/CtaBanner";
import FaqSection from "@/components/FaqSection";
import TextLink from "@/components/TextLink";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { PRICE_PER_TB_MONTH } from "@/lib/pricing";
import { signupUrl } from "@/lib/console-url";
import { trackCtaClick } from "@/lib/analytics";

const SALES_URL = "/contact-sales";
const PARTNERS_URL = "/partners";

const PROOF_POINTS = [
  "S3-compatible API",
  "No egress fees, no request charges",
  "Storage installed in your data center",
  "No hardware to buy, no team to hire",
];

/**
 * The problem framing: a GPU cloud's fast tier ends up holding data that is
 * not being read, and everything else goes to a storage provider the operator
 * does not bill for. Deliberately qualitative: no latency, throughput or
 * cost figures, since none of those are published claims.
 */
const PROBLEM = [
  {
    icon: Cpu,
    title: "Your fast tier holds finished work",
    body: "The tier you bought for the working set ends up holding completed checkpoints and last quarter's datasets, because there is nowhere cheaper to put them that is still close by.",
  },
  {
    icon: Plug,
    title: "Everything else leaves the building",
    body: "Overflow goes to a general-purpose cloud somewhere else, across the public internet, with a meter running on every read back.",
  },
  {
    icon: Receipt,
    title: "The storage line is not yours",
    body: "The colder the data, the more of it there is. That is a growing line on your customer's bill, and today none of it appears on your invoice.",
  },
];

const OFFER = [
  {
    icon: Buildings,
    title: "In your data center",
    body: "We can install and run object storage inside your own facility, next to your GPU nodes, instead of a region away. Talk to us about what a site needs.",
  },
  {
    icon: Plug,
    title: "S3 as your customers know it",
    body: "A standard S3-compatible API with path-style addressing, multipart upload and presigned URLs. Any tool with an S3-compatible target points at it. Nothing to rewrite.",
  },
  {
    icon: UsersThree,
    title: "Multi-tenant from the start",
    body: "Organization roles for Owner, Admin, Member and ReadOnly, with access keys revoked automatically when someone is demoted.",
  },
  {
    icon: Key,
    title: "Keys scoped per bucket",
    body: "Access keys are scoped to a single bucket and region, with read, write, list and delete granularity and an optional expiry date.",
  },
  {
    icon: LockKey,
    title: "Retention your customers can rely on",
    body: "Object lock with governance or compliance retention, alongside versioning. Both are set when the bucket is created.",
  },
  {
    icon: ClipboardText,
    title: "An audit log you can export",
    body: "Account activity is recorded in an audit log that exports to CSV. Sign-in is protected with MFA and passkeys.",
  },
];

const COMMERCIALS = [
  {
    icon: CurrencyDollar,
    title: "One metered line",
    body: `Storage is the only thing metered. No egress charges and no per-request charges. Our public rate is ${PRICE_PER_TB_MONTH}; partner terms are agreed with our team.`,
  },
  {
    icon: HardDrives,
    title: "We fund and run the hardware",
    body: "Our capex, our racks, our operations. You add a storage product to your line card without a purchase order and without hiring a storage team.",
  },
  {
    icon: Receipt,
    title: "Your contract, your customer",
    body: "Your customers buy storage from you, on your paper, alongside the compute they already rent from you. We can stay behind the scenes.",
  },
  {
    icon: UsersThree,
    title: "Room to start small",
    body: "Begin on our existing regions in Europe (France) and US East (Michigan) while we work through what a deployment in your building looks like.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Tell us about the site",
    body: "Where your compute sits, what your customers store today, and which workload annoys you most: checkpoint sprawl, dataset reloads or a backup target you overpay for.",
  },
  {
    number: "02",
    title: "Start on our regions",
    body: "Point one cluster at a Fil One region and run it for real, while we work through the practicalities of putting storage in your building.",
  },
  {
    number: "03",
    title: "Agree the commercials",
    body: "We settle the rate, the terms and how your customers are billed, so the storage line is one you can quote and sell with confidence.",
  },
  {
    number: "04",
    title: "Sell it as your own",
    body: "Storage becomes a line on your invoice next to the GPU hours, with no hardware for you to buy and no product for you to build.",
  },
];

const FAQ_INCLUDE = [
  "Where is my data stored?",
  "Is Fil One compatible with my existing tools?",
  "What counts as egress?",
  "How is my bill calculated, and is there a minimum charge?",
  "Do you offer annual or reserved capacity plans?",
];

const DEPLOYMENTS = [
  {
    label: "Today",
    title: "On our regions",
    body: "Europe (France) and US East (Michigan). A bucket's region is fixed when you create it, and an access key is scoped to one region. Start here while we talk about your site.",
  },
  {
    label: "With your team",
    title: "In your data center",
    body: "We install and operate the storage inside your own facility, cross-connected to your GPU nodes, so the bytes never take a trip across the public internet.",
  },
];

/**
 * Neocloud (GPU cloud) partner page. Distinct from /partners, which covers the
 * channel, technology and MSP roles: this page is for operators who want a
 * storage product of their own, including storage installed inside their own
 * data center. Composed entirely from the shared token-based components.
 */
const NeocloudPage = () => {
  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: offerRef, inView: offerInView } = useInView({ threshold: 0.05 });
  const { ref: deployRef, inView: deployInView } = useInView({ threshold: 0.05 });
  const { ref: commercialsRef, inView: commercialsInView } = useInView({ threshold: 0.05 });
  const { ref: stepsRef, inView: stepsInView } = useInView({ threshold: 0.05 });

  useSeo({
    title: "Storage for GPU clouds · Fil One",
    description:
      "Add a storage line to your GPU cloud. Fil One funds, installs and runs S3-compatible object storage, including inside your own data center, so you can sell it to your customers.",
    canonical: "https://www.fil.one/neocloud",
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
          badge={<Pill>For GPU clouds</Pill>}
          title={
            <>
              Extend your neocloud with{" "}
              <span className="text-brand-500">a storage line of your own</span>
            </>
          }
          titleMaxWidth={700}
          description="We fund, install and run S3-compatible object storage, including inside your own data center. You sell it to your GPU customers as part of your own product."
          descriptionMaxWidth={560}
          ctas={[
            {
              label: "Talk to our team",
              href: SALES_URL,
              variant: "primary",
              size: "lg",
              glow: true,
              onClick: () => trackCtaClick("Talk to our team", SALES_URL, "primary"),
            },
            {
              label: "Start a 30-day trial",
              href: signupUrl(),
              variant: "secondary",
              onClick: () => trackCtaClick("Start a 30-day trial", signupUrl(), "secondary"),
            },
          ]}
          tagline="No hardware to buy · No egress fees · S3-compatible"
        />

        {/* Proof bar */}
        <ProofBar items={PROOF_POINTS} />

        {/* The problem */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-14 md:gap-16 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>The gap</SectionLabel>
              <SectionHeading maxWidth={620}>
                Your customers store more than they compute
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Training data, checkpoints, model artifacts and job output all have to live
                somewhere. Right now most of it lives somewhere you do not bill for.
              </SectionSub>
            </div>
            <div
              ref={problemRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full reveal-group"
            >
              {PROBLEM.map(({ icon, title, body }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={body}
                  className={`reveal${problemInView ? " in-view" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="w-full bg-zinc-50 border-y border-zinc-100">
          <div className="flex flex-col gap-14 md:gap-16 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>What you get</SectionLabel>
              <SectionHeading maxWidth={620}>An S3 tier built to be resold</SectionHeading>
              <SectionSub maxWidth={600}>
                Object storage is a commodity. One that sits next to your compute and is sold by
                you is not.
              </SectionSub>
            </div>
            <div
              ref={offerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group"
            >
              {OFFER.map(({ icon, title, body }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={body}
                  className={`reveal${offerInView ? " in-view" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Deployment options (dark band) */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-dark-section">
          <div
            ref={deployRef}
            className={`flex flex-col gap-12 items-center w-full max-w-container mx-auto reveal${deployInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-white/50">
                Two ways to run it
              </span>
              <h2 className="m-0 max-w-[620px] font-display text-[24px] md:text-[34px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
                Start on our regions, then move it into your building
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {DEPLOYMENTS.map(({ label, title, body }) => (
                <div
                  key={title}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-8"
                >
                  <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-brand-400">
                    {label}
                  </span>
                  <h3 className="m-0 font-display font-medium text-[18px] leading-[1.3] text-white">
                    {title}
                  </h3>
                  <p className="m-0 font-sans text-[14px] leading-[1.6] text-white/60">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commercials */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-14 md:gap-16 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>The commercials</SectionLabel>
              <SectionHeading maxWidth={560}>You sell it, you price it</SectionHeading>
              <SectionSub maxWidth={600}>
                Storage becomes a product on your line card, without a purchase order and without
                a hire.
              </SectionSub>
            </div>
            <div
              ref={commercialsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full reveal-group"
            >
              {COMMERCIALS.map(({ icon, title, body }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-4 rounded-2xl border border-black/[0.07] bg-white p-8 shadow-elevated reveal${commercialsInView ? " in-view" : ""}`}
                >
                  <IconTile icon={icon} size={22} className="h-12 w-12" />
                  <div className="flex flex-col gap-2">
                    <h3 className="m-0 font-sans font-medium text-[18px] leading-[1.3] text-zinc-950">
                      {title}
                    </h3>
                    <p className="m-0 font-sans text-[14px] leading-[1.6] text-zinc-500">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <TextLink href={PARTNERS_URL} tone="brand" arrow>
              See the wider partner program
            </TextLink>
          </div>
        </section>

        {/* How it starts */}
        <section className="w-full bg-zinc-50 border-y border-zinc-100">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>How it starts</SectionLabel>
              <SectionHeading maxWidth={560}>One workload, one site, one conversation</SectionHeading>
            </div>
            <div
              ref={stepsRef}
              className={`grid grid-cols-1 divide-y divide-zinc-200 lg:grid-cols-4 lg:divide-x lg:divide-y-0 w-full reveal${stepsInView ? " in-view" : ""}`}
            >
              {STEPS.map(({ number, title, body }) => (
                <Step
                  key={number}
                  number={number}
                  title={title}
                  description={body}
                  className="py-8 first:pt-0 last:pb-0 lg:py-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection include={FAQ_INCLUDE} />

        {/* Closing CTA */}
        <CtaBanner
          heading="Put a storage line next to your GPU hours"
          subhead="Tell us where your compute sits and which workload you would start with. We will take it from there."
          headingMaxWidth={520}
          cta={{
            label: "Talk to our team",
            href: SALES_URL,
            onClick: () => trackCtaClick("Talk to our team", SALES_URL, "primary"),
          }}
          secondaryCta={{
            label: "See the partner program",
            href: PARTNERS_URL,
            onClick: () => trackCtaClick("See the partner program", PARTNERS_URL, "secondary"),
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default NeocloudPage;
