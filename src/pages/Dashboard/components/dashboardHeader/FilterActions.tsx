import { Stack } from "@mui/material";
import MainButton from "@src/components/general/Button";

const FilterActions = ({
  handleFilters,
  handleClearAllFilters,
}: {
  handleFilters: () => void;
  handleClearAllFilters: () => void;
}) => {
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
