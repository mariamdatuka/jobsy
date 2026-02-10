import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../general/Input";
import { yupResolver } from "@hookform/resolvers/yup";

export const PasswortResetnSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

const EnterEmailForm = ({ onSubmitCallback }: { onSubmitCallback?: any }) => {
  const methods = useForm({
    resolver: yupResolver(PasswortResetnSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    onSubmitCallback(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        id="send-password-link-form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Input name="email" label="Email" />
      </form>
    </FormProvider>
  );
};

export default EnterEmailForm;
