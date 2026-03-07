import { Stack } from "@mui/material";

import SummerySectionSkeleton from "./SummerySectionSkeleton";

import { MaxStreakSkeleton } from "./MaxStreakSkeleton";
import BarChartSkeleton from "./BarChartSkeleton";

const AnalyticsPageSkeleton = () => {
  return (
    <Stack pt={5} gap={10}>
      <SummerySectionSkeleton />
      <Stack direction="row" flexWrap="wrap" gap="50px">
        <BarChartSkeleton />
        <MaxStreakSkeleton />
      </Stack>
    </Stack>
  );
};

export default AnalyticsPageSkeleton;
