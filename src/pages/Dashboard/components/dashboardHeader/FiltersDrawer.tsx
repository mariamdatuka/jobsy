import { Drawer } from "@mui/material";
import { MultiSelectFilter } from "./FilterGroup";

const FiltersDrawer = ({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: () => void;
}) => {
  return (
    <Drawer
      open={open}
      onClose={toggleDrawer}
      anchor="right"
      slotProps={{
        paper: {
          sx: {
            width: 350,
            padding: "30px 10px",
            // alignItems: "center",
          },
        },
      }}
    >
      <MultiSelectFilter
        title="Status"
        options={["applied", "saved"]}
        filterKey="status"
      />
      <MultiSelectFilter
        title="Type"
        options={["full-time", "part-time"]}
        filterKey="type"
      />
    </Drawer>
  );
};

export default FiltersDrawer;
