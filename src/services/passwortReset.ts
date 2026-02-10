import { supabase } from "@src/supabase-client";

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/passwordreset`,
  });

  if (error) {
    throw error.message;
  }

  return true;
};
