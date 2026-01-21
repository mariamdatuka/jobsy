import { Drawer } from "@mui/material";

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
            width: 300,
            padding: "30px 10px",
            alignItems: "center",
          },
        },
      }}
    >
      <div>hi</div>
    </Drawer>
  );
};

export default FiltersDrawer;
