import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { SealCheck, Key, DoorOpen, UserCircleDashed, Buildings, ArrowUpRight } from "@phosphor-icons/react";
import { trackCtaClick } from "@/lib/analytics";
import { SectionHeading } from "@/components/LandingPrimitives";
import martaPhoto from "@/assets/team-marta-belcher.jpg";
import claraPhoto from "@/assets/team-clara-tsao.jpg";
import hannahPhoto from "@/assets/team-hannah-howard.jpg";
import jamesPhoto from "@/assets/team-james-kurz.jpg";
import internetArchiveLogo from "@/assets/inst-internet-archive.png";
import smithsonianLogo from "@/assets/inst-smithsonian.png";
import stanfordLogo from "@/assets/inst-stanford.webp";
import flickrLogo from "@/assets/inst-flickr.jpg";
import setiLogo from "@/assets/inst-seti.png";
import lockheedLogo from "@/assets/inst-lockheed.jpg";
import mitOpenLearningLogo from "@/assets/inst-mit-openlearning.svg";

const PRINCIPLES = [
  {
    icon: Key,
    title: "Your data belongs to you",
    description:
      "You hold the keys and set the rules. We're custodians of your data, never gatekeepers.",
  },
  {
    icon: SealCheck,
    title: "Trust should be proven, not promised",
    description:
      "Every object carries a fingerprint, verified independently: proof, not promises.",
  },
  {
    icon: DoorOpen,
    title: "Leaving should always be free",
    description:
      "No egress fees, no proprietary formats. The exit door always stays open.",
  },
];

const INSTITUTIONS = [
  {
    name: "Internet Archive",
    description: "Storing the 2024 End of Term Web Archive of U.S. government websites.",
    logo: internetArchiveLogo,
  },
  {
    name: "Smithsonian Institution",
    description: "Preserving Alexander Graham Bell sound recordings (1881–1889) from the National Museum of American History.",
    logo: smithsonianLogo,
  },
  {
    name: "Stanford (Starling Lab)",
    description: "Preserved 56,000 genocide-survivor testimonies (~4 PB); filed cryptographic evidence to the ICC.",
    logo: stanfordLogo,
  },
  {
    name: "Flickr Foundation",
    description: "Preserving the Flickr Commons collection, including photographs from NASA, the Library of Congress, and the U.S. National Archives.",
    logo: flickrLogo,
  },
  {
    name: "SETI Institute",
    description: "Safeguarding search-for-extraterrestrial-intelligence data, including the decoded “A Sign in Space” transmission.",
    logo: setiLogo,
  },
  {
    name: "Lockheed Martin",
    description: "First-ever deployment of a decentralized file system (IPFS) in space, completed January 2024 on an LM LINUSS CubeSat.",
    logo: lockheedLogo,
  },
  {
    name: "MIT Open Learning",
    description: "MIT OpenCourseWare content uploaded to the Filecoin network (Jan 2025).",
    logo: mitOpenLearningLogo,
  },
];

const LEADERSHIP = [
  {
    name: "Marta Belcher",
    title: "President & Chair, Fil One & Filecoin Foundation",
    bio: "Marta Belcher leads Filecoin Foundation as President & Chair, and oversees the Fil One product team. She has worked on Filecoin for more than 7 years. Her other current and previous roles include serving as an executive at Protocol Labs, President of the Board of the Blockchain Association; special counsel at the Electronic Frontier Foundation; and as a Board member of the Crypto Council for Innovation, Creative Commons, and Zcash Foundation.",
    photo: martaPhoto,
  },
  {
    name: "Clara Tsao",
    title: "Fil One Team Lead, Management Committee and Founding Officer at Filecoin Foundation",
    bio: "Clara Tsao is a founding officer of Filecoin Foundation and a leader of the Fil One product team. She has worked on Filecoin for more than 6 years. Previous roles include serving in a go-to-market role at Microsoft, as a fellow at Google and Mozilla, as an Entrepreneur in Residence in the White House, as co-founder of the Trust & Safety Professional Association, as a senior fellow at the Atlantic Council, and in technical roles at the U.S. Department of Homeland Security.",
    photo: claraPhoto,
  },
  {
    name: "Hannah Howard",
    title: "Head of Engineering, Fil One & Filecoin Foundation",
    bio: "Hannah Howard previously served as Co-Founder and CTO of Storacha, where she led technical strategy for decentralized hot storage on Filecoin and IPFS. An engineering leader in the Protocol Labs ecosystem for eight years, she is focused on building fast, verifiable storage systems for production-scale applications.",
    photo: hannahPhoto,
  },
  {
    name: "James Kurz",
    title: "Chief Strategy Officer, Fil One",
    bio: "James leads Fil One’s commercial strategy and investor narrative. Throughout his career, James has specialized in scaling innovative SaaS platforms and guiding companies through critical growth stages. Prior to joining Filecoin Foundation, James served as CFO for Sweet, where he led fundraising and strategic finance initiatives. Previously, he served as Chief Financial Officer and Chief Operating Officer at doctor.com which was acquired by PE-backed Press Ganey.",
    photo: jamesPhoto,
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

const bodyStyle = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1.65,
  color: "#52525B",
  margin: 0,
};

const cardStyle = {
  borderColor: "rgba(0,0,0,0.07)",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 1px 2px rgba(0,0,0,0.03)",
};

const About = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: whoRef, inView: whoInView } = useInView({ threshold: 0.1 });
  const { ref: pillarsRef, inView: pillarsInView } = useInView({ threshold: 0.05 });
  const { ref: instRef, inView: instInView } = useInView({ threshold: 0.05 });
  const { ref: teamRef, inView: teamInView } = useInView({ threshold: 0.05 });

  useSeo({
    title: "About — Fil One",
    description:
      "Fil One exists to put you back in control of your data. Learn who we are, why we built verifiable S3-compatible storage, and the principles behind it.",
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
            className={`flex flex-col items-center gap-6 pt-20 md:pt-[120px] pb-16 md:pb-20 px-5 md:px-8 max-w-[1120px] mx-auto w-full reveal${heroInView ? " in-view" : ""}`}
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
              className="text-[32px] sm:text-[40px] md:text-[52px]"
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
              We believe your data <span style={{ color: "#0090FF" }}>belongs to you</span>
            </h1>

            <p
              className="text-[15px] md:text-[16.5px]"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 560,
                margin: 0,
              }}
            >
              Fil One was built by the team behind Filecoin, the world's largest decentralized storage network, to fix cloud storage's broken bargain: trust a vendor's word on durability, pay to access your own files, and stay because leaving costs too much.
            </p>
          </div>
        </div>

        {/* Publications */}
        <section className="flex flex-col items-center gap-12 px-5 py-16 md:py-20 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 24, color: "#71717A", letterSpacing: "-0.015em", textAlign: "center", lineHeight: 1.45, maxWidth: 620 }}>
            Our technology was named one of<br />
            <span style={{ color: "#0090FF" }}>Fast Company's 11 Next Big Things in AI &amp; Data Innovation</span>
          </p>
          <div className="flex flex-col items-center gap-4 w-full">
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, color: "rgb(113,113,122)" }}>
              And it has also been featured in
            </p>
            <div className="marquee-mask w-full max-w-2xl overflow-hidden">
              <div className="marquee-track flex items-center w-max">
                {[0, 1].map((copy) => (
                  <span key={copy} className="flex items-center gap-8 pr-8" aria-hidden={copy === 1}>
                    {["CNBC", "Bloomberg", "Yahoo Finance", "VentureBeat"].map((pub) => (
                      <span key={pub} className="flex items-center gap-8">
                        <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 16, color: "rgb(82,82,91)" }}>{pub}</span>
                        <span style={{ color: "#D4D4D8", fontSize: 20 }}>·</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who we are */}
        <section className="w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={whoRef}
            className={`grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16 px-5 md:px-8 py-16 md:py-24 w-full max-w-[1120px] mx-auto reveal${whoInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <span style={labelStyle}>Our story</span>
              <SectionHeading>Why we built<br />Fil One</SectionHeading>
            </div>
            <div className="flex flex-col gap-4">
              <p style={bodyStyle}>
                If you store serious data in the cloud, you know the bargain: your provider promises eleven nines of durability and asks you to trust it, egress fees punish you for using your own data, and staying longer only makes leaving more expensive.
              </p>
              <p style={bodyStyle}>
                We built Fil One because that bargain is backwards. Every file gets a cryptographic fingerprint, verified independently, so durability is something you can check, not a claim you have to trust. Pricing is one flat rate with zero egress fees, and because everything is S3-compatible, moving to or from Fil One is an endpoint change, not a migration project.
              </p>
              <p style={bodyStyle}>
                Behind the product is the team behind Filecoin, the world’s largest decentralized storage network, live since 2020 with thousands of independent operators and exabytes of proven capacity. It’s the same infrastructure trusted by the Internet Archive and the Smithsonian, so your data never depends on any single company staying honest. Not even us.
              </p>
            </div>
          </div>
        </section>

        {/* What we believe — pillars */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-16 md:py-24 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <span style={labelStyle}>What we believe</span>
              <SectionHeading>The principles behind <span style={{ color: "#0090FF" }}>everything we build</span></SectionHeading>
            </div>

            <div
              ref={pillarsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full reveal-group"
            >
              {PRINCIPLES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-5 p-8 rounded-2xl border transition-colors hover:border-black/[0.12] reveal${pillarsInView ? " in-view" : ""}`}
                  style={cardStyle}
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}>
                    <Icon size={26} color="#0090FF" weight="regular" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 18, lineHeight: "1.3", color: "#09090B" }}>{title}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.6", color: "#71717A" }}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-16 md:py-24 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[520px]">
              <span style={labelStyle}>Recognition</span>
              <SectionHeading>Trusted by leading institutions</SectionHeading>
              <p style={bodyStyle}>
                The Filecoin network that Fil One runs on stores data for some of the world’s most respected institutions.
              </p>
            </div>

            {/* Trusted by institutions */}
            <div className="flex flex-col gap-6 w-full">
              <div
                ref={instRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full reveal-group"
              >
                {INSTITUTIONS.map(({ name, description, logo }) => (
                  <div
                    key={name}
                    className={`flex flex-col gap-4 p-6 rounded-2xl border transition-colors hover:border-black/[0.12] reveal${instInView ? " in-view" : ""}`}
                    style={cardStyle}
                  >
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 p-2.5"
                      style={{ border: "1px solid rgba(0,0,0,0.07)", backgroundColor: "#FAFAFA" }}
                    >
                      <img src={logo} alt={`${name} logo`} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>{name}</p>
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A" }}>{description}</p>
                    </div>
                  </div>
                ))}

                <a
                  href="/contact-sales"
                  onClick={() => trackCtaClick("Become the next institution", "/contact-sales", "secondary")}
                  className={`flex flex-col gap-4 p-6 rounded-2xl border transition-colors group reveal${instInView ? " in-view" : ""}`}
                  style={{ borderColor: "rgba(0,144,255,0.25)", backgroundColor: "#EFF8FF", textDecoration: "none" }}
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 p-2.5" style={{ backgroundColor: "#FFFFFF" }}>
                    <Buildings size={26} color="#0090FF" weight="regular" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="flex items-center gap-1" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#0070CC" }}>
                      Become the next institution
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#3B82C4" }}>
                      Talk to our team about storing your data on Fil One.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-16 md:py-24 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[520px]">
              <span style={labelStyle}>Leadership</span>
              <SectionHeading>The team</SectionHeading>
              <p style={bodyStyle}>
                Fil One is led by a distributed team of infrastructure veterans, technologists, and policy experts.
              </p>
            </div>

            <div
              ref={teamRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[1120px] reveal-group"
            >
              {LEADERSHIP.map(({ name, title, bio, photo }) => (
                <div
                  key={name}
                  className={`flex flex-col gap-4 p-7 rounded-2xl border transition-colors hover:border-black/[0.12] reveal${teamInView ? " in-view" : ""}`}
                  style={cardStyle}
                >
                  <div className="flex items-center gap-3.5">
                    {photo ? (
                      <img
                        src={photo}
                        alt={name}
                        className="w-12 h-12 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                        style={{ border: "1px dashed rgba(0,0,0,0.14)", backgroundColor: "#FAFAFA" }}
                      >
                        <UserCircleDashed size={22} color="#A1A1AA" weight="regular" />
                      </div>
                    )}
                    <div className="flex flex-col gap-0.5">
                      <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 17, letterSpacing: "-0.01em", color: "#09090B", margin: 0 }}>{name}</p>
                      <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 12.5, lineHeight: 1.4, color: "#0070CC", margin: 0 }}>{title}</p>
                    </div>
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
                <h2
                  className="text-[26px] md:text-[32px]"
                  style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", maxWidth: 480, margin: "0 auto 12px" }}
                >
                  Let’s talk about your storage
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", maxWidth: 460, margin: "0 auto 32px" }}>
                  Our team can help with enterprise pricing, migrations, and security reviews. Reach out anytime.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="/contact-sales"
                    className="btn-primary btn-primary-dark"
                    onClick={() => trackCtaClick("Contact sales", "/contact-sales", "primary")}
                  >
                    <span className="btn-primary-inner">Contact sales</span>
                  </a>
                  <a
                    href="/support"
                    className="btn-secondary btn-secondary-dark"
                    onClick={() => trackCtaClick("Support", "/support", "secondary")}
                  >
                    Support
                  </a>
                </div>
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
