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
  try {
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
      throw error;
    }
    return {
      user: data.user,
      session: data.session,
      error: error,
    };
  } catch (error) {
    console.log("hi");
    console.log("Error creating user:", error);
    throw error;
  }
};
