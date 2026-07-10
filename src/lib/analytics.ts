/**
 * Plausible Analytics event tracking utilities.
 *
 * All custom events fire through `trackEvent` which wraps `window.plausible()`.
 * Higher-level helpers (`trackCtaClick`, `trackDocsClick`) standardise prop
 * shapes so every call-site stays consistent.
 */

declare global {
  interface Window {
    // Optional: the Plausible script may not have loaded (and tests delete it),
    // so every call site guards with `if (window.plausible)`.
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

export function trackEvent(
  event: string,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(event, props ? { props } : undefined);
  }
}

/** Track a CTA button click (btn-primary / btn-secondary). */
export function trackCtaClick(
  label: string,
  destination: string,
  variant: "primary" | "secondary",
) {
  trackEvent("CTA Click", {
    label,
    page: window.location.pathname,
    destination,
    variant,
  });
}

/** Track a click on any docs.fil.one link. */
export function trackDocsClick(linkUrl: string) {
  trackEvent("Docs Click", {
    page: window.location.pathname,
    link_url: linkUrl,
  });
}
