import { supabase } from "@src/supabase-client";

export const deleteUser = async () => {
  const { error } = await supabase.rpc("delete_user");

  if (error) {
    throw error.message;
  }

  return { success: true };
};
