import { Drawer } from "@mui/material";
import { DateFilter, MultiSelectFilter } from "./FilterGroup";
import FilterActions from "./FilterActions";
import { useState } from "react";
import { useFiltersStore } from "@src/store/useFiltersStore";

const validateDateRange = (from: string | null, to: string | null): string => {
  if (!from || !to) return "Please select both From and To dates";
  if (new Date(from) > new Date(to)) return "From date must be before To date";
  return "";
};

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

  const handleFilters = () => {
    if (showCustomInputs) {
      const error = validateDateRange(from, to);
      if (error) {
        setDateError(error);
        return;
      }

      if (from && to) {
        setCustomDate(from, to);
        setDateError("");
        setShowCustomInputs(false);
      }
    }
  };

  const handleClearAllFilters = () => {
    clearFilters();
    setFrom(null);
    setTo(null);
    setShowCustomInputs(false);
    setDateError("");
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
        options={["Remote", "Hybrid", "On-site"]}
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
        handleFilters={handleFilters}
        handleClearAllFilters={handleClearAllFilters}
        from={from}
        to={to}
      />
    </Drawer>
  );
};

export default FiltersDrawer;
