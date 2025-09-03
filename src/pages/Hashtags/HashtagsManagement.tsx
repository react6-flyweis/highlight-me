import { PageLayout } from "@/components/layouts/PageLayout";
import { HashtagsNav } from "@/components/Hashtags/HashtagsNav";
import { DataTable, type DataTableRef } from "@/components/table/DataTable";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  hashtagsColumns,
  type HashtagItem,
} from "@/components/Hashtags/hashtagsColumns";
import hashtagsData from "@/components/Hashtags/hashtagsData";

export default function HashtagsManagementPage() {
  const tableRef = useRef<DataTableRef<HashtagItem> | null>(null);
  const [search, setSearch] = useState("");

  return (
    <PageLayout
      title="Hashtag Management"
      subtitle="Manage, edit and moderate hashtags."
    >
      <HashtagsNav />
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search Hashtags..."
            value={search}
            onChange={(e) => {
              const val = e.target.value;
              setSearch(val);
              const table = tableRef.current;
              if (!table) return;
              // apply a column filter on the 'name' column to perform simple search
              if (!val) {
                table.setColumnFilters((old) =>
                  old.filter((f) => f.id !== "name")
                );
                return;
              }
              table.setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "name"),
                { id: "name", value: val },
              ]);
            }}
            aria-label="Search Hashtags"
            className="w-full "
          />
        </div>

        <div className="flex-shrink-0">
          <Button type="button" size="sm" asChild>
            <Link to="/hashtags/create">+ New Hashtag</Link>
          </Button>
        </div>
      </div>

      <h2 className="mb-2 font-semibold text-lg">All hashtags</h2>
      <DataTable
        columns={hashtagsColumns}
        data={hashtagsData}
        showPagination
        pageSize={10}
        ref={tableRef}
      />
    </PageLayout>
  );
}
