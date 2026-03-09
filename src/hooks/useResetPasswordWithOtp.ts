import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { supabase } from "@src/supabase-client";

interface ResetPasswordParams {
  email: string;
  code: string;
  password: string;
}

export const useResetPasswordWithOtp = () => {
  return useSupabaseMutation(
    async ({ email, code, password }: ResetPasswordParams) => {
      //  Verify OTP
      const { data: otpData, error: otpError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "recovery",
      });

      if (otpError) {
        throw new Error("incorrect code");
      }

      if (!otpData.session) {
        throw new Error("Something went wrong, try again!");
      }

      //  Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      // Sign out the temporary session
      await supabase.auth.signOut();

      return true; // success
    },
  );
};
