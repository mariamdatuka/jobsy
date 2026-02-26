import MainButton from "@src/components/general/Button";
import { SignUpSchema } from "@src/schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@src/components/general/Input";
import { Divider, Stack } from "@mui/material";
import EditInfo from "./EditInfo";
import useBreakpoints from "@src/hooks/useBreakpoints";
const PersonalInfo = () => {
  const { isReallyTablet } = useBreakpoints();
  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    mode: "all",
  });

  const onSubmit = async (data: any) => {
    console.log("Personal info submitted:", data);
  };
  return (
    <>
      <EditInfo />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack gap={3}>
            <Stack direction="row" gap={2}>
              {" "}
              <Input label="First Name" name="firstName" />
              <Input label="Last Name" name="lastName" />
            </Stack>
            <Input
              label="Email"
              name="email"
              sx={{ width: isReallyTablet ? "100%" : "485px" }}
            />
            <Stack direction="row" gap={2}>
              <Input label="Password" name="password" />
              <Input label="Confirm Password" name="confirmPassword" />
            </Stack>

            <MainButton
              title="save"
              type="submit"
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
