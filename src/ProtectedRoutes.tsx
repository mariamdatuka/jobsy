import { Outlet, Navigate } from "react-router";
import { useUserStore } from "./store/userStore";

const ProtectedRoutes = () => {
  const session = useUserStore((state) => state.session);
  return <>{session ? <Outlet /> : <Navigate to="/" replace />}</>;
};

export default ProtectedRoutes;
