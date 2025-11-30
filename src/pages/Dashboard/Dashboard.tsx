import { Stack } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import KanbanBoard from "./components/kanbanView/KanbanBoard";
import DashboardHeader from "./components/dashboardHeader/DashboardHeader";
import { useState } from "react";
import TableView from "./components/tableView/TableView";
import AnimatedView from "@src/components/animations/AnimatedView";
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
        <AnimatedView viewKey={alignment}>
          {alignment === "kanban" ? <KanbanBoard /> : <TableView />}
        </AnimatedView>
      </Stack>
    </>
  );
};

export default Dashboard;
