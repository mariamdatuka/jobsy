import { Drawer } from "@mui/material";
import { DateFilter, MultiSelectFilter } from "./FilterGroup";
import FilterActions from "./FilterActions";
import { useState } from "react";
import { useFiltersStore, type FiltersState } from "@src/store/useFiltersStore";

import { useSearchParams } from "react-router";
import { decodeDate } from "@src/helpers/helpers";
import { useTasks } from "@src/hooks/useTasks";
import { useUserStore } from "@src/store/userStore";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const setCustomDate = useFiltersStore((state) => state.setCustomDate);
  const clearFilters = useFiltersStore((state) => state.resetFilters);
  const allFilters = useFiltersStore((state) => state.filters);

  const onApply = (filters: FiltersState) => {
    const params = Object.fromEntries(searchParams);

    if (filters.status.length) {
      params.status = filters.status.join(",");
    } else {
      delete params.status;
    }

    if (filters.jobType.length) {
      params.jobType = filters.jobType.join(",");
    } else {
      delete params.jobType;
    }

    // --- DATE ---
    if (!filters.date) {
      delete params.dateType;
      delete params.datePreset;
      delete params.dateFrom;
      delete params.dateTo;
    } else if (filters.date.type === "preset") {
      params.dateType = "preset";
      params.datePreset = filters.date.preset;

      delete params.dateFrom;
      delete params.dateTo;
    } else {
      params.dateType = "range";
      params.dateFrom = filters.date.from;
      params.dateTo = filters.date.to;

      delete params.datePreset;
    }

    setSearchParams(params);
  };

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
        onApply(allFilters);
        return;
      }
    }

    onApply(allFilters);
  };

  const handleClearAllFilters = () => {
    clearFilters();
    setFrom(null);
    setTo(null);
    setShowCustomInputs(false);
    setDateError("");
  };

  const statusParam = searchParams
    .get("status")
    ?.split(",")
    .map((s) => s.toUpperCase());
  console.log(statusParam, "status param splitted");
  const appliedFilters: FiltersState = {
    status: statusParam ?? [],
    jobType: searchParams.get("jobType")?.split(",") ?? [],
    date: decodeDate(searchParams),
  };

  const userID = useUserStore((state) => state.session?.user?.id!);

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
