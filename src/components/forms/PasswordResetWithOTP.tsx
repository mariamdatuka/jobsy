import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@src/components/general/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import { resetPasswordSchema } from "@src/schemas/schemas";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";
import { FORGOT_PASSWORD_MODAL, SUCCESS_MODAL } from "@src/modals/modal_names";
import NiceModal from "@ebay/nice-modal-react";
import OTP from "./OTP";
import { useResetPasswordWithOtp } from "@src/hooks/useResetPasswordWithOtp";

const PasswordResetWithOTP = ({ email }: { email: string }) => {
  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      repeatPassword: "",
    },
    mode: "all",
  });

  const { mutate } = useResetPasswordWithOtp();

  const onSubmit = (data: any) => {
    mutate(
      {
        email: email!,
        code: data.code,
        password: data.password,
      },
      {
        onSuccess: () => {
          methods.reset();
          NiceModal.hide(FORGOT_PASSWORD_MODAL);
          NiceModal.show(SUCCESS_MODAL);
        },
        onError: (error) => {
          showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
        },
      },
    );
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} id="submit-new-password">
        <Stack alignItems="center" gap={2} justifyContent="center">
          <OTP />
          <Input
            label="Password"
            name="password"
            type="password"
            sx={{ width: "250px" }}
          />
          <Input
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            sx={{ width: "250px" }}
          />
        </Stack>
      </form>
    </FormProvider>
  );
};

export default PasswordResetWithOTP;
