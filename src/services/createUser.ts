import { supabase } from "@src/supabase-client";
import type { User } from "@supabase/supabase-js";
import type { Session } from "react-router";

export interface CreateUserData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface CreateUserResponse {
  user: User | null;
  session: Session | null;
  error: any;
}

export const createUser = async (userData: CreateUserData) => {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
      },
    },
  });
  if (error) {
    throw error?.message;
  }

  return {
    user: data.user,
    session: data.session,
  };
};

export const resendEmailConfirmationLink = async (email: string) => {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  });
  if (error) {
    throw error.message;
  }
};
