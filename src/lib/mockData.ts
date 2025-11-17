import type { AbTestGroup, AbVariant, DataSource, ExperimentLibraryEntry, ExperimentSuggestion, Funnel, FunnelStep, Insight, Note } from './types';

export const funnels: Funnel[] = [
  { id: 'f_trial_paid', name: 'Trial → Paid', description: 'Convert trials to paid subscribers', northStarMetric: 'Trial → Paid CVR', dataSource: 'csv', tags: ['P0','Onboarding'], impressions: 20000, clicks: 4500, metrics: [ { id:'m_f1', name:'Trial → Paid CVR', key:'trial_to_paid_cvr', type:'Rate', isNorthStar: true } ] },
  { id: 'f_onboarding', name: 'Onboarding', description: 'Activate new users', northStarMetric: 'Day 1 Activation', dataSource: 'api', tags:['Onboarding'], impressions: 15000, clicks: 5200, metrics:[ { id:'m_f2', name:'Day 1 Activation', key:'d1_activation', type:'Rate', isNorthStar: true } ] },
  { id: 'f_checkout', name: 'Checkout', description: 'Optimize checkout conversion', northStarMetric: 'Checkout CVR', dataSource: 'manual', tags:['Checkout'], impressions: 12000, clicks: 3000, metrics:[ { id:'m_f3', name:'Checkout CVR', key:'checkout_cvr', type:'Rate', isNorthStar: false } ] },
  { id: 'f_retention', name: 'Retention', description: 'Increase 30d retention', northStarMetric: '30d Retention', dataSource: 'api', tags:['Retention'], impressions: 10000, clicks: 1800, metrics:[ { id:'m_f4', name:'30d Retention', key:'retention_30d', type:'Rate', isNorthStar: false } ] },
];

export const funnelSteps: FunnelStep[] = [
  { id: 's1', funnelId: 'f_trial_paid', order: 1, name: 'Trial Start', metricKey: 'trial_start', users: 10000, conversionRate: 1.0, dropoffRate: 0 },
  { id: 's2', funnelId: 'f_trial_paid', order: 2, name: 'Activated', metricKey: 'activated', users: 7000, conversionRate: 0.7, dropoffRate: 0.3 },
  { id: 's3', funnelId: 'f_trial_paid', order: 3, name: 'Used Feature A', metricKey: 'feature_a', users: 4000, conversionRate: 0.4, dropoffRate: 0.43 },
  { id: 's4', funnelId: 'f_trial_paid', order: 4, name: 'Purchased', metricKey: 'purchased', users: 1500, conversionRate: 0.15, dropoffRate: 0.625 },

  { id: 's5', funnelId: 'f_onboarding', order: 1, name: 'Sign Up', metricKey: 'signup', users: 8000, conversionRate: 1.0, dropoffRate: 0 },
  { id: 's6', funnelId: 'f_onboarding', order: 2, name: 'Email Verified', metricKey: 'email_verified', users: 6000, conversionRate: 0.75, dropoffRate: 0.25 },
  { id: 's7', funnelId: 'f_onboarding', order: 3, name: 'Completed Tour', metricKey: 'tour_done', users: 4500, conversionRate: 0.56, dropoffRate: 0.25 },
  { id: 's8', funnelId: 'f_onboarding', order: 4, name: 'Activated', metricKey: 'activated', users: 3000, conversionRate: 0.375, dropoffRate: 0.33 },

  { id: 's9', funnelId: 'f_checkout', order: 1, name: 'Cart', metricKey: 'cart', users: 5000, conversionRate: 1.0, dropoffRate: 0 },
  { id: 's10', funnelId: 'f_checkout', order: 2, name: 'Enter Details', metricKey: 'details', users: 3500, conversionRate: 0.7, dropoffRate: 0.3 },
  { id: 's11', funnelId: 'f_checkout', order: 3, name: 'Payment', metricKey: 'payment', users: 2500, conversionRate: 0.5, dropoffRate: 0.29 },
  { id: 's12', funnelId: 'f_checkout', order: 4, name: 'Success', metricKey: 'success', users: 2000, conversionRate: 0.4, dropoffRate: 0.2 },
];

export const abTestGroups: AbTestGroup[] = [
  { id: 'g1', name: 'CTA Button Copy', hypothesis: 'Clearer CTA increases clicks', funnelId: 'f_trial_paid', status: 'running', primaryMetric: 'Click-through rate', guardrailMetrics: ['Bounce Rate'], owner: 'Alex', startDate: '2025-01-05', tags:['Homepage'], impressions: 10100, clicks: 1300, metrics:[ { id:'m_g1', name:'Click-through rate', key:'ctr', type:'Rate', isNorthStar: true } ] },
  { id: 'g2', name: 'Pricing Toggle', hypothesis: 'Yearly default improves revenue', funnelId: 'f_checkout', status: 'planned', primaryMetric: 'Purchase CVR', guardrailMetrics: ['Refunds'], owner: 'Sam', tags:['Pricing'], impressions: 0, clicks: 0, metrics:[ { id:'m_g2', name:'Purchase CVR', key:'purchase_cvr', type:'Rate', isNorthStar: false } ] },
  { id: 'g3', name: 'Signup Form Length', hypothesis: 'Shorter form improves completion', funnelId: 'f_onboarding', status: 'completed', primaryMetric: 'Signup completion', guardrailMetrics: ['Spam signups'], owner: 'Riley', startDate: '2024-12-01', endDate: '2025-01-01', tags:['Onboarding'], impressions: 8000, clicks: 900, metrics:[ { id:'m_g3', name:'Signup completion', key:'signup_completion', type:'Rate', isNorthStar: false } ] },
];

export const abVariants: AbVariant[] = [
  { id: 'v1', groupId: 'g1', label: 'A', name: 'Control', description: 'Original CTA', isControl: true, trafficAllocation: 50, impressions: 5000, conversions: 500, conversionRate: 0.1, liftVsControl: 0, pValue: 1 },
  { id: 'v2', groupId: 'g1', label: 'B', name: 'Try Free', description: 'New copy', isControl: false, trafficAllocation: 50, impressions: 5100, conversions: 620, conversionRate: 0.1216, liftVsControl: 0.216, pValue: 0.03 },

  { id: 'v3', groupId: 'g2', label: 'A', name: 'Monthly default', description: 'Control', isControl: true, trafficAllocation: 50, impressions: 0, conversions: 0, conversionRate: 0 },
  { id: 'v4', groupId: 'g2', label: 'B', name: 'Yearly default', description: 'Variant', isControl: false, trafficAllocation: 50, impressions: 0, conversions: 0, conversionRate: 0 },

  { id: 'v5', groupId: 'g3', label: 'A', name: 'Long form', description: 'Control', isControl: true, trafficAllocation: 50, impressions: 8000, conversions: 3200, conversionRate: 0.4 },
  { id: 'v6', groupId: 'g3', label: 'B', name: 'Short form', description: 'Variant', isControl: false, trafficAllocation: 50, impressions: 8200, conversions: 3690, conversionRate: 0.45, liftVsControl: 0.125, pValue: 0.01 },
];

export const suggestions: ExperimentSuggestion[] = [
  { id: 'sug1', title: 'Clarify trial value props', funnelId: 'f_trial_paid', stepName: 'Activated', impact: 'High', confidence: 'Medium', effort: 'Low', priority: 'P0', hypothesis: 'Clarifying value increases activation', rationale: 'Users unsure of benefits', primaryMetric: 'Activation rate', guardrailMetrics: ['Churn'] },
  { id: 'sug2', title: 'Progress bar in checkout', funnelId: 'f_checkout', stepName: 'Enter Details', impact: 'Medium', confidence: 'High', effort: 'Low', priority: 'P1', hypothesis: 'Progress bars reduce abandonment', rationale: 'Unclear steps', primaryMetric: 'Checkout CVR', guardrailMetrics: ['Support tickets'] },
  { id: 'sug3', title: 'In-app onboarding tips', funnelId: 'f_onboarding', stepName: 'Activated', impact: 'High', confidence: 'Low', effort: 'Medium', priority: 'P0', hypothesis: 'Tips improve activation', rationale: 'Confusion on first run', primaryMetric: 'Activation', guardrailMetrics: ['Time on task'] },
  { id: 'sug4', title: 'Pricing contrast', funnelId: 'f_trial_paid', stepName: 'Purchased', impact: 'Low', confidence: 'Medium', effort: 'Low', priority: 'P2', hypothesis: 'Contrast improves selection', rationale: 'Low plan differentiation', primaryMetric: 'Purchase CVR', guardrailMetrics: ['Refunds'] },
  { id: 'sug5', title: 'Email verification nudge', funnelId: 'f_onboarding', stepName: 'Email Verified', impact: 'Medium', confidence: 'High', effort: 'Low', priority: 'P1', hypothesis: 'Nudges increase verification', rationale: 'Users drop off', primaryMetric: 'Verification rate', guardrailMetrics: ['Spam'] },
];

export const experiments: ExperimentLibraryEntry[] = [
  { id: 'exp1', name: 'Homepage hero', outcome: 'Win', funnelId: 'f_trial_paid', primaryMetric: 'CTR', resultSummary: '+12% CTR', keyLearning: 'Clear CTA works', completedAt: '2024-11-12', owner: 'Alex' },
  { id: 'exp2', name: 'Tooltip help', outcome: 'Neutral', funnelId: 'f_onboarding', primaryMetric: 'Activation', resultSummary: 'No impact', keyLearning: 'Help is ignored', owner: 'Sam' },
  { id: 'exp3', name: 'One-page checkout', outcome: 'Loss', funnelId: 'f_checkout', primaryMetric: 'Purchase CVR', resultSummary: '-5% CVR', keyLearning: 'Cognitive load increased', owner: 'Riley' },
  { id: 'exp4', name: 'Retention email drip', outcome: 'Running', funnelId: 'f_retention', primaryMetric: '30d Retention', resultSummary: 'Running', keyLearning: 'TBD', owner: 'Taylor' },
];

export const insights: Insight[] = [
  { id: 'in1', funnelId: 'f_trial_paid', stepName: 'Activated', title: 'Activation drop after day 2', summary: 'Users disengage after first session.', severity: 'high', createdAt: new Date().toISOString() },
  { id: 'in2', funnelId: 'f_checkout', stepName: 'Payment', title: 'Payment errors spike on mobile', summary: 'Higher declines on mobile devices.', severity: 'medium', createdAt: new Date().toISOString() },
];

export const notes: Note[] = [
  { id: 'n1', title: 'Kickoff notes', body: 'Align on north-star metric.', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), context: { page: 'overview' }, scene: {} },
  { id: 'n2', title: 'Checkout findings', body: 'Users drop at payment.', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), context: { funnelId: 'f_checkout' }, scene: {} },
];

export const dataSources: DataSource[] = [
  { id: 'ds1', name: 'Trial Funnel CSV', type: 'csv', status: 'active', mappedFunnels: ['f_trial_paid'], uploadedAt: new Date().toISOString() },
  { id: 'ds2', name: 'Product API', type: 'api', status: 'active', mappedFunnels: ['f_onboarding', 'f_retention'], uploadedAt: new Date().toISOString() },
  { id: 'ds3', name: 'Manual Tracker', type: 'manual', status: 'archived', mappedFunnels: ['f_checkout'], uploadedAt: new Date().toISOString() },
];

export const northStarMetrics = [
  { id: 'm_f1', entityType: 'funnel' as const, entityId: 'f_trial_paid', order: 0 },
  { id: 'm_f2', entityType: 'funnel' as const, entityId: 'f_onboarding', order: 1 },
  { id: 'm_g1', entityType: 'abtest' as const, entityId: 'g1', order: 2 },
];

export const activationTimeSeries: { date: string; conversionRate: number }[] = Array.from({ length: 30 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  const base = 0.12;
  const noise = (Math.sin(i / 3) + Math.random() * 0.05) * 0.02;
  return { date: d.toISOString().slice(0, 10), conversionRate: +(base + noise).toFixed(3) };
});
