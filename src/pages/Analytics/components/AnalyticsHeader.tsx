import { Avatar, Stack } from "@mui/material";
import Text from "@src/components/general/Text";
import useBreakpoints from "@src/hooks/useBreakpoints";
import FiltersLayout from "@src/pages/Dashboard/components/dashboardHeader/FiltersLayout";
import type { UserDataProps } from "@src/pages/Profile/components/UploadAvatar";

const AnalyticsHeader = ({ userInfo }: UserDataProps) => {
  const { isReallyTablet } = useBreakpoints();
  return (
    <Stack
      direction={isReallyTablet ? "column" : "row"}
      alignItems={isReallyTablet ? "start" : "center"}
      gap={isReallyTablet ? 5 : 0}
      justifyContent="space-between"
      p={3}
      borderRadius="12px"
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <FiltersLayout />
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        justifyContent="center"
      >
        <Avatar sx={{ width: 54, height: 54 }} src={userInfo?.avatar_url} />
        <Stack alignItems="flex-start" justifyContent="center">
          <Text variant="body1" fontWeight={500} color="secondary.main">
            {userInfo?.first_name} {userInfo?.last_name}
          </Text>
          <Text variant="body1" color="secondary.light">
            {userInfo?.email}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AnalyticsHeader;
