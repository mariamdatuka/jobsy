import { supabase } from "@src/supabase-client";
import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface User {
  firstName: string;
  lastName: string;
}

interface UserStore {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setAuthState: (session: Session | null) => void;
  clearUser: () => void;
  logout: () => Promise<void>;
  initializeAuth: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  setAuthState: (session) => {
    if (session) {
      set({
        session,
        user: {
          firstName: session?.user?.user_metadata.first_name || "",
          lastName: session?.user?.user_metadata.last_name || "",
        },
        isLoading: false,
      });
    } else {
      set({ session: null, user: null, isLoading: false });
    }
  },
  clearUser: () => set({ user: null, session: null }),
  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null, session: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
  initializeAuth: async () => {
    set({ isLoading: true });

    try {
      // Get initial session
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        set({ isLoading: false });
        return;
      }

      useUserStore.getState().setAuthState(data?.session);

      // Listen for auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        useUserStore.getState().setAuthState(session);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error("Auth initialization error:", error);
      set({ isLoading: false });
    }
  },
}));
