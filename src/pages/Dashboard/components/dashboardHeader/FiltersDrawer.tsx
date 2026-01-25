import { Drawer } from "@mui/material";
import { DateFilter, MultiSelectFilter } from "./FilterGroup";
import FilterActions from "./FilterActions";
import { useState } from "react";
import { useFiltersStore } from "@src/store/useFiltersStore";

const FiltersDrawer = ({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: () => void;
}) => {
  const [from, setFrom] = useState<string | null>("");
  const [to, setTo] = useState<string | null>("");
  const [showCustomInputs, setShowCustomInputs] = useState(false);
  const [dateError, setDateError] = useState<string>("");
  const setCustomDate = useFiltersStore((state) => state.setCustomDate);
  const clearDate = useFiltersStore((state) => state.clearDate);
  const handleFilters = () => {
    if (showCustomInputs) {
      if (!from || !to) {
        setDateError("Please select both From and To dates");
        return;
      }

      setCustomDate(from, to);
      setDateError("");
      clearDate();
      setShowCustomInputs(false);
    }
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
      <FilterActions handleFilters={handleFilters} />
    </Drawer>
  );
};

export default FiltersDrawer;
