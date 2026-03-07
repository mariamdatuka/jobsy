import { Navigate, Outlet } from "react-router";
import { useUserStore } from "./store/userStore";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const RecoveryRoute = () => {
  const isRecovery = useUserStore((s) => s.isRecoveryMode);
  const isLoading = useUserStore((s) => s.isLoading);

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

  return !isRecovery ? <Outlet /> : <Navigate to="/" replace />;
};

export default RecoveryRoute;
