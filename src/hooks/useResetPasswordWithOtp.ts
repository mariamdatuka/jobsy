import { useUserStore } from "@src/store/userStore";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { supabase } from "@src/supabase-client";

interface ResetPasswordParams {
  email: string;
  code: string;
  password: string;
}

export const useResetPasswordWithOtp = () => {
  const setResetFlow = useUserStore((s) => s.setResetFlow);

  return useSupabaseMutation(
    async ({ email, code, password }: ResetPasswordParams) => {
      setResetFlow(true);

      try {
        const { data: otpData, error: otpError } =
          await supabase.auth.verifyOtp({
            email,
            token: code,
            type: "recovery",
          });

        if (otpError) {
          throw new Error("Incorrect code");
        }

        if (!otpData.session) {
          throw new Error("Something went wrong, try again!");
        }

        const { error: updateError } = await supabase.auth.updateUser({
          password,
        });

        if (updateError) {
          await supabase.auth.signOut();
          throw new Error(updateError.message);
        }

        // success
        await supabase.auth.signOut();

        return true;
      } catch (error) {
        // optional: ensure session is cleared on ANY failure
        await supabase.auth.signOut();
        throw error;
      } finally {
        setResetFlow(false);
      }
    },
  );
};
