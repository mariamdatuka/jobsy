import { Skeleton, Stack } from "@mui/material";

const BarChartSkeleton = () => {
  return (
    <>
      <Stack sx={{ width: "100%", maxWidth: 700 }} gap={5}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            aspectRatio: 1.618,
            borderRadius: 2,
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",

            aspectRatio: 1.618,
            borderRadius: 2,
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            aspectRatio: 1.618,
            borderRadius: 2,
          }}
        />
      </Stack>
    </>
  );
};

export default BarChartSkeleton;
