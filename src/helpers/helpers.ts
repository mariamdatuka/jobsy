export const normalizeText = (value: string) =>
  value.trim().replace(/\s+/g, " ");

// Convert uppercase status from DB to capitalized format for form
export const toCapitalizeFormat = (status?: string) => {
  if (!status) return;
  return status.charAt(0) + status.slice(1).toLowerCase();
};
