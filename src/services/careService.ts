import type { CareMetric } from "../types";
import { supabase } from "./supabase";

export const careService = {
  async saveMetrics(metrics: CareMetric[]) {
    if (!supabase) return { data: metrics, error: null };
    return supabase.from("care_metrics").insert({ metrics });
  }
};
