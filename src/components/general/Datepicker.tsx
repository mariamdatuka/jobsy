import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
interface DatePickerValueProps {
  width?: number | string;
  label?: string;
}

export default function DatePickerValue({
  width = 200,
  label,
}: DatePickerValueProps) {
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
        <DatePicker
          maxDate={dayjs()}
          slotProps={{
            textField: {
              size: "small",
              sx: {
                width,
              },
            },
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
