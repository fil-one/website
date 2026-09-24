import { useEffect, useLayoutEffect, useRef, useState } from "react";

// useLayoutEffect warns during server rendering; fall back to useEffect there.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Destructure into primitives so the effect depends on stable values rather
  // than the caller's (usually inline, new-every-render) options object.
  const { root, rootMargin, threshold } = options ?? {};

  // Content already on screen at mount (above the fold) is shown immediately,
  // before first paint and with its `.reveal` transition suppressed, so the
  // first thing a visitor sees is never hidden or sliding in.
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.style.transition = "none";
      setInView(true);
      // Hand transitions back (e.g. hover states) once the visible state has painted.
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.transition = "";
        })
      );
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: threshold ?? 0.12, root, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return { ref, inView };
}
