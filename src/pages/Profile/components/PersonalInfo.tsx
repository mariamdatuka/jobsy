import MainButton from "@src/components/general/Button";
import { PersonalInfoSchema } from "@src/schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@src/components/general/Input";
import { Divider, Stack } from "@mui/material";
import EditInfo from "./EditInfo";
import useBreakpoints from "@src/hooks/useBreakpoints";
import type { UserDataProps } from "./UploadAvatar";
import { useEffect, useState } from "react";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { updateUserProfile } from "@src/services/updateUser";
import { useUserStore } from "@src/store/userStore";

type PersonalInfoFields = "email" | "firstName" | "lastName";
const PersonalInfo = ({ userInfo }: UserDataProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const userId = useUserStore((state) => state.session?.user.id);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };
  const { isReallyTablet } = useBreakpoints();
  const methods = useForm({
    resolver: yupResolver(PersonalInfoSchema),
    defaultValues: {
      email: userInfo?.email || "",
      firstName: userInfo?.first_name || "",
      lastName: userInfo?.last_name || "",
    },
    mode: "all",
  });

  useEffect(() => {
    if (userInfo) {
      methods.reset({
        email: userInfo.email || "",
        firstName: userInfo.first_name || "",
        lastName: userInfo.last_name || "",
      });
    }
  }, [userInfo]);

  const isFormDirty = Object.keys(methods.formState.dirtyFields).some((key) => {
    const field = key as PersonalInfoFields;
    const current = methods.getValues(field);
    const original = methods.formState.defaultValues?.[field] ?? "";
    return current.trim() !== String(original).trim();
  });

  const { mutate } = useSupabaseMutation(updateUserProfile, {
    onSuccess: () => {
      console.log("updated");
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Personal info submitted:", data);
    mutate({ ...data, userId, currentEmail: userInfo.email });
  };
  return (
    <>
      <EditInfo toggleEditMode={toggleEditMode} title="Personal Information" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack gap={3}>
            <Stack direction="row" gap={2}>
              {" "}
              <Input
                label="First Name"
                name="firstName"
                trimValue
                disabled={!isEditMode}
              />
              <Input label="Last Name" name="lastName" disabled={!isEditMode} />
            </Stack>
            <Input
              label="Email"
              name="email"
              disabled={!isEditMode}
              trimValue
              sx={{ width: isReallyTablet ? "100%" : "485px" }}
            />

            <MainButton
              title="save"
              type="submit"
              disabled={!isEditMode || !isFormDirty}
              sx={{ width: isReallyTablet ? "100%" : "485px" }}
            />
          </Stack>
        </form>
      </FormProvider>
      <Divider sx={{ my: 4 }} />
    </>
  );
};

export default PersonalInfo;
