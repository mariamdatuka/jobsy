import type { RouteObject } from "react-router";
import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";
import { lazy, Suspense } from "react";
import Spinner from "./components/animations/Spinner";
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
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Spinner />}>
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
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "/analytics",
            element: (
              <Suspense fallback={<Spinner />}>
                <Analytics />
              </Suspense>
            ),
          },
          {
            path: "/profile",
            element: (
              <Suspense fallback={<Spinner />}>
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
