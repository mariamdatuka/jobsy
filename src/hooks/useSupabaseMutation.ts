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
  TError = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">
): UseMutationResult<TData, TError, TVariables> {
  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      try {
        return await mutationFn(variables);
      } catch (error: any) {
        console.log("catch error:", error);

        if (error === "Failed to fetch") {
          throw new Error("Ups ! internet connection lost, try again");
        }

        throw new Error("Something went wrong");
      }
    },
    ...options,
  });
}
