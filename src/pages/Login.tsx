import Input from "../components/general/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MainButton from "../components/general/Button";
import { Stack, styled } from "@mui/material";
import logo from "@src/assets/images/imgLogo.png";
import { SignInSchema } from "@src/schemas/schemas";
import Text from "@src/components/general/Text";
import { Link } from "react-router";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { loginUser, type LoginUserData } from "@src/services/login";
import { useNavigate } from "react-router";
import NiceModal from "@ebay/nice-modal-react";
import { FORGOT_PASSWORD_MODAL } from "@src/modals/modal_names";
import { useUserStore } from "@src/store/userStore";

const Login = () => {
  const methods = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const navigate = useNavigate();
  const openPasswordResetModal = () => {
    NiceModal.show(FORGOT_PASSWORD_MODAL);
  };

  const isRecoveryMode = useUserStore((state) => state.isRecoveryMode);
  const { isPending, isError, error, mutate } = useSupabaseMutation(loginUser, {
    onSuccess: () => {
      methods.reset();
      if (!isRecoveryMode) {
        navigate("/dashboard");
      }
    },
  });

  const handleUserLogin = async (userData: LoginUserData) => {
    mutate(userData);
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
          <form onSubmit={methods.handleSubmit(handleUserLogin)}>
            <Stack gap="15px">
              {isError && <Text color="error">{error?.message}</Text>}
              <Input label="Email" name="email" trimValue />
              <Input
                label="Password"
                name="password"
                type="password"
                trimValue
              />
              <Stack direction="row" justifyContent="space-between">
                <Link
                  to="/signup"
                  style={{ color: "#999EA1", fontSize: "14px" }}
                >
                  Sign Up
                </Link>
                <Text
                  style={{
                    color: "#FB344F",
                    fontSize: "14px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onClick={openPasswordResetModal}
                >
                  forgot password?
                </Text>
              </Stack>
              <MainButton
                title="Login"
                type="submit"
                sx={{ mt: "10px" }}
                disabled={isPending}
              />
            </Stack>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default Login;

export const Container = styled(Stack)({
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
});
