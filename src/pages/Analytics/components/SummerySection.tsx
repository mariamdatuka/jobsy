import { Stack } from "@mui/material";
import Text from "@src/components/general/Text";
import SummuryCard from "./SummuryCard";
import { columns } from "@src/helpers/constanst";
import type { Task, Status } from "@src/types/commonTypes";
import useBreakpoints from "@src/hooks/useBreakpoints";

const SummeryCardLabels: Record<Status, string> = {
  APPLIED: "Applied",
  INTERVIEWING: "Interviews",
  OFFERED: "Offers Received",
  REJECTED: "Rejected",
  SAVED: "Saved Applications",
};

const SummerySection = ({
  tasksByStatus,
}: {
  tasksByStatus: Record<string, Task[]>;
}) => {
  const { isTabletOnly } = useBreakpoints();

  return (
    <Stack gap={4}>
      <Text variant="h5" fontWeight={500} color="secondary.main">
        Summary
      </Text>
      <Stack
        gap={3}
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
