import { StatCard } from "@/components/StatCard";
import SupportControls from "@/components/Support/SupportControls";
import {
  TicketsTable,
  type TicketsTableRef,
} from "@/components/Support/TicketsTable";
import { useRef, useState } from "react";

export default function SupportRequests() {
  const tableRef = useRef<TicketsTableRef | null>(null);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleAssign = () => {
    if (!tableRef.current) return;
    const selected = tableRef.current
      .getSelectedRowModel()
      .flatRows.map((r) => r.original.id);
    console.log("Assign selected:", selected);
  };

  const handleClose = () => {
    if (!tableRef.current) return;
    const selected = tableRef.current
      .getSelectedRowModel()
      .flatRows.map((r) => r.original.id);
    console.log("Close selected:", selected);
  };

  const handleDelete = () => {
    if (!tableRef.current) return;
    const selected = tableRef.current
      .getSelectedRowModel()
      .flatRows.map((r) => r.original.id);
    console.log("Delete selected:", selected);
  };

  const handleSelectAllChange = (v: boolean) => {
    setIsAllSelected(v);
    if (!tableRef.current) return;
    // toggleAllRowsSelected expects boolean
    tableRef.current.toggleAllRowsSelected(v);
  };

  return (
    <section className="">
      <h1 className="text-xl font-medium my-6">Support Requests</h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          title="Open Tickets"
          value="4"
          sub=""
          iconSrc="/icons/message-report.svg"
          iconAlt="open"
        />

        <StatCard
          title="Assigned to Me"
          value="3"
          sub=""
          iconSrc="/icons/users.svg"
          iconAlt="assigned"
        />

        <StatCard
          title="High Priority"
          value="4"
          sub=""
          iconSrc="/icons/clipboard-list.svg"
          iconAlt="priority"
        />

        <StatCard
          title="Unassigned Tickets"
          value="1"
          sub=""
          iconSrc="/icons/inbox.svg"
          iconAlt="unassigned"
        />
      </div>

      <SupportControls
        onAssignSelected={handleAssign}
        onCloseSelected={handleClose}
        onDeleteSelected={handleDelete}
        isAllSelected={isAllSelected}
        onSelectAllChange={handleSelectAllChange}
      />

      <TicketsTable ref={tableRef} />
    </section>
  );
}
