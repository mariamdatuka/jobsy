import { Box, Stack } from "@mui/material";
import DashboardActions from "./DashboardActions";
import DashboardToggleView from "./DashboardToggleView";
import Search from "./Search";

import FiltersLayout from "./FiltersLayout";
import useBreakpoints from "@src/hooks/useBreakpoints";

export interface Props {
  handleChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "kanban" | "table" | null,
  ) => void;
  alignment: "kanban" | "table";
  handleJobSubmit?: (values: any, userid: string) => Promise<void> | void;
}

const DashboardHeader = ({ handleChange, alignment }: Props) => {
  const { isMediumOnly } = useBreakpoints();
  return (
    <Box border="1px solid #c1bfbf" borderRadius="8px" padding="10px">
      <Stack
        flexDirection={isMediumOnly ? "column" : "row"}
        justifyContent={isMediumOnly ? "left" : "space-between"}
        alignItems={isMediumOnly ? "left" : "center"}
        padding={2}
        gap={isMediumOnly ? 4 : 0}
      >
        {!isMediumOnly ? (
          <Box display="flex" gap={2}>
            <Search />
            <FiltersLayout />
          </Box>
        ) : (
          <>
            <Search />
            <Box display="flex" gap={2}>
              <FiltersLayout />
            </Box>
          </>
        )}

        <Stack gap="25px" sx={{ alignSelf: "end" }}>
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
