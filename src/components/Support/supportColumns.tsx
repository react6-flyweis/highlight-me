import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquareReply, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

export function statusBadge(s: SupportRow["status"]) {
  const base =
    "inline-flex items-center justify-center px-3 py-1 rounded-lg text-sm font-medium w-28";

  const map: Record<SupportRow["status"], string> = {
    Active: "text-green-600 border border-green-500",
    InProgress: "text-yellow-600 border border-yellow-500",
    Archived: "text-red-600 border border-red-500",
    Resolved: "text-cyan-600 border border-cyan-500",
  };

  return <span className={cn(base, map[s])}>{s}</span>;
}

export type SupportRow = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  type: string;
  date: string;
  status: "Active" | "InProgress" | "Archived" | "Resolved";
};

export function useSupportColumns() {
  return useMemo<ColumnDef<SupportRow, unknown>[]>(
    () => [
      {
        header: "User Name & ID",
        accessorKey: "name",
        cell: ({ row }) => {
          const r = row.original as SupportRow;
          return (
            <div className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/150?img=${(r.id % 70) + 1}`}
                alt={r.name}
                loading="lazy"
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
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Date Submitted",
        accessorKey: "date",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => statusBadge((row.original as SupportRow).status),
      },
      {
        header: "Actions",
        id: "actions",
        cell: () => {
          return (
            <div className="inline-flex items-center gap-1 justify-end">
              <Button variant="ghost" title="View">
                <Eye className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" title="Message">
                <MessageSquareReply className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" title="Tags">
                <Archive className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );
}
