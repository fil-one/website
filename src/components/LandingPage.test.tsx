import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ArrowsOut } from "@phosphor-icons/react";
import LandingPage, { type LandingPageConfig } from "./LandingPage";

// Mock useInView so we don't need IntersectionObserver
vi.mock("@/hooks/useInView", () => ({
  useInView: () => ({ ref: { current: null as HTMLDivElement | null }, inView: true }),
}));

vi.mock("@/hooks/useSeo", () => ({ useSeo: () => {} }));

// The navbar and footer pull in routing and assets we don't care about here.
vi.mock("@/components/PlatformNavbar", () => ({ default: () => <nav /> }));
vi.mock("@/components/Footer", () => ({ default: () => <footer /> }));

const BASE: LandingPageConfig = {
  seo: { title: "t", description: "d", canonical: "https://www.fil.one/lp/test" },
  hero: {
    title: "Title",
    description: "Description",
    ctas: [{ label: "Start", href: "/start", variant: "primary" }],
    tagline: "Tagline",
  },
  cta: { heading: "Closing", subhead: "Sub", cta: { label: "Go", href: "/go" } },
};

const PROBLEM = {
  label: "The trap",
  heading: "Problem heading",
  sub: "Problem sub",
  items: [{ label: "One", catch: "Catch", body: "Body" }],
};

const COMPARISON = {
  label: "Compare",
  heading: "Comparison heading",
  sub: "Comparison sub",
  caption: "Cost by provider",
  columns: [{ key: "total", header: "Total", total: true }],
  rows: [{ provider: "Fil One", isFilOne: true, values: { total: "$50" } }],
};

const WORKLOADS = {
  label: "Workloads",
  heading: "Workloads heading",
  sub: "Workloads sub",
  items: [
    {
      tag: "Tag",
      title: "Workload title",
      desc: "Workload desc",
      stats: [{ label: "Metric", rows: [{ name: "Fil One", val: "$0", win: true }] }],
      speedBadge: "Speed",
      savingsBadge: "Savings",
    },
  ],
};

const FEATURES = {
  label: "Features",
  heading: "Features heading",
  sub: "Features sub",
  items: [{ icon: ArrowsOut, title: "Feature title", desc: "Feature desc" }],
};

const METRICS = {
  label: "Pricing",
  heading: "Metrics heading",
  sub: "Metrics sub",
  items: [{ icon: ArrowsOut, label: "Egress", value: "$0", note: "Note" }],
};

/** Section surfaces in render order, plus the closing banner's. */
const surfaces = (config: LandingPageConfig) => {
  const { container } = render(
    <MemoryRouter>
      <LandingPage config={config} />
    </MemoryRouter>
  );
  return [...container.querySelectorAll("main > section")]
    .filter((s) => !s.querySelector("h1")) // drop the hero
    .map((s) => (s.className.includes("bg-zinc-50") ? "grey" : "white"));
};

describe("LandingPage — surface alternation", () => {
  it("alternates grey/white starting grey, with the banner matching the section above it", () => {
    expect(
      surfaces({
        ...BASE,
        problem: PROBLEM,
        comparison: COMPARISON,
        workloads: WORKLOADS,
        features: FEATURES,
        metrics: METRICS,
      })
    ).toEqual(["grey", "white", "grey", "white", "grey", "grey"]);
  });

  it("keeps alternating when a middle section is omitted", () => {
    // Without the comparison table, workloads takes the white slot rather than
    // repeating grey against the problem section above it.
    expect(surfaces({ ...BASE, problem: PROBLEM, workloads: WORKLOADS, metrics: METRICS })).toEqual([
      "grey",
      "white",
      "grey",
      "grey",
    ]);
  });

  it("puts the banner on grey when the last content section is grey", () => {
    expect(surfaces({ ...BASE, problem: PROBLEM })).toEqual(["grey", "grey"]);
  });

  it("renders the banner on white when the page has no content sections", () => {
    expect(surfaces(BASE)).toEqual(["white"]);
  });
});

describe("LandingPage — optional sections", () => {
  it("omits every content section the config leaves out", () => {
    const { container } = render(
      <MemoryRouter>
        <LandingPage config={BASE} />
      </MemoryRouter>
    );
    expect(container.querySelector("#compare")).toBeNull();
    expect(container.querySelector("#workloads")).toBeNull();
    expect(container.querySelectorAll("main > section")).toHaveLength(2); // hero + banner
  });

  it("renders each configured section's copy and data", () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <LandingPage
          config={{
            ...BASE,
            problem: PROBLEM,
            comparison: COMPARISON,
            workloads: WORKLOADS,
            features: FEATURES,
            metrics: METRICS,
          }}
        />
      </MemoryRouter>
    );
    getByText("Problem heading");
    getByText("Comparison heading");
    getByText("Workloads heading");
    getByText("Features heading");
    getByText("Metrics heading");
    expect(container.querySelector("#compare")).not.toBeNull();
    expect(container.querySelector("#workloads")).not.toBeNull();
    // The table keeps its accessible name and scoped headers.
    expect(container.querySelector("caption")?.textContent).toBe("Cost by provider");
    expect(container.querySelector('tbody th[scope="row"]')).not.toBeNull();
  });
});
