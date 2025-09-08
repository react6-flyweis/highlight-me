import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DataTable } from "@/components/table/DataTable";
import type { ColumnDef } from "@tanstack/react-table";

type Item = {
  id: string;
  title: string;
  type: string;
  target: string;
  date: string;
  time: string;
  status: string;
};

// Small helper to render action dropdown used in the table
function ActionsCell() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ScheduleTable({ items }: { items?: Item[] }) {
  // If caller didn't pass items, provide sample rows matching the screenshot
  const sample: Item[] =
    items && items.length
      ? items
      : new Array(6).fill(0).map((_, i) => ({
          id: String(i + 1),
          title: "Security",
          type: "Push",
          target: "All Users",
          date: "2023-11-15",
          time: "06:15 AM",
          status: "Scheduled",
        }));

  const columns: ColumnDef<Item, unknown>[] = [
    {
      id: "title",
      header: ({ table }) => (
        <div className="flex items-center gap-3">
          <Checkbox
            aria-label="select-all"
            className="h-4 w-4 border-primary"
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(v) =>
              table.toggleAllRowsSelected(v.toString() === "true")
            }
          />
          <span>Title</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Checkbox
            aria-label={`select-${row.original.id}`}
            className="h-4 w-4 border-primary"
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(v.toString() === "true")}
          />
          <span>{row.original.title}</span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: () => "Type",
    },
    {
      accessorKey: "target",
      header: () => "Target",
    },
    {
      accessorKey: "date",
      header: () => "Date",
    },
    {
      accessorKey: "time",
      header: () => "Time",
    },
    {
      accessorKey: "status",
      header: () => "Status",
    },
    {
      id: "actions",
      header: () => "Action",
      cell: () => <ActionsCell />,
    },
  ];

  return (
    <DataTable
      tWrapperClassName="shadow-none"
      columns={columns}
      data={sample}
      pageSize={6}
      showPagination={false}
    />
  );
}
