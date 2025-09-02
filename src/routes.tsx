import { lazy } from "react";
import type { RouteObject } from "react-router";

import NotFoundPage from "./pages/NotFound";

const HomePage = lazy(() => import("./pages/Home/Home"));
const UsersPage = lazy(() => import("./pages/UserManagement/Users"));
const ReportedUsersPage = lazy(
  () => import("./pages/UserManagement/ReportedUsers")
);
const PostsModerationPage = lazy(() => import("./pages/PostManagement/Posts"));
const FlaggedPostsPage = lazy(
  () => import("./pages/PostManagement/FaggedPosts")
);
const PostsManagementPage = lazy(
  () => import("./pages/PostManagement/PostsManagement")
);
const PostDetailPage = lazy(() => import("./pages/PostManagement/PostDetail"));
const EditPostPage = lazy(() => import("./pages/PostManagement/EditPost"));
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
const UploadWinnerPage = lazy(() => import("./pages/Contests/UploadWinner"));
const UploadConfirmationPage = lazy(
  () => import("./pages/Contests/UploadConfirmation")
);
const LoginPage = lazy(() => import("./pages/Auth/Login"));
const RegisterPage = lazy(() => import("./pages/Auth/Register"));
const AnalyticsPage = lazy(() => import("./pages/Analytics/Analytics"));

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
    path: "/posts-moderation",
    element: <PostsModerationPage />,
  },
  {
    path: "/posts/flagged",
    element: <FlaggedPostsPage />,
  },
  {
    path: "/posts",
    element: <PostsManagementPage />,
  },
  {
    path: "/posts/:id",
    element: <PostDetailPage />,
  },
  {
    path: "/posts/:id/edit",
    element: <EditPostPage />,
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
    path: "/contests/upload-winner",
    element: <UploadWinnerPage />,
  },
  {
    path: "/contests/upload-confirmation",
    element: <UploadConfirmationPage />,
  },
  {
    path: "/analytics",
    element: <AnalyticsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
