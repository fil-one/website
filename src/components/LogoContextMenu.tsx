import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Check, Copy } from "@phosphor-icons/react";
import Icon from "@/components/Icon";
import { copyText, fetchText } from "@/lib/clipboard";
import type { Lang } from "@/lib/i18n";

const LOGO_SVG = "/brand/fil-one-logo.svg";
const BRAND_HREF = "/brand";
const MENU_WIDTH = 220;

const COPY = {
  en: { label: "Logo options", copy: "Copy logo as SVG", copied: "Copied", brand: "Visit brand kit" },
  es: { label: "Opciones del logo", copy: "Copiar logo como SVG", copied: "Copiado", brand: "Ver kit de marca" },
};

// Item corners sit inside the menu's 6px padding, so they round 6px less than the menu (16px).
const ITEM =
  "flex w-full items-center justify-between gap-2.5 rounded-[10px] px-3 py-2 text-left font-sans text-body-sm text-zinc-950 no-underline outline-none transition-colors hover:bg-black/[0.04] focus-visible:bg-black/[0.04]";

interface LogoContextMenuProps {
  lang?: Lang;
  /** The logo link's contents (the logo image). */
  children: ReactNode;
}

/**
 * The navbar's home link, plus the menu brand sites show when you right-click
 * the logo: copy it as SVG, or go to the brand kit. Also opens from the
 * keyboard's context-menu key or Shift+F10 on the focused link.
 */
const LogoContextMenu = ({ lang = "en", children }: LogoContextMenuProps) => {
  const t = COPY[lang] ?? COPY.en;
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = (refocus = false) => {
    setPos(null);
    setCopied(false);
    if (refocus) linkRef.current?.focus();
  };

  const open = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // A keyboard-triggered contextmenu event has no pointer position; anchor under the link instead.
    const fromKeyboard = e.clientX === 0 && e.clientY === 0;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = fromKeyboard ? rect.left : e.clientX;
    const y = fromKeyboard ? rect.bottom + 6 : e.clientY;
    setPos({ x: Math.min(x, window.innerWidth - MENU_WIDTH - 8), y });
  };

  // While open: focus the first item, and close on outside press, scroll, resize, or blur.
  useEffect(() => {
    if (!pos) return;
    menuRef.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) close();
    };
    const dismiss = () => close();
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("scroll", dismiss, { passive: true });
    window.addEventListener("resize", dismiss);
    window.addEventListener("blur", dismiss);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("scroll", dismiss);
      window.removeEventListener("resize", dismiss);
      window.removeEventListener("blur", dismiss);
    };
  }, [pos]);

  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = [...(menuRef.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? [])];
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    } else if (e.key === "Tab") {
      close();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[next]?.focus();
    }
  };

  const copyLogo = async () => {
    try {
      await copyText(fetchText(LOGO_SVG));
      setCopied(true);
      // Leave the confirmation up for a beat before the menu goes away.
      setTimeout(() => close(true), 900);
    } catch {
      close(true);
    }
  };

  return (
    <>
      <a ref={linkRef} href="/" onContextMenu={open} className="flex h-11 shrink-0 items-center no-underline">
        {children}
      </a>
      {/* Portaled: the navbar's backdrop blur would otherwise become the fixed menu's containing block. */}
      {pos &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label={t.label}
            onKeyDown={onMenuKey}
            style={{ top: pos.y, left: pos.x, width: MENU_WIDTH }}
            className="fixed z-[60] flex flex-col rounded-2xl border border-black/[0.07] bg-white p-1.5 shadow-dropdown"
          >
            <button type="button" role="menuitem" onClick={copyLogo} className={ITEM}>
              <span aria-live="polite">{copied ? t.copied : t.copy}</span>
              <Icon icon={copied ? Check : Copy} size={16} className="text-zinc-500" />
            </button>
            <a role="menuitem" href={BRAND_HREF} onClick={() => close()} className={ITEM}>
              {t.brand}
            </a>
          </div>,
          document.body,
        )}
    </>
  );
};

export default LogoContextMenu;
