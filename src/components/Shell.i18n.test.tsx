import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PlatformNavbar from "./PlatformNavbar";
import Footer from "./Footer";

vi.mock("@/lib/analytics", () => ({ trackDocsClick: () => {} }));

/**
 * The navbar and footer link lists are declared once with per-language copy
 * ({ en, es }), so a translation that goes missing is not a build error — it
 * renders as nothing at all, since React prints `undefined` as an empty node.
 * An assertion looking for the literal text "undefined" would therefore never
 * fire. These tests instead require every link to carry visible text, and scope
 * each query to the navbar or the footer so one component's copy cannot stand in
 * for the other's (both list "Object Storage", from separate declarations).
 */
const renderShell = (lang: "en" | "es") => {
  const utils = render(
    <MemoryRouter>
      <PlatformNavbar lang={lang} />
      <Footer lang={lang} />
    </MemoryRouter>
  );
  const nav = utils.container.querySelector("nav");
  const footer = utils.container.querySelector("footer");
  if (!nav || !footer) throw new Error("shell did not render");
  // The desktop dropdowns are unmounted while closed, so the navbar's own
  // PRODUCTS/SOLUTIONS copy only reaches the DOM through the mobile panel.
  fireEvent.click(within(nav).getByLabelText(lang === "es" ? "Abrir menú" : "Open menu"));
  return { ...utils, nav, footer };
};

/**
 * Controls that legitimately carry no text: the logo (labelled by its image) and
 * the hamburger (labelled by aria-label). Everything else must render copy.
 */
const isTextual = (el: Element) => !el.querySelector("img") && !el.hasAttribute("aria-label");

describe("shell localization", () => {
  it.each(["en", "es"] as const)("gives every %s link visible text", (lang) => {
    const { nav, footer } = renderShell(lang);
    for (const [name, root] of [
      ["nav", nav],
      ["footer", footer],
    ] as const) {
      const links = [...root.querySelectorAll("a, button")].filter(isTextual);
      expect(links.length).toBeGreaterThan(5);
      const blank = links.filter((el) => !el.textContent?.trim()).map((el) => el.outerHTML.slice(0, 80));
      expect(blank, `${name} has links with no text in ${lang}`).toEqual([]);
    }
  });

  it.each([
    ["en", { product: "Object Storage", solution: "AI Training & Inference", badge: "Early access", group: "Resources", utility: "Pricing" }],
    ["es", { product: "Almacenamiento de objetos", solution: "Entrenamiento e inferencia de IA", badge: "Acceso anticipado", group: "Recursos", utility: "Precios" }],
  ] as const)("resolves %s copy in the component that declares it", (lang, copy) => {
    const { nav, footer } = renderShell(lang);
    // Navbar's own lists — scoped to <nav> so the footer cannot satisfy these.
    expect(within(nav).getAllByText(copy.product).length).toBeGreaterThan(0);
    expect(within(nav).getAllByText(copy.solution).length).toBeGreaterThan(0);
    expect(within(nav).getAllByText(copy.badge).length).toBe(2);
    expect(within(nav).getAllByText(copy.utility).length).toBeGreaterThan(0);
    // Footer's own group titles.
    expect(within(footer).getAllByText(copy.group).length).toBe(1);
  });

  it.each(["en", "es"] as const)("keeps loanwords untranslated in %s", (lang) => {
    const { nav, footer } = renderShell(lang);
    for (const shared of ["Bucket Intelligence", "AI Agent Toolkit"]) {
      expect(within(nav).getAllByText(shared).length).toBeGreaterThan(0);
    }
    for (const shared of ["Partners", "Blog", "SLA", "Filecoin"]) {
      expect(within(footer).getAllByText(shared).length).toBeGreaterThan(0);
    }
  });

  it("links Blog to /blog from both the navbar and the footer", () => {
    const { nav, footer } = renderShell("en");
    for (const root of [nav, footer]) {
      const link = within(root).getAllByText("Blog")[0].closest("a");
      expect(link).toHaveAttribute("href", "/blog");
    }
  });
});
