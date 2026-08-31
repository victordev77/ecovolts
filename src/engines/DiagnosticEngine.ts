import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import type { DiagnosticProfile, DiagnosticResult, Kit } from "../types";
import { RecommendationEngine } from "./RecommendationEngine";

type FactorMap = Record<string, number>;

export const DiagnosticEngine = {
  simulate(profile: DiagnosticProfile, forcedKit?: Kit): DiagnosticResult {
    const kit = forcedKit ?? RecommendationEngine.recommend(profile);
    const simulation = ECOVOLTS_CONFIG.simulation;
    const tariff = ECOVOLTS_CONFIG.tariffByState[profile.state as keyof typeof ECOVOLTS_CONFIG.tariffByState] ?? ECOVOLTS_CONFIG.tariffByState.Outro;
    const locationFactor = profile.state === "Ceará" ? simulation.cearaLocationFactor : simulation.defaultLocationFactor;
    const shadeFactor = (ECOVOLTS_CONFIG.factors.shade as FactorMap)[profile.shade] ?? 0.86;
    const roofFactor = (ECOVOLTS_CONFIG.factors.roof as FactorMap)[profile.roof] ?? 0.88;
    const usageFactor = (ECOVOLTS_CONFIG.factors.usageTime as FactorMap)[profile.usageTime] ?? 0.92;
    const factor = locationFactor * shadeFactor * roofFactor * usageFactor;
    const targetGeneration = Math.min(profile.kwh * simulation.maximumCoverageRatio, kit.monthlyGenerationReference * factor);
    const generationMin = Math.max(simulation.minimumGeneration, targetGeneration * simulation.generationRangeLow);
    const generationMax = Math.max(generationMin + 12, targetGeneration * simulation.generationRangeHigh);
    const reductionMin = Math.min(simulation.reductionCapLow, (generationMin / profile.kwh) * 100);
    const reductionMax = Math.min(simulation.reductionCapHigh, (generationMax / profile.kwh) * 100);
    const savingMin = Math.max(0, generationMin * tariff);
    const savingMax = Math.max(savingMin + 8, generationMax * tariff);
    const conservativeSaving = savingMin * ECOVOLTS_CONFIG.conservativeMargin;
    const confidence = profile.unknownKwh || profile.shade === "Não sei" || profile.roof === "Não sei" ? "Inicial" : profile.appliances.length >= 4 ? "Alta" : "Média";
    const estimatedBillAfter = Math.max(simulation.minimumPostSolarBill, profile.bill - savingMin);

    return {
      kit,
      generationMin,
      generationMax,
      reductionMin,
      reductionMax,
      savingMin,
      savingMax,
      conservativeSaving,
      confidence,
      estimatedBillAfter
    };
  }
};
