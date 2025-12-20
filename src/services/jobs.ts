import { supabase } from "@src/supabase-client";
import type { Task } from "@src/types/commonTypes";
import dayjs from "dayjs";
import { normalizeText } from "@src/helpers/helpers";

type CreateJobPayload = {
  company_name: string;
  position: string;
  link: string | null;
  salary: number | null;
  country: string | null;
  notes: string | null;
  status: string | undefined;
  vacancy_type: string | undefined;
  date_applied: string | null;
  user_id: string;
};

export const createJob = async (values: Task, userId: string) => {
  const payload: CreateJobPayload = {
    company_name: normalizeText(values.company_name),
    position: normalizeText(values.position),
    link: values.link || null,
    salary: values.salary ? Number(values.salary) : null,
    country: values.country || null,
    notes: values.notes || null,
    status: values.status?.toUpperCase(),
    vacancy_type: values.vacancy_type?.toUpperCase(),
    date_applied: values.date_applied
      ? dayjs(values.date_applied).format("YYYY-MM-DD")
      : null,
    user_id: userId,
  };
  const { data, error } = await supabase
    .from("tasks")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateJob = async (id: string, value: Partial<Task>) => {
  const payload = {
    /* map fields */
  };
  const { data, error } = await supabase
    .from("tasks")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const fetchTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
};
