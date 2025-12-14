export interface Task {
  taskID: number;
  company_name: string;
  position: string;
  status: "SAVED" | "APPLIED" | "INTERVIEWING" | "REJECTED" | "OFFERED";
  country: string;
  city?: string;
  date_applied?: string;
  vacancy_type?: "Remote" | "On-site" | "Hybrid";
  link?: string;
  salary?: string;
  notes?: string;
}
