import { Outlet } from "react-router";
import SideMenu from "../menu/SideMenu";
import { Box, Stack } from "@mui/material";
import { useSidebarStore } from "@src/store/useSidebar";

const MainLayout = () => {
  const { open } = useSidebarStore((state) => state);
  return (
    <>
      <Stack direction="row">
        <SideMenu />
        <Box
          sx={{
            p: 1,
            marginLeft: open ? "240px" : "80px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};

export default MainLayout;
