import { supabase } from "@src/supabase-client";

export const getUserData = async (userId: string) => {
  const { data: userProfile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }
  return userProfile;
};
