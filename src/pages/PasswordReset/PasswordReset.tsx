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

const PasswordReset = () => {
  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
    mode: "all",
  });

  const { mutate, isPending, isSuccess } = useSupabaseMutation(updatePassword, {
    onSuccess: () => {
      methods.reset();
    },
    onError: (error) => {
      showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data.password);
  };

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/");
  };
  return (
    <>
      {isSuccess ? (
        <Stack
          alignItems="center"
          gap={2}
          justifyContent="center"
          height="100vh"
        >
          <Text variant="h6">Password updated successfully!</Text>
          <MainButton title="Go to Login" onClick={goToLogin} />
        </Stack>
      ) : (
        <Stack
          height="100vh"
          alignItems="center"
          gap={2}
          justifyContent="center"
        >
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
      )}
    </>
  );
};

export default PasswordReset;
