import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";
import { routeDefs, notFoundLoad } from "./routes";

const queryClient = new QueryClient();

// Built once at module scope — lazy() must not be re-created on every render,
// or React remounts (and re-fetches) the chunk on each render pass.
const lazyRoutes = routeDefs.map(({ path, load }) => ({ path, Component: lazy(load) }));
const NotFound = lazy(notFoundLoad);

/**
 * Providers wrapper — no router dependency.
 * Used both by the client entry (App) and the SSR entry (entry-server.tsx).
 */
export const AppShell = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

/**
 * Client routes — each page is a separate lazy chunk, so a visitor only
 * downloads the JS for the route they're on. Wrapped in a single Suspense so
 * client-side navigation to a route whose chunk hasn't loaded yet shows a
 * neutral fallback instead of an unstyled blank flash; direct/first loads are
 * unaffected since the prerendered HTML for that route is already in the DOM
 * and hydrates in place once its chunk arrives.
 *
 * SSR/prerendering (entry-server.tsx) does NOT use this — renderToString can't
 * wait on a lazy import's promise, so it builds its own eagerly-resolved
 * routes tree from the same routeDefs in ./routes.
 */
export const AppContent = () => (
  <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }} />}>
    <Routes>
      {lazyRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

/** Full client-side app. */
const App = () => (
  <AppShell>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </BrowserRouter>
  </AppShell>
);

export default App;
