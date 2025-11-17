import { Funnel } from "./types";

export const funnels: Funnel[] = [
  {
    id: "funnel-1",
    name: "Signup → Activation",
    description: "User journey from signup to first activation event",
    northStarMetric: "trial_activation_rate"
  },
  {
    id: "funnel-2",
    name: "Trial → Paid",
    description: "Conversion from trial users to paid subscriptions",
    northStarMetric: "trial_to_paid_conversion_rate"
  },
  {
    id: "funnel-3",
    name: "Onboarding Complete",
    description: "Users completing the full onboarding flow",
    northStarMetric: "onboarding_completion_rate"
  }
];
