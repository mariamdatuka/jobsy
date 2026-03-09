import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@src/components/general/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import Text from "@src/components/general/Text";
import { resetPasswordSchema } from "@src/schemas/schemas";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { updatePassword } from "@src/services/newPassword";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";
import { supabase } from "@src/supabase-client";
import { SUCCESS_MODAL } from "@src/modals/modal_names";
import NiceModal from "@ebay/nice-modal-react";
import OTP from "./OTP";

const PasswordResetWithOTP = () => {
  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      repeatPassword: "",
    },
    mode: "all",
  });

  const { mutate, isPending } = useSupabaseMutation(updatePassword, {
    onSuccess: async () => {
      // await supabase.auth.signOut();
      // methods.reset();
      // NiceModal.show(SUCCESS_MODAL);
    },
    onError: (error) => {
      showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data.password);
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
