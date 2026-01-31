import { Drawer } from "@mui/material";
import { DateFilter, MultiSelectFilter } from "./FilterGroup";
import FilterActions from "./FilterActions";
import { useState } from "react";
import { useFiltersStore } from "@src/store/useFiltersStore";
import { validateDateRange } from "@src/helpers/helpers";
import { useSetUrlParams } from "@src/hooks/useSetUrlParams";

const FiltersDrawer = ({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: () => void;
}) => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [showCustomInputs, setShowCustomInputs] = useState(false);
  const [dateError, setDateError] = useState<string>("");
  const setCustomDate = useFiltersStore((state) => state.setCustomDate);
  const clearFilters = useFiltersStore((state) => state.resetFilters);
  const allFilters = useFiltersStore((state) => state.filters);

  const { onApply, clearFilters: clearUrlFilters } = useSetUrlParams();

  const handleApplyingFilters = () => {
    let filtersToApply = { ...allFilters };

    if (showCustomInputs) {
      const error = validateDateRange(from, to);
      if (error) {
        setDateError(error);
        return;
      }

      if (from && to) {
        filtersToApply.date = { type: "range", from, to };
        setCustomDate(from, to);
        setDateError("");
        setShowCustomInputs(false);
      }
    }
    onApply(filtersToApply);
    toggleDrawer();
  };

  const handleClearAllFilters = () => {
    clearFilters();
    setFrom(null);
    setTo(null);
    setShowCustomInputs(false);
    setDateError("");
    clearUrlFilters();
  };

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer}
      anchor="right"
      slotProps={{
        paper: {
          sx: {
            width: 350,
            padding: "40px 25px",
            // alignItems: "center",
          },
        },
      }}
    >
      <MultiSelectFilter
        title="Status"
        options={["saved", "applied", "interviewing", "offered", "rejected"]}
        filterKey="status"
      />
      <MultiSelectFilter
        title="Type"
        options={["remote", "hybrid", "on-site"]}
        filterKey="jobType"
      />
      <DateFilter
        title="Date Applied"
        from={from}
        to={to}
        setTo={setTo}
        setFrom={setFrom}
        showCustomInputs={showCustomInputs}
        setShowCustomInputs={setShowCustomInputs}
        dateError={dateError}
      />
      <FilterActions
        handleApplyingFilters={handleApplyingFilters}
        handleClearAllFilters={handleClearAllFilters}
        from={from}
        to={to}
      />
    </Drawer>
  );
};

export default FiltersDrawer;
