import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Stack from "@mui/material/Stack";
import { Controller, useFormContext } from "react-hook-form";

interface SelectInputProps {
  name: string;
  options: { label: string; value: string | number }[];
  label?: string;
}

const SelectInput = ({ name, options, label }: SelectInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name]?.message;

  return (
    <Stack gap={0.5}>
      {label && (
        <label
          style={{
            marginLeft: "10px",
            fontSize: "14px",
            color: fieldError ? "#FB344F" : "#240854",
          }}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Select
            {...field}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            size="small"
            error={!!error}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          // {error && (
          //   <FormHelperText error>{error.message}</FormHelperText>
          // )}
        )}
      />
    </Stack>
  );
};

export default SelectInput;
