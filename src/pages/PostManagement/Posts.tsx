import { PageLayout } from "@/components/layouts/PageLayout";
import { PostsNav } from "@/components/Posts/PostsNav";
import { PostModerationPanel } from "./PostModerationPanel";

export default function Posts() {
  return (
    <PageLayout title="Reported Posts">
      <div className="flex flex-col gap-1 mb-1">
        <PostsNav />
      </div>

      <PostModerationPanel />
    </PageLayout>
  );
}
