import { Outlet, Navigate } from "react-router";
import { useUserStore } from "./store/userStore";
import { Box, CircularProgress } from "@mui/material";

const PublicRoute = () => {
  const session = useUserStore((state) => state.session);
  const isLoading = useUserStore((state) => state.isLoading);

  // Wait for auth initialization to complete
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{session ? <Navigate to="/dashboard" replace /> : <Outlet />}</>;
};

export default PublicRoute;

