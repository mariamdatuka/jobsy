import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface JobsInputProps extends Omit<TextFieldProps, "name" | "error"> {
  label?: string;
  errorText?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  register?: UseFormRegisterReturn;
  name: string;
  rhfError?: FieldError | boolean;
}

const JobsInput: React.FC<JobsInputProps> = ({
  label,
  errorText,
  leftContent,
  rightContent,
  register,
  name,
  rhfError,
  ...rest
}) => {
  return (
    <TextField
      label={label}
      name={name}
      error={!!rhfError}
      helperText={rhfError ? errorText : undefined}
      InputProps={{
        startAdornment: leftContent ? (
          <InputAdornment position="start">{leftContent}</InputAdornment>
        ) : undefined,
        endAdornment: rightContent ? (
          <InputAdornment position="end">{rightContent}</InputAdornment>
        ) : undefined,
        ...rest.InputProps,
      }}
      inputRef={register?.ref}
      onChange={register?.onChange}
      onBlur={register?.onBlur}
      inputProps={{
        ...(register?.name ? { name: register.name } : {}),
        ...rest.inputProps,
      }}
      {...rest}
    />
  );
};

export default JobsInput;
