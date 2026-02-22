import type { MultiSelectFilterKey } from "@src/store/useFiltersStore";

export type Status =
  | "SAVED"
  | "APPLIED"
  | "INTERVIEWING"
  | "REJECTED"
  | "OFFERED";

export interface Task {
  id: string;
  company_name: string;
  position: string;
  status: Status;
  country?: string;
  date_applied?: string;
  vacancy_type?: "Remote" | "On-site" | "Hybrid";
  link?: string;
  salary?: string;
  notes?: string;
  index_number: number;
}

export const MULTI_SELECT_KEYS: MultiSelectFilterKey[] = ["status", "jobType"];
