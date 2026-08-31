import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import type { CareMetric, DiagnosticResult } from "../types";

export const CareDashboard = {
  scaledDataset(result: DiagnosticResult): CareMetric[] {
    const expectedGeneration = (result.generationMin + result.generationMax) / 2;
    const expectedSaving = (result.savingMin + result.savingMax) / 2;
    return ECOVOLTS_CONFIG.care.months.map((month, index) => ({
      month,
      expected: Math.round(expectedGeneration),
      actual: Math.round(expectedGeneration * ECOVOLTS_CONFIG.care.monthlyFactors[index]),
      expectedSaving: Math.round(expectedSaving),
      saving: Math.round(expectedSaving * ECOVOLTS_CONFIG.care.monthlyFactors[index])
    }));
  }
};
