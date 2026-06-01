import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactSales from "./pages/ContactSales";
import Support from "./pages/Support";
import AcceptableUsePolicy from "./pages/AcceptableUsePolicy";
import AdsLandingPage from "./pages/AdsLandingPage";
import BarcelonaLandingPage from "./pages/BarcelonaLandingPage";
import ContactSalesBarcelona from "./pages/ContactSalesBarcelona";
import AiPage from "./pages/AiPage";
import AgentsLandingPage from "./pages/AgentsLandingPage";
import WaitlistPage from "./pages/WaitlistPage";
import DataSovereigntyPage from "./pages/DataSovereigntyPage";
import FloatingSupportButton from "./components/FloatingSupportButton";

const queryClient = new QueryClient();

/**
 * Providers wrapper — no router dependency.
 * Used both by the client entry (App) and the SSR entry (entry-server.tsx).
 */
export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

/**
 * All routes + chrome that requires a router context.
 * Rendered inside BrowserRouter (client) or StaticRouter (SSR prerender).
 */
export const AppContent = () => (
  <>
    <FloatingSupportButton />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/terms" element={<TermsOfUse />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/contact-sales" element={<ContactSales />} />
      <Route path="/support" element={<Support />} />
      <Route path="/aup" element={<AcceptableUsePolicy />} />
      <Route path="/ai" element={<AiPage />} />
      <Route path="/lp/agents" element={<AgentsLandingPage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
      <Route path="/lp/barcelona" element={<BarcelonaLandingPage />} />
      <Route path="/lp/barcelona/contacto" element={<ContactSalesBarcelona />} />
      <Route path="/lp/data-sovereignty" element={<DataSovereigntyPage />} />
      <Route path="/:lang/:city" element={<AdsLandingPage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
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
