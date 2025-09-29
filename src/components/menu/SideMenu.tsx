import { useUserStore } from "@src/store/userStore";
import { Box, Drawer } from "@mui/material";
import { useSidebarStore } from "@src/store/useSidebar";
import logo from "@src/assets/images/imgLogo.png";
import { navItems } from "@src/helpers/constanst";
import NavItem from "./NavItem";

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
              backgroundColor: "primary.main",
              width: sidebarWidth,
              transition: "width 0.3s ease",
              overflowX: "hidden",
              padding: "30px 10px",
              alignItems: "center",
              gap: "15px",
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
            padding: "5px",
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
          onClick={toggleDrawer}
        />
        {navItems.map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
      </Drawer>
    </>
  );
};

export default SideMenu;
