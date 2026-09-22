import { useState, useEffect, useRef } from "react";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import filOneLogo from "../assets/fil-one-logo.svg";
import { trackDocsClick } from "@/lib/analytics";
import { Button } from "@/components/Button";
import Icon, { type IconProps } from "@/components/Icon";
import { localize, type Lang, type Localized } from "@/lib/i18n";
import { consoleUrl, signupUrl } from "@/lib/console-url";

/** One entry in a nav or footer link list. */
interface NavLinkItem {
  href: string;
  label: Localized;
  external?: boolean;
}





const UTILITY_LINKS: readonly NavLinkItem[] = [
  { href: "/solutions", label: { en: "Solutions", es: "Soluciones" } },
  { href: "/about", label: { en: "About", es: "Nosotros" } },
  { href: "/pricing", label: { en: "Pricing", es: "Precios" } },
  { href: "https://docs.fil.one", external: true, label: "Docs" },
  { href: "/blog", label: "Blog" },
];

/** Support is a prop because some landing pages point it at their own page. */
const utilityBarLinks = (supportHref: string): readonly NavLinkItem[] => [
    { href: "/partners", label: "Partners" },
    { href: supportHref, label: { en: "Support", es: "Soporte" } },
  ];

const UTILITY_BAR_HEIGHT = 36;

/** Top-level nav item (dropdown trigger or plain link) — shared so both match. */
const NAV_ITEM_CLASS =
  "flex items-center gap-1 rounded-md px-3.5 py-1.5 font-sans text-[14px] font-normal text-zinc-600 no-underline transition-colors hover:bg-black/[0.04]";

/** The dropdown trigger is a <button>, so it also has to shed the UA button chrome. */
/** Utility-bar link / Sign in — the smaller grey strip above the navbar. */
const UTILITY_BAR_LINK_CLASS =
  "flex items-center gap-0.5 rounded-[6px] px-2.5 py-0.5 font-sans text-[12.5px] font-normal text-zinc-500 no-underline transition-colors hover:bg-black/[0.04]";

/** Uppercase mono section label inside the mobile panel. */
const MOBILE_SECTION_LABEL_CLASS =
  "px-3 pb-1 pt-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-zinc-600";

/** Row in the mobile panel. */
const MOBILE_ROW_CLASS =
  "flex items-center rounded-lg px-3 py-2.5 font-sans text-[15px] font-normal text-zinc-950 no-underline transition-colors hover:bg-black/[0.04]";


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
        contactSales: "Contactar con ventas",
        startForFree: "Empieza gratis",
        closeMenu: "Cerrar menú",
        openMenu: "Abrir menú",
      }
    : {
        skipToContent: "Skip to main content",
        signIn: "Sign in",
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


  return (
    <>

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
          <a href={consoleUrl("/login")} className={UTILITY_BAR_LINK_CLASS}>
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
            {/* Utility links */}
            {UTILITY_LINKS.map(({ label, href, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => { if (href.includes("docs.fil.one")) trackDocsClick(href); }}
                className={`${NAV_ITEM_CLASS} gap-1`}
              >
                {l(label)}
                {external && <Icon icon={ArrowUpRight} size={11} className="mt-px text-zinc-600" aria-hidden="true" />}
              </a>
            ))}
          </div>

          {/* Desktop right CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <Button href={contactSalesHref} variant="secondary">
              {t.contactSales}
            </Button>
            <Button href={signupUrl()} variant="primary" size="sm">
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
            {UTILITY_LINKS.map(({ label, href, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => { setMobileOpen(false); if (href.includes("docs.fil.one")) trackDocsClick(href); }}
                className={`${MOBILE_ROW_CLASS} gap-1`}
              >
                {l(label)}
                {external && <Icon icon={ArrowUpRight} size={11} className="mt-px text-zinc-600" aria-hidden="true" />}
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
                href={signupUrl()}
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
