import { useEffect } from "react";
import { getConsent, onConsent } from "@/lib/consent";

function injectUnify() {
  if (document.getElementById("unifytag")) return;
  // Queue stub — buffers identify/page calls made before the async SDK loads
  const queue: unknown[][] = [];
  const methods = ["identify","page","startAutoPage","stopAutoPage","startAutoIdentify","stopAutoIdentify"] as const;
  const stub = Object.assign(queue, methods.reduce((acc, m) => {
    acc[m] = (...args: unknown[]) => { queue.push([m, args]); return stub; };
    return acc;
  }, {} as Record<string, (...args: unknown[]) => typeof stub>));
  if (!window.unify) (window as Record<string, unknown>).unify = stub;
  if (!window.unifyBrowser) (window as Record<string, unknown>).unifyBrowser = stub;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://tag.unifyintent.com/v1/YAQn6DqaDp1t4jkXxVxH9x/script.js";
  s.setAttribute("data-api-key", "wk_9ePcXoiZ_5iXmeM1Mt5z4yeLPV4tmDyTkdgdJgjtZ");
  s.id = "unifytag";
  (document.body || document.head).appendChild(s);
}

function injectHubSpot() {
  if (document.getElementById("hs-script-loader")) return;
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.id = "hs-script-loader";
  s.async = true;
  s.defer = true;
  s.src = "//js.hs-scripts.com/51191454.js";
  document.body.appendChild(s);
}

function injectAll() {
  injectUnify();
  injectHubSpot();
}

const ConsentManager = () => {
  useEffect(() => {
    if (getConsent() === "accepted") injectAll();
    return onConsent((state) => { if (state === "accepted") injectAll(); });
  }, []);

  return null;
};

export default ConsentManager;
