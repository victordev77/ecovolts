import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import type { DiagnosticProfile, DiagnosticResult, FinancialScenario } from "../types";
import { FinancialEngine } from "./FinancialEngine";

export const SocialScenarioEngine = {
  eligible(profile?: DiagnosticProfile | null): boolean {
    return profile?.cadunico === "Sim";
  },

  impactSupport(result: DiagnosticResult): number {
    return Math.round((FinancialEngine.systemPrice(result.kit) * ECOVOLTS_CONFIG.financial.socialImpactSupportRate) / 100) * 100;
  },

  scenario(result: DiagnosticResult, profile: DiagnosticProfile, downPayment: number, term: number): FinancialScenario {
    const eligible = this.eligible(profile);
    return FinancialEngine.scenario(result, {
      downPayment,
      term,
      impactSupport: eligible ? this.impactSupport(result) : 0,
      social: true,
      title: "EcoVolts Social"
    });
  }
};
