import { lazy } from "react";
import type { RouteObject } from "react-router";

import NotFoundPage from "./pages/NotFound";

const HomePage = lazy(() => import("./pages/Home/Home"));

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <>Login</>,
  },
  {
    path: "/register",
    element: <>Register</>,
  },
  // {
  //   path: '/forgot-password',
  //   element: <ForgotPasswordPage />,
  // },
  // {
  //   path: '/reset-password/:token',
  //   element: <ResetPasswordPage />,
  // },
];

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
