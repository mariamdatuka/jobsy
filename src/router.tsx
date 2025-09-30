import type { RouteObject } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/layouts/MainLayout";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: Login,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
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

  // {
  //   element: <ProtectedRoutes />,
  //   children: [
  //     {
  //       path: "/dashboard",
  //       element: <Dashboard />,
  //     },
  //   ],
  // },
];
