import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

export const useSupabaseQuery = <TData, TError>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError, TData, QueryKey>
) => {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });
};
