import React from "react";
import { Outlet } from "react-router";
import SideMenu from "../SideMenu";
import { Box, Stack } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Stack direction="row">
        <SideMenu />
        <Box>
          {/* <Outlet /> */}
          <div>10000000000000000000000000</div>
        </Box>
      </Stack>
    </>
  );
};

export default MainLayout;
