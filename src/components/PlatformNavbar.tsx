import { useState, useEffect, useRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { List, X, ArrowUpRight, CaretDown, Brain, LinkSimple, FilmSlate, ShieldCheck } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import filOneLogo from "../assets/fil-one-logo.svg";
import { trackDocsClick } from "@/lib/analytics";
import { Button } from "@/components/Button";

const PRODUCTS_EN = [
  {
    label: "Object Storage",
    description: "S3-compatible, verifiably durable",
    badge: null,
    href: "/storage",
  },
  {
    label: "Bucket Intelligence",
    description: "Turn buckets into knowledge bases",
    badge: "Early access",
    href: "/bucket-intelligence",
  },
  {
    label: "AI Agent Toolkit",
    description: "MCP, OAuth & SDK integrations",
    badge: "Early access",
    href: "/ai-agent-toolkit",
  },
];

const PRODUCTS_ES = [
  {
    label: "Almacenamiento de objetos",
    description: "Compatible con S3, con durabilidad verificable",
    badge: null,
    href: "/storage",
  },
  {
    label: "Bucket Intelligence",
    description: "Convierte tus buckets en bases de conocimiento",
    badge: "Acceso anticipado",
    href: "/bucket-intelligence",
  },
  {
    label: "AI Agent Toolkit",
    description: "Integraciones MCP, OAuth y SDK",
    badge: "Acceso anticipado",
    href: "/ai-agent-toolkit",
  },
];

const SOLUTIONS_EN = [
  {
    icon: Brain,
    label: "AI Training & Inference",
    description: "Storage that keeps your GPUs fed",
    href: "/solutions/ai-training",
  },
  {
    icon: LinkSimple,
    label: "Web3 & dApps",
    description: "Storage your smart contracts can trust",
    href: "/solutions/web3-dapps",
  },
  {
    icon: FilmSlate,
    label: "Media & Archive",
    description: "Archive petabytes, pay nothing to get them back",
    href: "/solutions/media-archive",
  },
  {
    icon: ShieldCheck,
    label: "Enterprise Backup & DR",
    description: "Backups ransomware can't touch",
    href: "/solutions/enterprise-backup",
  },
];

const SOLUTIONS_ES = [
  {
    icon: Brain,
    label: "Entrenamiento e inferencia de IA",
    description: "Almacenamiento que mantiene tus GPU alimentadas",
    href: "/solutions/ai-training",
  },
  {
    icon: LinkSimple,
    label: "Web3 y dApps",
    description: "Almacenamiento en el que tus smart contracts pueden confiar",
    href: "/solutions/web3-dapps",
  },
  {
    icon: FilmSlate,
    label: "Medios y archivo",
    description: "Archiva petabytes y no pagues nada por recuperarlos",
    href: "/solutions/media-archive",
  },
  {
    icon: ShieldCheck,
    label: "Backup empresarial y DR",
    description: "Copias de seguridad que el ransomware no puede tocar",
    href: "/solutions/enterprise-backup",
  },
];

const UTILITY_LINKS_EN = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Enterprise", href: "/enterprise" },
];

const UTILITY_LINKS_ES = [
  { label: "Nosotros", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Precios", href: "/pricing" },
  { label: "Empresas", href: "/enterprise" },
];

const utilityBarLinksEn = (supportHref: string) => [
  { label: "Documentation", href: "https://docs.fil.one", external: true },
  { label: "Partners", href: "/partners" },
  { label: "Support", href: supportHref },
];

const utilityBarLinksEs = (supportHref: string) => [
  { label: "Documentación", href: "https://docs.fil.one", external: true },
  { label: "Partners", href: "/partners" },
  { label: "Soporte", href: supportHref },
];

const UTILITY_BAR_HEIGHT = 36;

const triggerStyle = {
  fontFamily: "'Funnel Sans', sans-serif",
  fontWeight: 400,
  fontSize: 14,
  color: "#52525B",
  background: "none",
  border: "none",
  cursor: "pointer",
} as const;

interface PlatformNavbarProps {
  lang?: "en" | "es";
  /** Override the utility bar's Support link — defaults to the general /support page. */
  supportHref?: string;
  /** Override the "Contact Sales" CTA — defaults to the general /contact-sales page. */
  contactSalesHref?: string;
}

const PlatformNavbar = ({ lang = "en", supportHref = "/support", contactSalesHref = "/contact-sales" }: PlatformNavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [utilityVisible, setUtilityVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();

  const PRODUCTS = lang === "es" ? PRODUCTS_ES : PRODUCTS_EN;
  const SOLUTIONS = lang === "es" ? SOLUTIONS_ES : SOLUTIONS_EN;
  const UTILITY_LINKS = lang === "es" ? UTILITY_LINKS_ES : UTILITY_LINKS_EN;
  const UTILITY_BAR_LINKS = (lang === "es" ? utilityBarLinksEs : utilityBarLinksEn)(supportHref);
  const t = lang === "es"
    ? {
        skipToContent: "Saltar al contenido principal",
        signIn: "Iniciar sesión",
        products: "Productos",
        solutions: "Soluciones",
        contactSales: "Contactar con ventas",
        startForFree: "Empieza gratis",
        closeMenu: "Cerrar menú",
        openMenu: "Abrir menú",
      }
    : {
        skipToContent: "Skip to main content",
        signIn: "Sign in",
        products: "Products",
        solutions: "Solutions",
        contactSales: "Contact Sales",
        startForFree: "Start for free",
        closeMenu: "Close menu",
        openMenu: "Open menu",
      };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > UTILITY_BAR_HEIGHT) {
        setUtilityVisible(false);
      } else {
        setUtilityVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isV2 = pathname === "/";
  const anchorHref = (anchor: string) => (isV2 ? `#${anchor}` : `/#${anchor}`);

  return (
    <>
      <style>{`
        .nav-caret { transition: transform 0.15s ease; margin-top: 1px; }
        [data-radix-navigation-menu-trigger][data-state=open] .nav-caret { transform: rotate(180deg); }
        .NavigationMenuViewport {
          width: max-content;
          height: var(--radix-navigation-menu-viewport-height);
        }
        [data-radix-navigation-menu-content] {
          animation: navFadeIn 0.15s ease;
        }
        @keyframes navFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <a href="#main-content" className="skip-link">{t.skipToContent}</a>

      {/* Utility bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[51] hidden md:flex items-center justify-end border-b px-6 md:px-12"
        style={{
          height: UTILITY_BAR_HEIGHT,
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: "rgba(0,0,0,0.06)",
          transform: utilityVisible ? "translateY(0)" : `translateY(-${UTILITY_BAR_HEIGHT}px)`,
          transition: "transform 0.2s ease",
          pointerEvents: utilityVisible ? "auto" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-end gap-1">
          {UTILITY_BAR_LINKS.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center gap-0.5 hover:bg-black/[0.04] transition-colors"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 12.5,
                fontWeight: 400,
                color: "#71717A",
                textDecoration: "none",
                padding: "2px 10px",
                borderRadius: 6,
              }}
            >
              {label}
              {external && <ArrowUpRight size={11} style={{ color: "#52525B", marginTop: 1 }} aria-hidden="true" />}
            </a>
          ))}
          <div style={{ width: 1, height: 14, backgroundColor: "rgba(0,0,0,0.1)", margin: "0 4px" }} />
          <a
            href="https://app.fil.one/login"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontSize: 12.5,
              fontWeight: 400,
              color: "#71717A",
              textDecoration: "none",
              padding: "2px 10px",
              borderRadius: 6,
            }}
            className="hover:bg-black/[0.04] transition-colors"
          >
            {t.signIn}
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`fixed left-0 right-0 z-50 border-b px-6 md:px-12 top-0 transition-[top] duration-200 ${utilityVisible ? "md:top-9" : "md:top-0"}`}
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center justify-between h-[58px] max-w-[1400px] mx-auto w-full">
          {/* Logo */}
          <a href="/" className="shrink-0" style={{ textDecoration: "none" }}>
            <img src={filOneLogo} alt="Fil One" style={{ height: 20, width: "auto", display: "block" }} />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            <NavigationMenuPrimitive.Root className="relative">
              <NavigationMenuPrimitive.List className="flex items-center gap-0.5 list-none m-0 p-0">

                {/* Products */}
                <NavigationMenuPrimitive.Item>
                  <NavigationMenuPrimitive.Trigger
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-md transition-colors hover:bg-black/[0.04]"
                    style={triggerStyle}
                  >
                    {t.products}
                    <CaretDown size={12} color="#52525B" className="nav-caret" />
                  </NavigationMenuPrimitive.Trigger>

                  <NavigationMenuPrimitive.Content>
                    <div className="py-2" style={{ minWidth: 240 }}>
                      {PRODUCTS.map(({ label, description, badge, href }) => (
                        <NavigationMenuPrimitive.Link asChild key={label}>
                          <a
                            href={href.startsWith("#") ? anchorHref(href.slice(1)) : href}
                            className="flex flex-col gap-0.5 px-4 py-2.5 hover:bg-black/[0.03] transition-colors"
                            style={{ textDecoration: "none" }}
                          >
                            <div className="flex items-center gap-2">
                              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#09090B" }}>
                                {label}
                              </span>
                              {badge && (
                                <span style={{
                                  fontFamily: "'DM Mono', monospace",
                                  fontWeight: 500,
                                  fontSize: 10,
                                  letterSpacing: "0.05em",
                                  color: "#52525B",
                                  textTransform: "uppercase",
                                  backgroundColor: "#F4F4F5",
                                  border: "1px solid #E4E4E7",
                                  borderRadius: 9999,
                                  padding: "1px 6px",
                                }}>
                                  {badge}
                                </span>
                              )}
                            </div>
                            <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, color: "#6B7280" }}>
                              {description}
                            </span>
                          </a>
                        </NavigationMenuPrimitive.Link>
                      ))}
                    </div>
                  </NavigationMenuPrimitive.Content>
                </NavigationMenuPrimitive.Item>

                {/* Solutions */}
                <NavigationMenuPrimitive.Item>
                  <NavigationMenuPrimitive.Trigger
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-md transition-colors hover:bg-black/[0.04]"
                    style={triggerStyle}
                  >
                    {t.solutions}
                    <CaretDown size={12} color="#52525B" className="nav-caret" />
                  </NavigationMenuPrimitive.Trigger>

                  <NavigationMenuPrimitive.Content>
                    <div className="py-2" style={{ minWidth: 280 }}>
                      {SOLUTIONS.map(({ icon: Icon, label, description, href }) => (
                        <NavigationMenuPrimitive.Link asChild key={label}>
                          <a
                            href={href}
                            className="flex items-start gap-3 px-4 py-2.5 hover:bg-black/[0.03] transition-colors"
                            style={{ textDecoration: "none" }}
                          >
                            <div
                              className="flex items-center justify-center rounded-md shrink-0 mt-0.5"
                              style={{ width: 26, height: 26, backgroundColor: "#EFF8FF", color: "#0070CC" }}
                            >
                              <Icon size={13} weight="duotone" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#09090B" }}>
                                {label}
                              </span>
                              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, color: "#6B7280" }}>
                                {description}
                              </span>
                            </div>
                          </a>
                        </NavigationMenuPrimitive.Link>
                      ))}
                    </div>
                  </NavigationMenuPrimitive.Content>
                </NavigationMenuPrimitive.Item>

              </NavigationMenuPrimitive.List>

              {/* Viewport — renders the active dropdown content */}
              <div className="absolute top-[calc(100%+6px)] left-0 z-[100]">
                <NavigationMenuPrimitive.Viewport
                  className="NavigationMenuViewport rounded-xl border overflow-hidden"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "rgba(0,0,0,0.08)",
                    boxShadow: "0px 4px 24px rgba(0,0,0,0.08), 0px 1px 4px rgba(0,0,0,0.04)",
                  }}
                />
              </div>
            </NavigationMenuPrimitive.Root>

            {/* Utility links */}
            {UTILITY_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-0.5 px-3.5 py-1.5 rounded-md transition-colors hover:bg-black/[0.04]"
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#52525B",
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop right CTAs */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <Button href={contactSalesHref} variant="secondary">
              {t.contactSales}
            </Button>
            <Button href="https://app.fil.one/login?screen_hint=signup" variant="primary" size="sm">
              {t.startForFree}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-black/[0.04] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            style={{ border: "none", backgroundColor: "transparent", cursor: "pointer" }}
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} color="#09090B" /> : <List size={18} color="#09090B" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-5 py-3 flex flex-col gap-0.5 max-h-[calc(100dvh-58px)] overflow-y-auto overscroll-contain"
            style={{
              backgroundColor: "rgba(255,255,255,0.97)",
              borderColor: "rgba(0,0,0,0.06)",
            }}
          >
            <p
              className="px-3 pt-2 pb-1"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 10.5,
                letterSpacing: "0.08em",
                color: "#52525B",
                textTransform: "uppercase",
              }}
            >
              {t.products}
            </p>
            {PRODUCTS.map(({ label, badge, href }) => (
              <a
                key={label}
                href={href.startsWith("#") ? anchorHref(href.slice(1)) : href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 15, color: "#09090B", textDecoration: "none" }}
              >
                {label}
                {badge && (
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10,
                      letterSpacing: "0.05em",
                      color: "#52525B",
                      textTransform: "uppercase",
                      backgroundColor: "#F4F4F5",
                      border: "1px solid #E4E4E7",
                      borderRadius: 9999,
                      padding: "1px 6px",
                    }}
                  >
                    {badge}
                  </span>
                )}
              </a>
            ))}

            <div className="w-full h-px my-1" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />
            <p
              className="px-3 pt-2 pb-1"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 10.5,
                letterSpacing: "0.08em",
                color: "#52525B",
                textTransform: "uppercase",
              }}
            >
              {t.solutions}
            </p>
            {SOLUTIONS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 15, color: "#09090B", textDecoration: "none" }}
              >
                {label}
              </a>
            ))}

            <div className="w-full h-px my-1" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />
            {UTILITY_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-1 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 15, color: "#09090B", textDecoration: "none" }}
              >
                {label}
              </a>
            ))}

            <div className="w-full h-px my-1" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />
            {UTILITY_BAR_LINKS.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => { setMobileOpen(false); if (href?.includes("docs.fil.one")) trackDocsClick(href); }}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 15, color: "#09090B", textDecoration: "none" }}
              >
                {label}
              </a>
            ))}

            <div className="pt-3 mt-1 border-t flex flex-col gap-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <Button href={contactSalesHref} variant="secondary" fullWidth onClick={() => setMobileOpen(false)}>
                {t.contactSales}
              </Button>
              <Button
                href="https://app.fil.one/login?screen_hint=signup"
                variant="primary"
                fullWidth
                onClick={() => setMobileOpen(false)}
              >
                {t.startForFree}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default PlatformNavbar;
