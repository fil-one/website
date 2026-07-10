import { useEffect } from "react";

/**
 * Sets <html lang> for the current route while the component is mounted, then
 * restores "en" (the app default) on unmount.
 *
 * Prerendering bakes the correct lang into each page's static HTML for crawlers;
 * this keeps the attribute correct during client-side SPA navigation, where the
 * <html> element persists across route changes (WCAG 3.1.1). English pages don't
 * call this — they rely on the default "en" — so cleanup always resets to "en".
 */
export function useLang(lang: string | undefined) {
  useEffect(() => {
    if (!lang || lang === "en") return;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "en";
    };
  }, [lang]);
}
