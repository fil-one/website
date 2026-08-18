import filOneLogo from "../assets/fil-one-logo.svg";
import { trackDocsClick } from "@/lib/analytics";

interface FooterProps {
  lang?: "en" | "es";
  /** Override the Support link — defaults to the general /support page. */
  supportHref?: string;
  /** Override the Contact Sales link — defaults to the general /contact-sales page. */
  contactSalesHref?: string;
}

const Footer = ({ lang = "en", supportHref = "/support", contactSalesHref = "/contact-sales" }: FooterProps) => {
  const linksEn: Record<string, { label: string; href: string }[]> = {
    Products: [
      { label: "Object Storage", href: "/storage" },
      { label: "Bucket Intelligence", href: "/bucket-intelligence" },
      { label: "AI Agent Toolkit", href: "/ai-agent-toolkit" },
    ],
    Solutions: [
      { label: "AI Training & Inference", href: "/solutions/ai-training" },
      { label: "Web3 & dApps", href: "/solutions/web3-dapps" },
      { label: "Media & Archive", href: "/solutions/media-archive" },
      { label: "Enterprise Backup & DR", href: "/solutions/enterprise-backup" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Partners", href: "/partners" },
      { label: "Contact Sales", href: contactSalesHref },
    ],
    Resources: [
      { label: "Documentation", href: "https://docs.fil.one" },
      { label: "Blog", href: "/blog" },
      { label: "Support", href: supportHref },
      { label: "Status", href: "https://status.fil.one" },
      { label: "Filecoin", href: "https://filecoin.io" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Acceptable Use", href: "/aup" },
      { label: "SLA", href: "/sla" },
    ],
  };

  const linksEs: Record<string, { label: string; href: string }[]> = {
    Productos: [
      { label: "Almacenamiento de objetos", href: "/storage" },
      { label: "Bucket Intelligence", href: "/bucket-intelligence" },
      { label: "AI Agent Toolkit", href: "/ai-agent-toolkit" },
    ],
    Soluciones: [
      { label: "Entrenamiento e inferencia de IA", href: "/solutions/ai-training" },
      { label: "Web3 y dApps", href: "/solutions/web3-dapps" },
      { label: "Medios y archivo", href: "/solutions/media-archive" },
      { label: "Backup empresarial y DR", href: "/solutions/enterprise-backup" },
    ],
    Empresa: [
      { label: "Nosotros", href: "/about" },
      { label: "Precios", href: "/pricing" },
      { label: "Empresas", href: "/enterprise" },
      { label: "Partners", href: "/partners" },
      { label: "Contactar con ventas", href: contactSalesHref },
    ],
    Recursos: [
      { label: "Documentación", href: "https://docs.fil.one" },
      { label: "Blog", href: "/blog" },
      { label: "Soporte", href: supportHref },
      { label: "Estado", href: "https://status.fil.one" },
      { label: "Filecoin", href: "https://filecoin.io" },
    ],
    Legal: [
      { label: "Política de privacidad", href: "/privacy" },
      { label: "Términos de uso", href: "/terms" },
      { label: "Uso aceptable", href: "/aup" },
      { label: "SLA", href: "/sla" },
    ],
  };

  const links = lang === "es" ? linksEs : linksEn;
  const tagline = lang === "es"
    ? "Almacenamiento de objetos S3 diseñado para la era de la IA."
    : "S3 object storage built for the AI era.";
  const copyright = lang === "es"
    ? "© 2026 Fil One. Todos los derechos reservados."
    : "© 2026 Fil One. All rights reserved.";

  return (
    <footer className="flex w-full flex-col border-t border-black/[0.07] bg-white px-6 pb-10 pt-14 md:px-12">
      <div className="mx-auto flex w-full max-w-container-wide flex-col gap-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
          {/* Left: logo + tagline */}
          <div className="flex flex-col gap-3 items-start max-w-[220px]">
            <a href="/" className="no-underline">
              <img src={filOneLogo} alt="Fil One" className="block h-[18px] w-auto" />
            </a>
            <p className="font-sans text-[13px] font-normal leading-[1.6] text-zinc-500">{tagline}</p>
          </div>

          {/* Right: link groups */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:flex md:flex-row md:gap-16 items-start">
            {Object.entries(links).map(([title, items]) => (
              <div key={title} className="flex flex-col gap-3 items-start">
                <p className="font-sans text-[12.5px] font-medium tracking-[0.02em] text-zinc-950">{title}</p>
                {items.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={href.includes("docs.fil.one") ? () => trackDocsClick(href) : undefined}
                    className="font-sans text-[13.5px] font-normal leading-[1.4] text-zinc-600 no-underline transition-colors duration-150 hover:text-zinc-950"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: divider + copyright */}
        <div className="flex flex-col gap-4 border-t border-black/[0.06] pt-6">
          <p className="font-sans text-[12px] font-normal text-zinc-500">{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
