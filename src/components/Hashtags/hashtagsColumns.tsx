import type { ColumnDef, Row } from "@tanstack/react-table";
import { HashtagActions } from "./HashtagActions";

export interface HashtagItem {
  id: string;
  name: string;
  usageCount: number;
  trend: "up" | "down" | "flat";
}

export const hashtagsColumns: ColumnDef<HashtagItem>[] = [
  {
    header: "Hashtag Name",
    accessorKey: "name",
    cell: ({ row }: { row: Row<HashtagItem> }) => {
      return <span className="font-medium">{row.original.name}</span>;
    },
  },
  {
    header: "Usage Count",
    accessorKey: "usageCount",
    cell: ({ row }: { row: Row<HashtagItem> }) => (
      <span>{row.original.usageCount.toLocaleString()}</span>
    ),
  },
  {
    header: "Trend",
    accessorKey: "trend",
    cell: ({ row }: { row: Row<HashtagItem> }) => {
      const t = row.original.trend;
      const color =
        t === "up"
          ? "bg-green-400"
          : t === "down"
          ? "bg-red-400"
          : "bg-gray-300";
      const label = t === "up" ? "UP" : t === "down" ? "DOWN" : "FLAT";
      return (
        <div className={`rounded px-2 py-1 w-20 text-sm text-center ${color}`}>
          {label}
        </div>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }: { row: Row<HashtagItem> }) => {
      const id = row.original.id;
      return <HashtagActions id={id} />;
    },
  },
];
