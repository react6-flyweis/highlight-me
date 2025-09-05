import { ModerationNav } from "@/components/Moderation/moderationNav";
import { PageLayout } from "@/components/layouts/PageLayout";

import { DataTable } from "@/components/table/DataTable";
import { logsColumns, type LogItem } from "@/components/Moderation/logsColumns";
import { logsData } from "@/components/Moderation/logsData";

export default function LogsPage() {
  return (
    <PageLayout title="Logs">
      <ModerationNav />

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
