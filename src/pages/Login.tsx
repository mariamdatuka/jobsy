import Input from "../components/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MainButton from "../components/Button";
import { Stack, styled } from "@mui/material";
import logo from "@src/assets/images/imgLogo.png";

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <>
      <Container>
        <img src={logo} alt="Logo" width="150px" />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleClick)}>
            <Input label="Email" name="email" />
            <Input label="Password" name="password" />
            <MainButton title="Login" type="submit" />
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default Login;

export const Container = styled(Stack)({
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
});
