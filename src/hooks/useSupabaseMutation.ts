import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

// TData = mutation result type
// TVariables = mutation input type
// TError = error type (optional)
export function useSupabaseMutation<
  TData = unknown,
  TVariables = void,
  TError = Error
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">
): UseMutationResult<TData, TError, TVariables> {
  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      try {
        return await mutationFn(variables);
      } catch (error: any) {
        if (error instanceof TypeError) {
          throw new Error("Please check your internet connection.");
        }

        if (error?.message) {
          throw new Error(error.message);
        }

        throw new Error("Unexpected error occurred, try again!");
      }
    },
    ...options,
  });
}
