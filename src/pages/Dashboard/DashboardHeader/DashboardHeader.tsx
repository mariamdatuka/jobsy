import { Box, Stack } from "@mui/material";
import DashboardActions from "./DashboardActions";
import DashboardToggleView from "./DashboardToggleView";

const DashboardHeader = () => {
  return (
    <Box width="100%" border="1px solid #000000">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
      >
        <Box display="flex" gap={2}>
          <Box>Search input</Box>
          <Box>Filters</Box>
        </Box>
        <Box>
          {/* <DashboardActions /> */}
          <DashboardToggleView />
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
