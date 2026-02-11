import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@src/components/general/Input";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import MainButton from "@src/components/general/Button";
import Text from "@src/components/general/Text";

const resetPasswordSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  repeatPassword: yup.string().required("Repeat password is required"),
});

const PasswordReset = () => {
  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });
  return (
    <>
      <Stack height="100vh" alignItems="center" gap={2} justifyContent="center">
        <Text variant="h6">Please enter new password</Text>
        <FormProvider {...methods}>
          <form>
            <Stack alignItems="center" gap={2} justifyContent="center">
              <Input label="Password" name="password" type="password" />
              <Input
                label="Repeat Password"
                name="repeatPassword"
                type="password"
              />
              <MainButton title="Reset Password" />
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </>
  );
};

export default PasswordReset;
