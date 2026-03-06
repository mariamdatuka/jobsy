import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@src/components/general/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import MainButton from "@src/components/general/Button";
import Text from "@src/components/general/Text";
import { resetPasswordSchema } from "@src/schemas/schemas";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { updatePassword } from "@src/services/newPassword";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";

import { supabase } from "@src/supabase-client";
import { PASSWORD_RESET_SUCCESS_MODAL } from "@src/modals/modal_names";
import NiceModal from "@ebay/nice-modal-react";

const PasswordReset = () => {
  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
    mode: "all",
  });

  const { mutate, isPending } = useSupabaseMutation(updatePassword, {
    onSuccess: async () => {
      localStorage.removeItem("isRecoveryMode");
      await supabase.auth.signOut();
      methods.reset();
      NiceModal.show(PASSWORD_RESET_SUCCESS_MODAL);
    },
    onError: (error) => {
      showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data.password);
  };

  return (
    <Stack height="100vh" alignItems="center" gap={2} justifyContent="center">
      <Text variant="h6">Please enter new password</Text>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack alignItems="center" gap={2} justifyContent="center">
            <Input label="Password" name="password" type="password" />
            <Input
              label="Repeat Password"
              name="repeatPassword"
              type="password"
            />
            <MainButton
              title="Reset Password"
              disabled={isPending}
              type="submit"
              loading={isPending}
              loadingPosition="start"
            />
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default PasswordReset;
