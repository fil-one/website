/**
 * Top-level landing page shell.
 *
 * Wraps content with LandingNavbar + LandingFooter and the shared
 * page-level styles (white bg, no horizontal overflow).
 */

import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";

interface LandingPageProps {
  children: React.ReactNode;
}

const LandingPage = ({ children }: LandingPageProps) => (
  <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
    <LandingNavbar />
    <main id="main-content">{children}</main>
    <LandingFooter />
  </div>
);

export default LandingPage;
