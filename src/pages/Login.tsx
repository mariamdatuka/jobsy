import Input from "../components/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MainButton from "../components/Button";
import { Stack, styled } from "@mui/material";
import logo from "@src/assets/images/imgLogo.png";
import { SignInSchema } from "@src/schemas/schemas";
import Text from "@components/Text";
import { Link } from "react-router";

const Login = () => {
  const methods = useForm({
    resolver: yupResolver(SignInSchema),
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
        <Text
          variant="h4"
          color="info"
          fontFamily="Viga"
          sx={{ mt: "20px", mb: "10px" }}
        >
          JOBSY
        </Text>
        <Text
          variant="h6"
          color="text.primary"
          fontFamily="Viga"
          sx={{ mb: "20px" }}
        >
          Your Orginized Job Search
        </Text>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleClick)}>
            <Stack gap="15px">
              <Input label="Email" name="email" />
              <Input label="Password" name="password" />
              <Stack direction="row" justifyContent="space-between">
                <Link
                  to="/signup"
                  style={{ color: "#999EA1", fontSize: "14px" }}
                >
                  Sign Up
                </Link>
                <Link
                  to="/passwordrecovery"
                  style={{
                    color: "#FB344F",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  forgot password
                </Link>
              </Stack>
              <MainButton title="Login" type="submit" sx={{ mt: "10px" }} />
            </Stack>
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
