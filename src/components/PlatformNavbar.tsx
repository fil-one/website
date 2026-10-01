import { useEffect, useState } from "react";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import filOneLogo from "../assets/fil-one-logo.svg";
import { trackDocsClick } from "@/lib/analytics";
import { Button } from "@/components/Button";
import Icon, { type IconProps } from "@/components/Icon";
import FloatingSupportButton from "@/components/FloatingSupportButton";
import { localize, type Lang, type Localized } from "@/lib/i18n";
import { consoleUrl, signupUrl } from "@/lib/console-url";
import AnnouncementBar from "@/components/AnnouncementBar";

/** One entry in a nav or footer link list. */
interface NavLinkItem {
  href: string;
  label: Localized;
  external?: boolean;
}





// The two doors in (bring a workload, host a zone), then pricing, then the
// reading exits. Partners and About live in the footer. Docs is external.
const NAV_LINKS: readonly NavLinkItem[] = [
  { href: "/workloads", label: { en: "Bring a workload", es: "Trae una carga de trabajo" } },
  { href: "/host", label: { en: "Host a zone", es: "Aloja una zona" } },
  { href: "/pricing", label: { en: "Pricing", es: "Precios" } },
  { href: "https://docs.fil.one", external: true, label: "Docs" },
  { href: "/blog", label: "Blog" },
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

  // While the mobile menu is open it covers the page: lock page scroll, close
  // on Escape, and close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!mobileOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => { if (desktop.matches) setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [mobileOpen]);

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
        contactSales: "Talk to sales",
        startForFree: "Start for free",
        closeMenu: "Close menu",
        openMenu: "Open menu",
      };

  return (
    <>

      <a href="#main-content" className="skip-link">{t.skipToContent}</a>

      {/* Fixed header: announcement bar, then the navbar. Page offsets use the `header` spacing token. */}
      <div className="fixed left-0 right-0 top-0 z-50">
      <AnnouncementBar lang={lang} />
      <nav className="px-5 border-b border-black/[0.06] bg-white/85 backdrop-blur-[20px] md:px-8">
        <div className="mx-auto flex h-[58px] w-full items-center justify-between gap-4 lg:gap-5 xl:gap-8">
          {/* Left: logo and the page links as one group */}
          <div className="flex items-center gap-5 xl:gap-7">
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
          </div>

          {/* Desktop right: sign in, then the two CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a href={consoleUrl("/login")} className={`${NAV_ITEM_CLASS} text-zinc-600`}>
              {t.signIn}
            </a>
            {/* The longer Spanish labels don't fit beside the links at 1024px, so the
                sales button waits for xl there (it's still in the mobile menu and page CTAs). */}
            <Button href={contactSalesHref} variant="secondary" className={lang === "es" ? "!hidden xl:!inline-flex" : undefined}>
              {t.contactSales}
            </Button>
            <Button href={signupUrl()} variant="primary" size="sm" glow>
              {t.startForFree}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="-mr-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-zinc-950 transition-colors hover:bg-black/[0.04] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500 lg:hidden"
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
          // Full-bleed (cancels the nav's side padding) and fills the rest of the viewport, so no page shows around or below it
          <div id={MOBILE_MENU_ID} className="-mx-5 flex h-[calc(100dvh-theme(spacing.header))] flex-col gap-0.5 overflow-y-auto overscroll-contain border-t border-black/[0.06] bg-white px-5 py-3 md:-mx-8 md:px-8 lg:hidden">
            {NAV_LINKS.map(({ label, href, external }) => (
              <a
                key={href}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-current={isCurrent(pathname, href) ? "page" : undefined}
                onClick={() => { setMobileOpen(false); if (href.includes("docs.fil.one")) trackDocsClick(href); }}
                className={`${MOBILE_ROW_CLASS} -mx-3 gap-1${isCurrent(pathname, href) ? " bg-black/[0.04] font-medium" : ""}`}
              >
                {l(label)}
                {external && <Icon icon={ArrowUpRight} size={11} className="mt-px text-zinc-600" aria-hidden="true" />}
              </a>
            ))}

            <a href={consoleUrl("/login")} onClick={() => setMobileOpen(false)} className={`${MOBILE_ROW_CLASS} -mx-3`}>
              {t.signIn}
            </a>

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
      </div>

      <FloatingSupportButton href={supportHref} />
    </>
  );
};

export default PlatformNavbar;
