import type { FiltersState } from "@src/store/useFiltersStore";
import { useTasks } from "./useTasks";
import { decodeDate } from "@src/helpers/helpers";
import { useUserStore } from "@src/store/userStore";
import { useSetUrlParams } from "./useSetUrlParams";
import { useSearchParams } from "react-router";

export const useJobsViewData = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const session = useUserStore((state) => state.session);

  const { getParamArrayUpper } = useSetUrlParams();

  const appliedFilters: FiltersState = {
    status: getParamArrayUpper("status") ?? [],
    jobType: getParamArrayUpper("jobType") ?? [],
    date: decodeDate(searchParams),
  };

  const { tasks, isPending, isLoading } = useTasks(session?.user?.id!, {
    search,
    filters: appliedFilters,
  });

  const tasksData = tasks || [];

  return {
    tasksData,
    isPending,
    isLoading,
    search,
  };
};
