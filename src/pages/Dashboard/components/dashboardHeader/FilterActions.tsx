import { Stack } from "@mui/material";
import MainButton from "@src/components/general/Button";
import { isFiltersEmpty } from "@src/helpers/helpers";
import { useSetUrlParams } from "@src/hooks/useSetUrlParams";
import { useFiltersStore } from "@src/store/useFiltersStore";

const FilterActions = ({
  handleApplyingFilters,
  handleClearAllFilters,
  from,
  to,
  isDirty,
}: {
  handleApplyingFilters: () => void;
  handleClearAllFilters: () => void;
  from: string | null;
  to: string | null;
  isDirty: boolean;
}) => {
  const allFilters = useFiltersStore((state) => state.filters);
  const { areUrlFiltersApplied } = useSetUrlParams();
  const isEmpty = isFiltersEmpty(allFilters) && !from && !to;
  const canBeCleared = !areUrlFiltersApplied() && isEmpty;
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
        onClick={handleApplyingFilters}
      />
      <MainButton
        title="Clear All"
        variant="outlined"
        disabled={canBeCleared}
        onClick={handleClearAllFilters}
      />
    </Stack>
  );
};

export default FilterActions;
