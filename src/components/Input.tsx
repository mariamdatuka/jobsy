import {
  Stack,
  TextField,
  type TextFieldProps,
  type TextFieldVariants,
  InputAdornment,
} from "@mui/material";
import type { JSX } from "react";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = TextFieldProps & {
  label?: string;
  variant?: TextFieldVariants;
  name: string;
  placeholder?: string;
  sx?: any;
  leftContent?: string | JSX.Element;
  rightContent?: string | JSX.Element;
};

const Input = ({
  label,
  variant = "outlined",
  name,
  placeholder,
  sx,
  leftContent,
  rightContent,
}: InputProps) => {
  const { control } = useFormContext();

  const inputSlotProps: any = {};
  if (leftContent) {
    inputSlotProps.startAdornment = (
      <InputAdornment position="start">{leftContent}</InputAdornment>
    );
  }
  if (rightContent) {
    inputSlotProps.endAdornment = (
      <InputAdornment position="end">{rightContent}</InputAdornment>
    );
  }
  return (
    <Stack gap={0.5}>
      {label && (
        <label style={{ marginLeft: "10px", fontSize: "14px" }}>{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            placeholder={placeholder}
            variant={variant}
            error={!!error}
            helperText={error?.message}
            slotProps={{
              input: {
                ...inputSlotProps,
              },
            }}
            sx={{
              "& .MuiInputBase-input": {
                padding: "8px 14px",
              },
              width: "350px",
              borderRadius: "50%",
              ...sx,
            }}
          />
        )}
      />
    </Stack>
  );
};

export default Input;
