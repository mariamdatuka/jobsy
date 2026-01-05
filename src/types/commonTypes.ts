export interface Task {
  id: string;
  company_name: string;
  position: string;
  status: "SAVED" | "APPLIED" | "INTERVIEWING" | "REJECTED" | "OFFERED";
  country?: string;
  date_applied?: string;
  vacancy_type?: "Remote" | "On-site" | "Hybrid";
  link?: string;
  salary?: string;
  notes?: string;
  index_number: number;
}
