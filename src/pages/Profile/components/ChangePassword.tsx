import { useState } from "react";
import EditInfo from "./EditInfo";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExtendedResetPasswordSchema } from "@src/schemas/schemas";
import Input from "@src/components/general/Input";
import useBreakpoints from "@src/hooks/useBreakpoints";
import MainButton from "@src/components/general/Button";
import { useChangePassword } from "@src/hooks/useChangePassword";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";

const ChangePassword = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };
  const { isReallyTablet } = useBreakpoints();
  const methods = useForm({
    resolver: yupResolver(ExtendedResetPasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      repeatPassword: "",
    },
    mode: "all",
  });

  const { mutate, isPending } = useChangePassword();

  const onSubmit = async (data: any) => {
    mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.password,
      },
      {
        onSuccess: () => {
          methods.reset();
          showToast(TOAST_TYPE.SUCCESS, "Password changed successfully!");
        },
        onError: (error) => {
          console.log(error);
          if (error.message === "CURRENT_PASSWORD_INCORRECT") {
            methods.setError("currentPassword", {
              type: "manual",
              message: "Current password is incorrect",
            });
          }
        },
      },
    );
  };
  return (
    <>
      <EditInfo title="change your password" toggleEditMode={toggleEditMode} />
      {isEditMode && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack gap={3}>
              <Input
                label="Current Password"
                name="currentPassword"
                trimValue
                sx={{ width: isReallyTablet ? "100%" : "550px" }}
                type="password"
              />
              <Stack gap={3} direction="row">
                <Input
                  label="New Password"
                  name="password"
                  trimValue
                  type="password"
                />
                <Input
                  label="Repeat Password"
                  name="repeatPassword"
                  type="password"
                  trimValue
                />
              </Stack>
              <MainButton
                title="save"
                type="submit"
                disabled={!isEditMode || isPending}
                sx={{ width: isReallyTablet ? "100%" : "550px" }}
              />
            </Stack>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default ChangePassword;
