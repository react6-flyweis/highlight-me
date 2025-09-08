import { PageLayout } from "@/components/layouts/PageLayout";
import { topicColumns, type TopicRow } from "@/components/Support/topicColumns";
import { TopicsFilters } from "@/components/Support/TopicsFilters";
import { DataTable } from "@/components/table/DataTable";
import { useMemo, useState } from "react";

const SAMPLE_TOPICS: TopicRow[] = Array.from({ length: 7 }).map((_, i) => ({
  id: i + 1,
  title: "2024-07-26 14:30:15",
  category: "admin_john",
  author: "admin_john",
  date: "2024-07-26",
  time: "14:30:15",
  notes: "Configuration Update",
  ip: "203.0.113.45",
  avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
}));

export default function TopicsManagementPage() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const categories = useMemo(
    () => Array.from(new Set(SAMPLE_TOPICS.map((t) => t.category))),
    []
  );

  const filtered = useMemo(() => {
    return SAMPLE_TOPICS.filter((r) => {
      if (categoryFilter !== "All" && r.category !== categoryFilter)
        return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !`${r.title} ${r.category} ${r.notes} ${r.ip}`
            .toLowerCase()
            .includes(q)
        )
          return false;
      }
      return true;
    });
  }, [query, categoryFilter]);
  return (
    <PageLayout title="FAQ & Help Topic">
      <TopicsFilters
        query={query}
        setQuery={setQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categories={categories}
      />

      <div className="border rounded bg-white p-4">
        <h2 className="text-lg font-semibold mb-5">FAQ & Help Topic</h2>
        <DataTable columns={topicColumns} data={filtered} />
      </div>
    </PageLayout>
  );
}
