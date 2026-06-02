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
import EgressLandingPage from "./pages/EgressLandingPage";
import BackupDrLandingPage from "./pages/BackupDrLandingPage";
import LogRetentionLandingPage from "./pages/LogRetentionLandingPage";
import StartupsLandingPage from "./pages/StartupsLandingPage";
import CheckpointsLandingPage from "./pages/CheckpointsLandingPage";
import RagStorageLandingPage from "./pages/RagStorageLandingPage";
import WebScrapingLandingPage from "./pages/WebScrapingLandingPage";
import MultiCloudLandingPage from "./pages/MultiCloudLandingPage";
import DataSovereigntyLandingPage from "./pages/DataSovereigntyLandingPage";
import MigrateFromS3LandingPage from "./pages/MigrateFromS3LandingPage";
import ComplianceLandingPage from "./pages/ComplianceLandingPage";
import ArchivalLandingPage from "./pages/ArchivalLandingPage";
import VersioningLandingPage from "./pages/VersioningLandingPage";
import RegionalCloudLandingPage from "./pages/RegionalCloudLandingPage";
import MediaLandingPage from "./pages/MediaLandingPage";
import GamingLandingPage from "./pages/GamingLandingPage";
import GenomicsLandingPage from "./pages/GenomicsLandingPage";
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
          <Route path="/lp/egress" element={<EgressLandingPage />} />
          <Route path="/lp/backup-dr" element={<BackupDrLandingPage />} />
          <Route path="/lp/log-retention" element={<LogRetentionLandingPage />} />
          <Route path="/lp/startups" element={<StartupsLandingPage />} />
          <Route path="/lp/ml-checkpoints" element={<CheckpointsLandingPage />} />
          <Route path="/lp/rag-storage" element={<RagStorageLandingPage />} />
          <Route path="/lp/web-scraping" element={<WebScrapingLandingPage />} />
          <Route path="/lp/multi-cloud" element={<MultiCloudLandingPage />} />
          <Route path="/lp/data-sovereignty" element={<DataSovereigntyLandingPage />} />
          <Route path="/lp/migrate-from-s3" element={<MigrateFromS3LandingPage />} />
          <Route path="/lp/compliance" element={<ComplianceLandingPage />} />
          <Route path="/lp/archival" element={<ArchivalLandingPage />} />
          <Route path="/lp/versioning" element={<VersioningLandingPage />} />
          <Route path="/lp/regional-cloud" element={<RegionalCloudLandingPage />} />
          <Route path="/lp/media" element={<MediaLandingPage />} />
          <Route path="/lp/gaming" element={<GamingLandingPage />} />
          <Route path="/lp/genomics" element={<GenomicsLandingPage />} />
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
