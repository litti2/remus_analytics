import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as seed from './mockData';
import type { AbTestGroup, AbVariant, DataSource, ExperimentLibraryEntry, ExperimentSuggestion, Funnel, FunnelStep, Insight, Note ,Metric} from './types';


export type EmaState = {
  funnels: Funnel[];
  funnelSteps: FunnelStep[];
  abTestGroups: AbTestGroup[];
  abVariants: AbVariant[];
  suggestions: ExperimentSuggestion[];
  experiments: ExperimentLibraryEntry[];
  insights: Insight[];
  notes: Note[];
  dataSources: DataSource[];
  activationTimeSeries: { date: string; conversionRate: number }[];
  northStarMetrics: { id: string; entityType: 'funnel'|'abtest'; entityId: string; order: number }[];

  addFunnel: (f: Funnel) => void;
  updateFunnel: (f: Funnel) => void;
  deleteFunnel: (id: string) => void;

  addFunnelStep: (s: FunnelStep) => void;
  updateFunnelStep: (s: FunnelStep) => void;
  deleteFunnelStep: (id: string) => void;

  addAbTestGroup: (g: AbTestGroup) => void;
  updateAbTestGroup: (g: AbTestGroup) => void;
  deleteAbTestGroup: (id: string) => void;

  addVariant: (v: AbVariant) => void;
  updateVariant: (v: AbVariant) => void;
  deleteVariant: (id: string) => void;

  addSuggestion: (s: ExperimentSuggestion) => void;
  updateSuggestion: (s: ExperimentSuggestion) => void;
  deleteSuggestion: (id: string) => void;

  addExperiment: (e: ExperimentLibraryEntry) => void;
  updateExperiment: (e: ExperimentLibraryEntry) => void;
  deleteExperiment: (id: string) => void;

  addInsight: (i: Insight) => void;
  updateInsight: (i: Insight) => void;
  deleteInsight: (id: string) => void;

  addNote: (n: Note) => void;
  updateNote: (n: Note) => void;
  deleteNote: (id: string) => void;

  getStepsForFunnel: (funnelId: string) => FunnelStep[];
  getGroupsForFunnel: (funnelId: string) => AbTestGroup[];
  getVariantsForGroup: (groupId: string) => AbVariant[];
  getSuggestionsForFunnel: (funnelId: string) => ExperimentSuggestion[];
  getExperimentsForFunnel: (funnelId: string) => ExperimentLibraryEntry[];
  getInsightsForFunnel: (funnelId: string) => Insight[];

  // 🔥 REQUIRED — these were missing
  addMetricToFunnel: (funnelId: string, m: Metric) => void;
  updateFunnelMetric: (funnelId: string, m: Metric) => void;
  deleteFunnelMetric: (funnelId: string, metricId: string) => void;

  addMetricToGroup: (groupId: string, m: Metric) => void;
  updateGroupMetric: (groupId: string, m: Metric) => void;
  deleteGroupMetric: (groupId: string, metricId: string) => void;

  setNorthStars: (
    list: { id: string; entityType: 'funnel'|'abtest'; entityId: string; order: number }[]
  ) => void;
};

export const useEmaStore = create<EmaState>()(
  persist(
    (set, get) => ({
      funnels: seed.funnels,
      funnelSteps: seed.funnelSteps,
      abTestGroups: seed.abTestGroups,
      abVariants: seed.abVariants,
      suggestions: seed.suggestions,
      experiments: seed.experiments,
      insights: seed.insights,
      notes: seed.notes,
      dataSources: seed.dataSources,
      activationTimeSeries: seed.activationTimeSeries,
      northStarMetrics: seed.northStarMetrics,

      addFunnel: (f) => set((s) => ({ funnels: [...s.funnels, f] })),
      updateFunnel: (f) => set((s) => ({ funnels: s.funnels.map((x) => (x.id === f.id ? f : x)) })),
      deleteFunnel: (id) => set((s) => ({
        funnels: s.funnels.filter((f) => f.id !== id),
        funnelSteps: s.funnelSteps.filter((st) => st.funnelId !== id),
        abTestGroups: s.abTestGroups.map((g) => (g.funnelId === id ? { ...g, funnelId: null } : g)),
      })),

      addFunnelStep: (st) => set((s) => ({ funnelSteps: [...s.funnelSteps, st] })),
      updateFunnelStep: (st) => set((s) => ({ funnelSteps: s.funnelSteps.map((x) => (x.id === st.id ? st : x)) })),
      deleteFunnelStep: (id) => set((s) => ({ funnelSteps: s.funnelSteps.filter((x) => x.id !== id) })),

      addAbTestGroup: (g) => set((s) => ({ abTestGroups: [...s.abTestGroups, g] })),
      updateAbTestGroup: (g) => set((s) => ({ abTestGroups: s.abTestGroups.map((x) => (x.id === g.id ? g : x)) })),
      deleteAbTestGroup: (id) => set((s) => ({
        abTestGroups: s.abTestGroups.filter((g) => g.id !== id),
        abVariants: s.abVariants.filter((v) => v.groupId !== id),
      })),

      addVariant: (v) => set((s) => ({ abVariants: [...s.abVariants, v] })),
      updateVariant: (v) => set((s) => ({ abVariants: s.abVariants.map((x) => (x.id === v.id ? v : x)) })),
      deleteVariant: (id) => set((s) => ({ abVariants: s.abVariants.filter((x) => x.id !== id) })),

      addSuggestion: (su) => set((s) => ({ suggestions: [...s.suggestions, su] })),
      updateSuggestion: (su) => set((s) => ({ suggestions: s.suggestions.map((x) => (x.id === su.id ? su : x)) })),
      deleteSuggestion: (id) => set((s) => ({ suggestions: s.suggestions.filter((x) => x.id !== id) })),

      addExperiment: (e) => set((s) => ({ experiments: [...s.experiments, e] })),
      updateExperiment: (e) => set((s) => ({ experiments: s.experiments.map((x) => (x.id === e.id ? e : x)) })),
      deleteExperiment: (id) => set((s) => ({ experiments: s.experiments.filter((x) => x.id !== id) })),

      addInsight: (i) => set((s) => ({ insights: [...s.insights, i] })),
      updateInsight: (i) => set((s) => ({ insights: s.insights.map((x) => (x.id === i.id ? i : x)) })),
      deleteInsight: (id) => set((s) => ({ insights: s.insights.filter((x) => x.id !== id) })),

      addNote: (n) => set((s) => ({ notes: [...s.notes, n] })),
      updateNote: (n) => set((s) => ({ notes: s.notes.map((x) => (x.id === n.id ? n : x)) })),
      deleteNote: (id) => set((s) => ({ notes: s.notes.filter((x) => x.id !== id) })),

      getStepsForFunnel: (funnelId) => get().funnelSteps.filter((s) => s.funnelId === funnelId).sort((a, b) => a.order - b.order),
      getGroupsForFunnel: (funnelId) => get().abTestGroups.filter((g) => g.funnelId === funnelId),
      getVariantsForGroup: (groupId) => get().abVariants.filter((v) => v.groupId === groupId),
      getSuggestionsForFunnel: (funnelId) => get().suggestions.filter((s) => s.funnelId === funnelId),
      getExperimentsForFunnel: (funnelId) => get().experiments.filter((e) => e.funnelId === funnelId),
      getInsightsForFunnel: (funnelId) => get().insights.filter((i) => i.funnelId === funnelId),

      addMetricToFunnel: (funnelId, m) => set((s)=> ({ funnels: s.funnels.map(f=> f.id===funnelId ? { ...f, metrics: [...(f.metrics||[]), m] } : f) })),
      updateFunnelMetric: (funnelId, m) => set((s)=> ({ funnels: s.funnels.map(f=> f.id===funnelId ? { ...f, metrics: (f.metrics||[]).map(x=> x.id===m.id? m : x) } : f) })),
      deleteFunnelMetric: (funnelId, metricId) => set((s)=> ({ funnels: s.funnels.map(f=> f.id===funnelId ? { ...f, metrics: (f.metrics||[]).filter(x=> x.id!==metricId) } : f) })),

      addMetricToGroup: (groupId, m) => set((s)=> ({ abTestGroups: s.abTestGroups.map(g=> g.id===groupId ? { ...g, metrics: [...(g.metrics||[]), m] } : g) })),
      updateGroupMetric: (groupId, m) => set((s)=> ({ abTestGroups: s.abTestGroups.map(g=> g.id===groupId ? { ...g, metrics: (g.metrics||[]).map(x=> x.id===m.id? m : x) } : g) })),
      deleteGroupMetric: (groupId, metricId) => set((s)=> ({ abTestGroups: s.abTestGroups.map(g=> g.id===groupId ? { ...g, metrics: (g.metrics||[]).filter(x=> x.id!==metricId) } : g) })),

      setNorthStars: (list) => set(()=> ({ northStarMetrics: list })),

    }),
    { name: 'ema-store' ,
    skipHydration: true 
    }
  ),
);
