import { supabase } from "@src/supabase-client";

export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return true;
};
