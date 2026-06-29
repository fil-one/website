import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { SealCheck, ArrowsLeftRight, ShieldCheck } from "@phosphor-icons/react";
import { trackCtaClick } from "@/lib/analytics";

const PILLARS = [
  {
    icon: SealCheck,
    title: "Verifiable",
    description:
      "Your data has a unique cryptographic fingerprint from the moment it lands. The network checks it automatically, roughly every 24 hours. Not a promise — a proof.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Portable",
    description:
      "S3-compatible by design, no egress fees by policy. Your data moves when you need it to. No migration invoices, no lock-in clauses, no surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Resilient",
    description:
      "Storage distributed across thousands of independent operators in multiple regions. No single point of failure. Your data survives outages, consolidations, and time itself.",
  },
];

const PRESS = [
  "Fast Company",
  "CNBC",
  "Bloomberg",
  "Yahoo Finance",
  "VentureBeat",
  "Axios",
  "The Wall Street Journal",
  "Politico",
];

const INSTITUTIONS = [
  {
    name: "Internet Archive",
    description:
      "Storing the 2024 End of Term Web Archive of U.S. government websites.",
  },
  {
    name: "Smithsonian Institution",
    description:
      "Preserving Alexander Graham Bell sound recordings (1881–1889) from the National Museum of American History.",
  },
  {
    name: "Stanford (Starling Lab)",
    description:
      "Preserved 56,000 genocide-survivor testimonies (~4 PB); filed cryptographic evidence to the ICC.",
  },
  {
    name: "Flickr Foundation",
    description:
      "Preserving the Flickr Commons collection, including photographs from NASA, the Library of Congress, and the U.S. National Archives.",
  },
  {
    name: "SETI Institute",
    description:
      "Safeguarding search-for-extraterrestrial-intelligence data, including the decoded “A Sign in Space” transmission.",
  },
  {
    name: "Lockheed Martin",
    description:
      "First-ever deployment of a decentralized file system (IPFS) in space, completed January 2024 on an LM LINUSS CubeSat.",
  },
  {
    name: "MIT Open Learning",
    description:
      "MIT OpenCourseWare content uploaded to the Filecoin network (January 2025).",
  },
];

const LEADERSHIP = [
  {
    name: "Marta Belcher",
    title: "President & Chair, Fil One & Filecoin Foundation",
    bio: "Marta Belcher leads Filecoin Foundation as President & Chair, and oversees the Fil One product team. She has worked on Filecoin for more than 7 years. Her other current and previous roles include serving as an executive at Protocol Labs, President of the Board of the Blockchain Association, special counsel at the Electronic Frontier Foundation, and as a Board member of the Crypto Council for Innovation, Creative Commons, and Zcash Foundation.",
  },
  {
    name: "Clara Tsao",
    title: "Fil One Team Lead; Management Committee and Founding Officer, Filecoin Foundation",
    bio: "Clara Tsao is a founding officer of Filecoin Foundation and a leader of the Fil One product team. She has worked on Filecoin for more than 6 years. Previous roles include serving in a go-to-market role at Microsoft, as a fellow at Google and Mozilla, as an Entrepreneur in Residence in the White House, as co-founder of the Trust & Safety Professional Association, as a senior fellow at the Atlantic Council, and in technical roles at the U.S. Department of Homeland Security.",
  },
  {
    name: "Hannah Howard",
    title: "Head of Engineering, Fil One & Filecoin Foundation",
    bio: "Hannah Howard previously served as Co-Founder and CTO of Storacha, where she led technical strategy for decentralized hot storage on Filecoin and IPFS. An engineering leader in the Protocol Labs ecosystem for eight years, she is focused on building fast, verifiable storage systems for production-scale applications.",
  },
  {
    name: "James Kurz",
    title: "Chief Strategy Officer, Fil One",
    bio: "James leads Fil One’s commercial strategy and investor narrative. Throughout his career, James has specialized in scaling innovative SaaS platforms and guiding companies through critical growth stages. Prior to joining Filecoin Foundation, James served as CFO for Sweet, where he led fundraising and strategic finance initiatives. Previously, he served as Chief Financial Officer and Chief Operating Officer at doctor.com, which was acquired by PE-backed Press Ganey.",
  },
];

const labelStyle = {
  fontFamily: "'DM Mono', monospace" as const,
  fontWeight: 500,
  fontSize: 11.5,
  letterSpacing: "0.08em",
  color: "#52525B",
  textTransform: "uppercase" as const,
};

const headingStyle = {
  fontFamily: "'Aspekta', sans-serif" as const,
  fontWeight: 500,
  fontSize: "clamp(22px, 4vw, 30px)",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: "#09090B",
  margin: 0,
};

const bodyStyle = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1.65,
  color: "#52525B",
  margin: 0,
};

const About = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: whoRef, inView: whoInView } = useInView({ threshold: 0.1 });
  const { ref: pillarsRef, inView: pillarsInView } = useInView({ threshold: 0.05 });
  const { ref: backingRef, inView: backingInView } = useInView({ threshold: 0.1 });
  const { ref: pressRef, inView: pressInView } = useInView({ threshold: 0.05 });
  const { ref: instRef, inView: instInView } = useInView({ threshold: 0.05 });
  const { ref: teamRef, inView: teamInView } = useInView({ threshold: 0.05 });

  useSeo({
    title: "About — Fil One",
    description:
      "Fil One builds verifiable, portable, and resilient S3-compatible object storage for the world's most data-intensive workloads. Built on the Filecoin network.",
    canonical: "https://fil.one/about",
    ogImage: "https://fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero / Mission */}
        <div className="relative isolate pt-[58px] md:pt-[94px]" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.09" stroke-width="1"/></svg>')}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />
          <div
            ref={heroRef}
            className={`flex flex-col items-center gap-6 pt-20 md:pt-[120px] pb-24 md:pb-32 px-5 md:px-8 max-w-[1120px] mx-auto w-full reveal${heroInView ? " in-view" : ""}`}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.07em",
                color: "#0070CC",
                textTransform: "uppercase",
                backgroundColor: "#EFF8FF",
                border: "1px solid rgba(0,144,255,0.2)",
                borderRadius: 9999,
                padding: "3px 10px",
              }}
            >
              About Fil One
            </span>

            <h1
              className="text-[28px] sm:text-[34px] md:text-[44px]"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.12",
                letterSpacing: "-0.02em",
                color: "#09090B",
                textAlign: "center",
                maxWidth: 620,
                margin: 0,
              }}
            >
              Built for teams where every byte matters
            </h1>

            <p
              className="text-[15px] md:text-[16.5px]"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 600,
                margin: 0,
              }}
            >
              Fil One builds S3-compatible object storage for the teams running the world’s most data-intensive workloads — AI training pipelines, large-scale archives, production inference systems, and everything in between. We believe storage should be verifiable by default, portable without penalty, and resilient without heroics.
            </p>
          </div>
        </div>

        {/* Who we are */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={whoRef}
            className={`flex flex-col gap-4 px-5 md:px-8 pb-16 md:pb-24 w-full max-w-[720px] mx-auto reveal${whoInView ? " in-view" : ""}`}
          >
            <span style={labelStyle}>Who we are</span>
            <h2 style={headingStyle}>Storage infrastructure, built differently</h2>
            <p style={bodyStyle}>
              Fil One is a US-incorporated enterprise cloud storage company built by experts in distributed systems and storage infrastructure.
            </p>
            <p style={bodyStyle}>
              The storage Fil One delivers runs on the Filecoin network — an open storage marketplace with more than 5.8 exabytes of capacity across thousands of independent operators worldwide. That architecture is what makes Fil One’s durability guarantees independently verifiable, not just claimed.
            </p>
          </div>
        </section>

        {/* What we believe — pillars */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-16 md:py-24 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <span style={labelStyle}>What we believe</span>
              <h2 style={headingStyle}>Three principles run through everything we build</h2>
            </div>

            <div
              ref={pillarsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full reveal-group"
            >
              {PILLARS.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-5 p-7 rounded-2xl border reveal${pillarsInView ? " in-view" : ""}`}
                  style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}>
                    <Icon size={18} color="#0090FF" weight="regular" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: "1.3", color: "#09090B" }}>{title}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.6", color: "#71717A" }}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Backing */}
        <section className="w-full px-5 md:px-8 py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={backingRef}
            className={`w-full max-w-[820px] mx-auto reveal${backingInView ? " in-view" : ""}`}
            style={{ backgroundColor: "#FAFAFA", borderRadius: 24, border: "1px solid rgba(0,0,0,0.07)" }}
          >
            <div className="flex flex-col gap-4 px-8 md:px-14 py-14 md:py-16 w-full">
              <span style={labelStyle}>Backing</span>
              <h2 style={headingStyle}>Built on serious infrastructure</h2>
              <p style={bodyStyle}>
                Fil One is a technology company incorporated in Delaware in 2026, built by a distributed team with deep expertise in storage infrastructure and distributed systems.
              </p>
              <p style={bodyStyle}>
                Most enterprise storage asks you to trust a single vendor’s word on durability. Fil One is built differently. The storage Fil One delivers runs on the Filecoin network: a global marketplace of thousands of independent operators, with 5.8 exabytes of capacity proven in production since 2020. Because no single operator controls your data, durability can be verified cryptographically, not just reported quarterly. Because the network is open, there are no proprietary lock-in mechanisms — and no egress fees that follow from them.
              </p>
              <p style={bodyStyle}>
                Fil One is a company built with support from key teams behind Filecoin. Founded in 2020, Filecoin is the world’s largest decentralized storage network, built to keep data secure, verifiable, and free from centralized control. Fil One runs on the same network that stores data for institutions including the Smithsonian, the Internet Archive, the Flickr Foundation, and the SETI Institute.
              </p>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-16 md:py-24 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[520px]">
              <span style={labelStyle}>Recognition</span>
              <h2 style={headingStyle}>Recognized for what’s real</h2>
            </div>

            {/* Featured in */}
            <div
              ref={pressRef}
              className={`flex flex-col gap-6 items-center w-full reveal${pressInView ? " in-view" : ""}`}
            >
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13, color: "#71717A" }}>
                Featured in
              </p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-[760px]">
                {PRESS.map((name) => (
                  <span
                    key={name}
                    style={{
                      fontFamily: "'Aspekta', sans-serif",
                      fontWeight: 500,
                      fontSize: 17,
                      letterSpacing: "-0.01em",
                      color: "#3F3F46",
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
              <p
                className="text-center"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14.5, lineHeight: 1.6, color: "#71717A", maxWidth: 520 }}
              >
                Named one of Fast Company’s 11 Next Big Things in AI &amp; Data Innovation (2024).
              </p>
            </div>

            {/* Trusted by institutions */}
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-2 items-center text-center max-w-[560px] mx-auto">
                <h3 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 20, letterSpacing: "-0.01em", color: "#09090B", margin: 0 }}>
                  Trusted by leading institutions
                </h3>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14.5, lineHeight: 1.6, color: "#71717A" }}>
                  The Filecoin network that Fil One runs on stores data for some of the world’s most respected institutions.
                </p>
              </div>

              <div
                ref={instRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full reveal-group"
              >
                {INSTITUTIONS.map(({ name, description }) => (
                  <div
                    key={name}
                    className={`flex flex-col gap-2 p-6 rounded-2xl border reveal${instInView ? " in-view" : ""}`}
                    style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}
                  >
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>{name}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A" }}>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-16 md:py-24 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[520px]">
              <span style={labelStyle}>Leadership</span>
              <h2 style={headingStyle}>The team</h2>
              <p style={bodyStyle}>
                Fil One is led by a distributed team of infrastructure veterans, technologists, and policy experts.
              </p>
            </div>

            <div
              ref={teamRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[900px] reveal-group"
            >
              {LEADERSHIP.map(({ name, title, bio }) => (
                <div
                  key={name}
                  className={`flex flex-col gap-3 p-7 rounded-2xl border reveal${teamInView ? " in-view" : ""}`}
                  style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 18, letterSpacing: "-0.01em", color: "#09090B", margin: 0 }}>{name}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13, lineHeight: 1.4, color: "#0070CC", margin: 0 }}>{title}</p>
                  </div>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.65", color: "#71717A", margin: 0 }}>{bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="w-full max-w-[1120px] mx-auto">
            <div
              className="px-6 md:px-12 py-16 md:py-[104px]"
              style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)",
                borderRadius: 20,
                textAlign: "center",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`,
                  backgroundSize: "60px 60px",
                  maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 500,
                    fontSize: 11.5,
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                  }}
                >
                  Contact
                </span>
                <h2
                  className="text-[26px] md:text-[32px]"
                  style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", maxWidth: 440, margin: "16px auto 12px" }}
                >
                  Get in touch
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", maxWidth: 460, margin: "0 auto 32px" }}>
                  Fil One is a remote-first company, incorporated in Delaware, with team members across North America and Europe.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="mailto:sales@fil.one"
                    className="btn-primary btn-primary-dark"
                    onClick={() => trackCtaClick("Enterprise inquiries", "mailto:sales@fil.one", "primary")}
                  >
                    <span className="btn-primary-inner">Enterprise inquiries</span>
                  </a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.50)", marginTop: 16 }}>
                  Enterprise: sales@fil.one · Security: security@fil.one
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
