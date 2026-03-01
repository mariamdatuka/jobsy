import {
  Stack,
  TextField,
  type TextFieldProps,
  type TextFieldVariants,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState, type JSX } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type InputProps = TextFieldProps & {
  label?: string;
  variant?: TextFieldVariants;
  name: string;
  placeholder?: string;
  sx?: any;
  leftContent?: string | JSX.Element;
  rightContent?: string | JSX.Element;
  multiline?: boolean;
  rows?: number;
  slotProps?: any;
  type?: string;
  disabled?: boolean;
  trimValue?: boolean;
};

const Input = ({
  label,
  variant = "outlined",
  name,
  placeholder,
  sx,
  leftContent,
  rightContent,
  multiline = false,
  rows,
  type = "text",
  disabled = false,
  slotProps,
  trimValue = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    control,
    formState: { errors, defaultValues },
  } = useFormContext();

  const fieldError = errors[name]?.message;
  const inputSlotProps: any = {};
  if (leftContent) {
    inputSlotProps.startAdornment = (
      <InputAdornment position="start">{leftContent}</InputAdornment>
    );
  }

  inputSlotProps.endAdornment = (
    <InputAdornment position="end">
      {isPassword ? (
        <IconButton onClick={handleClickShowPassword} edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      ) : (
        rightContent
      )}
    </InputAdornment>
  );

  return (
    <Stack gap={0.5}>
      {label && (
        <label
          style={{
            marginLeft: "10px",
            fontSize: "14px",
            color: fieldError ? "#FB344F" : "#240854",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            onChange={(e) =>
              field.onChange(trimValue ? e.target.value.trim() : e.target.value)
            }
            onBlur={() => {
              const value = field.value;
              if (!value) {
                const original = defaultValues?.[name] ?? "";
                field.onChange(original);
                return;
              }
              field.onChange(value.trim().replace(/\s+/g, " "));

              field.onBlur();
            }}
            placeholder={placeholder}
            variant={variant}
            error={!!error}
            helperText={error?.message}
            multiline={multiline}
            disabled={disabled}
            rows={rows}
            type={isPassword && !showPassword ? "password" : "text"}
            slotProps={{
              input: {
                ...inputSlotProps,
                ...slotProps?.input,
              },
            }}
            sx={{
              "& .MuiInputBase-input": {
                padding: !leftContent ? "8px 14px" : "8px 14px 8px 0px",
              },
              // width: "250px",
              borderRadius: "50%",
              "& .MuiInputBase-input::placeholder": {
                fontSize: "12px",
              },
              ...sx,
            }}
          />
        )}
      />
    </Stack>
  );
};

export default Input;
