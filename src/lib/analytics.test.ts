import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { trackEvent, trackCtaClick, trackDocsClick } from "./analytics";

describe("analytics", () => {
  let plausibleSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    plausibleSpy = vi.fn();
    window.plausible = plausibleSpy;
  });

  afterEach(() => {
    delete window.plausible;
  });

  describe("trackEvent", () => {
    it("calls window.plausible with event name and props", () => {
      trackEvent("Test Event", { key: "value" });

      expect(plausibleSpy).toHaveBeenCalledOnce();
      expect(plausibleSpy).toHaveBeenCalledWith("Test Event", {
        props: { key: "value" },
      });
    });

    it("calls window.plausible without props when none provided", () => {
      trackEvent("Simple Event");

      expect(plausibleSpy).toHaveBeenCalledWith("Simple Event", undefined);
    });

    it("is a no-op when window.plausible is undefined", () => {
      delete window.plausible;

      expect(() => trackEvent("Should Not Crash")).not.toThrow();
    });
  });

  describe("trackCtaClick", () => {
    it('sends "CTA Click" with label, page, destination, variant', () => {
      trackCtaClick("Sign up", "https://app.fil.one", "primary");

      expect(plausibleSpy).toHaveBeenCalledWith("CTA Click", {
        props: {
          label: "Sign up",
          page: window.location.pathname,
          destination: "https://app.fil.one",
          variant: "primary",
        },
      });
    });

    it("passes secondary variant correctly", () => {
      trackCtaClick("Contact", "/contact-sales", "secondary");

      expect(plausibleSpy).toHaveBeenCalledWith("CTA Click", {
        props: expect.objectContaining({ variant: "secondary" }),
      });
    });
  });

  describe("trackDocsClick", () => {
    it('sends "Docs Click" with page and link_url', () => {
      trackDocsClick("https://docs.fil.one/quickstart");

      expect(plausibleSpy).toHaveBeenCalledWith("Docs Click", {
        props: {
          page: window.location.pathname,
          link_url: "https://docs.fil.one/quickstart",
        },
      });
    });
  });
});
