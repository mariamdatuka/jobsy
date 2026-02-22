import { Stack } from "@mui/material";
import Text from "@src/components/general/Text";
import SummuryCard from "./SummuryCard";
import { useTasks } from "@src/hooks/useTasks";
import { useUserStore } from "@src/store/userStore";
import { columns } from "@src/helpers/constanst";
import { useMemo } from "react";
import type { Task, Status } from "@src/types/commonTypes";
import useBreakpoints from "@src/hooks/useBreakpoints";

const SummeryCardLabels: Record<Status, string> = {
  APPLIED: "Total Applied Jobs",
  INTERVIEWING: "Interviews",
  OFFERED: "Offers Received",
  REJECTED: "Rejected",
  SAVED: "Saved Applications",
};

const SummerySection = () => {
  const session = useUserStore((state) => state.session);
  const { isTabletOnly } = useBreakpoints();
  const { tasks } = useTasks(session?.user?.id!);
  const tasksByStatus = useMemo(() => {
    return columns.reduce(
      (acc, col) => {
        acc[col.id] = tasks?.filter((task) => task.status === col.id);
        return acc;
      },
      {} as Record<string, Task[]>,
    );
  }, [tasks, columns]);

  return (
    <Stack gap={4}>
      <Text variant="h5" fontWeight={500} color="secondary.main">
        Summary
      </Text>
      <Stack
        gap={2}
        direction="row"
        flexWrap={isTabletOnly ? "wrap" : "nowrap"}
      >
        {columns.map((col) => (
          <SummuryCard
            key={col.id}
            title={SummeryCardLabels[col.id as Status]}
            value={tasksByStatus[col.id]?.length || 0}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default SummerySection;
