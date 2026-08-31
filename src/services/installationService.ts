import { supabase } from "./supabase";

export const installationService = {
  async saveProgress(progress: number) {
    if (!supabase) return { data: { progress }, error: null };
    return supabase.from("installation_progress").insert({ progress });
  }
};
