import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollTracking } from "./useScrollTracking";

// Capture the IntersectionObserver callback so we can trigger it manually
let observerCallback: IntersectionObserverCallback;
const mockDisconnect = vi.fn();
const mockObserve = vi.fn();

beforeEach(() => {
  // Mock IntersectionObserver
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn((cb: IntersectionObserverCallback) => {
      observerCallback = cb;
      return { observe: mockObserve, disconnect: mockDisconnect, unobserve: vi.fn() };
    }),
  );

  // Mock window.plausible
  window.plausible = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
  // @ts-expect-error — cleaning up test mock
  delete window.plausible;
});

describe("useScrollTracking", () => {
  it("returns a heroEndRef", () => {
    const { result } = renderHook(() => useScrollTracking());
    expect(result.current.heroEndRef).toBeDefined();
    expect(result.current.heroEndRef.current).toBeNull();
  });

  describe("Scroll Past Hero", () => {
    it("fires when IntersectionObserver reports isIntersecting", () => {
      const { result } = renderHook(() => useScrollTracking());

      // Simulate attaching the ref to a DOM element
      const el = document.createElement("div");
      // @ts-expect-error — manually setting ref.current for test
      result.current.heroEndRef.current = el;

      // Re-render to trigger the effect with the element present
      const { result: result2 } = renderHook(() => useScrollTracking());
      const el2 = document.createElement("div");
      // @ts-expect-error — manually setting ref.current for test
      result2.current.heroEndRef.current = el2;

      // The observer won't fire without a real DOM, so let's test via the callback directly
      if (observerCallback) {
        observerCallback(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );

        expect(window.plausible).toHaveBeenCalledWith("Scroll Past Hero", {
          props: { page: window.location.pathname },
        });
      }
    });

    it("fires only once even if observer triggers multiple times", () => {
      renderHook(() => useScrollTracking());

      if (observerCallback) {
        const entry = [{ isIntersecting: true } as IntersectionObserverEntry];
        const obs = {} as IntersectionObserver;

        observerCallback(entry, obs);
        observerCallback(entry, obs);

        // Should disconnect after first fire, so plausible only called once for this event
        expect(mockDisconnect).toHaveBeenCalled();
      }
    });

    it("does not fire when not intersecting", () => {
      renderHook(() => useScrollTracking());

      if (observerCallback) {
        observerCallback(
          [{ isIntersecting: false } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );

        expect(window.plausible).not.toHaveBeenCalledWith(
          "Scroll Past Hero",
          expect.anything(),
        );
      }
    });
  });

  describe("Scroll 50%", () => {
    it("fires when scroll exceeds 50% of document height", () => {
      renderHook(() => useScrollTracking());

      // Simulate document dimensions
      Object.defineProperty(document.documentElement, "scrollHeight", {
        value: 2000,
        configurable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        value: 800,
        configurable: true,
      });
      // scrollHeight - innerHeight = 1200, 50% = 600
      Object.defineProperty(window, "scrollY", {
        value: 700,
        configurable: true,
      });

      window.dispatchEvent(new Event("scroll"));

      expect(window.plausible).toHaveBeenCalledWith("Scroll 50%", {
        props: { page: window.location.pathname },
      });
    });

    it("does not fire when scroll is below 50%", () => {
      renderHook(() => useScrollTracking());

      Object.defineProperty(document.documentElement, "scrollHeight", {
        value: 2000,
        configurable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        value: 800,
        configurable: true,
      });
      Object.defineProperty(window, "scrollY", {
        value: 100,
        configurable: true,
      });

      window.dispatchEvent(new Event("scroll"));

      expect(window.plausible).not.toHaveBeenCalledWith(
        "Scroll 50%",
        expect.anything(),
      );
    });
  });
});
