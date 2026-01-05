import type { Task } from "@src/types/commonTypes";

export const normalizeText = (value: string) =>
  value.trim().replace(/\s+/g, " ");

// Convert uppercase status from DB to capitalized format for form
export const toCapitalizeFormat = (status?: string) => {
  if (!status) return;
  return status.charAt(0) + status.slice(1).toLowerCase();
};

export const buildPatchPayload = (
  values: any,
  dirtyFields: Record<string, any>
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
  overTaskId?: string
) => {
  if (tasksInColumn.length === 0) return 1024;

  if (!overTaskId) {
    // If there's no overTaskId, place at the end
    return tasksInColumn[tasksInColumn.length - 1].index_number + 1024;
  }

  const overIndex = tasksInColumn.findIndex((t) => t.id === overTaskId);
  const prev = tasksInColumn[overIndex - 1];
  const next = tasksInColumn[overIndex];

  if (!prev) return next.index_number / 2;
  return (prev.index_number + next.index_number) / 2;
};
