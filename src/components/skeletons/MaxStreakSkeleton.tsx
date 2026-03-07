import { Stack, Skeleton } from "@mui/material";

export const MaxStreakSkeleton = () => {
  return (
    <Stack
      ml={8}
      width="300px"
      height="200px"
      alignItems="center"
      gap={1}
      justifyContent="center"
      sx={{
        background: "linear-gradient(135deg, #ffeaea, #ffd6d6)",
        borderRadius: "20px",
        padding: 3,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <Skeleton variant="circular" width={50} height={50} />

      <Skeleton variant="text" width={160} height={25} />

      <Skeleton variant="text" width={100} height={35} />

      <Skeleton variant="text" width={140} height={20} />
    </Stack>
  );
};
