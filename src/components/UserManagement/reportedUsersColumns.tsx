import type { ColumnDef, Row } from "@tanstack/react-table";

import { UserCell } from "../table/UserCell";
import { Checkbox } from "../ui/checkbox";
import { statusColorMap, type UserItem } from "./allUsersColumns";
import { ActionMenu } from "./ActionMenu";

export const reportedUsersColumns: ColumnDef<UserItem>[] = [
  {
    accessorKey: "checkbox",
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          className="rounded border-gray-400"
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(v) =>
            table.toggleAllRowsSelected(v.toString() === "true")
          }
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Checkbox
          className="rounded border-gray-400"
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(v.toString() === "true")}
        />
      </div>
    ),
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: (props: { row: Row<UserItem> }) => {
      const { username, avatar, name } = props.row.original;
      return <UserCell avatar={avatar} username={username} name={name} />;
    },
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Join Date",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <p className="space-x-1">
        <span>
          {new Date(row.original.createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </p>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColor = statusColorMap[status];
      return (
        <div
          className={`flex justify-center items-center text-center rounded px-2 py-2 w-28 text-sm ${statusColor}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => <ActionMenu row={row} />,
  },
];
