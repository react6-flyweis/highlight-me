import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActiveUsersLine } from "@/components/charts/ActiveUsersLine";
import { SignupsBar } from "@/components/charts/SignupsBar";
import { WeeklyActiveBar } from "@/components/charts/WeeklyActiveBar";
import { LoginSignupsLine } from "@/components/charts/LoginSignupsLine";
import { PageLayout } from "@/components/layouts/PageLayout";
import { DateRangeSelector } from "@/components/DateRangeSelector";

export default function UserAnalytics() {
  return (
    <PageLayout
      title="User Analytics"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-2 gap-0 shadow-lg">
          <CardHeader className="p-2">
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent className="p-2 ">
            <div className="text-2xl font-semibold">1,750</div>
            <div className="flex flex-col justify-center h-full">
              <ActiveUsersLine height={80} />
            </div>
          </CardContent>
        </Card>

        <Card className="p-2 gap-0 shadow-lg">
          <CardHeader className="p-2">
            <CardTitle>New Signups</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="text-2xl font-semibold">50</div>
            <SignupsBar height={150} />
          </CardContent>
        </Card>

        <Card className="p-2 gap-0 shadow-lg">
          <CardHeader className="p-2">
            <CardTitle>Avg. Posts per User</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="text-2xl font-semibold">2.8</div>
            <div className="text-xs text-success text-green-500">
              +8.2% vs last month
            </div>
            <div className="text-xs text-success mt-1">
              Based on Active users
            </div>
          </CardContent>
        </Card>

        <Card className="p-2 gap-0  shadow-lg">
          <CardHeader className="p-2">
            <CardTitle>Weekly Active Users</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="text-2xl font-semibold">9,500</div>
            <WeeklyActiveBar height={140} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-xl font-semibold">Prize Description</h3>
        <div className="p-5 pt-8 bg-white ">
          <LoginSignupsLine height={240} />
        </div>
      </div>
    </PageLayout>
  );
}
