import Menu from "@src/assets/icons/Menu";
import MainButton from "@src/components/general/Button";
import FiltersDrawer from "./FiltersDrawer";
import { useState } from "react";
import { useSetUrlParams } from "@src/hooks/useSetUrlParams";
import { useFiltersStore } from "@src/store/useFiltersStore";

const FiltersLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };
  const clearFilters = useFiltersStore((state) => state.resetFilters);
  const allFilters = useFiltersStore((state) => state.filters);

  const { clearFilters: clearUrlFilters, areFiltersApplied } =
    useSetUrlParams();
  const handleClearFilters = () => {
    clearFilters();
    clearUrlFilters();
  };
  return (
    <>
      <MainButton title="Filters" startIcon={<Menu />} onClick={toggleDrawer} />
      {areFiltersApplied() && (
        <MainButton
          title="Clear All"
          onClick={handleClearFilters}
          variant="outlined"
        />
      )}

      <FiltersDrawer open={isOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default FiltersLayout;
