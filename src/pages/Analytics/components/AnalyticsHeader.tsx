import { Avatar, Stack } from "@mui/material";
import Text from "@src/components/general/Text";
import FiltersLayout from "@src/pages/Dashboard/components/dashboardHeader/FiltersLayout";
import { useUserStore } from "@src/store/userStore";

const AnalyticsHeader = () => {
  const user = useUserStore((state) => state.user);
  return (
    <Stack
      direction="row"
      alignItems="center"
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
        <Avatar sx={{ width: 54, height: 54 }} />
        <Stack alignItems="flex-start" justifyContent="center">
          <Text variant="body1" fontWeight={500} color="secondary.main">
            {user?.firstName} {user?.lastName}
          </Text>
          <Text variant="body1" color="secondary.light">
            {user?.email}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AnalyticsHeader;
