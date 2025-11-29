import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

type View = "kanban" | "table";
const DashboardToggleView = () => {
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
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{
        "& .MuiToggleButton-root": {
          padding: "4px 10px",
          fontSize: "16px",
          borderBottom: "1px solid #E0E0E0",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          textTransform: "none",
        },
      }}
    >
      <ToggleButton value="kanban">Kanban View</ToggleButton>
      <ToggleButton value="table">Table View</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DashboardToggleView;
