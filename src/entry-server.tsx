/**
 * SSR entry point — used only by scripts/prerender.mjs.
 * Renders a route to an HTML string using StaticRouter (no browser APIs needed).
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell, AppContent } from "./App";

export function render(url: string): string {
  return renderToString(
    <AppShell>
      <StaticRouter location={url}>
        <AppContent />
      </StaticRouter>
    </AppShell>
  );
}
