import { ShieldCheck, Database, ChartLine, Plug } from "@phosphor-icons/react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Recurring integrity verification",
    desc: "Every stored object is verified approximately every 24 hours. Data cannot silently corrupt or disappear — detection is built in, not bolted on.",
  },
  {
    icon: Database,
    title: "Version history",
    desc: "Object versioning stores every prior state. Prior versions are retrievable for audit, reconstruction, or evidence retention.",
  },
  {
    icon: ChartLine,
    title: "11 nines durability",
    desc: "Designed for 11 nines of durability. The storage architecture makes data loss a detectable and recoverable event.",
  },
  {
    icon: Plug,
    title: "S3-compatible audit tooling",
    desc: "Standard S3 API means audit tools, SIEM integrations, and object-level access logging work without custom adapters.",
  },
];

const ComplianceLandingPage = () => {
  useSeo({
    title: "Fil One — Audit-ready storage with recurring integrity verification",
    description:
      "S3-compatible storage with recurring integrity verification every ~24 hours and full version history. $4.99/TB flat. No egress fees.",
    canonical: "https://fil.one/lp/compliance",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: trustRef, inView: trustInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <LandingNavbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative isolate pt-[58px]" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />

          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            <div
              className="hero-fade-1 flex items-center gap-1.5 text-center"
              style={{
                backgroundColor: "#EFF8FF",
                border: "1px solid rgba(0,144,255,0.2)",
                borderRadius: 14,
                padding: "10px 14px",
                maxWidth: "90vw",
              }}
            >
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 13.5,
                  lineHeight: 1,
                  color: "#0070CC",
                }}
              >
                For fintech, health, and regulated teams
              </span>
            </div>

            <h1
              className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
                color: "#09090B",
                textAlign: "center",
                maxWidth: 800,
                margin: 0,
              }}
            >
              Prove your data is intact.<br />
              <span style={{ color: "#0090FF" }}>Don't take our word for it.</span>
            </h1>

            <p
              className="text-[15px] md:text-[17px] hero-fade-2"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 580,
                margin: 0,
              }}
            >
              S3-compatible storage with recurring integrity verification and full version history. $4.99/TB flat.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>

            <p
              className="hero-fade-4"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#71717A",
                textAlign: "center",
              }}
            >
              No credit card required · No egress fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={problemRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>The audit gap</SectionLabel>
              <SectionHeading>Standard object storage asks you to trust that data is intact.</SectionHeading>
              <SectionSub>
                Most object storage provides durability by replication but gives the customer no independent way to verify the data has not silently changed since it was written. Regulated teams need a trail — not an assumption.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "Silent corruption",
                  catch: "Bit rot is undetected without active verification.",
                  body: "Standard S3-compatible storage relies on replication for durability but does not continuously verify each object's content. Data can change silently — not detectable until a read or an audit.",
                },
                {
                  label: "Version accountability",
                  catch: "Who changed what, and when, is not always clear.",
                  body: "Evidence retention for SOC 2, ISO 27001, or HIPAA requires being able to retrieve a specific prior state of a record. Without version history, that state is gone once overwritten.",
                },
                {
                  label: "The vendor trust assumption",
                  catch: "Compliance reviews ask for verification, not assurances.",
                  body: "Telling an auditor that the vendor guarantees durability is not the same as showing a verifiable record. Procurement and audit teams are looking for observable integrity, not contractual language.",
                },
              ].map(({ label, body, catch: catchLine }) => (
                <div
                  key={label}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#52525B",
                        backgroundColor: "#F4F4F5",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 9999,
                        padding: "3px 10px",
                        marginBottom: 2,
                        alignSelf: "flex-start",
                      }}
                    >
                      {label}
                    </span>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: 18,
                        lineHeight: "1.3",
                        letterSpacing: "-0.01em",
                        color: "#09090B",
                      }}
                    >
                      {catchLine}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "#71717A",
                        marginTop: 4,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / integrity section */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={trustRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${trustInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>How integrity works</SectionLabel>
              <SectionHeading>
                Verified approximately <span style={{ color: "#0090FF" }}>every 24 hours.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Every object stored on Fil One receives an integrity fingerprint verified on a recurring basis — approximately every 24 hours. Data cannot silently change or disappear without detection. This is not a monitoring add-on; it is how the storage layer operates.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  heading: "~24-hour cadence",
                  sub: "Integrity verification runs automatically on every stored object. No configuration, no scheduled jobs.",
                },
                {
                  heading: "11 nines durability",
                  sub: "Designed for 11 nines of durability. Data loss is a detectable and recoverable event, not a silent failure.",
                },
                {
                  heading: "Cert status: in pursuit",
                  sub: "SOC 2 Type II and ISO 27001 are actively being pursued. We do not hold these certifications today — check docs.fil.one for current status.",
                },
              ].map(({ heading, sub }) => (
                <div
                  key={heading}
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    borderRadius: 16,
                    backgroundColor: "#F9FAFB",
                    padding: "24px 24px",
                    textAlign: "left",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 17,
                      color: "#09090B",
                      marginBottom: 8,
                      lineHeight: "1.3",
                    }}
                  >
                    {heading}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: "1.65",
                      color: "#71717A",
                      margin: 0,
                    }}
                  >
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={featuresRef}
            className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Compliance features</SectionLabel>
              <SectionHeading>
                Audit-ready storage, <span style={{ color: "#0090FF" }}>by default.</span>
              </SectionHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-4 p-6 rounded-2xl border"
                  style={{
                    borderColor: "rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
                    textAlign: "left",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{ backgroundColor: "#EFF8FF" }}
                  >
                    <Icon size={18} color="#0090FF" />
                  </div>
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 15,
                      lineHeight: "1.3",
                      color: "#09090B",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: "1.6",
                      color: "#71717A",
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>
                One rate. <span style={{ color: "#0090FF" }}>$4.99/TB/month.</span>
              </SectionHeading>
              <SectionSub maxWidth={520}>
                Storage. That is the whole bill. Integrity verification, version history, and 11 nines durability are included — not add-ons.
              </SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#71717A",
              }}
            >
              No credit card required · No egress fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={ctaRef}
            className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)",
                borderRadius: 20,
                textAlign: "center",
              }}
              className="px-6 md:px-12 py-16 md:py-[104px]"
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                    '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>'
                  )}")`,
                  backgroundSize: "60px 60px",
                  maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <h2
                  className="text-[26px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: "1.12",
                    color: "#FFFFFF",
                    marginBottom: 12,
                  }}
                >
                  Integrity verification, every 24 hours.
                </h2>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 17,
                    color: "rgba(255,255,255,0.60)",
                    marginBottom: 32,
                  }}
                >
                  Free 1 TB evaluation. Bring your existing S3 audit tooling and see the integrity layer in action.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Start for free</span>
                  </a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">
                    Talk to an expert
                  </a>
                </div>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.60)",
                    marginTop: 16,
                  }}
                >
                  No credit card required · No egress fees · Connects in minutes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default ComplianceLandingPage;
