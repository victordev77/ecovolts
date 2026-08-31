import type { FinancialScenario } from "../types";
import { supabase } from "./supabase";

export const simulationService = {
  async save(scenario: FinancialScenario) {
    if (!supabase) return { data: scenario, error: null };
    return supabase.from("acquisition_simulations").insert({ scenario });
  }
};
