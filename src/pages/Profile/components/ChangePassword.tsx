import { useState } from "react";
import EditInfo from "./EditInfo";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExtendedResetPasswordSchema } from "@src/schemas/schemas";
import Input from "@src/components/general/Input";
import useBreakpoints from "@src/hooks/useBreakpoints";
import MainButton from "@src/components/general/Button";
import { useUserStore } from "@src/store/userStore";
import { supabase } from "@src/supabase-client";

const ChangePassword = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  //   const userEmail = useUserStore((state) => state.user?.email);
  //   console.log(userEmail);
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

  const onSubmit = async (data: any) => {
    const { data: userData } = await supabase.auth.getUser();
    const email = userData.user?.email;

    if (!email) return;

    // 1️⃣ Verify current password
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email,
      password: data.currentPassword,
    });

    if (verifyError) {
      methods.setError("currentPassword", {
        type: "manual",
        message: "Current password is incorrect",
      });
      return;
    }

    // 2️⃣ Update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (!updateError) {
      console.log("Password updated successfully");
    }
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
                sx={{ width: isReallyTablet ? "100%" : "485px" }}
              />
              <Stack gap={3} direction="row">
                <Input label="New Password" name="password" trimValue />
                <Input
                  label="Repeat Password"
                  name="repeatPassword"
                  trimValue
                />
              </Stack>
              <MainButton
                title="save"
                type="submit"
                disabled={!isEditMode}
                sx={{ width: isReallyTablet ? "100%" : "485px" }}
              />
            </Stack>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default ChangePassword;
