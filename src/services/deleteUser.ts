import { supabase } from "@src/supabase-client";

export const deleteUser = async () => {
  const { error } = await supabase.rpc("delete_user");

  if (error) {
    throw new Error("Failed to delete account. Please try again.");
  }

  await supabase.auth.signOut();

  return { success: true };
};
