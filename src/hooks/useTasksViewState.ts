import { useSearchParams } from "react-router";
import { useJobsViewData } from "./useJobsDataView";
import { useSetUrlParams } from "./useSetUrlParams";

export const useTasksViewState = () => {
  const { tasksData, isPending, isLoading, search } = useJobsViewData();
  const { areUrlFiltersApplied } = useSetUrlParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const areFiltersInUrl = areUrlFiltersApplied();

  const showSkeleton = tasksData.length === 0 && isPending && !search;

  const showEmptyState =
    (search || areFiltersInUrl) && !isLoading && tasksData.length === 0;

  const showSpinner = isLoading && (search || areFiltersInUrl);

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    setSearchParams(params);
  };

  return {
    tasksData,
    showSkeleton,
    showEmptyState,
    showSpinner,
    search,
    handleClearSearch,
  };
};
