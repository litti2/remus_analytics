import { AbTestGroup } from "./types";

export const abTestGroups: AbTestGroup[] = [
  {
    id: "test-1",
    name: "TEST 1 – Signup hero messaging",
    description: "Testing different value propositions in the hero section to improve signup conversion",
    funnelId: "funnel-1",
    segmentId: "segment-1",
    status: "running",
    primaryMetric: "signup_completion_rate",
    guardrailMetrics: ["bounce_rate", "activation_rate"],
    owner: "Sarah Chen",
    createdAt: "2025-04-05T10:00:00Z",
    startDate: "2025-04-10T00:00:00Z",
    endDate: "2025-04-24T23:59:59Z",
    dataSource: "manual",
    externalLink: "https://app.optimizely.com/test-1",
    notes: "Focusing on mobile users from paid search. Initial results look promising for variant B."
  },
  {
    id: "test-2",
    name: "TEST 2 – Trial onboarding flow",
    description: "Comparing 3-step vs 5-step onboarding to reduce drop-off during trial activation",
    funnelId: "funnel-2",
    segmentId: null,
    status: "completed",
    primaryMetric: "trial_activation_rate",
    guardrailMetrics: ["time_to_activation", "feature_engagement"],
    owner: "Mark Johnson",
    createdAt: "2025-03-15T10:00:00Z",
    startDate: "2025-03-20T00:00:00Z",
    endDate: "2025-04-05T23:59:59Z",
    dataSource: "api",
    externalLink: "https://app.optimizely.com/test-2",
    notes: "Winner declared: 3-step flow. Will implement for all users next sprint."
  },
  {
    id: "test-3",
    name: "TEST 3 – Payment page redesign",
    description: "New payment page design with improved trust signals and clearer pricing",
    funnelId: "funnel-2",
    segmentId: "segment-2",
    status: "planned",
    primaryMetric: "trial_to_paid_conversion",
    guardrailMetrics: ["payment_error_rate", "checkout_time"],
    owner: "Sarah Chen",
    createdAt: "2025-04-12T10:00:00Z",
    startDate: "2025-04-20T00:00:00Z",
    dataSource: "manual",
    externalLink: "https://www.figma.com/payment-redesign",
    notes: "Design ready. Waiting for engineering capacity to implement."
  }
];
