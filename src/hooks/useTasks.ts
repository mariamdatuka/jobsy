import { useSupabaseQuery } from "@src/hooks/useSupabaseQuery";
import { fetchTasks } from "../services/jobs";
import { QKEY_TASKS } from "@src/services/queryKeys";

export const useTasks = (userID: string) => {
  const { data, error, isPending, isLoading, refetch, isSuccess } =
    useSupabaseQuery([QKEY_TASKS, userID], () => fetchTasks(userID));

  return {
    tasks: data,
    error,
    isPending,
    refetch,
    isLoading,
    isSuccess,
  };
};
