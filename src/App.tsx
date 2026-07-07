import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";
import NotFound from "./pages/NotFound";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Sla from "./pages/Sla";
import ContactSales from "./pages/ContactSales";
import Support from "./pages/Support";
import AcceptableUsePolicy from "./pages/AcceptableUsePolicy";
import BarcelonaLandingPage from "./pages/BarcelonaLandingPage";
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
// Landing pages
import AgentsLandingPage from "./pages/AgentsLandingPage";
import BarcelonaLandingPageES from "./pages/BarcelonaLandingPageES";
import ContactSalesBcnES from "./pages/ContactSalesBcnES";
import SupportBcnES from "./pages/SupportBcnES";
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
import Web3FintechLandingPage from "./pages/Web3FintechLandingPage";
import Web3PivotLandingPage from "./pages/Web3PivotLandingPage";
import Web3NativeLandingPage from "./pages/Web3NativeLandingPage";
import MlTrainingLandingPage from "./pages/MlTrainingLandingPage";
import AgentKnowledgeLandingPage from "./pages/AgentKnowledgeLandingPage";
import DataControlLandingPage from "./pages/DataControlLandingPage";
import GoGlobalLandingPage from "./pages/GoGlobalLandingPage";
import AffordableLandingPage from "./pages/AffordableLandingPage";
import MetroLandingPage from "./pages/MetroLandingPage";
import AgentLoopsLandingPage from "./pages/AgentLoopsLandingPage";
import AgentReadableLandingPage from "./pages/AgentReadableLandingPage";
import ExitFirstLandingPage from "./pages/ExitFirstLandingPage";
import CostTickerLandingPage from "./pages/CostTickerLandingPage";
import GrantFundedLandingPage from "./pages/GrantFundedLandingPage";
import CollectionsAccessLandingPage from "./pages/CollectionsAccessLandingPage";
import DigitalPreservationLandingPage from "./pages/DigitalPreservationLandingPage";

const queryClient = new QueryClient();

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
 * All routes — rendered inside BrowserRouter (client) or StaticRouter (SSR prerender).
 */
export const AppContent = () => (
  <Routes>
          <Route path="/" element={<VersionB />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact-sales" element={<ContactSales />} />
          <Route path="/support" element={<Support />} />
          <Route path="/aup" element={<AcceptableUsePolicy />} />
          <Route path="/sla" element={<Sla />} />
          <Route path="/lp/barcelona" element={<BarcelonaLandingPage />} />
          <Route path="/lp/es/barcelona" element={<BarcelonaLandingPageES />} />
          <Route path="/lp/es/contacto" element={<ContactSalesBcnES />} />
          <Route path="/lp/es/soporte" element={<SupportBcnES />} />
          <Route path="/lp/agents" element={<AgentsLandingPage />} />
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
          <Route path="/lp/web3-fintech" element={<Web3FintechLandingPage />} />
          <Route path="/lp/web3-pivot" element={<Web3PivotLandingPage />} />
          <Route path="/lp/web3-native" element={<Web3NativeLandingPage />} />
          <Route path="/lp/ml-training" element={<MlTrainingLandingPage />} />
          <Route path="/lp/agent-knowledge-layer" element={<AgentKnowledgeLandingPage />} />
          <Route path="/lp/data-control" element={<DataControlLandingPage />} />
          <Route path="/lp/go-global" element={<GoGlobalLandingPage />} />
          <Route path="/lp/affordable" element={<AffordableLandingPage />} />
          <Route path="/lp/metro" element={<MetroLandingPage />} />
          <Route path="/lp/agent-loops" element={<AgentLoopsLandingPage />} />
          <Route path="/lp/agent-readable" element={<AgentReadableLandingPage />} />
          <Route path="/lp/exit-first" element={<ExitFirstLandingPage />} />
          <Route path="/lp/cost-ticker" element={<CostTickerLandingPage />} />
          <Route path="/lp/grant-funded" element={<GrantFundedLandingPage />} />
          <Route path="/lp/collections-access" element={<CollectionsAccessLandingPage />} />
          <Route path="/lp/digital-preservation" element={<DigitalPreservationLandingPage />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
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
