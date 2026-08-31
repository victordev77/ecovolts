import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import type { DiagnosticResult, FinancialScenario, Kit } from "../types";

export const FinancialEngine = {
  systemPrice(kit: Kit): number {
    const average = (kit.priceRange[0] + kit.priceRange[1]) / 2;
    return Math.round(average / 100) * 100;
  },

  minimumDownPayment(result: DiagnosticResult, term: number, impactSupport = 0): number {
    const systemPrice = this.systemPrice(result.kit);
    const maximumMonthlyPayment = result.conservativeSaving * ECOVOLTS_CONFIG.financial.maxSavingsCommitment;
    const maximumFinanceableAmount = maximumMonthlyPayment * term;
    return Math.max(0, systemPrice - impactSupport - maximumFinanceableAmount);
  },

  scenario(result: DiagnosticResult, options: { downPayment?: number; term?: number; impactSupport?: number; social?: boolean; title?: string } = {}): FinancialScenario {
    const systemPrice = this.systemPrice(result.kit);
    const requestedTerm = options.term ?? 84;
    const term = ECOVOLTS_CONFIG.financial.allowedTerms.includes(requestedTerm) ? requestedTerm : 84;
    const impactSupport = Math.min(systemPrice, Math.max(0, options.impactSupport ?? 0));
    const maxDownRate = options.social ? ECOVOLTS_CONFIG.financial.socialMaxCoparticipationRate : ECOVOLTS_CONFIG.financial.commonMaxDownPaymentRate;
    const maxDownPayment = Math.round(systemPrice * maxDownRate);
    const downPayment = Math.min(maxDownPayment, Math.max(0, options.downPayment ?? 0));
    const amountToFinance = Math.max(0, systemPrice - impactSupport - downPayment);
    const installment = amountToFinance / term;
    const maxMonthlyPayment = result.conservativeSaving * ECOVOLTS_CONFIG.financial.maxSavingsCommitment;
    const viable = amountToFinance >= 0 && installment <= maxMonthlyPayment && installment * term + 0.01 >= amountToFinance;

    return {
      id: options.social ? "social" : "custom",
      title: options.title ?? (options.social ? "EcoVolts Social" : "Pague com Economia"),
      months: term,
      systemPrice,
      downPayment,
      impactSupport,
      amountToFinance,
      installment,
      maxMonthlyPayment,
      totalBasePayments: installment * term,
      preserved: Math.max(0, result.conservativeSaving - installment),
      needsDownPayment: downPayment > 0,
      viable,
      social: Boolean(options.social),
      minimumDownPayment: this.minimumDownPayment(result, term, impactSupport)
    };
  }
};
