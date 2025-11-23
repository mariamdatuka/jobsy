import { supabase } from "@src/supabase-client";

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
};
