import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layouts/PageLayout";

import { DateRangeSelector } from "@/components/DateRangeSelector";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { PostsByTypeDonut } from "@/components/charts/PostsByTypeDonut";
import { TotalPostsBar } from "@/components/charts/TotalPostsBar";
import { TopCategoriesHorizontalBar } from "@/components/charts/TopCategoriesHorizontalBar";
import { EngagementBreakdown } from "@/components/charts/EngagementBreakdown";

export default function ContentAnalytics() {
  return (
    <PageLayout
      title="Content Analytics"
      actions={
        <div className="flex items-center gap-3">
          <Button size="sm">Export PDF</Button>
          <Button size="sm">Export CSV</Button>
        </div>
      }
    >
      <div className="flex items-center justify-end gap-2 mb-5">
        <DateRangeSelector />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="shadow-lg gap-0">
          <CardHeader className="px-4">
            <CardTitle>Total Posts Submitted</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <div className="text-3xl font-semibold mb-2">15,678</div>
            <TotalPostsBar height={200} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="px-4">
            <CardTitle>Posts by Type</CardTitle>
            <CardDescription>
              Distribution of content submissions by format.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <PostsByTypeDonut height={200} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="px-4">
            <CardTitle>Top Performing Categories</CardTitle>
            <CardDescription>Travel, Tech, Food</CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <TopCategoriesHorizontalBar height={200} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Engagement Breakdown</h3>
        <p className="mb-3 text-muted-foreground text-sm">
          {" "}
          Likes, Comments, and shares across different content
        </p>
        <div className="shadow w-full bg-white rounded p-4 pt-8">
          <EngagementBreakdown height={260} />
        </div>
      </div>
    </PageLayout>
  );
}
