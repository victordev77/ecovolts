import { describe, expect, it } from "vitest";
import { ECOVOLTS_CONFIG } from "../../config/ecovolts.config";
import { DiagnosticEngine } from "../DiagnosticEngine";

describe("DiagnosticEngine", () => {
  it("gera uma recomendação com economia conservadora", () => {
    const result = DiagnosticEngine.simulate({ ...ECOVOLTS_CONFIG.demoProfile });

    expect(result.kit.id).toBe("conforto");
    expect(result.generationMin).toBeGreaterThan(0);
    expect(result.savingMin).toBeGreaterThan(0);
    expect(result.conservativeSaving).toBeLessThanOrEqual(result.savingMin);
  });

  it("recomenda completo quando o objetivo é segurança energética", () => {
    const result = DiagnosticEngine.simulate({ ...ECOVOLTS_CONFIG.demoProfile, goal: "seguranca" });

    expect(result.kit.id).toBe("completo");
  });
});
