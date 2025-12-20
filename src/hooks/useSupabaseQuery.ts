import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

export function useSupabaseQuery<TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, Error, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<TData, Error>({
    queryKey,
    queryFn: async () => {
      try {
        return await queryFn();
      } catch (error: any) {
        if (error instanceof TypeError) {
          throw new Error("Please check your internet connection.");
        }

        if (error?.message) {
          throw new Error(error.message);
        }

        throw new Error("Unexpected error occurred");
      }
    },
    refetchOnWindowFocus: false,
    ...options,
  });
}
