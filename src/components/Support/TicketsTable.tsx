import { DataTable } from "@/components/table/DataTable";
import type { DataTableRef } from "@/components/table/DataTable";
import type { ColumnDef, CellContext } from "@tanstack/react-table";
import { forwardRef } from "react";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon } from "lucide-react";
import { Button } from "../ui/button";

export type TicketItem = {
  id: string;
  ticketId: string;
  user: string;
  avatar?: string | null;
  time?: string;
  subject: string;
  priority: string;
  status: string;
  assignedTo: string;
  createdDate: string;
};

const sampleTickets: TicketItem[] = [
  {
    id: "1",
    ticketId: "TKT001",
    user: "Sarah",
    avatar: null,
    time: "4.00am",
    subject: "Cannot log in after password reset attempt",
    priority: "Urgent",
    status: "Open",
    assignedTo: "John Doe",
    createdDate: "2024-07-28",
  },
  {
    id: "2",
    ticketId: "TKT002",
    user: "Amir",
    avatar: null,
    time: "10.30am",
    subject: "Payment not showing",
    priority: "High",
    status: "Waiting for User",
    assignedTo: "Jane Smith",
    createdDate: "2024-07-28",
  },
  {
    id: "3",
    ticketId: "TKT003",
    user: "Lina",
    avatar: null,
    time: "1.15pm",
    subject: "Feature request: export",
    priority: "Low",
    status: "Open",
    assignedTo: "John Doe",
    createdDate: "2024-07-27",
  },
  {
    id: "4",
    ticketId: "TKT004",
    user: "Omar",
    avatar: null,
    time: "9.45am",
    subject: "Error on checkout page",
    priority: "Urgent",
    status: "Open",
    assignedTo: "Alice Lee",
    createdDate: "2024-07-26",
  },
  {
    id: "5",
    ticketId: "TKT005",
    user: "Nora",
    avatar: null,
    time: "2.20pm",
    subject: "Unable to upload image",
    priority: "Medium",
    status: "Resolved",
    assignedTo: "John Doe",
    createdDate: "2024-07-25",
  },
  {
    id: "6",
    ticketId: "TKT006",
    user: "Maya",
    avatar: null,
    time: "11.05am",
    subject: "Request refund",
    priority: "High",
    status: "Waiting for User",
    assignedTo: "Jane Smith",
    createdDate: "2024-07-24",
  },
  {
    id: "7",
    ticketId: "TKT007",
    user: "Ibrahim",
    avatar: null,
    time: "6.30pm",
    subject: "App crashes on start",
    priority: "Urgent",
    status: "Open",
    assignedTo: "Alice Lee",
    createdDate: "2024-07-23",
  },
  {
    id: "8",
    ticketId: "TKT008",
    user: "Sara",
    avatar: null,
    time: "8.00am",
    subject: "Question about billing cycle",
    priority: "Low",
    status: "Closed",
    assignedTo: "John Doe",
    createdDate: "2024-07-22",
  },
  {
    id: "9",
    ticketId: "TKT009",
    user: "Rashid",
    avatar: null,
    time: "3.10pm",
    subject: "Feature suggestion: dark mode",
    priority: "Low",
    status: "Open",
    assignedTo: "Product Team",
    createdDate: "2024-07-21",
  },
  {
    id: "10",
    ticketId: "TKT010",
    user: "Laila",
    avatar: null,
    time: "12.00pm",
    subject: "Missing transaction",
    priority: "High",
    status: "Open",
    assignedTo: "Billing",
    createdDate: "2024-07-20",
  },
];

const ticketColumns: ColumnDef<TicketItem>[] = [
  {
    accessorKey: "checkbox",
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          className="rounded border-gray-400"
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
          aria-label="select-all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Checkbox
          className="rounded border-gray-400"
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label="row-select"
        />
      </div>
    ),
  },
  { header: "Ticket ID", accessorKey: "ticketId" },
  {
    header: "User",
    accessorKey: "user",
    cell: (info: CellContext<TicketItem, unknown>) => (
      <div className="flex items-center gap-3">
        <Avatar>
          {info.row.original.avatar ? (
            <AvatarImage src={info.row.original.avatar} />
          ) : (
            <AvatarFallback>
              {info.getValue()?.toString().charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <div className="text-sm font-medium">{info.getValue() as string}</div>
          <div className="text-xs text-slate-500">{info.row.original.time}</div>
        </div>
      </div>
    ),
  },
  {
    header: "Subject",
    accessorKey: "subject",
    cell: (info: CellContext<TicketItem, unknown>) => (
      <div className="max-w-[280px] break-words whitespace-normal text-sm">
        {info.getValue() as string}
      </div>
    ),
  },
  {
    header: "Priority",
    accessorKey: "priority",
    cell: (info: CellContext<TicketItem, unknown>) => {
      const v = (info.getValue() as string).toLowerCase();
      const map: Record<string, string> = {
        urgent: "bg-red-300 text-red-600",
        high: "bg-amber-300 text-amber-700",
        medium: "bg-yellow-300 text-yellow-700",
        low: "bg-emerald-300 text-emerald-700",
      };
      return (
        <span
          className={`inline-flex items-center px-3 py-2 rounded-md text-xs ${
            map[v] || "bg-gray-100 text-gray-700"
          }`}
        >
          {info.getValue() as string}
        </span>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info: CellContext<TicketItem, unknown>) => {
      const v = (info.getValue() as string).toLowerCase();
      const map: Record<string, string> = {
        open: "bg-teal-600 text-white",
        "waiting for user": "bg-gray-200 text-gray-700",
        resolved: "bg-emerald-500 text-white",
        closed: "bg-gray-300 text-gray-700",
      };
      return (
        <div className="flex justify-start">
          <span
            className={`inline-flex items-center px-3 py-2 rounded-md text-xs ${
              map[v] || "bg-gray-200 text-gray-700"
            }`}
          >
            {info.getValue() as string}
          </span>
        </div>
      );
    },
  },
  { header: "Assigned To", accessorKey: "assignedTo" },
  { header: "Created Date", accessorKey: "createdDate" },
  {
    header: "Action",
    id: "action",
    cell: (info: CellContext<TicketItem, unknown>) => (
      <div className="flex justify-end">
        <Link
          to={`/support/requests/detail/${info.row.original.ticketId}`}
          aria-label={`view-${info.row.original.ticketId}`}
        >
          <Button className="" variant="ghost" size="icon">
            <EyeIcon />
          </Button>
        </Link>
      </div>
    ),
  },
];

export type TicketsTableRef = DataTableRef<TicketItem>;

export const TicketsTable = forwardRef<TicketsTableRef, unknown>(
  function TicketsTable(_props, ref) {
    return (
      <div className="mt-6">
        <DataTable
          ref={ref}
          columns={ticketColumns}
          data={sampleTickets}
          pageSize={6}
          showPagination
        />
      </div>
    );
  }
);
