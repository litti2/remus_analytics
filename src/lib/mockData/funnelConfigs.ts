import { FunnelConfig } from "./types";

export const funnelConfigs: FunnelConfig[] = [
  {
    funnelId: "funnel-1",
    sourceType: "Manual",
    syncStatus: "Up to date",
    lastUpdated: "2025-01-14T10:30:00Z",
    dataFreshnessLabel: "Manual · Last edited 15 min ago",
    integrations: {
      mixpanel: "Mocked",
      ga: "Not connected"
    }
  },
  {
    funnelId: "funnel-2",
    sourceType: "Mixpanel",
    syncStatus: "Up to date",
    lastUpdated: "2025-01-14T09:00:00Z",
    dataFreshnessLabel: "Mixpanel · Last synced 2 hours ago",
    integrations: {
      mixpanel: "Configured",
      ga: "Not connected"
    }
  },
  {
    funnelId: "funnel-3",
    sourceType: "Manual",
    syncStatus: "Up to date",
    lastUpdated: "2025-01-13T16:45:00Z",
    dataFreshnessLabel: "Manual · Last edited 1 day ago",
    integrations: {
      mixpanel: "Not connected",
      ga: "Not connected"
    }
  }
];
