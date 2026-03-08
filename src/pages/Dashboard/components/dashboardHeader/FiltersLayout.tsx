import Menu from "@src/assets/icons/Menu";
import MainButton from "@src/components/general/Button";
import FiltersDrawer from "./FiltersDrawer";
import { useState } from "react";
import { useSetUrlParams } from "@src/hooks/useSetUrlParams";
import { useFiltersStore } from "@src/store/useFiltersStore";
import { isEqual } from "lodash";

const FiltersLayout = ({ width }: { width?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const allFilters = useFiltersStore((state) => state.filters);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const { areUrlFiltersApplied, urlFilterCounter, appliedFilters } =
    useSetUrlParams();
  const appliedFilter = appliedFilters;
  const areFiltersinUrl = areUrlFiltersApplied();
  const urlFiltersCounter = urlFilterCounter();
  const isDirty = !isEqual(allFilters, appliedFilter);

  return (
    <>
      <MainButton
        title={areFiltersinUrl ? `Filters (${urlFiltersCounter})` : "Filters"}
        startIcon={<Menu />}
        onClick={toggleDrawer}
        sx={{ width }}
      />
      <FiltersDrawer
        open={isOpen}
        toggleDrawer={toggleDrawer}
        isDirty={isDirty}
      />
    </>
  );
};

export default FiltersLayout;
