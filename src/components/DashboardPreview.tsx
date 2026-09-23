import { useEffect, useRef } from "react";
import imgDashboard from "../assets/dashboard-preview.webp";

// Scroll-driven "grow in" effect: the screenshot starts slightly undersized
// as it enters view and eases up to its natural size as the visitor scrolls
// past it. Progress 0 = frame just entering at the bottom of the viewport,
// progress 1 = frame top has reached a fifth of the way down the viewport.
const START_SCALE = 0.92;
const END_SCALE = 1.0;
const ENTER_AT = 0.92; // frame top as a fraction of viewport height where the effect starts
const SETTLE_AT = 0.2; // frame top as a fraction of viewport height where the effect ends

/**
 * The product-screenshot showcase that sits directly below the hero.
 * Own `overflow-hidden` wrapper replicates the clipping the hero <section>
 * used to provide for the frame's negative clip-path and fade gradients.
 */
const DashboardPreview = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ticking = false;

    const apply = () => {
      ticking = false;
      const vh = window.innerHeight;
      const top = frame.getBoundingClientRect().top;
      const enterY = vh * ENTER_AT;
      const settleY = vh * SETTLE_AT;
      const progress = Math.min(1, Math.max(0, (enterY - top) / (enterY - settleY)));
      const scale = START_SCALE + (END_SCALE - START_SCALE) * progress;
      frame.style.transform = `scale(${scale})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
  <div className="relative w-full overflow-hidden px-5 md:px-8">
    <div className="relative pb-0 pt-12 md:pt-16 max-w-container mx-auto w-full hero-fade-4">
      <div
        ref={frameRef}
        className="relative w-full rounded-t-[12px] md:rounded-t-[16px] overflow-hidden will-change-transform"
        style={{
          background: "linear-gradient(#fff, #fff) padding-box, linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.10) 80%, rgba(0,0,0,0) 100%) border-box",
          border: "1px solid transparent",
          borderBottom: "none",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.06)",
          clipPath: "inset(-40px -40px 0 -40px)",
          transformOrigin: "center top",
        }}
      >
        <img
          ref={imgRef}
          src={imgDashboard}
          alt="The Fil One console's Buckets page, listing buckets with their size, object count, region and creation date"
          width={2000}
          height={1060}
          className="w-full h-auto block"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0) 40%, #FFFFFF 75%)",
          }}
        />
      </div>
      <div
        className="absolute bottom-0 pointer-events-none"
        style={{
          top: "55%",
          left: "-80px",
          right: "-80px",
          background: "linear-gradient(to bottom, transparent, #FFFFFF 65%)",
        }}
      />
    </div>
  </div>
  );
};

export default DashboardPreview;
