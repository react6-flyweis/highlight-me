import type { ColumnDef, Row } from "@tanstack/react-table";
import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import { UserCell } from "../table/UserCell";
import { Checkbox } from "../ui/checkbox";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  posts: number;
  status: "active" | "inactive" | "pending";
  createdAt: string;
}

const statusColorMap = {
  active: "bg-green-400",
  inactive: "bg-red-400",
  pending: "bg-yellow-400",
};

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
    cell: () => (
      <Menubar className="border-0 bg-transparent shadow-none">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button size="icon" variant="ghost">
              <EllipsisVerticalIcon className="size-5" />
            </Button>
          </MenubarTrigger>
          <MenubarContent className="text-center" align="end">
            <MenubarItem>
              <span>View</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <span>Block</span>
            </MenubarItem>
            <MenubarSeparator />

            <MenubarItem>
              <span>Suspend</span>
            </MenubarItem>
            <MenubarSeparator />

            <MenubarItem>
              <span>Warn</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
  },
];
