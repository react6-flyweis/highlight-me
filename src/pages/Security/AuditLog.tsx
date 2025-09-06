import { SecurityNav } from "./SecurityNav";
import { PageLayout } from "@/components/layouts/PageLayout";

import {
  LogsFilter,
  type LogsFormValues,
} from "@/components/Moderation/LogsFilter";
import { DataTable } from "@/components/table/DataTable";
import { logsColumns, type LogItem } from "@/components/Moderation/logsColumns";
import { logsData } from "@/components/Moderation/logsData";

export default function AuditLogPage() {
  const onApply = (data: LogsFormValues) => {
    // Replace with API call / query when available
    console.log("Apply audit log filters:", data);
  };

  return (
    <PageLayout title="Audit Log">
      <SecurityNav />

      <LogsFilter onApply={onApply} defaultValues={{}} />

      {/* Audit logs table */}
      <section className="mt-6">
        <DataTable
          columns={logsColumns}
          data={logsData as LogItem[]}
          showPagination
        />
      </section>
    </PageLayout>
  );
}
