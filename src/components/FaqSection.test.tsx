import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FaqSection from "./FaqSection";

// Mock useInView so we don't need IntersectionObserver
vi.mock("@/hooks/useInView", () => ({
  useInView: () => ({ ref: { current: null }, inView: true }),
}));

describe("FaqSection — analytics", () => {
  let plausibleSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    plausibleSpy = vi.fn();
    window.plausible = plausibleSpy;
  });

  afterEach(() => {
    // @ts-expect-error — cleaning up test mock
    delete window.plausible;
  });

  it('fires "FAQ Expand" when a question is clicked', () => {
    render(<FaqSection />);

    const firstQuestion = screen.getByText(
      "Is Fil One hot, warm, or cold storage? Is it like Glacier?",
    );
    fireEvent.click(firstQuestion);

    expect(plausibleSpy).toHaveBeenCalledWith("FAQ Expand", {
      props: expect.objectContaining({
        question: expect.stringContaining("Is Fil One hot"),
        page: window.location.pathname,
      }),
    });
  });

  it("does not fire again when collapsing the same question", () => {
    render(<FaqSection />);

    const firstQuestion = screen.getByText(
      "Is Fil One hot, warm, or cold storage? Is it like Glacier?",
    );

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

    const q1 = screen.getByText(
      "Is Fil One hot, warm, or cold storage? Is it like Glacier?",
    );
    const q2 = screen.getByText(
      "How does data integrity verification work with Fil One?",
    );

    fireEvent.click(q1);
    fireEvent.click(q2);

    const faqCalls = plausibleSpy.mock.calls.filter(
      (c: unknown[]) => c[0] === "FAQ Expand",
    );
    expect(faqCalls).toHaveLength(2);
    expect(faqCalls[0][1].props.question).toContain("hot");
    expect(faqCalls[1][1].props.question).toContain("integrity");
  });
});
