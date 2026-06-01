/**
 * Consistent section wrapper for landing pages.
 *
 * Handles:
 * - Alternating background colours (white / #F9FAFB)
 * - Consistent horizontal padding and vertical rhythm
 * - Max-width container
 * - Optional scroll-reveal animation via useInView
 */

import { useInView } from "@/hooks/useInView";

interface LandingSectionProps {
  id?: string;
  bg?: "white" | "gray";
  children: React.ReactNode;
  /** Extra className on the outer section */
  className?: string;
  /** Disable the reveal animation (e.g. for above-the-fold content) */
  noReveal?: boolean;
  /** IntersectionObserver threshold. Default 0.05 */
  threshold?: number;
}

const LandingSection = ({
  id,
  bg = "white",
  children,
  className = "",
  noReveal = false,
  threshold = 0.05,
}: LandingSectionProps) => {
  const { ref, inView } = useInView({ threshold });

  return (
    <section
      id={id}
      className={`px-5 md:px-8 py-24 md:py-32 w-full ${className}`}
      style={{ backgroundColor: bg === "gray" ? "#F9FAFB" : "#FFFFFF" }}
    >
      <div
        ref={noReveal ? undefined : ref}
        className={`flex flex-col w-full max-w-[1120px] mx-auto${
          noReveal ? "" : ` reveal${inView ? " in-view" : ""}`
        }`}
      >
        {children}
      </div>
    </section>
  );
};

export default LandingSection;
