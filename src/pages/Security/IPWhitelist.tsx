import { SecurityNav } from "./SecurityNav";
import { PageLayout } from "@/components/layouts/PageLayout";
import { DataTable } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

type IPItem = {
  ip: string;
  label: string;
  status: "Active" | "Inactive";
  dateAdded: string;
  addedBy: string;
};

const columns: ColumnDef<IPItem, unknown>[] = [
  {
    header: "IP Address",
    accessorKey: "ip",
    cell: (info) => info.getValue(),
  },
  {
    header: "Label",
    accessorKey: "label",
    cell: (info) => info.getValue(),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => {
      const v = info.getValue() as string;
      return (
        <span
          className={
            v === "Active"
              ? "inline-block px-2 py-1 text-xs font-medium rounded bg-emerald-100 text-emerald-700"
              : "inline-block px-2 py-1 text-xs font-medium rounded bg-rose-100 text-rose-700"
          }
        >
          {v}
        </span>
      );
    },
  },
  {
    header: "Date Added",
    accessorKey: "dateAdded",
  },
  {
    header: "Added By",
    accessorKey: "addedBy",
  },
  {
    header: "Actions",
    id: "actions",
    cell: () => (
      <div className="flex gap-2">
        <Button variant="ghost" size="sm">
          <Edit size={16} />
        </Button>
        <Button variant="ghost" size="sm">
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  },
];

const sampleData: IPItem[] = Array.from({ length: 7 }).map((_, i) => ({
  ip: "203.0.113.45",
  label: "Main Office VPN",
  status: i % 2 === 0 ? "Active" : "Inactive",
  dateAdded: "2023-10-26",
  addedBy: "admin@example.com",
}));

export default function IPWhitelistPage() {
  return (
    <PageLayout title="IP Whitelisting">
      <SecurityNav />

      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Allowed IP Addresses</h2>
        <Button variant="default">
          <Plus size={14} className="mr-2" /> Add New IP
        </Button>
      </div>

      <section className="mt-4">
        <DataTable columns={columns} data={sampleData} showPagination />
      </section>
    </PageLayout>
  );
}
