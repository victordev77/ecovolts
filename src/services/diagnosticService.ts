import type { DiagnosticProfile, DiagnosticResult } from "../types";
import { supabase } from "./supabase";

export const diagnosticService = {
  async save(profile: DiagnosticProfile, result: DiagnosticResult) {
    if (!supabase) return { data: { profile, result }, error: null };
    return supabase.from("diagnostics").insert({ profile, result });
  }
};
