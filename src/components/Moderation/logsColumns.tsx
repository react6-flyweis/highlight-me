"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DetailsBadge from "./DetailsBadge";

export type LogItem = {
  action: string;
  moderator: string;
  reason: string;
  timestamp: string;
  affectedEntity: string;
  details: string;
  id?: string;
};

export const logsColumns: ColumnDef<LogItem, unknown>[] = [
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "moderator",
    header: "Moderator",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "affectedEntity",
    header: "Affected Entity",
  },
  {
    accessorKey: "details",
    header: "Details/Appeals",
    cell: ({ row }) => {
      const v = row.getValue<string>("details");
      return <DetailsBadge text={v} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = (row.original as LogItem).id ?? row.id;
      return (
        <div className="flex justify-end">
          <Button size="icon" variant="ghost" aria-label={`view-${id}`}>
            <EyeIcon className="size-5" />
          </Button>
        </div>
      );
    },
  },
];
