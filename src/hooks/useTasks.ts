import { fetchTasks } from "@src/services/jobs";

import { useSupabaseQuery } from "./useSupabaseQuery";
import { QKEY_TASKS } from "@src/services/queryKeys";
import type { FiltersState } from "@src/store/useFiltersStore";

export const useTasks = (
  userID: string,
  params?: { search?: string; filters?: FiltersState },
) => {
  // const setJobsData = useJobActionsStore((s) => s.setJobsData);

  const { data, error, isPending, isLoading, refetch, isSuccess, isFetching } =
    useSupabaseQuery(
      [QKEY_TASKS, userID, params?.search, params?.filters],
      () =>
        fetchTasks({
          userID,
          search: params?.search,
          filters: params?.filters,
        }),
      // {
      //   onSuccess: (data: any) => setJobsData(data),
      // },
    );

  return {
    tasks: data,
    error,
    isPending,
    refetch,
    isLoading,
    isSuccess,
    isFetching,
  };
};
