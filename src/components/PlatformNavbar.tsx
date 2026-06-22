import { useState, useEffect, useRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { List, X, ArrowUpRight, CaretDown, Brain, LinkSimple, FilmSlate, ShieldCheck } from "@phosphor-icons/react";
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
    label: "Bucket Intelligence",
    description: "Turn buckets into knowledge bases",
    badge: "Coming soon",
    href: "/bucket-intelligence",
  },
  {
    label: "AI Agent Toolkit",
    description: "MCP, OAuth & SDK integrations",
    badge: "Coming soon",
    href: "/ai-agent-toolkit",
  },
];

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

const UTILITY_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Enterprise", href: "/enterprise" },
];

const UTILITY_BAR_LINKS = [
  { label: "Documentation", href: "https://docs.fil.one", external: true },
  { label: "Partners", href: "/partners" },
  { label: "Support", href: "/support" },
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

const PlatformNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [utilityVisible, setUtilityVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();

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

      <a href="#main-content" className="skip-link">Skip to main content</a>

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
              {external && <ArrowUpRight size={11} style={{ color: "#A1A1AA", marginTop: 1 }} aria-hidden="true" />}
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
            Sign in
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className="fixed left-0 right-0 z-50 border-b px-6 md:px-12"
        style={{
          top: utilityVisible ? UTILITY_BAR_HEIGHT : 0,
          transition: "top 0.2s ease",
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
                    Products
                    <CaretDown size={12} color="#A1A1AA" className="nav-caret" />
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
                                  color: "#0070CC",
                                  textTransform: "uppercase",
                                  backgroundColor: "#EFF8FF",
                                  border: "1px solid rgba(0,144,255,0.2)",
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
                    Solutions
                    <CaretDown size={12} color="#A1A1AA" className="nav-caret" />
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
            <a href="/contact-sales" className="btn-secondary">
              Contact Sales
            </a>
            <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-sm">
              <span className="btn-primary-inner">Start for free</span>
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
              Solutions
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
              <a href="/contact-sales" className="btn-secondary w-full text-center" onClick={() => setMobileOpen(false)}>
                Contact Sales
              </a>
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary w-full" onClick={() => setMobileOpen(false)}>
                <span className="btn-primary-inner w-full justify-center">Start for free</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default PlatformNavbar;
