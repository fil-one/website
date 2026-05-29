import { useState } from "react";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import filOneLogo from "../assets/fil-one-logo.svg";

const NAV_LINKS = [
  { label: "Features", anchor: "features" },
  { label: "Compare", anchor: "compare" },
  { label: "Calculator", anchor: "calculator" },
  { label: "Pricing", anchor: "pricing" },
  { label: "FAQ", anchor: "faq" },
  { label: "Docs", href: "https://docs.fil.one", external: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const anchorHref = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`;

  return (
    <>
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center justify-between px-5 md:px-8 h-[58px] max-w-[1120px] mx-auto w-full">
        {/* Logo */}
        <a href="/" className="shrink-0" style={{ textDecoration: "none" }}>
          <img src={filOneLogo} alt="Fil One" style={{ height: 20, width: "auto", display: "block" }} />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, anchor, href, external }) => (
            <a
              key={label}
              href={href ?? anchorHref(anchor!)}
              {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
              {external && <ArrowUpRight size={13} style={{ color: "#A1A1AA", marginTop: 1 }} aria-hidden="true" />}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <a href="https://app.fil.one/login" className="btn-secondary">
            Login
          </a>
          <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-sm">
            <span className="btn-primary-inner">Sign up</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-black/[0.04] transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          style={{ border: "none", backgroundColor: "transparent", cursor: "pointer" }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} color="#09090B" /> : <List size={18} color="#09090B" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-5 py-3 flex flex-col gap-0.5"
          style={{
            backgroundColor: "rgba(255,255,255,0.97)",
            borderColor: "rgba(0,0,0,0.06)",
          }}
        >
          {NAV_LINKS.map(({ label, anchor, href, external }) => (
            <a
              key={label}
              href={href ?? anchorHref(anchor!)}
              {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                color: "#09090B",
                textDecoration: "none",
              }}
            >
              {label}
              {external && <ArrowUpRight size={14} style={{ color: "#A1A1AA" }} />}
            </a>
          ))}
          <div className="pt-3 mt-1 border-t flex flex-col gap-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <a href="https://app.fil.one/login" className="btn-secondary w-full text-center" onClick={() => setMobileOpen(false)}>
              Login
            </a>
            <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary w-full" onClick={() => setMobileOpen(false)}>
              <span className="btn-primary-inner w-full justify-center">Sign up</span>
            </a>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
