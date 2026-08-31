import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import type { DiagnosticProfile, DiagnosticResult, Kit } from "../types";

export const RecommendationEngine = {
  recommend(profile: DiagnosticProfile): Kit {
    const { kits, recommendation } = ECOVOLTS_CONFIG;
    if (profile.goal === "seguranca" || profile.kwh >= recommendation.highConsumptionKwh) return kits.completo;
    if (profile.bill <= recommendation.lowBill || profile.kwh <= recommendation.lowConsumptionKwh || profile.goal === "entrada") return kits.essencial;
    return kits.conforto;
  },

  reasons(profile: DiagnosticProfile, result: DiagnosticResult): string[] {
    const base = [
      `Compatível com consumo de ${profile.kwh} kWh/mês.`,
      "Equilibra investimento demonstrativo e geração estimada.",
      "Mantém a recomendação dentro de uma simulação prudente."
    ];
    if (result.kit.id === "completo") {
      return ["Inclui armazenamento e backup de cargas selecionadas.", "Atende melhor o objetivo de segurança energética.", "É indicado para quem aceita maior investimento demonstrativo."];
    }
    if (result.kit.id === "essencial") {
      return ["Reduz a barreira de entrada.", "Evita adicionar bateria por padrão.", "Pode ser expandido quando houver compatibilidade técnica."];
    }
    return base;
  }
};
