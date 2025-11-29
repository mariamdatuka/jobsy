import { Stack } from "@mui/material";

import KanbanBoard from "./components/kanbanView/KanbanBoard";
import DashboardHeader from "./components/dashboardHeader/DashboardHeader";
import { useState } from "react";
import TableView from "./components/tableView/TableView";
type View = "kanban" | "table";
const Dashboard = () => {
  const [alignment, setAlignment] = useState<View>(() => {
    const saved = localStorage.getItem("dashboardView");
    return (saved as View) || "kanban";
  });
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: View | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      localStorage.setItem("dashboardView", newAlignment);
    }
  };
  return (
    <>
      {" "}
      <Stack spacing={10}>
        <DashboardHeader alignment={alignment} handleChange={handleChange} />
        {alignment === "kanban" ? <KanbanBoard /> : <TableView />}
      </Stack>
    </>
  );
};

export default Dashboard;
