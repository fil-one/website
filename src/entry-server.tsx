/**
 * SSR entry point — used only by scripts/prerender.mjs.
 * Renders a route to an HTML string using StaticRouter (no browser APIs needed).
 *
 * Deliberately does NOT reuse App.tsx's lazy/Suspense route tree: renderToString
 * is fully synchronous and can't wait on a React.lazy() import's promise, so a
 * lazy route would always render its Suspense fallback instead of real content.
 * Every route's module is awaited once up front (warmUp), then rendered as a
 * plain, already-resolved component — full HTML, no fallback risk.
 */
import type { ComponentType } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { AppShell } from "./App";
import { routeDefs, notFoundLoad } from "./routes";

let resolvedRoutes: { path: string; Component: ComponentType }[] | null = null;
let ResolvedNotFound: ComponentType | null = null;

async function warmUp() {
  if (resolvedRoutes) return;
  resolvedRoutes = await Promise.all(
    routeDefs.map(async ({ path, load }) => ({ path, Component: (await load()).default }))
  );
  ResolvedNotFound = (await notFoundLoad()).default;
}

export async function render(url: string): Promise<string> {
  await warmUp();
  return renderToString(
    <AppShell>
      <StaticRouter location={url}>
        <Routes>
          {resolvedRoutes!.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={ResolvedNotFound ? <ResolvedNotFound /> : null} />
        </Routes>
      </StaticRouter>
    </AppShell>
  );
}
