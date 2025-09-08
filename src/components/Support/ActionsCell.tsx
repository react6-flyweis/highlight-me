import { useState } from "react";
import type { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { SupportTopicDialog } from "./SupportTopicDialog";
import type { TopicRow } from "./topicColumns";

export function ActionsCell({ row }: { row: Row<TopicRow> }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<TopicRow | null>(null);

  return (
    <div className="inline-flex items-center gap-1 justify-end">
      <Button
        variant="ghost"
        title="View"
        onClick={() => {
          setSelected(row.original as TopicRow);
          setDialogOpen(true);
        }}
      >
        <Eye className="w-4 h-4 text-gray-600" />
      </Button>
      <SupportTopicDialog
        topic={selected}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}
