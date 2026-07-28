import { Link, useLocation } from "react-router-dom";
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
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content" className="flex flex-col items-center px-5 md:px-8 pt-40 md:pt-48 pb-28 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[520px]">

          {/* Error label */}
          <p className="font-mono font-medium text-[11.5px] tracking-[0.08em] uppercase text-zinc-500 m-0">
            Error 404
          </p>

          {/* Heading + body */}
          <div className="flex flex-col gap-4">
            <h1 className="font-display font-medium text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.025em] text-zinc-950 m-0">
              Page not found
            </h1>
            <p className="font-sans font-normal text-[15.5px] leading-[1.6] text-zinc-500 m-0">
              The page at{" "}
              <code className="font-mono text-[13.5px] text-zinc-700 bg-black/[0.04] px-1.5 py-px rounded-[5px] border border-black/[0.07]">
                {location.pathname}
              </code>{" "}
              doesn't exist. It may have been moved or deleted.
            </p>
          </div>

          <div className="h-px bg-black/[0.07]" />

          {/* Quick links */}
          <div className="flex flex-col gap-2">
            <p className="font-sans font-medium text-[12.5px] tracking-[0.01em] text-zinc-950 mb-1">
              Here are some helpful links
            </p>
            {LINKS.map(({ icon: Icon, label, description, href, external }) => {
              const cardClass =
                "group flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border border-black/[0.07] no-underline transition-colors hover:bg-black/[0.03]";
              const inner = (
                <>
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-black/[0.04]">
                      <Icon size={15} className="text-zinc-600" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-sans font-medium text-[14px] text-zinc-950">
                        {label}
                      </span>
                      <span className="font-sans font-normal text-[13px] text-zinc-500">
                        {description}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-zinc-600 transition-transform group-hover:translate-x-0.5"
                  />
                </>
              );

              return external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {inner}
                </a>
              ) : (
                <Link key={label} to={href} className={cardClass}>
                  {inner}
                </Link>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
