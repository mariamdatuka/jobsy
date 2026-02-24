import { Outlet } from "react-router";
import SideMenu from "../menu/SideMenu";
import { Box, Stack } from "@mui/material";
import { useSidebarStore } from "@src/store/useSidebar";

const MainLayout = () => {
  const { open } = useSidebarStore((state) => state);
  return (
    <>
      <Stack direction="row" height="100vh">
        <SideMenu />
        <Box
          sx={{
            flex: 1,
            px: 8,
            py: 6,
            marginLeft: open ? "220px" : "80px",
            transition: "margin-left 0.3s ease",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};

export default MainLayout;
