import { useUserStore } from "@src/store/userStore";
import { Box, Button, Drawer, Stack } from "@mui/material";
import { useSidebarStore } from "@src/store/useSidebar";
import logo from "@src/assets/images/imgLogo.png";

const SideMenu = () => {
  const { open } = useSidebarStore((state) => state);
  const toggleDrawer = useSidebarStore((state) => state.toggleDrawer);
  const sidebarWidth = open ? 240 : 80;

  return (
    <>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        hideBackdrop
        variant="permanent"
        slotProps={{
          paper: {
            sx: {
              width: sidebarWidth,
              transition: "width 0.3s ease",
              overflowX: "hidden",
              padding: "16px",
            },
          },
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: 50,
            cursor: "pointer",
          }}
          onClick={toggleDrawer}
        />
      </Drawer>
    </>
  );
};

export default SideMenu;
