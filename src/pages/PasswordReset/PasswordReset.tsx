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
import { useNavigate } from "react-router";

import { supabase } from "@src/supabase-client";
import { PASSWORD_RESET_SUCCESS_MODAL } from "@src/modals/modal_names";
import NiceModal, { hide } from "@ebay/nice-modal-react";

const PasswordReset = () => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
    mode: "all",
  });

  const goToLogin = async () => {
    NiceModal.hide(PASSWORD_RESET_SUCCESS_MODAL);
    localStorage.removeItem("isRecoveryMode");

    await supabase.auth.signOut();
    navigate("/");
  };

  const { mutate, isPending } = useSupabaseMutation(updatePassword, {
    onSuccess: () => {
      methods.reset();
      NiceModal.show(PASSWORD_RESET_SUCCESS_MODAL, {
        onNavigate: goToLogin,
      });
    },
    onError: (error) => {
      showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data.password);
  };

  return (
    <>
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
      )
    </>
  );
};

export default PasswordReset;
