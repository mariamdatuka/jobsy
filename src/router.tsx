import type { RouteObject } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/layouts/MainLayout";

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
