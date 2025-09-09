import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquareReply } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export type UserFeedbackRow = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  subject: string;
  date: string;
  status: "Active" | "InProgress" | "Archived" | "Resolved";
};

export function statusBadgeForFeedback(s: UserFeedbackRow["status"]) {
  const base =
    "inline-flex items-center justify-center px-3 py-1 rounded-lg text-sm w-28 text-white";

  const map: Record<UserFeedbackRow["status"], string> = {
    Active: "bg-rose-500",
    InProgress: "bg-amber-500",
    Archived: "bg-red-500",
    Resolved: "bg-emerald-500",
  };

  return <span className={cn(base, map[s])}>{s}</span>;
}

export const userFeedbackColumns: ColumnDef<UserFeedbackRow, unknown>[] = [
  {
    header: "Ticket ID",
    accessorKey: "id",
    cell: ({ row }) => {
      const r = row.original;
      return (
        <div className="font-medium">{`TKT${String(r.id).padStart(
          3,
          "0"
        )}`}</div>
      );
    },
  },
  {
    header: "User",
    accessorKey: "name",
    cell: ({ row }) => {
      const r = row.original;
      return (
        <div className="flex items-center gap-3">
          <img
            src={r.avatar}
            alt={r.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-gray-400">{r.time}</div>
          </div>
        </div>
      );
    },
  },
  {
    header: "Subject",
    accessorKey: "subject",
  },
  {
    header: "Created Date",
    accessorKey: "date",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) =>
      statusBadgeForFeedback((row.original as UserFeedbackRow).status),
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="inline-flex items-center gap-2 justify-end">
          <Button variant="ghost" title="Message">
            <MessageSquareReply className="w-4 h-4 text-gray-600" />
          </Button>
          <Link to={`/support/user-feedback/${row.id}`}>
            <Button variant="ghost" title="View">
              <Eye className="w-4 h-4 text-gray-600" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
