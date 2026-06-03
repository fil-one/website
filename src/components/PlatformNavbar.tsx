import { useState, useRef } from "react";
import { List, X, ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import filOneLogo from "../assets/fil-one-logo.svg";
import { trackDocsClick } from "@/lib/analytics";

const PRODUCTS = [
  {
    label: "Object Storage",
    description: "S3-compatible, verifiably durable",
    badge: null,
    href: "/storage",
  },
  {
    label: "RAG Pipeline",
    description: "Turn buckets into knowledge bases",
    badge: "Coming soon",
    href: "/rag-pipeline",
  },
  {
    label: "AI Agent Toolkit",
    description: "MCP, OAuth & SDK integrations",
    badge: "Coming soon",
    href: "/ai-agent-toolkit",
  },
];

const UTILITY_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Docs", href: "https://docs.fil.one", external: true },
];

const PlatformNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

  const handleProductsEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };

  const handleProductsLeave = () => {
    closeTimer.current = setTimeout(() => setProductsOpen(false), 120);
  };
  const isV2 = pathname === "/";

  const anchorHref = (anchor: string) => (isV2 ? `#${anchor}` : `/#${anchor}`);

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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {/* Products dropdown — hover */}
            <div
              className="relative"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <button
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-md transition-colors hover:bg-black/[0.04]"
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#52525B",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Products
                <CaretDown
                  size={12}
                  color="#A1A1AA"
                  style={{
                    transform: productsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.15s ease",
                    marginTop: 1,
                  }}
                />
              </button>

              {productsOpen && (
                <div
                  className="absolute top-full left-0 mt-1.5 py-2 rounded-xl border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "rgba(0,0,0,0.08)",
                    boxShadow: "0px 4px 24px rgba(0,0,0,0.08), 0px 1px 4px rgba(0,0,0,0.04)",
                    minWidth: 240,
                    zIndex: 100,
                  }}
                >
                  {PRODUCTS.map(({ label, description, badge, href }) => (
                    <a
                      key={label}
                      href={href.startsWith("#") ? anchorHref(href.slice(1)) : href}
                      onClick={() => setProductsOpen(false)}
                      className="flex flex-col gap-0.5 px-4 py-2.5 hover:bg-black/[0.03] transition-colors"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            fontFamily: "'Funnel Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: 14,
                            color: "#09090B",
                          }}
                        >
                          {label}
                        </span>
                        {badge && (
                          <span
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontWeight: 500,
                              fontSize: 10,
                              letterSpacing: "0.05em",
                              color: "#0070CC",
                              textTransform: "uppercase",
                              backgroundColor: "#EFF8FF",
                              border: "1px solid rgba(0,144,255,0.2)",
                              borderRadius: 9999,
                              padding: "1px 6px",
                            }}
                          >
                            {badge}
                          </span>
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: 12.5,
                          color: "#A1A1AA",
                        }}
                      >
                        {description}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Utility links */}
            {UTILITY_LINKS.map(({ label, anchor, href, external }) => (
              <a
                key={label}
                href={href ?? anchorHref(anchor!)}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
            <p
              className="px-3 pt-2 pb-1"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 10.5,
                letterSpacing: "0.08em",
                color: "#A1A1AA",
                textTransform: "uppercase",
              }}
            >
              Products
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
                      color: "#0070CC",
                      textTransform: "uppercase",
                      backgroundColor: "#EFF8FF",
                      border: "1px solid rgba(0,144,255,0.2)",
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
            {UTILITY_LINKS.map(({ label, anchor, href, external }) => (
              <a
                key={label}
                href={href ?? anchorHref(anchor!)}
                {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => { setMobileOpen(false); if (href?.includes("docs.fil.one")) trackDocsClick(href); }}
                className="flex items-center gap-1 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
                style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 15, color: "#09090B", textDecoration: "none" }}
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

export default PlatformNavbar;
