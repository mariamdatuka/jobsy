import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";

interface DatePickerBaseProps {
  label?: string;
  value: string | null; // ISO string
  onChange: (value: string | null) => void;
  maxDate?: Dayjs;
  width?: number | string;
  otherProps?: any;
}

export default function BaseDatepicker({
  label,
  value,
  onChange,
  maxDate = dayjs(),
  otherProps = {},
  width = 200,
}: DatePickerBaseProps) {
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
          value={value ? dayjs(value) : null}
          maxDate={maxDate}
          onChange={(v) => onChange(v ? v.format("YYYY-MM-DD") : null)}
          slotProps={{
            textField: {
              size: "small",
              sx: { width },
              ...otherProps,
            },
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
