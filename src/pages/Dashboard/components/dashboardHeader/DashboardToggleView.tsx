import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import type { Props } from "./DashboardHeader";

const DashboardToggleView = ({ alignment, handleChange }: Props) => {
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
