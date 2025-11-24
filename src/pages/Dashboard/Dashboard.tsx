import { Box, Stack } from "@mui/material";
import FiltersContainer from "./components/FiltersContainer";
import KanbanBoard from "./components/KanbanBoard";

const Dashboard = () => {
  return (
    <>
      {" "}
      <Stack spacing={10}>
        <FiltersContainer />
        <KanbanBoard />
      </Stack>
    </>
  );
};

export default Dashboard;
