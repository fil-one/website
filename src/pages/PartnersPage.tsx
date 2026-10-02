import { Code, CurrencyDollar, Globe, ShieldCheck, Stack, Users, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import IconTile from "@/components/IconTile";
import SpaceCard from "@/components/SpaceCard";
import TextLink from "@/components/TextLink";
import CtaBanner from "@/components/CtaBanner";
import { PressBar } from "@/components/PressBar";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { trackCtaClick } from "@/lib/analytics";

/** The partner application form. */
const PARTNER_APPLY_HREF = "/partners/apply";
const HOST_HREF = "/host";
const SALES_HREF = "/contact-sales";

const WHY: { icon: PhosphorIcon; title: string; body: string }[] = [
  { icon: CurrencyDollar, title: "$0 egress, $0 API calls", body: "One per-TB rate. Easy to quote, no surprise bills for your customers.*" },
  { icon: ShieldCheck, title: "Durable and verifiable", body: "Erasure coded across independent providers, with cryptographic proof of storage you can show an auditor." },
  { icon: Code, title: "Drop-in S3", body: "Same API, SDKs and tools. Your customers change an endpoint, not their code." },
  { icon: Globe, title: "No lock-in, in-jurisdiction", body: "An independent provider network. Keep data in the country your customer needs." },
  { icon: Stack, title: "Built for AI-scale data", body: "Datasets, checkpoints and logs at petabyte scale, at a price that makes keeping them sensible." },
  { icon: Users, title: "People, not portals", body: "A named partner team for deals, migrations and launches." },
];

interface Role {
  kind: string;
  title: string;
  audience: string;
  points: string[];
  link: { label: string; href: string };
}

const ROLES: Role[] = [
  {
    kind: "Sell",
    title: "Channel",
    audience: "Resellers, VARs, referral partners",
    points: ["Resell or refer Fil One", "Earn on every account you bring", "Deal registration and co-marketing"],
    link: { label: "Apply", href: PARTNER_APPLY_HREF },
  },
  {
    kind: "Build",
    title: "Technology",
    audience: "ISVs, platforms, integrations",
    points: ["Embed S3 storage in your product", "Validated integration listing", "Joint launch and marketing"],
    link: { label: "Apply", href: PARTNER_APPLY_HREF },
  },
  {
    kind: "Manage",
    title: "Managed service",
    audience: "Backup, IT services, disaster recovery",
    points: ["Run storage and backups for clients", "Bundle it into your managed service", "Predictable per-TB cost, no egress bills*"],
    link: { label: "Apply", href: PARTNER_APPLY_HREF },
  },
  {
    kind: "Host",
    title: "Data center",
    audience: "Neoclouds and colocation",
    points: ["Fil One storage in your building", "We fund the hardware", "Resell it under your brand"],
    link: { label: "See Host a zone", href: HOST_HREF },
  },
];

const STEPS: [string, string, string][] = [
  ["01", "Tell us about you", "Your business, your customers and the role that fits."],
  ["02", "Plan together", "Commercials, technical fit and go-to-market, agreed up front."],
  ["03", "Launch and grow", "Deal support, co-marketing and a partner team behind you."],
];

const PartnersPage = () => {
  useSeo();
  const why = useInView({ threshold: 0.05 });
  const roles = useInView({ threshold: 0.05 });
  const steps = useInView({ threshold: 0.1 });

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <PlatformNavbar />
      <main id="main-content">
        <div className="relative isolate overflow-hidden bg-white">
          <Hero
            grid
            glow
            badge={<SectionLabel>Partner program</SectionLabel>}
            title={
              <>
                Sell, build on or run
                <br />
                <span className="text-brand-500">Fil One storage.</span>
              </>
            }
            description="One program, four ways in. Pick the role that fits your business and we'll back you with a partner team, not a portal."
            titleMaxWidth={820}
            descriptionMaxWidth={640}
            ctas={[
              { label: "Become a partner", href: PARTNER_APPLY_HREF, variant: "primary", size: "lg", glow: true, onClick: () => trackCtaClick("Become a partner", PARTNER_APPLY_HREF, "primary") },
              { label: "Find your role", href: "#roles", variant: "secondary", onClick: () => trackCtaClick("Find your role", "#roles", "secondary") },
            ]}
            contentClassName="pb-16 md:pb-20"
          />
        </div>

        {/* Why partner */}
        <section className="w-full px-5 pb-24 md:px-8">
          <div ref={why.ref} className={`mx-auto flex w-full max-w-container flex-col gap-10 border-t border-black/[0.08] pt-20 reveal${why.inView ? " in-view" : ""}`}>
            <div className="flex max-w-[760px] flex-col gap-3.5">
              <SectionLabel>Why partner</SectionLabel>
              <SectionHeading size="text-h2 md:text-h1">Storage your customers will want.</SectionHeading>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WHY.map(({ icon, title, body }) => (
                <div key={title} className="flex flex-col gap-4 rounded-2xl border border-black/[0.07] bg-white p-7 shadow-elevated">
                  <IconTile icon={icon} size="lg" />
                  <div className="flex flex-col gap-2">
                    <h3 className="m-0 font-sans text-body-lg font-medium leading-[1.3] text-zinc-950">{title}</h3>
                    <p className="m-0 font-sans text-[14px] leading-[1.6] text-zinc-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="m-0 font-sans text-eyebrow text-zinc-500">*Egress subject to reasonable use.</p>
          </div>
        </section>

        <PressBar tone="tint" />

        {/* Partner roles */}
        <div className="w-full px-5 pt-24 md:px-8">
          <div ref={roles.ref} className={`mx-auto w-full max-w-container reveal${roles.inView ? " in-view" : ""}`}>
            <SpaceCard id="roles" className="scroll-mt-header">
              <div className="flex flex-col gap-12">
                <div className="flex max-w-[760px] flex-col gap-4">
                  <SectionLabel tone="dark">Partner roles</SectionLabel>
                  <SectionHeading tone="dark" size="text-h2 md:text-h1">
                    One program.
                    <br />
                    <span className="text-brand-300">Four roles.</span>
                  </SectionHeading>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {ROLES.map(({ kind, title, audience, points, link }) => (
                    <div key={title} className="flex flex-col gap-3.5 rounded-2xl border border-white/[0.12] bg-white/[0.05] p-6">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand-300">{kind}</span>
                      <div className="flex flex-col gap-1">
                        <h3 className="m-0 font-sans text-[20px] font-medium leading-[1.25] text-white">{title}</h3>
                        <p className="m-0 font-sans text-[13px] text-white/55">{audience}</p>
                      </div>
                      <ul className="m-0 flex list-none flex-col gap-2 p-0 pt-1">
                        {points.map((p) => (
                          <li key={p} className="font-sans text-[14px] leading-[1.5] text-white/80">
                            {p}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={link.href}
                        onClick={() => trackCtaClick(link.label, link.href, "secondary")}
                        className="mt-auto inline-flex items-center gap-1 pt-3 font-sans text-[14px] font-medium text-white no-underline transition-opacity hover:opacity-70"
                      >
                        {link.label} →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </SpaceCard>
          </div>
        </div>

        {/* How it works */}
        <section className="mt-24 w-full border-y border-zinc-100 bg-zinc-50 px-5 py-24 md:px-8">
          <div ref={steps.ref} className={`mx-auto flex w-full max-w-container flex-col gap-10 reveal${steps.inView ? " in-view" : ""}`}>
            <div className="flex max-w-[760px] flex-col gap-3.5">
              <SectionLabel>How it works</SectionLabel>
              <SectionHeading size="text-h2 md:text-h1">From hello to launch in three steps.</SectionHeading>
              <SectionSub>Not sure which role fits? Tell us about your business and we'll point you to the best path.</SectionSub>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {STEPS.map(([n, a, b]) => (
                <div key={n} className="flex flex-col gap-2.5 border-t border-black/10 pt-5">
                  <span className="font-mono text-[12px] font-medium tracking-[0.08em] text-brand-600">{n}</span>
                  <h3 className="m-0 font-sans text-[18px] font-medium leading-[1.3] text-zinc-950">{a}</h3>
                  <p className="m-0 font-sans text-[14px] leading-[1.6] text-zinc-600">{b}</p>
                </div>
              ))}
            </div>
            <TextLink href={HOST_HREF} tone="brand" arrow>
              Run a data center? Host a zone instead
            </TextLink>
          </div>
        </section>

        <div className="h-24" />
        <CtaBanner
          image="window"
          heading="Become a partner."
          headingMaxWidth={560}
          subheadMaxWidth={520}
          subhead="Tell us what you do and who you sell to, and the partner team will get back to you. Prefer to talk first? Talk to sales."
          cta={{ label: "Apply now", href: PARTNER_APPLY_HREF, onClick: () => trackCtaClick("Apply now", PARTNER_APPLY_HREF, "primary") }}
          secondaryCta={{ label: "Talk to sales", href: SALES_HREF, onClick: () => trackCtaClick("Talk to sales", SALES_HREF, "secondary") }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default PartnersPage;
