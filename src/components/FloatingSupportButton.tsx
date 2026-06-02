import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatCircle } from "@phosphor-icons/react";

const FloatingSupportButton = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on /support and on ads landing pages (/:lang/:city) but not on /lp/* pages
  const segments = pathname.split("/").filter(Boolean);
  const isAdsPage = segments.length === 2 && segments[0] !== "lp";
  const isSpanishLP = pathname.startsWith("/lp/es");
  const isBarcelonaEN = pathname.startsWith("/lp/barcelona");
  const supportHref = isSpanishLP ? "/lp/es/soporte" : isBarcelonaEN ? "/lp/barcelona/support" : "/support";
  const supportLabel = isSpanishLP ? "Soporte" : "Support";
  if (pathname === "/support" || pathname === "/lp/es/soporte" || pathname === "/lp/barcelona/support" || isAdsPage) return null;

  return (
    <a
      href={supportHref}
      aria-label={isSpanishLP ? "Obtener soporte" : "Get support"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 13px",
        borderRadius: 999,
        backgroundColor: hovered ? "#F4F4F5" : "#FFFFFF",
        border: `1px solid ${hovered ? "rgba(0,0,0,0.16)" : "rgba(0,0,0,0.10)"}`,
        color: hovered ? "#09090B" : "#52525B",
        fontFamily: "'Funnel Sans', sans-serif",
        fontWeight: 400,
        fontSize: 13,
        textDecoration: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 200ms ease, transform 200ms ease, background-color 150ms ease, border-color 150ms ease, color 150ms ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ChatCircle size={14} />
      {supportLabel}
    </a>
  );
};

export default FloatingSupportButton;
