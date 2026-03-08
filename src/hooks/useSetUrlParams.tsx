import { decodeDate } from "@src/helpers/helpers";
import type {
  FiltersState,
  MultiSelectFilterKey,
} from "@src/store/useFiltersStore";
import { MULTI_SELECT_KEYS } from "@src/types/commonTypes";
import { FILTER_PARAM_KEYS } from "@src/types/paramKeys";

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

  const getParamArrayLowercase = (key: MultiSelectFilterKey): string[] => {
    const value = searchParams.get(key);
    if (!value) return [];
    return value.split(",").map((s) => s.toLowerCase());
  };
  const appliedFilters: FiltersState = {
    status: getParamArrayLowercase("status") ?? [],
    jobType: getParamArrayLowercase("jobType") ?? [],
    date: decodeDate(searchParams),
  };

  const areUrlFiltersApplied = () => {
    return FILTER_PARAM_KEYS.some((key) => searchParams.has(key));
  };
  const clearUrlFilters = () => {
    const areFiltersInURL = areUrlFiltersApplied();
    if (!areFiltersInURL) return;
    const params = Object.fromEntries(searchParams);
    const search = params.search;
    const newParams: Record<string, string> = {};
    if (search) {
      newParams.search = search;
    }
    setSearchParams(newParams);
  };

  const countCommaParam = (key: MultiSelectFilterKey) => {
    const value = searchParams.get(key);
    return value ? value.split(",").length : 0;
  };

  const urlFilterCounter = () => {
    const multiCount = MULTI_SELECT_KEYS.reduce(
      (sum, key) => sum + countCommaParam(key),
      0,
    );

    const dateCount = searchParams.has("dateType") ? 1 : 0;

    return multiCount + dateCount;
  };

  return {
    onApply,
    searchParams,
    setSearchParams,
    getParamArrayUpper,
    clearUrlFilters,
    areUrlFiltersApplied,
    urlFilterCounter,
    appliedFilters,
  };
};
