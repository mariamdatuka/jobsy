import type {
  FiltersState,
  MultiSelectFilterKey,
} from "@src/store/useFiltersStore";

import { useSearchParams } from "react-router";

export const useSetUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const getParamArrayUpper = (key: MultiSelectFilterKey): string[] => {
    const value = searchParams.get(key);
    if (!value) return [];
    return value.split(",").map((s) => s.toUpperCase());
  };

  const clearFilters = () => {
    const params = Object.fromEntries(searchParams);

    // keep search
    const search = params.search;

    // reset everything
    const newParams: Record<string, string> = {};

    if (search) {
      newParams.search = search;
    }

    setSearchParams(newParams);
  };

  return {
    onApply,
    searchParams,
    setSearchParams,
    getParamArrayUpper,
    clearFilters,
  };
};
