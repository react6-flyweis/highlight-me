import type { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./ActionsCell";

export type TopicRow = {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  time: string;
  notes: string;
  ip: string;
  avatar?: string;
};

function truncate(s: string, n = 40) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + "…";
}

export const topicColumns: ColumnDef<TopicRow>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => {
      const r = row.original as TopicRow;
      return (
        <div className="flex flex-col">
          <div className="text-sm font-medium">{r.title}</div>
          <div className="text-xs text-gray-400">{r.author}</div>
        </div>
      );
    },
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => <div className="text-sm">{row.original.category}</div>,
  },
  {
    header: "Status",
    accessorKey: "notes",
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">
        {truncate(row.original.notes, 50)}
      </div>
    ),
  },
  {
    header: "Details/Notes",
    accessorKey: "notes",
    cell: ({ row }) => <div className="text-sm">{row.original.notes}</div>,
  },
  {
    header: "IP Address",
    accessorKey: "ip",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
