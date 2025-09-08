import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleTable } from "@/components/Notifications/ScheduleTable";
import { Link } from "react-router";
import { NotificationsNav } from "@/components/layouts/NotificationsNav";
import { ScheduleCalendar } from "@/components/Notifications/ScheduleCalendar";

// helper: format Date to YYYY-MM-DD
function formatDateISO(d: Date) {
  // ...keeps only the date part in ISO format
  return d.toISOString().split("T")[0];
}

// helper: random date within `days` days from today (inclusive)
function randomDateWithinDays(days = 60) {
  const now = new Date();
  // pick an integer offset from 0..days-1
  const offset = Math.floor(Math.random() * days);
  const dt = new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);
  return formatDateISO(dt);
}

const sample = Array.from({ length: 6 }).map((_, i) => ({
  id: (i + 1).toString(),
  title: "Security",
  type: "Push",
  target: "All Users",
  date: randomDateWithinDays(30),
  time: "06:15 AM",
  status: i % 3 === 0 ? "Draft" : i % 3 === 1 ? "Scheduled" : "Sent",
}));

export default function SchedulePage() {
  return (
    <PageLayout title="Schedule Management">
      <NotificationsNav />
      <div className="flex items-center justify-end mb-4">
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/notifications/template" className="inline-block">
              + Create New Template
            </Link>
          </Button>
          <Button asChild>
            <Link to="/notifications/create" className="inline-block">
              + New Notification
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card className="rounded">
          <CardHeader>
            <CardTitle>Schedule Management</CardTitle>
          </CardHeader>
          <CardContent>
            <ScheduleTable items={sample} />
          </CardContent>
        </Card>

        <ScheduleCalendar
          initialEvents={sample.map((s) => ({
            id: String(s.id),
            title: s.title,
            date: s.date,
            time: s.time,
          }))}
        />
      </div>
    </PageLayout>
  );
}
