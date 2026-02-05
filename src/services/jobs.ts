import { supabase } from "@src/supabase-client";
import type { Task } from "@src/types/commonTypes";
import dayjs from "dayjs";
import { getDateFromPreset, normalizeText } from "@src/helpers/helpers";
import type { FiltersState } from "@src/store/useFiltersStore";

type CreateJobPayload = {
  company_name: string;
  position: string;
  link?: string;
  salary?: string;
  country?: string;
  notes?: string;
  status?: string;
  vacancy_type?: string;
  date_applied: string | null;
  user_id: string;
};

export const createJob = async (values: Task, userId: string) => {
  const payload: CreateJobPayload = {
    company_name: normalizeText(values.company_name),
    position: normalizeText(values.position),
    link: values?.link,
    salary: values?.salary,
    country: values?.country,
    notes: values?.notes,
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

type UpdateJobPayload = {
  company_name?: string;
  position?: string;
  link?: string;
  salary?: string;
  country?: string;
  notes?: string;
  status?: string;
  vacancy_type?: string;
  date_applied?: string;
  index_number?: number;
};

export const updateJob = async (id: string, payload: UpdateJobPayload) => {
  const normalizedPayload: UpdateJobPayload = {
    ...payload,
    company_name: payload.company_name
      ? normalizeText(payload.company_name)
      : payload.company_name,
    position: payload.position
      ? normalizeText(payload.position)
      : payload.position,
    status: payload.status?.toUpperCase(),
    vacancy_type: payload.vacancy_type?.toUpperCase(),
    date_applied: payload.date_applied
      ? dayjs(payload.date_applied).format("YYYY-MM-DD")
      : payload.date_applied,
  };

  const { data, error } = await supabase
    .from("tasks")
    .update(normalizedPayload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

type FetchTasksParams = {
  userID: string;
  search?: string;
  filters?: FiltersState;
};

export const fetchTasks = async ({
  userID,
  search,
  filters,
}: FetchTasksParams) => {
  let query = supabase.from("tasks").select("*").eq("user_id", userID);

  //  SEARCH (company OR position)
  if (search) {
    query = query.or(
      `company_name.ilike.%${search}%,position.ilike.%${search}%`,
    );
  }

  if (filters?.status?.length) {
    query = query.in("status", filters.status);
  }

  if (filters?.jobType?.length) {
    query = query.in("vacancy_type", filters.jobType);
  }
  if (filters?.date?.type === "preset") {
    const from = getDateFromPreset(filters.date.preset);
    query = query.gte("date_applied", from);
  }

  if (filters?.date?.type === "range") {
    query = query
      .gte("date_applied", filters.date.from)
      .lte("date_applied", filters.date.to);
  }

  const { data, error } = await query.order("index_number", {
    ascending: true,
  });

  if (error) throw error;
  return data;
};

export const updateTaskPosition = async (
  id: string,
  status: string,
  index_number: number,
) => {
  const { data, error } = await supabase.rpc("update_task_index", {
    p_task_id: id,
    p_new_status: status.toUpperCase(),
    p_new_index: index_number,
  });

  if (error) throw error;
  return data;
};

export const deleteTask = async (taskId: string) => {
  const { error, data } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .select();

  if (error) throw error;
  return data;
};
