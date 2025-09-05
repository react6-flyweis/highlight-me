import { ModerationNav } from "@/components/Moderation/moderationNav";
import { PageLayout } from "@/components/layouts/PageLayout";

import {
  LogsFilter,
  type LogsFormValues,
} from "@/components/Moderation/LogsFilter";
import { DataTable } from "@/components/table/DataTable";
import { logsColumns, type LogItem } from "@/components/Moderation/logsColumns";
import { logsData } from "@/components/Moderation/logsData";

export default function LogsPage() {
  const onApply = (data: LogsFormValues) => {
    // Replace with API call / query when available
    console.log("Apply log filters:", data);
  };

  return (
    <PageLayout title="Logs">
      <ModerationNav />

      <LogsFilter onApply={onApply} defaultValues={{}} />

      {/* Logs table */}
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
