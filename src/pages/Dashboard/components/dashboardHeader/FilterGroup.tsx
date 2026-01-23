import { Box, Chip, Divider, Stack } from "@mui/material";
import Text from "@src/components/general/Text";
import { useFiltersStore } from "@src/store/useFiltersStore";
import { useState } from "react";
import { type DatePreset } from "@src/store/useFiltersStore";

// ============= Base Filter Group Component =============
type BaseFilterGroupProps = {
  title: string;
  children: React.ReactNode;
};

type MultiSelectFilterProps = {
  title: string;
  filterKey: "status" | "type";
  options: string[];
};

const BaseFilterGroup = ({ title, children }: BaseFilterGroupProps) => (
  <Box>
    <Text variant="body1" fontWeight={600} color="secondary.main">
      {title}
    </Text>
    <Stack direction="row" flexWrap="wrap" mt={1} gap={1}>
      {children}
    </Stack>
    <Divider sx={{ my: 2, borderColor: "dividerLight" }} />
  </Box>
);

export const MultiSelectFilter = ({
  title,
  filterKey,
  options,
}: MultiSelectFilterProps) => {
  const toggleFilter = useFiltersStore((state) => state.toggleFilter);
  const selectedValues = useFiltersStore((state) => state[filterKey]);

  return (
    <BaseFilterGroup title={title}>
      {options.map((option) => (
        <Chip
          key={option}
          variant="outlined"
          clickable
          label={option}
          color={selectedValues.includes(option) ? "primary" : "default"}
          onClick={() => toggleFilter(filterKey, option)}
          sx={{ my: 0.5 }}
        />
      ))}
    </BaseFilterGroup>
  );
};

// ============= Date Filter =============
type DateFilterProps = {
  title?: string;
};

export const DateFilter = ({ title = "Date" }: DateFilterProps) => {
  const setPresetDate = useFiltersStore((state) => state.setPresetDate);
  const setCustomDate = useFiltersStore((state) => state.setCustomDate);
  const currentDate = useFiltersStore((state) => state.date);
  const [showCustomInputs, setShowCustomInputs] = useState(false);

  const handlePresetClick = (preset: DatePreset) => {
    setPresetDate(preset);
    setShowCustomInputs(false);
  };

  const handleCustomClick = () => {
    setShowCustomInputs(true);
  };

  const handleDateChange = (from: string, to: string) => {
    if (from && to) {
      setCustomDate(from, to);
    }
  };

  const isPresetActive = (preset: DatePreset) => {
    return (
      currentDate?.type === "preset" &&
      currentDate.preset === preset &&
      !showCustomInputs
    );
  };

  const isCustomActive = currentDate?.type === "range";

  return (
    <BaseFilterGroup title={title}>
      <Chip
        variant="outlined"
        clickable
        label="Last 7 days"
        color={isPresetActive("7d") ? "primary" : "default"}
        onClick={() => handlePresetClick("7d")}
        sx={{ my: 0.5 }}
      />
      <Chip
        variant="outlined"
        clickable
        label="Last 30 days"
        color={isPresetActive("30d") ? "primary" : "default"}
        onClick={() => handlePresetClick("30d")}
        sx={{ my: 0.5 }}
      />
      <Chip
        variant="outlined"
        clickable
        label="Custom"
        color={isCustomActive ? "primary" : "default"}
        onClick={handleCustomClick}
        sx={{ my: 0.5 }}
      />

      {showCustomInputs && (
        <Stack direction="row" spacing={1} width="100%" mt={1}>
          <input
            type="date"
            defaultValue={currentDate?.type === "range" ? currentDate.from : ""}
            onChange={(e) => {
              const to =
                currentDate?.type === "range"
                  ? currentDate.to
                  : new Date().toISOString().split("T")[0];
              handleDateChange(e.target.value, to);
            }}
            style={{ padding: "8px", flex: 1 }}
          />
          <input
            type="date"
            defaultValue={currentDate?.type === "range" ? currentDate.to : ""}
            onChange={(e) => {
              const from =
                currentDate?.type === "range"
                  ? currentDate.from
                  : new Date().toISOString().split("T")[0];
              handleDateChange(from, e.target.value);
            }}
            style={{ padding: "8px", flex: 1 }}
          />
        </Stack>
      )}
    </BaseFilterGroup>
  );
};
