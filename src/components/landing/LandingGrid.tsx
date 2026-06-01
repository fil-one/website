/**
 * Grid texture + blue radial glow background used in landing page heroes.
 *
 * Props let each page tune the glow intensity and mask shape without
 * breaking the shared visual language.
 */

const GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="1"/></svg>'
);

interface LandingGridProps {
  /** CSS radial-gradient for the blue glow. Defaults to the Barcelona/standard glow. */
  glow?: string;
  /** CSS mask-image for the grid texture fade. */
  gridMask?: string;
}

const LandingGrid = ({
  glow = "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
  gridMask = "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
}: LandingGridProps) => (
  <>
    {/* Blue radial glow */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none -z-10"
      style={{ background: glow }}
    />
    {/* Grid texture */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none -z-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
        backgroundSize: "60px 60px",
        backgroundPosition: "center top",
        maskImage: gridMask,
        WebkitMaskImage: gridMask,
      }}
    />
  </>
);

export default LandingGrid;
