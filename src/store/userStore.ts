import { supabase } from "@src/supabase-client";
import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";

// interface User {
//   firstName: string;
//   lastName: string;
// }

// interface UserStore {
//   user: User | null;
//   session: Session | null;
//   isLoading: boolean;
//   isRecoveryMode?: boolean;
//   setAuthState: (session: Session | null, isRecoveryMode?: boolean) => void;
//   clearUser: () => void;
//   logout: () => Promise<void>;
//   initializeAuth: () => Promise<(() => void) | undefined>;
// }

// export const useUserStore = create<UserStore>((set) => ({
//   user: null,
//   session: null,
//   isLoading: true,
//   isRecoveryMode: false,
//   setAuthState: (session, isRecoveryMode = false) => {
//     if (session) {
//       set({
//         session,
//         isRecoveryMode,
//         user: {
//           firstName: session?.user?.user_metadata.first_name || "",
//           lastName: session?.user?.user_metadata.last_name || "",
//         },
//         isLoading: false,
//       });
//     } else {
//       set({
//         session: null,
//         user: null,
//         isLoading: false,
//         isRecoveryMode: false,
//       });
//     }
//   },
//   clearUser: () => set({ user: null, session: null }),
//   logout: async () => {
//     try {
//       await supabase.auth.signOut();
//       set({ user: null, session: null });
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   },
//   initializeAuth: async () => {
//     set({ isLoading: true });

//     const params = new URLSearchParams(window.location.hash.substring(1));
//     const isRecovery = params.get("type") === "recovery";
//     set({ isRecoveryMode: isRecovery });

//     try {
//       // Get initial session
//       const { data, error } = await supabase.auth.getSession();

//       if (error) {
//         console.error("Error fetching session:", error);
//         set({ isLoading: false });
//         return undefined;
//       }

//       useUserStore.getState().setAuthState(data?.session, isRecovery);

//       // Listen for auth state changes
//       const {
//         data: { subscription },
//       } = supabase.auth.onAuthStateChange((_event, session) => {
//         useUserStore.getState().setAuthState(session, isRecovery);
//       });

//       return () => subscription.unsubscribe();
//     } catch (error) {
//       console.error("Auth initialization error:", error);
//       set({ isLoading: false });
//       return undefined;
//     }
//   },
// }));

type AuthStatus = "loading" | "logged_out" | "recovery" | "authenticated";

interface UserState {
  session: Session | null;
  status: AuthStatus;
  user: {
    firstName: string;
    lastName: string;
  } | null;

  initializeAuth: () => Promise<(() => void) | undefined>;
  setAuthFromSession: (session: any, isRecovery: boolean) => void;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  session: null,
  status: "loading",
  user: null,

  setAuthFromSession: (session, isRecovery) => {
    if (!session) {
      set({
        session: null,
        status: "logged_out",
        user: null,
      });
      return;
    }

    if (isRecovery) {
      set({
        session,
        status: "recovery",
        user: null, // important: do NOT treat as real login
      });
      return;
    }

    set({
      session,
      status: "authenticated",
      user: {
        firstName: session.user?.user_metadata?.first_name || "",
        lastName: session.user?.user_metadata?.last_name || "",
      },
    });
  },

  initializeAuth: async () => {
    set({ status: "loading" });

    const params = new URLSearchParams(window.location.hash.substring(1));

    const isRecovery = params.get("type") === "recovery";

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Session error:", error);
      set({ status: "logged_out" });
      return;
    }

    get().setAuthFromSession(data.session, isRecovery);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const recovery = event === "PASSWORD_RECOVERY";
      console.log(event, "recovery");
      get().setAuthFromSession(session, recovery);
    });

    // optional cleanup return
    return () => subscription.unsubscribe();
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({
      session: null,
      status: "logged_out",
      user: null,
    });
  },
}));
