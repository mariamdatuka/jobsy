import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerValue() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem label="Date picker">
          <DatePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            maxDate={dayjs()}
            slotProps={{ textField: { size: "small" } }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
