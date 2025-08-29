import { DataTable, type DataTableRef } from "@/components/table/DataTable";
import { PageLayout } from "@/components/layouts/PageLayout";

import { allUsersColumn } from "@/components/UserManagement/allUsersColumns";
import allUsersData from "@/components/UserManagement/allUsersData";
import { UsersBreadcrumb } from "@/components/UserManagement/UsersBreadcrumb";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRef } from "react";
import type { UserItem } from "@/components/UserManagement/allUsersColumns";

export default function AllUsers() {
  const tableRef = useRef<DataTableRef<UserItem> | null>(null);
  return (
    <PageLayout title="View Total Users">
      <div className="flex items-center justify-between gap-4 mb-6">
        <UsersBreadcrumb />

        <div className="flex items-center gap-3">
          {/* Role filter (shadcn Select) */}
          <Select
            onValueChange={(val: string) => {
              const table = tableRef.current;
              if (!table) return;
              // 'all' is used as the placeholder/clear token
              if (val === "all") {
                table.setColumnFilters((old) =>
                  old.filter((f) => f.id !== "role")
                );
                return;
              }
              table.setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "role"),
                { id: "role", value: val },
              ]);
            }}
          >
            <SelectTrigger size="sm" className="w-36">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>

          {/* Status filter (shadcn Select) */}
          <Select
            onValueChange={(val: string) => {
              const table = tableRef.current;
              if (!table) return;
              if (val === "all") {
                table.setColumnFilters((old) =>
                  old.filter((f) => f.id !== "status")
                );
                return;
              }
              table.setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "status"),
                { id: "status", value: val },
              ]);
            }}
          >
            <SelectTrigger size="sm" className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          {/* Join date filter */}
          <input
            id="join-date"
            type="date"
            className="rounded-md border px-3 py-2 text-sm bg-white"
            aria-label="Filter by join date"
            onChange={(e) => {
              const table = tableRef.current;
              if (!table) return;
              const val = e.target.value;
              if (!val) {
                table.setColumnFilters((old) =>
                  old.filter((f) => f.id !== "createdAt")
                );
                return;
              }
              // set filter to ISO date so column filtering compares full createdAt string
              table.setColumnFilters((old) => [
                ...old.filter((f) => f.id !== "createdAt"),
                { id: "createdAt", value: val },
              ]);
            }}
          />
        </div>
      </div>

      <DataTable
        columns={allUsersColumn}
        data={allUsersData}
        showPagination
        ref={tableRef}
      />
    </PageLayout>
  );
}
