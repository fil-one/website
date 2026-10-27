/**
 * Copies text to the clipboard. Pass a loader for text that has to be fetched
 * on click (e.g. an SVG file): the clipboard gets a pending blob, so Safari
 * keeps the click's user activation across the fetch. Rejects when the
 * clipboard is blocked (insecure context, permissions).
 */
export async function copyText(value: string | (() => Promise<string>)): Promise<void> {
  if (typeof value === "string") {
    await navigator.clipboard.writeText(value);
  } else if (typeof ClipboardItem !== "undefined") {
    const blob = value().then((t) => new Blob([t], { type: "text/plain" }));
    await navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })]);
  } else {
    await navigator.clipboard.writeText(await value());
  }
}

/** Fetches a same-origin text file, e.g. a logo SVG, for `copyText`. */
export const fetchText = (path: string) => () => fetch(path).then((r) => r.text());
