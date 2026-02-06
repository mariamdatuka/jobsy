import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Stack from "@mui/material/Stack";
import { Controller, useFormContext } from "react-hook-form";

interface Countries {
  id?: string;
  name?: string;
  iso3?: string;
}
interface SelectInputProps {
  name: string;
  options?: string[];
  countryOptions?: Countries[];
  label?: string;
  width?: number | string;
}

const SelectInput = ({
  name,
  countryOptions,
  options,
  label,
  width = 200,
}: SelectInputProps) => {
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
            inputProps={{ "aria-label": "Without label" }}
            size="small"
            error={!!error}
            MenuProps={{
              // disablePortal: true,
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
            sx={{ width }}
          >
            {options &&
              options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            {countryOptions &&
              countryOptions.map((option) => (
                <MenuItem key={option.name} value={option.iso3}>
                  {option.name}
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
