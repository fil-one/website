import { Button } from "@/components/Button";
import { SectionLabel } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";
import drivesRack from "../assets/drives-rack.webp";

const QUOTE_HREF = "/contact-sales";
/** The Host a zone page. */
export const HOST_HREF = "/neocloud";

const ENTERPRISE_POINTS = [
  "Reserved capacity for 1, 3 or 5 years with SLAs",
  "Role-based access, IAM and bucket policies, scoped keys",
  "Audit reports on request, migration guided by our team",
];

/**
 * The two non-self-serve doors, side by side: Enterprise on a tinted card,
 * Neoclouds and data centers on the drive photograph.
 */
const TeamsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });
  return (
    <section id="teams" className="w-full px-5 pb-24 md:px-8 md:pb-24">
      <div ref={ref} className={`mx-auto grid w-full max-w-container grid-cols-1 gap-4 md:grid-cols-2 reveal${inView ? " in-view" : ""}`}>
        <div className="flex flex-col gap-4 rounded-2xl border border-brand-500/35 bg-brand-50 p-8 shadow-elevated md:p-10">
          <SectionLabel>Enterprise</SectionLabel>
          <h3 className="m-0 font-display text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-zinc-950">
            Storage your team can rely on
          </h3>
          <ul className="m-0 list-disc pl-[18px] font-sans text-body leading-[1.7] text-zinc-600">
            {ENTERPRISE_POINTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Button
            variant="primary"
            href={QUOTE_HREF}
            className="mt-auto self-start pt-2"
            onClick={() => trackCtaClick("Request a quote", QUOTE_HREF, "primary")}
          >
            Request a quote
          </Button>
        </div>

        <div
          className="relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-brand-700 bg-cover p-8 md:p-10"
          style={{ backgroundImage: `url(${drivesRack})`, backgroundPosition: "center 30%" }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-drives-tint" />
          <div className="relative flex h-full flex-col gap-4">
            <SectionLabel tone="dark">Neoclouds and data centers</SectionLabel>
            <h3 className="m-0 font-display text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-white">Extend your cloud</h3>
            <p className="m-0 font-sans text-body leading-[1.7] text-white/80">
              Drives are scarce. We bring S3 storage to your data center with no hardware lead times, and you resell it under your brand.
            </p>
            <Button
              variant="secondary"
              href={HOST_HREF}
              className="mt-auto self-start !bg-white !text-zinc-950 hover:!bg-zinc-100"
              onClick={() => trackCtaClick("Host a zone", HOST_HREF, "secondary")}
            >
              Host a zone
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
