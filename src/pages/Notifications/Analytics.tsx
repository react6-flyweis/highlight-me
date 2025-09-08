import { PageLayout } from "@/components/layouts/PageLayout";
import { NotificationsNav } from "@/components/layouts/NotificationsNav";
import { StatCard } from "@/components/StatCard";
import { NotificationPerformanceLine } from "@/components/charts/NotificationPerformanceLine";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Send, Calendar, BarChart2, Trophy } from "lucide-react";

export default function NotificationsAnalyticsPage() {
  return (
    <PageLayout title="Notification Analytics">
      <NotificationsNav />

      <div className="flex justify-end gap-2 mb-6">
        <Link to="/notifications/template">
          <Button size="sm" className="bg-teal-600 text-white">
            + Create New Template
          </Button>
        </Link>

        <Link to="/notifications/create">
          <Button
            size="sm"
            variant="outline"
            className="border-primary text-primary"
          >
            + New Notification
          </Button>
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Notification Analytics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <StatCard
            title="Total Notifications Sent"
            value="1.2M"
            sub="+12.5% vs last month"
            icon={<Send className="w-5 h-5 text-muted-foreground" />}
          />

          <StatCard
            title="Delivery Success Rate"
            value="98.5%"
            sub="+0.8% vs last month"
            icon={<Calendar className="w-5 h-5 text-muted-foreground" />}
          />

          <StatCard
            title="Click-Through Rate (CTR)"
            value="75.2%"
            sub="-2.1% vs last month"
            icon={<BarChart2 className="w-5 h-5 text-muted-foreground" />}
          />

          <StatCard
            title="Open Rate"
            value="75.2%"
            sub="-2.1% vs last month"
            icon={<Trophy className="w-5 h-5 text-muted-foreground" />}
          />
        </div>

        <div className="mt-6 ">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Notification Performance Over Time
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Metrics tracked daily for the selected period.
          </p>

          <div className="w-full mt-4 pt-8 p-4 bg-white rounded shadow-sm">
            <NotificationPerformanceLine height={240} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
