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
import VersionA from "./pages/VersionA";
import VersionB from "./pages/VersionB";
import StorageProductPage from "./pages/StorageProductPage";
import RagPipelineProductPage from "./pages/RagPipelineProductPage";
import AgentToolkitProductPage from "./pages/AgentToolkitProductPage";
import PricingPage from "./pages/PricingPage";
import WaitlistPage from "./pages/WaitlistPage";
import EnterprisePage from "./pages/EnterprisePage";
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
          <Route path="/" element={<VersionB />} />
          <Route path="/legacy" element={<Index />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact-sales" element={<ContactSales />} />
          <Route path="/support" element={<Support />} />
          <Route path="/aup" element={<AcceptableUsePolicy />} />
          <Route path="/lp/barcelona" element={<BarcelonaLandingPage />} />
          <Route path="/v1" element={<VersionA />} />
          <Route path="/storage" element={<StorageProductPage />} />
          <Route path="/rag-pipeline" element={<RagPipelineProductPage />} />
          <Route path="/ai-agent-toolkit" element={<AgentToolkitProductPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/:lang/:city" element={<AdsLandingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
