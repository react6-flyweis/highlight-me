import { DataTable } from "@/components/table/DataTable";
import { PageLayout } from "@/components/layouts/PageLayout";

import { allUsersColumn } from "@/components/UserManagement/allUsersColumns";
import allUsersData from "@/components/UserManagement/allUsersData";

export default function AllUsers() {
  return (
    <PageLayout title="View Total Users">
      <DataTable columns={allUsersColumn} data={allUsersData} showPagination />
    </PageLayout>
  );
}
