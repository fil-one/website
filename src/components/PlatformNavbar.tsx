import { useState } from "react";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import filOneLogo from "../assets/fil-one-logo.svg";
import { trackDocsClick } from "@/lib/analytics";
import { Button } from "@/components/Button";
import Icon, { type IconProps } from "@/components/Icon";
import FloatingSupportButton from "@/components/FloatingSupportButton";
import { localize, type Lang, type Localized } from "@/lib/i18n";
import { signupUrl } from "@/lib/console-url";

/** One entry in a nav or footer link list. */
interface NavLinkItem {
  href: string;
  label: Localized;
  external?: boolean;
}





// Grouped product → ecosystem → company/content, with the external Docs
// link last since it's the one exit point off the marketing site.
const NAV_LINKS: readonly NavLinkItem[] = [
  { href: "/solutions", label: { en: "Solutions", es: "Soluciones" } },
  { href: "/neocloud", label: { en: "Neoclouds", es: "Neoclouds" } },
  { href: "/pricing", label: { en: "Pricing", es: "Precios" } },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: { en: "About", es: "Nosotros" } },
  { href: "/blog", label: "Blog" },
  { href: "https://docs.fil.one", external: true, label: "Docs" },
];

/** Top-level nav item (dropdown trigger or plain link) — shared so both match. */
const NAV_ITEM_CLASS =
  "flex items-center gap-1 rounded-md px-2 py-1.5 font-sans text-body-sm font-normal no-underline transition-colors ease-smooth hover:bg-black/[0.04] xl:px-2.5";

/** Current-page treatment: darker text on a faint tint (weight stays fixed so the row never shifts). */
const NAV_ITEM_ACTIVE_CLASS = "bg-black/[0.04] text-zinc-950";

/** Row in the mobile panel. */
const MOBILE_ROW_CLASS =
  "flex items-center rounded-lg px-3 py-2.5 font-sans text-body font-normal text-zinc-950 no-underline transition-colors ease-smooth hover:bg-black/[0.04]";

/** True when `href` is the current page or a section containing it (e.g. /blog for a post). */
const isCurrent = (pathname: string, href: string) =>
  !href.startsWith("http") && (pathname === href || pathname.startsWith(`${href}/`));

const MOBILE_MENU_ID = "mobile-nav-menu";


interface PlatformNavbarProps {
  lang?: Lang;
  /** Override the floating support button's link — defaults to the general /support page. */
  supportHref?: string;
  /** Override the "Talk to sales" CTA — defaults to the general /contact-sales page. */
  contactSalesHref?: string;
}

const PlatformNavbar = ({ lang = "en", supportHref = "/support", contactSalesHref = "/contact-sales" }: PlatformNavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  /** Resolve a list entry's copy for the active language. */
  const l = (value: Localized) => localize(value, lang);
  const t = lang === "es"
    ? {
        skipToContent: "Saltar al contenido principal",
        contactSales: "Contactar con ventas",
        startForFree: "Empieza gratis",
        closeMenu: "Cerrar menú",
        openMenu: "Abrir menú",
      }
    : {
        skipToContent: "Skip to main content",
        contactSales: "Talk to sales",
        startForFree: "Start for free",
        closeMenu: "Close menu",
        openMenu: "Open menu",
      };

  return (
    <>

      <a href="#main-content" className="skip-link">{t.skipToContent}</a>

      {/* Main navbar */}
      <nav className="fixed left-0 right-0 top-0 z-50 px-5 border-b border-black/[0.06] bg-white/85 backdrop-blur-[20px] md:px-8">
        <div className="mx-auto flex h-[58px] w-full items-center justify-between gap-4 lg:gap-5 xl:gap-8">
          {/* Logo */}
          <a href="/" className="flex h-11 shrink-0 items-center no-underline">
            <img src={filOneLogo} alt="Fil One" className="block h-5 w-auto" />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-2">
            {NAV_LINKS.map(({ label, href, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-current={isCurrent(pathname, href) ? "page" : undefined}
                onClick={() => { if (href.includes("docs.fil.one")) trackDocsClick(href); }}
                className={`${NAV_ITEM_CLASS} ${isCurrent(pathname, href) ? NAV_ITEM_ACTIVE_CLASS : "text-zinc-600"}`}
              >
                {l(label)}
                {external && <Icon icon={ArrowUpRight} size={11} className="mt-px text-zinc-600" aria-hidden="true" />}
              </a>
            ))}
          </div>

          {/* Desktop right CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* The longer Spanish labels don't fit beside the links at 1024px, so the
                sales button waits for xl there (it's still in the mobile menu and page CTAs). */}
            <Button href={contactSalesHref} variant="secondary" className={lang === "es" ? "!hidden xl:!inline-flex" : undefined}>
              {t.contactSales}
            </Button>
            <Button href={signupUrl()} variant="primary" size="sm">
              {t.startForFree}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="-mr-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-zinc-950 transition-colors hover:bg-black/[0.04] lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            <Icon icon={mobileOpen ? X : List} size={18} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div id={MOBILE_MENU_ID} className="flex max-h-[calc(100dvh-58px)] flex-col gap-0.5 overflow-y-auto overscroll-contain border-t border-black/[0.06] bg-white/[0.97] px-5 py-3 lg:hidden">
            {NAV_LINKS.map(({ label, href, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-current={isCurrent(pathname, href) ? "page" : undefined}
                onClick={() => { setMobileOpen(false); if (href.includes("docs.fil.one")) trackDocsClick(href); }}
                className={`${MOBILE_ROW_CLASS} gap-1${isCurrent(pathname, href) ? " bg-black/[0.04] font-medium" : ""}`}
              >
                {l(label)}
                {external && <Icon icon={ArrowUpRight} size={11} className="mt-px text-zinc-600" aria-hidden="true" />}
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

      <FloatingSupportButton href={supportHref} />
    </>
  );
};

export default PlatformNavbar;
