import { supabase } from "@src/supabase-client";
import type { Task } from "@src/types/commonTypes";
import dayjs from "dayjs";

export const createJob = async (values: Task, userId: string) => {
  const payload = {
    company_name: values.company_name,
    position: values.position,
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
  if (error) throw error.message;
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
