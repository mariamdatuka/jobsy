import { create } from "zustand";
import { supabase } from "@src/supabase-client";
import { Session } from "@supabase/supabase-js";

interface User {
  firstName: string;
  lastName: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
