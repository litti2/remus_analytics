import { FunnelStep } from "./types";

export const funnelSteps: FunnelStep[] = [
  // Signup → Activation funnel
  {
    id: "step-1-1",
    funnelId: "funnel-1",
    stepOrder: 1,
    stepName: "Landing page visit",
    usersAtStep: 12450,
    conversionRateFromPrevious: null,
    dropoffRateFromPrevious: null
  },
  {
    id: "step-1-2",
    funnelId: "funnel-1",
    stepOrder: 2,
    stepName: "Signup started",
    usersAtStep: 7100,
    conversionRateFromPrevious: 57,
    dropoffRateFromPrevious: 43
  },
  {
    id: "step-1-3",
    funnelId: "funnel-1",
    stepOrder: 3,
    stepName: "Email verified",
    usersAtStep: 5680,
    conversionRateFromPrevious: 80,
    dropoffRateFromPrevious: 20
  },
  {
    id: "step-1-4",
    funnelId: "funnel-1",
    stepOrder: 4,
    stepName: "Activated",
    usersAtStep: 4544,
    conversionRateFromPrevious: 80,
    dropoffRateFromPrevious: 20
  },

  // Trial → Paid funnel
  {
    id: "step-2-1",
    funnelId: "funnel-2",
    stepOrder: 1,
    stepName: "Trial started",
    usersAtStep: 4544,
    conversionRateFromPrevious: null,
    dropoffRateFromPrevious: null
  },
  {
    id: "step-2-2",
    funnelId: "funnel-2",
    stepOrder: 2,
    stepName: "Day 3 engaged",
    usersAtStep: 2726,
    conversionRateFromPrevious: 60,
    dropoffRateFromPrevious: 40
  },
  {
    id: "step-2-3",
    funnelId: "funnel-2",
    stepOrder: 3,
    stepName: "Day 7 active",
    usersAtStep: 1817,
    conversionRateFromPrevious: 67,
    dropoffRateFromPrevious: 33
  },
  {
    id: "step-2-4",
    funnelId: "funnel-2",
    stepOrder: 4,
    stepName: "Converted to paid",
    usersAtStep: 681,
    conversionRateFromPrevious: 37,
    dropoffRateFromPrevious: 63
  },

  // Onboarding Complete funnel
  {
    id: "step-3-1",
    funnelId: "funnel-3",
    stepOrder: 1,
    stepName: "Onboarding started",
    usersAtStep: 5680,
    conversionRateFromPrevious: null,
    dropoffRateFromPrevious: null
  },
  {
    id: "step-3-2",
    funnelId: "funnel-3",
    stepOrder: 2,
    stepName: "Profile setup",
    usersAtStep: 4544,
    conversionRateFromPrevious: 80,
    dropoffRateFromPrevious: 20
  },
  {
    id: "step-3-3",
    funnelId: "funnel-3",
    stepOrder: 3,
    stepName: "First action taken",
    usersAtStep: 3635,
    conversionRateFromPrevious: 80,
    dropoffRateFromPrevious: 20
  },
  {
    id: "step-3-4",
    funnelId: "funnel-3",
    stepOrder: 4,
    stepName: "Onboarding complete",
    usersAtStep: 3181,
    conversionRateFromPrevious: 87,
    dropoffRateFromPrevious: 13
  }
];
