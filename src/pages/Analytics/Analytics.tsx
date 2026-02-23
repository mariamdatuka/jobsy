import AnalyticsHeader from "./components/AnalyticsHeader";
import { Stack } from "@mui/material";
import SummerySection from "./components/SummerySection";
import { columns } from "@src/helpers/constanst";
import { useMemo } from "react";
import type { Task } from "@src/types/commonTypes";

import BarChartComponent from "./components/BarChartComponent";
import { useJobsViewData } from "@src/hooks/useJobsDataView";
import { toCapitalize } from "@src/helpers/helpers";

const Analytics = () => {
  const { tasksData } = useJobsViewData();
  const tasksByStatus = useMemo(() => {
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
  return (
    <>
      <AnalyticsHeader />
      <Stack pt={5} gap={10}>
        <SummerySection tasksByStatus={tasksByStatus} />
        <BarChartComponent chartData={chartData} />
      </Stack>
    </>
  );
};

export default Analytics;
