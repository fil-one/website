import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useInView } from "@/hooks/useInView";
import { SealCheck, Key, DoorOpen, UserCircleDashed } from "@phosphor-icons/react";
import { trackCtaClick } from "@/lib/analytics";
import { SectionHeading, SectionLabel } from "@/components/LandingPrimitives";
import Pill from "@/components/Pill";
import Hero from "@/components/Hero";
import CtaBanner from "@/components/CtaBanner";
import martaPhoto from "@/assets/team-marta-belcher.jpg";
import claraPhoto from "@/assets/team-clara-tsao.jpg";
import hannahPhoto from "@/assets/team-hannah-howard.jpg";
import jamesPhoto from "@/assets/team-james-kurz.jpg";
import rwPhoto from "@/assets/team-rw-holleman.jpg";
import chrisPhoto from "@/assets/team-chris-rocco.jpg";

const PRINCIPLES = [
  {
    icon: Key,
    title: "Your data belongs to you",
    description:
      "You hold the keys and set the rules. We're custodians of your data, never gatekeepers.",
  },
  {
    icon: SealCheck,
    title: "Trust is proven, not promised",
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
  {
    name: "R.W. Holleman",
    title: "Head of Revenue, Fil One",
    bio: "R.W. leads Fil One’s revenue and go-to-market strategy. Throughout his career, R.W. has specialized in scaling enterprise sales organizations and building the channel partnerships that turn emerging technology into durable, repeatable revenue. Prior to joining Filecoin Foundation, R.W. served as Chief Commercial Officer at Storj, where he led enterprise storage sales and built relationships across the industry’s major distributors and master agents. Previously, he served as Chief Revenue Officer at Inveniam, where he helped scale go-to-market strategy across the company’s data infrastructure business.",
    photo: rwPhoto,
  },
  {
    name: "Chris Rocco",
    title: "Head of Product, Fil One",
    bio: "Chris Rocco leads product and marketing for Fil One, focused on making decentralized storage simple, usable, and valuable for enterprise customers and developers. He brings more than 20 years of experience building and scaling SaaS, cloud, security, and data infrastructure products. Prior to joining Filecoin Foundation, Chris held leadership roles across product, marketing, and go-to-market, including developer experience at CARIAD (Volkswagen Group) and, most recently, distributed cloud storage at Storj.",
    photo: chrisPhoto,
  },
];

// Shared type/layout recipes, expressed with design tokens.
const BODY = "font-sans font-normal text-[16px] leading-[1.65] text-zinc-600 m-0";
const CARD =
  "rounded-2xl border border-black/[0.07] bg-white shadow-elevated-sm transition-colors hover:border-black/[0.12]";

const About = () => {
  const { ref: whoRef, inView: whoInView } = useInView({ threshold: 0.1 });
  const { ref: pillarsRef, inView: pillarsInView } = useInView({ threshold: 0.05 });
  const { ref: teamRef, inView: teamInView } = useInView({ threshold: 0.05 });

  useSeo({
    title: "About · Fil One",
    description:
      "Fil One exists to put you back in control of your data. Learn who we are, why we built S3-compatible storage with no egress fees, and the principles behind it.",
    canonical: "https://www.fil.one/about",
    ogImage: "https://www.fil.one/og-image.png",
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero / Mission */}
        <Hero
          glow
          grid
          badge={<Pill>About Fil One</Pill>}
          title={<>We believe your data <span className="text-brand-500">belongs to you</span></>}
          description="Fil One was built by the team behind Filecoin, the world's largest decentralized storage network. We make cloud storage you can verify, access without egress fees, and leave anytime, because your data should belong to you."
          titleMaxWidth={620}
          descriptionMaxWidth={600}
          contentClassName="pb-16 md:pb-20"
        />

        {/* Publications */}
        <section className="flex flex-col items-center gap-12 px-5 py-16 md:py-20 w-full bg-white">
          <p className="font-display font-medium text-[17px] md:text-[24px] text-zinc-500 tracking-[-0.015em] text-center leading-[1.45] max-w-[620px]">
            Our technology was named one of<br />
            <span className="text-brand-500">Fast Company's 11 Next Big Things in AI &amp; Data Innovation</span>
          </p>
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="font-sans font-normal text-[12.5px] text-zinc-500">
              And it has also been featured in
            </p>
            <div className="marquee-mask w-full max-w-2xl overflow-hidden">
              <div className="marquee-track flex items-center w-max">
                {[0, 1].map((copy) => (
                  <span key={copy} className="flex items-center gap-8 pr-8" aria-hidden={copy === 1}>
                    {["CNBC", "Bloomberg", "Yahoo Finance", "VentureBeat"].map((pub) => (
                      <span key={pub} className="flex items-center gap-8">
                        <span className="font-sans font-medium text-[16px] text-zinc-600">{pub}</span>
                        <span className="text-zinc-300 text-[20px]">·</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who we are */}
        <section className="w-full bg-zinc-50">
          <div
            ref={whoRef}
            className={`grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-16 px-5 md:px-8 py-16 md:py-24 w-full max-w-container mx-auto reveal${whoInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left">
              <SectionLabel>Our story</SectionLabel>
              <SectionHeading>Why we built<br className="hidden md:block" /> <span className="text-brand-500">Fil One</span></SectionHeading>
            </div>
            <div className="flex flex-col gap-4">
              <p className={BODY}>
                If you store serious data in the cloud, you know the bargain: the rate card is only half the story, egress fees charge you for reading your own data, and the longer you stay the more it costs to leave.
              </p>
              <p className={BODY}>
                We built Fil One because that bargain is backwards. One flat rate per TB, no egress fees and no request charges, so reading your data back costs exactly what leaving it alone costs: nothing. And because everything speaks the S3 API, moving in or out is an endpoint change rather than a migration project. The cheapest way to keep a customer should be to be worth staying with.
              </p>
              <p className={BODY}>
                Behind the product is the team behind Filecoin, the world’s largest decentralized storage network, live since 2020 with thousands of independent operators and exabytes of committed capacity. It’s the same infrastructure trusted by the Internet Archive and the Smithsonian, so your data never depends on any single company staying honest. Not even us.
              </p>
            </div>
          </div>
        </section>

        {/* What we believe — pillars */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-16 md:py-24 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[480px]">
              <SectionLabel>What we believe</SectionLabel>
              <SectionHeading>The principles behind <span className="text-brand-500">everything we build</span></SectionHeading>
            </div>

            <div
              ref={pillarsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full reveal-group"
            >
              {PRINCIPLES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-5 p-8 ${CARD} reveal${pillarsInView ? " in-view" : ""}`}
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 bg-brand-50">
                    <Icon size={26} className="text-brand-500" weight="regular" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-sans font-medium text-[18px] leading-[1.3] text-zinc-950">{title}</p>
                    <p className="font-sans font-normal text-[14px] leading-[1.6] text-zinc-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition — temporarily removed; parked in src/components/AboutRecognitionSection.tsx.
            To restore, import it and render <AboutRecognitionSection /> here. */}

        {/* Leadership */}
        <section className="w-full bg-white">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-16 md:py-24 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center max-w-[520px]">
              <SectionLabel>Leadership</SectionLabel>
              <SectionHeading>The team</SectionHeading>
              <p className={BODY}>
                Fil One is led by a distributed team of infrastructure veterans, technologists, and policy experts.
              </p>
            </div>

            <div
              ref={teamRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-container reveal-group"
            >
              {LEADERSHIP.map(({ name, title, bio, photo }) => (
                <div
                  key={name}
                  className={`flex flex-col gap-4 p-7 ${CARD} reveal${teamInView ? " in-view" : ""}`}
                >
                  <div className="flex items-center gap-3.5">
                    {photo ? (
                      <img
                        src={photo}
                        alt={name}
                        className="w-12 h-12 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 rounded-full shrink-0 border border-dashed border-black/[0.14] bg-zinc-50">
                        <UserCircleDashed size={22} className="text-zinc-400" weight="regular" />
                      </div>
                    )}
                    <div className="flex flex-col gap-0.5">
                      <p className="font-display font-medium text-[17px] tracking-[-0.01em] text-zinc-950 m-0">{name}</p>
                      <p className="font-sans font-medium text-[12.5px] leading-[1.4] text-brand-600 m-0">{title}</p>
                    </div>
                  </div>
                  <p className="font-sans font-normal text-[14px] leading-[1.65] text-zinc-500 m-0">{bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <CtaBanner
          heading="Let’s talk about your storage"
          subhead="Our team can help with enterprise pricing, migrations, and security reviews. Reach out anytime."
          cta={{
            label: "Contact sales",
            href: "/contact-sales",
            onClick: () => trackCtaClick("Contact sales", "/contact-sales", "primary"),
          }}
          secondaryCta={{
            label: "Support",
            href: "/support",
            onClick: () => trackCtaClick("Support", "/support", "secondary"),
          }}
        />

      </main>
      <Footer />
    </div>
  );
};

export default About;
