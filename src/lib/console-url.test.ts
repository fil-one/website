import { describe, it, expect, afterEach } from "vitest";
import { consoleOrigin, consoleUrl, signupUrl } from "./console-url";

/**
 * jsdom's window.location.hostname is read-only, so each case swaps in a stub and
 * the afterEach puts the real one back.
 */
const realLocation = window.location;

function servedFrom(hostname: string) {
  Object.defineProperty(window, "location", {
    value: { ...realLocation, hostname },
    writable: true,
    configurable: true,
  });
}

describe("console-url", () => {
  afterEach(() => {
    Object.defineProperty(window, "location", {
      value: realLocation,
      writable: true,
      configurable: true,
    });
  });

  it("uses the canonical console on the canonical site", () => {
    servedFrom("www.fil.one");
    expect(consoleOrigin()).toBe("https://app.fil.one");
  });

  // The point of the whole change: a visitor on the demo alias must not be sent
  // to the console on the domain the alias exists to avoid.
  it.for([["filone.ai"], ["www.filone.ai"], ["FILONE.AI"]])(
    "keeps visitors on the alias console when served from %s",
    ([hostname]) => {
      servedFrom(hostname);
      expect(consoleOrigin()).toBe("https://app.filone.ai");
    },
  );

  it.for([
    ["an unrelated host", "example.com"],
    ["a suffix attack", "filone.ai.example.com"],
    ["a host merely containing the alias", "notfilone.ai"],
    ["local development", "localhost"],
  ])("falls back to the canonical console for %s", ([, hostname]) => {
    servedFrom(hostname);
    expect(consoleOrigin()).toBe("https://app.fil.one");
  });

  it("appends the requested path", () => {
    servedFrom("filone.ai");
    expect(consoleUrl("/login")).toBe("https://app.filone.ai/login");
  });

  it("returns the bare origin when given no path", () => {
    servedFrom("www.fil.one");
    expect(consoleOrigin()).toBe("https://app.fil.one");
  });

  it("builds the sign-up URL on the current host's console", () => {
    servedFrom("filone.ai");
    expect(signupUrl()).toBe("https://app.filone.ai/login?screen_hint=signup");
    servedFrom("www.fil.one");
    expect(signupUrl()).toBe("https://app.fil.one/login?screen_hint=signup");
  });
});
