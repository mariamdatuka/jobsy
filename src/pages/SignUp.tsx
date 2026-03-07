import { yupResolver } from "@hookform/resolvers/yup";

import MainButton from "@src/components/general/Button";
import Input from "@src/components/general/Input";
import { SignUpSchema } from "@src/schemas/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { Container } from "./Login";
import bgImage from "@src/assets/images/Bgcrop.jpg";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { createUser, type CreateUserData } from "@src/services/createUser";
import NiceModal from "@ebay/nice-modal-react";
import { SIGNUP_SUCCESS_MODAL } from "@src/modals/modal_names";
import { useNavigate } from "react-router";
import Text from "@src/components/general/Text";

const SignUp = () => {
  const navigate = useNavigate();
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
    <Container>
      {/* <img src={bgImage} alt="bgImage" width="50%" /> */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input label="First Name" name="firstName" sx={{ width: "250px" }} />
          <Input label="Last Name" name="lastName" sx={{ width: "250px" }} />
          <Input label="Email" name="email" sx={{ width: "250px" }} />
          <Input label="Password" name="password" sx={{ width: "250px" }} />
          <MainButton title="sign Up" type="submit" disabled={isPending} />
        </form>
      </FormProvider>
      {isError && (
        <Text variant="body2" color="error" sx={{ mt: 2 }}>
          {error.message}
        </Text>
      )}
    </Container>
  );
};

export default SignUp;
