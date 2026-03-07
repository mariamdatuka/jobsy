import AnalyticsHeader from "./components/AnalyticsHeader";
import { Stack } from "@mui/material";
import SummerySection from "./components/SummerySection";
import { columns } from "@src/helpers/constanst";
import { useMemo } from "react";
import type { Task } from "@src/types/commonTypes";
import BarChartComponent from "./components/BarChartComponent";
import { useJobsViewData } from "@src/hooks/useJobsDataView";
import { toCapitalize } from "@src/helpers/helpers";
import MaxStreak from "./components/MaxStreak";
import { useAppStreak } from "@src/hooks/useAppStreak";
import AnalyticsPageSkeleton from "@src/components/skeletons/AnalyticsPageSkeleton";
import { useSupabaseQuery } from "@src/hooks/useSupabaseQuery";
import { getUserData } from "@src/services/getUserData";
import { QKEY_USERS } from "@src/services/queryKeys";
import { useUserStore } from "@src/store/userStore";

const Analytics = () => {
  const { tasksData, isPending: isTasksLoading } = useJobsViewData();
  const userId = useUserStore((state) => state.session?.user.id!);
  const { data: userData, isPending: isDataPending } = useSupabaseQuery(
    [QKEY_USERS, userId],
    () => getUserData(userId),
  );
  const tasksByStatus = useMemo(() => {
    if (!tasksData) return {};
    return columns.reduce(
      (acc, col) => {
        acc[col.id] = tasksData?.filter((task) => task.status === col.id);
        return acc;
      },
      {} as Record<string, Task[]>,
    );
  }, [tasksData, columns]);

  const chartData = useMemo(() => {
    return Object.entries(tasksByStatus).map(([status, tasks]) => ({
      status: toCapitalize(status),
      amount: tasks?.length ?? 0,
    }));
  }, [tasksByStatus]);

  const { data, isPending: isStreakLoading } = useAppStreak();

  const isLoading = isStreakLoading || isTasksLoading;

  if (isLoading) {
    return (
      <>
        <AnalyticsHeader userInfo={userData} isDataLoading={isDataPending} />
        <AnalyticsPageSkeleton />
      </>
    );
  }

  return (
    <>
      <AnalyticsHeader userInfo={userData} isDataLoading={isDataPending} />
      <Stack pt={5} gap={10}>
        <SummerySection tasksByStatus={tasksByStatus} />
        <Stack direction="row" flexWrap="wrap" gap="50px">
          <BarChartComponent chartData={chartData} />
          <MaxStreak {...data} />
        </Stack>
      </Stack>
    </>
  );
};

export default Analytics;
