import { Outlet, Navigate } from "react-router";
import { useUserStore } from "./store/userStore";
import { Box, CircularProgress } from "@mui/material";

// const ProtectedRoutes = () => {
//   const session = useUserStore((state) => state.session);
//   const isLoading = useUserStore((state) => state.isLoading);
//   const isRecoveryMode = useUserStore((state) => state.isRecoveryMode);
//   const isLoggedIn = session && !isRecoveryMode;

//   console.log(isLoggedIn, "protected");
//   // Wait for auth initialization to complete
//   if (isLoading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
//   // if (isRecoveryMode) {
//   //   return <Navigate to="/passwordreset" replace />;
//   // }
//   if (!session || isRecoveryMode) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <>{session && !isRecoveryMode ? <Outlet /> : <Navigate to="/" replace />}</>
//   );
// };

// export default ProtectedRoutes;
const ProtectedRoutes = () => {
  const status = useUserStore((s) => s.status);

  if (status === "loading") return <CircularProgress />;

  if (status !== "authenticated") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
