import { PageLayout } from "@/components/layouts/PageLayout";
import { PostModerationPanel } from "./PostModerationPanel";

export default function FlaggedPosts() {
  return (
    <PageLayout title="Flagged Posts">
      <PostModerationPanel flagged />
    </PageLayout>
  );
}
