import { supabase } from "./supabase";

export const authService = {
  async signUp(email: string, password: string) {
    if (!supabase) return { data: null, error: new Error("Supabase não configurado.") };
    return supabase.auth.signUp({ email, password });
  },
  async signIn(email: string, password: string) {
    if (!supabase) return { data: null, error: new Error("Supabase não configurado.") };
    return supabase.auth.signInWithPassword({ email, password });
  },
  async signOut() {
    if (!supabase) return { error: null };
    return supabase.auth.signOut();
  }
};
