import { useUserStore } from "@src/store/userStore";
import { Button, Drawer } from "@mui/material";
import { useState } from "react";

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const logout = useUserStore((state) => state.logout);
  let isSidebarOpen = false;
  const sidebarWidth = open ? 240 : 80;
  return (
    <>
      <Button onClick={toggleDrawer}>Open drawer</Button>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        hideBackdrop
        variant="permanent"
        slotProps={{
          paper: {
            sx: {
              width: sidebarWidth,
              transition: "width 0.3s",
              overflowX: "hidden",
            },
          },
        }}
      >
        <button onClick={toggleDrawer}>open</button>
        <h1>hiIII</h1>
        <h1>hIIIIIIi</h1>
        <h1>hIIIIIIIIi</h1>
        <h1>hIIIIIIIIIIIIIIIIIIIi</h1>
      </Drawer>
    </>
  );
};

export default Dashboard;
