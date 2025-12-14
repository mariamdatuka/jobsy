import { Stack } from "@mui/material";
import KanbanBoard from "./components/kanbanView/KanbanBoard";
import DashboardHeader from "./components/dashboardHeader/DashboardHeader";
import { useState } from "react";
import TableView from "./components/tableView/TableView";
import AnimatedView from "@src/components/animations/AnimatedView";
import { useUserStore } from "@src/store/userStore";
import type { Task } from "@src/types/commonTypes";
import { supabase } from "@src/supabase-client";
import dayjs from "dayjs";
type View = "kanban" | "table";
const Dashboard = () => {
  const [alignment, setAlignment] = useState<View>(() => {
    const saved = localStorage.getItem("dashboardView");
    return (saved as View) || "kanban";
  });

  const session = useUserStore((state) => state.session);
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
  const handleJobSubmit = async (values: Task) => {
    if (!session) return;

    const payload = {
      company_name: values.company_name,
      position: values.position,
      link: values.link || null,
      salary: values.salary ? Number(values.salary) : null,
      country: values.country || null,
      notes: values.notes || null,
      status: values.status.toUpperCase(), // already validated
      vacancy_type: values.vacancy_type?.toUpperCase(),

      date_applied: values.date_applied
        ? dayjs(values.date_applied).format("YYYY-MM-DD")
        : null,

      user_id: session.user.id,
    };

    const { data, error } = await supabase.from("tasks").insert(payload);

    if (error) {
      console.error("Error adding job:", error.message);
      return;
    }
    console.log("Job added successfully:", data);
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
