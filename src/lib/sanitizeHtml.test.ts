import { describe, it, expect } from "vitest";
import { isSafeUrl, sanitizeHtml } from "./sanitizeHtml";

describe("sanitizeHtml", () => {
  it("drops script, style and iframe elements with their contents", () => {
    const html = sanitizeHtml(
      '<p>Keep</p><script>alert(1)</script><style>p{color:red}</style><iframe src="https://x"></iframe>'
    );
    expect(html).toBe("<p>Keep</p>");
  });

  it("strips event-handler attributes", () => {
    expect(sanitizeHtml('<p onclick="alert(1)">Hi</p>')).toBe("<p>Hi</p>");
    expect(sanitizeHtml('<img src="https://x/a.png" onerror="alert(1)">')).not.toContain("onerror");
  });

  it("removes javascript: and data: URLs but keeps http and relative ones", () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).toBe("<a>x</a>");
    expect(sanitizeHtml('<a href="java\tscript:alert(1)">x</a>')).toBe("<a>x</a>");
    expect(sanitizeHtml('<img src="data:text/html,<script>">')).toBe("<img>");
    expect(sanitizeHtml('<a href="https://fil.one">x</a>')).toBe('<a href="https://fil.one">x</a>');
    expect(sanitizeHtml('<a href="/pricing">x</a>')).toBe('<a href="/pricing">x</a>');
  });

  it("unwraps unknown elements but keeps their text", () => {
    expect(sanitizeHtml("<section><p>Body</p></section>")).toBe("<p>Body</p>");
    expect(sanitizeHtml("<marquee>Text</marquee>")).toBe("Text");
  });

  it("keeps only allowlisted attributes", () => {
    expect(sanitizeHtml('<p class="hs-cta" id="x" style="color:red">Hi</p>')).toBe("<p>Hi</p>");
    expect(sanitizeHtml('<img src="/a.png" alt="A" width="10">')).toBe('<img src="/a.png" alt="A" width="10">');
    expect(sanitizeHtml('<table><tr><td colspan="2">A</td></tr></table>')).toContain('colspan="2"');
  });

  it("forces noopener on target=_blank links", () => {
    expect(sanitizeHtml('<a href="https://x" target="_blank">x</a>')).toContain('rel="noopener noreferrer"');
  });

  it("returns an empty string for empty input", () => {
    expect(sanitizeHtml("")).toBe("");
  });
});

describe("isSafeUrl", () => {
  it.each(["https://fil.one", "http://fil.one", "mailto:hi@fil.one", "tel:+1", "/blog", "#anchor", "//cdn.fil.one/a.png"])(
    "allows %s",
    (url) => expect(isSafeUrl(url)).toBe(true)
  );

  it.each(["javascript:alert(1)", " javascript:alert(1)", "JaVaScRiPt:alert(1)", "data:text/html,x", "vbscript:x", ""])(
    "rejects %s",
    (url) => expect(isSafeUrl(url)).toBe(false)
  );
});

describe("rel handling", () => {
  it("keeps existing rel tokens when adding noopener", () => {
    const html = sanitizeHtml('<a href="https://x" target="_blank" rel="nofollow author">x</a>');
    const rel = html.match(/rel="([^"]*)"/)?.[1].split(" ").sort();
    expect(rel).toEqual(["author", "nofollow", "noopener", "noreferrer"]);
  });

  it("does not duplicate tokens already present", () => {
    const html = sanitizeHtml('<a href="https://x" target="_blank" rel="noopener">x</a>');
    expect(html.match(/rel="([^"]*)"/)?.[1]).toBe("noopener noreferrer");
  });

  it("leaves rel alone on same-tab links", () => {
    expect(sanitizeHtml('<a href="https://x" rel="nofollow">x</a>')).toContain('rel="nofollow"');
  });
});
