import { supabase } from "@src/supabase-client";
import { AuthApiError } from "@supabase/supabase-js";

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
    if (error instanceof AuthApiError) {
      throw new Error("Invalid Login Credentials");
    }
    throw error?.message;
  }

  return {
    user: data.user,
    session: data.session,
  };
};
