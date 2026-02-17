import Menu from "@src/assets/icons/Menu";
import MainButton from "@src/components/general/Button";
import FiltersDrawer from "./FiltersDrawer";
import { useState } from "react";
import { useSetUrlParams } from "@src/hooks/useSetUrlParams";
import { useFiltersStore } from "@src/store/useFiltersStore";
import { countFilters, isFiltersEmpty } from "@src/helpers/helpers";

const FiltersLayout = ({ width }: { width?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };
  const clearFilters = useFiltersStore((state) => state.resetFilters);
  const allFilters = useFiltersStore((state) => state.filters);
  const AreDraftFiltersApplied = isFiltersEmpty(allFilters);
  const {
    clearFilters: clearUrlFilters,
    areFiltersApplied,
    urlFilterCounter,
  } = useSetUrlParams();
  const handleClearFilters = () => {
    clearFilters();
    clearUrlFilters();
  };

  const urlFiltersCounter = urlFilterCounter();
  const draftFiltersCounter = countFilters(allFilters);

  const areUrlFiltersApplied = areFiltersApplied();

  return (
    <>
      <MainButton
        title="Filters"
        startIcon={<Menu />}
        onClick={toggleDrawer}
        sx={{ width }}
      />
      {areUrlFiltersApplied && (
        <MainButton
          title={`Clear Filters (${urlFiltersCounter})`}
          onClick={handleClearFilters}
          variant="outlined"
        />
      )}
      {!AreDraftFiltersApplied && !areUrlFiltersApplied && (
        <MainButton
          title={`Draft Filters (${draftFiltersCounter})`}
          onClick={() => setIsOpen(true)}
          variant="outlined"
        />
      )}
      <FiltersDrawer open={isOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default FiltersLayout;
