import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@src/components/general/Input";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import MainButton from "@src/components/general/Button";
import Text from "@src/components/general/Text";
import { passwordRegex } from "@src/schemas/schemas";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { updatePassword } from "@src/services/newPassword";

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      passwordRegex,
      "Only Latin letters and at least one uppercase letter and one number",
    ),

  repeatPassword: yup
    .string()
    .required("Repeat password is required")
    .test("password-match", "Passwords must match", function (value) {
      return value === this.parent.password;
    }),
});

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
    onSuccess: () => {
      console.log("Password updated successfully");
    },
    onError: (err) => {
      console.error("Error updating password:", err);
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
    </>
  );
};

export default PasswordReset;
