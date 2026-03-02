import { useState } from "react";
import EditInfo from "./EditInfo";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalInfoSchema } from "@src/schemas/schemas";
import Input from "@src/components/general/Input";
import useBreakpoints from "@src/hooks/useBreakpoints";
import MainButton from "@src/components/general/Button";

const ChangePassword = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };
  const { isReallyTablet } = useBreakpoints();
  const methods = useForm({
    resolver: yupResolver(PersonalInfoSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
    mode: "all",
  });
  return (
    <>
      <EditInfo title="change your password" toggleEditMode={toggleEditMode} />
      {isEditMode && (
        <FormProvider {...methods}>
          <form>
            <Stack gap={3}>
              <Input
                label="Current Password"
                name="currentPassword"
                trimValue
                sx={{ width: isReallyTablet ? "100%" : "485px" }}
              />
              <Stack gap={3} direction="row">
                <Input label="New Password" name="newPassword" trimValue />
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
