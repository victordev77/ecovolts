import { describe, expect, it } from "vitest";
import { ECOVOLTS_CONFIG } from "../../config/ecovolts.config";
import { DiagnosticEngine } from "../DiagnosticEngine";
import { SocialScenarioEngine } from "../SocialScenarioEngine";

describe("SocialScenarioEngine", () => {
  const result = DiagnosticEngine.simulate({ ...ECOVOLTS_CONFIG.demoProfile });

  it("marca elegibilidade demonstrativa quando CadÚnico é sim", () => {
    const scenario = SocialScenarioEngine.scenario(result, { ...ECOVOLTS_CONFIG.demoProfile, cadunico: "Sim" }, 2000, 84);

    expect(scenario.social).toBe(true);
    expect(scenario.impactSupport).toBeGreaterThan(0);
  });

  it("remove apoio demonstrativo sem elegibilidade", () => {
    const scenario = SocialScenarioEngine.scenario(result, { ...ECOVOLTS_CONFIG.demoProfile, cadunico: "Não" }, 2000, 84);

    expect(scenario.impactSupport).toBe(0);
  });
});
