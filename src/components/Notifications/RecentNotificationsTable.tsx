import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Eye, Edit3, Trash2 } from "lucide-react";

export type NotificationItem = {
  id?: string | number;
  title: string;
  type: string;
  targetAudience: string;
  status: string;
  scheduledTime: string;
};

const defaultItems: NotificationItem[] = [
  {
    id: 1,
    title: "Flash Sale Alert: 24-Hour Deals!",
    type: "Push",
    targetAudience: "All Users",
    status: "Sent",
    scheduledTime: "2024-07-20 10:00 AM",
  },
  {
    id: 2,
    title: "Welcome New User Guide",
    type: "In-App",
    targetAudience: "New Sign-ups",
    status: "Scheduled",
    scheduledTime: "2024-07-20 10:00 AM",
  },
  {
    id: 3,
    title: "Your Weekly Digest is Here!",
    type: "Push",
    targetAudience: "Active Subscribers",
    status: "Sent",
    scheduledTime: "2024-07-20 10:00 AM",
  },
  {
    id: 4,
    title: "Account Security Update Required",
    type: "Push",
    targetAudience: "Specific Users",
    status: "Sent",
    scheduledTime: "Not Set",
  },
  {
    id: 5,
    title: "Payment Reminder: Subscription Due",
    type: "Push",
    targetAudience: "Premium Users",
    status: "Draft",
    scheduledTime: "2024-07-20 10:00 AM",
  },
  {
    id: 6,
    title: "Feedback Request: New Feature Beta",
    type: "In-App",
    targetAudience: "Beta Testers",
    status: "Sent",
    scheduledTime: "Not Set",
  },
  {
    id: 7,
    title: "Service Outage Notification",
    type: "Push",
    targetAudience: "All Users",
    status: "Failed",
    scheduledTime: "2024-07-20 10:00 AM",
  },
];

export function RecentNotificationsTable({
  className,
}: {
  className?: string;
}) {
  return (
    <Table className={`${className ?? ""} rounded-lg bg-white`}>
      <TableHeader>
        <tr className="text-left font-semibold text-gray-500 border-b">
          <TableHead className="py-3 px-4">Notification Title</TableHead>
          <TableHead className="py-3 px-4">Type</TableHead>
          <TableHead className="py-3 px-4">Target Audience</TableHead>
          <TableHead className="py-3 px-4">Status</TableHead>
          <TableHead className="py-3 px-4">Scheduled Time</TableHead>
          <TableHead className="py-3 px-4">Actions</TableHead>
        </tr>
      </TableHeader>

      <TableBody className="divide-y">
        {defaultItems.map((row) => (
          <TableRow key={row.id ?? row.title}>
            <TableCell className="py-4 px-4 text-sm">{row.title}</TableCell>
            <TableCell className="py-4 px-4 text-gray-600">
              {row.type}
            </TableCell>
            <TableCell className="py-4 px-4 text-gray-600">
              {row.targetAudience}
            </TableCell>
            <TableCell className="py-4 px-4">
              <div className="flex justify-end">
                <span className="inline-flex items-center justify-center px-3 py-2 rounded w-28">
                  {row.status}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-4 px-4 text-gray-600">
              {row.scheduledTime}
            </TableCell>
            <TableCell className="py-4 px-4">
              <div className="flex justify-end items-center space-x-3">
                <button
                  aria-label="view"
                  className="text-gray-500 hover:text-gray-800"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  aria-label="edit"
                  className="text-gray-500 hover:text-gray-800"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  aria-label="delete"
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
