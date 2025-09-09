import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/table/DataTable";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layouts/PageLayout";
import { ChangeStatusDialog } from "@/components/Support/ChangeStatusDialog";
import { AssignTeamMemberDialog } from "@/components/Support/AssignTeamMemberDialog";
import { MergeTicketsDialog } from "@/components/Support/MergeTicketsDialog";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

type Ticket = {
  id: string;
  subject: string;
  user: string;
  priority: "Low" | "Medium" | "High";
  status: string;
  assignedTo?: string;
};

const sampleTickets: Ticket[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `TKT-00${i + 1}`,
  subject: "Login issue after update",
  user: i % 2 === 0 ? "Alice Johnson" : "Bob Martin",
  priority: "High",
  status: "Waiting for User",
  assignedTo: "",
}));

export default function CommonModals() {
  const [tickets, setTickets] = useState<Ticket[]>(sampleTickets);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [openChange, setOpenChange] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openMerge, setOpenMerge] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const columns = useMemo<ColumnDef<Ticket, unknown>[]>(
    () => [
      {
        header: "Ticket ID",
        accessorKey: "id",
      },
      {
        header: "Subject & User",
        accessorKey: "subject",
        cell: (ctx) => (
          <div className="flex flex-col">
            <div className="text-sm font-medium leading-tight">
              {ctx.getValue<string>()}
            </div>
            <div className="text-xs text-muted-foreground">
              by {ctx.row.original.user}
            </div>
          </div>
        ),
      },
      {
        header: "Priority",
        accessorKey: "priority",
        cell: (ctx) => <div className="text-sm">{ctx.getValue<string>()}</div>,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (ctx) => (
          <span className="inline-block px-3 py-1 rounded-md bg-orange-100 text-orange-600 text-sm font-medium">
            {ctx.getValue<string>()}
          </span>
        ),
      },
      {
        header: "Assigned To",
        accessorKey: "assignedTo",
        cell: (ctx) => (
          <div>
            <span className="inline-block px-4 py-1 rounded-md bg-muted text-muted-foreground text-sm">
              {ctx.getValue<string>() || "Waiting for User"}
            </span>
          </div>
        ),
      },
      {
        header: "Actions",
        id: "actions",
        cell: (ctx) => {
          const row = ctx.row.original as Ticket;
          return (
            <ActionsCell
              onChangeStatus={() => {
                setActiveTicket(row);
                setOpenChange(true);
              }}
              onAssign={() => {
                setActiveTicket(row);
                setOpenAssign(true);
              }}
              onMerge={() => {
                setActiveTicket(row);
                setOpenMerge(true);
              }}
              onDelete={() => {
                setActiveTicket(row);
                setOpenConfirm(true);
              }}
            />
          );
        },
      },
    ],
    []
  );

  return (
    <PageLayout
      title="Common Modals Demonstration"
      subtitle="Manage and track all past contest winners, including their awarded prizes and contest dates. You can upload in bulk or add entries manually."
    >
      <h3 className="font-semibold mb-4 mt-8">
        Support Tickets Overview (Background Content)
      </h3>
      <DataTable
        columns={columns}
        data={tickets}
        pageSize={6}
        showPagination={false}
      />

      <ChangeStatusDialog
        open={openChange}
        onOpenChange={setOpenChange}
        currentStatus={activeTicket?.status}
        onConfirm={({ to }) => {
          if (!activeTicket) return;
          setTickets((prev) =>
            prev.map((t) =>
              t.id === activeTicket.id ? { ...t, status: to } : t
            )
          );
          setActiveTicket(null);
        }}
      />

      <AssignTeamMemberDialog
        open={openAssign}
        onOpenChange={setOpenAssign}
        current={activeTicket?.assignedTo}
        onConfirm={(member) => {
          if (!activeTicket) return;
          setTickets((prev) =>
            prev.map((t) =>
              t.id === activeTicket.id
                ? { ...t, assignedTo: member ? member.name : "" }
                : t
            )
          );
          setActiveTicket(null);
        }}
      />

      <MergeTicketsDialog
        open={openMerge}
        onOpenChange={setOpenMerge}
        currentTicketId={activeTicket?.id}
        onConfirm={(selectedIds) => {
          // remove selected tickets (simulate merge)
          setTickets((prev) => prev.filter((t) => !selectedIds.includes(t.id)));
          setActiveTicket(null);
        }}
      />

      <ConfirmDialog
        open={openConfirm}
        onOpenChange={setOpenConfirm}
        title="Delete Ticket"
        description="Are you sure you want to delete this ticket? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {}}
      />
    </PageLayout>
  );
}

// small actions cell using project's dropdown menu for consistent styling
function ActionsCell({
  onChangeStatus,
  onAssign,
  onMerge,
  onDelete,
}: {
  onChangeStatus: () => void;
  onAssign: () => void;
  onMerge: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="text-center">
        <DropdownMenuItem className="justify-center" onSelect={onChangeStatus}>
          Change Status
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center" onSelect={onAssign}>
          Assign Team Member
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center" onSelect={onDelete}>
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center" onSelect={onMerge}>
          Merge Feedback
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
