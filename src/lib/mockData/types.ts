export type Funnel = {
  id: string;
  name: string;
  description: string;
  northStarMetric: string;
};

export type FunnelStep = {
  id: string;
  funnelId: string;
  stepOrder: number;
  stepName: string;
  usersAtStep: number;
  conversionRateFromPrevious: number | null;
  dropoffRateFromPrevious: number | null;
};

export type Segment = {
  id: string;
  name: string;
  description: string;
};

export type ExperimentSuggestion = {
  id: string;
  funnelId: string;
  segmentId?: string | null;
  stepName: string;
  name: string;
  hypothesis: string;
  experimentType: "Messaging" | "UX flow" | "Social proof" | "Timing" | "Other";
  primaryMetric: string;
  guardrailMetrics: string[];
  impact: "High" | "Medium" | "Low";
  confidence: "High" | "Medium" | "Low";
  effort: "Low" | "Medium" | "High";
  priority: "P0" | "P1" | "P2";
  rationale: string;
  status: "Suggested" | "Shortlisted" | "Rejected";
};

export type ExperimentLibraryEntry = {
  id: string;
  name: string;
  funnelId: string;
  segmentId?: string | null;
  hypothesis: string;
  outcome: "Win" | "Neutral" | "Loss";
  primaryMetric: string;
  resultSummary: string;
  keyLearning: string;
  dateCompleted: string;
};

export type FunnelSourceType = "Manual" | "Mixpanel" | "GA" | "CSV";
export type FunnelSyncStatus = "Up to date" | "Missing data" | "Not configured";

export type FunnelConfig = {
  funnelId: string;
  sourceType: FunnelSourceType;
  syncStatus: FunnelSyncStatus;
  lastUpdated: string;
  dataFreshnessLabel: string;
  integrations: {
    mixpanel: "Configured" | "Not connected" | "Mocked";
    ga: "Configured" | "Not connected" | "Mocked";
    other?: "Configured" | "Not connected" | "Mocked";
  };
};

export type JotDownNote = {
  id: string;
  funnelId: string;
  segmentId: string | null;
  text: string;
  updatedAt: string;
};

export type AbTestGroup = {
  id: string;
  name: string;
  description: string;
  funnelId: string | null;
  segmentId: string | null;
  status: "planned" | "running" | "completed" | "archived";
  primaryMetric: string;
  guardrailMetrics: string[];
  owner: string;
  createdAt: string;
  startDate?: string;
  endDate?: string;
  dataSource: "manual" | "csv" | "api";
  externalLink?: string;
  notes?: string;
};

export type AbVariant = {
  id: string;
  groupId: string;
  label: string;
  name: string;
  description: string;
  isControl: boolean;
  createdAt: string;
  trafficAllocation: number | null;
  impressions: number | null;
  uniqueUsers?: number | null;
  conversions: number | null;
  conversionRate: number | null;
  liftVsControl?: number | null;
  pValue?: number | null;
  status: "control" | "running" | "paused" | "completed";
  trafficSource: "manual" | "csv" | "api";
  impressionsSource: "manual" | "csv" | "api";
  conversionsSource: "manual" | "csv" | "api";
  conversionRateSource: "manual" | "csv" | "api";
  notes?: string;
};

export type Attachment = {
  id: string;
  type: "link" | "screenshot";
  label: string;
  url?: string;
  variantId?: string | null;
};
