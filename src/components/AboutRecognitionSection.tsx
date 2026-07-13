/**
 * Recognition section for the About page — PARKED / not currently rendered.
 *
 * Temporarily removed from src/pages/About.tsx (was between the Principles and
 * Leadership sections). To restore: import this component and drop
 * `<AboutRecognitionSection />` back in that spot.
 */
import { useInView } from "@/hooks/useInView";
import { SectionHeading } from "@/components/LandingPrimitives";
import internetArchiveLogo from "@/assets/inst-internet-archive.png";
import stanfordLogo from "@/assets/inst-stanford.webp";
import flickrLogo from "@/assets/inst-flickr.jpg";
import setiLogo from "@/assets/inst-seti.png";

const INSTITUTIONS = [
  {
    name: "Internet Archive",
    description: "Storing the 2024 End of Term Web Archive of U.S. government websites.",
    logo: internetArchiveLogo,
  },
  {
    name: "Starling Lab",
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
];

const ALSO_ON_NETWORK = [
  { name: "Smithsonian Institution", detail: "Preserving Alexander Graham Bell sound recordings (1881–1889) from the National Museum of American History." },
  { name: "Lockheed Martin", detail: "First-ever deployment of a decentralized file system (IPFS) in space, completed January 2024 on an LM LINUSS CubeSat." },
  { name: "MIT Open Learning", detail: "MIT OpenCourseWare content uploaded to the Filecoin network (Jan 2025)." },
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

const AboutRecognitionSection = () => {
  const { ref: instRef, inView: instInView } = useInView({ threshold: 0.05 });

  return (
    <section className="w-full" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-16 md:py-24 w-full max-w-[1120px] mx-auto">
        <div className="flex flex-col gap-3 items-center text-center max-w-[520px]">
          <span style={labelStyle}>Recognition</span>
          <SectionHeading>Trusted by <span style={{ color: "#0090FF" }}>leading institutions</span></SectionHeading>
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
          </div>

          {/* Also on the network */}
          <div className="flex flex-col items-center gap-8 w-full pt-2">
            <div className="flex flex-col items-center gap-6 w-full">
              <p style={{ ...labelStyle, fontSize: 10.5 }}>Also on the network</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 w-full max-w-[860px]">
                {ALSO_ON_NETWORK.map(({ name, detail }, i) => (
                  <div
                    key={name}
                    className={`flex flex-col gap-1.5 text-center sm:text-left px-0 sm:px-7${i === 0 ? "" : " sm:border-l"}`}
                    style={{ borderColor: "rgba(0,0,0,0.08)" }}
                  >
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, color: "#3F3F46" }}>
                      {name}
                    </p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, lineHeight: 1.55, color: "#71717A" }}>
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutRecognitionSection;
