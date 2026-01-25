import { Stack } from "@mui/material";
import MainButton from "@src/components/general/Button";
import { isFiltersEmpty } from "@src/helpers/helpers";
import { useFiltersStore } from "@src/store/useFiltersStore";

const FilterActions = ({
  handleFilters,
  handleClearAllFilters,
  from,
  to,
}: {
  handleFilters: () => void;
  handleClearAllFilters: () => void;
  from: string | null;
  to: string | null;
}) => {
  const allFilters = useFiltersStore((state) => state.filters);
  const isEmpty = isFiltersEmpty(allFilters) && !from && !to;
  return (
    <Stack
      spacing={2}
      mt={2}
      justifyContent="center"
      alignItems="center"
      direction="row"
    >
      <MainButton
        title="Apply"
        disabled={isEmpty}
        sx={{ px: 4 }}
        id="apply-button"
        onClick={handleFilters}
      />
      <MainButton
        title="Clear All"
        variant="outlined"
        onClick={handleClearAllFilters}
      />
    </Stack>
  );
};

export default FilterActions;
