import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CtaSection from "./CtaSection";

// Mock useInView so we don't need IntersectionObserver
vi.mock("@/hooks/useInView", () => ({
  useInView: () => ({ ref: { current: null as HTMLDivElement | null }, inView: true }),
}));

describe("CtaSection — analytics", () => {
  let plausibleSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    plausibleSpy = vi.fn();
    window.plausible = plausibleSpy;
  });

  afterEach(() => {
    delete window.plausible;
  });

  it('fires "CTA Click" with primary variant when primary CTA is clicked', () => {
    render(<CtaSection />);

    const primaryLink = screen.getByText("Start at no cost to you").closest("a")!;
    fireEvent.click(primaryLink);

    expect(plausibleSpy).toHaveBeenCalledWith("CTA Click", {
      props: expect.objectContaining({
        label: "Start at no cost to you",
        variant: "primary",
        destination: "https://app.fil.one/login?screen_hint=signup",
      }),
    });
  });

  it('fires "CTA Click" with secondary variant when secondary CTA is clicked', () => {
    render(<CtaSection />);

    const secondaryLink = screen.getByText("Talk to our team");
    fireEvent.click(secondaryLink);

    expect(plausibleSpy).toHaveBeenCalledWith("CTA Click", {
      props: expect.objectContaining({
        label: "Talk to our team",
        variant: "secondary",
        destination: "/contact-sales",
      }),
    });
  });
});
