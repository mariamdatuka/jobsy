import type { DatePreset, FiltersState } from "@src/store/useFiltersStore";
import { MULTI_SELECT_KEYS, type Task } from "@src/types/commonTypes";
import { type DateFilter } from "@src/store/useFiltersStore";

export const normalizeText = (value: string) =>
  value.trim().replace(/\s+/g, " ");

// Convert uppercase status from DB to capitalized format for form
export const toCapitalizeFormat = (status?: string) => {
  if (!status) return;
  return status.charAt(0) + status.slice(1).toLowerCase();
};

//first word uppercase
export const toCapitalize = (status?: string) => {
  if (!status) return;
  return status[0].toUpperCase() + status.slice(1).toLowerCase();
};

export const isFiltersEmpty = (filters: FiltersState) => {
  if (
    filters.status.length === 0 &&
    filters.jobType.length === 0 &&
    filters.date === null
  ) {
    return true;
  }
  return false;
};

export const buildPatchPayload = (
  values: any,
  dirtyFields: Record<string, any>,
) => {
  const payload: Record<string, any> = {};

  Object.keys(dirtyFields).forEach((key) => {
    payload[key] = values[key];
  });

  return payload;
};

// export function buildPatchPayload<T extends Record<string, any>>(
//   dirtyFields: FieldNamesMarkedBoolean<T>,
//   values: T
// ): Partial<T> {
//   const payload: Partial<T> = {};

//   for (const key in dirtyFields) {
//     const isDirty = dirtyFields[key];

//     if (isDirty === true) {
//       payload[key] = values[key];
//     }
//   }

//   return payload;
// }

export const getNewIndexOrder = (
  tasksInColumn: Task[],
  activeIndex: number,
  overIndex: number,
) => {
  const sorted = [...tasksInColumn].sort(
    (a, b) => a.index_number - b.index_number,
  );

  // Dropping AFTER the over task
  if (activeIndex < overIndex) {
    const over = sorted[overIndex];
    const next = sorted[overIndex + 1];

    if (!next) {
      return over.index_number + 1024;
    }

    return (over.index_number + next.index_number) / 2;
  }

  // Dropping BEFORE the over task
  const prev = sorted[overIndex - 1];
  const over = sorted[overIndex];

  if (!prev) return over.index_number / 2;

  return (prev.index_number + over.index_number) / 2;
};

export const getIndexForColumnDrop = (tasksInColumn: Task[]) => {
  if (tasksInColumn.length === 0) return 1024;

  const sorted = [...tasksInColumn].sort(
    (a, b) => a.index_number - b.index_number,
  );

  return sorted[sorted.length - 1].index_number + 1024;
};

export const getDateFromPreset = (preset: DatePreset) => {
  if (preset === "7d") {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);
    return sevenDaysAgo.toISOString().split("T")[0];
  } else if (preset === "30d") {
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    return thirtyDaysAgo.toISOString().split("T")[0];
  }
};

export const validateDateRange = (
  from: string | null,
  to: string | null,
): string => {
  if (!from || !to) return "Please select both From and To dates";
  if (new Date(from) > new Date(to)) return "From date must be before To date";
  return "";
};

export const decodeDate = (
  searchParams: URLSearchParams,
): DateFilter | null => {
  const dateType = searchParams.get("dateType");
  if (dateType === "preset") {
    const preset = searchParams.get("datePreset");
    if (!preset) return null;

    return {
      type: "preset",
      preset: preset as any,
    };
  }

  if (dateType === "range") {
    const from = searchParams.get("dateFrom");
    const to = searchParams.get("dateTo");

    if (!from || !to) return null;

    return {
      type: "range",
      from,
      to,
    };
  }

  return null;
};

export const countFilters = (filters: FiltersState) => {
  const multiCount = MULTI_SELECT_KEYS.reduce((sum, key) => {
    return sum + filters[key].length;
  }, 0);

  const dateCount = filters.date ? 1 : 0;

  return multiCount + dateCount;
};
