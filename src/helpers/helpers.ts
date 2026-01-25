import type { FiltersState } from "@src/store/useFiltersStore";
import type { Task } from "@src/types/commonTypes";

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
