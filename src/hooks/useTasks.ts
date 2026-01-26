import { useSupabaseQuery } from "@src/hooks/useSupabaseQuery";
import { fetchTasks } from "../services/jobs";
import { QKEY_TASKS } from "@src/services/queryKeys";
import type { FiltersState } from "@src/store/useFiltersStore";

export const useTasks = (
  userID: string,
  params?: { search?: string; filters?: FiltersState },
) => {
  const { data, error, isPending, isLoading, refetch, isSuccess } =
    useSupabaseQuery([QKEY_TASKS, userID, params], () =>
      fetchTasks({ userID, search: params?.search, filters: params?.filters }),
    );

  return {
    tasks: data,
    error,
    isPending,
    refetch,
    isLoading,
    isSuccess,
  };
};
