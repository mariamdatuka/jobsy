import { Controller, useFormContext } from "react-hook-form";
import BaseDatePicker from "./BaseDatepicker";

interface RHFDatePickerProps {
  name: string;
  label?: string;
  width?: number | string;
}

export function RHFDatePicker({ name, label, width }: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <BaseDatePicker
          label={label}
          width={width}
          value={field.value ?? null}
          onChange={field.onChange}
          otherProps={{ error: !!error, helperText: error?.message }}
        />
      )}
    />
  );
}
