import { ModerationNav } from "@/components/Moderation/moderationNav";
import { PageLayout } from "@/components/layouts/PageLayout";
import { ReportedContentFilters } from "@/components/Moderation/ReportedContentFilters";
import { ReportedModerationCard } from "@/components/Moderation/ReportedModerationCard";
import { useState } from "react";

export type PostItem = {
  id: string;
  image: string;
  avatar: string;
  author: string;
  when: string;
  flagDate: string;
  reason: string;
  description?: string;
  caption?: string;
  tags?: string[];
  reportsCount?: number;
  views: number;
  likes: number;
  comments: number;
};

const demoPosts: PostItem[] = [
  {
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
    tags: [
      "Misleading information",
      "Hate Speech",
      "Impersonation",
      "Violence",
      "Nudity",
      "Bully",
      "Privacy violation",
    ],
    reportsCount: 25,
    views: 1245,
    likes: 300,
    comments: 45,
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/202/800/400",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    author: "CitySnapper",
    when: "1 day ago",
    flagDate: "2025-08-01",
    reason: "Hate Speech",
    description: "A quick street shot — commentary in the thread got heated.",
    caption: "Night markets and neon — a candid capture.",
    tags: ["Hate Speech"],
    reportsCount: 3,
    views: 890,
    likes: 120,
    comments: 12,
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/203/800/400",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    author: "StudioShots",
    when: "12 hours ago",
    flagDate: "2025-08-30",
    reason: "Privacy violation",
    description: "An accidental upload that may contain personal data.",
    caption: "Studio test shot — may contain identifiable info.",
    tags: ["Privacy violation"],
    reportsCount: 1,
    views: 310,
    likes: 44,
    comments: 4,
  },
];

export default function ReportedContent() {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  function toggleSelect(id: string) {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  }

  function clearSelection() {
    setSelected([]);
    setSelectionMode(false);
  }

  const allSelected =
    selected.length === demoPosts.length && demoPosts.length > 0;

  function handleSelectAllChange(checked: boolean) {
    if (checked) setSelected(demoPosts.map((p) => p.id));
    else clearSelection();
    setSelectionMode(checked);
  }

  function bulkApprove() {
    console.log("bulk approve", selected);
    clearSelection();
  }

  function bulkRemove() {
    console.log("bulk remove", selected);
    clearSelection();
  }

  //   function enterSelectionModeAndSelect(id: string) {
  //     setSelectionMode(true);
  //     setSelected((s) => (s.includes(id) ? s : [...s, id]));
  //   }

  return (
    <PageLayout title="Reported Content">
      <ModerationNav />

      <ReportedContentFilters
        selectionMode={selectionMode || selected.length > 0}
        allSelected={allSelected}
        onSelectAllChange={handleSelectAllChange}
        onDateChange={(v) => console.log("filter date", v)}
        onContentTypeChange={(v) => console.log("content type", v)}
        onFlagReasonChange={(v) => console.log("flag reason", v)}
        onApprove={bulkApprove}
        onRemove={bulkRemove}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {demoPosts.map((p) => (
          <ReportedModerationCard
            key={p.id}
            post={p}
            selected={selected.includes(p.id)}
            onToggle={toggleSelect}
            showSelection={selectionMode || selected.includes(p.id)}
            // onLongPressEnter={enterSelectionModeAndSelect}
          />
        ))}
      </div>
    </PageLayout>
  );
}
