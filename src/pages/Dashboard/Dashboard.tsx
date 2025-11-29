import { Stack } from "@mui/material";

import KanbanBoard from "./components/KanbanBoard";
import DashboardHeader from "./DashboardHeader/DashboardHeader";

const Dashboard = () => {
  return (
    <>
      {" "}
      <Stack spacing={10}>
        <DashboardHeader />
        <KanbanBoard />
      </Stack>
    </>
  );
};

export default Dashboard;
