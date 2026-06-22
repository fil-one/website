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
import BucketIntelligenceWaitlistPage from "./pages/BucketIntelligenceWaitlistPage";
import AgentToolkitWaitlistPage from "./pages/AgentToolkitWaitlistPage";
import EnterprisePage from "./pages/EnterprisePage";
import AiTrainingSolutionPage from "./pages/solutions/AiTrainingSolutionPage";
import Web3DappsSolutionPage from "./pages/solutions/Web3DappsSolutionPage";
import MediaArchiveSolutionPage from "./pages/solutions/MediaArchiveSolutionPage";
import EnterpriseBackupSolutionPage from "./pages/solutions/EnterpriseBackupSolutionPage";
import PartnersPage from "./pages/PartnersPage";
import PartnerApplyPage from "./pages/PartnerApplyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
          <Route path="/bucket-intelligence" element={<RagPipelineProductPage />} />
          <Route path="/ai-agent-toolkit" element={<AgentToolkitProductPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/waitlist/bucket-intelligence" element={<BucketIntelligenceWaitlistPage />} />
          <Route path="/waitlist/ai-agent-toolkit" element={<AgentToolkitWaitlistPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/solutions/ai-training" element={<AiTrainingSolutionPage />} />
          <Route path="/solutions/web3-dapps" element={<Web3DappsSolutionPage />} />
          <Route path="/solutions/media-archive" element={<MediaArchiveSolutionPage />} />
          <Route path="/solutions/enterprise-backup" element={<EnterpriseBackupSolutionPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/partners/apply" element={<PartnerApplyPage />} />
          <Route path="/:lang/:city" element={<AdsLandingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
