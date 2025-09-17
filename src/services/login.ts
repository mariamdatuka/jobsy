import { supabase } from "@src/supabase-client";

export interface LoginUserData {
  email: string;
  password: string;
}

export const loginUser = async (userData: LoginUserData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password,
  });

  if (error) {
    throw error?.message;
  }

  return {
    user: data.user,
    session: data.session,
  };
};
