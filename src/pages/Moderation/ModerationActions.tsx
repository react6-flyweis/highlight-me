import { useState } from "react";

import { PageLayout } from "@/components/layouts/PageLayout";
import { ReportedModerationCardAlt } from "@/components/Moderation/ReportedModerationCardAlt";
import { Button } from "@/components/ui/button";
import type { PostItem } from "@/pages/Moderation/ReportedContent";

const demoPost: PostItem = {
  id: "1",
  image: "https://picsum.photos/seed/201/800/400",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  author: "Gaming Guru",
  when: "2 days ago",
  flagDate: "2025-07-20",
  reason: "Misleading information",
  description:
    "Just sharing this cute cat photo! Hope it brightens your day. This little furball always makes me smile. What do you think?",
  caption: "Just sharing this cute cat photo! Hope it brightens your day.",
  tags: ["Misleading information", "Privacy violation"],
  reportsCount: 25,
  views: 1245,
  likes: 300,
  comments: 45,
};

export default function ModerationActions() {
  const [notes, setNotes] = useState("");
  const [actionInProgress, setActionInProgress] = useState(false);

  function handleAction(action: string) {
    setActionInProgress(true);
    console.log(action, demoPost.id);
    // simulate async
    setTimeout(() => setActionInProgress(false), 600);
  }

  return (
    <PageLayout title={`Moderation Actions: Reported Post`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <ReportedModerationCardAlt post={demoPost} />
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-medium">Moderation Actions</h3>

          <div className="mt-4 space-y-3">
            <Button
              size="lg"
              className="w-full bg-red-600 text-white hover:bg-red-700"
              onClick={() => handleAction("remove_content")}
              disabled={actionInProgress}
            >
              Remove Content
            </Button>

            <Button
              size="lg"
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => handleAction("mute_block_user")}
              disabled={actionInProgress}
            >
              Mute/Block User
            </Button>

            <Button
              size="lg"
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => handleAction("issue_warning")}
              disabled={actionInProgress}
            >
              Issue Warning
            </Button>

            <Button
              size="lg"
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
              onClick={() => handleAction("escalate_admin")}
              disabled={actionInProgress}
            >
              Escalate to Admin
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => handleAction("mark_reviewed")}
              disabled={actionInProgress}
            >
              Mark as Reviewed
            </Button>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Moderation Notes</h4>
            <textarea
              className="w-full border rounded p-2 min-h-[100px] resize-y"
              placeholder="Add notes or comments about this moderation action..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="mt-3">
              <Button
                className="w-full bg-gray-300 text-foreground"
                onClick={() => {
                  console.log("save notes", notes);
                }}
                disabled={notes.trim().length === 0}
              >
                Save Notes
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Activity Log - added below the grid */}
      <div className="mt-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-medium">Activity Log</h3>

          <div className="mt-2  rounded p-2">
            {/* example static entries; replace with real data when available */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 py-0.5"
              >
                <div className="text-sm text-muted-foreground">
                  Reported for Spam
                </div>
                <div className="text-sm text-right text-muted-foreground">
                  2024-07-20 10:30 AM by System
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button variant="outline" className="rounded h-10 border-primary">
            Back to Reports
          </Button>

          <Button className="rounded h-10">Go to Dashboard</Button>
        </div>
      </div>
    </PageLayout>
  );
}
