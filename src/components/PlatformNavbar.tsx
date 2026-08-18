import { useState, useEffect, useRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { List, X, ArrowUpRight, CaretDown, Brain, LinkSimple, FilmSlate, ShieldCheck } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import filOneLogo from "../assets/fil-one-logo.svg";
import { trackDocsClick } from "@/lib/analytics";
import { Button } from "@/components/Button";
import Icon, { type IconProps } from "@/components/Icon";
import { localize, type Lang, type Localized } from "@/lib/i18n";

/** One entry in a nav or footer link list. */
interface NavLinkItem {
  href: string;
  label: Localized;
  external?: boolean;
}

interface ProductItem extends NavLinkItem {
  description: Localized;
  badge: Localized | null;
}

interface SolutionItem extends NavLinkItem {
  description: Localized;
  /** Derived from the shared <Icon> so the two can never disagree. */
  icon: IconProps["icon"];
}

const PRODUCTS: readonly ProductItem[] = [
  {
    href: "/storage",
    badge: null,
    label: { en: "Object Storage", es: "Almacenamiento de objetos" },
    description: {
      en: "S3-compatible, verifiably durable",
      es: "Compatible con S3, con durabilidad verificable",
    },
  },
  {
    href: "/bucket-intelligence",
    badge: { en: "Early access", es: "Acceso anticipado" },
    label: "Bucket Intelligence",
    description: {
      en: "Turn buckets into knowledge bases",
      es: "Convierte tus buckets en bases de conocimiento",
    },
  },
  {
    href: "/ai-agent-toolkit",
    badge: { en: "Early access", es: "Acceso anticipado" },
    label: "AI Agent Toolkit",
    description: {
      en: "MCP, OAuth & SDK integrations",
      es: "Integraciones MCP, OAuth y SDK",
    },
  },
];

const SOLUTIONS: readonly SolutionItem[] = [
  {
    icon: Brain,
    href: "/solutions/ai-training",
    label: { en: "AI Training & Inference", es: "Entrenamiento e inferencia de IA" },
    description: {
      en: "Storage that keeps your GPUs fed",
      es: "Almacenamiento que mantiene tus GPU alimentadas",
    },
  },
  {
    icon: LinkSimple,
    href: "/solutions/web3-dapps",
    label: { en: "Web3 & dApps", es: "Web3 y dApps" },
    description: {
      en: "Storage your smart contracts can trust",
      es: "Almacenamiento en el que tus smart contracts pueden confiar",
    },
  },
  {
    icon: FilmSlate,
    href: "/solutions/media-archive",
    label: { en: "Media & Archive", es: "Medios y archivo" },
    description: {
      en: "Archive petabytes, pay nothing to get them back",
      es: "Archiva petabytes y no pagues nada por recuperarlos",
    },
  },
  {
    icon: ShieldCheck,
    href: "/solutions/enterprise-backup",
    label: { en: "Enterprise Backup & DR", es: "Backup empresarial y DR" },
    description: {
      en: "Backups ransomware can't touch",
      es: "Copias de seguridad que el ransomware no puede tocar",
    },
  },
];

const UTILITY_LINKS: readonly NavLinkItem[] = [
  { href: "/about", label: { en: "About", es: "Nosotros" } },
  { href: "/pricing", label: { en: "Pricing", es: "Precios" } },
  { href: "/enterprise", label: { en: "Enterprise", es: "Empresas" } },
  { href: "/blog", label: "Blog" },
];

/** Support is a prop because some landing pages point it at their own page. */
const utilityBarLinks = (supportHref: string): readonly NavLinkItem[] => [
    {
      href: "https://docs.fil.one",
      external: true,
      label: { en: "Documentation", es: "Documentación" },
    },
    { href: "/partners", label: "Partners" },
    { href: supportHref, label: { en: "Support", es: "Soporte" } },
  ];

const UTILITY_BAR_HEIGHT = 36;

/** Top-level nav item (dropdown trigger or plain link) — shared so both match. */
const NAV_ITEM_CLASS =
  "flex items-center gap-1 rounded-md px-3.5 py-1.5 font-sans text-[14px] font-normal text-zinc-600 no-underline transition-colors hover:bg-black/[0.04]";

/** The dropdown trigger is a <button>, so it also has to shed the UA button chrome. */
const NAV_TRIGGER_CLASS = `${NAV_ITEM_CLASS} cursor-pointer border-none bg-none`;

/** Utility-bar link / Sign in — the smaller grey strip above the navbar. */
const UTILITY_BAR_LINK_CLASS =
  "flex items-center gap-0.5 rounded-[6px] px-2.5 py-0.5 font-sans text-[12.5px] font-normal text-zinc-500 no-underline transition-colors hover:bg-black/[0.04]";

/** Uppercase mono section label inside the mobile panel. */
const MOBILE_SECTION_LABEL_CLASS =
  "px-3 pb-1 pt-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-zinc-600";

/** Row in the mobile panel. */
const MOBILE_ROW_CLASS =
  "flex items-center rounded-lg px-3 py-2.5 font-sans text-[15px] font-normal text-zinc-950 no-underline transition-colors hover:bg-black/[0.04]";

/** "Early access" pill, used in both the desktop dropdown and the mobile panel. */
const BADGE_CLASS =
  "rounded-full border border-zinc-200 bg-zinc-100 px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-zinc-600";

interface PlatformNavbarProps {
  lang?: Lang;
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

  const UTILITY_BAR_LINKS = utilityBarLinks(supportHref);
  /** Resolve a list entry's copy for the active language. */
  const l = (value: Localized) => localize(value, lang);
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
        className={`fixed left-0 right-0 top-0 z-[51] hidden h-9 items-center justify-end border-b border-black/[0.06] bg-white/95 px-6 backdrop-blur-md transition-transform duration-200 md:flex md:px-12 ${
          utilityVisible ? "translate-y-0" : "pointer-events-none -translate-y-9"
        }`}
      >
        <div className="mx-auto flex w-full max-w-container-wide items-center justify-end gap-1">
          {UTILITY_BAR_LINKS.map(({ label, href, external }) => (
            <a
              key={href}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={UTILITY_BAR_LINK_CLASS}
            >
              {l(label)}
              {external && <Icon icon={ArrowUpRight} size={11} className="mt-px text-zinc-600" aria-hidden="true" />}
            </a>
          ))}
          <div className="mx-1 h-3.5 w-px bg-black/10" />
          <a href="https://app.fil.one/login" className={UTILITY_BAR_LINK_CLASS}>
            {t.signIn}
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 border-b border-black/[0.06] bg-white/85 px-6 backdrop-blur-[20px] transition-[top] duration-200 md:px-12 ${
          utilityVisible ? "md:top-9" : "md:top-0"
        }`}
      >
        <div className="mx-auto flex h-[58px] w-full max-w-container-wide items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <a href="/" className="shrink-0 no-underline">
            <img src={filOneLogo} alt="Fil One" className="block h-5 w-auto" />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            <NavigationMenuPrimitive.Root className="relative">
              <NavigationMenuPrimitive.List className="flex items-center gap-0.5 list-none m-0 p-0">

                {/* Products */}
                <NavigationMenuPrimitive.Item>
                  <NavigationMenuPrimitive.Trigger className={NAV_TRIGGER_CLASS}>
                    {t.products}
                    <Icon icon={CaretDown} size={12} className="nav-caret text-zinc-600" />
                  </NavigationMenuPrimitive.Trigger>

                  <NavigationMenuPrimitive.Content>
                    <div className="min-w-[240px] py-2">
                      {PRODUCTS.map(({ label, description, badge, href }) => (
                        <NavigationMenuPrimitive.Link asChild key={href}>
                          <a
                            href={href.startsWith("#") ? anchorHref(href.slice(1)) : href}
                            className="flex flex-col gap-0.5 px-4 py-2.5 no-underline transition-colors hover:bg-black/[0.03]"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-sans text-[14px] font-medium text-zinc-950">{l(label)}</span>
                              {badge && <span className={BADGE_CLASS}>{l(badge)}</span>}
                            </div>
                            <span className="font-sans text-[12.5px] font-normal text-zinc-500">{l(description)}</span>
                          </a>
                        </NavigationMenuPrimitive.Link>
                      ))}
                    </div>
                  </NavigationMenuPrimitive.Content>
                </NavigationMenuPrimitive.Item>

                {/* Solutions */}
                <NavigationMenuPrimitive.Item>
                  <NavigationMenuPrimitive.Trigger className={NAV_TRIGGER_CLASS}>
                    {t.solutions}
                    <Icon icon={CaretDown} size={12} className="nav-caret text-zinc-600" />
                  </NavigationMenuPrimitive.Trigger>

                  <NavigationMenuPrimitive.Content>
                    <div className="min-w-[280px] py-2">
                      {SOLUTIONS.map(({ icon: SolutionIcon, label, description, href }) => (
                        <NavigationMenuPrimitive.Link asChild key={href}>
                          <a
                            href={href}
                            className="flex items-start gap-3 px-4 py-2.5 no-underline transition-colors hover:bg-black/[0.03]"
                          >
                            <div className="mt-0.5 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                              <Icon icon={SolutionIcon} size={13} weight="duotone" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-sans text-[14px] font-medium text-zinc-950">{l(label)}</span>
                              <span className="font-sans text-[12.5px] font-normal text-zinc-500">{l(description)}</span>
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
                <NavigationMenuPrimitive.Viewport className="NavigationMenuViewport overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-dropdown" />
              </div>
            </NavigationMenuPrimitive.Root>

            {/* Utility links */}
            {UTILITY_LINKS.map(({ label, href }) => (
              <a key={href} href={href} className={NAV_ITEM_CLASS}>
                {l(label)}
              </a>
            ))}
          </div>

          {/* Desktop right CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <Button href={contactSalesHref} variant="secondary">
              {t.contactSales}
            </Button>
            <Button href="https://app.fil.one/login?screen_hint=signup" variant="primary" size="sm">
              {t.startForFree}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-zinc-950 transition-colors hover:bg-black/[0.04] lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileOpen}
          >
            <Icon icon={mobileOpen ? X : List} size={18} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className={`flex flex-col gap-0.5 overflow-y-auto overscroll-contain border-t border-black/[0.06] bg-white/[0.97] px-5 py-3 lg:hidden ${
              utilityVisible ? "max-h-[calc(100dvh-58px)] md:max-h-[calc(100dvh-94px)]" : "max-h-[calc(100dvh-58px)]"
            }`}
          >
            <p className={MOBILE_SECTION_LABEL_CLASS}>{t.products}</p>
            {PRODUCTS.map(({ label, badge, href }) => (
              <a
                key={href}
                href={href.startsWith("#") ? anchorHref(href.slice(1)) : href}
                onClick={() => setMobileOpen(false)}
                className={`${MOBILE_ROW_CLASS} justify-between`}
              >
                {l(label)}
                {badge && <span className={BADGE_CLASS}>{l(badge)}</span>}
              </a>
            ))}

            <div className="my-1 h-px w-full bg-black/[0.06]" />
            <p className={MOBILE_SECTION_LABEL_CLASS}>{t.solutions}</p>
            {SOLUTIONS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={MOBILE_ROW_CLASS}
              >
                {l(label)}
              </a>
            ))}

            <div className="my-1 h-px w-full bg-black/[0.06]" />
            {UTILITY_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`${MOBILE_ROW_CLASS} gap-1`}
              >
                {l(label)}
              </a>
            ))}

            <div className="my-1 h-px w-full bg-black/[0.06]" />
            {UTILITY_BAR_LINKS.map(({ label, href, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => { setMobileOpen(false); if (href?.includes("docs.fil.one")) trackDocsClick(href); }}
                className={MOBILE_ROW_CLASS}
              >
                {l(label)}
              </a>
            ))}

            <div className="mt-1 flex flex-col gap-2 border-t border-black/[0.06] pt-3 sm:grid sm:grid-cols-2">
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
