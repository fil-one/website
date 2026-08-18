import filOneLogo from "../assets/fil-one-logo.svg";
import { trackDocsClick } from "@/lib/analytics";
import { localize, type Lang, type Localized } from "@/lib/i18n";

interface FooterGroup {
  title: Localized;
  items: { href: string; label: Localized }[];
}

interface FooterProps {
  lang?: Lang;
  /** Override the Support link — defaults to the general /support page. */
  supportHref?: string;
  /** Override the Contact Sales link — defaults to the general /contact-sales page. */
  contactSalesHref?: string;
}

const Footer = ({ lang = "en", supportHref = "/support", contactSalesHref = "/contact-sales" }: FooterProps) => {
  /**
   * Declared once, with only the copy varying by language — so a group's
   * hrefs cannot drift between the two translations, and adding a link is a
   * one-line change instead of two.
   */
  const groups: FooterGroup[] = [
    {
      title: { en: "Products", es: "Productos" },
      items: [
        { href: "/storage", label: { en: "Object Storage", es: "Almacenamiento de objetos" } },
        { href: "/bucket-intelligence", label: "Bucket Intelligence" },
        { href: "/ai-agent-toolkit", label: "AI Agent Toolkit" },
      ],
    },
    {
      title: { en: "Solutions", es: "Soluciones" },
      items: [
        {
          href: "/solutions/ai-training",
          label: { en: "AI Training & Inference", es: "Entrenamiento e inferencia de IA" },
        },
        { href: "/solutions/web3-dapps", label: { en: "Web3 & dApps", es: "Web3 y dApps" } },
        { href: "/solutions/media-archive", label: { en: "Media & Archive", es: "Medios y archivo" } },
        {
          href: "/solutions/enterprise-backup",
          label: { en: "Enterprise Backup & DR", es: "Backup empresarial y DR" },
        },
      ],
    },
    {
      title: { en: "Company", es: "Empresa" },
      items: [
        { href: "/about", label: { en: "About", es: "Nosotros" } },
        { href: "/pricing", label: { en: "Pricing", es: "Precios" } },
        { href: "/enterprise", label: { en: "Enterprise", es: "Empresas" } },
        { href: "/partners", label: "Partners" },
        { href: contactSalesHref, label: { en: "Contact Sales", es: "Contactar con ventas" } },
      ],
    },
    {
      title: { en: "Resources", es: "Recursos" },
      items: [
        { href: "https://docs.fil.one", label: { en: "Documentation", es: "Documentación" } },
        { href: "/blog", label: "Blog" },
        { href: supportHref, label: { en: "Support", es: "Soporte" } },
        { href: "https://status.fil.one", label: { en: "Status", es: "Estado" } },
        { href: "https://filecoin.io", label: "Filecoin" },
      ],
    },
    {
      title: "Legal",
      items: [
        { href: "/privacy", label: { en: "Privacy Policy", es: "Política de privacidad" } },
        { href: "/terms", label: { en: "Terms of Use", es: "Términos de uso" } },
        { href: "/aup", label: { en: "Acceptable Use", es: "Uso aceptable" } },
        { href: "/sla", label: "SLA" },
      ],
    },
  ];

  const l = (value: Localized) => localize(value, lang);
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
            {groups.map(({ title, items }) => (
              <div key={l(title)} className="flex flex-col gap-3 items-start">
                <p className="font-sans text-[12.5px] font-medium tracking-[0.02em] text-zinc-950">{l(title)}</p>
                {items.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={href.includes("docs.fil.one") ? () => trackDocsClick(href) : undefined}
                    className="font-sans text-[13.5px] font-normal leading-[1.4] text-zinc-600 no-underline transition-colors duration-150 hover:text-zinc-950"
                  >
                    {l(label)}
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
