import { supabase } from "@src/supabase-client";

export const passwordResetOTP = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    throw error.message;
  }

  return true;
};
