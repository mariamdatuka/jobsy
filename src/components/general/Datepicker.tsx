import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import { Controller, useFormContext } from "react-hook-form";
interface DatePickerValueProps {
  width?: number | string;
  label?: string;
  name: string;
}

export default function DatePickerValue({
  width = 200,
  label,
  name,
}: DatePickerValueProps) {
  const { control } = useFormContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack gap={0.5}>
        {label && (
          <label
            style={{
              marginLeft: "10px",
              fontSize: "14px",
              color: "#240854",
            }}
          >
            {label}
          </label>
        )}

        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              value={field.value ?? dayjs()}
              onChange={(newValue) => field.onChange(newValue)}
              maxDate={dayjs()}
              slotProps={{
                textField: {
                  size: "small",
                  sx: { width },
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
