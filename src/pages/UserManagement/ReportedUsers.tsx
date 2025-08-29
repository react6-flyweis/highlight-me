import { DataTable } from "@/components/table/DataTable";
import { PageLayout } from "@/components/layouts/PageLayout";
import { reportedUsersColumns } from "@/components/UserManagement/reportedUsersColumns";
import allUsersData from "@/components/UserManagement/allUsersData";
import { UsersBreadcrumb } from "@/components/UserManagement/UsersBreadcrumb";

export default function AllUsers() {
  return (
    <PageLayout title="Reported Users">
      <UsersBreadcrumb />
      <DataTable
        columns={reportedUsersColumns}
        data={allUsersData}
        showPagination
      />
    </PageLayout>
  );
}
