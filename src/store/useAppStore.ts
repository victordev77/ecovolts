import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import { CareDashboard, DiagnosticEngine, FinancialEngine, SocialScenarioEngine } from "../engines";
import type { AcquisitionMode, CareMetric, DiagnosticProfile, DiagnosticResult, FinancialScenario, SupportRequest } from "../types";

interface AppStore {
  profile: DiagnosticProfile | null;
  result: DiagnosticResult | null;
  acquisitionMode: AcquisitionMode;
  downPayment: number;
  term: number;
  installProgress: number;
  careActive: boolean;
  careAlert: boolean;
  supportRequests: SupportRequest[];
  setProfile: (profile: DiagnosticProfile) => void;
  runDemo: () => void;
  setAcquisitionMode: (mode: AcquisitionMode) => void;
  setDownPayment: (value: number) => void;
  setTerm: (value: number) => void;
  currentScenario: () => FinancialScenario | null;
  careMetrics: () => CareMetric[];
  advanceInstallation: () => void;
  toggleCareAlert: () => void;
  addSupportRequest: (category: string, description: string) => void;
  resetDemo: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      profile: null,
      result: null,
      acquisitionMode: "economia",
      downPayment: 6400,
      term: 84,
      installProgress: 3,
      careActive: false,
      careAlert: false,
      supportRequests: [],

      setProfile: (profile) => set({ profile, result: DiagnosticEngine.simulate(profile), careActive: false, installProgress: 3 }),
      runDemo: () => {
        const profile = ECOVOLTS_CONFIG.demoProfile;
        set({
          profile,
          result: DiagnosticEngine.simulate(profile),
          acquisitionMode: "economia",
          downPayment: 6400,
          term: 84,
          installProgress: 3,
          careActive: false,
          careAlert: false
        });
      },
      setAcquisitionMode: (mode) => set({ acquisitionMode: mode }),
      setDownPayment: (value) => set({ downPayment: Math.max(0, value) }),
      setTerm: (value) => set({ term: value }),
      currentScenario: () => {
        const { profile, result, acquisitionMode, downPayment, term } = get();
        if (!profile || !result) return null;
        if (acquisitionMode === "social") return SocialScenarioEngine.scenario(result, profile, downPayment, term);
        return FinancialEngine.scenario(result, { downPayment: acquisitionMode === "avista" ? FinancialEngine.systemPrice(result.kit) : downPayment, term });
      },
      careMetrics: () => {
        const result = get().result;
        return result ? CareDashboard.scaledDataset(result) : [];
      },
      advanceInstallation: () => {
        const next = Math.min(5, get().installProgress + 1);
        set({ installProgress: next, careActive: next >= 5 });
      },
      toggleCareAlert: () => set({ careAlert: !get().careAlert }),
      addSupportRequest: (category, description) =>
        set({
          supportRequests: [
            { id: crypto.randomUUID(), category, description, status: "Aberta", createdAt: new Date().toISOString() },
            ...get().supportRequests
          ]
        }),
      resetDemo: () => set({ profile: null, result: null, acquisitionMode: "economia", downPayment: 6400, term: 84, installProgress: 3, careActive: false, careAlert: false, supportRequests: [] })
    }),
    { name: ECOVOLTS_CONFIG.storageKey }
  )
);
