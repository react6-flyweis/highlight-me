import { lazy } from "react";
import type { RouteObject } from "react-router";

import NotFoundPage from "./pages/NotFound";

const HomePage = lazy(() => import("./pages/Home/Home"));
const UsersPage = lazy(() => import("./pages/UserManagement/Users"));
const ReportedUsersPage = lazy(
  () => import("./pages/UserManagement/ReportedUsers")
);
const PostsModerationPage = lazy(() => import("./pages/PostManagement/Posts"));
const UserProfilePage = lazy(
  () => import("./pages/UserManagement/UserProfile")
);
const ContestsPage = lazy(() => import("./pages/Contests/Contests"));
const PrizeCriteriaPage = lazy(() => import("./pages/Contests/PrizeCriteria"));
const PrizeTiersPage = lazy(() => import("./pages/Contests/PrizeTiers"));
const PrizeDetailsPage = lazy(() => import("./pages/Contests/PrizeDetails"));
const PastWinnersPage = lazy(() => import("./pages/Contests/PastWinners"));
const PrizeDistributionPage = lazy(
  () => import("./pages/Contests/PrizeDistribution")
);
const LoginPage = lazy(() => import("./pages/Auth/Login"));
const RegisterPage = lazy(() => import("./pages/Auth/Register"));

export const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

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
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/users/reported",
    element: <ReportedUsersPage />,
  },
  {
    path: "/users/profile/:id",
    element: <UserProfilePage />,
  },
  {
    path: "/posts",
    element: <PostsManagementPage />,
  },
  },
  {
    path: "/contests",
    element: <ContestsPage />,
  },
  {
    path: "/contests/prize-criteria",
    element: <PrizeCriteriaPage />,
  },
  {
    path: "/contests/prize-tiers",
    element: <PrizeTiersPage />,
  },
  {
    path: "/contests/prize-details",
    element: <PrizeDetailsPage />,
  },
  {
    path: "/contests/past-winners",
    element: <PastWinnersPage />,
  },
  {
    path: "/contests/prize-distribution",
    element: <PrizeDistributionPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
