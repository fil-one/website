import type { ComponentType } from "react";

export type PageLoader = () => Promise<{ default: ComponentType }>;

export interface RouteDef {
  path: string;
  load: PageLoader;
  prerender?: boolean;
}

/**
 * Single source of truth for path -> page module. Consumed two ways:
 *  - App.tsx (client): each `load` is wrapped in React.lazy() so the browser
 *    only downloads the chunk for the route it's on.
 *  - entry-server.tsx (SSR/prerender): every `load` is awaited up front so
 *    renderToString always has the real component, never a Suspense fallback.
 */
export const routeDefs: RouteDef[] = [
  { path: "/", load: () => import("./pages/Home") },
  { path: "/terms", load: () => import("./pages/TermsOfUse") },
  { path: "/privacy", load: () => import("./pages/PrivacyPolicy") },
  { path: "/contact-sales", load: () => import("./pages/ContactSales") },
  { path: "/support", load: () => import("./pages/Support") },
  { path: "/aup", load: () => import("./pages/AcceptableUsePolicy") },
  { path: "/sla", load: () => import("./pages/Sla") },
  { path: "/lp/barcelona", load: () => import("./pages/BarcelonaLandingPage") },
  { path: "/lp/es/barcelona", load: () => import("./pages/BarcelonaLandingPageES") },
  { path: "/lp/es/contacto", load: () => import("./pages/ContactSalesBcnES") },
  { path: "/lp/es/soporte", load: () => import("./pages/SupportBcnES") },
  { path: "/lp/agents", load: () => import("./pages/AgentsLandingPage") },
  { path: "/lp/egress", load: () => import("./pages/EgressLandingPage") },
  { path: "/lp/migrate-from-s3", load: () => import("./pages/MigrateFromS3LandingPage") },
  { path: "/lp/price", load: () => import("./pages/PriceLandingPage") },
  { path: "/pricing", load: () => import("./pages/PricingPage") },
  { path: "/about", load: () => import("./pages/About") },
  { path: "/trust", load: () => import("./pages/TrustPage") },
  { path: "/trust/request", load: () => import("./pages/TrustRequestPage") },
  { path: "/workloads", load: () => import("./pages/WorkloadsPage") },
  { path: "/partners", load: () => import("./pages/PartnersPage") },
  { path: "/host", load: () => import("./pages/HostPage") },
  { path: "/host/apply", load: () => import("./pages/HostApplyPage") },
  { path: "/partners/apply", load: () => import("./pages/PartnerApplyPage") },
  { path: "/blog", load: () => import("./pages/Blog") },
  { path: "/blog/:slug", load: () => import("./pages/BlogPost"), prerender: false },
];

export const notFoundLoad: PageLoader = () => import("./pages/NotFound");

/**
 * Every prerenderable route path. Single source of truth for the prerender
 * script (which routes to render + the sitemap) and the route-parity test.
 *
 * Routes marked `prerender: false` are excluded: their paths are dynamic
 * (/blog/:slug) so there's nothing to render at build time. Those are served by
 * a request-time function instead — see api/blog-page.js.
 */
export const routePaths: string[] = routeDefs.filter((r) => r.prerender !== false).map((r) => r.path);
