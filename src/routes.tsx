import type { ComponentType } from "react";

export type PageLoader = () => Promise<{ default: ComponentType }>;

export interface RouteDef {
  path: string;
  load: PageLoader;
}

/**
 * Single source of truth for path -> page module. Consumed two ways:
 *  - App.tsx (client): each `load` is wrapped in React.lazy() so the browser
 *    only downloads the chunk for the route it's on.
 *  - entry-server.tsx (SSR/prerender): every `load` is awaited up front so
 *    renderToString always has the real component, never a Suspense fallback.
 */
export const routeDefs: RouteDef[] = [
  { path: "/", load: () => import("./pages/VersionB") },
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
  { path: "/lp/backup-dr", load: () => import("./pages/BackupDrLandingPage") },
  { path: "/lp/log-retention", load: () => import("./pages/LogRetentionLandingPage") },
  { path: "/lp/startups", load: () => import("./pages/StartupsLandingPage") },
  { path: "/lp/ml-checkpoints", load: () => import("./pages/CheckpointsLandingPage") },
  { path: "/lp/rag-storage", load: () => import("./pages/RagStorageLandingPage") },
  { path: "/lp/web-scraping", load: () => import("./pages/WebScrapingLandingPage") },
  { path: "/lp/multi-cloud", load: () => import("./pages/MultiCloudLandingPage") },
  { path: "/lp/data-sovereignty", load: () => import("./pages/DataSovereigntyLandingPage") },
  { path: "/lp/migrate-from-s3", load: () => import("./pages/MigrateFromS3LandingPage") },
  { path: "/lp/compliance", load: () => import("./pages/ComplianceLandingPage") },
  { path: "/lp/archival", load: () => import("./pages/ArchivalLandingPage") },
  { path: "/lp/versioning", load: () => import("./pages/VersioningLandingPage") },
  { path: "/lp/regional-cloud", load: () => import("./pages/RegionalCloudLandingPage") },
  { path: "/lp/media", load: () => import("./pages/MediaLandingPage") },
  { path: "/lp/gaming", load: () => import("./pages/GamingLandingPage") },
  { path: "/lp/genomics", load: () => import("./pages/GenomicsLandingPage") },
  { path: "/lp/web3-fintech", load: () => import("./pages/Web3FintechLandingPage") },
  { path: "/lp/web3-pivot", load: () => import("./pages/Web3PivotLandingPage") },
  { path: "/lp/web3-native", load: () => import("./pages/Web3NativeLandingPage") },
  { path: "/lp/ml-training", load: () => import("./pages/MlTrainingLandingPage") },
  { path: "/lp/agent-knowledge-layer", load: () => import("./pages/AgentKnowledgeLandingPage") },
  { path: "/lp/data-control", load: () => import("./pages/DataControlLandingPage") },
  { path: "/lp/go-global", load: () => import("./pages/GoGlobalLandingPage") },
  { path: "/lp/affordable", load: () => import("./pages/AffordableLandingPage") },
  { path: "/lp/metro", load: () => import("./pages/MetroLandingPage") },
  { path: "/lp/agent-loops", load: () => import("./pages/AgentLoopsLandingPage") },
  { path: "/lp/agent-readable", load: () => import("./pages/AgentReadableLandingPage") },
  { path: "/lp/exit-first", load: () => import("./pages/ExitFirstLandingPage") },
  { path: "/lp/cost-ticker", load: () => import("./pages/CostTickerLandingPage") },
  { path: "/lp/grant-funded", load: () => import("./pages/GrantFundedLandingPage") },
  { path: "/lp/collections-access", load: () => import("./pages/CollectionsAccessLandingPage") },
  { path: "/lp/digital-preservation", load: () => import("./pages/DigitalPreservationLandingPage") },
  { path: "/storage", load: () => import("./pages/StorageProductPage") },
  { path: "/bucket-intelligence", load: () => import("./pages/RagPipelineProductPage") },
  { path: "/ai-agent-toolkit", load: () => import("./pages/AgentToolkitProductPage") },
  { path: "/pricing", load: () => import("./pages/PricingPage") },
  { path: "/waitlist/bucket-intelligence", load: () => import("./pages/BucketIntelligenceWaitlistPage") },
  { path: "/waitlist/ai-agent-toolkit", load: () => import("./pages/AgentToolkitWaitlistPage") },
  { path: "/enterprise", load: () => import("./pages/EnterprisePage") },
  { path: "/about", load: () => import("./pages/About") },
  { path: "/solutions/ai-training", load: () => import("./pages/solutions/AiTrainingSolutionPage") },
  { path: "/solutions/web3-dapps", load: () => import("./pages/solutions/Web3DappsSolutionPage") },
  { path: "/solutions/media-archive", load: () => import("./pages/solutions/MediaArchiveSolutionPage") },
  { path: "/solutions/enterprise-backup", load: () => import("./pages/solutions/EnterpriseBackupSolutionPage") },
  { path: "/partners", load: () => import("./pages/PartnersPage") },
  { path: "/partners/apply", load: () => import("./pages/PartnerApplyPage") },
];

export const notFoundLoad: PageLoader = () => import("./pages/NotFound");
