import { describe, expect, it } from "vitest";
import { ECOVOLTS_CONFIG } from "../../config/ecovolts.config";
import { DiagnosticEngine } from "../DiagnosticEngine";
import { FinancialEngine } from "../FinancialEngine";

describe("FinancialEngine", () => {
  const result = DiagnosticEngine.simulate({ ...ECOVOLTS_CONFIG.demoProfile });

  it("limita a parcela do Pague com Economia a 70% da economia conservadora", () => {
    const scenario = FinancialEngine.scenario(result, { downPayment: 6400, term: 84 });

    expect(scenario.maxMonthlyPayment).toBeCloseTo(result.conservativeSaving * 0.7);
    expect(scenario.installment).toBeLessThanOrEqual(scenario.maxMonthlyPayment);
    expect(scenario.viable).toBe(true);
  });

  it("calcula a entrada mínima quando a parcela não cabe", () => {
    const minimum = FinancialEngine.minimumDownPayment(result, 36);

    expect(minimum).toBeGreaterThanOrEqual(0);
  });
});
