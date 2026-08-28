import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FaqSection from "./FaqSection";

// Mock useInView so we don't need IntersectionObserver
vi.mock("@/hooks/useInView", () => ({
  useInView: () => ({ ref: { current: null as HTMLDivElement | null }, inView: true }),
}));

describe("FaqSection — analytics", () => {
  let plausibleSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    plausibleSpy = vi.fn();
    window.plausible = plausibleSpy;
  });

  afterEach(() => {
    delete window.plausible;
  });

  const Q1 = "How do I stop data from being altered or deleted?";
  const Q2 = "Is Fil One compatible with my existing tools?";

  it('fires "FAQ Expand" when a question is clicked', () => {
    render(<FaqSection />);

    const firstQuestion = screen.getByText(Q1);
    fireEvent.click(firstQuestion);

    expect(plausibleSpy).toHaveBeenCalledWith("FAQ Expand", {
      props: expect.objectContaining({
        question: expect.stringContaining("altered or deleted"),
        page: window.location.pathname,
      }),
    });
  });

  it("does not fire again when collapsing the same question", () => {
    render(<FaqSection />);

    const firstQuestion = screen.getByText(Q1);

    // Expand
    fireEvent.click(firstQuestion);
    const expandCalls = plausibleSpy.mock.calls.filter(
      (c: unknown[]) => c[0] === "FAQ Expand",
    ).length;

    // Collapse
    fireEvent.click(firstQuestion);
    const collapseCalls = plausibleSpy.mock.calls.filter(
      (c: unknown[]) => c[0] === "FAQ Expand",
    ).length;

    expect(collapseCalls).toBe(expandCalls); // no new FAQ Expand call
  });

  it("fires for different questions independently", () => {
    render(<FaqSection />);

    const q1 = screen.getByText(Q1);
    const q2 = screen.getByText(Q2);

    fireEvent.click(q1);
    fireEvent.click(q2);

    const faqCalls = plausibleSpy.mock.calls.filter(
      (c: unknown[]) => c[0] === "FAQ Expand",
    );
    expect(faqCalls).toHaveLength(2);
    expect(faqCalls[0][1].props.question).toContain("altered or deleted");
    expect(faqCalls[1][1].props.question).toContain("compatible");
  });
});
