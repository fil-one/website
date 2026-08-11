/**
 * Sanitiser for HubSpot article bodies before they go through
 * dangerouslySetInnerHTML.
 *
 * Allowlist, not blocklist: anything not named here is either dropped (dangerous
 * elements) or unwrapped to its text (unknown formatting). A blocklist has to
 * anticipate every vector — `xlink:href`, `srcdoc`, `<base>`, CSS `url()` — and
 * silently passes whatever it forgot.
 */

const ALLOWED_TAGS = new Set([
  "a", "b", "blockquote", "br", "caption", "code", "del", "em", "figcaption",
  "figure", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "li",
  "ol", "p", "pre", "s", "small", "span", "strong", "sub", "sup", "table",
  "tbody", "td", "tfoot", "th", "thead", "tr", "u", "ul",
]);

/** Removed with their contents — their text is markup, not prose. */
const DROPPED_TAGS = new Set([
  "base", "embed", "form", "iframe", "input", "link", "math", "meta", "noscript",
  "object", "script", "select", "style", "svg", "template", "textarea", "title",
]);

const ALLOWED_ATTRIBUTES: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "title", "width", "height", "loading"]),
  td: new Set(["colspan", "rowspan"]),
  th: new Set(["colspan", "rowspan", "scope"]),
};

/** True for http(s)/mailto/tel and relative URLs; false for javascript:, data:, etc. */
export const isSafeUrl = (value: string) => {
  // Drop whitespace and control characters first — they can hide "java\nscript:".
  const url = Array.from(value)
    .filter((character) => character.charCodeAt(0) > 0x20)
    .join("");
  if (!url) return false;

  const scheme = url.match(/^([a-z][a-z0-9+.-]*):/i);
  if (!scheme) return true; // relative path, fragment, or protocol-relative URL
  return /^(https?|mailto|tel)$/i.test(scheme[1]);
};

const sanitizeElement = (element: Element) => {
  const tag = element.tagName.toLowerCase();
  const allowed = ALLOWED_ATTRIBUTES[tag] ?? new Set<string>();

  for (const attribute of Array.from(element.attributes)) {
    const name = attribute.name.toLowerCase();
    if (!allowed.has(name)) {
      element.removeAttribute(attribute.name);
      continue;
    }
    if ((name === "href" || name === "src") && !isSafeUrl(attribute.value)) {
      element.removeAttribute(attribute.name);
    }
  }

  if (tag === "a" && element.getAttribute("target") === "_blank") {
    element.setAttribute("rel", "noopener noreferrer");
  }
};

/** Replace an element with its children, keeping the prose inside it. */
const unwrap = (element: Element) => {
  const parent = element.parentNode;
  if (!parent) {
    element.remove();
    return;
  }
  while (element.firstChild) parent.insertBefore(element.firstChild, element);
  parent.removeChild(element);
};

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  // No DOM (SSR / prerender) — fail closed rather than emitting raw HubSpot HTML.
  if (typeof window === "undefined" || typeof window.DOMParser === "undefined") return "";

  const parsed = new window.DOMParser().parseFromString(html, "text/html");

  // Snapshot first: unwrapping mutates the tree while we walk it.
  for (const element of Array.from(parsed.body.querySelectorAll("*"))) {
    if (!element.isConnected) continue;
    const tag = element.tagName.toLowerCase();

    if (DROPPED_TAGS.has(tag)) {
      element.remove();
      continue;
    }
    if (!ALLOWED_TAGS.has(tag)) {
      unwrap(element);
      continue;
    }
    sanitizeElement(element);
  }

  return parsed.body.innerHTML;
}
