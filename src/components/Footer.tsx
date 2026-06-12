import filOneLogo from "../assets/fil-one-logo.svg";
import { trackDocsClick } from "@/lib/analytics";

const Footer = () => {
  const links: Record<string, { label: string; href: string }[]> = {
    Products: [
      { label: "Object Storage", href: "/storage" },
      { label: "RAG Pipeline", href: "/rag-pipeline" },
      { label: "AI Agent Toolkit", href: "/ai-agent-toolkit" },
    ],
    Solutions: [
      { label: "AI Training & Inference", href: "/solutions/ai-training" },
      { label: "Web3 & dApps", href: "/solutions/web3-dapps" },
      { label: "Media & Archive", href: "/solutions/media-archive" },
      { label: "Enterprise Backup & DR", href: "/solutions/enterprise-backup" },
    ],
    Company: [
      { label: "Pricing", href: "/pricing" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Partners", href: "/partners" },
      { label: "Contact Sales", href: "/contact-sales" },
    ],
    Resources: [
      { label: "Documentation", href: "https://docs.fil.one" },
      { label: "Support", href: "/support" },
      { label: "Status", href: "https://status.fil.one" },
      { label: "Filecoin", href: "https://filecoin.io" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Acceptable Use", href: "/aup" },
    ],
  };

  return (
    <footer
      className="flex flex-col px-5 md:px-8 pt-14 pb-10 w-full border-t"
      style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF" }}
    >
      <div className="flex flex-col gap-12 w-full max-w-[1120px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
          {/* Left: logo + tagline */}
          <div className="flex flex-col gap-3 items-start max-w-[220px]">
            <a href="/" style={{ textDecoration: "none" }}>
              <img src={filOneLogo} alt="Fil One" style={{ height: 18, width: "auto", display: "block" }} />
            </a>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                lineHeight: "1.6",
                color: "#71717A",
              }}
            >
              S3 object storage built for the AI era.
            </p>
          </div>

          {/* Right: link groups */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:flex md:flex-row md:gap-16 items-start">
            {Object.entries(links).map(([title, items]) => (
              <div key={title} className="flex flex-col gap-3 items-start">
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 12.5,
                    letterSpacing: "0.02em",
                    color: "#09090B",
                  }}
                >
                  {title}
                </p>
                {items.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={href.includes("docs.fil.one") ? () => trackDocsClick(href) : undefined}
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: "1.4",
                      textDecoration: "none",
                    }}
                    className="text-[#52525B] hover:text-[#09090B] transition-colors duration-150"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: divider + copyright */}
        <div className="flex flex-col gap-4 border-t pt-6" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <p
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              color: "#71717A",
            }}
          >
            © 2026 Fil One. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
