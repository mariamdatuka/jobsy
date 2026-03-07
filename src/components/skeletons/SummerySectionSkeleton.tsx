import { Stack, Skeleton } from "@mui/material";
import { columns } from "@src/helpers/constanst";
import useBreakpoints from "@src/hooks/useBreakpoints";
const SummerySectionSkeleton = () => {
  const { isTabletOnly } = useBreakpoints();

  return (
    <Stack gap={4}>
      <Skeleton variant="text" width={120} height={32} />

      <Stack
        gap={3}
        direction="row"
        flexWrap={isTabletOnly ? "wrap" : "nowrap"}
      >
        {columns.map((col) => (
          <Stack
            key={col.id}
            gap={1}
            width="250px"
            sx={{
              p: 2,
              borderRadius: "12px",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={28} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default SummerySectionSkeleton;
