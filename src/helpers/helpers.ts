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
