import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { House, ArrowRight, BookOpen, Headset } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";

const LINKS = [
  {
    icon: House,
    label: "Home",
    description: "Back to the main site",
    href: "/",
  },
  {
    icon: BookOpen,
    label: "Documentation",
    description: "Guides, API reference, quickstarts",
    href: "https://docs.fil.one",
    external: true,
  },
  {
    icon: Headset,
    label: "Support",
    description: "Get help from our team",
    href: "/support",
  },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />

      <main className="flex flex-col items-center px-5 md:px-8 pt-32 pb-28 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[520px]">

          {/* Error label */}
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 500,
              fontSize: 11.5,
              letterSpacing: "0.08em",
              color: "#71717A",
              textTransform: "uppercase",
            }}
          >
            Error 404
          </p>

          {/* Heading + body */}
          <div className="flex flex-col gap-4">
            <h1
              className="text-[36px] md:text-[48px]"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.1",
                letterSpacing: "-0.025em",
                color: "#09090B",
              }}
            >
              Page not found
            </h1>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 15.5,
                lineHeight: "1.6",
                color: "#71717A",
              }}
            >
              The page at{" "}
              <code
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13.5,
                  color: "#3F3F46",
                  backgroundColor: "rgba(0,0,0,0.04)",
                  padding: "1px 6px",
                  borderRadius: 5,
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                {location.pathname}
              </code>{" "}
              doesn't exist. It may have been moved or deleted.
            </p>
          </div>

          <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

          {/* Quick links */}
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 12.5,
                letterSpacing: "0.01em",
                color: "#09090B",
                marginBottom: 4,
              }}
            >
              Here are some helpful links
            </p>
            {LINKS.map(({ icon: Icon, label, description, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl transition-colors hover:bg-black/[0.03]"
                style={{
                  border: "1px solid rgba(0,0,0,0.07)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                  >
                    <Icon size={15} color="#52525B" />
                  </div>
                  <div className="flex flex-col gap-0.5">
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
                    <span
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#71717A",
                      }}
                    >
                      {description}
                    </span>
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  color="#A1A1AA"
                  className="shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
