import { useState } from "react";
import { List, X, ArrowUpRight, CaretDown, Brain, LinkSimple, FilmSlate, ShieldCheck } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import filOneLogo from "../assets/fil-one-logo.svg";
import { trackDocsClick } from "@/lib/analytics";

const SOLUTIONS = [
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
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const anchorHref = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`;

  return (
    <>
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b px-6 md:px-12"
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

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {/* Solutions dropdown */}
          <div className="relative" style={{ position: "relative" }}>
            <button
              onClick={() => setSolutionsOpen((o) => !o)}
              onBlur={(e) => { if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setSolutionsOpen(false); }}
              className="flex items-center gap-0.5 px-3.5 py-1.5 rounded-md transition-colors hover:bg-black/[0.04]"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#52525B",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
            >
              Solutions
              <CaretDown
                size={12}
                style={{
                  color: "#A1A1AA",
                  marginTop: 1,
                  transition: "transform 0.15s",
                  transform: solutionsOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              />
            </button>

            {solutionsOpen && (
              <div
                className="absolute left-0 top-full mt-1.5 rounded-xl border shadow-lg"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "rgba(0,0,0,0.08)",
                  width: 300,
                  zIndex: 100,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                }}
              >
                <div className="p-2 flex flex-col gap-0.5">
                  {SOLUTIONS.map(({ icon: Icon, label, description, href }) => (
                    <a
                      key={href}
                      href={href}
                      onClick={() => setSolutionsOpen(false)}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="flex items-center justify-center rounded-md shrink-0 mt-0.5"
                        style={{ width: 28, height: 28, backgroundColor: "#EFF8FF", color: "#0070CC" }}
                      >
                        <Icon size={14} weight="duotone" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span
                          style={{
                            fontFamily: "'Funnel Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: 13,
                            color: "#09090B",
                          }}
                        >
                          {label}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Funnel Sans', sans-serif",
                            fontSize: 12,
                            color: "#71717A",
                            lineHeight: "1.4",
                          }}
                        >
                          {description}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.map(({ label, anchor, href, external }) => (
            <a
              key={label}
              href={href ?? anchorHref(anchor!)}
              {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={href?.includes("docs.fil.one") ? () => trackDocsClick(href) : undefined}
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
          {/* Solutions group */}
          <div className="px-3 pt-1 pb-0.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.07em", color: "#A1A1AA", textTransform: "uppercase" }}>
            Solutions
          </div>
          {SOLUTIONS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
              style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 15, color: "#09090B", textDecoration: "none" }}
            >
              {label}
            </a>
          ))}
          <div className="my-1 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }} />

          {NAV_LINKS.map(({ label, anchor, href, external }) => (
            <a
              key={label}
              href={href ?? anchorHref(anchor!)}
              {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => { setMobileOpen(false); if (href?.includes("docs.fil.one")) trackDocsClick(href); }}
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
