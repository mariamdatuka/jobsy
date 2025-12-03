import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import { Controller, useFormContext } from "react-hook-form";

interface SelectInputProps {
  name: string;
  options: { label: string; value: string | number }[];
}

const SelectInput = ({ name, options }: SelectInputProps) => {
  const { control } = useFormContext();

  return (
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
  );
};

export default SelectInput;
