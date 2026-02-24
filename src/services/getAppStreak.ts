import { supabase } from "@src/supabase-client";

export const getAppStreak = async ({
  startDate,
  endDate,
}: {
  startDate?: string | null;
  endDate?: string | null;
}) => {
  const { data, error } = await supabase.rpc("get_longest_streak", {
    start_date: startDate,
    end_date: endDate,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
