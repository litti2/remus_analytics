// export type Metric = {
//   id: string;
//   name: string;
//   key: string;
//   type: 'Rate' | 'Count' | 'Time' | 'Other';
//   isNorthStar?: boolean;
// };

// export type Funnel = {\n  id: string;\n  name: string;\n  description: string;\n  northStarMetric: string;\n  dataSource: "manual" | "csv" | "api";
//   tags?: string[];
//   impressions?: number;
//   clicks?: number;
//   metrics?: Metric[];
// };\n\nexport type FunnelStep = {\n  id: string;\n  funnelId: string;\n  order: number;\n  name: string;\n  metricKey: string;\n  users: number;\n  conversionRate: number; // 0–1\n  dropoffRate: number; // 0–1\n};\n\nexport type ExperimentSuggestion = {\n  id: string;\n  title: string;\n  funnelId: string;\n  stepName: string;\n  impact: \"High\" | \"Medium\" | \"Low\";\n  confidence: \"High\" | \"Medium\" | \"Low\";\n  effort: \"Low\" | \"Medium\" | \"High\";\n  priority: \"P0\" | \"P1\" | \"P2\";\n  hypothesis: string;\n  rationale: string;\n  primaryMetric: string;\n  guardrailMetrics: string[];\n};\n\nexport type ExperimentLibraryEntry = {\n  id: string;\n  name: string;\n  outcome: \"Win\" | \"Neutral\" | \"Loss\" | \"Running\" | \"Planned\" | \"Archived\";\n  funnelId: string | null;\n  primaryMetric: string;\n  resultSummary: string;\n  keyLearning: string;\n  completedAt?: string;\n  owner: string;\n};\n\nexport type AbTestGroup = {\n  id: string;\n  name: string;\n  hypothesis: string;\n  funnelId: string | null;\n  status: \"planned\" | \"running\" | \"completed\" | \"archived\";\n  primaryMetric: string;\n  guardrailMetrics: string[];\n  owner: string;
//   startDate?: string;
//   endDate?: string;
//   tags?: string[];
//   impressions?: number;
//   clicks?: number;
//   metrics?: Metric[];
// };\n\nexport type AbVariant = {\n  id: string;\n  groupId: string;\n  label: string; // \"A\", \"B\", \"C\"...\n  name: string;\n  description: string;\n  isControl: boolean;\n  trafficAllocation: number;\n  impressions: number;\n  conversions: number;\n  conversionRate: number;\n  liftVsControl?: number;\n  pValue?: number;\n};\n\nexport type Insight = {\n  id: string;\n  funnelId: string;\n  stepName?: string;\n  title: string;\n  summary: string;\n  severity: \"low\" | \"medium\" | \"high\";\n  createdAt: string;\n};\n\nexport type Note = {\n  id: string;\n  title: string;\n  body: string;\n  createdAt: string;\n  updatedAt: string;\n  context?: {\n    funnelId?: string;\n    suggestionId?: string;\n    abTestGroupId?: string;\n    insightId?: string;\n    page?: string; // e.g., \"overview\", \"funnel-explorer\"\n  };\n  scene?: any; // serialized drawing scene\n};\n\nexport type DataSource = {\n  id: string;\n  name: string;\n  type: \"csv\" | \"api\" | \"manual\";\n  status: \"active\" | \"archived\";\n  mappedFunnels: string[]; // funnel ids\n  uploadedAt: string;\n};\n


export type Metric = {
  id: string;
  name: string;
  key: string;
  type: 'Rate' | 'Count' | 'Time' | 'Other';
  isNorthStar?: boolean;
};

export type Funnel = {
  id: string;
  name: string;
  description: string;
  northStarMetric: string;
  dataSource: "manual" | "csv" | "api";
  tags?: string[];
  impressions?: number;
  clicks?: number;
  metrics?: Metric[];
};

export type FunnelStep = {
  id: string;
  funnelId: string;
  order: number;
  name: string;
  metricKey: string;
  users: number;
  conversionRate: number; // 0–1
  dropoffRate: number; // 0–1
};

export type ExperimentSuggestion = {
  id: string;
  title: string;
  funnelId: string;
  stepName: string;
  impact: "High" | "Medium" | "Low";
  confidence: "High" | "Medium" | "Low";
  effort: "Low" | "Medium" | "High";
  priority: "P0" | "P1" | "P2";
  hypothesis: string;
  rationale: string;
  primaryMetric: string;
  guardrailMetrics: string[];
};

export type ExperimentLibraryEntry = {
  id: string;
  name: string;
  outcome: "Win" | "Neutral" | "Loss" | "Running" | "Planned" | "Archived";
  funnelId: string | null;
  primaryMetric: string;
  resultSummary: string;
  keyLearning: string;
  completedAt?: string;
  owner: string;
};

export type AbTestGroup = {
  id: string;
  name: string;
  hypothesis: string;
  funnelId: string | null;
  status: "planned" | "running" | "completed" | "archived";
  primaryMetric: string;
  guardrailMetrics: string[];
  owner: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
  impressions?: number;
  clicks?: number;
  metrics?: Metric[];
};

export type AbVariant = {
  id: string;
  groupId: string;
  label: string;
  name: string;
  description: string;
  isControl: boolean;
  trafficAllocation: number;
  impressions: number;
  conversions: number;
  conversionRate: number;
  liftVsControl?: number;
  pValue?: number;
};

export type Insight = {
  id: string;
  funnelId: string;
  stepName?: string;
  title: string;
  summary: string;
  severity: "low" | "medium" | "high";
  createdAt: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  context?: {
    funnelId?: string;
    suggestionId?: string;
    abTestGroupId?: string;
    insightId?: string;
    page?: string;
  };
  scene?: any;
};

export type DataSource = {
  id: string;
  name: string;
  type: "csv" | "api" | "manual";
  status: "active" | "archived";
  mappedFunnels: string[];
  uploadedAt: string;
};
