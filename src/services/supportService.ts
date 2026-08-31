import type { SupportRequest } from "../types";
import { supabase } from "./supabase";

export const supportService = {
  async save(request: SupportRequest) {
    if (!supabase) return { data: request, error: null };
    return supabase.from("support_requests").insert(request);
  }
};
