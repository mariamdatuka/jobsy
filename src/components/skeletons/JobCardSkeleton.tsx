import { Skeleton, Stack, Divider } from "@mui/material";
import { JobContainer } from "@src/pages/Dashboard/components/kanbanView/JobCard";

const JobCardSkeleton = () => {
  return (
    <JobContainer>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Skeleton variant="text" width={120} height={20} />
        <Skeleton variant="circular" width={16} height={16} />
      </Stack>

      <Skeleton variant="text" width={160} height={16} />

      <Divider sx={{ borderColor: "#eceef2", my: 1.2 }} />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Skeleton variant="text" width={80} height={14} />
        <Skeleton variant="circular" width={32} height={32} />
      </Stack>
    </JobContainer>
  );
};

export default JobCardSkeleton;
