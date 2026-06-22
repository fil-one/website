import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import filOneLogo from "../assets/fil-one-logo.svg";

const LandingNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            className="md:hidden border-t px-5 py-3 flex flex-col gap-2"
            style={{
              backgroundColor: "rgba(255,255,255,0.97)",
              borderColor: "rgba(0,0,0,0.06)",
            }}
          >
            <a
              href="https://app.fil.one/login"
              className="btn-secondary w-full text-center"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </a>
            <a
              href="https://app.fil.one/login?screen_hint=signup"
              className="btn-primary w-full"
              onClick={() => setMobileOpen(false)}
            >
              <span className="btn-primary-inner w-full justify-center">Sign up</span>
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default LandingNavbar;
