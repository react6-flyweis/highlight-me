import { Link } from "react-router";
import { PageLayout } from "@/components/layouts/PageLayout";
import { NotificationsNav } from "@/components/layouts/NotificationsNav";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Send, Calendar, Gift } from "lucide-react";
import { RecentNotificationsTable } from "@/components/Notifications/RecentNotificationsTable";

export default function AllNotificationsPage() {
  return (
    <PageLayout title={<span>Notifications</span>}>
      <NotificationsNav />

      <div className="flex justify-end">
        <Link to="/notifications/create">
          <Button size="sm" className="bg-teal-600 text-white">
            + New Notification
          </Button>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Notifications Sent"
          value="2,450"
          sub="+5% from last month, notifications delivered"
          icon={<Send className="w-4 h-4" />}
        />

        <StatCard
          title="Upcoming Scheduled Notifications"
          value="12"
          sub="-0% change, upcoming in next 7 days"
          icon={<Calendar className="w-4 h-4" />}
        />

        <StatCard
          title="Template Variants Count"
          value="25"
          sub="+2 new this week, template variants available"
          icon={<Gift className="w-4 h-4" />}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Recent Notifications
        </h3>
        <RecentNotificationsTable />
      </div>
    </PageLayout>
  );
}
