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
import AdsLandingPage from "./pages/AdsLandingPage";
import BarcelonaLandingPage from "./pages/BarcelonaLandingPage";
import FloatingSupportButton from "./components/FloatingSupportButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <FloatingSupportButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact-sales" element={<ContactSales />} />
          <Route path="/support" element={<Support />} />
          <Route path="/lp/barcelona" element={<BarcelonaLandingPage />} />
          <Route path="/:lang/:city" element={<AdsLandingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
