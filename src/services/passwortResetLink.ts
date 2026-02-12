import { supabase } from "@src/supabase-client";

export const resetPasswordLink = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `http://localhost:5173/passwordreset`,
  });

  if (error) {
    throw error.message;
  }

  return true;
};
