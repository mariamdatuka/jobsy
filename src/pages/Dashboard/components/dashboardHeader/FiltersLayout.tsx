import Menu from "@src/assets/icons/Menu";
import MainButton from "@src/components/general/Button";
import FiltersDrawer from "./FiltersDrawer";
import { useMemo, useRef, useState } from "react";
import { useSetUrlParams } from "@src/hooks/useSetUrlParams";
import { useFiltersStore, type FiltersState } from "@src/store/useFiltersStore";
import { isEqual } from "lodash";

const FiltersLayout = ({ width }: { width?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const allFilters = useFiltersStore((state) => state.filters);

  const snapshotRef = useRef<FiltersState | null>(null);
  const toggleDrawer = () => {
    snapshotRef.current = structuredClone(allFilters);
    setIsOpen((prev) => !prev);
  };
  const isDirty = useMemo(() => {
    return !isEqual(allFilters, snapshotRef.current);
  }, [allFilters]);
  const { areUrlFiltersApplied, urlFilterCounter } = useSetUrlParams();

  const areFiltersinUrl = areUrlFiltersApplied();
  const urlFiltersCounter = urlFilterCounter();

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
