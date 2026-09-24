import {
  Check,
  CloudArrowUp,
  X,
  Cpu,
  Key,
  ClipboardText,
  LockKey,
  Plug,
  Receipt,
  UsersThree,
} from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProofBar from "@/components/ProofBar";
import FeatureCard from "@/components/FeatureCard";
import SplitFeatureSection from "@/components/SplitFeatureSection";
import Icon from "@/components/Icon";
import CtaBanner from "@/components/CtaBanner";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";

const APPLY_URL = "/neocloud/apply";

const PROOF_POINTS = [
  "S3-compatible API",
  "No egress or request fees",
  "Runs in your data center",
  "Run by our team",
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
    title: "Old data fills your fastest storage",
    body: "Old checkpoints and datasets sit on storage meant for active jobs, with nowhere cheaper nearby.",
  },
  {
    icon: CloudArrowUp,
    title: "The rest goes to another cloud",
    body: "Whatever doesn't fit goes to a hyperscaler, and your customers pay egress every time they pull it back.",
  },
  {
    icon: Receipt,
    title: "You don't see that revenue",
    body: "That storage bill keeps growing, and none of it goes through you.",
  },
];

/**
 * Build it yourself vs. running it with Fil One. Every Fil One cell restates a
 * claim made elsewhere on this page (install and run, S3 API, your data
 * center); none adds a new promise such as funding or a launch time.
 */
const BUILD_VS_PARTNER = [
  {
    aspect: "Software",
    build: "Build or license an S3-compatible storage stack",
    partner: "A standard S3 API that works with existing tools",
  },
  {
    aspect: "Hardware",
    build: "Buy, rack, and replace drives and servers",
    partner: "We install and run it",
  },
  {
    aspect: "People",
    build: "Hire a storage team and staff an on-call rotation",
    partner: "Our team operates it",
  },
  {
    aspect: "Where it runs",
    build: "Only where you have built it",
    partner: "In your data center, next to your GPUs",
  },
  {
    aspect: "First customer",
    build: "Months of work before you have anything to sell",
    partner: "Sell storage without building a storage product",
  },
];

const OFFER = [
  {
    icon: Plug,
    title: "Works with existing S3 tools",
    body: "Standard S3 API with path-style addressing, multipart upload, and presigned URLs. Your customers point the tools they already use at it.",
  },
  {
    icon: UsersThree,
    title: "Roles for every team",
    body: "Owner, Admin, Member, and ReadOnly roles. When someone is demoted, their access keys are revoked automatically.",
  },
  {
    icon: Key,
    title: "Keys limited to what they need",
    body: "Give a key access to every bucket or only some, choose read, write, list, or delete, and add an expiry date if you want one. Each key works in one region.",
  },
  {
    icon: LockKey,
    title: "Object lock and versioning",
    body: "Governance or compliance retention with full version history, both set when the bucket is created.",
  },
  {
    icon: ClipboardText,
    title: "An exportable audit log",
    body: "Account activity is logged and can be exported as CSV. Sign-in supports MFA and passkeys.",
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
  const { ref: compareRef, inView: compareInView } = useInView({ threshold: 0.05 });

  useSeo();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">
        {/* Hero */}
        <Hero
          glow
          grid
          contentClassName="pb-24 md:pb-32"
          title={
            <>
              Add object storage to{" "}
              <span className="whitespace-nowrap text-brand-500">your GPU cloud</span>
            </>
          }
          titleMaxWidth={700}
          description="We install and run S3-compatible storage in your data center, next to your GPUs. You sell it to your customers under your own brand."
          descriptionMaxWidth={560}
          ctas={[
            {
              label: "Talk to our team",
              href: APPLY_URL,
              variant: "primary",
              size: "lg",
              glow: true,
              onClick: () => trackCtaClick("Talk to our team", APPLY_URL, "primary"),
            },
          ]}
        />

        {/* Proof bar */}
        <ProofBar items={PROOF_POINTS} />

        {/* The problem */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-14 md:gap-16 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>The gap</SectionLabel>
              <SectionHeading maxWidth={480}>
                Your customers need somewhere to put their data
              </SectionHeading>
              <SectionSub maxWidth={520}>
                Training data, checkpoints, and job output pile up fast. Today most of it ends up
                with a storage provider you don't bill for.
              </SectionSub>
            </div>
            <div
              ref={problemRef}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full reveal-group"
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

        {/* Build vs partner */}
        <section className="w-full bg-zinc-50 border-y border-zinc-100">
          <div className="flex flex-col gap-12 md:gap-14 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Build or partner</SectionLabel>
              <SectionHeading maxWidth={620}>Build it yourself, or work with us</SectionHeading>
              <SectionSub maxWidth={560}>
                Running object storage is a business in itself. Here's what each option involves.
              </SectionSub>
            </div>

            <div
              ref={compareRef}
              className={`w-full max-w-[1040px] overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-elevated reveal${compareInView ? " in-view" : ""}`}
            >
              {/* Table from md up */}
              <table className="hidden w-full table-fixed border-collapse text-left md:table">
                <caption className="sr-only">Building object storage yourself compared with running it with Fil One</caption>
                {/* Fixed layout: a narrow label column, the two options share the rest equally */}
                <colgroup>
                  <col className="w-[180px]" />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr className="border-b border-black/[0.06]">
                    <td className="px-8 py-5" />
                    <th scope="col" className="px-8 py-5 font-sans text-[15px] font-medium text-zinc-500">Build it yourself</th>
                    <th scope="col" className="bg-brand-50/60 px-8 py-5 font-sans text-[15px] font-semibold text-brand-600">With Fil One</th>
                  </tr>
                </thead>
                <tbody>
                  {BUILD_VS_PARTNER.map(({ aspect, build, partner }) => (
                    <tr key={aspect} className="border-b border-black/[0.06] last:border-b-0">
                      <th scope="row" className="px-8 py-5 align-top font-sans text-[14px] font-medium leading-[1.5] text-zinc-500">
                        {aspect}
                      </th>
                      <td className="px-8 py-5 align-top">
                        <span className="flex items-start gap-2.5 text-pretty font-sans text-[15px] leading-[1.5] text-zinc-600">
                          <Icon icon={X} size={14} weight="bold" className="mt-[4px] shrink-0 text-zinc-400" aria-hidden="true" />
                          {build}
                        </span>
                      </td>
                      <td className="bg-brand-50/60 px-8 py-5 align-top">
                        <span className="flex items-start gap-2.5 text-pretty font-sans text-[15px] font-medium leading-[1.5] text-zinc-950">
                          <Icon icon={Check} size={14} weight="bold" className="mt-[4px] shrink-0 text-brand-600" aria-hidden="true" />
                          {partner}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Stacked rows on mobile */}
              <ul className="m-0 list-none divide-y divide-black/[0.06] p-0 md:hidden">
                {BUILD_VS_PARTNER.map(({ aspect, build, partner }) => (
                  <li key={aspect} className="flex flex-col gap-3 p-6">
                    <span className="font-sans text-[14px] font-medium text-zinc-500">{aspect}</span>
                    <span className="flex items-start gap-2.5 font-sans text-[14.5px] leading-[1.5] text-zinc-600">
                      <Icon icon={X} size={14} weight="bold" className="mt-[4px] shrink-0 text-zinc-400" aria-hidden="true" />
                      <span><span className="sr-only">Build it yourself: </span>{build}</span>
                    </span>
                    <span className="flex items-start gap-2.5 font-sans text-[14.5px] font-medium leading-[1.5] text-zinc-950">
                      <Icon icon={Check} size={14} weight="bold" className="mt-[4px] shrink-0 text-brand-600" aria-hidden="true" />
                      <span><span className="sr-only">With Fil One: </span>{partner}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* What you get */}
        <SplitFeatureSection
          label="What you get"
          heading="Built for reselling"
          description="Standard S3 for your customers, with roles, scoped keys, and an audit log for your team."
          items={OFFER.map(({ icon, title, body }) => ({ icon, title, description: body }))}
          cta={{
            label: "Talk to our team",
            href: APPLY_URL,
            onClick: () => trackCtaClick("Talk to our team", APPLY_URL, "secondary"),
          }}
        />

        {/* Closing CTA */}
        <CtaBanner
          heading="Sell storage from your own data center"
          subhead="We install and run S3-compatible storage next to your GPUs, so you can sell it under your own brand."
          headingMaxWidth={640}
          cta={{
            label: "Talk to our team",
            href: APPLY_URL,
            onClick: () => trackCtaClick("Talk to our team", APPLY_URL, "primary"),
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default NeocloudPage;
