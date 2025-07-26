import { Stack, TextField, type TextFieldVariants } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface InputProps {
  label: string;
  variant?: TextFieldVariants;
  name: string;
}

const Input = ({ label, variant = "outlined", name }: InputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name]?.message as string;
  return (
    <Stack spacing={1}>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="firstName"
            variant={variant}
            error={!!fieldError}
            helperText={fieldError}
          />
        )}
      />
    </Stack>
  );
};

export default Input;
