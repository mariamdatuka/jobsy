import { getDateFromPreset } from "@src/helpers/helpers";
import { useSearchParams } from "react-router";
import { useSupabaseQuery } from "./useSupabaseQuery";
import { getAppStreak } from "@src/services/getAppStreak";

export const useAppStreak = () => {
  const [searchParams] = useSearchParams();
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const datePreset = searchParams.get("datePreset");
  const dateFromPreset = getDateFromPreset(datePreset as any);

  const finalStartDate = dateFrom ?? dateFromPreset ?? null;

  const finalEndDate = dateTo ?? null;

  const { data, isLoading, isPending } = useSupabaseQuery(
    ["app-streak", finalStartDate, finalEndDate],
    () => getAppStreak({ startDate: finalStartDate, endDate: finalEndDate }),
  );

  return {
    data,
    isLoading,
    isPending,
  };
};
