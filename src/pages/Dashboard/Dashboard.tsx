import { Stack } from "@mui/material";
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

  // Example caller-provided handler for Add Job modal.
  // Replace implementation with API call/store update as needed.
  const handleJobSubmit = async (values: any) => {
    console.log("Add job values from modal:", values);
    // TODO: call API or update store here
  };
  return (
    <>
      {" "}
      <Stack spacing={10}>
        <DashboardHeader
          alignment={alignment}
          handleChange={handleChange}
          handleJobSubmit={handleJobSubmit}
        />
        <AnimatedView viewKey={alignment}>
          {alignment === "kanban" ? <KanbanBoard /> : <TableView />}
        </AnimatedView>
      </Stack>
    </>
  );
};

export default Dashboard;
