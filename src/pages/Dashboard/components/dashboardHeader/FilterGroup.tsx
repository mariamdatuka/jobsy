import { Box, Chip, Divider, Stack } from "@mui/material";
import Text from "@src/components/general/Text";
import { useFiltersStore } from "@src/store/useFiltersStore";

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
