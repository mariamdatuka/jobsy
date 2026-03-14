import { yupResolver } from "@hookform/resolvers/yup";
import logo from "@src/assets/images/imgLogo.png";
import MainButton from "@src/components/general/Button";
import Input from "@src/components/general/Input";
import { SignUpSchema } from "@src/schemas/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { createUser, type CreateUserData } from "@src/services/createUser";
import NiceModal from "@ebay/nice-modal-react";
import { SIGNUP_SUCCESS_MODAL } from "@src/modals/modal_names";
import { Link, useNavigate } from "react-router";
import Text from "@src/components/general/Text";
import { Box, Stack, styled } from "@mui/material";
import { motion } from "framer-motion";
import useBreakpoints from "@src/hooks/useBreakpoints";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";

const SignUp = () => {
  const navigate = useNavigate();
  const { isDesktop, isTabletOnly } = useBreakpoints();
  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: "",
    },
    mode: "all",
  });

  const { mutate, isPending } = useSupabaseMutation(createUser, {
    onSuccess: () => {
      methods.reset();
      NiceModal.show(SIGNUP_SUCCESS_MODAL, {
        onNavigate: () => navigate("/login"),
      });
    },
    onError: (error) => {
      showToast(TOAST_TYPE.ERROR, error.message);
    },
  });

  const onSubmit = async (userData: CreateUserData) => {
    mutate(userData);
  };

  return (
    <Stack
      direction={isTabletOnly ? "column" : "row"}
      height="100vh"
      gap={10}
      alignItems={isTabletOnly ? "center" : "normal"}
      justifyContent={isTabletOnly ? "center" : "normal"}
    >
      <MotionStack
        width="500px"
        alignItems="center"
        justifyContent="center"
        gap={5}
        sx={{
          backgroundColor: isTabletOnly ? "none" : "primary.main",
          display: isTabletOnly ? "none" : "flex",
        }}
        initial={{ x: isTabletOnly ? -100 : -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: "120px",
            padding: "5px",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        />
        <Text
          variant="h6"
          color="text.primary"
          fontFamily="Viga"
          sx={{ mt: "10px", display: isTabletOnly ? "none" : "block" }}
        >
          Your Orginized Job Search
        </Text>
      </MotionStack>
      <MotionContainer
        isDesktop={isDesktop}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack gap={2}>
              <Input
                label="First Name"
                name="firstName"
                sx={{ width: "350px" }}
              />
              <Input
                label="Last Name"
                name="lastName"
                sx={{ width: "350px" }}
              />
              <Input
                label="Email"
                name="email"
                sx={{ width: "350px" }}
                trimValue
              />
              <Input
                label="Password"
                name="password"
                sx={{ width: "350px" }}
                type="password"
                trimValue
              />
              <Input
                label="Repeat Password"
                name="repeatPassword"
                sx={{ width: "350px" }}
                type="password"
                trimValue
              />
              <MainButton
                title="sign Up"
                type="submit"
                disabled={isPending}
                sx={{ mt: 2 }}
              />
              <Stack
                direction="row"
                gap={1}
                alignItems="center"
                justifyContent="center"
              >
                <Text variant="body2" color="secondary.light">
                  Already have an account?
                </Text>
                <Link to="/">
                  <Text variant="body2" color="error">
                    Sign In
                  </Text>
                </Link>
              </Stack>
            </Stack>
          </form>
        </FormProvider>
        {/* {isError && (
          <Text variant="body2" color="error" sx={{ mt: 2 }}>
            {error.message}
          </Text>
        )} */}
      </MotionContainer>
    </Stack>
  );
};

export default SignUp;

const Container = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isDesktop",
})<{ isDesktop: boolean }>(({ isDesktop }) => ({
  position: "relative",
  marginLeft: isDesktop ? "170px" : "20px",
  alignItems: "center",
  justifyContent: "center",
}));

const MotionStack = motion(Stack);
const MotionContainer = motion(Container);
