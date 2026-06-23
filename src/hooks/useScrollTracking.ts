import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Tracks two scroll-engagement milestones per page load:
 *
 * 1. **Scroll Past Hero** — fires when the element referenced by `heroEndRef`
 *    enters the viewport (attach the ref to the first section after the hero).
 * 2. **Scroll 50 %** — fires when the visitor scrolls past 50 % of the page.
 *
 * Both events fire at most once and include a `page` prop with the pathname.
 */
export function useScrollTracking() {
  const heroEndRef = useRef<HTMLDivElement>(null);
  const firedHero = useRef(false);
  const fired50 = useRef(false);

  // Hero exit — Intersection Observer
  useEffect(() => {
    const el = heroEndRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedHero.current) {
          firedHero.current = true;
          trackEvent("Scroll Past Hero", { page: window.location.pathname });
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 50 % scroll depth
  useEffect(() => {
    function onScroll() {
      if (fired50.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollTop / docHeight >= 0.5) {
        fired50.current = true;
        trackEvent("Scroll 50%", { page: window.location.pathname });
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { heroEndRef };
}
