import type { RouteObject } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];
