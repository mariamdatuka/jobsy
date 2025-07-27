import Input from "../components/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
    },
    mode: "onChange",
  });

  return (
    <>
      <FormProvider {...methods}>
        <Input label="Email" name="email" />
        <Input label="Password" name="password" />
      </FormProvider>
    </>
  );
};

export default Login;
