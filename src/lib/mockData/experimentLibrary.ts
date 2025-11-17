import { ExperimentLibraryEntry } from "./types";

export const experimentLibrary: ExperimentLibraryEntry[] = [
  {
    id: "exp-1",
    name: "Add progress bar to signup",
    funnelId: "funnel-1",
    segmentId: null,
    hypothesis: "Visual progress indicator will reduce signup abandonment by setting clear expectations",
    outcome: "Win",
    primaryMetric: "signup_completion_rate",
    resultSummary: "+8.2% signup completion rate (p<0.01)",
    keyLearning: "Progress bars work best when they show meaningful milestones, not just generic steps. Users responded positively to 'Almost there!' messaging.",
    dateCompleted: "2024-12-15"
  },
  {
    id: "exp-2",
    name: "Trial extension email campaign",
    funnelId: "funnel-2",
    segmentId: null,
    hypothesis: "Offering 7-day trial extension to users who haven't engaged by day 5 will improve conversion",
    outcome: "Neutral",
    primaryMetric: "trial_to_paid_conversion_rate",
    resultSummary: "+0.3% conversion (not statistically significant, p=0.42)",
    keyLearning: "Time extension alone doesn't drive conversion. Users who haven't engaged by day 5 need activation help, not more time. Focus on engagement interventions instead.",
    dateCompleted: "2024-11-28"
  },
  {
    id: "exp-3",
    name: "Reduce onboarding steps from 5 to 3",
    funnelId: "funnel-3",
    segmentId: null,
    hypothesis: "Shorter onboarding will increase completion rate",
    outcome: "Win",
    primaryMetric: "onboarding_completion_rate",
    resultSummary: "+12.7% completion rate (p<0.001)",
    keyLearning: "Less is more for onboarding. The two steps we removed (company size, use case) can be collected later through in-app prompts when context is clearer.",
    dateCompleted: "2024-10-22"
  },
  {
    id: "exp-4",
    name: "Add urgency timer on trial conversion page",
    funnelId: "funnel-2",
    segmentId: null,
    hypothesis: "Countdown timer showing trial expiration will create urgency and boost conversions",
    outcome: "Loss",
    primaryMetric: "trial_to_paid_conversion_rate",
    resultSummary: "-2.1% conversion rate (p=0.03)",
    keyLearning: "Aggressive urgency tactics backfire with our audience. Users felt pressured and some churned early. Trust-building > pressure tactics for our product.",
    dateCompleted: "2024-09-10"
  },
  {
    id: "exp-5",
    name: "Personalized activation checklist",
    funnelId: "funnel-1",
    segmentId: "segment-2",
    hypothesis: "Role-based activation checklist will provide clearer guidance and improve activation",
    outcome: "Win",
    primaryMetric: "activation_rate",
    resultSummary: "+15.4% activation for organic desktop users (p<0.01)",
    keyLearning: "Personalization matters, especially for deliberate users. Organic desktop users spend more time researching and appreciate tailored guidance. Consider expanding to other segments.",
    dateCompleted: "2024-08-05"
  }
];
