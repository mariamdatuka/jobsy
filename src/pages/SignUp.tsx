import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import MainButton from "@src/components/Button";
import Input from "@src/components/Input";
import { SignUpSchema } from "@src/schemas/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { Container } from "./Login";
import bgImage from "@src/assets/images/Bgcrop.jpg";

const SignUp = () => {
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

  const handleClick = () => {
    console.log("Button clicked");
  };
  return (
    <Container>
      <img src={bgImage} alt="bgImage" width="50%" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleClick)}>
          <Stack gap="15px">
            <Input label="First Name" name="firstName" />
            <Input label="Last Name" name="lastName" />
            <Input label="Email" name="email" />
            <Input label="Password" name="password" />
            <MainButton title="sign up" type="submit" />
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
};

export default SignUp;
