import { Chip, Divider, Stack } from "@mui/material";
import Text from "@src/components/general/Text";
import { useFiltersStore } from "@src/store/useFiltersStore";
import { type DatePreset } from "@src/store/useFiltersStore";
import BaseDatepicker from "@src/components/general/BaseDatepicker";

// ============= Base Filter Group Component =============
type BaseFilterGroupProps = {
  title: string;
  children: React.ReactNode;
};

type MultiSelectFilterProps = {
  title: string;
  filterKey: "status" | "jobType";
  options: string[];
};

const BaseFilterGroup = ({ title, children }: BaseFilterGroupProps) => (
  <Stack spacing={2} my={2}>
    <Text variant="body1" fontWeight={600} color="secondary.main">
      {title}
    </Text>
    <Stack direction="row" flexWrap="wrap" mt={2} gap={1}>
      {children}
    </Stack>
    <Divider sx={{ borderColor: "dividerLight" }} />
  </Stack>
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
  from: string | null;
  to: string | null;
  showCustomInputs: boolean;
  setShowCustomInputs: any;
  setFrom: (date: string | null) => void;
  setTo: (date: string | null) => void;
  dateError?: string;
};

export const DateFilter = ({
  title = "Date",
  from,
  to,
  showCustomInputs,
  setShowCustomInputs,
  setFrom,
  setTo,
  dateError,
}: DateFilterProps) => {
  const setPresetDate = useFiltersStore((state) => state.setPresetDate);
  const clearDate = useFiltersStore((state) => state.clearDate);
  const currentDate = useFiltersStore((state) => state.date);

  console.log("Current Date Filter:", currentDate);

  const handlePresetClick = (preset: DatePreset) => {
    if (currentDate?.type === "preset" && currentDate.preset === preset) {
      clearDate();
      return;
    }

    setPresetDate(preset);
    setShowCustomInputs(false);
  };

  const handleCustomClick = () => {
    if (currentDate?.type === "range") {
      clearDate();
      setShowCustomInputs(false);
      setFrom(null);
      setTo(null);
      clearDate();
      return;
    }

    setShowCustomInputs((prev: boolean) => !prev);
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
        <Stack spacing={1} mt={1}>
          <BaseDatepicker
            label="From"
            value={from}
            onChange={(date) => setFrom(date)}
          />
          <BaseDatepicker
            label="To"
            value={to}
            onChange={(date) => setTo(date)}
          />
          {dateError && (
            <Text variant="caption" color="error.main">
              {dateError}
            </Text>
          )}
        </Stack>
      )}
    </BaseFilterGroup>
  );
};
