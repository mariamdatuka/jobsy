import { yupResolver } from "@hookform/resolvers/yup";

import MainButton from "@src/components/Button";
import Input from "@src/components/Input";
import { SignUpSchema } from "@src/schemas/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { Container } from "./Login";
import bgImage from "@src/assets/images/Bgcrop.jpg";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { createUser, type CreateUserData } from "@src/services/createUser";
import NiceModal from "@ebay/nice-modal-react";
import { SIGNUP_SUCCESS_MODAL } from "@src/modals/modal_names";
import { useNavigate } from "react-router";

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

  const { mutate, isPending } = useSupabaseMutation(createUser, {
    onSuccess: () => {
      methods.reset();
      NiceModal.show(SIGNUP_SUCCESS_MODAL, {
        onNavigate: () => navigate("/login"),
      });
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error.message);
    },
  });

  const onSubmit = async (userData: CreateUserData) => {
    mutate(userData);
  };

  return (
    <Container>
      {/* <img src={bgImage} alt="bgImage" width="50%" /> */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input label="First Name" name="firstName" />
          <Input label="Last Name" name="lastName" />
          <Input label="Email" name="email" />
          <Input label="Password" name="password" />
          <MainButton title="sign Up" type="submit" disabled={isPending} />
        </form>
      </FormProvider>
    </Container>
  );
};

export default SignUp;
