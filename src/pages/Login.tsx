import Input from "../components/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MainButton from "../components/Button";

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().required("First name is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleClick)}>
          <Input label="Email" name="email" />
          <MainButton title="Login" type="submit" />
        </form>
      </FormProvider>
    </>
  );
};

export default Login;
