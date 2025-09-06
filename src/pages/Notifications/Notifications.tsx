import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Link } from "react-router";

const notifications = [
  {
    id: 1,
    name: "Sarah",
    avatar: "/user.jpg",
    time: "10mins ago",
    message: "🏆 Winner announced for Week 32 contest",
  },
  {
    id: 2,
    name: "Sarah",
    avatar: "/user.jpg",
    time: "1 hour ago",
    message: "⏰ Post window closing in 3 hour",
  },
  {
    id: 3,
    name: "Sarah",
    avatar: "/user.jpg",
    time: "Yesterday",
    message: "📣 New system update is now live",
  },
];

export default function NotificationsPage() {
  return (
    <PageLayout title="All Notifications">
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-center justify-between rounded-lg border p-4 "
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={n.avatar} alt={n.name} />
                <AvatarFallback>
                  {n.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{n.name}</div>
                <div className="text-sm text-muted-foreground">{n.message}</div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">{n.time}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link to="/notifications/all">
          <Button variant="outline" className="w-64 bg-transparent">
            View All Notifications
          </Button>
        </Link>
      </div>
    </PageLayout>
  );
}
