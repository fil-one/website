import { useEffect, useState } from "react";
import { Headset } from "@phosphor-icons/react";
import Icon from "@/components/Icon";

const SHOW_AFTER_PX = 400;

/**
 * Floating support shortcut that fades in once the visitor has scrolled past
 * the hero, so it doesn't compete with the navbar's own links up top.
 */
const FloatingSupportButton = ({ href }: { href: string }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={href}
      aria-label="Support"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-elevated transition-all duration-200 hover:bg-brand-600 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <Icon icon={Headset} size={20} />
    </a>
  );
};

export default FloatingSupportButton;
