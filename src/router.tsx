import type { RouteObject } from "react-router";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";
import { lazy, Suspense } from "react";
import NotFoundPage from "./components/general/NotFoundPage";

// lazy load all pages
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics/Analytics"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

export const routes: RouteObject[] = [
  {
    Component: PublicRoute,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={null}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={null}>
            <SignUp />
          </Suspense>
        ),
      },
    ],
  },

  {
    Component: ProtectedRoutes,
    errorElement: <ErrorPage />,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={null}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "/analytics",
            element: (
              <Suspense fallback={null}>
                <Analytics />
              </Suspense>
            ),
          },
          {
            path: "/profile",
            element: (
              <Suspense fallback={null}>
                <Profile />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
];
