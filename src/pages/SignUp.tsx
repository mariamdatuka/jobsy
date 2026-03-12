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
import { useNavigate } from "react-router";
import Text from "@src/components/general/Text";
import { Box, Stack, styled } from "@mui/material";

const SignUp = () => {
  const navigate = useNavigate();
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

  const { mutate, isPending, isError, error } = useSupabaseMutation(
    createUser,
    {
      onSuccess: () => {
        methods.reset();
        NiceModal.show(SIGNUP_SUCCESS_MODAL, {
          onNavigate: () => navigate("/login"),
        });
      },
      onError: (error: Error) => {
        console.error("Error creating user:", error.message);
      },
    },
  );

  const onSubmit = async (userData: CreateUserData) => {
    mutate(userData);
  };

  return (
    <Stack direction="row" height="100vh" gap={10}>
      <Stack
        width="500px"
        alignItems="center"
        justifyContent="center"
        gap={5}
        backgroundColor="primary.main"
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
          sx={{ mt: "10px" }}
        >
          Your Orginized Job Search
        </Text>
      </Stack>
      <Container>
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
              <MainButton title="sign Up" type="submit" disabled={isPending} />
            </Stack>
          </form>
        </FormProvider>
        {isError && (
          <Text variant="body2" color="error" sx={{ mt: 2 }}>
            {error.message}
          </Text>
        )}
      </Container>
    </Stack>
  );
};

export default SignUp;

const Container = styled(Stack)({
  marginLeft: "170px",
  alignItems: "center",
  justifyContent: "center",
});
