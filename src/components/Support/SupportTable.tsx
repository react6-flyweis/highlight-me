import { useMemo, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { useSupportColumns, type SupportRow } from "./supportColumns";
import { SupportFilters, type Filters } from "./SupportFilters";

const SAMPLE_SUPPORT_DATA: SupportRow[] = [
  {
    id: 1,
    name: "Sarah",
    avatar: "/assets/images/content-moderation.png",
    time: "4.00am",
    type: "Feedback",
    date: "2024-03-10",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah",
    avatar: "/assets/images/content-moderation.png",
    time: "4.00am",
    type: "Bug",
    date: "2024-03-10",
    status: "InProgress",
  },
  {
    id: 3,
    name: "Sarah",
    avatar: "/assets/images/content-moderation.png",
    time: "4.00am",
    type: "Feature Request",
    date: "2024-03-10",
    status: "Archived",
  },
  {
    id: 4,
    name: "Sarah",
    avatar: "/assets/images/content-moderation.png",
    time: "4.00am",
    type: "Question",
    date: "2024-03-10",
    status: "Resolved",
  },
  {
    id: 5,
    name: "Sarah",
    avatar: "/assets/images/content-moderation.png",
    time: "4.00am",
    type: "Feedback",
    date: "2024-03-10",
    status: "Active",
  },
];

export function SupportTable() {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    typeFilter: "All Types",
    priorityFilter: "All",
    statusFilter: "All",
    dateFilter: "",
  });

  const pageSize = 5;

  const columns = useSupportColumns();

  const filtered = useMemo(() => {
    return SAMPLE_SUPPORT_DATA.filter((r) => {
      if (filters.typeFilter !== "All Types" && r.type !== filters.typeFilter)
        return false;
      if (filters.statusFilter !== "All" && r.status !== filters.statusFilter)
        return false;
      if (filters.dateFilter && r.date !== filters.dateFilter) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (
          !`${r.name} ${r.type} ${r.date} ${r.status}`.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <section className="mt-8">
      <SupportFilters
        filters={filters}
        setFilters={(f) => setFilters((cur) => ({ ...cur, ...f }))}
        data={SAMPLE_SUPPORT_DATA}
      />

      <div className="border rounded bg-white p-4">
        <h2 className="text-lg font-semibold mb-5">Ban keywords List</h2>

        <DataTable columns={columns} data={filtered} pageSize={pageSize} />
      </div>
    </section>
  );
}
