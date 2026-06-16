const KEY = "fil_consent";

export type ConsentState = "accepted" | "declined" | null;

export function getConsent(): ConsentState {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "accepted" || v === "declined") return v;
  } catch {}
  return null;
}

export function setConsent(state: "accepted" | "declined") {
  try {
    localStorage.setItem(KEY, state);
    window.dispatchEvent(new CustomEvent("fil:consent", { detail: state }));
  } catch {}
}

export function onConsent(cb: (state: "accepted" | "declined") => void) {
  const handler = (e: Event) => cb((e as CustomEvent).detail);
  window.addEventListener("fil:consent", handler);
  return () => window.removeEventListener("fil:consent", handler);
}
