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
const UserAnalyticsPage = lazy(() => import("./pages/Analytics/UserAnalytics"));
const ContentAnalyticsPage = lazy(
  () => import("./pages/Analytics/ContentAnalytics")
);
const ContestAnalyticsPage = lazy(
  () => import("./pages/Analytics/ContestAnalytics")
);
const HashtagsDashboard = lazy(
  () => import("./pages/Hashtags/HashtagsDashboard")
);
const HashtagsManagementPage = lazy(
  () => import("./pages/Hashtags/HashtagsManagement")
);
const HashtagsCategoryPage = lazy(
  () => import("./pages/Hashtags/HashtagsCategoryManagement")
);
const CreateTagPage = lazy(() => import("./pages/Hashtags/CreateTag"));
const TagDetailsPage = lazy(() => import("./pages/Hashtags/TagDetails"));
const EditTagPage = lazy(() => import("./pages/Hashtags/EditTag"));
const ModerationToolsPage = lazy(
  () => import("./pages/Moderation/ModerationTools")
);
const ModerationSettingsPage = lazy(
  () => import("./pages/Moderation/Settings")
);
const ContentReviewPage = lazy(
  () => import("./pages/Moderation/ContentReview")
);
const ReportedContentPage = lazy(
  () => import("./pages/Moderation/ReportedContent")
);
const ModerationActionsPage = lazy(
  () => import("./pages/Moderation/ModerationActions")
);
const KeywordsPage = lazy(() => import("./pages/Moderation/Keywords"));
const KeywordDetailPage = lazy(
  () => import("./pages/Moderation/KeywordDetail")
);
const LogsPage = lazy(() => import("./pages/Moderation/Logs"));
const AddNotificationPage = lazy(
  () => import("./pages/Moderation/AddNotification")
);
const AppSettingsPage = lazy(() => import("./pages/Settings/AppSettings"));
const PostWindowSettingsPage = lazy(
  () => import("./pages/Settings/PostWindowSettings")
);
const MediaUploadLimitsPage = lazy(
  () => import("./pages/Settings/MediaUploadLimits")
);
const CustomMessagesPage = lazy(
  () => import("./pages/Settings/CustomMessages")
);
const SecurityPage = lazy(() => import("./pages/Security/Security"));
const AuditLogPage = lazy(() => import("./pages/Security/AuditLog"));
const IPWhitelistPage = lazy(() => import("./pages/Security/IPWhitelist"));
const MultiFactorAuthenticationPage = lazy(
  () => import("./pages/Security/MultiFactorAuthentication")
);
const NotificationsPage = lazy(
  () => import("./pages/Notifications/Notifications")
);
const AllNotificationsPage = lazy(
  () => import("./pages/Notifications/AllNotifications")
);
const CreateNotificationPage = lazy(
  () => import("./pages/Notifications/CreateNotification")
);
const TemplatePage = lazy(() => import("./pages/Notifications/Template"));
const SchedulePage = lazy(() => import("./pages/Notifications/Schedule"));
const NotificationsAnalyticsPage = lazy(
  () => import("./pages/Notifications/Analytics")
);
const SupportPage = lazy(() => import("./pages/Support/Support"));
const FeedbackDetailPage = lazy(() => import("./pages/Support/FeedbackDetail"));
const SupportRequestDetailPage = lazy(
  () => import("./pages/Support/SupportRequestDetail")
);
const SupportRequestsPage = lazy(
  () => import("./pages/Support/SupportRequests")
);
const SupportRequestDetailStandalonePage = lazy(
  () => import("./pages/Support/SupportRequestDetailStandalone")
);
const TopicsManagementPage = lazy(
  () => import("./pages/Support/TopicsManagement")
);

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
    path: "/notifications",
    element: <NotificationsPage />,
  },
  {
    path: "/notifications/create",
    element: <CreateNotificationPage />,
  },
  {
    path: "/notifications/template",
    element: <TemplatePage />,
  },
  {
    path: "/notifications/schedule",
    element: <SchedulePage />,
  },
  {
    path: "/notifications/analytics",
    element: <NotificationsAnalyticsPage />,
  },
  {
    path: "/notifications/all",
    element: <AllNotificationsPage />,
  },
  {
    path: "/hashtags/",
    element: <HashtagsDashboard />,
  },
  {
    path: "/hashtags/management",
    element: <HashtagsManagementPage />,
  },
  {
    path: "/hashtags/management/:id",
    element: <TagDetailsPage />,
  },
  {
    path: "/hashtags/create",
    element: <CreateTagPage />,
  },
  {
    path: "/hashtags/management/edit/:id",
    element: <EditTagPage />,
  },
  {
    path: "/tools",
    element: <ModerationToolsPage />,
  },
  {
    path: "/tools/settings",
    element: <ModerationSettingsPage />,
  },
  {
    path: "/tools/content-review",
    element: <ContentReviewPage />,
  },
  {
    path: "/tools/reported",
    element: <ReportedContentPage />,
  },
  {
    path: "/tools/keywords",
    element: <KeywordsPage />,
  },
  {
    path: "/tools/logs",
    element: <LogsPage />,
  },
  {
    path: "/tools/keywords/:id",
    element: <KeywordDetailPage />,
  },
  {
    path: "/tools/keywords/new",
    element: <AddNotificationPage />,
  },
  {
    path: "/tools/moderation-actions",
    element: <ModerationActionsPage />,
  },
  {
    path: "/settings",
    element: <AppSettingsPage />,
  },
  {
    path: "/settings/post-window",
    element: <PostWindowSettingsPage />,
  },
  {
    path: "/settings/media-limits",
    element: <MediaUploadLimitsPage />,
  },
  {
    path: "/settings/messages",
    element: <CustomMessagesPage />,
  },
  {
    path: "/security",
    element: <SecurityPage />,
  },
  {
    path: "/security/audit-log",
    element: <AuditLogPage />,
  },
  {
    path: "/security/ip-whitelist",
    element: <IPWhitelistPage />,
  },
  {
    path: "/security/mfa",
    element: <MultiFactorAuthenticationPage />,
  },
  {
    path: "/hashtags/categories",
    element: <HashtagsCategoryPage />,
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
    path: "/analytics/users",
    element: <UserAnalyticsPage />,
  },
  {
    path: "/analytics/content",
    element: <ContentAnalyticsPage />,
  },
  {
    path: "/analytics/contests",
    element: <ContestAnalyticsPage />,
  },
  {
    path: "/support",
    element: <SupportPage />,
  },
  {
    path: "/support/requests",
    element: <SupportRequestsPage />,
  },
  {
    path: "/support/requests/detail",
    element: <SupportRequestDetailPage />,
  },
  {
    path: "/support/requests/detail/:id",
    element: <SupportRequestDetailStandalonePage />,
  },
  {
    path: "/support/faqs",
    element: <TopicsManagementPage />,
  },
  {
    path: "/support/feedback",
    element: <FeedbackDetailPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
