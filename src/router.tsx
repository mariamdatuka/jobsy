import type { RouteObject } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import MainLayout from "./components/layouts/MainLayout";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";

export const routes: RouteObject[] = [
  {
    Component: PublicRoute,
    children: [
      {
        path: "/",
        Component: Login,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
    ],
  },
  {
    Component: ProtectedRoutes,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: "/dashboard",
            Component: Dashboard,
          },
          {
            path: "/analytics",
            Component: Analytics,
          },
          {
            path: "/profile",
            Component: Profile,
          },
        ],
      },
    ],
  },
];
