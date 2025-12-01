import { Box, Stack } from "@mui/material";
import DashboardActions from "./DashboardActions";
import DashboardToggleView from "./DashboardToggleView";

export interface Props {
  handleChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "kanban" | "table" | null
  ) => void;
  alignment: "kanban" | "table";
}

const DashboardHeader = ({ handleChange, alignment }: Props) => {
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
        <Stack gap="25px">
          <DashboardActions />
          <Box sx={{ alignSelf: "end" }}>
            <DashboardToggleView
              handleChange={handleChange}
              alignment={alignment}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
