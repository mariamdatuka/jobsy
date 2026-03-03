import { supabase } from "@src/supabase-client";
import { useSupabaseMutation } from "./useSupabaseMutation";
type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};
export const useChangePassword = () => {
  return useSupabaseMutation<void, ChangePasswordInput>(
    async ({ currentPassword, newPassword }) => {
      const { data: userData } = await supabase.auth.getUser();
      const email = userData.user?.email;

      if (!email) {
        throw new Error("User not found.");
      }

      // 1️⃣ Re-authenticate
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      });

      if (verifyError) {
        throw new Error("CURRENT_PASSWORD_INCORRECT");
      }

      // 2️⃣ Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }
    },
  );
};
